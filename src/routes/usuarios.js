var express = require("express");
var router = express.Router();

const UsuarioModels = require("../models/usuarioModel");
var usuarioController = require("../controllers/usuarioController");
const awsKey = process.env.AWS_ACCESS_KEY_ID; // Use variáveis de ambiente

const multer = require("multer");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar/:idEmpresa", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

const upload = multer({ storage: multer.memoryStorage() });

router.post("/subirImagem/:idUsuario", upload.single("imagem"), async (req, res) => {
    try {

        const usuario = await UsuarioModels.buscarUsuarioId(req.params.idUsuario);

        // Verificar se o arquivo foi enviado
        if (!req.file) {
            return res.status(400).send("Nenhum arquivo foi enviado.");
        }

        const { originalname, mimetype, buffer } = req.file;

        // Configuração do cliente S3
        const bucketName = "s3-foto-perfil";
        const s3Cliente = new S3Client({
            region: 'us-east-1',
            credentials: {
                accessKeyId: "",
                secretAccessKey: "",
                sessionToken: ""
            }
        });

        // Enviar o arquivo ao S3
        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: `${usuario[0].idUsuario}${originalname.substring(originalname.indexOf("."))}`, // Nome único para evitar substituições
            Body: buffer, // Arquivo enviado no body
            ContentType: mimetype // Tipo MIME do arquivo
        });

        await s3Cliente.send(command);

        res.status(200).json({ message: "Imagem enviada com sucesso!" });
    } catch (err) {
        console.error("Erro ao subir imagem:", err);
        res.status(500).json({ error: "Erro ao enviar a imagem." });
    }
});



module.exports = router;