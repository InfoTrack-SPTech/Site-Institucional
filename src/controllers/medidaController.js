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


module.exports = {
    buscarUltimasMedidas,
    bucarLocais,
    bucarBairro,
    bucarRua,
    bucarPeriodo,
    bucarMes
};