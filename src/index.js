// import "./src/styles.css";

function formatDateTime(Chosenday) {
  const weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  let day = weekday[Chosenday.getDay()];

  return `${day} ${Chosenday.getHours()}:${Chosenday.getMinutes()}`;
}

let curTime = formatDateTime(new Date());
let time = document.querySelector(".time");
time.innerHTML = curTime;

function formatDate(Chosenday) {
  const months = new Array(12);
  months[0] = "1";
  months[1] = "2";
  months[2] = "3";
  months[3] = "4";
  months[4] = "5";
  months[5] = "6";
  months[6] = "7";
  months[7] = "8";
  months[8] = "9";
  months[9] = "10";
  months[10] = "11";
  months[11] = "12";

  let month = months[Chosenday.getMonth()];

  return `${month}/${Chosenday.getDate()}/${Chosenday.getFullYear()}`;
}

let curDate = document.querySelector(".date");
curDate.innerHTML = formatDate(new Date());

let city_input = document.querySelector(".city-input");
let city_header = document.querySelector(".header h2");
let input = document.querySelector("#searchCity");
let apiKey = "7ae73a0fdb9a246291b5e3911d1cd392";

function search(searchCity) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&appid=${apiKey}`;
    axios.get(url).then(temperature);
}

city_input.addEventListener("submit", function (e) {
  e.preventDefault();
  search(document.getElementById("searchCity").value);  
});

let city = document.querySelector(".header h2");
let btn_search = document.querySelector(".btn-search");


function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
      
        <img
        src="https://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        alt=""
        width="42">
        <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max">
                ${Math.round(forecastDay.temp.max)}° </span>
                <span class="weather-forecast-temperature-min">
                ${Math.round(forecastDay.temp.min)}° </span>
        </div>
    </div>
              
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "37841618efb8bb96a35c1afb0bcd8e2f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperture = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperture);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "37841618efb8bb96a35c1afb0bcd8e2f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("New York");
