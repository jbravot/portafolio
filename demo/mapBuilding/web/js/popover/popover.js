function showPopup(options) {
	// HTML popup box
	var popup = $('<div id="popup" class="popover">'
			+ '<div class="triangle"></div>'
			+ '<div class="header"></div>'
			+ '<div class="content"></div>'
			+ '</div>').appendTo('body');
	$('.header', popup).html(options.title);
	$('.content', popup).html(options.content);

    var triangle = $('.triangle', popup);
    popup.css('display', 'block');

    // position and resize
    var leftOff = 0;
    var topOff = 0;
    var docWidth = $(document).width();
    var docHeight = $(document).height();
    var triangleSize = parseInt(triangle.css("border-bottom-width"));
    var contentWidth = popup.outerWidth();
    var contentHeight = popup.outerHeight();
    var buttonWidth = (34 - 34);
    var buttonHeight = (34 - 18);

    // Calculate topOff
    topOff = options.y + buttonHeight + triangleSize;
    var diffHeight = docHeight - (topOff + contentHeight + triangleSize);
    if (diffHeight < 0){
      //resize the popup
      popup.height(popup.height() + diffHeight);
    }

    // Padding against document borders
    var padding = 18;

    // Calculate leftOff
    leftOff = options.x + (buttonWidth - contentWidth)/2;
    var diffWidth = 0;
    if (leftOff < padding) {
      // out of the document at left
      diffWidth = leftOff - padding;
    } else if (leftOff + contentWidth > docWidth) {
      // left of the screen right
      diffWidth = leftOff + contentWidth - docWidth + padding;
    }

    // position triangle
    triangle.css("left", contentWidth/2 - triangleSize + diffWidth);
    popup.offset({
      top: topOff,
      left: leftOff - diffWidth
    });
    popup.show();
	window.setTimeout(function() {
      popup.addClass("active");
      // Fixes some browser bugs
      $(window).resize();
    }, 0);
}

function hidePopup(){
	$("#popup").remove();
}