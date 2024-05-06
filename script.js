const searchButton = document.getElementById('search');
const locationInput = document.getElementById('location');
const weatherInfo = document.getElementById('weather-info');

// Add an event listener to the search button
searchButton.addEventListener('click', () => {
  weatherSearch();
});

// Add an event listener to the document for keydown event
document.addEventListener("keydown", function (event) {
  // Check if the key pressed is Enter
  if (event.key === "Enter") {
    weatherSearch();
  }
});

// Function to handle weather search
async function weatherSearch() {
  const location = locationInput.value;
  if (location.trim() !== '') {
    getWeatherData(location);
  } else {
    alert('Please enter a location');
  }
}

async function getWeatherData(location) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=108dd9a67c96f23039937fe6f3c91963`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    const data = await response.json();
    displayWeatherData(data);
  } catch (error) {
    console.error(error);
    alert('Failed to fetch weather data. Please try again later.');
  }
}

function displayWeatherData(data) {
  const cityName = data.name;
  const temperature = data.main.temp;
  const description = data.weather[0].description;

  const weatherHTML = `
    <h2>${cityName}</h2>
    <p>Temperature: ${temperature}°C</p>
    <p>Description: ${description}</p>
    <p>Wind: ${data.wind.speed} M/S</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Pressure: ${data.main.pressure} hPa</p>
    <p>Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
    <p>Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
    <p>Cloudiness: ${data.clouds.all}%</p>
    
  `;

  weatherInfo.innerHTML = weatherHTML;
}
