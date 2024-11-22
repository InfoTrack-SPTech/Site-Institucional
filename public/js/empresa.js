document.addEventListener("DOMContentLoaded", () => {
    const users = JSON.parse(localStorage.getItem('users')) || []; 
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

    let currentUserIndex = -1; 

    function updateUserList() {
        userListDiv.innerHTML = ""; 
        users.forEach((user, index) => {
            const userDiv = document.createElement("div");
            userDiv.classList.add("nome-usuario");
            userDiv.innerHTML = `
                <input type="checkbox" class="user-checkbox" id="${user.name}">
                <label for="${user.name}">
                    <h3>${user.name}</h3>
                    <p>CNPJ: ${user.cnpj}</p>
                    <p>Telefone: ${user.phone}</p>
                </label>
            `;
            userListDiv.appendChild(userDiv);
        });
        localStorage.setItem('users', JSON.stringify(users)); 
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

    closeEditUserModal.addEventListener("click", () => {
        editUserModal.style.display = "none";
    });

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
            const userDiv = checkbox.closest('.nome-usuario');
            userListDiv.removeChild(userDiv);
            users.splice(users.findIndex(user => user.name === checkbox.id), 1);
        });
        updateUserList(); 
        confirmModal.style.display = "none"; 
    });

    updateUserList(); 
});
