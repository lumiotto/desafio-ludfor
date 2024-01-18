// Campos requeridos para cadastro/edição
const requiredFields = [nameRegister, emailRegister, celRegister, bairro, city, state, active];
// Acesso ao localStorage
const employeeList = JSON.parse(localStorage.getItem('employeeList') || '[]');

// PÁGINA DE CADASTRO
// Criando um id aleatório para o funcionário
document.addEventListener('DOMContentLoaded', () => {
    const id = document.querySelector('#id');
    const randomValue = generateRandomBigInt();
    id.value = randomValue.toString();
});

function generateRandomBigInt() {
    const randomNum = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    return BigInt(randomNum);
}

// Função para CADASTRAR funcionário
function register() {
    let nameRegister = document.querySelector('#nameRegister');
    let emailRegister = document.querySelector('#emailRegister');
    let celRegister = document.querySelector('#celRegister');
    let ramal = document.querySelector('#ramal');
    let address = document.querySelector('#address');
    let number = document.querySelector('#number');
    let comp = document.querySelector('#comp');
    let bairro = document.querySelector('#bairro');
    let city = document.querySelector('#city');
    let state = document.querySelector('#state');
    let active = document.querySelector('#active');

    // Salva no localStorage apenas se os campos requeridos estão preenchidos
    if (validateRequiredFields(requiredFields)) {
        // Obtém o id do campo id
        const id = document.querySelector('#id').value;

        const employeeList = {
            id: id,
            name: nameRegister.value,
            email: emailRegister.value,
            cel: celRegister.value,
            ramal: ramal.value,
            address: address.value,
            number: number.value,
            comp: comp.value,
            bairro: bairro.value,
            city: city.value,
            state: state.value,
            active: active.value === 'true' ? true : false
        };

        // Adiciona ao localStorage usando o id como chave
        localStorage.setItem(id, JSON.stringify(employeeList));

        // Adiciona à lista de funcionários
        employeeList.push(employeeList);
    } else {
        showErrorToast();
    }
}
// Função para validar os campos requeridos
function validateRequiredFields(fields) {
    return fields.every(field => field.value.trim() !== '');
}


// PÁGINA DE EDIÇÃO 
const urlParams = new URLSearchParams(window.location.search);
const employeeId = urlParams.get('id');
const index = employeeList.findIndex(e => e.id === employeeId);

document.addEventListener('DOMContentLoaded', () => {
      // Obtendo as informações do localStorage usando o id
    const employee = JSON.parse(localStorage.getItem(employeeId));

    if (employee) {
        let activeDisplay = employee.active ? 'Sim' : 'Não';

        // Preenchendo os campos do formulário com as informações do funcionário
        document.querySelector('#id').value = employee.id;
        document.querySelector('#nameRegister').value = employee.name;
        document.querySelector('#emailRegister').value = employee.email;
        document.querySelector('#celRegister').value = employee.cel;
        document.querySelector('#ramal').value = employee.ramal;
        document.querySelector('#address').value = employee.address;
        document.querySelector('#number').value = employee.number;
        document.querySelector('#comp').value = employee.comp;
        document.querySelector('#bairro').value = employee.bairro;
        document.querySelector('#city').value = employee.city;
        document.querySelector('#state').value = employee.state;
        document.querySelector('#active').value = activeDisplay;
    }
});

// Função para SALVAR a edição
function saveEdit() {
    // Salva dados atualizados no localStorage apenas se os campos requeridos estão preenchidos
    if (validateRequiredFields(requiredFields)) {
        // Atualiza os dados no localStorage usando o id como chave
        const editedEmployee = {
            id: document.querySelector('#id').value,
            name: document.querySelector('#nameRegister').value,
            email: document.querySelector('#emailRegister').value,
            cel: document.querySelector('#celRegister').value,
            ramal: document.querySelector('#ramal').value,
            address: document.querySelector('#address').value,
            number: document.querySelector('#number').value,
            comp: document.querySelector('#comp').value,
            bairro: document.querySelector('#bairro').value,
            city: document.querySelector('#city').value,
            state: document.querySelector('#state').value,
            active: document.querySelector('#active').value === 'Sim' ? true : false
        };
        localStorage.setItem(employeeId, JSON.stringify(editedEmployee));

        // Atualiza a lista de funcionários
        employeeList[index] = editedEmployee;
    } else {
        showErrorToast();
    }
}

//Função para EXCLUIR os dados do funcionário do localStorage e da lista de funcionários
function deleteInfo() {
    // Obtenha o id do funcionário que está sendo excluído
    const idToDelete = document.querySelector('#id').value;

    // Remove o item do localStorage com base no id
    localStorage.removeItem(idToDelete);

    // Atualiza a lista de funcionários após a exclusão
    const updatedEmployeeList = getInfos();

    // Atualiza o localStorage com a lista de funcionários atualizada
    localStorage.setItem('employeeList', JSON.stringify(updatedEmployeeList));

    showDeleteToast();
}

// Impedimento de acesso à página sem login
if(localStorage.getItem('token') == null) {
    showLoginToast();
}

// Função para exibir mensagem de login
function showLoginToast() {
    const loginToast = document.querySelector('#loginToast');
    loginToast.style.display = 'block';
    setTimeout(function() {
        redirectToIndex();
    }, 3000);
}

// Função para redirecionar para a página de login
function redirectToIndex() {
    window.location.href = 'index.html';
}