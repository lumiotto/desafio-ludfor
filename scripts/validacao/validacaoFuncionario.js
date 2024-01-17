// validação do cadastro/edição de funcionário com jQuery
$(document).ready(function() {
    $('#celRegister').mask('(00) 00000-0000');

    $('#infos').validate({
        rules: {
            nameRegister: {
                required: true,
                maxlength: 80
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
            nameRegister: 'Insira o nome completo',
            emailRegister: 'Insira um e-mail válido',
            celRegister: 'Insira um número de celular',
            bairro: 'Insira o bairro',
            city: 'Insira a cidade',
            state: 'Insira o estado',
            active: 'Selecione uma opção'
        },
        errorClass: "error",
        
        submitHandler: function(form) {
            form.submit();
            const submitButton = $(document.activeElement);

            if (submitButton.hasClass('button__add')) {
                alert('Cadastro realizado com sucesso!');
            } else if (submitButton.hasClass('button__save')) {
                alert('Edição salva com sucesso!');
            }
            window.location.href = 'listaFuncionarios.html';
        },
        invalidHandler: function(evento, validador) {
            let camposIncorretos = validador.numberOfInvalids();
            if (camposIncorretos) {
                alert(`Existem ${camposIncorretos} campos incorretos`)
            }
        }
    })
})