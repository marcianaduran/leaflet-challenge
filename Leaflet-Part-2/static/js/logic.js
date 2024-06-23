//create tile layer that will be the background of our map

let basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

let satellite = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'jpg'
});

let myMap = L.map("map",{
    center:[40,-76],
    zoom: 2
})

basemap.addTo(myMap);

let tectonicPlates = new L.LayerGroup();
let earthquakes = new L.LayerGroup();

let baseMaps = {
    "Current Earthquakes": basemap, 
    "Satellite": satellite
}

let overlays = {
    "Earthquakes": earthquakes,
    "Tectonic Plates": tectonicPlates
}

L.control.layers(baseMaps, overlays).addTo(myMap)

url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(url).then(function(data){

//earthquake depth legend colors
function markerColor(d) {
    return d > 90  ? '#ac3838' :
            d > 70  ? '#e51f1f' :
            d > 50  ? '#f2a134' :
            d > 30   ? '#f7e379' :
            d > 10   ? '#bbdb44' :
            d > -10   ? '#44ce1b' :
                      '#FFFFFF';
}

function markerSize(m){
    if (m === 0){
        return 1;
    }
    return m*4;
}

//add GeoJSON layer to the map once the file is loaded
L.geoJson(data,{
    onEachFeature: function(features, layer){
        layer.bindPopup(`Magnitude: ${features.properties.mag}`);
    },
//turn each feature into a cicleMarker on the map
    pointToLayer: function(feature, latlng){
        return L.circleMarker(latlng,{
            radius: markerSize(feature.properties.mag),
            fillColor: markerColor(feature.geometry.coordinates[2]),
            color: "black",
            weight: 0.5,
            fillOpacity: 0.8
        });
    }
}).addTo(earthquakes);
earthquakes.addTo(myMap);

// Set up the legend.
let legend = L.control({ position: "bottomright" });
legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend")
    let grades = [-10, 10, 30, 50, 70, 90];
    let labels = [];
    let legendInfo = "<h5>Magnitude</h5>";

    for (let i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background-color: ' + markerColor(grades[i]+1) + '"></i> ' +
            grades[i] + (grades[i+1] ? '&ndash;' + grades[i+1] + '<br>' : '+');
    }    

    return div;
    };
// Adding the legend to the map
    legend.addTo(myMap);

d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function(plateData){
    L.geoJson(plateData,{
        color: 'yellow'
    }).addTo(tectonicPlates)
    tectonicPlates.addTo(myMap)
})

});
