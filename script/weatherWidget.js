async function fetchWeatherData() {
    const cityName = "Suncheon";  
    const apiKey = "c4757c5c0a7e333405504ce6e19616cf"; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric&lang=kr`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP 오류! 상태: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.log(error);
        return null;
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

function displayWeather(data) {
    const { city, list } = data;
    const iconCode = list[0].weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

    let maxTemp = -Infinity, minTemp = Infinity;
    list.forEach(item => {
        if (item.main.temp > maxTemp) maxTemp = item.main.temp;
        if (item.main.temp < minTemp) minTemp = item.main.temp;
    });

    const weatherInfo = `
        <h3>순천 날씨</h3>
        <div class="icon-container">
        <img src="${iconUrl}" alt="날씨 아이콘" class="weather-icon">
        </div>
        <p>현재 기온: ${list[0].main.temp}°C</p>
        <p>습도: ${list[0].main.humidity}%</p>
        <p>풍속: ${list[0].wind.speed} m/s</p>
        <p>최고/최저기온 : ${maxTemp.toFixed(1)}°C / ${minTemp.toFixed(1)}°C</p>
    `;
    document.getElementById("weatherInfo").innerHTML = weatherInfo;
}

async function initialize() {
    const data = await fetchWeatherData();
    if (data) {
        plotTemperatureChart(data);
        displayWeather(data);
    } else {
        document.getElementById("temperatureChart").innerHTML = "<p>온도 그래프를 가져올 수 없습니다.</p>";
        document.getElementById("weatherInfo").innerHTML = "<p>날씨 정보를 가져올 수 없습니다.</p>";
    }
}

document.addEventListener("DOMContentLoaded", initialize);

document.getElementById('weatherWidget').addEventListener('click', function() {
    var modal = document.getElementById('myModal');
    modal.style.display = "block";
});

document.getElementsByClassName('close')[0].addEventListener('click', function() {
    var modal = document.getElementById('myModal');
    modal.style.display = "none";
});

window.addEventListener('click', function(event) {
    var modal = document.getElementById('myModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
});
