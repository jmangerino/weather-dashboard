const searchBtn = document.getElementById("search-btn");
const searchHistory = document.getElementById("search-history");
const weatherConditions = document.getElementById("weather-conditions");
const currentTime = document.getElementById("current-time");
const currentTemp = document.getElementById("current-temp");
const currentWind = document.getElementById("current-wind");
const currentHumidity = document.getElementById("current-humidity");
const currentUv = document.getElementById("current-uv");
const fiveDayForecast = document.getElementById("five-day-forecast");
const currentCity = document.getElementById("current-city");


const APIKey ='6aca1949aba8c98489dca983da8d1515'; 

const cityList = [];


const getWeather = (event) => {
    let apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&APPID=" + APIKey;
    fetch(apiURL)
    .then((response) => {
        return response.json();
    })
    .then((respone) => {
        const currentDate = new Date(respone.data.dt * 1000);
        const day= currentDate.getMonth() + 1;
        const month = currentDate.getFullYear();
        currentCity.innerHTML = respone.data.name + " (" + month + "/" + day + "/" + year + ") ";
        currentTemp.innerHTML = respone.data.temp;
        currentHumidity.innerHTML = respone.data.main.humidity;
        currentWind.innerHTML = respone.data.wind.spped;

        let lat = respone.data.coord.lat;
        let lon = respone.dat.coord.lon;
        let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1";
        fetch(UVQueryURL)
        .then((respone) => {
            return respone.json();
        })
        .then((respones) => {
            let currentUv = respone.value;
        });
    })
}



