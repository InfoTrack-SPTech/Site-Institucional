var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});
router.get("/local", function (req, res) {
    medidaController.bucarLocais(req, res);
});


module.exports = router;