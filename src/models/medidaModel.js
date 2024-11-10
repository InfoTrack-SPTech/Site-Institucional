var database = require("../database/config");

function buscarUltimasMedidas() {
    var instrucaoSql = `
    SELECT 
    natureza,
    ano,
    mes,
    totalCrimes,
    LAG(totalCrimes) OVER (PARTITION BY natureza ORDER BY ano, mes) AS totalCrimesMesAnterior,
    CASE 
        WHEN LAG(totalCrimes) OVER (PARTITION BY natureza ORDER BY ano, mes) IS NULL THEN 0
        ELSE ((totalCrimes - LAG(totalCrimes) OVER (PARTITION BY natureza ORDER BY ano, mes)) 
              / LAG(totalCrimes) OVER (PARTITION BY natureza ORDER BY ano, mes)) * 100
    END AS percentualVariacao
FROM (
    SELECT 
        natureza,
        YEAR(dataOcorrencia) AS ano,
        MONTH(dataOcorrencia) AS mes,
        COUNT(idCrime) AS totalCrimes
    FROM 
        Crime
    WHERE 
        natureza IN ('Furto', 'Roubo')
    GROUP BY 
        natureza, YEAR(dataOcorrencia), MONTH(dataOcorrencia)
) AS CrimesPorMes
ORDER BY 
    natureza, ano, mes;
`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function buscarLocais() {
    var instrucaoSql = `


    SELECT 
    L.nome AS tipoLocal,
    YEAR(C.dataOcorrencia) AS ano,
    MONTH(C.dataOcorrencia) AS mes,
    COUNT(C.idCrime) AS totalCrimes,
    LAG(COUNT(C.idCrime)) OVER (PARTITION BY L.nome ORDER BY YEAR(C.dataOcorrencia), MONTH(C.dataOcorrencia)) AS totalCrimesMesAnterior,
    CASE 
        WHEN LAG(COUNT(C.idCrime)) OVER (PARTITION BY L.nome ORDER BY YEAR(C.dataOcorrencia), MONTH(C.dataOcorrencia)) IS NULL THEN NULL
        ELSE ((COUNT(C.idCrime) - LAG(COUNT(C.idCrime)) OVER (PARTITION BY L.nome ORDER BY YEAR(C.dataOcorrencia), MONTH(C.dataOcorrencia))) 
              / LAG(COUNT(C.idCrime)) OVER (PARTITION BY L.nome ORDER BY YEAR(C.dataOcorrencia), MONTH(C.dataOcorrencia))) * 100
    END AS percentualVariacao
FROM 
    Crime C
JOIN 
    Local L ON C.fkLocal = L.idLocal
WHERE 
    C.natureza IN ('Furto', 'Roubo')
GROUP BY 
    L.nome, YEAR(C.dataOcorrencia), MONTH(C.dataOcorrencia)
ORDER BY 
    tipoLocal, ano, mes;


`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarLocais,
};
