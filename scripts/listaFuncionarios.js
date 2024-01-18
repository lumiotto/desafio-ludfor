// PÁGINA DA LISTA DE FUNCIONÁRIOS
// Adicionando as informações do cadastro na lista de funcionários
document.addEventListener('DOMContentLoaded', () => {
    let employeeInfos = getInfos();
    let employeeTable = document.querySelector('.list');

    employeeInfos.forEach(employee => {
        let li = document.createElement('li');
        li.classList.add('list__item');

        let activeDisplay = employee.active ? 'Sim' : 'Não';

        li.innerHTML = `
        <div class="list__item__title">
            <p class="list__item__name">${employee.id} - ${employee.name}</p>
                <div class="list__item__icons">
                    <img src="./images/plus.svg" class="imgToggle list__item__icon">
                    <img src="./images/edit.svg" class="imgEdit list__item__icon">
                </div>
        </div>
        <hr>
        <div class="infos">
            <table class="table">
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Celular</th>
                    <th>Ramal</th>
                    <th>Ativo</th>
                </tr>
                <tr>
                    <td>${employee.name}</td>
                    <td>${employee.email}</td>
                    <td>${employee.cel}</td>
                    <td class="empty">${employee.ramal}</td>
                    <td>${activeDisplay}</td>
                </tr>
            </table>
        <hr>
        </div>
        `;
        employeeTable.appendChild(li);

        // Evento de click para editar
        let imgEdit = li.querySelector('.imgEdit');
        imgEdit.addEventListener('click', () => {
            window.location.href = `editar.html?id=${employee.id}`;
        });
    });

    // Toggle para exibir infos na lista
    const imgToggle = document.querySelectorAll('.imgToggle');

    imgToggle.forEach(imgToggle => {
        imgToggle.addEventListener('click', () => {
            let nextSibling = imgToggle.closest('.list__item__title').nextElementSibling;

            while (nextSibling && !nextSibling.classList.contains('infos')) {
                nextSibling = nextSibling.nextElementSibling;
            }

            if (nextSibling && nextSibling.classList.contains('infos')) {
                nextSibling.classList.toggle('infos-visible');
                imgToggle.src = nextSibling.classList.contains('infos-visible') ? './images/minus.svg' : './images/plus.svg';
            }
        });
    });
});

// Função para buscar os dados no localStorage
function getInfos() {
    const keys = Object.keys(localStorage);

    const simplifiedList = keys.map(key => {
        try {
            const employee = JSON.parse(localStorage.getItem(key));

            if (employee && employee.hasOwnProperty('ramal')) { // Adiciona verificação para garantir que seja um funcionário registrado
                return {
                    id: employee.id,
                    name: employee.name,
                    email: employee.email,
                    cel: employee.cel,
                    ramal: employee.ramal || "",
                    active: employee.active
                };
            }
        } catch (error) {
            console.error("Error parsing JSON for key:", key, "Error:", error);
        }
        return null;
    });

    // Filtra os itens nulos (caso haja algum item no localStorage que não seja um funcionário)
    const validEmployees = simplifiedList.filter(employee => employee !== null);

    return validEmployees;
}

// Função para SAIR da conta, removendo o token do usuário logado
function logout() {
    localStorage.removeItem('token');
    showLogoutToast();
}

// Função para exibir mensagem de logout
function showLogoutToast() {
    const logoutToast = document.querySelector('#logoutToast');
    logoutToast.style.display = 'block';
    setTimeout(function() {
        redirectToIndex();
    }, 3000);
}

// Função para redirecionar para a página de login
function redirectToIndex() {
    window.location.href = 'index.html';
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