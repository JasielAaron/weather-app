const citylist = JSON.parse(localStorage.getItem("search-history")) || {};
const currentSection = document.getElementById("current");
const submitButton = document.getElementById('submit-btn');

submitButton.addEventListener('click', function (event) {
  event.preventDefault();
  const city = document.getElementById('cityname').value.trim();

  if (city) {
    // Add city to list if not already present
    if (!citylist[city]) {
      citylist[city] = city;
      localStorage.setItem("search-history", JSON.stringify(citylist));
      makeButtons();
    }

    // Fetch weather data
    getCurrentWeather(city);
    getFiveday(city);
  } else {
    alert('Please enter a city name.');
  }
});

const apiKey = "c5d5bd29e5a676607bc7d035896618eb"; // Your API key

function getFiveday(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
  
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('City not found');
      return response.json();
    })
    .then(data => {
      const forecastSec = document.getElementById('forecast');
      forecastSec.innerHTML = '<h2>5 Day Forecast: </h2>';
      
      for (let i = 0; i < data.list.length; i += 8) {
        const dayData = data.list[i];
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecastitem';
        forecastItem.innerHTML = `
          <h3>${new Date(dayData.dt_txt).toDateString()}</h3>
          <p>Temp: ${dayData.main.temp}°F</p>
          <p>Humidity: ${dayData.main.humidity}%</p>
          <p>Wind Speed: ${dayData.wind.speed} m/s</p>
        `;
        forecastSec.appendChild(forecastItem);
      }
    })
    .catch(error => {
      alert(error.message);
    });
}

function getCurrentWeather(cityName) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
  
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('City not found');
      return response.json();
    })
    .then(data => {
      const current = document.getElementById('current');
      current.innerHTML = `
        <h2>${data.name}</h2>
        <p>Temperature: ${data.main.temp}°F</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
      `;
    })
    .catch(error => {
      alert(error.message);
    });
}

function makeButtons() {
  const searchHistory = document.getElementById("searchhistory");
  searchHistory.innerHTML = ''; // Clear previous buttons
  
  for (const key in citylist) {
    const button = document.createElement('button');
    button.className = 'button-history';
    button.textContent = citylist[key];
    button.addEventListener('click', () => {
      getCurrentWeather(key);
      getFiveday(key);
    });
    searchHistory.appendChild(button);
  }
}

// Initialize buttons on page load
makeButtons();



