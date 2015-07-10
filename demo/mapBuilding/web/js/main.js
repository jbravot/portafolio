var btn_acciones;
$(document).ready(function () {

	cambiarChecks();

	$(document).on("mouseenter", ".btn-acciones", function() {
		$(this).addClass("activar-acciones");
	});
	$(document).on("mouseleave", ".btn-acciones", function() {
		$(this).removeClass("activar-acciones");
	});
	$(document).on("click", ".btn-acciones", function() {
		btn_acciones = $(this);
		btn_acciones.next().toggleClass("ocultar");
				$("html").one("click",function() {
					if(!btn_acciones.hasClass("activar-acciones")){
						$(".cont-acciones").addClass("ocultar");
					}
				});
	});
	$(document).on("change", "input.ver-mapa", function() {
		ocultarLayer($(this).attr("name"));
	});

	$(document).on("click", ".buscar-by", function() {
		buscarToggle($(this));
	});
	$(document).on("keyup", "#buscar-nombre-ruta", function() {
		buscarBycriteria("nombre-fiend",$(this).val(),"rutas");
	});
	$(document).on("keyup", "#buscar-nombre", function() {
		buscarBycriteria("nombre-fiend",$(this).val(),"paradas");
	});
	$(document).on("change", "#buscar-ruta", function() {
		buscarBycriteria("ruta-fiend",$(this).val(),"paradas");
	});
	$(".chzn-select").chosen({allow_single_deselect:true});

	$(".form-search").hide();

	$(document).on("mouseenter", ".td-info", function() {
		$(this).children(".acciones").toggleClass("ocultar");
	});
	$(document).on("mouseleave", ".td-info", function() {
		$(this).children(".acciones").toggleClass("ocultar");
	});

})
function buscarBycriteria(criteria,str_value,type){
		$("#table-" + type + " tr").each(function(index) {
		    var valor = $(this).find("."+criteria).val().toUpperCase();
		    str_value = str_value.toUpperCase();
		    if(str_value != ""){
			    if(valor.indexOf(str_value) < 0){
					$(this).css("display","none");
					buscarLayer($(this).find(".nombre-fiend").val(),false);
			    }else{
			    	$(this).css("display","");
			    	buscarLayer($(this).find(".nombre-fiend").val(),true);
			    }
			}else{
			    	$(this).css("display","");
			    	buscarLayer($(this).find(".nombre-fiend").val(),true);
			    }
		});
}
function buscarToggle(obj){
	var flag = obj.attr("rel");
	if(flag == 1){
		obj.parent().next().hide(300);
		obj.removeClass("buscar_down");
		obj.attr("rel",0);
	}else{
		obj.parent().next().show(300);
		obj.addClass("buscar_down");
		obj.attr("rel",1);
	}
}
function cambiarChecks(){
    //se obtienen en este caso todos los elementos de tipo checkbox que se encuentren
    checkButtons = $('input[type="checkbox"]');

    /*En donde se encuentre algún checkbox este se ocultará, y al mismo tiempo se creará un elemento span, con la clase del checkbox false*/
    checkButtons.each( function(){
		var class_tmp = ( this.checked ) ? 'checked':'';
        $(this).after('<span rel="' + this.id + '" class="footage-checkbox ' + class_tmp + '"></span>').css('display','none');
    });

    checkButtons.change( function(){
        /*primero se compara en el evento change el estado que se encuentre para convertirlo en el opuesto*/
        this.checked = ( this.checked ) ? false:true;

        //dependiendo del estado del se asigna o se elimin
        if( this.checked )
            $('span.footage-checkbox[rel="' + this.id + '"]').addClass('checked');
        else
            $('span.footage-checkbox[rel="' + this.id + '"]').removeClass('checked');
    });

    //aquí mandamos hacempos que al darle click al checkbox ficticio , cambie el real
    $('span.footage-checkbox').click( function(){
       tempChk = $('input#'+$(this).attr('rel')).change();
    });
}