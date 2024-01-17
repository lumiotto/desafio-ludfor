// FORMULÁRIO DE CADASTRO   
// Função para criar nova conta
function createAccount() {
    let nameAccount = document.querySelector('#nameAccount');
    let emailAccount = document.querySelector('#emailAccount');
    let telAccount = document.querySelector('#telAccount');
    let usernameAccount = document.querySelector('#usernameAccount');
    let passwordAccount = document.querySelector('#passwordAccount');
    let confirmPassword = document.querySelector('#confirmPassword');

    // Campos requeridos
    const requiredFields = [nameAccount, emailAccount, usernameAccount, passwordAccount, confirmPassword];
    // Salva no localStorage apenas se os campos requeridos estão preenchidos
    if (validateRequiredFields(requiredFields)) {
        const usersList = JSON.parse(localStorage.getItem('usersList') || '[]');
        usersList.push({
            name: nameAccount.value,
            email: emailAccount.value,
            telefone: telAccount.value,
            username: usernameAccount.value,
            userPassword: passwordAccount.value
        });
        localStorage.setItem('usersList', JSON.stringify(usersList));
    } else {
        showErrorToast();
    }
}
// Função para validar os campos requeridos
function validateRequiredFields(fields) {
    return fields.every(field => field.value.trim() !== '');
}

// FORMULÁRIO DE LOGIN
const usernameLogin = document.querySelector('#usernameLogin');
const passwordLogin = document.querySelector('#passwordLogin');
const msgError = document.querySelector('#msgError');
const loginForm = document.querySelector('#login')

// Confirmação do login
loginForm.addEventListener('submit', event => {
    event.preventDefault();

    let usersList = [];
    let userValid = {
        username: '',
        password: ''
    }
    usersList = JSON.parse(localStorage.getItem('usersList'));

    usersList.forEach((item) => {
        if(usernameLogin.value == item.username && passwordLogin.value == item.userPassword) {
            userValid = {
                username: item.username,
                password: item.userPassword
            }
        }
    })
    
    if(usernameLogin.value == userValid.username && passwordLogin.value == userValid.password) {
        window.location.href = 'listaFuncionarios.html';

        // Criação de um token para garantir o login daquele usuário
        let token = Math.random().toString(16).substring(2);
        localStorage.setItem('token', token);

    } else {
        usernameLogin.setAttribute('style', 'color: red; border-color: red');
        passwordLogin.setAttribute('style', 'color: red; border-color: red');
        msgError.setAttribute('style', 'display: block');
        msgError.innerHTML = 'Usuário ou senha inválidos.';
    }
})
