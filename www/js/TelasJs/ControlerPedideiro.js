
//Gerenciador pedideiro.

var PedideiroManager = {

    incializarPedideiro: function(){




    $(document).on("click", "#lista_fornecedores li" ,function (event) {

        var codigo = $(this).find(".codigoFornecedor").val()





    });









 },

    basePath: function () { return 'http://localhost:64817/api'; },

    loginUsuario : function(){

        var data = {
            grant_type: 'password',
            username: $("#txtEmail").val(),
            password: $("#txtSenha").val()
        }

        $.ajax({
            url: this.basePath()+'/security/token',
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded',
            data: data
        })
        .done(function (data) {

            console.log(data);
            //  $("#result-area").append("<p>" + data.access_token + "</p>");
            localStorage.setItem('jtoken', data.access_token);
            window.location.href = "#fornecedores";

        })
        .error(function (data) {
            alert('Usuário ou senha inválidos');
            //$("#result-area").append("<p>Usuário ou senha inválidos</p>");
        });



    },//Funcao login de usuario.

    criarUsuario : function(){


        var usuario = null;
        usuario = {
            Nome: $("#txtNome").val(),
            Email: $("#txtEmail").val(),
            Fone: $("#txtTelefone").val(),
            Endereco: $("#txtEndereco").val(),
            Complemento: $("#txtComplemento").val(),
            NumeroCasa: $("#txtNumero").val(),
            Senha: $("#txtSenha").val()


        }

        $(function () {

            $.ajax({
                type: "POST",
                data: JSON.stringify(usuario),
                url: this.basePath + "/pedideiro/usuario/criar",
                contentType: "application/json"

            }).done(function (data) {

                showAlert(data, 'Info', 'OK');
                window.location.href = '#index';
            }).error(function (data) {

                showAlert(data.responseText, 'Erro', 'OK');
            });

        });

    },//Funcao para criar usuario.

    carregarFornecedores: function () {

        var token = localStorage.getItem('jtoken');

        $.ajax({
            url:   this.basePath() + "/pedideiro/fornecedores/todos",
            type: 'GET',
            contentType: 'application/json',
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        .done(function (data) {
            $("#lista_fornecedores").empty();
            $.each(data, function (key, item) {
                // Add a list item for the product.

                $("#lista_fornecedores").append(
                        " <li>" +
                        " <a class='lista-fornecedor' href='#fornecedorProdutos' data-transition='slide'>"+
                        " <i class='flaticon-transport643'></i>" +
                        " <div class='list-info'>" +
                        " <h3>"+item.Nome+"</h3>" +
                        " <span class='list-info-footer'><i class='icon-location-6 mini-icon'></i> Conjunto Esperança</span>" +
                        " </div>" +
                        "<input class='codigoFornecedor' value="+item.Id+" hidden='hidden'>"+
                        " </a>" +
                        " </li>")
            });
            // $("#result-area").append("<p>" + data + "</p>");
            $('#lista_fornecedores').listview('refresh');
        })
        .error(function (error) {

            if (error.status == 401) {

                   localStorage.setItem('jtoken', '');
                   window.location.href = '#index';
            }


            //$("#result-area").append("<p>Falha na requisição</p>");
        });



    },//Funcao para lista os fornecedores.

    logoffUsuario: function() {

        localStorage.setItem('jtoken', '');
        window.location.href = '#index';

    },//logoff da aplicacao.

    carregarMapa : function(){

    var geocoder;
    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;
    var marker;
    var salon = new google.maps.LatLng(22.981666,120.194301);
    var defaultLatLng = new google.maps.LatLng(-3.725,-38.5304);

    if ( navigator.geolocation ) {
        function success(pos) {
            // Location found, show map with these coordinates
            drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            //calcRoute(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        }

        function fail(error) {
            console.log(error);
            drawMap(defaultLatLng);  // Failed to find location, show default map
        }

        // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
        navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});
    } else {
        drawMap(defaultLatLng);  // No geolocation support, show default map
    }

    function drawMap(latlng) {

        directionsDisplay = new google.maps.DirectionsRenderer();

        var myOptions = {
            zoom: 16,
            center: latlng,
            styles: [{ "stylers": [{ "saturation": -200 }] }, { "featureType": "water", "elementType": "geometry.fill", "stylers": [{ "color": "#01ACE7" }] }, { "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "color": "#79D35F" }] }, { "featureType": "road.highway", "elementType": "labels", "stylers": [{ "visibility": "on" }] }, { "featureType": "road.arterial", "elementType": "labels.text", "stylers": [{ "visibility": "on" }] }, { "featureType": "road.local", "elementType": "labels.text", "stylers": [{ "visibility": "on" }] }, {}],

            mapTypeId: google.maps.MapTypeId.ROADMAP

        };

        map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
        directionsDisplay.setMap(map);
        // Add an overlay to the map of current lat/lng
         geocoder = new google.maps.Geocoder();

         marker = new google.maps.Marker({
            position: latlng,
            map: map,
            draggable: true,
            title: "Greetings!"
        });

       /* possiveis pontos var marker = new google.maps.Marker({
            position:new google.maps.LatLng(-3.7329,-38.5353),
            map:map,
            title:"the salon"
        }); */

      google.maps.event.addListener(marker, 'drag', function () {
                        geocoder.geocode({ 'latLng': marker.getPosition() }, function (results, status) {
                            if (status == google.maps.GeocoderStatus.OK) {
                                if (results[0]) {
                                    $('#search-1').val(results[0].formatted_address);
                                    $('#txtLatitude').val(marker.getPosition().lat());
                                    $('#txtLongitude').val(marker.getPosition().lng());
                                }
                            }
                        });
                    });
    }

    function calcRoute(latlng) {
    var start = latlng;
    var end = new google.maps.LatLng(-3.7329,-38.5353);
    var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
    }
  });
}

    function carregarNoMapa(endereco) {
                geocoder.geocode({ 'address': endereco + ', Brasil', 'region': 'BR' }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            var latitude = results[0].geometry.location.lat();
                            var longitude = results[0].geometry.location.lng();

                            $('#search-1').val(results[0].formatted_address);
                            $('#txtLatitude').val(latitude);
                            $('#txtLongitude').val(longitude);

                            var location = new google.maps.LatLng(latitude, longitude);
                            marker.setPosition(location);
                            map.setCenter(location);
                            map.setZoom(16);
                        }
                    }
                })
            }

    $('#search-1').blur(function () {
                if ($(this).val() != "")
                    carregarNoMapa($(this).val());
            })

    $('#search-1').autocomplete({
                source: function (request, response) {
                    geocoder.geocode({ 'address': request.term + ', Brasil', 'region': 'BR' }, function (results, status) {
                        response($.map(results, function (item) {
                            return {
                                label: item.formatted_address,
                                value: item.formatted_address,
                                latitude: item.geometry.location.lat(),
                                longitude: item.geometry.location.lng()
                            }
                        }));
                    })
                },
                select: function (event, ui) {
                    $("#txtLatitude").val(ui.item.latitude);
                    $("#txtLongitude").val(ui.item.longitude);
                    var location = new google.maps.LatLng(ui.item.latitude, ui.item.longitude);
                    marker.setPosition(location);
                    map.setCenter(location);
                    map.setZoom(16);
                }
            });

    }, // Carregar Mapa de Fornecedores.

    carregarProdutos : function(id){

        var token = localStorage.getItem('jtoken');

        $.ajax({
            url:   this.basePath() + "/pedideiro/produtos/obter?Id=" +id,
            type: 'GET',
            contentType: 'application/json',
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        .done(function (data) {
            $("#lista-produtos").empty();
            $("#").append();//Recarrega de lista

            $.each(data, function (key, item) {
                // Add a list item for the product.
               $("#lista-produtos").append(
                "<li>"+
                "<input name='checkbox-h-6a7' id='checkbox-h-6a7' type='checkbox'>"+
                "<label for='checkbox-h-6a7'>"+
                "<img src='img/garrafao.png'/>"+
                "<h3>Indaiá - 20L (Unidade)</h3>"+
                "<span>R$ 7,50</span>"+
                "</label>"+
                "</li>")




              });

             $('#lista-produtos').listview('refresh');



        });



    }, // Carrega lista de produtos por fornecedor.




}
