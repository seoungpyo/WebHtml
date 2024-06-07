async function fetchWeather() {
    const cityName = "Suncheon";  //도시 이름은 영어만 인식함 
    const apiKey = "c4757c5c0a7e333405504ce6e19616cf"; // 실제 API 키로 바꾸세요.
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric&lang=kr`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP 오류! 상태: ${response.status}`);
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.log(error);
        document.getElementById("weatherInfo").innerHTML = "<p>날씨 정보를 가져올 수 없습니다.</p>";
    }
}

function displayWeather(data) {
    const { city, list } = data;
    const iconCode = list[0].weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

    // 최고/최저 온도 찾기
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
        <p>현재 기온: ${list[0].main.temp}°C &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p> 
        <p>습도: ${list[0].main.humidity}%</p>
        <p>풍속: ${list[0].wind.speed} m/s  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
        <p>최고/최저기온 : ${maxTemp.toFixed(1)}°C / ${minTemp.toFixed(1)}°C</p>
    `;
    document.getElementById("weatherInfo").innerHTML = weatherInfo;
}

window.onload = fetchWeather;
