// campos requeridos para cadastro/edição
const requiredFields = [nameRegister, emailRegister, celRegister, bairro, city, state, active];
// acesso ao localStorage
const employeeList = JSON.parse(localStorage.getItem('employeeList') || '[]');

// PÁGINA DE CADASTRO
// criando um id aleatório para o funcionário
document.addEventListener('DOMContentLoaded', () => {
    const id = document.querySelector('#id');
    const randomValue = generateRandomBigInt();
    id.value = randomValue.toString();
});

function generateRandomBigInt() {
    const randomNum = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    return BigInt(randomNum);
}

// função para CADASTRAR funcionário
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

    // salva no localStorage apenas se os campos requeridos estão preenchidos
    if (validateRequiredFields(requiredFields)) {
        employeeList.push({
            id: id.value,
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
        });
        localStorage.setItem('employeeList', JSON.stringify(employeeList));
    } else {
        alert('Por favor, preencha todos os campos requeridos.');
    }
}
// função para validar os campos requeridos
function validateRequiredFields(fields) {
    return fields.every(field => field.value.trim() !== '');
}


// PÁGINA DE EDIÇÃO 
const urlParams = new URLSearchParams(window.location.search);
const employeeId = urlParams.get('id');
const index = employeeList.findIndex(e => e.id === employeeId);

document.addEventListener('DOMContentLoaded', () => {
    // Obtendo as informações do localStorage usando o id
    const employee = employeeList.find(e => e.id === employeeId);

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
});

// Função para SALVAR a edição
function saveEdit() {
    // salva dados atualizados no localStorage apenas se os campos requeridos estão preenchidos
    if (validateRequiredFields(requiredFields)) {
        employeeList[index].name = document.querySelector('#nameRegister').value;
        employeeList[index].email = document.querySelector('#emailRegister').value;
        employeeList[index].cel = document.querySelector('#celRegister').value;
        employeeList[index].ramal = document.querySelector('#ramal').value;
        employeeList[index].address = document.querySelector('#address').value;
        employeeList[index].number = document.querySelector('#number').value;
        employeeList[index].comp = document.querySelector('#comp').value;
        employeeList[index].bairro = document.querySelector('#bairro').value;
        employeeList[index].city = document.querySelector('#city').value;
        employeeList[index].state = document.querySelector('#state').value;
        employeeList[index].active = document.querySelector('#active').value === 'Sim' ? true : false;

        localStorage.setItem('employeeList', JSON.stringify(employeeList));
        window.location.href = 'listaFuncionarios.html';
    } else {
        alert('Por favor, preencha todos os campos requeridos.');
    }
}

//Função para EXCLUIR os dados do funcionário do localStorage e da lista de funcionários
function deleteInfo() {
    employeeList.splice(index, 1);
    localStorage.setItem('employeeList', JSON.stringify(employeeList));
    alert('Dados do funcionário excluídos com sucesso!');

    window.location.href = 'listaFuncionarios.html';
}

// impedimento de acesso à página sem login
if(localStorage.getItem('token') == null) {
    alert('Você precisa estar logado para acessar essa página.')
    window.location.href = 'index.html'
}