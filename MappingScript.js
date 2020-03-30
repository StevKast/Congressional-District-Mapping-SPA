$(document).ready(function () {
    var mymap = L.map('mapid').setView([40.1855, -82.4153], 7);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1Ijoic3Rldmthc3QiLCJhIjoiY2sxY2ZvdTZpMGRkdzNpcG1pOTZsZXdkOSJ9.shmP2nU2GXBRp4z3LkpT5Q'
    }).addTo(mymap);



    var lloydResultPath = "result_Lloyd.json";
    var splitlineResultPath = "ShortestSplitLine_Result.json";

    var currentAlgorithm = lloydResultPath;

    drawMap(currentAlgorithm, mymap);

    $("#algSelector").change(function () {

        

        $("select option:selected").each(function () {
            if(this.value == 1) {
                currentAlgorithm = lloydResultPath;
            } else if (this.value == 2) {
                currentAlgorithm = splitlineResultPath;
            }
        });
        clearMap(mymap);
        drawMap(currentAlgorithm, mymap);
    });



});

function drawMap(algorithmJSON, map) {

    var colors = [];

    for (let index = 0; index < 16; index++) {
        colors[index] = '#' + Math.floor(Math.random() * 16777215).toString(16);
    }


    // loading GeoJSON file
    $.getJSON(algorithmJSON, function (data) {
        // L.geoJson function is used to parse geojson file and load on to map
        //L.geoJson(data).addTo(mymap);

        L.geoJSON(data, {
            style: function (feature) {
                switch (feature.properties.district) {
                    case 'd1': return { color: colors[0] };
                    case 'd2': return { color: colors[1] };
                    case 'd3': return { color: colors[2] };
                    case 'd4': return { color: colors[3] };
                    case 'd5': return { color: colors[4] };
                    case 'd6': return { color: colors[5] };
                    case 'd7': return { color: colors[6] };
                    case 'd8': return { color: colors[7] };
                    case 'd9': return { color: colors[8] };
                    case 'd10': return { color: colors[9] };
                    case 'd11': return { color: colors[10] };
                    case 'd12': return { color: colors[11] };
                    case 'd13': return { color: colors[12] };
                    case 'd14': return { color: colors[13] };
                    case 'd15': return { color: colors[14] };
                    case 'd16': return { color: colors[15] };
                    default: return { color: "#000000" };
                }
            },
            weight: .6,
            fillOpacity: .4
        }).addTo(map);

        // L.geoJSON(data, {
        //     style: function (feature) {
        //         if (feature.properties.GEOID.includes("2")) {
        //             return { color: "#ff0088" };
        //         } else {
        //             return { color: "#8800ff" };
        //         }
        //     }
        // }).addTo(mymap);


    });
}

function clearMap(map) {
    map.eachLayer(function (layer) {
        map.removeLayer(layer);
    });

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1Ijoic3Rldmthc3QiLCJhIjoiY2sxY2ZvdTZpMGRkdzNpcG1pOTZsZXdkOSJ9.shmP2nU2GXBRp4z3LkpT5Q'
    }).addTo(map);
}
