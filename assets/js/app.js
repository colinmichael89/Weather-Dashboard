// 1) Page loads with data based on users location
// 2) Button click event listener (id)
// 3) Use id to fetch api root with query selctector -ex: http://google.com/{id}
// 4)

// Define variables

const submitButton = document.querySelector(".submit");
const apiRoot = "https://";
const currentCity = document.querySelector(".current-city");
const currentDate = document.querySelector(".current-date");
const currentIcon = document.querySelector(".current-weather-icon");
const currentTemp = document.querySelector("current-temp");
const currentWind = document.querySelector("current-wind");
const currentHumidity = document.querySelector("current-humidity");
const currentUvIndex = document.querySelector("current-uv-index");

// Functions
function searchApi(event) {
  const cityId = "get id from data- of button pressed";
  const searchUrl = apiRoot + `/${cityId}`;
  fetch(searchUrl) // default method = GET
    .then((response) => response.json())
    .then((data) => {
      // Create <li> in .previous-searches <ul>
      // Searched City is button w/ stored (local, array) Api data that updates page when clicked
      // Simultaneously
      // Populate .current-forecast container:
      // .searched location = (City), (mm/dd/yyy), (Current Weather Icon)
      // .temp = current temp in Farenheit
      // .wind = wind mph
      // .humidity = %
      // .uv-index = x.xx - colored box/icon based on api
      // Simultaneously
      // Populate each individual forecast container:
      // Date, icon, temp, wind, humidity
    });
  console.log("Clicked!");
  return;
}

// special functions - event listeners

// logic // callbacks
