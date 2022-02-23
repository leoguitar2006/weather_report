//API Data
const URL_KEY  = 'efb9a8a8';
const URL_BASE = `https://api.hgbrasil.com/weather?format=json-cors&key=${URL_KEY}`;
const URL_DEFAULT = `${URL_BASE}&user_ip=remote`;


//HTML Elements
const mainContainerEl = document.querySelector('.main-container');
const locationEl = document.querySelector('.location-and-date__location');
const todayEl = document.querySelector('.location-and-date div div');
const tempValueEl = document.querySelector('.current-temperature__value');
const tempSummaryEl = document.querySelector('.current-temperature__summary');

const currentHighEl = document.querySelector('[data-js="current-high"]');
const currentLowEl = document.querySelector('[data-js="current-low"]');
const currentWindEl = document.querySelector('[data-js="current-wind"]');
const currentHumEl = document.querySelector('[data-js="current-hum"]');
const currentSunriseEl = document.querySelector('[data-js="current-sunrise"]');
const currentSunsetEl = document.querySelector('[data-js="current-sunset"]');

const currentIcon = document.querySelector('.current-temperature__icon');

const next5DaysContainerEl = document.querySelector('.next-5-days__container');

const findInputEl = document.querySelector('.find-city__input');
const findButtonEl = document.querySelector('.find-city__button');


//Functions
const getHour = () => {
    const date = new Date();
    const hour = date.getHours(); 

    return hour;
}

const getIconForecast = (description, hour) => ({
    'Tempestade forte' : "./src/images/thunder_cloud.svg", 
    'Tempestade tropical': (hour >= 18 && hour < 6) ? "./src/images/night_raining_cloud.svg" : "./src/images/sun_cloudly_raining.svg",
    'Furacão': "./src/images/wind.svg",
    'Tempestades severas' : "./src/images/thunder_cloud.svg", 
    'Tempestades' : "./src/images/thunder_cloud.svg", 
    'Misto de neve e chuva' : "./src/images/snowing.svg", 
    'Misto chuva e gelo' : "./src/images/snowing.svg", 
    'Misto neve e gelo' : "./src/images/snowing.svg", 
    'Geada fina' : "./src/images/foggy_cloud.svg",
    'Chuviscos' : (hour >= 18 && hour < 6) ? "./src/images/night_raining_cloud.svg" : "./src/images/sun_cloudly_raining.svg",
    'Congelamento chuva' : "./src/images/snowing.svg",  
    'Alguns chuviscos' : (hour >= 18 && hour < 6) ? "./src/images/night_raining_cloud.svg" : "./src/images/sun_cloudly_raining.svg",
    'Alguns chuviscos' : (hour >= 18 && hour < 6) ? "./src/images/night_raining_cloud.svg" : "./src/images/sun_cloudly_raining.svg",
    'Neve baixa' : "./src/images/snow.svg",
    'Tempestade com neve' : "./src/images/snow.svg",
    'Ventania com neve' : "./src/images/wind.svg",
    'Neve' : "./src/images/snow.svg",
    'Granizo' : "./src/images/snowing.svg", 
    'Gelo' : "./src/images/snow.svg",
    'Poeira' : "./src/images/wind.svg",
    'Neblina'  : "./src/images/foggy_cloud.svg",
    'Tempestade de areia' : "./src/images/wind.svg",
    'Fumacento' : "./src/images/foggy.svg", 
    'Vento acentuado' : "./src/images/wind.svg",
    'Ventania' : "./src/images/wind.svg",
    'Tempo frio':  "./src/images/snow_cloudly.svg", 
    'Tempo nublado' : "./src/images/cloud.svg", 
    'Tempo limpo' : (hour >= 18 && hour < 6) ? "./src/images/moon.svg" : "./src/images/sunny.svg",
    'Tempo nublado' : "./src/images/cloud.svg", 
    'Parcialmente nublado' : (hour >= 18 && hour < 6) ? "./src/images/moon_cloud.svg" : "./src/images/sunny_cloud.svg",
    'Parcialmente nublado' : (hour >= 18 && hour < 6) ? "./src/images/moon_cloud.svg" : "./src/images/sunny_cloud.svg",
    'Tempo limpo' : (hour >= 18 && hour < 6) ? "./src/images/moon.svg" : "./src/images/sunny.svg",
    'Ensolarado' : (hour >= 18 && hour < 6) ? "./src/images/moon.svg" : "./src/images/sunny.svg",
    'Estrelado' : (hour >= 18 && hour < 6) ? "./src/images/moon.svg" : "./src/images/sunny.svg",
    'Ensolarado com muitas nuvens' : (hour >= 18 && hour < 6) ? "./src/images/moon_cloud.svg" : "./src/images/sunny_cloud.svg",
    'Misto chuva e granizo' : "./src/images/snowing.svg",  
    'Ar quente' : (hour >= 18 && hour < 6) ? "./src/images/moon.svg" : "./src/images/sunny.svg",
    'Tempestades isoladas' : "./src/images/thunder_cloud.svg", 
    'Trovoadas dispersas' : "./src/images/thunder.svg",
    'Trovoadas dispersas' : "./src/images/thunder.svg",
    'Chuvas esparsas' : (hour >= 18 && hour < 6) ? "./src/images/night_raining_cloud.svg" : "./src/images/sun_cloudly_raining.svg",
    'Pesados neve' : "./src/images/snow.svg",
    'Chuviscos com neve' : "./src/images/rain_cloud.svg", 
    'Neve pesada' : "./src/images/snow.svg",
    'Sol com poucas nuvens' : (hour >= 18 && hour < 6) ? "./src/images/moon_cloud.svg" : "./src/images/sunny_cloud.svg",
    'Chuva' : "./src/images/rain.svg", 
    'Queda de neve' : "./src/images/snow.svg",
    'Tempestades isoladas' : "./src/images/thunder_cloud.svg"
})[description] || './src/images/cloud.svg';

