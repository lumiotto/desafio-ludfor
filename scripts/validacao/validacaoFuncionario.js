// Validação do cadastro/edição de funcionário com jQuery
$(document).ready(function() {
    $('#celRegister').mask('(00) 00000-0000');

    $('#infos').validate({
        rules: {
            nameRegister: {
                required: true,
                maxlength: 80,
                minWords: 2
            },
            emailRegister: {
                required: true,
                maxlength: 60,
                email: true
            },
            celRegister: {
                required: true
            },
            ramal: {
                required: false,
                maxlength: 10
            },
            bairro: {
                required: true,
                maxlength: 120
            },
            address: {
                required: false,
                maxlength: 80
            },
            number: {
                required: false,
                maxlength: 15
            },
            comp: {
                required: false,
                maxlength: 120
            },
            city: {
                required: true,
                maxlength: 80
            },
            state: {
                required: true,
                maxlength: 40
            },
            active: {
                required: true
            }
        },
        messages: {
            nameRegister: {
                required: 'Insira o nome completo.',
                minWords: 'O nome deve conter no mínimo duas palavras.'
            },
            emailRegister: 'Insira um e-mail válido',
            celRegister: 'Insira um número de celular',
            bairro: 'Insira o bairro',
            city: 'Insira a cidade',
            state: 'Insira o estado',
            active: 'Selecione uma opção'
        },
        errorClass: "error",

        submitHandler: function(form) {
            const submitButton = $(document.activeElement);

            if (submitButton.hasClass('button__add') || submitButton.hasClass('button__save')) {
                showSuccessToast();
                hideErrorToast();
                setTimeout(function() {
                    redirectToIndex();
                }, 5000);
            } else if (submitButton.hasClass('button__delete')) {
                showDeleteToast();
                hideErrorToast();
                setTimeout(function() {
                    redirectToIndex();
                }, 5000);
            }            
        },
        invalidHandler: function() {
            showErrorToast();
        }
    });

    // Validação do nome completo
    $.validator.addMethod("minWords", function(value, element, param) {
        return value.split(' ').length >= param;
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

    // Função para esconder a mensagem de erro
    function hideErrorToast() {
        const errorToast = document.querySelector('#errorToast');
        errorToast.style.display = 'none';
    };

    // Função para exibir mensagem de excluído
    function showDeleteToast() {
        const deleteToast = document.querySelector('#deleteToast');
        deleteToast.style.display = 'block';
        setTimeout(function() {
            redirectToIndex();
        }, 5000);
    };

    // Função para redirecionar para a lista de funcionários
    function redirectToIndex() {
        window.location.href = 'listaFuncionarios.html';
    };
})
