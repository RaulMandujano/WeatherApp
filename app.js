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
  const nameValue = data.name;
  const descValue = data['weather'][0]['description'];

  main.innerHTML = nameValue;
  desc.innerHTML = "Desc - "+descValue;
  temp.innerHTML = "Temp - "+tempValue;
  input.value ="";

  console.log(data)

})

.catch(err => alert("Wrong city name!"));
})