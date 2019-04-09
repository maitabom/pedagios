var latitude, longitude;

$(function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            showMap(latitude, longitude);
        });
    } else {
        latitude = -23.5502;
        longitude = -46.6341;
        showMap(latitude, longitude);
    }

    $("#origem").autocomplete({
        source: function (request, response) {
            var query = request.term;
            var url = "http://nominatim.openstreetmap.org/search?format=json&limit=5&q=";

            $.ajax({
                url: url + query,
                dataType: 'json',
                success: function (data) {
                    response(data);
                }
            });
        },
        select: function (event, ui) {
            //$('#nome_funcionario').val(ui.item.nome.trim());
            //$('#id_funcionario').val(ui.item.id);

            return false;
        }
    }).autocomplete("instance")._renderItem = function (ul, item) {
        return $("<li>")
            .append('<span>' + item.display_name.trim() + '</span>')
            .appendTo(ul);
    };

    $("#destino").autocomplete({
        source: function (request, response) {
            var query = request.term;
            var url = "http://nominatim.openstreetmap.org/search?format=json&limit=5&q=";

            $.ajax({
                url: url + query,
                dataType: 'json',
                success: function (data) {
                    response(data);
                }
            });
        },
        select: function (event, ui) {
            //$('#nome_funcionario').val(ui.item.nome.trim());
            //$('#id_funcionario').val(ui.item.id);

            return false;
        }
    }).autocomplete("instance")._renderItem = function (ul, item) {
        return $("<li>")
            .append('<span>' + item.display_name.trim() + '</span>')
            .appendTo(ul);
    };
});

function showMap(latitude, longitude) {
    var mymap = L.map('map').setView([latitude, longitude], 10);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoibWFpdGFib20iLCJhIjoiY2p1NW55ZXkzMWFzcTN5cnZwenJyM2xxeCJ9.HGZAZrcoexl0KF5Lgs1r1Q'
    }).addTo(mymap);
}