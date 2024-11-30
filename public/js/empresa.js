document.addEventListener("DOMContentLoaded", () => {
    fetch('empresas/trazerEmpresas')
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            empresas = data; 
            renderEmpresas(data); 
        })
        .catch(error => {
            console.error('Erro ao buscar os dados:', error);
        });

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

    let empresas = [];     
    let currentUserIndex = -1;

    function renderEmpresas(empresas) {
        userListDiv.innerHTML = ""; 
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

    document.getElementById('addUserIcon').addEventListener('click', () => {
        addUserModal.style.display = "block";
    });

    closeAddUserModal.addEventListener("click", () => {
        addUserModal.style.display = "none";
        userNameInput.value = ""; 
        userCnpjInput.value = ""; 
        userPhoneInput.value = ""; 
    });

    addUser.addEventListener("click", () => {
        const name = userNameInput.value;
        const cnpj = userCnpjInput.value;
        const phone = userPhoneInput.value;
    
        if (name && cnpj && phone) {
            fetch('empresas/adicionar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome: name, cnpj: cnpj, telefone: phone }),
            })
            .then(response => response.json())
            .then(() => {
                location.reload(); 
            })
            .catch(error => {
                console.error('Erro ao adicionar empresa:', error);
            });
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    });

    document.getElementById('editUserIcon').addEventListener('click', () => {
        const checkedCheckboxes = document.querySelectorAll('.user-checkbox:checked');
        
        if (checkedCheckboxes.length === 1) {
            const checkbox = checkedCheckboxes[0];
            currentUserIndex = Array.from(document.querySelectorAll('.user-checkbox')).indexOf(checkbox); 
            const empresa = empresas[currentUserIndex];
            editUserNameInput.value = empresa.nome; 
            editUserCnpjInput.value = empresa.cnpj; 
            editUserPhoneInput.value = empresa.telefone; 
            editUserModal.style.display = "block"; 
        } else {
            alert("Por favor, selecione uma empresa para editar.");
        }
    });

    closeEditUserModal.addEventListener("click", () => {
        editUserModal.style.display = "none";
    });

    saveUserChanges.addEventListener("click", () => {
        const updatedName = editUserNameInput.value;
        const updatedCnpj = editUserCnpjInput.value;
        const updatedPhone = editUserPhoneInput.value;

        if (updatedName && updatedCnpj && updatedPhone) {
            fetch('empresas/editar', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    idEmpresa: empresas[currentUserIndex].idEmpresa, 
                    nome: updatedName, 
                    cnpj: updatedCnpj, 
                    telefone: updatedPhone 
                }),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Empresa editada:', data);
                location.reload(); 
                editUserModal.style.display = "none"; 
            })
            .catch(error => {
                console.error('Erro ao editar empresa:', error);
            });
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    });

    document.getElementById('deleteIcon').addEventListener('click', () => {
        confirmModal.style.display = "block";
    });

    closeModal.addEventListener("click", () => {
        confirmModal.style.display = "none";
    });

    cancelDelete.addEventListener("click", () => {
        confirmModal.style.display = "none";
    });

    confirmDelete.addEventListener("click", () => {
        const checkboxes = document.querySelectorAll('.user-checkbox:checked');
        checkboxes.forEach(checkbox => {
            const empresaId = checkbox.id.split('-')[1]; 
            console.log(empresaId)
            fetch(`empresas/excluir/${empresaId}`, {
                method: 'DELETE',
            })
            .then(response => response.json())
            .then(data => {
                console.log('Empresa excluída:', data);
                location.reload();
                confirmModal.style.display = "none"; 
            })
            .catch(error => {
                console.error('Erro ao excluir empresa:', error);
            });
        });
    });
});
