var database = require("../database/config");

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM empresa WHERE id = '${id}'`;

  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT * FROM Empresa`;

  return database.executar(instrucaoSql);
}
function listarAcessos(nomeEmpresa) {
  var instrucaoSql = `SELECT 
    u.idUsuario AS 'ID_Usuario',
    u.email AS 'Email_Usuario',
    u.nome AS 'Nome_Usuario',
    u.senha AS 'Senha_Usuario',
    u.telefone AS 'Telefone_Usuario',
    u.fkCargo AS 'ID_Cargo',
    u.fkEmpresa AS 'ID_Empresa',
    e.nome AS 'Nome_Empresa',
    e.cnpj AS 'CNPJ_Empresa',
    e.telefone AS 'Telefone_Empresa',
    c.nome AS 'Nome_Cargo'
FROM Usuario u
INNER JOIN Empresa e ON u.fkEmpresa = e.idEmpresa
INNER JOIN Cargo c ON u.fkCargo = c.idCargo
WHERE e.nome = '${nomeEmpresa}'; `;

  return database.executar(instrucaoSql);
}

function adicionarEmpresa(nome, cnpj, telefone) {
  var instrucaoSql = `
      INSERT INTO Empresa (nome, cnpj, telefone) 
      VALUES ('${nome}', '${cnpj}', '${telefone}');
  `;

  return database.executar(instrucaoSql);
}

function adicionarAcesso(email,nome  ,telefone,  empresaUsuarioID) {
  const instrucaoSql = `
    INSERT INTO Usuario ( email, nome, senha,  telefone ,fkCargo,fkEmpresa  )
    VALUES ('${email}','${nome}', '12345' ,'${telefone}', '3',  '${empresaUsuarioID}');
  `;

  return database.executar(instrucaoSql);
}


function editarAcesso(email, nome, telefone, empresaUsuarioID, id) {
  const instrucaoSql = `
    UPDATE Usuario
    SET email = '${email}', nome = '${nome}', telefone = '${telefone}', fkEmpresa = '${empresaUsuarioID}'
    WHERE idUsuario = '${id}';
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





function excluirAcesso(acessoId) {
  var instrucaoSql = `
      DELETE FROM Usuario WHERE idUsuario = ${acessoId};
  `;

  return database.executar(instrucaoSql);
}



function excluirEmpresa(idEmpresa) {
  var instrucaoSql = `
      DELETE FROM Empresa WHERE idEmpresa = ${idEmpresa};
  `;

  return database.executar(instrucaoSql);
}


module.exports = { buscarPorCnpj, buscarPorId, cadastrar, listar,buscarEmpresas, adicionarEmpresa,editarEmpresa, excluirEmpresa, listarAcessos, adicionarAcesso,editarAcesso, excluirAcesso };
