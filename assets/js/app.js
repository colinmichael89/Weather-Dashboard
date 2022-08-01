// Define Variables
const APIRoot = "https://api.openweathermap.org/data/2.5/weather";
const APIKey = "8a1b9ee606209a0862fbdcd28f56a206";
// const iconImage = "https://openweathermap.org/img/w/" + icon + ".png";

// Query Selectors
const searchedCity = document.querySelector(".form-input");
const submitButton = document.querySelector(".submit");
const currentCity = document.querySelector("#current-city");
const currentDate = document.querySelector(".current-date");
const currentIcon = document.querySelector("#current-weather-icon");
const currentTemp = document.querySelector("#current-temp");
const currentWind = document.querySelector("#current-wind");
const currentHumidity = document.querySelector("#current-humidity");
const currentUvIndex = document.querySelector("#current-uv-index");
const forecastInfo = document.querySelector("#forecast-data");

// Functions
function currentWeatherApi() {
  let city = searchedCity.value.trim();
  var cityQueryUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey +
    "&units=imperial";

  fetch(cityQueryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      const currentWeather = data;
      // Create <li> in .previous-searches <ul>
      // Searched City is button w/ stored (local, array) Api data that updates page when clicked

      // math.round() below..
      currentCity.textContent = currentWeather.name;
      // currentDate.textContent = moment().format("MMMM Do YYYY");
      // currentCity.iconImage = currentWeather.weather[0];
      currentTemp.textContent = currentWeather.main.temp + " F";
      currentWind.textContent = currentWeather.wind.speed + " MPH";
      currentHumidity.textContent = currentWeather.main.humidity + " %";
      currentUvIndex.textContent = currentWeather.main.temp;
    });
}

function forecastApi() {
  let city = searchedCity.value.trim();
  var forecastQueryUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    APIKey +
    "&units=imperial";

  fetch(forecastQueryUrl)
    .then(function (response) {
      return response.json();
    })
    // Need to tell it what info to grab as it loops through data.. Date, icon, temp, wind, humidity
    // Can I just poplulate forecast containers with the info without individual divs?? Do I need another forLoop to populate containers or do I assign different ids to each container based on index [0 - 4]?????????!!!!!!!!!!
    .then(function (data) {
      console.log(data);
      for (let index = 0; index < 5; index++) {
        const forecast = data[index];
        forecastInfo.textContent = forecast;
      }
    });
}

// Special Functions - Event Listeners
submitButton.addEventListener(`click`, () => {
  currentWeatherApi();
  forecastApi();
});
// Logic // Callback
