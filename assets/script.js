const APIkey = '202716cb2315d5e3eb3aefeea981f8da';

const searchCity = $('search-city');
const searchBtn = $('search-btn');
const history = $('history');

let currentCity; 

getWeather = (data) => {
    let requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${APIkey}`
    fetch(requestUrl)
    .then((response) => {
        return response.json();
        console.log(data);
    })
    .then((data) => {
        
        let  weatherConditions = $('weather-conditons');
        
        let cityName = $('<h2>');
        cityName.text(currentCity);
        weatherConditions.append(cityName);

        let cityDate = data.current.dt;
        cityDate = moment.unix(cityDate).format('MM/DD/YYYY');
        let cityDateEl = ('<span>');
        cityDate.text(` (${cityDate}) `);
        cityName.append(cityDateEl);

        let cityTemp = data.current.temp;
        let cityTempEl = $('<p>')
        cityTempEl.text(`Temp : ${cityTemp} `)
        weatherConditions.append(cityTempEl);

        let cityWind = data.current.wind_speed;
        let cityWindEl = $('<p>');
        cityWindEl.text(`Wind: ${cityWind} `);
        weatherConditions.append(cityWindEl);

        let cityHumidity = data.current.humidity;
        let cityHumidityEl = $('<p>');
        cityHumidityEl.text(`Humidity ${cityHumidity} `);
        weatherConditions.append(cityHumidityEl);

        let cityUV = data.current.uvi;
        let cityUVEl = $('<p>');
        cityUVEl.text(`UV: ${cityUV} `);
        weatherConditions.append(cityUVEl);

        let forecast = $('#forecast');

        for (let i = 1; i <= 5; i++) {
            let date;
            let temp;
            let wind;
            let humidity;

            date = data.daily[i].dt;
            date = moment.unix(date).format(MM/DD/YYYY);

            temp = data.daily[i].temp.day;
            icon = data.daily[i].weather[0].icon;
            wind = data.daily[i].wind_speed;
            humidity = data.daily[i].humidity;

            let card = document.createElement('div');
            card.classList.add('card', 'col-2', 'm-1', 'bg-primary', 'text-white');

            let ardBody = document.createElement('div');
            cardBody.classList.add('card-body');
            cardBody.innerHTML = `<h6>${date}</h6>
                                  <img src= "http://openweathermap.org/img/wn/${icon}.png"> </><br>
                                   ${temp}°C<br>
                                   ${wind} KPH <br>
                                   ${humidity}%`
            
            card.appendChild(cardBody);
            fiveDayForecastEl.append(card);
        }
    })
return;
}

displayHistory = () => {
    let storedCities = JSON.parse(localStorage.getItem("cities")) || [];
    history.innerHTML ='';
    for (i = 0; i < storedCities.length; i++) {
        history.text = `${storedCities[i].city}`;
    }
}

getCoordinates = () => {
    let requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${APIkey}`;
    let storedCities = JSON.parse(localStorage.getItem('cities')) || [];

    fetch(requestUrl)
    .then((response) => {
        return response.json();
        console.log(json());
    })
    .then((data) => {
        let cityInfo = {
            city: currentCity,
            lon: data.coord.lon,
            lat: data.coord.lat
        }
        console.log(data);
        storedCities.push(cityInfo);
        localStorage.setItem("cities", JSON.stringify(storedCities));

        displayHistory();

        return cityInfo;
        console.log(cityInfo);
    })
    .then((data) => {
        getWeather(data);
        console.log(getWeather(data));
    })
    return;
}

handleCityFormSubmit = (event) => {
    event.prevendDefault();
    currentCity = searchCity.val().trim();

    getCoordinates();

    return;
}

displayHistory();

searchBtn.on("click", handleCityFormSubmit);
