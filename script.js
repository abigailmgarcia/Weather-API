document.addEventListener("DOMContentLoaded", function(){
const apiKey = "9968025b614fb3b8cb40954de8d356b1";

// Global Variables
var sumbitButton = document.getElementById('sumbitBtn');
console.log("Button Element:", document.getElementById('submitBtn'));
const currentCondition;
const cityName;
const currentIcon;
const currentDate;
const currentIconUrl;
const currentWindSpeed;
const currentHumidity;
const currentTemp;


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
            const currentDate = dayjs().format("MM/DD/YYYY");
            const cityName = data.city.name;
            const currentTemp = data.list[0].main.temp;
            const currentCondition =data.list[0].weather[0].description;
            const currentWindSpeed = data.list[0].wind.speed;
            const currentHumidity = data.list[0].main.humidity;
            console.log(data.list[0].main.humidity);
            displayWeather(cityName, currentTemp, currentWindSpeed, currentHumidity);
        });
    };

sumbitButton.addEventListener("click", function(){
    getCoordinates();
});

});