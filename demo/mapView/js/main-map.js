/***************************************
variables globales
****************************************/
var map;
var apiKey = "AqTGBsziZHIJYYxgivLBf0hVdrAk9mWO5cQcb8Yux8sW5M8c8opEC2lZqKR1ZZXf";
var gg = new OpenLayers.Projection("EPSG:4326");
var sm = new OpenLayers.Projection("EPSG:900913");

/***************************************
Inicializamos mapa
****************************************/
var init = function (onSelectFeatureFunction) {
	//agregamos la capa para geolocate
    var layer_geolocate = new OpenLayers.Layer.Vector("Geolocate", {displayInLayerSwitcher: false});
	
	//creamos la capa que contendra a todas las geometrias
    var layer_rutas = new OpenLayers.Layer.Vector("Rutas", {
		displayInLayerSwitcher: false,
        styleMap: new OpenLayers.StyleMap({
			//pointRadius: 17,
            fillColor: "${Color}",
			strokeColor: "${Color}",
			strokeDashstyle: "dash",
			graphicOpacity: 1.0,
            graphicWidth: 16,
            graphicHeight: 26,
            graphicYOffset: -26
        })
    });
	var layer_paradas = new OpenLayers.Layer.Vector("Paradas", {
		displayInLayerSwitcher: false,
        styleMap: new OpenLayers.StyleMap({
			//pointRadius: 17,
            externalGraphic: "img/mobile-loc.png",
            cursor: "pointer",
			label: "${Nombre}",
			fontColor: "#000",
			fontSize: "12px",
			fontFamily: "Arial",
			fontWeight: "bold",
			labelAlign: "cm",
			labelOutlineColor: "white",
			labelOutlineWidth: 3,
			graphicOpacity: 1.0,
            graphicWidth: 32,
            graphicHeight: 37,
            graphicYOffset: -37
        })
    });

	//obtenemos las geometrias y las agregamos a la capa
    var geometria_rutas = getRutas();
    layer_rutas.addFeatures(geometria_rutas);
	var geometria_paradas = getParadas();
    layer_paradas.addFeatures(geometria_paradas);
	
	//agregamos el control apra eventos a la capa
    var selectControl = new OpenLayers.Control.SelectFeature(layer_paradas, {
        autoActivate:true,
        onSelect: onSelectFeatureFunction});
	
	//agregamos el control geolocate
    var geolocate = new OpenLayers.Control.Geolocate({
        id: 'locate-control',
        geolocationOptions: {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: 7000
        }
    });
	
    // creamos el mapa
    map = new OpenLayers.Map({
        div: "map",
        theme: null,
        projection: sm,
        numZoomLevels: 18,
        tileManager: new OpenLayers.TileManager(),
        controls: [
            new OpenLayers.Control.Attribution(),
            new OpenLayers.Control.TouchNavigation({
                dragPanOptions: {
                    enableKinetic: true
                }
            }),
            geolocate,
            selectControl
        ],
        layers: [
            new OpenLayers.Layer.OSM("OpenStreetMap", null, {
                transitionEffect: 'resize'
            }),
			/*new OpenLayers.Layer.Google(
				"Google Streets", // the default
				{numZoomLevels: 18}
			),
			new OpenLayers.Layer.Google(
				"Google Hybrid",
				{type: google.maps.MapTypeId.HYBRID, numZoomLevels: 18}
			),*/
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
            layer_rutas,
			layer_geolocate,
			layer_paradas
			
        ],
        center: new OpenLayers.LonLat(-8894255.605853265, -237997.43648986897),
        zoom: 15
    });

	//esto es para mostrar cuando hay locate --------------------------------
    var style = {
        fillOpacity: 0.1,
        fillColor: '#000',
        strokeColor: '#f00',
        strokeOpacity: 0.6
    };
    geolocate.events.register("locationupdated", this, function(e) {
        layer_geolocate.removeAllFeatures();
        layer_geolocate.addFeatures([
            new OpenLayers.Feature.Vector(
                e.point,
                {},
                {
                    externalGraphic: "img/my_locate.png",
					strokeColor: '#0000ff',
                    strokeWidth: 2,
                    graphicOpacity: 1,
					graphicWidth: 16,
					graphicHeight: 16,
                }
            ),
            new OpenLayers.Feature.Vector(
                OpenLayers.Geometry.Polygon.createRegularPolygon(
                    new OpenLayers.Geometry.Point(e.point.x, e.point.y),
                    e.position.coords.accuracy / 2,
                    50,
                    0
                ),
                {},
                style
            )
		]);
        map.zoomToExtent(layer_geolocate.getDataExtent());
    });
	//-----------------------------------------
    function getRutas() {
        var features = {
            "type": "FeatureCollection",
            "features": [
                { "type": "Feature", "geometry": {"type": "LineString", "coordinates": [ [-8891984.2915014997000000, -238562.0553198100000000], [-8891998.0262800008000000, -238523.8368056700000000], [-8892046.9937511999000000, -238470.6891844499900000], [-8892213.6025862992000000, -238406.7926061300100000], [-8892359.3106715009000000, -238354.2421491899900000], [-8892454.2597924992000000, -238316.0236350499900000], [-8892484.1180067006000000, -238284.9710923100100000], [-8892546.2230922002000000, -238423.5132060599900000], [-8892647.1438561007000000, -238616.3972696000100000], [-8892734.9270057008000000, -238785.3947618000100000], [-8892795.8377625998000000, -238903.6332899100100000], [-8892880.0379265007000000, -239068.1520500000000000], [-8892896.7585265003000000, -239129.9585533200000000], [-8892914.6734549999000000, -239197.4381173499900000], [-8892926.6167405993000000, -239277.4581313199900000] ]},
                    "properties": {"Nombre": "Ruta Terminal - Av. Americas", "Color":"#00ff00"}}
            ]
        };

        var reader = new OpenLayers.Format.GeoJSON();

        return reader.read(features);
    }
	function getParadas() {
        var features = {
            "type": "FeatureCollection",
            "features": [
                { "type": "Feature", "geometry": {"type": "Point", "coordinates": [-8891977.1255299654000000, -238565.9368876474600000]},
                    "properties": {"Nombre": "Terminal", "Ruta":"Ruta Terminal - Av. Americas", "Direccion":"Terminal Terrestre", "Horario":"07:30"}},
				{ "type": "Feature", "geometry": {"type": "Point", "coordinates": [-8892620.2714631334000000, -238537.8701663406700000]},
                    "properties": {"Nombre": "Avicola Fernandez", "Ruta":"Ruta Terminal - Av. Americas", "Direccion":"Avicola Fernandez", "Horario":"07:30"}},
				{ "type": "Feature", "geometry": {"type": "Point", "coordinates": [-8892754.6334269997000000, -238804.2054367400100000]},
                    "properties": {"Nombre": "Mi Comisariato", "Ruta":"Ruta Terminal - Av. Americas", "Direccion":"Mi Comisariato", "Horario":"07:30"}},
				{ "type": "Feature", "geometry": {"type": "Point", "coordinates": [-8892917.6592763998000000, -239182.2104281300000000]},
                    "properties": {"Nombre": "Trasnportes Esmeraldas", "Ruta":"Ruta Terminal - Av. Americas", "Direccion":"Trasnportes Esmeraldas", "Horario":"07:30"}},
				{ "type": "Feature", "geometry": {"type": "Point", "coordinates": [-8892930.7968907002000000, -239269.9935777800000000]},
                    "properties": {"Nombre": "Av. Americas", "Ruta":"Ruta Terminal - Av. Americas", "Direccion":"Av. Americas", "Horario":"07:30"}},
            ]
        };

        var reader = new OpenLayers.Format.GeoJSON();

        return reader.read(features);
    }

};
