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

    getPostCode(longitude,latitude); //Get and alert postcode with coordinates
});

function getPostCode(longitude,latitude){
    const url="https://api.postcodes.io/postcodes?lon="+longitude+"&lat="+latitude;
    $.getJSON(url, function(data) {
        //data is the JSON string
        var response = data;
        var postcode = response.result[0].postcode; //Nearest postcode for the given coordinate
        alert("Longitude: " + longitude + " | Latitude: " + latitude + " | Postcode: " + postcode);
    });
}

