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
function adicionarAcesso(req, res) {
  const { email,nome, telefone ,empresaUsuarioID } = req.body;
  
  if (!nome || !email || !empresaUsuarioID) {
      return res.status(400).json({ mensagem: 'Dados inválidos. Todos os campos são obrigatórios.' });
  }

  empresaModel.adicionarAcesso(email,nome,telefone ,empresaUsuarioID)
      .then(resultado => {
          res.status(201).json({ mensagem: 'Acesso adicionado com sucesso.', acesso: resultado });
      })
      .catch(error => {
          console.error(error);
          res.status(500).json({ mensagem: 'Erro ao adicionar acesso.', erro: error.message });
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
    function editarAcesso(req, res) {
      const { id, email, nome, telefone, empresaUsuarioID } = req.body;  // Extraindo dados enviados pelo frontend
      console.log(id)
      if (!id || !email || !nome || !telefone || !empresaUsuarioID) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." });
      }
    
      empresaModel.editarAcesso(email, nome, telefone, empresaUsuarioID, id)
        .then(result => {
          if (result.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
          }
          res.status(200).json({ mensagem: 'Usuário editado com sucesso.' });
        })
        .catch(error => {
          console.error(error);
          res.status(500).json({ mensagem: 'Erro ao editar usuário.', erro: error.message });
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

function excluirAcesso(req, res) {
  const { acessoId } = req.params; // Obtém o ID do usuário a partir dos parâmetros da URL
  console.log("ID do usuário recebido:", acessoId); // Verifica o valor no backend

  if (!acessoId) {
      return res.status(400).json({ mensagem: "ID do usuário não fornecido" });
  }

  empresaModel.excluirAcesso(acessoId)
      .then(() => {
          res.status(200).json({ mensagem: "Usuário excluído com sucesso" });
      })
      .catch((erro) => {
          console.error("Erro ao excluir usuário:", erro);
          res.status(500).json({ mensagem: "Erro ao excluir usuário" });
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
function listarAcessos(req, res) {
  const limite_linhas = 7;
  const nomeEmpresa = req.params.empresaUsuario;  // Corrigido para acessar o parâmetro da URL

  console.log("Buscando acessos para a empresa:", nomeEmpresa);

  empresaModel.listarAcessos(nomeEmpresa)  // Passa o nome da empresa para o modelo
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);  // Retorna os dados encontrados
      } else {
        res.status(204).send("Nenhum resultado encontrado!");  // Caso não encontre resultados
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "Houve um erro ao buscar os acessos.",
        erro.sqlMessage
      );
      res.status(500).json({ error: erro.sqlMessage });  // Retorna erro em caso de falha na consulta
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
  excluir,
  listarAcessos,
  adicionarAcesso,
  editarAcesso,
  excluirAcesso
};
