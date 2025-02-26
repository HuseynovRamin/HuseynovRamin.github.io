async function getWeather() {
    const apiKey = '947eaa0e125e4a08b66195428252602'; // Your WeatherAPI key
    const city = document.getElementById('cityInput').value;
    if (!city) return alert("Please enter a city name");

    try {
        // Fetch current weather from WeatherAPI
        const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
        console.log("Weather API URL: ", weatherUrl); // Log URL for debugging
        const weatherRes = await fetch(weatherUrl);
        
        if (!weatherRes.ok) throw new Error(`City not found: ${weatherRes.status}`);
        
        const weatherData = await weatherRes.json();
        console.log("Weather Data: ", weatherData); // Log weather data
        
        // Fetch 7-day forecast from WeatherAPI
        const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`;
        console.log("Forecast API URL: ", forecastUrl); // Log forecast URL for debugging
        const forecastRes = await fetch(forecastUrl);
        
        if (!forecastRes.ok) throw new Error("Error fetching forecast");
        
        const forecastData = await forecastRes.json();
        console.log("Forecast Data: ", forecastData); // Log forecast data

        // Check if forecast data exists
        if (!forecastData.forecast || !forecastData.forecast.forecastday) {
            throw new Error("Forecast data is missing.");
        }

        // Update current weather UI
        document.getElementById('location').textContent = `${weatherData.location.name}, ${weatherData.location.country}`;
        document.getElementById('description').textContent = weatherData.current.condition.text;
        document.getElementById('temperature').textContent = weatherData.current.temp_c;
        document.getElementById('feelsLike').textContent = weatherData.current.feelslike_c;
        document.getElementById('humidity').textContent = weatherData.current.humidity;
        document.getElementById('windSpeed').textContent = weatherData.current.wind_kph;
        document.getElementById('sunrise').textContent = weatherData.forecast.forecastday[0].astro.sunrise;
        document.getElementById('sunset').textContent = weatherData.forecast.forecastday[0].astro.sunset;

        changeBackground(weatherData.current.condition.text);
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
    if (!forecastData || !forecastData.forecast || !forecastData.forecast.forecastday) {
        console.error("Forecast data is missing or malformed.");
        return;
    }

    forecastData.forecast.forecastday.forEach(day => {
        const forecastElement = document.createElement("div");
        forecastElement.classList.add("forecast-item");
        forecastElement.innerHTML = `
            <p>${day.date}</p>
            <p>${getWeatherEmoji(day.day.condition.text)} ${day.day.condition.text}</p>
            <p>🌡 ${day.day.avgtemp_c.toFixed(1)}°C</p>
        `;
        forecastContainer.appendChild(forecastElement);
    });
}

// Change background based on weather condition
function changeBackground(condition) {
    let bg = document.querySelector('.background-animation');
    if (condition.includes("Rain")) {
        bg.style.background = "url('rain-animation.gif')";
    } else if (condition.includes("Cloud")) {
        bg.style.background = "url('cloudy-animation.gif')";
    } else {
        bg.style.background = "url('sunny-animation.gif')";
    }
    bg.style.opacity = 0.5;
    bg.style.transition = "background 1s ease-in-out";
}
