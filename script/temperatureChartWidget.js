// 온도 그래프를 그리는 함수에 async 키워드 추가
async function fetchTemperatureData() {
    const cityName = "Suncheon";  
    const apiKey = "c4757c5c0a7e333405504ce6e19616cf"; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric&lang=kr`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP 오류! 상태: ${response.status}`);
        }
        const data = await response.json();
        plotTemperatureChart(data);
    } catch (error) {
        console.log(error);
        document.getElementById("temperatureChart").innerHTML = "<p>온도 그래프를 가져올 수 없습니다.</p>";
    }
}

function plotTemperatureChart(data) {
    const ctx = document.getElementById('temperatureChart').getContext('2d');
    const labels = data.list.slice(0, 3 * 8).map(item => {
        const date = new Date(item.dt * 1000);
        const formattedDate = `${date.getMonth() + 1}월 ${date.getDate()}일`;
        const hours = date.getHours();
        return `${formattedDate} ${hours}시`;
    });
    const temps = data.list.slice(0, 3 * 8).map(item => item.main.temp);

    let dailyMaxTemps = {};
    data.list.slice(0, 3 * 8).forEach(item => {
        const date = new Date(item.dt * 1000);
        const formattedDate = `${date.getMonth() + 1}월 ${date.getDate()}일`;
        if (!dailyMaxTemps[formattedDate] || item.main.temp > dailyMaxTemps[formattedDate]) {
            dailyMaxTemps[formattedDate] = item.main.temp;
        }
    });

    let maxTempPoints = [];
    data.list.slice(0, 3 * 8).forEach(item => {
        const date = new Date(item.dt * 1000);
        const formattedDate = `${date.getMonth() + 1}월 ${date.getDate()}일`;
        if (item.main.temp === dailyMaxTemps[formattedDate]) {
            maxTempPoints.push({ x: formattedDate + ` ${date.getHours()}시`, y: item.main.temp });
        }
    });

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: '기온 (°C)',
                data: temps,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: false
            }, {
                type: 'scatter',
                label: '최고 기온',
                data: maxTempPoints,
                backgroundColor: 'rgba(255, 99, 132, 1)',
                borderColor: 'rgba(255, 99, 132, 1)',
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: '날짜와 시간'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: '기온 (°C)'
                    }
                }
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", fetchTemperatureData);
