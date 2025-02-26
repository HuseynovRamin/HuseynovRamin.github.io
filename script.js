async function getWeather() {
    const apiKey = '84ece90801f8623a75592cd4a875b3e2';
    const city = document.getElementById('cityInput').value;
    if (!city) return alert("Please enter a city name");

    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat={latitude}&lon={longitude}&exclude=hourly,minutely&appid=${apiKey}&units=metric`;

    // Get current weather
    const currentResponse = await fetch(currentUrl);
    if (currentResponse.status !== 200) {
        alert("City not found");
        return;
    }

    const currentData = await currentResponse.json();
    document.getElementById('location').textContent = `${currentData.name}, ${currentData.sys.country}`;
    document.getElementById('description').textContent = currentData.weather[0].description;
    document.getElementById('temperature').textContent = currentData.main.temp;
    document.getElementById('feelsLike').textContent = currentData.main.feels_like;
    document.getElementById('humidity').textContent = currentData.main.humidity;
    document.getElementById('windSpeed').textContent = (currentData.wind.speed * 3.6).toFixed(1);

    const sunrise = new Date(currentData.sys.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(currentData.sys.sunset * 1000).toLocaleTimeString();
    document.getElementById('sunrise').textContent = sunrise;
    document.getElementById('sunset').textContent = sunset;

    // Get forecast
    const latitude = currentData.coord.lat;
    const longitude = currentData.coord.lon;
    const forecastResponse = await fetch(forecastUrl.replace("{latitude}", latitude).replace("{longitude}", longitude));
    const forecastData = await forecastResponse.json();

    displayForecast(forecastData.daily);
    changeBackground(currentData.weather[0].main);
}

function displayForecast(forecast) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = ''; // Clear previous forecast

    forecast.slice(0, 7).forEach((day, index) => {
        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');
        
        const date = new Date(day.dt * 1000);
        const dayOfWeek = date.toLocaleString('en', { weekday: 'long' });

        const weatherEmoji = getWeatherEmoji(day.weather[0].main);
        
        forecastItem.innerHTML = `
            <h3>${dayOfWeek} ${weatherEmoji}</h3>
            <p>🌡 High: ${day.temp.max}°C | Low: ${day.temp.min}°C</p>
            <p>💧 Humidity: ${day.humidity}%</p>
        `;
        
        forecastContainer.appendChild(forecastItem);
    });
}

function getWeatherEmoji(weather) {
    const weatherEmojis = {
        'Clear': '☀️',
        'Clouds': '☁️',
        'Rain': '🌧️',
        'Snow': '❄️',
        'Thunderstorm': '⚡',
        'Drizzle': '🌦️',
    };
    
    return weatherEmojis[weather] || '🌤️';
}

function changeBackground(weather) {
    let bg = document.querySelector('.background-animation');
    if (weather.includes("Rain")) {
        bg.style.background = "url('rain-animation.gif')";
    } else if (weather.includes("Cloud")) {
        bg.style.background = "url('cloudy-animation.gif')";
    } else {
        bg.style.background = "url('sunny-animation.gif')";
    }
    bg.style.opacity = 0.5;
    bg.style.transition = "background 1s ease-in-out";
}
