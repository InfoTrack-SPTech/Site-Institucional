document.addEventListener("DOMContentLoaded", () => {
    const empresaUsuario = sessionStorage.getItem('EMPRESA_USUARIO');
    const empresaUsuarioID = sessionStorage.getItem('EMPRESA_ID');
    let usuarioID = sessionStorage.getItem('ID_USUARIO');  // Usando let para permitir reatribuição
    console.log("Valor de empresaUsuario:", empresaUsuario);
    console.log("Valor de empresaUsuarioID:", empresaUsuarioID);

    // Ajustando a URL para passar o valor de empresaUsuario corretamente
    fetch(`empresas/trazerAcesso/${empresaUsuario}`)
        .then(response => response.json())
        .then(data => {
            console.log("Dados recebidos:", data);  // Verifica os dados recebidos
            acessos = data;  // Armazena os dados na variável acessos
            renderAcessos(data);  // Passa os dados para renderizar
        })
        .catch(error => {
            console.error('Erro ao buscar os dados:', error);
        });

    // Seleção de elementos do DOM
    const userListDiv = document.getElementById("lista-usuario");
    const addUserModal = document.getElementById("addUserModal");
    const editUserModal = document.getElementById("editUserModal");
    const confirmModal = document.getElementById("confirmModal");

    const userNameInput = document.getElementById("userName");
    const userEmailInput = document.getElementById("userEmail");
    const userPhoneInput = document.getElementById("userPhone");
    const editUserNameInput = document.getElementById("editUserName");
    const editUserEmailInput = document.getElementById("editUserEmail");
    const editUserPhoneInput = document.getElementById("editUserPhone");

    const addUser = document.getElementById("addUser");
    const saveUserChanges = document.getElementById("saveUserChanges");

    const closeAddUserModal = document.getElementById("closeAddUserModal");
    const closeEditUserModal = document.getElementById("closeEditUserModal");
    const closeModal = document.getElementById("closeModal");

    const cancelDelete = document.getElementById("cancelDelete");
    const confirmDelete = document.getElementById("confirmDelete");

    let acessos = []; // Armazenar os dados de acessos carregados
    let currentAcessoIndex = -1; // Índice do acesso selecionado para edição/exclusão

    // Função para renderizar acessos na lista
    function renderAcessos(acessos) {
        userListDiv.innerHTML = ""; // Limpa a lista antes de renderizar
        acessos.forEach((acesso) => {
            const acessoDiv = document.createElement("div");
            acessoDiv.classList.add("nome-usuario");
            acessoDiv.setAttribute('data-id', acesso.ID_Usuario);  // Adiciona o ID_Usuario no data-id
            acessoDiv.innerHTML = `
                <input type="checkbox" class="user-checkbox" id="acesso-${acesso.ID_Usuario}">
                <label for="acesso-${acesso.ID_Usuario}">
                    <h3>${acesso.Nome_Usuario}</h3>
                    <p>Email: ${acesso.Email_Usuario}</p>
                    <p>Cargo: ${acesso.Nome_Cargo}</p>
                    <p>Telefone: ${acesso.Telefone_Usuario}</p>
                </label>
            `;
            userListDiv.appendChild(acessoDiv);
        });
    }

    // Modal de Adicionar Usuário
    document.getElementById('addUserIcon').addEventListener('click', () => {
        addUserModal.style.display = "block"; // Exibe o modal de adicionar usuário
    });

    closeAddUserModal.addEventListener("click", () => {
        addUserModal.style.display = "none"; // Fecha o modal de adicionar usuário
        userNameInput.value = ""; // Limpa os campos
        userEmailInput.value = "";
        userPhoneInput.value = ""; // Limpa o campo de telefone
    });

    // Ação de adicionar usuário
    addUser.addEventListener("click", () => {
        const name = userNameInput.value;
        const email = userEmailInput.value;
        const phone = userPhoneInput.value; // Adicionando telefone

        if (name && email && phone) {
            fetch('empresas/adicionarAcesso', { // Envia dados para o backend
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: name,
                    email: email,
                    empresaUsuarioID: empresaUsuarioID, 
                    telefone: phone
                }),
            })
            .then(response => response.json())
            .then(() => {
                location.reload(); // Recarrega a página para mostrar o novo usuário
            })
            .catch(error => {
                console.error('Erro ao adicionar usuário:', error);
            });
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    });

    // Modal de Editar Usuário
    document.getElementById('editUserIcon').addEventListener('click', () => {
        const checkedCheckboxes = document.querySelectorAll('.user-checkbox:checked');
        
        if (checkedCheckboxes.length === 1) {
            const checkbox = checkedCheckboxes[0];
            currentAcessoIndex = Array.from(document.querySelectorAll('.user-checkbox')).indexOf(checkbox); 

            // Verificar se o índice está dentro dos limites do array acessos
            if (currentAcessoIndex >= 0 && currentAcessoIndex < acessos.length) {
                const acesso = acessos[currentAcessoIndex];
                editUserNameInput.value = acesso.Nome_Usuario;  // Preenche o campo de nome
                editUserEmailInput.value = acesso.Email_Usuario;  // Preenche o campo de email
                editUserPhoneInput.value = acesso.Telefone_Usuario;  // Preenche o campo de telefone

                // Pega o ID_Usuario diretamente do data-id do div
                usuarioID = document.querySelector('.user-checkbox:checked').closest('.nome-usuario').getAttribute('data-id');  // Atualiza o ID do usuário a ser editado

                editUserModal.style.display = "block";  // Exibe o modal de edição
            } else {
                alert("Não foi possível localizar o usuário selecionado.");
            }
        } else {
            alert("Por favor, selecione um usuário para editar.");
        }
    });

    closeEditUserModal.addEventListener("click", () => {
        editUserModal.style.display = "none"; // Fecha o modal de edição
    });

    // Ação de salvar alterações no usuário
    saveUserChanges.addEventListener("click", () => {
        const updatedName = editUserNameInput.value;
        const updatedEmail = editUserEmailInput.value;
        const updatedPhone = editUserPhoneInput.value;  // Campo de telefone
        
        // Verifica se todos os campos necessários estão preenchidos
        if (updatedName && updatedEmail && updatedPhone) {
            fetch('empresas/editarAcesso', { // Envia dados de edição para o backend
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: usuarioID,  // ID do acesso a ser editado (pegando do data-id)
                    nome: updatedName,
                    email: updatedEmail,
                    telefone: updatedPhone,  // Passando o telefone atualizado
                    empresaUsuarioID: empresaUsuarioID, // ID da empresa
                }),
            })
            .then(response => response.json())
            .then(() => {
                location.reload(); // Recarrega a página após editar
                editUserModal.style.display = "none"; // Fecha o modal
            })
            .catch(error => {
                console.error('Erro ao editar usuário:', error);
            });
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    });

