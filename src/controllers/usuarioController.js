var usuarioModel = require("../models/usuarioModel");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

async function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        await usuarioModel.buscarUsuario(email, senha).then(async (usuarios) => {
            if(usuarios.length <= 0){
                res.status(404).send("Este usuário não foi encontrado");
            } else{
                await usuarioModel.retornarUsuarioAutenticar(email, senha).then((data) => {
                    res.status(200).json(data);
                });
            }
        });
    }

}

async function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var telefone = req.body.telefoneServer;
    var cargo = req.body.cargoServer;
    var fkEmpresa = req.params.idEmpresa;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("Sua empresa a vincular está undefined!");
    } else if(cargo == undefined){
        res.status(400).send("Seu cargo está undefined!");
    } else {

        await usuarioModel.buscarEmail(email).then(async (usuario) => {
            if(usuario.length > 0){
                res.status(404).send("Este email já foi cadastrado");
            } else{
                await usuarioModel.cadastrar(nome, email, senha, telefone, fkEmpresa).then((data) => {
                    res.status(200).json(data);
                })
            }
        })

    }
}

async function subirFoto(req, res){
    try {
        // Verificar se o arquivo foi enviado
        if (!req.file) {
            return res.status(400).send("Nenhum arquivo foi enviado.");
        }

        const { originalname, mimetype, buffer } = req.file;

        // Configuração do cliente S3
        const bucketName = "s3-foto-perfil";
        const s3Cliente = new S3Client({
            region: 'us-east-1',
            credentials: {
                accessKeyId: "",
                secretAccessKey: "",
                sessionToken: ""
            }
        });

        const nomeImg = `${req.params.idUsuario}${originalname.substring(originalname.lastIndexOf("."))}`;
        // Enviar o arquivo ao S3
        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: `usuario-${req.params.idUsuario}/` + nomeImg, // Nome único para evitar substituições
            Body: buffer, // Arquivo enviado no body
            ContentType: mimetype // Tipo MIME do arquivo
        });

        await s3Cliente.send(command);
        await usuarioModel.atualizarFotoPerfil(nomeImg, req.params.idUsuario);
        let usuario = await usuarioModel.buscarUsuarioId(req.params.idUsuario);

        res.status(200).json({ foto: usuario[0].imagem });
    } catch (err) {
        console.error("Erro ao subir imagem:", err);
        res.status(500).json({ error: "Erro ao enviar a imagem." });
    }
}

async function removerFoto(req, res){

    const idUsuario = req.params.idUsuario;
    usuarioModel.buscarUsuarioId(idUsuario).then(async (user) => {
        if(user.length <= 0){
            res.status(404).send("Usuário não encontrado");
        } else{
            await usuarioModel.atualizarFotoPerfil("", idUsuario);
            res.status(200).send("Imagem removida");
        }
    })
}

async function editarConta(req, res){

    const idUsuario = req.params.idUsuario;
    const nome = req.body.emailUsuario;
    const telefone = req.body.telefoneUsuario;
    const senha = req.body.senhaUsuario;

    const usuario = await usuarioModel.buscarUsuarioId(idUsuario).then((data) => {
        return data.length > 0 ? data[0] : null;
    })
    
    if(usuario == null){
        res.status(404).json({
            codigo: 404,
            mensagem: "Usuário não encontrado"
        })
    } else if(nome.trim() == "" || telefone.trim() == "" || senha.trim() == ""){
        res.status(404).json({
            codigo: 404,
            mensagem: "Preencha todos os campos"
        })
    } else if(senha != usuario.senha){
        res.status(404).json({
            codigo: 404,
            mensagem: "Senha fornecida incorreta"
        })
    } else{
        await usuarioModel.atualizarConta(idUsuario, nome, telefone).then(() => {
            res.status(200).json({
                codigo: 200,
                mensagem: "Operação realizada com sucesso!"
            })
        })
    }
}

async function excluirConta(req, res){

    const idUsuario = req.params.idUsuario;
    const cargo = req.params.cargo;

    const usuario = await usuarioModel.buscarUsuarioId(idUsuario).then((data) => {
        return data.length > 0 ? data[0] : null;
    })
    if(usuario == null){
        res.status(404).json({
            codigo: 404, 
            mensagem: "Usuário não encontrado"
        })
    } else if(cargo != "Gerente" && cargo != "Administrador" || cargo.trim() == ""){
        res.status(404).json({
            codigo: 404, 
            mensagem: "Você não tem permissão para excluir sua conta"
        })
    } else{
        usuarioModel.excluirContaId(idUsuario).then(() => {
            res.status(200).json({
                codigo: 200,
                mensagem: "Operação realizada com sucesso!"
            })
        })
    }
}

