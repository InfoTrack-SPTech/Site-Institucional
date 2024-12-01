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
            await fetch(`/usuarios/excluirConta/${sessionStorage.ID_USUARIO}/${sessionStorage.CARGO_USUARIO}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ senha: senhaAtual }), 
            }).then((res) => {
                if(res.ok){
                    res.json().then((data) => {
                        Swal.fire({
                            title: data.mensagem,
                            icon: 'success'
                        })
                    })
                    setTimeout(() => {
                        window.location.href = "index.html"
                    }, 1200)
                } else{
                    res.json().then((err) => {
                        Swal.fire({
                            title: err.mensagem,
                            icon: 'error'
                        })
                    })
                    setTimeout(() => {
                        location.reload()
                    }, 1300)
                }
            })
        } catch (error) {
            console.error("Erro ao excluir conta:", error);
            alert("Houve um erro ao tentar excluir sua conta.");
        }
    };

    // Lógica para atualizar informações do usuário
    document.getElementById("edit-form").onsubmit = async (event) => {
        event.preventDefault(); 

        const senhaAtual = document.getElementById("senha").value;
        const nome = document.getElementById("nome").value;
        const telefone = document.getElementById("telefone").value;

        if (!senhaAtual) {
            Swal.fire({
                title: "Por favor Insira sua senha",
                icon: 'error'
            })
            return;
        }

        try {
            fetch(`/usuarios/editarConta/${sessionStorage.ID_USUARIO}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nomeUsuario: nome,
                    telefoneUsuario: telefone,
                    senhaUsuario: senhaAtual,
                })
            }).then((res) => {
                if(res.ok){
                    res.json().then((data) => {
                        Swal.fire({
                            title: data.mensagem,
                            icon: 'success'
                        })
                    })

                    sessionStorage.NOME_USUARIO = nome;
                    sessionStorage.TELEFONE_USUARIO = telefone;                    

                    setTimeout(() => {
                        location.reload();
                    }, 1200)
                } else{
                    res.json().then((err) => {
                        Swal.fire({
                            title: err.mensagem,
                            icon: 'error'
                        })
                    })
                }
            })
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
            Swal.fire({
                title: 'As novas senhas não coincidem',
                icon: 'error'
            })
            return;
        } else if(novaSenha.length < 8){
            Swal.fire({
              title: "Senha muito curta",
              text: "Minímo 8 caracteres",
              icon: "error"
            });
            return;
        } else if(novaSenha.indexOf("!") == -1 && novaSenha.indexOf("&") == -1 && novaSenha.indexOf("@") == -1 && novaSenha.indexOf("#") && novaSenha.indexOf("$") == -1){
            Swal.fire({ 
                title: "A senha precisa de ao menos um caractere especial",
                icon: "error"
            });
            return;
        } 
    
        try {

            fetch(`/usuarios/atualizarSenha/${sessionStorage.ID_USUARIO}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    senhaAtualUsuario: senhaAtual,
                    senhaNovaUsuario: novaSenha,
                    senhaConfirmarusuario: confirmarSenha  
                })
            }).then((res) => {
                if(res.ok){
                    res.json().then((data) => {
                        Swal.fire({
                            title: data.mensagem,
                            icon: 'success'
                        })

                        setTimeout(() => {
                            location.reload();
                        }, 1200)
                    })
                } else{
                    res.json().then((err) => {
                        Swal.fire({
                            title: err.mensagem,
                            icon: 'error'
                        })
                    })
                }
            })
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