const apiKey = "a5f3f3fbe57a0529749b3d78974bcf95";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Weather Icons Mapping
const weatherIcons = {
    "Clouds": "images/clouds.png",
    "Clear": "images/clear.png",
    "Rain": "images/rain.png",
    "Drizzle": "images/drizzle.png",
    "Mist": "images/mist.png",
    "Snow": "images/snow.png",
    "Humidity": "images/humidity.png",
    "Wind": "images/wind.png"
};

// Fetch Current Weather
async function checkWeather(city) {
    if (!city) return;

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${encodeURIComponent(city)}&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            return;
        }

        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Set Weather Icon
        weatherIcon.src = weatherIcons[data.weather[0].main] || "images/default.png";

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

        // Fetch 5-day forecast
        getForecast(city);

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Fetch 5-Day Forecast
async function getForecast(city) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=${encodeURIComponent(city)}&appid=${apiKey}`;

    try {
        const response = await fetch(forecastUrl);
        if (!response.ok) throw new Error("Error fetching forecast data");

        const data = await response.json();
        const forecastContainer = document.querySelector(".forecast");
        forecastContainer.innerHTML = ""; // Clear previous forecast

        // Extract daily forecast (filter every 24 hours at 1:00 AM)
        const dailyForecasts = data.list.filter(item => item.dt_txt.includes("1:00:00"));

        dailyForecasts.forEach(day => {
            const date = new Date(day.dt * 1000).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric"
            });

            const temp = Math.round(day.main.temp);
            const weatherCondition = day.weather[0].main;
            const iconSrc = weatherIcons[weatherCondition] || "images/default.png"; // Use your custom images

            forecastContainer.innerHTML += `
                <div class="forecast-day">
                    <p class="forecast-date">${date}</p>
                    <img src="${iconSrc}" alt="${weatherCondition}">
                    <p class="forecast-temp">${temp}°C</p>
                </div>
            `;
        });

    } catch (error) {
        console.error("Error fetching 5-day forecast:", error);
    }
}

// Event Listener
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value.trim());
});

// Load default city weather
checkWeather();