async function atualizarSenha(req, res){

    const idUsuario = req.params.idUsuario;
    const senhaAntiga = req.body.senhaAtualUsuario;
    const senhaNova = req.body.senhaNovaUsuario;
    const confirmarSenha = req.body.senhaConfirmarusuario;

    const usuario = await usuarioModel.buscarUsuarioId(idUsuario).then((data) => {
        return data.length > 0 ? data[0] : null;
    })
    if(usuario == null){
        res.status(404).json({
            codigo: 404,
            mensagem: "Usuário não encontrado"
        })
    } else if(senhaAntiga.trim() == "" || senhaNova.trim() == "" || confirmarSenha.trim() == ""){
        res.status(404).json({
            codigo: 404,
            mensagem: "Preencha todos os campos"
        })
    } else if(senhaAntiga != usuario.senha){
        res.status(404).json({
            codigo: 404,
            mensagem: "Senha atual incorreta"
        })
    } else if(senhaNova == senhaAntiga || confirmarSenha == senhaAntiga){
        res.status(404).json({
            codigo: 404,
            mensagem: "A senha nova não pode ser igual a antiga"
        })
    } else if(senhaNova != confirmarSenha){
        res.status(404).json({
            codigo: 404,
            mensagem: "A nova senha e a confirmação da senha devem ser iguais"
        }) 
    } else {
        usuarioModel.atualizarSenha(idUsuario, senhaNova).then(() => {
            res.status(200).json({
                codigo: 200,
                mensagem: "Operação realizada com sucesso!"
            })
        })
      
async function excluirUsuario(req, res) {
    const idUsuario = req.params.idUsuario;
    const senhaAtual = req.body.senha; 

    if (!senhaAtual) {
        return res.status(400).send("Senha atual é necessária para excluir a conta.");
    }

    try {

        const usuarios = await usuarioModel.buscarUsuarioId(idUsuario);
        if (usuarios.length === 0) {
            return res.status(404).send("Usuário não encontrado.");
        }

        const usuario = usuarios[0];
        if (usuario.senha !== senhaAtual) {
            return res.status(403).send("Senha atual incorreta.");
        }

       
        await usuarioModel.excluirUsuario(idUsuario); 
        res.status(200).send("Usuário excluído com sucesso.");
    } catch (error) {
        console.error("Erro ao excluir usuário:", error);
        res.status(500).send("Erro ao excluir usuário.");
    }

}

async function verificarSenha(req, res) {
    const idUsuario = req.params.idUsuario;
    const senha = req.body.senha;

    try {   
        const usuarios = await usuarioModel.buscarUsuarioId(idUsuario);
        if (usuarios.length === 0) {    
            return res.status(404).send("Usuário nao encontrado.");
        }

        const usuario = usuarios[0];
        if (usuario.senha !== senha) {
            return res.status(403).send("Senha incorreta.");    
        }

        res.status(200).send("Senha correta.");
    } catch (error) {
        console.error("Erro ao verificar senha:", error);    
        res.status(500).send("Erro ao verificar senha.");
    }    
}

const bcrypt = require('bcrypt'); // Importar bcrypt para hashing de senhas

async function atualizarSenha(req, res) {
    const idUsuario = req.params.idUsuario;
    const { novaSenha } = req.body;

    if (!novaSenha) {
        return res.status(400).send("Nova senha é necessária.");
    }

    try {
        // Hash a nova senha
        const novaSenhaHash = await bcrypt.hash(novaSenha, 10);
        
        // Atualizar a senha no banco de dados
        await usuarioModel.atualizarSenha(idUsuario, novaSenhaHash);
        res.status(200).send("Senha atualizada com sucesso.");
    } catch (error) {
        console.error("Erro ao atualizar a senha:", error);
        res.status(500).send("Erro ao atualizar a senha.");
    }
}

module.exports = {
    autenticar,
    cadastrar,
    subirFoto,
    removerFoto,
    editarConta,
    excluirConta,
    excluirUsuario,
    verificarSenha,
    atualizarSenha
}