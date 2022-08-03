// Define Variables
const APIRoot = "https://api.openweathermap.org/data/2.5/weather";
const APIKey = "8a1b9ee606209a0862fbdcd28f56a206";
// Arrays
var searchArray = [];
var savedCities = [];

var localstorageArray = JSON.parse(localStorage.getItem("searchArray"));

function searchHistory() {
  var localstorageArray = JSON.parse(localStorage.getItem("searchArray"));
  var searchContainer = document.querySelector(".search-container");
  var cities = document.querySelector(".previous-searches");
  var searchList = document.createElement("li");
  var citySearch = searchArray.pop();
  console.log(citySearch);
  var listBtn = document.createElement("button");
  listBtn.value = localstorageArray;
  searchList.setAttribute(`class`, `list-item`);
  searchList.textContent = citySearch;
  cities.appendChild(searchList);
  searchContainer.appendChild(cities);
}
// function searchHistory() {
//   var searchContainer = document.querySelector(".search-container");
//   var cities = document.querySelector(".previous-searches");
//   // for (var i = 0; i < searchArray.length; i++) {
//   //   var citySearch = searchArray[i];
//   //   console.log(citySearch);
//   var searchList = document.createElement("li");
//   searchList.textContent = citySearch;
//   searchList.setAttribute(`class`, `list-item`);

//   cities.appendChild(searchList);

//   searchContainer.appendChild(cities);
// }
// Query Selectors
const searchedCity = document.querySelector(".form-input");
const submitButton = document.querySelector(".submit");
const currentCity = document.querySelector("#current-city");
const currentDate = document.querySelector("#current-date");
const currentIcon = document.querySelector(".current-weather-icon");
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

  localStorage.setItem("searchArray", JSON.stringify(searchArray));
  var search = searchedCity.value;
  searchArray.push(search);

  fetch(cityQueryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      const currentWeather = data;
      var iconImg = currentWeather.weather[0].icon;
      iconImgsrc = "http://openweathermap.org/img/wn/" + iconImg + "@2x.png";
      console.log(iconImgsrc);

      currentCity.textContent = currentWeather.name + "  ";
      currentDate.textContent =
        moment.unix(data.dt).format("MM-DD-YYYY") + "  ";
      currentTemp.textContent = Math.round(currentWeather.main.temp) + " F";
      currentWind.textContent = currentWeather.wind.speed + " MPH";
      currentHumidity.textContent = currentWeather.main.humidity + " %";
      currentUvIndex.textContent = currentWeather.main.temp;
      currentIcon.src = iconImgsrc;
    });
}

function forecastApi() {
  let city = searchedCity.value.trim();
  var forecastQueryUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=imperial&appid=" +
    APIKey;

  fetch(forecastQueryUrl)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      console.log(data);
      displayForecast(data);
    });
}

var forecastContainer = document.querySelector(".forecast-container");
function displayForecast(data) {
  for (var i = 0; i < 40; i += 8) {
    console.log(i);
    var card = document.createElement("div");
    card.setAttribute(`class`, `card no-border day`);
    card.setAttribute(`id`, `forecast-data`);

    var date = document.createElement(`h6`);
    date.setAttribute(`class`, `date`);
    date.textContent = moment(data.list[i].dt_txt.slice(0, 10)).format(
      "MM-DD-YYYY"
    );
    card.appendChild(date);

    var icon = document.createElement(`img`);
    icon.setAttribute(`class`, `icon`, "src", ``);
    var iconImg = data.list[i].weather[0].icon;
    icon.src = "http://openweathermap.org/img/wn/" + iconImg + "@2x.png";
    icon.innerHTML = icon.src;
    card.appendChild(icon);

    var temp = document.createElement(`h6`);
    temp.setAttribute(`class`, `temp`);
    temp.textContent = "Temp: " + Math.round(data.list[i].main.temp) + " F";
    card.appendChild(temp);

    var wind = document.createElement(`h6`);
    wind.setAttribute(`class`, `wind`);
    wind.textContent = "Wind: " + data.list[i].wind.speed + " MPH";
    card.appendChild(wind);

    var humidity = document.createElement(`h6`);
    humidity.setAttribute(`class`, `humidity`);
    humidity.textContent = "Humidity: " + data.list[i].main.humidity + " %";
    card.appendChild(humidity);

    forecastContainer.appendChild(card);
  }
}

// Special Functions - Event Listeners
function clearSearch() {
  forecastContainer.innerHTML = "";
}

submitButton.addEventListener(`click`, () => {
  currentWeatherApi();
  forecastApi();
  clearSearch();
  searchHistory();
  // renderLocalstorage();
  // searchHistory();
});
