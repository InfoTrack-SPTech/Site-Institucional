var empresaModel = require("../models/empresaModel");

function buscarPorCnpj(req, res) {
  var cnpj = req.query.cnpj;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function listar(req, res) {
  empresaModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorId(req, res) {
  var id = req.params.id;

  empresaModel.buscarPorId(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function cadastrar(req, res) {
  var cnpj = req.body.cnpj;
  var razaoSocial = req.body.razaoSocial;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    if (resultado.length > 0) {
      res
        .status(401)
        .json({ mensagem: `a empresa com o cnpj ${cnpj} já existe` });
    } else {
      empresaModel.cadastrar(razaoSocial, cnpj).then((resultado) => {
        res.status(201).json(resultado);
      });
    }
  });
}

function adicionar(req, res) {
  const { cnpj, nome, telefone } = req.body;
  console.log('estou na controler')
  // Apenas insere os dados sem validação
  empresaModel.adicionarEmpresa(nome, cnpj, telefone).then((resultado) => {
    res.status(201).json({ mensagem: 'Empresa cadastrada com sucesso.', empresa: resultado });
  }).catch((error) => {
    // Se houver erro durante o cadastro, retorna um erro 500
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao cadastrar empresa.', erro: error.message });
  });
}

function editar(req, res) {
  const { idEmpresa, nome, cnpj, telefone } = req.body;

  empresaModel.editarEmpresa(idEmpresa, nome, cnpj, telefone)
      .then(() => {
          res.status(200).json({ mensagem: "Empresa atualizada com sucesso" });
      })
      .catch((erro) => {
          console.error("Erro ao atualizar empresa:", erro);
          res.status(500).json({ mensagem: "Erro ao atualizar empresa" });
      });
}
function excluir(req, res) {
  const { idEmpresa } = req.params;  // Agora está certo, pois usamos o nome consistente
  console.log("ID da empresa recebido:", idEmpresa); // Verifique o valor no backend
  
  if (!idEmpresa) {
    return res.status(400).json({ mensagem: "ID da empresa não fornecido" });
  }

  empresaModel.excluirEmpresa(idEmpresa)
      .then(() => {
          res.status(200).json({ mensagem: "Empresa excluída com sucesso" });
      })
      .catch((erro) => {
          console.error("Erro ao excluir empresa:", erro);
          res.status(500).json({ mensagem: "Erro ao excluir empresa" });
      });
}








function listarEmpresas(req, res) {
  const limite_linhas = 7;


  console.log("to na empresas")

  empresaModel.listar()
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
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  listar,
  listarEmpresas,
  adicionar,
  editar,
  excluir
};
