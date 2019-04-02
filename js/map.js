var center = ol.proj.transform([-0.118092, 51.5074], 'EPSG:4326', 'EPSG:3857');
var view = new ol.View({
    center: center,
    zoom: 11
});

var layer = new ol.layer.Tile({
    source: new ol.source.OSM()
});

var map = new ol.Map({
    layers: [layer],
    target: 'map',
    view: view
});

map.on('click', function (evt) {
    var coord = map.getCoordinateFromPixel(evt.pixel);
    var longitude =ol.proj.toLonLat(coord)[0];
    var latitude =ol.proj.toLonLat(coord)[1];
    alert("Longitude: " + longitude + " | Latitude: " + latitude);
});