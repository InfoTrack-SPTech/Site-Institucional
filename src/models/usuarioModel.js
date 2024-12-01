var database = require("../database/config")

function autenticar(email, senha) {
    var instrucaoSql = `SELECT * FROM Usuario WHERE email = "${email}" AND senha = "${senha}"`;
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha, telefone, idEmpresa) {
    
    var instrucaoSql = `INSERT INTO Usuario(email, nome, senha, telefone, fkCargo, fkEmpresa) VALUES("${email}", "${nome}", "${senha}", "${telefone}", 2, ${idEmpresa})`;
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

function retornarUsuarioAutenticar(email, senha){
    var instrucaoSql = `
    SELECT u.idUsuario, u.email, u.nome, u.telefone, u.imagem, e.idEmpresa, e.nome AS empresa, Cargo.nome AS cargo 
    FROM Usuario u
    JOIN Empresa as e ON idEmpresa = fkEmpresa
    JOIN Cargo ON idCargo = fkCargo
    WHERE email = "${email}" AND senha = "${senha}"`;
    return database.executar(instrucaoSql);
}

function atualizarFotoPerfil(nomeImagem, idUsuario){
    var instrucaoSql = `UPDATE Usuario SET imagem = "${nomeImagem}" WHERE idUsuario = ${idUsuario}`;
    return database.executar(instrucaoSql);
}

function atualizarConta(idUsuario, nome, telefone){
    var instrucaoSql = `UPDATE Usuario SET nome = "${nome}", telefone = "${telefone}" WHERE idUsuario = ${idUsuario}`
    return database.executar(instrucaoSql);
}

function excluirContaId(idUsuario){
    var instrucaoSql = `DELETE FROM Usuario WHERE idUsuario = ${idUsuario}`;
    return database.executar(instrucaoSql);
}

function atualizarSenha(idUsuario, novaSenha){
    var instrucaoSql = `UPDATE Usuario SET senha = "${novaSenha}" WHERE idUsuario = ${idUsuario}`;
    return database.executar(instrucaoSql);
}

function excluirUsuario(idUsuario) {
    const instrucaoSql = `DELETE FROM Usuario WHERE idUsuario = ${idUsuario}`;
    return database.executar(instrucaoSql);
}

/* function atualizarSenha(idUsuario, novaSenhaHash) {
    var instrucaoSql = `UPDATE Usuario SET senha = "${novaSenhaHash}" WHERE idUsuario = ${idUsuario}`;
    return database.executar(instrucaoSql);
}*/

module.exports = {
    autenticar,
    cadastrar,
    buscarEmail,
    buscarUsuario,
    buscarUsuarioId,
    atualizarFotoPerfil,
    retornarUsuarioAutenticar,
    atualizarConta,
    excluirContaId,
    excluirUsuario,
    atualizarSenha
};