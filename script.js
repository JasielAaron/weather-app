
var citylist = {};
var currentSection = document.getElementById("current")
document.getElementById('submit-btn').addEventListener('click', function (event) {
  event.preventDefault();
  var city = document.getElementById('cityname').value;

  citylist[city] = city;

//this will save to local storage 
  localStorage.setItem("search-history", JSON.stringify(citylist));

  //to execute my fuctions
  getCurrentWeather(city)
  getFiveday(city);
  makeButtons();
  

});
var weatherURL
var apiKey = "c5d5bd29e5a676607bc7d035896618eb" //my api key

// function is grabbing the 5 day forecast every 8th line I get a new day so its a new day, then I created a few elements to display my actual data.
function getFiveday(city) {

  var url = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=imperial";
  fetch(url)
    .then(function (response) {
      return response.json()
    }).then(function (data) {
      var forecastSec = document.getElementById('forecast');
      forecastSec.innerHTML = '<h2>5 Day Forecast: </h2>';
      for (var i = 0; i < data.list.length; i += 8) {
        var dayData = data.list[i];
        var forecastItem = document.createElement('div');
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


}
// this here is just grabbing the current weather of the city the user enters. created a few elements to display my data on my page since on my HTML I only have divs.
function getCurrentWeather(cityName) {
  var url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=imperial";
  fetch(url)
    .then(function (response) {
      return response.json()
    }).then(function (data) {
      var current = document.getElementById('current');
      current.innerHTML = `
 <h2>${data.name}</h2>
 <p>Temperature: ${data.main.temp}°F</p>
 <p>Humidity: ${data.main.humidity}%</p>
 <p>Wind Speed: ${data.wind.speed} m/s</p>
`;


    })
}




function makeButtons() {
  citylist = JSON.parse(localStorage.getItem("search-history"));
  $("#searchhistory").html('');
  for (var key in citylist) {
    var button = document.createElement('button');
    $('#searchhistory').append(button);
    button.textContent = citylist[key];
  }
}



