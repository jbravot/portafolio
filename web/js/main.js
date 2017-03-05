$(document).ready(function(){

  $(document).on('click', '.toggle-menu', function() {
    $('body').toggleClass('js-offcanvas');
    return false;
  });

  $(document).on('click', '.logo', function() {
    $('body').toggleClass('js-offcanvas');
    return false;
  });

  $(document).on('click', '.js-offcanvas .main-container', function() {
    $('body').toggleClass('js-offcanvas');
    return false;
  });

  $(document).on('click', '.navbar-right li a', function() {
    $('body').toggleClass('js-offcanvas');
  });
/*
  $("body").hammer({ drag_block_horizontal: true }).on("swipeleft dragleft", function(event){
    event.gesture.preventDefault();
    $('body').removeClass('js-offcanvas');
  });
  $("body").hammer({ drag_block_horizontal: true }).on("swiperight dragright", function(event){
    event.gesture.preventDefault();
    $('body').addClass('js-offcanvas');
  });
*/
  $(document).on('click', '#portafolio li a.thumbnail', function() {
    verDetallePortafolio($(this).attr("href"));
    return false;
  });

  $(window).scroll(function() {
    if($(this).scrollTop() != 0) {
      $('#toTop').fadeIn();
    } else {
      $('#toTop').fadeOut();
    }
  });

  $(document).on('click', '#toTop', function() {
    $('body,html').animate({scrollTop:0},800);
  });

  $("a, abbr, .profile img, a.thumbnails, .tools, input, textarea").tooltip();

  // Contact Form
  $("#form-contact").submit(function(e){
    e.preventDefault();
    var name = $("#inputNombre").val();
    var email = $("#inputEmail").val();
    var text = $("#inputMensaje").val();
    var mensaje = "";

    var dataString = 'name=' + name + '&email=' + email + '&text=' + text;

    if( name == "" ){
      mensaje += "Ingrese un nombre en el formulario.<br />";
    }
    if( isValidEmail(email) ){
      mensaje += "E-mail debe ser válido.<br />";
    }
    if( text.length < 50 ){
      mensaje += "El mensaje debe ser más largo de 100 caracteres.";
    }

    if ( mensaje == "" ){
      $.ajax({
        type: "POST",
        url: "mail.php",
        data: dataString,
        success: function(){
          msj("Tu mensaje ha sido enviado con éxito.","alert-danger","alert-success");
          limpiarForm();
        }
      });
    }
    else{
      msj(mensaje,"alert-success","alert-danger");
    }

    return false;
  });

});
function verDetallePortafolio(url) {
  $.ajax({
      url: url,
      dataType: "html",
      success: function(html) {
        $("#portafolio-bx")
            .html(html)
            .show(800);
            $('body').delay(250).animate({scrollTop : $("#portafolio").offset().top},'slow');
            inizializarPortafolio();
      }
  });
}
function inizializarPortafolio() {
  $(".portafolio-bx-close").click(function(){
    $("#portafolio-bx").hide(800);
    $("#portafolio-bx").html("");
    return false;
  });
  $("#porfolio-carousel").carousel({interval: 2000});
}
function msj(data,ocultar,mostrar){
  $('#msj span').html(data);
  $('#msj')
    .removeClass(ocultar)
    .addClass(mostrar)
    .removeClass('hide');
}
function isValidEmail(emailAddress) {
  var pattern = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/);
  return pattern.test(emailAddress);
};
function limpiarForm(){
  $("#inputNombre").val("");
  $("#inputEmail").val("");
  $("#inputMensaje").val("");
}
