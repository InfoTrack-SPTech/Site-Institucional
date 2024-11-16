document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeSwitch');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
    });

    let isLightTheme = body.classList.contains('light-theme');
    let currentChart = createChart(isLightTheme ? themes.light : themes.dark);

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        isLightTheme = body.classList.contains('light-theme');

        currentChart.update({
            chart: {
                backgroundColor: isLightTheme ? themes.light.backgroundColor : themes.dark.backgroundColor
            },
            colorAxis: {
                minColor: isLightTheme ? themes.light.colorAxis.minColor : themes.dark.colorAxis.minColor,
                maxColor: isLightTheme ? themes.light.colorAxis.maxColor : themes.dark.colorAxis.maxColor,
            },
            title: {
                style: {
                    color: isLightTheme ? themes.light.titleColor : themes.dark.titleColor
                }
            },
            series: [{
                data: [
                    { name: 'Sé', value: 35000, color: isLightTheme ? themes.light.seriesColors[0] : themes.dark.seriesColors[0] },
                    { name: 'Brás', value: 30000, color: isLightTheme ? themes.light.seriesColors[1] : themes.dark.seriesColors[1] },
                    { name: 'Liberdade', value: 28000, color: isLightTheme ? themes.light.seriesColors[2] : themes.dark.seriesColors[2] },
                    { name: 'Vila Madalena', value: 25000, color: isLightTheme ? themes.light.seriesColors[3] : themes.dark.seriesColors[3] },
                    { name: 'Capão Redondo', value: 22000, color: isLightTheme ? themes.light.seriesColors[4] : themes.dark.seriesColors[4] },
                    { name: 'Itaim Bibi', value: 20000, color: isLightTheme ? themes.light.seriesColors[5] : themes.dark.seriesColors[5] },
                    { name: 'Tatuapé', value: 18000, color: isLightTheme ? themes.light.seriesColors[6] : themes.dark.seriesColors[6] }
                ]
            }]
        });
    });
});