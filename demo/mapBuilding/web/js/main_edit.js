	$(document).ready(function () {

		// WYSIWYNG
		$('.wysiwyngTxt').wysiwyg({controls:"bold,italic,underline,|,justifyCenter,justifyFull,justifyLeft,justifyRight,|,insertOrderedList,insertUnorderedList,indent,outdent"});
		//chosen
		$(".chzn-select").chosen({allow_single_deselect:true});

		//eventos botones
		$('#btn-guardar').click(function() {
			validarForm();
		});
	})
/***************************************
funcion para activar el control para dibujar puntos
****************************************/
	function activardibujarParada(){
		for(key in editor.controls) {
			var control = editor.controls["DrawPoint"];
            if("DrawPoint" == key) {
				editor.editLayer.destroyFeatures();
				editor.editLayer.redraw();
				control.activate();
				editor.editLayer.styleMap = setMapEstiloPoint(ruta_path_icon);
				editor.editLayer.redraw();
				break;
            } else {
				control.deactivate();
            }
        }
	}
/***************************************
funcion para activar el control para dibujar lineas
****************************************/
	function activardibujarRuta(){
		for(key in editor.controls) {
			var control = editor.controls["DrawPath"];
			if("DrawPath" == key) {
				editor.editLayer.destroyFeatures();
				editor.editLayer.redraw();
				control.activate();
				editor.editLayer.redraw();
				break;
			} else {
				control.deactivate();
			}
		}
	}
/***************************************
funcion para cambiar el icono a los puntos
****************************************/
	function cambiarIcono(ruta){
				ruta_path_icon = "web/images/marker/"+ruta+".png";
				$('#iconMarker').attr('src',ruta_path_icon);
				$('#icon_path').val(ruta_path_icon);
				$('#name_icon').html(ruta);
				editor.editLayer.styleMap = setMapEstiloPoint(ruta_path_icon);
				editor.editLayer.redraw();
				cambiarPosicionIcono();
		}
/***************************************
funcion para validar formulario
****************************************/
	function validarForm(){
		var valid_input_nombre = validarInput("nombre");
		//var valid_input_direccion = validarInput("direccion");
		//var valid_select_categoria = validarSelect("categoria");
		var valid_dato_geometrico = obtenerDatosGeometricos();
		if( valid_input_nombre && valid_dato_geometrico ){
			$('form').submit();
		}

	}
/***************************************
funcion para validar input
****************************************/
	function validarInput(input_name){
		var input_nombre = $('form input[name="'+input_name+'"]');
		if(input_nombre.val() == ""){
			input_nombre.addClass('error');
			input_nombre.focus();
			return false;
		}else{
			input_nombre.removeClass('error');
			return true;
		}
	}
/***************************************
funcion para validar select
****************************************/
	function validarSelect(select_name){
		var select_categoria = $('form select[name="'+select_name+'"]');
		var select_categoria_a = $('form a.chzn-single');
		if(select_categoria.val() == ""){
			select_categoria_a.addClass('error');
			select_categoria_a.focus();
			return false;
		}else{
			select_categoria_a.removeClass('error');
			return true;
		}
	}