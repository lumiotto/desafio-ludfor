// Validação do formulário de cadastro inicial com jQuery
$(document).ready(function() {
    $('#telAccount').mask('(00) 00000-0000');

    $('#register').validate({
        rules: {
            nameAccount: {
                required: true,
                maxlength: 80,
                minWords: 2
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
                minlength: 6,
                passwordRequirements: true
            },
            confirmPassword: {
                required: true,
                maxlength: 20,
                minlength: 6,
                equalTo: "#passwordAccount"
            }
        },
        messages: {
            nameAccount: {
                required: 'Por favor, insira o seu nome completo.',
                minWords: 'O nome deve conter no mínimo duas palavras.'
            },
            emailAccount: 'Por favor, insira o seu e-mail.',
            usernameAccount: 'Por favor, insira um nome de usuário com ao menos 5 caracteres.',
            passwordAccount: {
                required: 'Por favor, insira uma senha com ao menos 6 caracteres.',
                passwordRequirements: 'A senha deve ter ao menos 6 caracteres, incluindo pelo menos 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial.'
            },
            confirmPassword: {
                required: 'Por favor, insira sua senha novamente.',
                equalTo: 'As senhas não correspondem.'
            }
        },
        errorClass: "error",
        
        submitHandler: function(form) {
            showSuccessToast();
            hideErrorToast();
            setTimeout(function() {
                redirectToIndex();
            }, 5000);
        },
        invalidHandler: function() {
            showErrorToast();
        }
    });
    // Validação do nome completo
    $.validator.addMethod("minWords", function(value, element, param) {
        return value.split(' ').length >= param;
    });
    // Validação da senha
    $.validator.addMethod("passwordRequirements", function(value, element) {
        const regexUpperCase = /[A-Z]/;
        const regexLowerCase = /[a-z]/;
        const regexNumber = /[0-9]/;
        const regexSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

        // Verifica se a senha atende a todos os requisitos
        return regexUpperCase.test(value) && regexLowerCase.test(value) && regexNumber.test(value) && regexSpecialChar.test(value);
    });

    // Função para exibir mensagem de sucesso
    function showSuccessToast() {
        const successToast = document.querySelector('#successToast');
        successToast.style.display = 'block';
        setTimeout(function() {
            redirectToIndex();
        }, 5000);
    };

    // Função para exibir mensagem de erro
    function showErrorToast() {
        const errorToast = document.querySelector('#errorToast');
        errorToast.style.display = 'block';
        setTimeout(function() {
            hideErrorToast();
        }, 5000);
    };

    // Função para esconder mensagem de erro
    function hideErrorToast() {
        const errorToast = document.querySelector('#errorToast');
        errorToast.style.display = 'none';
    };

    // Função para redirecionar para a página de login
    function redirectToIndex() {
        window.location.href = 'index.html';
    };
})