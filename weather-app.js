const apiKey = "/*Get Your own generated API from below link and Paste HERE!!!*/";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

const cityName = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else{

        var data = await response.json();

        cityName.textContent = data.name;
        temperature.textContent = Math.round(data.main.temp) + "°C";
        humidity.textContent = data.main.humidity + "%";
        wind.textContent = data.wind.speed + " km/h";

        if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "https://i.imgur.com/Whbmdgw.png";
        } else if (data.weather[0].main === "Clear") {
            weatherIcon.src = "https://i.imgur.com/lQBgBpA.png";
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "https://i.imgur.com/7B8ZajJ.png";
        } else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "https://i.imgur.com/Pxb5EsI.png";
        } else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "https://i.imgur.com/M4tnebJ.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

    }

    
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
