/***************************************
variables globales
****************************************/
var map, editor;
var apiKey = "AqTGBsziZHIJYYxgivLBf0hVdrAk9mWO5cQcb8Yux8sW5M8c8opEC2lZqKR1ZZXf";
var ruta_path_icon = "web/images/marker/default.png";
var color_figura = "#07f";
var gg = new OpenLayers.Projection("EPSG:4326");
var sm = new OpenLayers.Projection("EPSG:900913");

$(document).ready(function () {

    OpenLayers.Lang.setCode('en');
	// create map
    map = new OpenLayers.Map({
		div: "map_canvas",
		projection: sm,
		numZoomLevels: 20,
		layers: [
			new OpenLayers.Layer.OSM("OpenStreetMap", null, {
				transitionEffect: 'resize',
			}),
			new OpenLayers.Layer.Google(
				"Google Physical",
				{type: google.maps.MapTypeId.TERRAIN}
			),
			new OpenLayers.Layer.Google(
				"Google Streets", // the default
				{numZoomLevels: 20}
			),
			new OpenLayers.Layer.Google(
				"Google Hybrid",
				{type: google.maps.MapTypeId.HYBRID, numZoomLevels: 20}
			),
			new OpenLayers.Layer.Google(
				"Google Satellite",
				{type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22}
			),
			new OpenLayers.Layer.Bing({
                name: "Bing Road",
                key: apiKey,
                type: "Road"
            }),
            new OpenLayers.Layer.Bing({
                name: "bing Hybrid",
                key: apiKey,
                type: "AerialWithLabels"
            }),
            new OpenLayers.Layer.Bing({
                name: "Bing Aerial",
                key: apiKey,
                type: "Aerial"
            })
		],
		center: new OpenLayers.LonLat(-8894255.605853265, -237997.43648986897),
		zoom: 18
	});

	// == EDITOR DE GRAFICOS ==
    editor = new OpenLayers.Editor(map, {
        activeControls: ['ExpandMap','DragFeature', 'ModifyFeature'],
        featureTypes: ['path', 'point']
    });
			
    editor.startEditMode();

	// == AGREGAR CONTROL ==
	map.addControl(new OpenLayers.Control.LayerSwitcher());
	map.addControl(new OpenLayers.Control.MousePosition());
	map.addControl(new OpenLayers.Control.ScaleLine());
	
});
/***************************************
funcion para cambiar el estilo del StyleMap
****************************************/
function setMapEstiloPoint(ruta_icono){
	var styleMapa = new OpenLayers.StyleMap({
		'default': new OpenLayers.Style({
					fillOpacity: 1,
					strokeOpacity: 1,
					graphicZIndex: 11,
					pointRadius: 17,
					externalGraphic: ruta_icono,
				}),
		'select': new OpenLayers.Style({
					fillOpacity: 1,
					strokeOpacity: 1,
					graphicZIndex: 13,
					pointRadius: 17,
					externalGraphic: ruta_icono,
                }),
        'temporary': new OpenLayers.Style({
					fillOpacity: 1,
					strokeOpacity: 1,
					graphicZIndex: 13,
					pointRadius: 17,
					externalGraphic: ruta_icono,
                })
	});
	return styleMapa;
}
/***************************************
funcion apra obtener la ruta de las linesas y poligonos
****************************************/
function obtenerDatosGeometricos(){
	var figuras = editor.editLayer.features;
	if( figuras.length > 0 ){
		$("#geometry_coord").val( editor.editLayer.features[0].geometry );
		return true;
	}
	return false;
}
/***************************************
funcion para cambiar la posicion del icono
****************************************/
function cambiarPosicionIcono(){
	var t = $("#map_canvas image").attr("y");
	$("#map_canvas image").attr("y", (t - 15));		
}