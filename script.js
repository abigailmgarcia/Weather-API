document.addEventListener("DOMContentLoaded", function(){
const apiKey = "9968025b614fb3b8cb40954de8d356b1";

// Global Variables
var sumbitButton = document.getElementById('sumbitBtn');
console.log("Button Element:", document.getElementById('submitBtn'));


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
        })
    }

sumbitButton.addEventListener("click", getCoordinates);

});