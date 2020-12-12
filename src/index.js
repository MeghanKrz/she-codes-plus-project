let now = new Date();
let h1 = document.querySelector("h1");
let date = now.getDate();
let year = now.getFullYear();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let month = months[now.getMonth()];

h1.innerHTML = `<small>${day}, ${month} ${date}, ${year} ${hours}:${minutes}</small>`;

function showTemperature(response) {
  console.log(response.data);
  celsiusTemperature = Math.round(response.data.main.temp);
  let celsiusTemperatureHigh = Math.round(response.data.main.temp_max);
  let celsiusTemperatureLow = Math.round(response.data.main.temp_min);
  document.querySelector(
    "#city"
  ).innerHTML = `<strong>${response.data.name}</strong>`;
  document.querySelector(
    "#current-forecast"
  ).innerHTML = `<strong>${response.data.weather[0].description}</strong>`;
  document.querySelector("#temperature").innerHTML = `${celsiusTemperature}°C`;
  document.querySelector(
    "#high-low"
  ).innerHTML = `H: ${celsiusTemperatureHigh}° | L: ${celsiusTemperatureLow}°`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#current-icon")
    .setAttribute("src", `images/${response.data.weather[0].icon}.png`);
}
let form = document.querySelector("#search-engine");
form.addEventListener("submit", search);

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 6; index <= 39; index += 8) {
    forecast = response.data.list[index];
    let forecastDay = new Date(forecast.dt * 1000);
    forecastElement.innerHTML += `<div class="col-sm">
          <h4 id="second-day">${days[forecastDay.getDay()]}</h4>
          <img src="images/${
            forecast.weather[0].icon
          }.png" alt="Rainy Weather" id="second-day-icon" />
          <h5>H: ${Math.round(forecast.main.temp_max)}˚| L: ${Math.round(
      forecast.main.temp_min
    )}˚</h5>
        </div>
        </div>`;
  }
}

function searchCity(city) {
  let apiKey = "a8a1818007f030896cae1dd1219319f0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#form-control").value;
  searchCity(city);
}

function celsius(event) {
  event.preventDefault();
  let temperature = Math.round(celsiusTemperature);
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = `${temperature}˚C`;
}

function fahrenheit(event) {
  event.preventDefault();
  let temperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  let newTemperature = document.querySelector("#temperature");
  newTemperature.innerHTML = `${temperature}˚F`;
}

let celsiusUpdate = document.querySelector("#celsius-link");
let fahrenheitUpdate = document.querySelector("#fahrenheit-link");

celsiusUpdate.addEventListener("click", celsius);
fahrenheitUpdate.addEventListener("click", fahrenheit);

function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "a8a1818007f030896cae1dd1219319f0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", getCurrentLocation);

let celsiusTemperature = 0;
searchCity("Toronto");
