const apiKey = "9968025b614fb3b8cb40954de8d356b1";

// Global Variables
const sumbitButton = document.getElementById('sumbit-button');
const getCoordinates = function() {
    const searchCities = document.querySelector('#search-bar').value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCities}&appid=${apiKey}`)
    .then(function (response) {
        console.log(response.JSON);
    });
};

sumbitButton.addEventListener("click", getCoordinates);