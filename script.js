async function getWeather() {
    const apiKey = '84ece90801f8623a75592cd4a875b3e2'; // Your OpenWeather API key
    const city = document.getElementById('cityInput').value;
    if (!city) return alert("Please enter a city name");

    try {
        // Fetch current weather from OpenWeather
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        console.log("Weather API URL: ", weatherUrl); // Log URL for debugging
        const weatherRes = await fetch(weatherUrl);
        
        if (!weatherRes.ok) throw new Error("City not found");
        
        const weatherData = await weatherRes.json();
        console.log("Weather Data: ", weatherData); // Log weather data

        // Get coordinates for 7-day forecast
        const lat = weatherData.coord.lat;
        const lon = weatherData.coord.lon;

        // Fetch 7-day forecast from OpenWeather
        const forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=${apiKey}&units=metric`;
        console.log("Forecast API URL: ", forecastUrl); // Log forecast URL for debugging
        const forecastRes = await fetch(forecastUrl);
        
        if (!forecastRes.ok) throw new Error("Error fetching forecast");

        const forecastData = await forecastRes.json();
        console.log("Forecast Data: ", forecastData); // Log forecast data

        // Update current weather UI
        document.getElementById('location').textContent = `${weatherData.name}, ${weatherData.sys.country}`;
        document.getElementById('description').textContent = weatherData.weather[0].description;
        document.getElementById('temperature').textContent = weatherData.main.temp;
        document.getElementById('feelsLike').textContent = weatherData.main.feels_like;
        document.getElementById('humidity').textContent = weatherData.main.humidity;
        document.getElementById('windSpeed').textContent = (weatherData.wind.speed * 3.6).toFixed(1);

        const sunrise = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString();
        const sunset = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString();
        document.getElementById('sunrise').textContent = sunrise;
        document.getElementById('sunset').textContent = sunset;

        changeBackground(weatherData.weather[0].main);
        displayForecast(forecastData);
    } catch (error) {
        alert(`Error: ${error.message}`);
        console.error("Error: ", error); // Log the error for debugging
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

    // Check if forecast data exists
    if (!forecastData.daily) {
        console.error("Forecast data is missing or malformed.");
        return;
    }

    forecastData.daily.forEach(day => {
        const forecastElement = document.createElement("div");
        forecastElement.classList.add("forecast-item");
        forecastElement.innerHTML = `
            <p>${new Date(day.dt * 1000).toLocaleDateString()}</p>
            <p>${getWeatherEmoji(day.weather[0].main)} ${day.weather[0].description}</p>
            <p>🌡 ${day.temp.day.toFixed(1)}°C</p>
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
