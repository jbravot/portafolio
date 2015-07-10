/***************************************
variables globales
****************************************/
var map, rutasByID, paradasByID, layer_paradas, selectControl;
var apiKey = "AqTGBsziZHIJYYxgivLBf0hVdrAk9mWO5cQcb8Yux8sW5M8c8opEC2lZqKR1ZZXf";
var ruta_path_icon = "web/images/marker/default.png";
var gg = new OpenLayers.Projection("EPSG:4326");
var sm = new OpenLayers.Projection("EPSG:900913");

$(document).ready(function () {

    OpenLayers.Lang.setCode('en');
	// create map
    map = new OpenLayers.Map({
		div: "map_canvas",
		projection: sm,
		numZoomLevels: 18,
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
				{numZoomLevels: 18}
			),
			new OpenLayers.Layer.Google(
				"Google Hybrid",
				{type: google.maps.MapTypeId.HYBRID, numZoomLevels: 18}
			),
			new OpenLayers.Layer.Google(
				"Google Satellite",
				{type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 18}
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
            }),
		],
		center: new OpenLayers.LonLat(-8894255.605853265, -237997.43648986897),
		zoom: 15,
	});

	// == AGREGAR CONTROL ==
	map.addControl(new OpenLayers.Control.LayerSwitcher());
	map.addControl(new OpenLayers.Control.MousePosition());
	map.addControl(new OpenLayers.Control.ScaleLine());
});
/***************************************
funcion para
****************************************/
function ocultarLayer(layer_nombre){
	var layer = map.getLayersByName(layer_nombre)[0];
    if(layer.getVisibility()){
		layer.setVisibility(false);
    }else{
         layer.setVisibility(true);
    }
}
/***************************************
funcion para
****************************************/
function buscarLayer(layer_nombre,valor){
	var layer = map.getLayersByName(layer_nombre)[0];
    layer.setVisibility(valor);
}
/***************************************
funcion para agregar rutas al mapa
****************************************/
function agregarRutas(){
	$.each(rutasByID, function(id,data){
		var feature_array = [];
		var feature = new OpenLayers.Feature.Vector( OpenLayers.Geometry.fromWKT(data.geom));
		var layer = new OpenLayers.Layer.Vector(data.nombre, {
			displayInLayerSwitcher: false,
			styleMap: new OpenLayers.StyleMap({
						fillColor: data.color,
						strokeColor: data.color,
						strokeDashstyle: "dash",
						cursor: "pointer",
			}),
		});
		var len = feature.geometry.components.length;
		var from = feature.geometry.components[0];
		var to = feature.geometry.components[1];
		var c = {x:(from.x + to.x) / 2, y:(from.y + to.y) / 2}

		feature_array = recorrerLineString(feature.geometry.components,data.color,data.nombre,feature_array)

		feature_array.push(feature);
		map.addLayer(layer);
		layer.addFeatures(feature_array);
	});
}
/***************************************
funcion para cagregar paradas al mapa
****************************************/
function agregarParadas(){
	layer_paradas = [];
	$.each(paradasByID, function(id,data){
		var feature = new OpenLayers.Feature.Vector( OpenLayers.Geometry.fromWKT(data.geom));
		var layer = new OpenLayers.Layer.Vector(data.nombre, {
			displayInLayerSwitcher: false,
			styleMap: new OpenLayers.StyleMap({
						pointRadius: 17,
						externalGraphic: data.icono,
						cursor: "pointer",
			}),
			eventListeners:{
				'featureselected':function(evt){
					var feature = evt.feature;
					OpenLayers.Popup.FramedCloud.prototype.autoSize = true;
					OpenLayers.Popup.FramedCloud.prototype.relativePosition = "cm"
					var popup = new OpenLayers.Popup.FramedCloud(
						"popup",
						OpenLayers.LonLat.fromString(feature.geometry.toShortString()),
						null,
						"<div style='font-size:.8em'><center><strong>" + data.nombre + "</strong></center><br><strong>Direccion: </strong>" + data.direccion + "<br><strong>info: </strong>" + data.info_adicional + "<br>" + data.descripcion +"</div>",
						null,
						true
					);

					feature.popup = popup;
					map.addPopup(popup);
				},
				'featureunselected':function(evt){
					var feature = evt.feature;
					map.removePopup(feature.popup);
					feature.popup.destroy();
					feature.popup = null;
				},
		   }
		});

		layer_paradas.push(layer);
		var c = feature.geometry.getCentroid();
		var label = agregarLabel(data.nombre, "rt", c.x, c.y, "#1f8eb9");
		map.addLayer(layer);
		layer.addFeatures([feature,label]);
	});

	addSelectControl();
}
/***************************************
funcion para agregar label
****************************************/
function agregarLabel(nombre, align, p_x, p_y, color){
	var label = new OpenLayers.Feature.Vector(
		new OpenLayers.Geometry.Point(p_x, p_y), {}, {
				label: nombre,
				fontColor: color,
				fontSize: "11px",
				fontFamily: "Arial",
				fontWeight: "bold",
				labelAlign: align,
				labelOutlineColor: "white",
				labelOutlineWidth: 3,
		});
	return label;
}
/***************************************
funcion para agregar Triangulos
****************************************/
function agregarTriangulo(color, p_x, p_y, angle){
	var label = new OpenLayers.Feature.Vector(
		new OpenLayers.Geometry.Point(p_x, p_y), {}, {
				strokeColor: color,
                fillColor: color,
                srokeWidth: 2,
                strokeOpacity : 0.8,
                pointRadius: 3,
                graphicName: "triangle",
                rotation: angle
	});
	return label;
}
/***************************************
funcion para recorrer el linestring de una ruta
****************************************/
function recorrerLineString(components,color,nombre,feature_array){
	var component_anterior;
	var angle = "";
	$.each(components, function(id,data){
		if(component_anterior != null){
			angle = getAngleofLine(component_anterior,data);
			var c = {x:(component_anterior.x + data.x) / 2, y:(component_anterior.y + data.y) / 2}
			var triangulo = agregarTriangulo(color, c.x, c.y, angle);
			if(id%3 == 0){
				var label = agregarLabel(nombre, "cm", c.x, c.y, "#000");
				feature_array.push(label);
			}
			feature_array.push(triangulo);
		}
		component_anterior = data;
	});
	return feature_array;
}
/***************************************
funcion para agregarControlSelect
****************************************/
function addSelectControl(){
	selectControl = new OpenLayers.Control.SelectFeature(
                layer_paradas,
                {
                    click:true,
					autoActivate:true
                }
    );
	map.addControl(selectControl);
	selectControl.activate();
}
/***************************************
funcion para obtener el angulo de la direccion de la ruta //http://geometricnet.sourceforge.net/examples/directions.html
****************************************/
function getAngleofLine(from,to) //calculate angle for screen
{
	b_x = 0;
	b_y = 1;
	a_x = to.x - from.x;
	a_y = to.y - from.y;
	angle_rad = Math.acos((a_x*b_x+a_y*b_y)/Math.sqrt(a_x*a_x+a_y*a_y)) ;
	angle = 360/(2*Math.PI)*angle_rad;
	if (a_x < 0) {
	    return 360 - angle;
	} else {
	    return angle;
	}
}