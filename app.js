const API_KEY = `9a797f1496834c0f832210746210312`;
const API_URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}`

class App {
    constructor(el) {
        this.el = el;
        const citiesJson = localStorage.getItem('cities');
        let cities = [];
        if (citiesJson) {
            cities = JSON.parse(citiesJson);
        } 
        this.cities =  cities.map(c => new City(c.name, this));
        this.render();
    }
    
    addCity(c) {
        this.cities.push(c);
        this.render();
        this.saveIntoStorage();
    }

    removeCity(c) {

        this.cities = this.cities.filter(city => city.name !== c.name);

        this.render();
        this.saveIntoStorage();
    }

    render() {
        this.el.innerHTML = '';
        this.cities.forEach(city => city.render(this.el))
        // read from localStorage
        const favs = JSON.parse(localStorage.getItem('favs')) || [];
        const newList = favs.map(c => new City(c.name, this));
        newList.forEach(city => city.render(document.querySelector(".cities-saved")))
    }

    saveIntoStorage() {
        localStorage.setItem('cities', JSON.stringify(this.cities))
    }

}

class City {
    constructor(name, app) {
        this.name = name;
        this.app = app;
    }

    async getWeather() {
        const res = await fetch(`${API_URL}&q=${this.name}`)
            .then(response => response.json())

        console.log(res);
        return res.current;
    }

    async render(ctr) {
        const currentWeather = await this.getWeather();
        if(!currentWeather){
            return null;
        }
        const citiesContainer = document.createElement('div');


        citiesContainer.className = 'cities-containers d-flex flex-column align-items-center'
        citiesContainer.innerHTML = `
            <img src="${currentWeather.condition.icon}">  
            <span class="city-containers city-temp">${currentWeather.temp_f} F</span>    
            <span class="city-containers city-condition-text">${currentWeather.condition?.text}</span>    
            <span class="city-containers city-humidity">${currentWeather.humidity}</span>    
            <span class="city-containers city-name">${this.name}</span>
            <span class="city-containers city-close"><i class="fas fa-times"></i></span>        
        `
        ctr.appendChild(citiesContainer);
        const close = citiesContainer.querySelector('.city-close');
        close.addEventListener('click', () => this.app.removeCity(this))

        citiesContainer.addEventListener("click" , () => {
            const favs = JSON.parse(localStorage.getItem('favs')) || [];
            const newList = [...favs , this.name]
            localStorage.setItem('favs', JSON.stringify(newList))   
            
            doc = document.querySelector(".cities-saved");

            //doc.appendChild(citiesContainer)
            // loop over favs
            // render it
        })

    }

    toJSON() {
        return {name: this.name};
    }
}

const app = new App(document.getElementById('cities-locations'));

const modal = document.getElementById('addCityModal');
const bootstrapModal = new bootstrap.Modal(modal, {
    keyboard: false
})
const input = document.getElementById('cityName')
const saveBtn = document.getElementById('saveCity');
saveBtn.addEventListener('click', () => {
    addCity();
})
input.addEventListener('keypress', (ev) => {
    if (ev.key === 'Enter') {
        addCity();
    }
})
modal.addEventListener('shown.bs.modal', () => {
    input.focus();
})

function addCity() {
    const city = new City(input.value, app);
    app.addCity(city);
    bootstrapModal.hide();
    input.value = '';
}
