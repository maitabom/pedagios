var mymap = L.map('map').setView([-23.5502, -46.6341], 10);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibWFpdGFib20iLCJhIjoiY2p1NW55ZXkzMWFzcTN5cnZwenJyM2xxeCJ9.HGZAZrcoexl0KF5Lgs1r1Q'
}).addTo(mymap);