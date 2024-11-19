// Get references to elements
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');

// API key
const apiKey = '47b33f3554d6b24ad99d3fea71ff762e'; 

// Event listener for search button
searchBtn.addEventListener('click', function() {
  const city = cityInput.value.trim();
  
  if (city) {
    fetchWeatherData(city);
  } else {
    alert("Please enter a city name.");
  }
});

// Function to fetch weather data from OpenWeatherMap API
async function fetchWeatherData(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    // Fetch the data from OpenWeatherMap API
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found or invalid API key.");

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    weatherInfo.innerHTML = `<p class="error">${error.message}</p>`;
  }
}

// Function to display weather information
function displayWeather(data) {
  const { name, main, weather, wind } = data;

  const weatherDescription = weather[0].description;
  const temp = main.temp;
  const humidity = main.humidity;
  const windSpeed = wind.speed;
  const pressure = main.pressure;

  // Generate the icon URL
  const iconCode = weather[0].icon; // Get the icon code from the API response
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`; // Generate the icon URL

  // Set the background based on weather condition
  document.body.className = weather[0].main.toLowerCase();

  // Display the weather information
  weatherInfo.innerHTML = `
    <h2>Weather in ${name}</h2>
    <p class="temp">${temp}°C</p>
    <p class="description">${weatherDescription}</p>
    <img src="${iconUrl}" alt="${weatherDescription} icon">
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${windSpeed} m/s</p>
    <p>Pressure: ${pressure} hPa</p>
  `;
}
