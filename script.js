async function getWeather() {
    const apiKey = '947eaa0e125e4a08b66195428252602';
    const city = document.getElementById('cityInput').value;
    if (!city) return alert("Please enter a city name");

    try {
        // Fetch current weather
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const weatherRes = await fetch(weatherUrl);
        if (!weatherRes.ok) throw new Error("City not found");
        const weatherData = await weatherRes.json();

        // Fetch 7-day forecast (Now using the "forecast" endpoint correctly)
        const lat = weatherData.coord.lat;
        const lon = weatherData.coord.lon;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=7&appid=${apiKey}&units=metric`;
        const forecastRes = await fetch(forecastUrl);
        if (!forecastRes.ok) throw new Error("Error fetching forecast");
        const forecastData = await forecastRes.json();

        // Update current weather UI
        document.getElementById('location').textContent = `${weatherData.name}, ${weatherData.sys.country}`;
        document.getElementById('description').textContent = weatherData.weather[0].description;
        document.getElementById('temperature').textContent = weatherData.main.temp;
        document.getElementById('feelsLike').textContent = weatherData.main.feels_like;
        document.getElementById('humidity').textContent = weatherData.main.humidity;
        document.getElementById('windSpeed').textContent = (weatherData.wind.speed * 3.6).toFixed(1);
        document.getElementById('sunrise').textContent = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString();
        document.getElementById('sunset').textContent = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString();

        changeBackground(weatherData.weather[0].main);
        displayForecast(forecastData);
    } catch (error) {
        alert(error.message);
    }
}

// Convert weather conditions to emojis
function getWeatherEmoji(condition) {
    const emojis = {
        Thunderstorm: "⛈",
        Drizzle: "🌧",
        Rain: "🌧",
        Snow: "❄",
        Clear: "☀",
        Clouds: "☁",
        Mist: "🌫",
        Fog: "🌫",
        Smoke: "💨",
        Haze: "🌁",
        Dust: "🌪",
        Sand: "🌪",
        Ash: "🌋",
        Squall: "🌬",
        Tornado: "🌪"
    };
    return emojis[condition] || "🌍";
}

// Display 7-day forecast
function displayForecast(forecastData) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = ""; // Clear previous data

    let dailyTemps = {};

    forecastData.list.forEach(entry => {
        const date = entry.dt_txt.split(" ")[0];
        if (!dailyTemps[date]) {
            dailyTemps[date] = {
                temp: entry.main.temp,
                description: entry.weather[0].main,
                icon: getWeatherEmoji(entry.weather[0].main)
            };
        }
    });

    Object.keys(dailyTemps).slice(0, 7).forEach(date => {
        const dayForecast = dailyTemps[date];
        const forecastElement = document.createElement("div");
        forecastElement.classList.add("forecast-item");
        forecastElement.innerHTML = `
            <p>${date}</p>
            <p>${dayForecast.icon} ${dayForecast.description}</p>
            <p>🌡 ${dayForecast.temp.toFixed(1)}°C</p>
        `;
        forecastContainer.appendChild(forecastElement);
    });
}

// Change background based on weather condition
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
