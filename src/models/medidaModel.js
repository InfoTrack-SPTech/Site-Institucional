var database = require("../database/config");

function buscarUltimasMedidas() {
    var instrucaoSql = `
    SELECT 
    natureza,
    COUNT(*) AS total
FROM 
    Crime
WHERE 
    natureza IN ('Furto', 'Roubo')
GROUP BY 
    natureza;

`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
};
