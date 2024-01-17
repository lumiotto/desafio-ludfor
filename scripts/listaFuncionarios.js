// PÁGINA DA LISTA DE FUNCIONÁRIOS
// adicionando as informações do cadastro na lista de funcionários
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
                    <td>${employee.ramal}</td>
                    <td>${activeDisplay}</td>
                </tr>
            </table>
        <hr>
        </div>
        `;

        employeeTable.appendChild(li);

        // evento de click para editar
        let imgEdit = li.querySelector('.imgEdit');
        imgEdit.addEventListener('click', () => {
            window.location.href = `editar.html?id=${employee.id}`;
        });
    });

    // toggle para exibir infos na lista
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

// função para buscar os dados no localStorage
function getInfos() {
    const employeeList = JSON.parse(localStorage.getItem('employeeList') || '[]');
    const simplifiedList = employeeList.map(employee => {
        return {
            id: employee.id,
            name: employee.name,
            email: employee.email,
            cel: employee.cel,
            ramal: employee.ramal,
            active: employee.active
        };
    });
    return simplifiedList;
}

// função para SAIR da conta, removendo o token do usuário logado
function logout() {
    localStorage.removeItem('token');
    alert('Você está fazendo logout do sistema...');
    window.location.href = 'index.html'
}

// impedimento de acesso à página sem login
if(localStorage.getItem('token') == null) {
    alert('Você precisa estar logado para acessar essa página.')
    window.location.href = 'index.html'
}