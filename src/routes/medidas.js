var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});
router.get("/local", function (req, res) {
    medidaController.bucarLocais(req, res);
});
router.get("/bairro", function (req, res) {
    medidaController.bucarBairro(req, res);
});

router.get("/ruas", function (req, res) {
    medidaController.bucarRua(req, res);
});
router.get("/periodos", function (req, res) {
    medidaController.bucarPeriodo(req, res);
});

router.get("/meses", function (req, res) {
    medidaController.bucarMes(req, res);
});


module.exports = router;