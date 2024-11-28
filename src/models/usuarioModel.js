var database = require("../database/config")

function autenticar(email, senha) {
    var instrucaoSql = `SELECT * FROM Usuario WHERE email = "${email}" AND senha = "${senha}"`;
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha, telefone, idEmpresa) {
    
    var instrucaoSql = `INSERT INTO Usuario(email, nome, senha, telefone, fkCargo, fkEmpresa) VALUES("${email}", "${nome}", "${senha}", "${telefone}", 1, ${idEmpresa})`;
    return database.executar(instrucaoSql);
}

function buscarEmail(email){
    var instrucaoSql = `SELECT * FROM Usuario WHERE email = "${email}"`;
    return database.executar(instrucaoSql);
}

function buscarUsuario(email, senha){
    var instrucaoSql = `SELECT * FROM Usuario WHERE email = "${email}" AND senha = "${senha}"`;
    return database.executar(instrucaoSql);
}

function buscarUsuarioId(idUsuario){
    var instrucaoSql = `SELECT * FROM Usuario WHERE idUsuario = ${idUsuario}`
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    buscarEmail,
    buscarUsuario,
    buscarUsuarioId
};