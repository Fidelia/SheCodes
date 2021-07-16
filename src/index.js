//TIME AND DATE

let h3 = document.querySelector("h3");
let time = new Date();
let currentDate = time.getDate();
let currentYear = time.getFullYear();
let hours = time.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = time.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
let currentDay = days[time.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let currentMonth = months[time.getMonth()];

h3.innerHTML = `${currentDay}, ${currentDate} ${currentMonth} ${currentYear} ${hours}:${minutes}`;

//forecast

function displayForecast(response) {
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["mon", "tue", "wed"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
          <div class="col-2">
            <div class="card">
              <div class="card-body" style="font-size: 15px">
                ${day}<br />
                <img
                  src="http://openweathermap.org/img/wn/10d@2x.png"
                  alt=""
                  id="mon"
                />
                <span class="temp-max">26°</span>
                <span class="temp-min">18°</span>
              </div>
            </div>
          </div>
        <br/>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

//SEARCH CITY

function getForecast(coordinates) {
  let apiKey = "42d452330bfdae27782fbf2b6fe4218a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemp(response) {
  console.log(response.data);

  celciusTemp = response.data.main.temp;

  let temp = Math.round(celciusTemp);
  let cityTemperature = document.querySelector("#temperature");
  cityTemperature.innerHTML = `${temp}`;
  let h4 = document.querySelector("h4");
  h4.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}
//form
function search() {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  console.log(searchInput.value);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

//conversion
function showFahrenheitTemp(event) {
  event.preventDefault();
  let cityTemperature = document.querySelector("#temperature");
  let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
  cityTemperature.innerHTML = Math.round(fahrenheitTemp);
}
function showCelciusTemp(event) {
  event.preventDefault();
  let cityTemperature = document.querySelector("#temperature");
  cityTemperature.innerHTML = Math.round(celciusTemp);
}
let celciusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", showCelciusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);
