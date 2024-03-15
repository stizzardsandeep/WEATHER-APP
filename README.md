# Weather-app-01

I have used some images for weather change occurs in report. According to the report the images will be changed as the information gathered from JSON.
Also, I have linked Bootstrap for better page experience.

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather app</title>
    <link rel="stylesheet" href="weather-app.css" />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous" />
</head>
<body>
    <div class="column">
        <div class="row">
            <div class="card">
                <div class="search">
                    <input type="text" placeholder="Enter your City Name..." spellcheck="false">
                    <button><img src= "https://i.imgur.com/YSXvVQ3.png"></button>
                </div>
                <div class="error">
                    <p>Invalid City Name!!</p>
                </div>
                <div class="weather">
                    <img src="https://i.imgur.com/7B8ZajJ.png" class="weather-icon">
                    <h1 class="temp">22°C</h1>
                    <h2 class="city">New York</h2>
                    <div class="details">
                        <div class="col">
                            <img src="https://i.imgur.com/M2KO9rP.png" >
                            <div>
                                <p class="humidity">50<span>%</span></p>
                                <p style="font-size:13px">Humidity</p>
                            </div>
                        </div>
                        <div class="col">
                            <img src="https://i.imgur.com/VJa0sBr.png" >
                            <div>
                                <p class="wind">15 <span>km/h</span></p>
                                <p style="font-size:13px">Wind Speed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
   <script src="weather-app.js"></script>
</body>
</html>

In CSS, I have used the background- images for the web page.

*{
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
    box-sizing: border-box;
}

body{
    background:#222;
    background-image: url("https://i.imgur.com/lQ65yf5.jpg");
    background-size: cover;
}
.card{
    width:90%;
    max-width: 470px;
    background-image: url("https://i.imgur.com/MwMtEYv.jpg");
    background-size: cover;
    color:#fff;
    margin: 100px auto 0;
    border-radius: 20px;
    padding: 40px 35px;
    text-align: center;
}
.search{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.search input{
    border: 0;
    outline:0;
    background: #ebfffc;
    color: #555;
    padding:10px 25px;
    height: 60px;
    border-radius: 30px;
    flex:1;
    margin-right: 16px;
    font-size: 18px;
}
.search button{
    border:0;
    outline:0;
    background: #ebfffc;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    cursor: pointer;
}
.search button img{
    width: 40px;
}
.weather-icon{
    width:170px;
    margin-top: 30px;
}
.weather h1{
    font-size: 80px;
    font-weight: 500;
}

.weather h2{
    font-size: 45px;
    font-weight: 400;
    margin-top: -10px;
}
.details{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    margin-top: 50px;
}
.col{
    display: flex;
    align-items: center;
    text-align: left;
}
.col img{
    width: 80px;
    margin-right: 5px;
}
.humidity, .wind{
    font-size: 25px;
    margin-top: -7px;
}
span{
    font-size:15px;
}
.weather{
    display:none;
}
.error{
    text-align: left;
    margin-top: 10px;
    margin-left: 10px;
    font-size: 25px;
    display:none;
}

As, I have integrated the API key from the OPENWEATHERMAP, was an online free API key source. Which will gives us the current weather data.
From the JSON of API key we have imported the data of weather changes.

const apiKey = "ERROR{Private Code. Make your self own from below link}";
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
