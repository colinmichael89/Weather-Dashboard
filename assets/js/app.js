// 1) Page loads with data based on users location
// 2) Button click event listener (id)
// 3) Use id to fetch api root with query selctector -ex: http://google.com/{id}
// 4)

// Define Variables
const APIRoot = "https://api.openweathermap.org/data/2.5/weather";
const APIKey = "8a1b9ee606209a0862fbdcd28f56a206";

// Query Selectors
const submitButton = document.querySelector(".submit");
const currentCity = document.querySelector(".current-city");
const currentDate = document.querySelector(".current-date");
const currentIcon = document.querySelector(".current-weather-icon");
const currentTemp = document.querySelector("current-temp");
const currentWind = document.querySelector("current-wind");
const currentHumidity = document.querySelector("current-humidity");
const currentUvIndex = document.querySelector("current-uv-index");

// Functions
function getApi() {
  var queryUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    currentCity +
    "&appid=" +
    APIKey;

  fetch(queryUrl) // default method = GET
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
  //   // Create <li> in .previous-searches <ul>
  //   // Searched City is button w/ stored (local, array) Api data that updates page when clicked
  //   // Simultaneously
  //   // Populate .current-forecast container:
  //   // .searched location = (City), (mm/dd/yyy), (Current Weather Icon)
  //   // .temp = current temp in Farenheit
  //   // .wind = wind mph
  //   // .humidity = %
  //   // .uv-index = x.xx - colored box/icon based on api
  //   // Simultaneously
  //   // Populate each individual forecast container:
  //   // Date, icon, temp, wind, humidity
  // });
  //   console.log("Clicked!");
  //   return;
}

// special functions - event listeners
submitButton.addEventListener(`click`, getApi);
// logic // callbacks
