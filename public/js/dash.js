    let chart3 = null;
    let chart5 = null;
    let chart6 = null;


    const ctx3 = document.getElementById("myChart3");
    const ctx4 = document.getElementById("myChart4");
    const ctx5 = document.getElementById("myChart5");
    const ctx6 = document.getElementById("myChart6");
    var ultimas;
    var global;
    var cont = 0;
    var totalFurtos = 0;
    var totalRoubos = 0;
    var totaisComercial = 0;
    var totaisResidencial = 0;
    var totalLocal = 0;
    var ok = false;
    var totalCrimesAnual
    var nomeBairros = {
    bairros: [],
    valores: [],
    };
    var nomeRuas = {
    rua: [],
    valores: [],
    };
    var perido = {
        periodo: [],
        valores: []
    }

    var meses = {
        mesesComercial: [],
        valoresComercial: [],
        mesesResidencial: [],
        valoresResidencial: [],
        nomeMeses: []
    }

    function formartarNum(num) {
    let numFormatado = num.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    return numFormatado;
    }
    function obterDadosGrafico() {
        function fetchUltimas() {
            
    fetch(`/medidas/ultimas`)
    .then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Nenhum dado encontrado ou erro na API");
        }
    })
    .then(function (resposta) {
        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
        resposta.reverse();
            console.log("imprimindo resposta");
            console.log(resposta[0]);
            plotarGrafico(resposta);
            fetchLocal();
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}

function fetchLocal() {
    fetch(`/medidas/local`)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Nenhum dado encontrado ou erro na API");
            }
        })
        .then(function (resposta) {
            console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
            resposta.reverse();
            console.log("imprimindo resposta");
            console.log(resposta[0]);
            plotarGrafico(resposta);
            fetchBairro();
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}

function fetchBairro() {
    fetch(`/medidas/bairro`)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Nenhum dado encontrado ou erro na API");
            }
        })
        .then(function (resposta) {
            console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
            resposta.reverse();
            console.log("imprimindo resposta");
            plotarGrafico(resposta);
            fetchRuas();
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}

function fetchRuas() {
    fetch(`/medidas/ruas`)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Nenhum dado encontrado ou erro na API");
            }
        })
        .then(function (resposta) {
            console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
            console.log("imprimindo resposta");
            plotarGrafico(resposta);
            fetchPeriodos();
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}

function fetchPeriodos() {
    fetch(`/medidas/periodos`)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Nenhum dado encontrado ou erro na API");
            }
        })
        .then(function (resposta) {
            console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
            console.log("imprimindo resposta");
            plotarGrafico(resposta);
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}


// Inicia a sequência
fetchUltimas();


    function fetchMeses() {
        fetch(`/medidas/meses`)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Nenhum dado encontrado ou erro na API");
                }
            })
            .then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                console.log("imprimindo resposta");
                plotarGrafico(resposta);
            })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados: ${error.message}`);
            });
    }

    fetchMeses()


    }

    function plotarGrafico(resposta) {
    console.log("iniciando plotagem do gráfico...");
    console.log("----------------------------------------------");
    console.log(
        'Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":'
    );
    console.log(resposta);

    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];

        if(registro.local == 'Comercial') {
            meses.mesesComercial.push(registro.mes)
            meses.valoresComercial.push(registro.totalOcorrencias)
            meses.nomeMeses.push(registro.mes)
        }
        if(registro.local == 'Residencial') {
            meses.mesesResidencial.push(registro.mes)
            meses.valoresResidencial.push(registro.totalOcorrencias)
            console.log(registro.totalOcorrencias)
            console.log(registro.totalOcorrencias)
        }


        if (registro.natureza == "ROUBO") {
        totalRoubos += registro.totalCrimes;
        }

        if (registro.natureza == "FURTO") {
        totalFurtos += registro.totalCrimes;
        }

        if (registro.tipoLocal == "Residencial" && registro.mes == 6) {
        totaisResidencial = parseInt(registro.totalCrimesMesAtual);
        varicaoResidencial.innerHTML =
            parseFloat(registro.percentualVariacao).toFixed(2) + "%";
        }
        if (registro.tipoLocal == "Comercial" && registro.mes == 6) {
        totaisComercial = parseInt(registro.totalCrimesMesAtual);
        varicaoComecial.innerHTML =
            parseFloat(registro.percentualVariacao).toFixed(2) + "%";
        }

        if (registro.bairro) {
        cont++;
        nomeBairros.bairros.push(registro.bairro);
        nomeBairros.valores.push(registro.totalBairro);
        }

        if (registro.rua) {
        nomeRuas.rua.push(registro.rua);
        nomeRuas.valores.push(parseInt(registro.ocorrencias.toString().replace(".", "")) );
        }

        if(registro.periodo) {
            console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
            console.log(registro.periodo)
            perido.periodo.push(registro.periodo)
            perido.valores.push(parseInt(registro.valores.toString().replace(".", "")))
        }
    }

    if (registro.natureza == "FURTO" || registro.tipoLocal == "ROUBO") {
        var totalCasos = totalFurtos + totalRoubos;
        var mediaMensalCasos = totalCasos / 6;
        mediaMensal.innerHTML = formartarNum(mediaMensalCasos);

        totalOcorrencia.innerHTML = formartarNum(totalCasos);
        totalFurto.innerHTML = ` (${formartarNum(
        totalFurtos
        )}) <br> Total de Furtos`;
        totalRoubo.innerHTML = ` (${formartarNum(
        totalRoubos
        )}) <br> Total de Furtos`;
        porcemtagemTotalFurtos.innerHTML = `${
        (totalFurtos / totalCasos).toFixed(2) * 100
        }%`;
        porcemtagemTotalRoubos.innerHTML = `${
        (totalRoubos / totalCasos).toFixed(2) * 100
        }%`;
    }
    if (
        registro.tipoLocal == "Comercial" ||
        registro.tipoLocal == "Residencial"
    ) {
        totalComercial.innerHTML = ` (${formartarNum(
        totaisComercial
        )}) <br> Comercial`;
        totalResidencial.innerHTML = ` (${formartarNum(
        totaisResidencial
        )}) <br> Residencial`;
        totalLocal = totaisComercial + totaisResidencial;
        percetualComercial.innerHTML = ` ${(
        (totaisComercial / totalLocal) *
        100
        ).toFixed()}%`;
        percetualResidencial.innerHTML = `${(
        (totaisResidencial / totalLocal) *
        100
        ).toFixed()}%`;
    }

 

    if (chart3) {
        chart3.destroy(); // Destruir o gráfico anterior se ele já existir
    }

    chart3 = new Chart(ctx3, {
        type: "bar",
        data: {
        labels: perido.periodo,
        datasets: [
            {
            label: "Média de Roubos e Furtos por Período",
            data: perido.valores, // Adicione os dados correspondentes a cada período
            backgroundColor: [
                "rgba(173, 216, 230, 1)", // Cor da Manhã
                "rgba(152, 251, 152, 1)", // Cor da Tarde
                "rgba(255, 182, 193, 1)", // Cor da Noite
                "rgba(255, 255, 204, 1)", // Cor da Madrugada
            ],
            borderColor: "#000000",
            borderWidth: 1,
            },
        ],
        },
        options: {
        responsive: true,
        plugins: {
            title: {
            display: true,
            text: "Média de Roubos e Furtos em São Paulo por Período do Dia",
            font: {
                size: 18,
                family: "Arial",
                weight: "bold",
            },
            color: "#FFFFFF",
            },
            legend: {
            display: false,
            },
            tooltip: {
            callbacks: {
                label: function (tooltipItem) {
                return `Média: ${tooltipItem.raw}`;
                },
            },
            },
        },
        scales: {
            y: {
            beginAtZero: true,
            ticks: {
                color: "#FFFFFF",
            },
            grid: {
                display: false, // Remover a grade do gráfico
            },
            },
            x: {
            barPercentage: 0.8, // Aumenta a largura das barras
            categoryPercentage: 0.9, // Aumenta o espaço das categorias
            ticks: {
                color: "#FFFFFF",
            },
            grid: {
                display: false, // Remover a grade do gráfico
            },
            },
        },
        },
    });

    if (chart5) {
        chart5.destroy(); // Destruir o gráfico anterior se ele já existir
    }

    chart5 = new Chart(ctx5, {
        type: "line",
        data: {
        labels: meses.nomeMeses, 
        datasets: [
            {
            label: "Comercial",
            data: meses.valoresComercial, // Dados que somam mais de 46 mil
            borderWidth: 2,
            backgroundColor: "rgba(0, 0, 0, 0)", // Sem cor de fundo
            borderColor: "rgb(30, 144, 255)", // Azul para a linha comercial
            },
            {
            label: "Residencial",
            data: meses.valoresResidencial,
            borderWidth: 2,
            backgroundColor: "rgba(0, 0, 0, 0)", // Sem cor de fundo
            borderColor: "rgb(255, 105, 180)", // Rosa para a linha residencial
            },
        ],
        },
        options: {
        plugins: {
            title: {
            display: true,
            text: "Comparativo Mensal de Crimes em Áreas Comerciais e Residenciais",
            color: "#FFFFFF",
            font: {
                size: 18,
                family: "Arial",
                weight: "bold",
            },
            padding: {
                top: 10,
                bottom: 30,
            },
            },
        },
        scales: {
            y: {
            ticks: {
                color: "#FFFFFF",
                font: {
                size: 12,
                family: "Arial",
                weight: "bold",
                },
            },
            grid: {
                display: false,
            },
            },
            x: {
            ticks: {
                color: "#FFFFFF",
                font: {
                size: 12,
                family: "Arial",
                weight: "bold",
                },
            },
            grid: {
                display: false,
            },
            },
        },
        },
    });

    if (chart6) {
        chart6.destroy();
        console.log(nomeRuas.rua);
    }

    chart6 = new Chart(ctx6, {
        type: "bar",
        data: {
        labels: nomeRuas.rua,
        datasets: [
            {
            label: "Média de Casos por Dia",
            data: nomeRuas.valores,
            backgroundColor: [
                "rgba(135, 206, 250, 1)", // Rua das Flores
                "rgba(144, 238, 144, 1)", // Avenida Paulista
                "rgba(255, 215, 0, 1)", // Rua da Liberdade
                "rgba(255, 228, 196, 1)", // Rua dos Alfeneiros
                "rgba(173, 216, 230, 1)", // Rua dos Sampaio
                "rgba(221, 160, 221, 1)", // Avenida São João
                "rgba(173, 255, 47, 1)", // Rua da Esperança
                "rgba(176, 224, 230, 1)", // Rua do Comércio
                "rgba(240, 230, 140, 1)", // Rua da Cidadania
                "rgba(200, 200, 255, 1)", // Rua do Lazer
            ],
            borderColor: "#000000",
            borderWidth: 1,
            },
        ],
        },
        options: {
        responsive: true,
        plugins: {
            title: {
            display: true,
            text: "As Ruas com as Maiores Médias de Índices de Criminalidade por Dia",
            font: {
                size: 18,
                family: "Arial",
                weight: "bold",
            },
            color: "#FFFFFF",
            },
            legend: {
            display: false,
            },
            tooltip: {
            callbacks: {
                label: function (tooltipItem) {
                return `Média: ${tooltipItem.raw}`;
                },
            },
            },
        },
        scales: {
            y: {
            beginAtZero: true,
            ticks: {
                color: "#FFFFFF",
            },
            grid: {
                display: false, // Remover a grade do gráfico
            },
            },
            x: {
            ticks: {
                color: "#FFFFFF",
            },
            grid: {
                display: false, // Remover a grade do gráfico
            },
            },
        },
        },
    });
    }

    obterDadosGrafico();
