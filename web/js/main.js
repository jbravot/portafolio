function verDetallePortafolio(url) {
  $.ajax({
      url: url,
      dataType: "html",
      success: function(html) {
        $("#portafolio-bx")
            .html(html)
            .show(800);
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
$(document).ready(function(){

  $("a, abbr, .profile img, .thumbnails img, .habilidades div, input, textarea").tooltip();

  $(document).on('click', '#portafolio li a', function() {
    verDetallePortafolio($(this).attr("href"));
    return false;
  });
  $(document).on('mouseenter', '.pricing-table', function() {
    $(this).addClass('pricing-table-hover');
  });
  $(document).on('mouseleave', '.pricing-table', function() {
    $(this).removeClass('pricing-table-hover');
  });
  $(document).on('click', '.navbar .container ul.nav a', function() {
    $('.navbar .container bottom').addClass('collapsed');
    $('.navbar .container div').removeClass('in').css('height','0px');
  });

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

	console.log(name + "-" + email + "-" + text);

    if ( mensaje == "" ){
      $.ajax({
        type: "POST",
        url: "mail.php",
        data: dataString,
        success: function(){
          msj("Tu mensaje ha sido enviado con éxito.","alert-error","alert-success");
        }
      });
    }
    else{
      msj(mensaje,"alert-success","alert-error");
    }

    return false;
  });

	// show all elements y hide preloader
  $("html").removeClass("js");

  $("#title-header").removeClass("move-r");
  $("#subtitle-header").removeClass("move-l");

});