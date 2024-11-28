const fkEmpresa = localStorage.getItem('fkEmpresa');

document.addEventListener("DOMContentLoaded", () => {
    const users = [];
    const userListDiv = document.getElementById("lista-usuario");
    const confirmModal = document.getElementById("confirmModal");
    const addUserModal = document.getElementById("addUserModal");
    const editUserModal = document.getElementById("editUserModal");
    const closeAddUserModal = document.getElementById("closeAddUserModal");
    const closeEditUserModal = document.getElementById("closeEditUserModal");
    const confirmDelete = document.getElementById("confirmDelete");
    const cancelDelete = document.getElementById("cancelDelete");
    const addUserButton = document.getElementById("addUser");
    const userNameInput = document.getElementById("userName");
    const userEmailInput = document.getElementById("userEmail");
    const userPasswordInput = document.getElementById("userPassword");
    const userPhoneInput = document.getElementById("userPhone");
    const userCargoInput = document.getElementById("userCargo");
    const userEmpresaInput = document.getElementById("userEmpresa");
    const editUserNameInput = document.getElementById("editUserName");
    const editUserEmailInput = document.getElementById("editUserEmail");
    const editUserPasswordInput = document.getElementById("editUserPassword");
    const editUserPhoneInput = document.getElementById("editUserPhone");
    const editUserCargoInput = document.getElementById("editUserCargo");
    const editUserEmpresaInput = document.getElementById("editUserEmpresa");
    const saveUserChanges = document.getElementById("saveUserChanges");

    let currentUserIndex = -1;

    function updateUserList() {
        userListDiv.innerHTML = "";
        users.forEach((user) => {
            const userDiv = document.createElement("div");
            userDiv.classList.add("nome-usuario");
            userDiv.innerHTML = `
                <input type="checkbox" class="user-checkbox" id="${user.idUsuario}">
                <label for="${user.idUsuario}">
                    <h3>${user.nome}</h3>
                    <p>${user.email}</p>
                    <p>${user.telefone}</p>
                    <p>Cargo: ${user.nomeCargo}</p>
                    <p>Empresa: ${user.nomeEmpresa}</p>
                </label>
            `;
            userListDiv.appendChild(userDiv);
        });
    }

    // Fetch para obter os usuários
    function fetchUsers() {
        fetch(`/medidas/acessos/${fkEmpresa}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar usuários');
                }
                return response.json();
            })
            .then(data => {
                users.push(...data);
                updateUserList();
            })
            .catch(error => {
                Swal.fire({
                    title: 'Erro',
                    text: error.message,
                    icon: 'error'
                });
            });
    }

    // Abrir modal para adicionar usuário
    document.getElementById('addUserIcon').addEventListener('click', () => {
        addUserModal.style.display = "block"; // Exibe o modal
    });

    // Adicionar um novo usuário
    addUserButton.addEventListener("click", () => {
        const name = userNameInput.value;
        const email = userEmailInput.value;
        const password = userPasswordInput.value;
        const phone = userPhoneInput.value;
        const cargo = userCargoInput.value;
        const empresa = userEmpresaInput.value;

        if (name && email && password && phone && cargo && empresa) {
            const newUser = { 
                nome: name, 
                email: email, 
                senha: password, 
                telefone: phone,
                fkCargo: cargo,
                fkEmpresa: empresa
            };

            fetch('/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao adicionar usuário');
                }
                return response.json();
            })
            .then(data => {
                users.push(data);
                updateUserList();
                addUserModal.style.display = "none"; 
                // Limpar campos
                userNameInput.value = ""; 
                userEmailInput.value = ""; 
                userPasswordInput.value = ""; 
                userPhoneInput.value = ""; 
                userCargoInput.value = ""; 
                userEmpresaInput.value = ""; 
                Swal.fire({
                    title: "Usuário adicionado com sucesso!",
                    icon: 'success'
                });
            })
            .catch(error => {
                Swal.fire({
                    title: 'Erro',
                    text: error.message,
                    icon: 'error'
                });
            });
        } else {
            Swal.fire({
                title: "Operação não realizada!",
                text: "Preencha todos os campos para continuar",
                icon: 'error'
            });
        }
    });

    // Editar um usuário
    document.getElementById('editUserIcon').addEventListener('click', () => {
        const checkedCheckboxes = document.querySelectorAll('.user-checkbox:checked');
        
        if (checkedCheckboxes.length === 1) {
            const checkbox = checkedCheckboxes[0];
            currentUserIndex = Array.from(document.querySelectorAll('.user-checkbox')).indexOf(checkbox); 
            const user = users[currentUserIndex];
            editUserNameInput.value = user.nome; 
            editUserEmailInput.value = user.email; 
            editUserPasswordInput.value = user.senha; 
            editUserPhoneInput.value = user.telefone; 
            editUserCargoInput.value = user.fkCargo; 
            editUserEmpresaInput.value = user.fkEmpresa; 
            editUserModal.style.display = "block"; 
        } else {
            Swal.fire({
                title: "Erro",
                text: "Por favor, selecione um usuário para editar.",
                icon: 'error'
            });
        }
    });

    saveUserChanges.addEventListener("click", () => {
        const updatedName = editUserNameInput.value;
        const updatedEmail = editUserEmailInput.value;
        const updatedPassword = editUserPasswordInput.value;
        const updatedPhone = editUserPhoneInput.value;
        const updatedCargo = editUserCargoInput.value;
        const updatedEmpresa = editUserEmpresaInput.value;

        if (updatedName && updatedEmail && updatedPassword && updatedPhone && updatedCargo && updatedEmpresa) {
            const updatedUser = { 
                ...users[currentUserIndex],
                nome: updatedName, 
                email: updatedEmail, 
                senha: updatedPassword, 
                telefone: updatedPhone, 
                fkCargo: updatedCargo, 
                fkEmpresa: updatedEmpresa 
            };

            fetch(`/usuarios/${updatedUser.idUsuario}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUser)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao atualizar usuário');
                }
                return response.json();
            })
            .then(data => {
                users[currentUserIndex] = data; 
                updateUserList();
                editUserModal.style.display = "none"; 
                Swal.fire({
                    title: "Usuário atualizado com sucesso!",
                    icon: 'success'
                });
            })
            .catch(error => {
                Swal.fire({
                    title: 'Erro',
                    text: error.message,
                    icon: 'error'
                });
            });
        } else {
            Swal.fire({
                title: "Operação não realizada!",
                text: "Preencha todos os campos para continuar",
                icon: 'error'
            });
        }
    });

    // Deletar um usuário
    document.getElementById('deleteIcon').addEventListener('click', () => {
        confirmModal.style.display = "block"; // Exibe o modal de confirmação
    });

    confirmDelete.addEventListener("click", () => {
        const checkboxes = document.querySelectorAll('.user-checkbox:checked');
        const deletePromises = Array.from(checkboxes).map(checkbox => {
            const userDiv = checkbox.closest('.nome-usuario');
            const userId = checkbox.id; // ID do usuário a ser deletado

            return fetch(`/usuarios/${userId}`, {
                method: 'DELETE'
            })
            .then(() => {
                userListDiv.removeChild(userDiv);
                users.splice(users.findIndex(user => user.idUsuario == userId), 1);
            });
        });

        Promise.all(deletePromises)
            .then(() => {
                confirmModal.style.display = "none"; 
                Swal.fire({
                    title: "Usuário deletado com sucesso!",
                    icon: 'success'
                });
            })
            .catch(error => {
                Swal.fire({
                    title: 'Erro',
                    text: error.message,
                    icon: 'error'
                });
            });
    });

    // Fechar modais
    closeAddUserModal.addEventListener("click", () => {
        addUserModal.style.display = "none"; // Esconde o modal
        // Limpar campos do modal de adicionar usuário
        userNameInput.value = ""; 
        userEmailInput.value = ""; 
        userPasswordInput.value = ""; 
        userPhoneInput.value = ""; 
        userCargoInput.value = ""; 
        userEmpresaInput.value = ""; 
    });

    closeEditUserModal.addEventListener("click", () => {
        editUserModal.style.display = "none"; // Esconde o modal
    });

    document.getElementById("closeModal").addEventListener("click", () => {
        confirmModal.style.display = "none"; // Esconde o modal de confirmação
    });

    cancelDelete.addEventListener("click", () => {
        confirmModal.style.display = "none"; // Esconde o modal de confirmação
    });

    // Carregar usuários quando a página é carregada
    fetchUsers();
});