// Modal de Exclusão
document.getElementById('deleteIcon').addEventListener('click', () => {
    const checkedCheckboxes = document.querySelectorAll('.user-checkbox:checked');
    
    if (checkedCheckboxes.length > 0) {
        confirmModal.style.display = "block"; // Exibe o modal de confirmação de exclusão
    } else {
        alert("Por favor, selecione ao menos um usuário para excluir.");
    }
});

closeModal.addEventListener("click", () => {
    confirmModal.style.display = "none"; // Fecha o modal de exclusão
});

cancelDelete.addEventListener("click", () => {
    confirmModal.style.display = "none"; // Cancela a exclusão
});

confirmDelete.addEventListener("click", () => {
    const checkedCheckboxes = document.querySelectorAll('.user-checkbox:checked');
    checkedCheckboxes.forEach(checkbox => {
        const acessoId = checkbox.id.split('-')[1]; // Extrai o ID do acesso

        fetch(`empresas/excluirAcesso/${acessoId}`, { // Envia requisição para excluir acesso
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                empresaUsuarioID: empresaUsuarioID, // Passando o ID da empresa para excluir
            }),
        })
        .then(response => response.json())
        .then(() => {
            location.reload(); // Recarrega a página após excluir
            confirmModal.style.display = "none"; // Fecha o modal
        })
        .catch(error => {
            console.error('Erro ao excluir acesso:', error);
        });
    });
});

});
