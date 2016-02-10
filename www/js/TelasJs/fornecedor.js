$(document).ready(function() {

    var token = localStorage.getItem('jtoken');

    $.ajax({
        url: "http://localhost:64817/api/pedideiro/fornecedores/todos",
        type: 'GET',
        contentType: 'application/json',
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    .done(function (data) {
        $.each(data, function (key, item) {
            // Add a list item for the product.
            $(".list-vendor").append(
                    " <li>"+
                    " <a href='#fornecedor' data-transition='slide'>"+
                    " <i class='flaticon-transport643'></i>"+
                    " <div class='list-info'>"+
                    " <h3>Varejão das frutas</h3>"+
                    " <span class='list-info-footer'><i class='icon-location-6 mini-icon'></i> Conjunto Esperança</span>"+
                    " </div>"+
                    " </a>"+
                    " </li>")
                             });
        // $("#result-area").append("<p>" + data + "</p>");
        $('.list-vendor').listview('refresh');
    })
    .error(function (error) {

        if (error.status == 401) {
        localStorage.setItem('jtoken', '');
        window.location.href = 'index.html'
        }


        //$("#result-area").append("<p>Falha na requisição</p>");
    });

}).on('deviceready', function () {

});
