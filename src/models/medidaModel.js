var database = require("../database/config");

function buscarUltimasMedidas() {
    var instrucaoSql = `
    SELECT 
        natureza,
        COUNT(idCrime) AS totalCrimes,
        COUNT(idCrime) / TIMESTAMPDIFF(MONTH, MIN(dataOcorrencia), MAX(dataOcorrencia)) AS media_mensal
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
function buscarLocais() {
    var instrucaoSql = `
    SELECT 
    t1.tipoLocal,
    t1.ano,
    t1.mes,
    SUM(t1.totalCrimes) AS totalCrimesMesAtual,
    SUM(t2.totalCrimes) AS totalCrimesMesAnterior,
    CASE 
        WHEN SUM(t2.totalCrimes) IS NULL THEN NULL
        ELSE ((SUM(t1.totalCrimes) - SUM(t2.totalCrimes)) / SUM(t2.totalCrimes)) * 100
    END AS percentualVariacao
FROM (
    SELECT 
        CASE 
            WHEN L.nome IN ('Casa', 'Apartamento', 'Casas', 'Moradia', 'Garagem coletiva de prédio', 
                             'Residência', 'Edícula/Fundos', 'Condomínio Residencial', 'Sítio', 'Chácara', 
                             'Chácaras', 'Loteamento') THEN 'Residencial'
            ELSE 'Comercial'
        END AS tipoLocal,
        YEAR(C.dataOcorrencia) AS ano,
        MONTH(C.dataOcorrencia) AS mes,
        COUNT(C.idCrime) AS totalCrimes
    FROM 
        Crime C
    JOIN 
        Local L ON C.fkLocal = L.idLocal
    WHERE 
        C.natureza IN ('Furto', 'Roubo')
        AND YEAR(C.dataOcorrencia) = YEAR(CURDATE()) 
        AND MONTH(C.dataOcorrencia) IN (5, 6)  -- Meses 5 (maio) e 6 (junho)
    GROUP BY 
        tipoLocal, YEAR(C.dataOcorrencia), MONTH(C.dataOcorrencia)
) AS t1
LEFT JOIN (
    SELECT 
        CASE 
            WHEN L.nome IN ('Casa', 'Apartamento', 'Casas', 'Moradia', 'Garagem coletiva de prédio', 
                             'Residência', 'Edícula/Fundos', 'Condomínio Residencial', 'Sítio', 'Chácara', 
                             'Chácaras', 'Loteamento') THEN 'Residencial'
            ELSE 'Comercial'
        END AS tipoLocal,
        YEAR(C.dataOcorrencia) AS ano,
        MONTH(C.dataOcorrencia) AS mes,
        COUNT(C.idCrime) AS totalCrimes
    FROM 
        Crime C
    JOIN 
        Local L ON C.fkLocal = L.idLocal
    WHERE 
        C.natureza IN ('Furto', 'Roubo')
        AND YEAR(C.dataOcorrencia) = YEAR(CURDATE()) 
        AND MONTH(C.dataOcorrencia) IN (5, 6)  -- Meses 5 (maio) e 6 (junho)
    GROUP BY 
        tipoLocal, YEAR(C.dataOcorrencia), MONTH(C.dataOcorrencia)
) AS t2 ON t1.tipoLocal = t2.tipoLocal
         AND (t1.ano = t2.ano AND t1.mes = t2.mes + 1)
GROUP BY 
    t1.tipoLocal, t1.ano, t1.mes
ORDER BY 
    t1.tipoLocal, t1.ano, t1.mes;


`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarBairros() {
    var instrucaoSql = `
    SELECT Bairro as bairro, TotalCrimes as totalBairro FROM TopBairrosCrimes order by 2;
`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function buscarRuas() {
    var instrucaoSql = `
    SELECT Rua as rua, TotalCrimes as ocorrencias FROM TopRuasCrimes;
`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function bucarPeriodos() {
    var instrucaoSql = `
    SELECT * from periodoCrime;
`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function bucarMeses() {
    var instrucaoSql = `
        select * from totalMeses;
`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    buscarUltimasMedidas,
    buscarLocais,
    buscarBairros,
    buscarRuas,
    bucarPeriodos,
    bucarMeses
};
