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

module.exports = {
    autenticar,
    cadastrar,
    subirFoto,
    removerFoto
}