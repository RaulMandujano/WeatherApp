//key: 9a797f1496834c0f832210746210312

// fetch(
//   'http://api.weatherapi.com/v1/search.json?key=9a797f1496834c0f832210746210312&q=london',
// )
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data)
//   })

const cityname = () => {
  let input = document.getElementById('city').value
  localStorage.setItem('city', input)
}

fetch(
  `http://api.weatherapi.com/v1/forecast.json?key=9a797f1496834c0f832210746210312&q==${localStorage.getItem(
    'city',
  )}&days=7`,
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    document.getElementById('time-zone').innerHTML = data.location.tz_id
    document.getElementById('country').innerHTML = data.location.country
    renderCurrent(data)
    renderDays(data.forecast.forecastday)
  })

const renderCurrent = (data) => {
  document.getElementById('current-temp').innerHTML = generateDOMElement(
    data.forecast.forecastday[1],
  )
}

const renderDays = (forecastDays) => {
  const forecastDOM = forecastDays
    .map((forecastDay) => generateDOMElement(forecastDay))
    .join('')
  document.getElementById('weather-forecast').innerHTML = forecastDOM
}

const generateDOMElement = (data) => `<div class="current-weather">
    <img src="${data.day.condition.icon}" alt="weather icon" class="w-icon">
    <div class="other">
        <div class="day">${getDayName(data.date)}</div>
        <div class="temp">Max - ${data.day.maxtemp_f} &#176; F</div>
        <div class="temp">Min - ${data.day.mintemp_f} &#176; F</div>
    </div>
    <button>Hourly</button>
</div>`

const getDayName = (date) => {
  if (!date) return null

  const newDate = new Date(date)
  return newDate.toLocaleDateString({}, { weekday: 'short' })
}
