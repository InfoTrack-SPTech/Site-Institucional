document.addEventListener("DOMContentLoaded", () => {
    // Fazendo a requisição para buscar as empresas
    fetch('empresas/trazerEmpresas')
        .then(response => response.json()) // Converte a resposta para JSON
        .then(data => {
            console.log(data); // Exibe os dados no console
            renderEmpresas(data); // Chama a função que vai renderizar as empresas
        })
        .catch(error => {
            console.error('Erro ao buscar os dados:', error);
        });

    // Obtendo os elementos da página
    const userListDiv = document.getElementById("lista-usuario");
    const confirmModal = document.getElementById("confirmModal");
    const addUserModal = document.getElementById("addUserModal");
    const editUserModal = document.getElementById("editUserModal");
    const closeModal = document.getElementById("closeModal");
    const closeAddUserModal = document.getElementById("closeAddUserModal");
    const closeEditUserModal = document.getElementById("closeEditUserModal");
    const confirmDelete = document.getElementById("confirmDelete");
    const cancelDelete = document.getElementById("cancelDelete");
    const addUser = document.getElementById("addUser");
    const userNameInput = document.getElementById("userName");
    const userCnpjInput = document.getElementById("userCnpj");
    const userPhoneInput = document.getElementById("userPhone");
    const editUserNameInput = document.getElementById("editUserName");
    const editUserCnpjInput = document.getElementById("editUserCnpj");
    const editUserPhoneInput = document.getElementById("editUserPhone");
    const saveUserChanges = document.getElementById("saveUserChanges");

    let users = JSON.parse(localStorage.getItem('users')) || []; // Usuários armazenados no localStorage
    let currentUserIndex = -1;

    // Função para renderizar as empresas no HTML
    function renderEmpresas(empresas) {
        userListDiv.innerHTML = ""; // Limpa a lista antes de adicionar os novos dados
        empresas.forEach((empresa) => {
            const empresaDiv = document.createElement("div");
            empresaDiv.classList.add("nome-usuario");
            empresaDiv.innerHTML = `
                <input type="checkbox" class="user-checkbox" id="empresa-${empresa.idEmpresa}">
                <label for="empresa-${empresa.idEmpresa}">
                    <h3>${empresa.nome}</h3>
                    <p>CNPJ: ${empresa.cnpj}</p>
                    <p>Telefone: ${empresa.telefone}</p>
                </label>
            `;
            userListDiv.appendChild(empresaDiv);
        });
    }

    // Ação de abrir o modal para adicionar usuário
    document.getElementById('addUserIcon').addEventListener('click', () => {
        addUserModal.style.display = "block";
    });

    // Fechar modal de adicionar usuário
    closeAddUserModal.addEventListener("click", () => {
        addUserModal.style.display = "none";
        userNameInput.value = ""; 
        userCnpjInput.value = ""; 
        userPhoneInput.value = ""; 
    });

    // Adicionar novo usuário
    addUser.addEventListener("click", () => {
        const name = userNameInput.value;
        const cnpj = userCnpjInput.value;
        const phone = userPhoneInput.value;

        if (name && cnpj && phone) {
            users.push({ name, cnpj, phone }); 
            updateUserList(); 
            addUserModal.style.display = "none"; 
            userNameInput.value = ""; 
            userCnpjInput.value = ""; 
            userPhoneInput.value = ""; 
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    });

    // Ação de editar usuário
    document.getElementById('editUserIcon').addEventListener('click', () => {
        const checkedCheckboxes = document.querySelectorAll('.user-checkbox:checked');
        
        if (checkedCheckboxes.length === 1) {
            const checkbox = checkedCheckboxes[0];
            currentUserIndex = Array.from(document.querySelectorAll('.user-checkbox')).indexOf(checkbox); 
            const user = users[currentUserIndex];
            editUserNameInput.value = user.name; 
            editUserCnpjInput.value = user.cnpj; 
            editUserPhoneInput.value = user.phone; 
            editUserModal.style.display = "block"; 
        } else {
            alert("Por favor, selecione uma empresa para editar.");
        }
    });

    // Fechar modal de editar usuário
    closeEditUserModal.addEventListener("click", () => {
        editUserModal.style.display = "none";
    });

    // Salvar as alterações do usuário
    saveUserChanges.addEventListener("click", () => {
        const updatedName = editUserNameInput.value;
        const updatedCnpj = editUserCnpjInput.value;
        const updatedPhone = editUserPhoneInput.value;

        if (updatedName && updatedCnpj && updatedPhone) {
            users[currentUserIndex] = { name: updatedName, cnpj: updatedCnpj, phone: updatedPhone }; 
            updateUserList();
            editUserModal.style.display = "none"; 
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    });

    // Ação para deletar usuário
    document.getElementById('deleteIcon').addEventListener('click', () => {
        confirmModal.style.display = "block";
    });

    // Fechar modal de confirmação de exclusão
    closeModal.addEventListener("click", () => {
        confirmModal.style.display = "none";
    });

    // Cancelar a exclusão de usuário
    cancelDelete.addEventListener("click", () => {
        confirmModal.style.display = "none";
    });

    // Confirmar a exclusão do usuário
    confirmDelete.addEventListener("click", () => {
        const checkboxes = document.querySelectorAll('.user-checkbox:checked');
        checkboxes.forEach(checkbox => {
            const userDiv = checkbox.closest('.nome-usuario');
            userListDiv.removeChild(userDiv);
            users.splice(users.findIndex(user => user.name === checkbox.id), 1);
        });
        updateUserList(); 
        confirmModal.style.display = "none"; 
    });

    // Função para atualizar a lista de usuários no localStorage
    function updateUserList() {
        localStorage.setItem('users', JSON.stringify(users)); 
    }

    // Chama a função para renderizar as empresas quando o DOM estiver carregado
    renderEmpresas([]);
});
