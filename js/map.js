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

map.getView().on('change:resolution', function(evt){
    var zoom = map.getView().getZoom();
    if (zoom > 16 && zoom <16.1) {
        getCrimeData(map);
    }
});

//Gets the nearest UK postcode to a given coordinate
function getPostCode(longitude,latitude){
    const url="https://api.postcodes.io/postcodes?lon="+longitude+"&lat="+latitude;
    $.getJSON(url, function(data) {
        try{
            var postcode = data.result[0].postcode; //Nearest postcode for the given coordinate
            alert("Longitude: " + longitude + " | Latitude: " + latitude + " | Postcode: " + postcode);
        }
        catch(error){
            alert("Longitude: " + longitude + " | Latitude: " + latitude + " | Postcode: " + "N/A");
        }
    });
}

//Gets crime data for a given visible window
function getCrimeData(map){
    //Get extent of the map
    var glbox = map.getView().calculateExtent(map.getSize()); 
    var box = ol.proj.transformExtent(glbox,'EPSG:3857','EPSG:4326'); 
    //Convert extent to coordinates for polygon
    //bottom left = box[0] and box[1]
    //bottom right = box[2] and box[1]
    //top left = box[0] and box[3]
    //top right = box[2] and box[3] 
    var bottom_left = box[1]+","+box[0];
    var bottom_right = box[1]+","+box[2];
    var top_left = box[3]+","+box[0];
    var top_right = box[3]+","+box[2];
    const url = "https://data.police.uk/api/crimes-street/all-crime?poly="+bottom_left+":"+bottom_right+":"+top_left+":"+top_right;
    console.log(url);
    $.getJSON(url, function(data) {
        //data is the JSON string
        console.log(data);
    });
}

