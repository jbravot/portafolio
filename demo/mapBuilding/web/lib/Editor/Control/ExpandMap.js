/**
 * @copyright  2013 geOps
 * @license    https://github.com/geops/ole/blob/master/license.txt
 * @link       https://github.com/geops/ole
 */

/**
 * Class: OpenLayers.Editor.Control.ExpadMap
 * Permite expandir el mapa 
 *
 * Inherits from:
 *  - <OpenLayers.Control.Button>
 */
OpenLayers.Editor.Control.ExpandMap = OpenLayers.Class(OpenLayers.Control.Button, {

    title: OpenLayers.i18n('oleExpandMap'),
	
	flag_fullscreen: 0,
	
	width: null,
		
	height: null,
	
	mapdiv: null,

    /**
     * Constructor: OpenLayers.Editor.Control.ExpandMap
     * Create an editing toolbar for a given editor.
     *
     * Parameters:
     * editor - {<OpenLayers.Editor>}
     * options - {Object}
     */
    initialize: function (layer, options) {

        this.layer = layer;
		
		this.flag_fullscreen = 0;
		
		this.mapdiv = document.getElementById("map_canvas");
		
		this.width = this.mapdiv.style.width;
		
		this.height = this.mapdiv.style.height;

        OpenLayers.Control.Button.prototype.initialize.apply(this, [options]);

        this.trigger = this.expand;

        this.title = OpenLayers.i18n('oleExpandMap');

        this.displayClass = this.displayClass;

    },

    /**
     * Method: expandMap
     */
    expand: function () {

        if(this.flag_fullscreen == 0){
			  this.mapdiv.style.position = 'fixed';
			  this.mapdiv.style.top = '0';
			  this.mapdiv.style.left = '0';
			  this.mapdiv.style.width = '100%';
			  this.mapdiv.style.height = '100%';
			  this.mapdiv.style.zIndex = '999';
			  this.flag_fullscreen = 1;
			  $('.olEditorControlExpandMapItemInactive').addClass('olEditorControlExpandMapItemActive');
		  }else{
			  this.mapdiv.style.position = 'relative';
			  this.mapdiv.style.top = '0';
			  this.mapdiv.style.left = '0';
			  this.mapdiv.style.width = this.width;
			  this.mapdiv.style.height = this.height;
			  this.mapdiv.style.zIndex = '0';
			  this.flag_fullscreen = 0;
			  $('.olEditorControlExpandMapItemInactive').removeClass('olEditorControlExpandMapItemActive');
		  }
		  this.map.updateSize();
    },

    CLASS_NAME: 'OpenLayers.Editor.Control.ExpandMap'
});