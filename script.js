document.addEventListener("DOMContentLoaded", function(){
const apiKey = "9968025b614fb3b8cb40954de8d356b1";

// Global Variables
var sumbitButton = document.getElementById('sumbitBtn');
console.log("Button Element:", document.getElementById('submitBtn'));
let currentCondition;
let cityName;
let currentIcon;
let currentDate;
let currentIconUrl;
let currentWindSpeed;
let currentHumidity;
let currentTemp;


// // function to format date
// const formatDate = function(date) {
//     return dayjs(date).format("MM/DD/YYYY");
// };


// function to get weather by city
const getCoordinates = function() {
    const searchCities = document.querySelector('#search-bar').value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCities}&appid=${apiKey}`)
    .then(function (response) {
       return response.json();
    })
    .then(function (data) {
        console.log(data);
        console.log(data.coord.lat, data.coord.lon);
        const cityLat = data.coord.lat;
        const cityLon = data.coord.lon;
        weatherCondition(cityLat, cityLon);
    })
    .catch(function (error) {
        console.error('error featching weather data:', error);
    });
};

    const weatherCondition = function(cityLat, cityLon) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}&units=imperial`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            currentIcon = data.list[0].weather[0].icon;
            currentIconUrl =`http://openweathermap.org/img/wn/${currentIcon}.png`
            currentDate = dayjs().format("MM/DD/YYYY");
            cityName = data.city.name;
            currentTemp = data.list[0].main.temp;
            currentCondition = data.list[0].weather[0].description;
            currentWindSpeed = data.list[0].wind.speed;
            currentHumidity = data.list[0].main.humidity;
            console.log(data.list[0].main.humidity);
            displayWeather(cityName, currentTemp, currentWindSpeed, currentHumidity);
        });
    };

    const displayWeather = function(cityName, currentTemp, currentWindSpeed, currentHumidity) {
        document.querySelector('currentIcon').setAttribute('src', currentIconUrl);
        document.getElementById('currentIcon').setAttribute('style', 'width: 10rem; height: 10rem')
        document.querySelector('cityName').textContent = "Current City:" + cityName;
        document.querySelector('currentDate').textContent = "Today's Date:" + currentDate;
        document.querySelector('currentCondition').textContent = "Current Condition:" + currentCondition;
        document.querySelector('currentTemp').textContent = "The Current Temp Is:" + currentTemp + "Degrees";
        document.querySelector('currentWind').textContent = "Wind Speed Is:" + currentWindSpeed + "MPH";
        document.querySelector('currentHumidity').textContent = "Humidity: " + currentHumidity + "percent";
    }

sumbitButton.addEventListener("click", function(){
    getCoordinates();
});

});