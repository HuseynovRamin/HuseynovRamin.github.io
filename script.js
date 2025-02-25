async function getWeather() {
    const apiKey = '84ece90801f8623a75592cd4a875b3e2';
    const city = document.getElementById('cityInput').value;
    if (!city) return alert("Please enter a city name");

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    if (response.status !== 200) {
        alert("City not found");
        return;
    }

    const data = await response.json();
    document.getElementById('location').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('temperature').textContent = data.main.temp;
    document.getElementById('feelsLike').textContent = data.main.feels_like;
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('windSpeed').textContent = (data.wind.speed * 3.6).toFixed(1);

    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
    document.getElementById('sunrise').textContent = sunrise;
    document.getElementById('sunset').textContent = sunset;

    changeBackground(data.weather[0].main);
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
