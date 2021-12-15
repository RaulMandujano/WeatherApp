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
    datafetched = [...data.forecast.forecastday]
    document.getElementById('time-zone').innerHTML = data.location.tz_id
    document.getElementById('country').innerHTML = data.location.country
    renderCurrent(data)
    renderDays(data.forecast.forecastday)
  })

const renderCurrent = (data) => {
  document.getElementById(
    'current-temp',
  ).innerHTML = `
  <div class="current-weather">
    <img src="${data.current.condition.icon}" alt="weather icon" class="w-icon">
    <div class="other">
      <div class="temp">${data.current.condition.text}</div>
      <div class="temp">${data.current.temp_f} &#176; F</div>
      <div class="temp">${data.current.humidity} <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M406.043 316c24.11 96.443-50.59 180-150 180s-174.405-82.38-150-180c15-60 90-150 150-300 60 150 135 240 150 300z"></path></svg></div>
      <div class="temp">${data.current.wind_mph} mph <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path></svg></div>
    </div>
    <button>Save</button>
  </div>
  
  <div class="current-weather">
  <div class="column">
    <div>Sunrise:</div>
    <div><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg> ${data.forecast.forecastday[1].astro.sunrise}</div>

    <div>Sunset:</div>
    <div><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M17 18a5 5 0 0 0-10 0"></path><line x1="12" y1="9" x2="12" y2="2"></line><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"></line><line x1="1" y1="18" x2="3" y2="18"></line><line x1="21" y1="18" x2="23" y2="18"></line><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"></line><line x1="23" y1="22" x2="1" y2="22"></line><polyline points="16 5 12 9 8 5"></polyline></svg> ${data.forecast.forecastday[1].astro.sunset}</div>
  </div>

  <div class="column">
    <div class="moon">Moon Phase</div>
    <div><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M253.125 18.563c-131.53 0-238.375 106.813-238.375 238.343 0 131.53 106.846 238.344 238.375 238.344 131.53 0 238.344-106.815 238.344-238.344 0-131.528-106.816-238.344-238.345-238.344zm-23.938 52.093c40.517 0 77.988 12.904 108.532 34.813-5.597-.624-11.302-.97-17.064-.97-84.157 0-152.375 68.25-152.375 152.406 0 84.157 68.22 152.375 152.376 152.375 5.762 0 11.467-.313 17.063-.936-30.545 21.91-68.016 34.812-108.533 34.812-102.98 0-186.28-83.272-186.28-186.25 0-102.977 83.3-186.25 186.28-186.25z"></path></svg> ${data.forecast.forecastday[1].astro.moon_phase}</div>

    <div class="moon">Moon Rise</div>
    <div><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M342.8 352.7c5.7-9.6 9.2-20.7 9.2-32.7 0-35.3-28.7-64-64-64-17.2 0-32.8 6.9-44.3 17.9-16.3-29.6-47.5-49.9-83.7-49.9-53 0-96 43-96 96 0 2 .5 3.8.6 5.7C27.1 338.8 0 374.1 0 416c0 53 43 96 96 96h240c44.2 0 80-35.8 80-80 0-41.9-32.3-75.8-73.2-79.3zm222.5-54.3c-93.1 17.7-178.5-53.7-178.5-147.7 0-54.2 29-104 76.1-130.8 7.3-4.1 5.4-15.1-2.8-16.7C448.4 1.1 436.7 0 425 0 319.1 0 233.1 85.9 233.1 192c0 8.5.7 16.8 1.8 25 5.9 4.3 11.6 8.9 16.7 14.2 11.4-4.7 23.7-7.2 36.4-7.2 52.9 0 96 43.1 96 96 0 3.6-.2 7.2-.6 10.7 23.6 10.8 42.4 29.5 53.5 52.6 54.4-3.4 103.7-29.3 137.1-70.4 5.3-6.5-.5-16.1-8.7-14.5z"></path></svg> ${data.forecast.forecastday[1].astro.moonrise}</div>

    <div>Moon Set</div>
    <div><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M342.8 352.7c5.7-9.6 9.2-20.7 9.2-32.7 0-35.3-28.7-64-64-64-17.2 0-32.8 6.9-44.3 17.9-16.3-29.6-47.5-49.9-83.7-49.9-53 0-96 43-96 96 0 2 .5 3.8.6 5.7C27.1 338.8 0 374.1 0 416c0 53 43 96 96 96h240c44.2 0 80-35.8 80-80 0-41.9-32.3-75.8-73.2-79.3zm222.5-54.3c-93.1 17.7-178.5-53.7-178.5-147.7 0-54.2 29-104 76.1-130.8 7.3-4.1 5.4-15.1-2.8-16.7C448.4 1.1 436.7 0 425 0 319.1 0 233.1 85.9 233.1 192c0 8.5.7 16.8 1.8 25 5.9 4.3 11.6 8.9 16.7 14.2 11.4-4.7 23.7-7.2 36.4-7.2 52.9 0 96 43.1 96 96 0 3.6-.2 7.2-.6 10.7 23.6 10.8 42.4 29.5 53.5 52.6 54.4-3.4 103.7-29.3 137.1-70.4 5.3-6.5-.5-16.1-8.7-14.5z"></path></svg> ${data.forecast.forecastday[1].astro.moonset}</div>
  </div>
  </div>`
}

