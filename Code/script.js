// Global variables
var currentUnit = "C"; // Start with Celsius
var currentTemperatureData = {}; // For main weather
var hourlyTemperatureData = []; // For hourly forecast

function getWeather() {
  const apiKey = "6f3e2e03ac3b1a1412782abe7f03c35b";
  const city = document.getElementById("city").value;

  if (!city) {
    alert("Please enter a city");
    return;
  }

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  fetch(currentWeatherUrl)
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      console.error("Error fetching current weather data:", error);
      alert("Error fetching current weather data. Please try again.");
    });

  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => {
      displayHourlyForecast(data.list);
    })
    .catch((error) => {
      console.error("Error fetching hourly forecast data:", error);
      alert("Error fetching hourly forecast data. Please try again.");
    });
}

function displayWeather(data) {
  const tempDivInfo = document.getElementById("temp-div");
  const weatherInfoDiv = document.getElementById("weather-info");
  const weatherIcon = document.getElementById("weather-icon");

  // Clear previous content
  weatherInfoDiv.innerHTML = "";
  tempDivInfo.innerHTML = "";

  if (data.cod === "404") {
    weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
  } else {
    const tempKelvin = data.main.temp;
    const tempCelsius = Math.round(tempKelvin - 273.15);
    const tempFahrenheit = Math.round(((tempKelvin - 273.15) * 9) / 5 + 32);
    const cityName = data.name;
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    // Store temperature data
    currentTemperatureData = {
      cityName: cityName,
      description: description,
      iconUrl: iconUrl,
      tempCelsius: tempCelsius,
      tempFahrenheit: tempFahrenheit,
    };

    // Update weather info
    const weatherHtml = `<p>${cityName}</p><p>${description}</p>`;
    weatherInfoDiv.innerHTML = weatherHtml;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;

    // Update temperatures
    updateTemperatures();

    showImage();
  }
}

function displayHourlyForecast(hourlyData) {
  const next24Hours = hourlyData.slice(0, 8); // Next 24 hours (3-hour intervals)
  hourlyTemperatureData = []; // Reset

  next24Hours.forEach((item) => {
    const dateTime = new Date(item.dt * 1000);
    const hour = dateTime.getHours();
    const tempKelvin = item.main.temp;
    const tempCelsius = Math.round(tempKelvin - 273.15);
    const tempFahrenheit = Math.round(((tempKelvin - 273.15) * 9) / 5 + 32);
    const iconCode = item.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    // Store data
    hourlyTemperatureData.push({
      hour: hour,
      tempCelsius: tempCelsius,
      tempFahrenheit: tempFahrenheit,
      iconUrl: iconUrl,
    });
  });

  // Render the hourly forecast
  renderHourlyForecast();
}

function renderHourlyForecast() {
  const hourlyForecastDiv = document.getElementById("hourly-forecast");
  hourlyForecastDiv.innerHTML = ""; // Clear previous content

  hourlyTemperatureData.forEach((item) => {
    const temperature =
      currentUnit === "C" ? item.tempCelsius : item.tempFahrenheit;
    const unitSymbol = currentUnit === "C" ? "°C" : "°F";

    const hourlyItemHtml = `
      <div class="hourly-item">
        <span>${item.hour}:00</span>
        <img src="${item.iconUrl}" alt="Hourly Weather Icon">
        <span>${temperature}${unitSymbol}</span>
      </div>
    `;

    // Append the hourly item to the forecast div
    hourlyForecastDiv.innerHTML += hourlyItemHtml;
  });
}

function updateTemperatures() {
  // Update main temperature
  const tempDivInfo = document.getElementById("temp-div");

  if (
    currentTemperatureData &&
    currentTemperatureData.tempCelsius !== undefined
  ) {
    const temperature =
      currentUnit === "C"
        ? currentTemperatureData.tempCelsius
        : currentTemperatureData.tempFahrenheit;
    const unitSymbol = currentUnit === "C" ? "°C" : "°F";

    const temperatureHTML = `<p>${temperature}${unitSymbol}</p>`;
    tempDivInfo.innerHTML = temperatureHTML;
  }

  // Update hourly forecast
  renderHourlyForecast();
}

function toggleUnit() {
  currentUnit = currentUnit === "C" ? "F" : "C";
  document.getElementById("unit-toggle").textContent =
    currentUnit === "C" ? "°F" : "°C";

  // Update the displayed temperatures
  updateTemperatures();
}

function showImage() {
  const weatherIcon = document.getElementById("weather-icon");
  weatherIcon.style.display = "block";
}
