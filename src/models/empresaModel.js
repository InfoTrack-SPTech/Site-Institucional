var database = require("../database/config");

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM empresa WHERE id = '${id}'`;

  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT * FROM Empresa`;

  return database.executar(instrucaoSql);
}

function adicionarEmpresa(nome, cnpj, telefone) {
  var instrucaoSql = `
      INSERT INTO Empresa (nome, cnpj, telefone) 
      VALUES ('${nome}', '${cnpj}', '${telefone}');
  `;

  return database.executar(instrucaoSql);
}



function editarEmpresa(idEmpresa, nome, cnpj, telefone) {
  var instrucaoSql = `
      UPDATE Empresa 
      SET nome = '${nome}', cnpj = '${cnpj}', telefone = '${telefone}' 
      WHERE idEmpresa = ${idEmpresa};
  `;
  return database.executar(instrucaoSql);
}

function buscarPorCnpj(cnpj) {
  var instrucaoSql = `SELECT * FROM empresa WHERE cnpj = '${cnpj}'`;

  return database.executar(instrucaoSql);
}

function cadastrar(razaoSocial, cnpj) {
  var instrucaoSql = `INSERT INTO empresa (razao_social, cnpj) VALUES ('${razaoSocial}', '${cnpj}')`;

  return database.executar(instrucaoSql);
}

function buscarEmpresas() {
  var instrucaoSql = ` select * from Empresa`;

  return database.executar(instrucaoSql);
}





function excluirEmpresa(idEmpresa) {
  var instrucaoSql = `
      DELETE FROM Empresa WHERE idEmpresa = ${idEmpresa};
  `;

  return database.executar(instrucaoSql);
}


module.exports = { buscarPorCnpj, buscarPorId, cadastrar, listar,buscarEmpresas, adicionarEmpresa,editarEmpresa, excluirEmpresa };
