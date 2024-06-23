//create tile layer that will be the background of our map

let basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

let myMap = L.map("map",{
    center:[40,-76],
    zoom: 2
})

basemap.addTo(myMap);

url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(url).then(function(data){

//legend colors, to create, use for loop, see activity two exercises and florida heat map
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
let earthquakes = L.geoJson(data,{
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
    }//,
    // style: function(feature){
    //     return {
    //         color: 
    //     }
    // }
}).addTo(myMap);


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
});
