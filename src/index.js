//TIME AND DATE

let h3 = document.querySelector("h3");
let time = new Date();
let currentDate = time.getDate();
let currentYear = time.getFullYear();
let hours = time.getHours();
let minutes = time.getMinutes();
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

h3.innerHTML = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear} ${hours}:${minutes}`;

//SEARCH CITY

function showTemp(response) {
  console.log(response.data);
  let temp = Math.round(response.data.main.temp);
  let cityTemperature = document.querySelector("#temperature");
  cityTemperature.innerHTML = `${temp}°C|°F`;
}
//form
function search() {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  console.log(searchInput.value);
  let h1 = document.querySelector("h1");
  h1.innerHTML = respone.data.weather[0].description;
  let apiKey = "42d452330bfdae27782fbf2b6fe4218a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
