var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    empresaController.cadastrar(req, res);
})

router.get("/buscar", function (req, res) {
    empresaController.buscarPorCnpj(req, res);
});

router.get("/buscar/:id", function (req, res) {
  empresaController.buscarPorId(req, res);
});

router.get("/listar", function (req, res) {
  empresaController.listar(req, res);
});

router.get("/trazerEmpresas", function (req, res) {
  empresaController.listarEmpresas(req, res);
});

router.get("/trazerAcesso/:empresaUsuario", function (req, res) {
  empresaController.listarAcessos(req, res);
});

router.post("/adicionar", function (req, res) {
  empresaController.adicionar(req, res);
});

router.post("/adicionarAcesso", function (req, res) {
  empresaController.adicionarAcesso(req, res);
});

router.put("/editar", function (req, res) {
  empresaController.editar(req, res);
});
router.put("/editarAcesso", function (req, res) {
  empresaController.editarAcesso(req, res);
});

router.delete("/excluirAcesso/:acessoId", function (req, res) {
  empresaController.excluirAcesso(req, res);
});


router.delete("/excluir/:idEmpresa", function (req, res) {
  empresaController.excluir(req, res);
}); 

module.exports = router;