const input = document.getElementById('input_text');
const button= document.getElementById('submit');
const main = document.getElementById("name");
const temp = document.getElementById('temp');
const desc = document.getElementById('desc');
const clouds = document.getElementById('clouds');


button.addEventListener('click', function(name){
fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid=d8d111f69220a1cbe420d3e08bbfe735')
.then(response => response.json())
.then(data => {
  const tempValue = data.main.temp;
  const temp_maxValue = data.main.temp_max;
  const nameValue = data.name;
  const descValue = data['weather'][0]['description'];
  const cloudValue = data['weather'][0]['main'];
  const humidityValue = data.main.humidity;
  const windSpeedValue = data.wind.speed;

//converting tempValue kelvin to fahrenheit
const kelvin = tempValue;
const celsius = kelvin - 273;
let fahrenheit = celsius * (9/5) + 32;
Fahrenheit = Math.floor(fahrenheit);

//converting temp_MaxValue kelvin to fahrenheit
const kelvin_max = temp_maxValue;
const celsius_max = kelvin_max - 273;
let fahrenheit_max = celsius_max * (9/5) + 32;
Fahrenheit_max = Math.floor(fahrenheit_max);

//Convert to time
// let unix_timestamp = 1549312452
// // Create a new JavaScript Date object based on the timestamp
// // multiplied by 1000 so that the argument is in milliseconds, not seconds.
// var date = new Date(unix_timestamp * 1000);
// // Hours part from the timestamp
// var hours = date.getHours();
// // Minutes part from the timestamp
// var minutes = "0" + date.getMinutes();
// // Seconds part from the timestamp
// var seconds = "0" + date.getSeconds();

  main.innerHTML = nameValue;
  temp.innerHTML = Fahrenheit+" °F";
  temp_max.innerHTML = "MAX: "+Fahrenheit_max+" °F";
  desc.innerHTML = "Desc: "+descValue;
  cloud.innerHTML = "Weather: "+cloudValue;
  humidity.innerHTML = "Humidity: "+humidityValue+" %";
  windSpeed.innerHTML = "Wind Speed: "+windSpeedValue+" mph";

  input.value ="";

  console.log(data)

})

.catch(err => alert("Wrong city name!"));
})