const getConvertedDate = (newDate, newTime) => {
    const formatDate = `${newDate.split('/')[2]}-${newDate.split('/')[1]}-${newDate.split('/')[0]}`;
    const dateInfo = new Date(`${formatDate} ${newTime}`);

    return dateInfo;
}

const getDateInFull = (newDate, newTime) => {
    const months = ['Janeiro', 'Fevereiro','Março', 'Abril', 'Maio', 'Junho', 
                    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const week = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']; 

    const dateInfo = getConvertedDate(newDate, newTime);
    
    return `${week[dateInfo.getDay()]}, ${dateInfo.getDate()} de ${months[dateInfo.getMonth()]} de ${dateInfo.getFullYear()}`;
}

const getNextDays = (weatherData) => {
    const nextDays = weatherData.forecast;   
    next5DaysContainerEl.innerHTML = '';

    nextDays.forEach((forecastDay, index) => {
        if (index > 0 && index <= 5) {            
            let rowDayEl = document.createElement('div');
            rowDayEl.classList.add('next-5-days__row');
            rowDayEl.innerHTML = ` <div class="next-5-days__date">
                                        ${forecastDay.weekday}
                                        <div class="next-5-days__label">${forecastDay.date}</div>
                                    </div>
                                    <div class="next-5-days__low">
                                        ${forecastDay.min}°
                                        <div class="next-5-days__label">Mínima</div>
                                    </div>
                                    <div class="next-5-days__high">
                                        ${forecastDay.max}°
                                        <div class="next-5-days__label">Máxima</div>
                                    </div>
                                    <div class="next-5-days__icon">
                                        <img src=${getIconForecast(forecastDay.description, getHour())} alt="">
                                    </div>`
            next5DaysContainerEl.appendChild(rowDayEl);
        }
    })
}

const updateLocation = ({ city, date, time }) => {
    locationEl.textContent = city;
    todayEl.textContent = getDateInFull(date, time);
}

const updateTemp = ({ temp, description }) => {
    tempValueEl.innerHTML = `${temp}°`;
    tempSummaryEl.textContent = description;
}

const updateCurrentStats = (weatherData) => {
    const currentHigh = weatherData.forecast[0].max;
    const currentLow  = weatherData.forecast[0].min;
    const currentWind = weatherData.wind_speedy;
    const currentHum  = weatherData.humidity;
    const currentSunrise = `${getConvertedDate(weatherData.date, weatherData.sunrise).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}h`;
    const currentSunset  = `${getConvertedDate(weatherData.date, weatherData.sunset).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}h`;

    currentHighEl.textContent  = `${currentHigh}°`;
    currentLowEl.textContent  = `${currentLow}°`;
    currentWindEl.textContent  = currentWind;
    currentHumEl.textContent  = `${currentHum}%`;; 
    currentSunriseEl.textContent = currentSunrise;
    currentSunsetEl.textContent = currentSunset;
}

const updateCurrentIcon = ({ description }) => {
    currentIcon.setAttribute('src', getIconForecast(description, getHour()));
}

const getUrl = (city = '') => {
    if (city === '') {
        return URL_DEFAULT;
    } else {
        return `${URL_BASE}&city_name=${city}`;
    }
}

const fetchWeather = async (url) => {
    try {
        mainContainerEl.style.display = 'none';
        const response = await fetch(url);
        const results = await response.json();
        const weatherData = results.results;  
        
        if (weatherData) {
            mainContainerEl.style.display = 'flex';
        }

        updateLocation(weatherData);
        updateTemp(weatherData);
        updateCurrentStats(weatherData);
        updateCurrentIcon(weatherData);
        getNextDays(weatherData);
    } catch (err) {
        alert(err.message);
    }
}

const init = () => {
    fetchWeather(getUrl());
}

//Eventos
findButtonEl.addEventListener('click', () => fetchWeather(getUrl(findInputEl.value)));
findInputEl.addEventListener('keydown', e => {
    if (e.key.toString() == 'Enter') {
        fetchWeather(getUrl(e.target.value));
    }
})

//Inicio Script
init();
