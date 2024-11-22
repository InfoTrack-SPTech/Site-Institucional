document.addEventListener("DOMContentLoaded", () => {
    const users = [];
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
    const userEmailInput = document.getElementById("userEmail");
    const editUserNameInput = document.getElementById("editUserName");
    const editUserEmailInput = document.getElementById("editUserEmail");
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
                    <p>${user.email}</p>
                </label>
            `;
            userListDiv.appendChild(userDiv);
        });
    }

    document.getElementById('addUserIcon').addEventListener('click', () => {
        addUserModal.style.display = "block";
    });

    closeAddUserModal.addEventListener("click", () => {
        addUserModal.style.display = "none";
        userNameInput.value = ""; 
        userEmailInput.value = ""; 
    });

    addUser.addEventListener("click", () => {
        const name = userNameInput.value;
        const email = userEmailInput.value;

        if (name && email) {
            users.push({ name, email }); 
            updateUserList(); 
            addUserModal.style.display = "none"; 
            userNameInput.value = ""; 
            userEmailInput.value = ""; 
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
            editUserEmailInput.value = user.email; 
            editUserModal.style.display = "block"; 
        } else {
            alert("Por favor, selecione um usuário para editar."); 
        }
    });

    closeEditUserModal.addEventListener("click", () => {
        editUserModal.style.display = "none";
    });

    saveUserChanges.addEventListener("click", () => {
        const updatedName = editUserNameInput.value;
        const updatedEmail = editUserEmailInput.value;

        if (updatedName && updatedEmail) {
            users[currentUserIndex] = { name: updatedName, email: updatedEmail }; 
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
        confirmModal.style.display = "none"; 
    });
});