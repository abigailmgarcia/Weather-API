document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "9968025b614fb3b8cb40954de8d356b1";
console.log("API key:", apiKey);
    // Global Variables
    var sumbitButton = document.getElementById('sumbitBtn');
    // console.log("Button Element:", document.getElementById('submitBtn'));
    let currentCondition;
    let cityName;
    let currentIcon;
    let currentDate;
    let currentIconUrl;
    let currentWindSpeed;
    let currentHumidity;
    let currentTemp;

    //container for search history
    const searchHistoryContainer = document.querySelector('#searchHisContainer');
    let searchHistory = [];

    // function to format date
    const formatDate = function(date) {
        return dayjs(date).format("MM/DD/YYYY");
    };


    // function to get weather by city
    const getCoordinates = function () {
        const searchCities = document.querySelector('#search-bar').value;
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCities}&appid=${apiKey}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                //process data
                console.log(data);
                let cityLat = data.coord.lat;
                let cityLon = data.coord.lon;

                let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

                // Add the searched city to search history
                let searchCity = document.querySelector('#search-bar').value;
                searchHistory.push(searchCity);
    
                // Save the updated search history to local storage
                localStorage.setItem('searchHistory', JSON.stringify(searchHistory));



                const searchHistoryBtn = document.createElement('button');
                searchHistoryBtn.setAttribute('class', 'btn btn-secondary mt-3 col-12 mx-auto');
                searchHistoryBtn.textContent = searchCities;
                searchHistoryBtn.addEventListener('click', function () {
                    weatherCondition(cityLat, cityLon);
                });
                searchHistoryContainer.appendChild(searchHistoryBtn);

                // add searched city to search history
                searchHistory.push(searchCities);

                weatherCondition(cityLat, cityLon);
            })
            .catch(function (error) {
                console.error('error featching weather data:', error);
            });
    };

    const weatherCondition = function (cityLat, cityLon) {
        let forecastContainer = document.getElementById('forecastContainer');
        forecastContainer.innerHTML = '';

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}&units=imperial`)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                // currentIcon = data.list[0].weather[0].icon;
                currentIconUrl = `http://openweathermap.org/img/wn/${currentIcon}.png`
                currentDate = dayjs().format("MM/DD/YYYY");
                cityName = data.name;
                currentTemp = data.main.temp;
                currentCondition = data.weather[0].description;
                currentWindSpeed = data.wind.speed;
                currentHumidity = data.main.humidity;
                console.log(data.main.humidity);
                displayWeather(cityName, currentTemp, currentWindSpeed, currentHumidity, currentIconUrl, currentCondition, currentDate);

                //displays 5 day weather 
                for (let i =0; i < data.list.length; i+=8) {
                    let forecastDate = 
                    dayjs(data.list[i].dt_txt).format("MM/DD/YYYY");
                    let forecastCondition = data.list[i].weather[0].description;
                    let forecastTemp = data.list[i].main.temp;
                    let forecastWind = data.list[i].wind.speed;
                    let forecastHumidity = data.list[i].main.humidity;

                    //icon library that displays icon
                    let forecastIcon = data.list[i].weather[0].icon;
                    let forecastIconUrl = `http://openweathermap.org/img/wn/${forecastIcon}.png`

                    //html elements to display
                    let forecastDiv = document.createElement('div');
                    forecastDiv.classList.add('col-sm-1', 'align-items-center','forecast-card', 'card', "bg-primary, mb-3");
                    let forecastDateEl = document.createElement('h5');
                    forecastDateEl.classList.add('mt-3', 'mb-0')
                    forecastDateEl.textContent = forecastDate;

                    let forecastIconEl = document.createElement('img');
                    forecastIconEl.classList.add('w-25');
                    forecastIconEl.setAttribute('src', forecastIconUrl);

                    let forecastConditionEl = document.createElement('p');
                    forecastConditionEl.classList.add('text-capitalize');
                    forecastConditionEl.textContent = forecastCondition;

                    let forecastTempEl = document.createElement('p');
                    forecastTempEl.textContent = `Temp: ${forecastTemp}`;

                    let forecastHumidityEl = document.createElement('p');
                    forecastHumidityEl.textContent = `Humidity: ${forecastHumidity}`;

                    let forecastWindEl = document.createElement('p');
                    forecastWindEl.textContent = `Wind: ${forecastWind} MPH`;


                    console.log(data.list);
                    console.log(data);
                    //append elements
                    forecastDiv.appendChild(forecastDateEl);
                    forecastDiv.appendChild(forecastIconEl);
                    forecastDiv.appendChild(forecastConditionEl);
                    forecastDiv.appendChild(forecastTempEl);
                    forecastDiv.appendChild(forecastHumidityEl);
                    forecastDiv.appendChild(forecastWindEl);

                    document.querySelector('forecastContainer').appendChild(forecastDiv);
                }
            })
            .catch(function (error) {
                console.error('error fetching weather data:', error);
            });
    };


    const displayWeather = function (cityName, currentTemp, currentWindSpeed, currentHumidity) {
        document.querySelector('#currentIcon').setAttribute('src', currentIconUrl);
        document.getElementById('currentIcon').setAttribute('style', 'width: 10rem; height: 10rem')
        document.querySelector('#cityName').textContent = "Current City: " + cityName;
        document.querySelector('#currentDate').textContent = "Today's Date: " + currentDate;
        document.querySelector('#currentCondition').textContent = "Current Condition: " + currentCondition;
        document.querySelector('#currentTemp').textContent = "Current Temp: " + currentTemp + " Degrees";
        document.querySelector('#currentWind').textContent = "Wind: " + currentWindSpeed + "MPH";
        document.querySelector('#currentHumidity').textContent = "Humidity " + currentHumidity + "%";
    }

    sumbitButton.addEventListener("click", function () {
        getCoordinates();
    });

});