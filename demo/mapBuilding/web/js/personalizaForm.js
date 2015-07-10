/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready( function(){
    //cambiarRadios();
    cambiarChecks();
});
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

function cambiarRadios(){
 
 ///// RADIO //////
 //se obtienen en este caso todos los elementos de tipo radio que se encuentren
    radioButtons = $('input[type="radio"]');
 
    /*En donde se encuentre algún radio este se ocultará, y al mismo tiempo se creará un elemento span, con la clase del radio false*/
    radioButtons.each( function(){
        $(this).after('<span rel="' + this.id + '" class="footage-radio"></span>').css('display','none');
    });
 
    $('input[type="radio"]:checked').each(function(){
        $('span.footage-radio[rel="' + this.id + '"]').addClass('checked');
    }); 

    radioButtons.change( function(){
       
        radioButtons.each( function(){
            $('span.footage-radio[rel="' + this.id + '"]').removeClass('checked');
            this.checked = false;
        });
        
        $('span.footage-radio[rel="' + this.id + '"]').addClass('checked');
        this.checked = true;
       
    });
 
    //aquí mandamos hacempos que al darle click al radio ficticio , cambie el real
    $('span.footage-radio').click( function(){
        tempRadio = $('input#'+$(this).attr('rel')).change();
    });
 
    //aqui se asigna el cambio del estado de los radio en el label, para respetar la semántica de este
    //$('label').click( function(){
        //tempRadio = $('input#'+$(this).attr('for')).change();
    //});
}


