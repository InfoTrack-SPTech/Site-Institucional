var medidaModel = require("../models/medidaModel");

function buscarUltimasMedidas(req, res) {
    const limite_linhas = 7;


    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);
    console.log("asdasdas")

    medidaModel.buscarUltimasMedidas()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log(
                "Houve um erro ao buscar as ultimas medidas.",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        });
}
function bucarLocais(req, res) {
    const limite_linhas = 7;


    console.log("to na locais")

    medidaModel.buscarLocais()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log(
                "Houve um erro ao buscar as ultimas medidas.",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        });
}

function bucarBairro(req, res) {
    const limite_linhas = 7;


    console.log("to na locais")

    medidaModel.buscarBairros()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log(
                "Houve um erro ao buscar as ultimas medidas.",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        });
}

function bucarRua(req, res) {
    const limite_linhas = 7;


    console.log("to na locais")

    medidaModel.buscarRuas()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log(
                "Houve um erro ao buscar as ultimas medidas.",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        });
}


function bucarPeriodo(req, res) {
    const limite_linhas = 7;


    console.log("to na locais")

    medidaModel.bucarPeriodos()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log(
                "Houve um erro ao buscar as ultimas medidas.",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        });
}

function bucarMes(req, res) {
    const limite_linhas = 7;


    console.log("to na locais")

    medidaModel.bucarMeses()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log(
                "Houve um erro ao buscar as ultimas medidas.",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        });
}

async function acessosPost(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;
    var telefone = req.body.telefone;
    var cargo = req.body.fkCargo;
    var fkEmpresa = req.params.fkEmpresa;


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
    buscarUltimasMedidas,
    bucarLocais,
    bucarBairro,
    bucarRua,
    bucarPeriodo,
    bucarMes,
    acessosPost

};