document.addEventListener('DOMContentLoaded', function() {
    // Elementos do Modal de Edição
    const editButton = document.getElementById('editButton');
    const editModal = document.getElementById('editModal');
    const cancelEdit = document.getElementById('cancelEdit');

    // Abrir o modal de edição
    if (editButton && editModal && cancelEdit) {
        editButton.addEventListener('click', function() {
            editModal.style.display = 'flex';
        });

        // Fechar o modal de edição
        cancelEdit.addEventListener('click', function() {
            editModal.style.display = 'none';
        });
    }

    // Abrir o modal de confirmação de exclusão
    document.getElementById("excluirConta").onclick = () => {
        document.getElementById("confirmModal").style.display = "flex";
    };
    
    // Fechar o modal de confirmação
    const closeModalButton = document.getElementById("closeModal");
    if (closeModalButton) {
        closeModalButton.onclick = () => {
            document.getElementById("confirmModal").style.display = "none"; 
        };
    }

    // Cancelar a exclusão
    document.getElementById("cancelDelete").onclick = () => {
        document.getElementById("confirmModal").style.display = "none"; 
    };
    
    // Lógica para confirmar a exclusão da conta
    document.getElementById("confirmDelete").onclick = async () => {
        const senhaAtual = prompt("Por favor, insira sua senha atual para confirmar a exclusão:"); 

        try {
            const response = await fetch(`/usuarios/excluir/${sessionStorage.ID_USUARIO}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ senha: senhaAtual }), 
            });

            if (response.ok) {
                alert("Conta excluída com sucesso!");
                document.getElementById("confirmModal").style.display = "none"; 
                window.location.href = "/"; // Redireciona após a exclusão
            } else {
                const errorMessage = await response.text();
                alert(errorMessage);
            }
        } catch (error) {
            console.error("Erro ao excluir conta:", error);
            alert("Houve um erro ao tentar excluir sua conta.");
        }
    };

    // Lógica para atualizar informações do usuário
    document.getElementById("edit-form").onsubmit = async (event) => {
        event.preventDefault(); 

        const senhaAtual = document.getElementById("senha-atual").value;
        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const telefone = document.getElementById("telefone").value;

        if (!senhaAtual) {
            showError("Por favor, insira sua senha atual.");
            return;
        }

        try {
            const response = await fetch(`/usuarios/verificarSenha/${sessionStorage.ID_USUARIO}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ senha: senhaAtual })
            });

            if (response.ok) {
                await fetch(`/usuarios/atualizar/${sessionStorage.ID_USUARIO}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ nome, email, telefone })
                });

                alert("Informações atualizadas com sucesso!");
                document.getElementById("editModal").style.display = "none"; 
            } else {
                const errorMessage = await response.text();
                showError(errorMessage); // Exibir mensagem de erro
            }
        } catch (error) {
            console.error("Erro ao atualizar informações:", error);
            showError("Houve um erro ao atualizar as informações.");
        }
    };

    // Função para mostrar mensagens de erro
    function showError(message) {
        const errorMessageDiv = document.getElementById("error-message");
        errorMessageDiv.innerText = message;
        errorMessageDiv.style.display = "block"; // Mostra a mensagem de erro
    }

    // Abrir o modal de alteração de senha
    document.getElementById("mudarSenhaButton").onclick = () => {
        document.getElementById("changePasswordModal").style.display = "block"; 
    };

    // Cancelar a alteração de senha
    document.getElementById("cancelChangePassword").onclick = () => {
        document.getElementById("changePasswordModal").style.display = "none"; 
    };

    // Lógica para alterar a senha
    document.getElementById("change-password-form").onsubmit = async (event) => {
        event.preventDefault(); // Evita o envio padrão do formulário

        const senhaAtual = document.getElementById("senha-atual").value;
        const novaSenha = document.getElementById("nova-senha").value;
        const confirmarSenha = document.getElementById("confirmar-senha").value;

        // Verifique se as novas senhas coincidem
        if (novaSenha !== confirmarSenha) {
            showPasswordError("As novas senhas não coincidem.");
            return;
        }

        try {
            const response = await fetch(`/usuarios/verificarSenha/${sessionStorage.ID_USUARIO}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ senha: senhaAtual })
            });

            if (response.ok) {
                // Se a senha atual estiver correta, atualize a senha
                await fetch(`/usuarios/atualizarSenha/${sessionStorage.ID_USUARIO}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ novaSenha })
                });

                alert("Senha alterada com sucesso!");
                document.getElementById("changePasswordModal").style.display = "none"; // Fechar o modal
            } else {
                const errorMessage = await response.text();
                showPasswordError(errorMessage);
            }
        } catch (error) {
            console.error("Erro ao alterar a senha:", error);
            showPasswordError("Houve um erro ao tentar alterar a senha.");
        }
    };

    // Função para exibir mensagens de erro ao alterar a senha
    function showPasswordError(message) {
        const passwordErrorMessageDiv = document.getElementById("password-error-message");
        passwordErrorMessageDiv.innerText = message;
        passwordErrorMessageDiv.style.display = "block"; // Mostra a mensagem de erro
    }
});