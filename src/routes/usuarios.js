var express = require("express");
const multer = require("multer");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar/:idEmpresa", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

const upload = multer({ storage: multer.memoryStorage() });
router.post("/subirImagem/:idUsuario", upload.single("imagem"), async (req, res) => { 
   usuarioController.subirFoto(req, res); 
});

router.delete("/removerImagem/:idUsuario", (req, res) => {
    usuarioController.removerFoto(req, res);
})

router.put("/editarConta/:idUsuario", (req, res) => {
    usuarioController.editarConta(req, res);
})

router.delete("/excluirConta/:idUsuario/:cargo", (req, res) => {
    usuarioController.excluirConta(req, res);
})

router.put("/atualizarSenha/:idUsuario", (req, res) => {
    usuarioController.atualizarSenha(req, res);
})

router.post("/verificarSenha/:idUsuario", (req, res) => {
    usuarioController.verificarSenha(req, res);
});

module.exports = router;