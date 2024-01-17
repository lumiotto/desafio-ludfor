// validação do formulário de cadastro inicial com jQuery
$(document).ready(function() {
    $('#telAccount').mask('(00) 00000-0000');

    $('#register').validate({
        rules: {
            nameAccount: {
                required: true,
                maxlength: 80,
                minlength: 3
            },
            emailAccount: {
                required: true,
                email: true,
                maxlength: 60
            },
            telAccount: {
                required: false
            },
            usernameAccount: {
                required: true,
                maxlength: 20,
                minlength: 5
            },
            passwordAccount: {
                required: true,
                maxlength: 20,
                minlength: 6
            },
            confirmPassword: {
                required: true,
                maxlength: 20,
                minlength: 6,
                equalTo: "#passwordAccount"
            }
        },
        messages: {
            nameAccount: 'Por favor, insira o seu nome completo.',
            emailAccount: 'Por favor, insira o seu e-mail.',
            usernameAccount: 'Por favor, insira um nome de usuário.',
            passwordAccount: 'Por favor, insira uma senha com ao menos 6 caracteres.',
            confirmPassword: {
                required: 'Por favor, insira sua senha novamente.',
                equalTo: 'As senhas não correspondem.'
            }
        },
        errorClass: "error",
        
        submitHandler: function(form) {
            form.submit();
            alert('Conta criada com sucesso!');
            alert('Faça seu primeiro login!');
        },
        invalidHandler: function(evento, validador) {
            let camposIncorretos = validador.numberOfInvalids();
            if (camposIncorretos) {
                alert(`Existem ${camposIncorretos} campos incorretos`)
            }
        }
    })
})