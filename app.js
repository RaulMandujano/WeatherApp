//key: 9a797f1496834c0f832210746210312

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
  document.getElementById(
    'current-temp',
  ).innerHTML = `<div class="current-weather">
  <img src="${data.current.condition.icon}" alt="weather icon" class="w-icon">
  <div class="other">
      <div class="temp">${data.current.condition.text}</div>
      <div class="temp">${data.current.temp_f} &#176; F</div>
      <div class="temp">${data.current.humidity} <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M406.043 316c24.11 96.443-50.59 180-150 180s-174.405-82.38-150-180c15-60 90-150 150-300 60 150 135 240 150 300z"></path></svg></div>
      <div class="temp">${data.current.wind_mph} mph <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path></svg></div>
  </div>
</div>`
}

const renderDays = (forecastDays) => {
  const forecastDOM = forecastDays
    .map((forecastDay) => generateDOMElement(forecastDay))
    .join('')
  document.getElementById('weather-forecast').innerHTML = forecastDOM
}

const generateDOMElement = (data) => `<div class="forecast-weather">
    <img src="${data.day.condition.icon}" alt="weather icon" class="w-icon">
    <div class="other">
    <div class="day">${getDayName(data.date)}</div>
        <div class="temp">${data.day.condition.text}</div>
        <div class="temp">${data.day.avgtemp_f} &#176; F</div>
        <div class="temp">Min - ${data.day.mintemp_f} &#176; F</div>
    </div>
    <button>Hourly</button>
</div>`

const getDayName = (date) => {
  if (!date) return null

  const newDate = new Date(date)
  return newDate.toLocaleDateString({}, { weekday: 'short' })
}
