// document.addEventListener('DOMContentLoaded', function() {
//     const userPhoto = document.getElementById('userPhoto');
//     const fileInput = document.getElementById('fileInput');

//     if (userPhoto && fileInput) {
//         userPhoto.addEventListener('click', function() {
//             fileInput.click();
//         });

//         fileInput.addEventListener('change', function(event) {
//             const file = event.target.files[0];
//             if (file) {
//                 const reader = new FileReader();
//                 reader.onload = function(e) {
//                     userPhoto.src = e.target.result;
//                 };
//                 reader.readAsDataURL(file);
//             }
//         });
//     }
// });

const subirImagem = async () => {
    const input = document.getElementById("imagem-input2");
    const file = input.files[0]; // Obtém o arquivo selecionado

    if (!file) {
        alert("Por favor, selecione uma imagem para subir.");
        return;
    }

    // Verifica o tipo de arquivo
    const tiposPermitidos = ["image/png", "image/jpeg", "image/jpg"];
    if (!tiposPermitidos.includes(file.type)) {
        alert("Apenas arquivos PNG, JPG ou JPEG são permitidos.");
        return;
    }

    // Configura o FormData para enviar o arquivo
    const formData = new FormData();
    formData.append("imagem", file);

    try {
        const response = await fetch("/usuarios/subirImagem/" + sessionStorage.ID_USUARIO, {
            method: "POST",
            body: formData // Envia o arquivo no corpo da requisição
        });

        if (!response.ok) {
            throw new Error(`Erro ao subir a imagem: ${response.statusText}`);
        }

        const resultado = await response.json();
        console.log("Upload bem-sucedido:", resultado);
        alert("Imagem enviada com sucesso!");
    } catch (err) {
        console.error("Erro ao subir a imagem:", err);
        alert("Falha ao enviar a imagem.");
    }
};