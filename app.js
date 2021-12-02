fetch('https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=d8d111f69220a1cbe420d3e08bbfe735')
.then(res => res.json())
.then(data => console.log(data))
.catch(error => console.log('ERROR'))