
jQuery(document).ready(function () {

    var token = localStorage.getItem('jtoken');

    if (token == "" || token == null) {
        $("#btnEntrar").on('click', function () {
            //depois remover para arquivo

            var data = {
                grant_type: 'password',
                username: $("#txtEmailLogin").val(),
                password: $("#txtSenhaLogin").val()
            }

            $.ajax({
                url: 'http://localhost:64817/api/security/token',
                type: 'POST',
                contentType: 'application/x-www-form-urlencoded',
                data: data
            })
            .done(function (data) {

                console.log(data);
                //  $("#result-area").append("<p>" + data.access_token + "</p>");
                localStorage.setItem('jtoken', data.access_token);
                ;

            })
            .error(function (data) {
                showAlert('Usuário ou senha inválidos');
                //$("#result-area").append("<p>Usuário ou senha inválidos</p>");
            });




        });
    } else {
        window.location.href = 'fornecedor.html';
    }
    //$("#request-button").on('click', function () {
    //    var token = localStorage.getItem('jtoken');

    //    $.ajax({
    //        url: "http://localhost:15797/api/values",
    //        type: 'get',
    //        contentType: 'application/json',
    //        headers: {
    //            "Authorization": "Bearer " + token
    //        }
    //    })
    //    .done(function (data) {
    //        // $("#result-area").append("<p>" + data + "</p>");
    //    })
    //    .error(function (error) {
    //        showAlert('Falha na requisição do token')
    //        //$("#result-area").append("<p>Falha na requisição</p>");
    //    });
    //});
    // do document ready stuff


    function CriarUsuario() {
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
                url: "http://localhost:64817/api/pedideiro/usuario/criar",
                contentType: "application/json"

            }).done(function (data) {

                showAlert(data, 'Info', 'OK');
                window.location.href = 'index.html'
            }).error(function (data) {

                showAlert(data.responseText, 'Erro', 'OK');
            });

         });

    }

    $("#btnCriar").on('click', function () {

        CriarUsuario();
    });


}).on('deviceready', function () {
    // do deviceready stuff, put all calls to plugins in here


});


