var latitude, longitude;
var url = "https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&countrycodes=br&namedetails=1&extratags=1&q=";

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
        minLength: 3,
        source: function (request, response) {
            var query = request.term;

            $.ajax({
                url: url + query,
                dataType: 'json',
                success: function (data) {
                    response(data);
                }
            });
        },
        focus: function (event, ui) {
            var nome = ui.item.namedetails.name;
            var estado = ui.item.address.state;
            $("#origem").val(nome + ", " + estado);
            return false;
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
        minLength: 3,
        source: function (request, response) {
            var query = request.term;

            $.ajax({
                url: url + query,
                dataType: 'json',
                success: function (data) {
                    response(data);
                }
            });
        },
        focus: function (event, ui) {
            var nome = ui.item.namedetails.name;
            var estado = ui.item.address.state;
            $("#destino").val(nome + ", " + estado);
            return false;
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

function renderItem(item) {
    var classe = item.class;
    var tipo = item.type;
    var result = "";

    if (classe == "boundary" || classe == "place" || classe == "highway") {
        if (classe == "place" && tipo == "hamlet") {
            result = '<span><b>' + item.display_name.trim() + '</b><span><br/><small>' + item.address.country.trim() + '</small>';
        } else {
            if (item.address.road != null) {
                result = '<span><b>' + item.address.road.trim() + ', ' + item.address.suburb.trim + ' - ' + item.address.city.trim() + '</b><span><br/><small>' + item.address.state.trim() + 'CEP: ' + item.address.postcode + '</small>';
            } else if (item.address.suburb != null) {
                result = '<span><b>' + item.address.suburb.trim + ' - ' + item.address.city.trim() + '</b><span><br/><small>' + item.address.state.trim() + '</small>';
            } else if (item.address.city != null) {
                result = '<span><b>' + item.address.city.trim() + '</b><span><br/><small>' + item.address.state.trim() + '</small>';
            } else {
                result = '<span><b>' + item.address.state.trim() + '</b><span><br/><small>' + item.address.country.trim() + '</small>';
            }
        }
    } else {
        result = '<span><b>' + item.namedetails.name.trim() + '</b><span><br/><small><b>' + item.address.road.trim() + ', ' + item.address.suburb.trim + ' - ' + item.address.city.trim() + '</b><smapp><br/><small>' + item.address.state.trim() + 'CEP: ' + item.address.postcode + '</small>';
    }
}