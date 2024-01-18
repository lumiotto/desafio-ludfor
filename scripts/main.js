// FORMULÁRIO DE CADASTRO
// Função para gerar um número aleatório BigInt
function generateRandomBigInt() {
    const randomBits = BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
    return randomBits;
}

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

    // Gerar um número aleatório BigInt para ser usado como chave
    const randomBigInt = generateRandomBigInt();

    // Salva no localStorage apenas se os campos requeridos estão preenchidos
    if (validateRequiredFields(requiredFields)) {
        const usersList = {
            name: nameAccount.value,
            email: emailAccount.value,
            telefone: telAccount.value,
            username: usernameAccount.value,
            userPassword: passwordAccount.value
        };

        // Salva os dados no localStorage com a chave sendo o BigInt gerado
        localStorage.setItem(String(randomBigInt), JSON.stringify(usersList));
        showSuccessToast();
    } else {
        showErrorToast();
    }
}

// Função para validar os campos requeridos
function validateRequiredFields(fields) {
    return fields.every(field => field.value.trim() !== '');
}


// FORMULÁRIO DE LOGIN
const loginForm = document.querySelector('#login');

// Confirmação do login
loginForm.addEventListener('submit', event => {
    event.preventDefault();

    const usernameLogin = document.querySelector('#usernameLogin');
    const passwordLogin = document.querySelector('#passwordLogin');
    const msgError = document.querySelector('#msgError');

    // Obtém todas as chaves do localStorage
    const keys = Object.keys(localStorage);

    // Itera sobre as chaves
    for (const key of keys) {
        // Obtém o valor correspondente à chave no localStorage
        const userData = JSON.parse(localStorage.getItem(key));

        // Verifica se o usuário e a senha correspondem aos valores inseridos nos campos de entrada
        if (userData && userData.username === usernameLogin.value && userData.userPassword === passwordLogin.value) {
            // Acesso válido
            // Criação de um token para garantir o login daquele usuário
            let token = Math.random().toString(16).substring(2);
            localStorage.setItem('token', token);

            window.location.href = 'listaFuncionarios.html';
            return;
        }
    }

    // Acesso inválido
    usernameLogin.setAttribute('style', 'color: red; border-color: red');
    passwordLogin.setAttribute('style', 'color: red; border-color: red');
    msgError.setAttribute('style', 'display: block');
    msgError.innerHTML = 'Usuário ou senha inválidos.';
});