// moon_illumination: "82"
// moon_phase: "Waxing Gibbous"
// moonrise: "03:41 PM"
// moonset: "03:54 AM"
// sunrise: "06:03 AM"
// sunset: "05:26 PM"

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
        <div class="temp">${
          data.day.daily_chance_of_snow
        }% <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M440.3 345.2l-33.8-19.5 26-7c8.2-2.2 13.1-10.7 10.9-18.9l-4-14.9c-2.2-8.2-10.7-13.1-18.9-10.9l-70.8 19-63.9-37 63.8-36.9 70.8 19c8.2 2.2 16.7-2.7 18.9-10.9l4-14.9c2.2-8.2-2.7-16.7-10.9-18.9l-26-7 33.8-19.5c7.4-4.3 9.9-13.7 5.7-21.1L430.4 119c-4.3-7.4-13.7-9.9-21.1-5.7l-33.8 19.5 7-26c2.2-8.2-2.7-16.7-10.9-18.9l-14.9-4c-8.2-2.2-16.7 2.7-18.9 10.9l-19 70.8-62.8 36.2v-77.5l53.7-53.7c6.2-6.2 6.2-16.4 0-22.6l-11.3-11.3c-6.2-6.2-16.4-6.2-22.6 0L256 56.4V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v40.4l-19.7-19.7c-6.2-6.2-16.4-6.2-22.6 0L138.3 48c-6.3 6.2-6.3 16.4 0 22.6l53.7 53.7v77.5l-62.8-36.2-19-70.8c-2.2-8.2-10.7-13.1-18.9-10.9l-14.9 4c-8.2 2.2-13.1 10.7-10.9 18.9l7 26-33.8-19.5c-7.4-4.3-16.8-1.7-21.1 5.7L2.1 145.7c-4.3 7.4-1.7 16.8 5.7 21.1l33.8 19.5-26 7c-8.3 2.2-13.2 10.7-11 19l4 14.9c2.2 8.2 10.7 13.1 18.9 10.9l70.8-19 63.8 36.9-63.8 36.9-70.8-19c-8.2-2.2-16.7 2.7-18.9 10.9l-4 14.9c-2.2 8.2 2.7 16.7 10.9 18.9l26 7-33.8 19.6c-7.4 4.3-9.9 13.7-5.7 21.1l15.5 26.8c4.3 7.4 13.7 9.9 21.1 5.7l33.8-19.5-7 26c-2.2 8.2 2.7 16.7 10.9 18.9l14.9 4c8.2 2.2 16.7-2.7 18.9-10.9l19-70.8 62.8-36.2v77.5l-53.7 53.7c-6.3 6.2-6.3 16.4 0 22.6l11.3 11.3c6.2 6.2 16.4 6.2 22.6 0l19.7-19.7V496c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-40.4l19.7 19.7c6.2 6.2 16.4 6.2 22.6 0l11.3-11.3c6.2-6.2 6.2-16.4 0-22.6L256 387.7v-77.5l62.8 36.2 19 70.8c2.2 8.2 10.7 13.1 18.9 10.9l14.9-4c8.2-2.2 13.1-10.7 10.9-18.9l-7-26 33.8 19.5c7.4 4.3 16.8 1.7 21.1-5.7l15.5-26.8c4.3-7.3 1.8-16.8-5.6-21z"></path></svg></div>
        <div class="temp">${
          data.day.avghumidity
        } <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M406.043 316c24.11 96.443-50.59 180-150 180s-174.405-82.38-150-180c15-60 90-150 150-300 60 150 135 240 150 300z"></path></svg></div>
    </div>
    <button onclick="return generateHourlyDOMElement(${
      data.date_epoch
    });">hourly</button> 
</div>`

// onclick of the button following function run and renders data in the table body

function generateHourlyDOMElement(data) {
  const index = datafetched.findIndex((element) => element.date_epoch === data)
  document.getElementById('hourly-weather').innerHTML = datafetched[index].hour
    .map(
      (forecastHourly) =>
        `<div class="hourly-weather-list">
  <img src="${forecastHourly.condition.icon}" alt="weather icon" class="w-icon">
  <div>${forecastHourly.condition.text}</div>
  <div>${forecastHourly.time}</div>
  <div>${forecastHourly.temp_f} <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M416 0c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm0 128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm-160-16C256 50.1 205.9 0 144 0S32 50.1 32 112v166.5C12.3 303.2 0 334 0 368c0 79.5 64.5 144 144 144s144-64.5 144-144c0-34-12.3-64.9-32-89.5V112zM144 448c-44.1 0-80-35.9-80-80 0-25.5 12.2-48.9 32-63.8V112c0-26.5 21.5-48 48-48s48 21.5 48 48v192.2c19.8 14.8 32 38.3 32 63.8 0 44.1-35.9 80-80 80zm16-125.1V304c0-8.8-7.2-16-16-16s-16 7.2-16 16v18.9c-18.6 6.6-32 24.2-32 45.1 0 26.5 21.5 48 48 48s48-21.5 48-48c0-20.9-13.4-38.5-32-45.1z"></path></svg></div>
        </div>`,
    )
    .join('')
}

const getDayName = (date) => {
  if (!date) return null

  const newDate = new Date(date)
  return newDate.toLocaleDateString({}, { weekday: 'short' })
}
