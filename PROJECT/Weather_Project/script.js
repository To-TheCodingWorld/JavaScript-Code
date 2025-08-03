const userLocation = document.getElementById('userLocation');
converter = document.getElementById('converter');
weatherIcon = document.querySelector('.weatherIcon');
temperature = document.querySelector('.temperature');
feelsLike = document.querySelector('.feelsLike');
description = document.querySelector('.description');
date = document.querySelector('.date');
city = document.querySelector('.city');

HValue = document.getElementById('HValue');
WValue = document.getElementById('WValue');
SRValue = document.getElementById('SRValue');
SSValue = document.getElementById('SSValue');
CValue = document.getElementById('CValue');
UVValue = document.getElementById('UVValue');
PValue = document.getElementById('PValue');
Forecast = document.querySelector('.Forecast');


const WEATHER_API_ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather?appid=cf871fdc56f76559ae4d6b4696471ba5';

const WEATHER_DATA_ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather?appid=cf871fdc56f76559ae4d6b4696471ba5&exclude=minutely&units=metric';

function findUserLocation() {
 
  fetch(WEATHER_API_ENDPOINT + '&q=' + userLocation.value)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod != " " && data.cod != 200){
        alert(data.message);
        return;
      }

      console.log(data);
      city.innerHTML = data.name + ', ' + data.sys.country;
      weatherIcon.style.background = `url(https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png)`;

      weatherIcon.style.width = "350px";
      weatherIcon.style.height = "30%";
      weatherIcon.style.backgroundSize = "contain"; // or "cover"
      weatherIcon.style.backgroundRepeat = "no-repeat";
      
      fetch(WEATHER_DATA_ENDPOINT + `&lon=${data.coord.lon}&lat=${data.coord.lat}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          temperature.innerHTML = 'Temperature : ' +TemConverter(data.main.temp);
          feelsLike.innerHTML = 'Feels like: ' + TemConverter(data.main.feels_like );
          description.innerHTML = `<i class = "fa-brands fa-cloudversify"></i>&nbsp;` + data.weather[0].description;

          HValue.innerHTML = Math.round(data.main.humidity) + '%';
          WValue.innerHTML = Math.round(data.wind.speed) + ' m/s';
          SRValue.innerHTML = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
          SSValue.innerHTML = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
          CValue.innerHTML = data.clouds.all + '%'; 
          UVValue.innerHTML = data.uvi;
          PValue.innerHTML = data.main.pressure + ' hPa'; 
          date.innerHTML = new Date(data.dt * 1000).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
          Forecast.innerHTML = `<i class="fa-solid fa-cloud-sun"></i>&nbsp;` + data.weather[0].main;
          
          converter.style.display = 'block';

          console.log(data.daily)
        });
    });
  }

 function TemConverter(temp) {
  const converter = document.getElementById("converter");
  let message = "";

  if (converter.value == "°C") {
    message = Math.round(temp) + "°C";
  } else {
    let CtoF = Math.round((temp * 9/5) + 32);
    message = CtoF + "°F";
  }
  return message;
}




