// Define Variables
const APIRoot = "https://api.openweathermap.org/data/2.5/weather";
const APIKey = "8a1b9ee606209a0862fbdcd28f56a206";
// const iconImage = "https://openweathermap.org/img/w/" + icon + ".png";

// Query Selectors
const searchedCity = document.querySelector(".form-input");
const submitButton = document.querySelector(".submit");
const currentCity = document.querySelector("#current-city");
const currentDate = document.querySelector("#current-date");
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
      var iconImg = currentWeather.weather[0].icon;
      Image = "http://openweathermap.org/img/wn/" + iconImg + "@2x.png";
      // Create <li> in .previous-searches <ul>
      // Searched City is button w/ stored (local, array) Api data that updates page when clicked
      //   var cities = document.querySelector(".previous-searches");
      //   function searchHistory() {
      //     for (var i = 0; i < searchArray.length; index++) {
      //       const searchedCity = searchArray[i];

      //       var searchList = document.createElement(`li`);
      //       searchList.setAttribute(`class`, `list-item`);
      //       searchList.textContent = searchedCity.value.trim();
      //       cities.appendChild(searchList);

      //       forecastContainer.appendChild(card);
      //     }
      //   }

      currentCity.textContent = currentWeather.name + "  ";
      currentDate.textContent =
        moment.unix(data.dt).format("MM-DD-YYYY") + "  ";
      currentCity.iconImage = currentWeather.weather[0].icon;
      currentTemp.textContent = Math.round(currentWeather.main.temp) + " F";
      currentWind.textContent = currentWeather.wind.speed + " MPH";
      currentHumidity.textContent = currentWeather.main.humidity + " %";
      currentUvIndex.textContent = currentWeather.main.temp;
      currentIcon.Image = iconCurrent;
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
    // Need to tell it what info to grab as it loops through data.. Date, icon, temp, wind, humidity
    // Can I just poplulate forecast containers with the info without individual divs?? Do I need another forLoop to populate containers or do I assign different ids to each container based on index [0 - 4]?????????!!!!!!!!!!
    .then(function (data) {
      console.log(data);
      displayForecast(data);
    });
}

var forecastContainer = document.querySelector(".forecast-container");
function displayForecast(data) {
  // Can I change the index to get the correct daily forecast data? ie i + 10 or something
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

    var icon = document.createElement(`a`);
    icon.setAttribute(`class`, `icon`);
    // Wrong
    icon.innerHTML = data.list[i].weather[0].icon;
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

submitButton.addEventListener(`click`, () => {
  currentWeatherApi();
  forecastApi();
  // handleSearchFormSubmit();
  //   searchHistory();
});
