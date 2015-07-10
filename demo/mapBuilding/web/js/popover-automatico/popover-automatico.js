(function($) {
$.fn.popoverAuto = function(options) {
  var defaults = {
    openEvent: null,
    closeEvent: null,
    offsetX: 0,
    offsetY: 0
  }
  var options = $.extend(defaults, options);

  // HTML floater box
  var header = $(options.header).detach();
  var content = $(options.content).detach();
  var overlay = $('<div class="white_overlay"></div>').appendTo('body');
  var floater = $('<div class="popover">'
        + '<div class="content"></div>'
        + '</div>').appendTo('body');
  $('.header', floater).append(header);
  $('.content', floater).append(content);

  var showPopover = function(button) {
    // Already opened?
    if ($.fn.popoverAuto.openedPopup === button) {
      $.fn.popoverAuto.openedPopup.trigger('hidePopover');
      return false;
    } else if($.fn.popoverAuto.openedPopup != null){
      $.fn.popoverAuto.openedPopup.trigger('hidePopover');
    }
    // Set this first for the layout calculations to work.
    floater.css('display', 'block');
    overlay.css('display', 'block');

    // position and resize
    var leftOff = 0;
    var topOff = 0;
    var docWidth = $(document).width();
    var docHeight = $(document).height();
    var contentWidth = floater.outerWidth();
    var contentHeight = floater.outerHeight();
    var buttonWidth = button.outerWidth();
    var buttonHeight = button.outerHeight()
    var offset = button.offset();

    // Padding against document borders
    var padding = 18;

    // Calculate topOff
    topOff = (docHeight - contentHeight)/2;
    var diffHeight = docHeight - (topOff + contentHeight);
    if (diffHeight < 0){
      //resize the floater
      floater.height(floater.height());
    }

    // Calculate leftOff
    leftOff = (docWidth - contentWidth)/2;
    var diffWidth = 0;
    if (leftOff < padding) {
      // out of the document at left
      diffWidth = leftOff - padding;
    } else if (leftOff + contentWidth > docWidth) {
      // left of the screen right
      diffWidth = leftOff + contentWidth - docWidth + padding;
    }

    floater.offset({
      top: topOff + options.offsetY,
      left: leftOff - diffWidth + options.offsetX
    });
    floater.show();
    //Timeout for webkit transitions to take effect
    window.setTimeout(function() {
      floater.addClass("active");
      // Fixes some browser bugs
      $(window).resize();
    }, 0);
    if ($.isFunction(options.openEvent)) options.openEvent();
    $.fn.popoverAuto.openedPopup = button;
    button.addClass('popover-on');
    return false;
  }

  this.each(function(){
    var button = $(this);
    button.addClass("popover-button");

    showPopover(button);

    window.setTimeout(function() {
      button.removeClass('popover-on');
      floater.removeClass("active").attr("style", "").css('display', 'none');
      overlay.css('display', 'none');
      if ($.isFunction(options.closeEvent)) {
        options.closeEvent();
      }
      $.fn.popoverAuto.openedPopup = null;
      window.setTimeout(function() {
        // Fixes some browser bugs
        $(window).resize();
      }, 0);
      return false;
    },5000);
  });
}
})(jQuery);
