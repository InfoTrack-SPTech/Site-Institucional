var usuarioModel = require("../models/usuarioModel");

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
                await usuarioModel.autenticar(email, senha).then((data) => {
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

module.exports = {
    autenticar,
    cadastrar
}