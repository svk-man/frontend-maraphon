const CONFIG = {
  'SERVER_URL': 'http://api.openweathermap.org/data/2.5/weather',
  'API_KEY': '',
  'SERVER_ICON_URL': 'http://openweathermap.org/img/wn/'
};

const UI_ELEMENTS = {
  'WEATHER_FORM': document.querySelector('.weather-app__form'),
  'WEATHER_INPUT': document.querySelector('.weather-app__input'),
  'WEATHER_NOW': document.querySelector('.weather-now'),
  'WEATHER_NOW_CITY': document.querySelector('.weather-now__city'),
  'WEATHER_NOW_TEMPERATURE': document.querySelector('.weather-now__temperature'),
};

UI_ELEMENTS.WEATHER_FORM.addEventListener('submit', changeCity);

function changeCity(event) {
  event.preventDefault();

  const cityName = UI_ELEMENTS.WEATHER_INPUT.value;
  if (cityName) {
    getCityInfo(cityName)
      .then(cityInfo => {
        UI_ELEMENTS.WEATHER_NOW_CITY.textContent = cityInfo['name'],
        UI_ELEMENTS.WEATHER_NOW_TEMPERATURE.textContent = Math.round(cityInfo['temperature'])
        UI_ELEMENTS.WEATHER_NOW.style.backgroundImage = `url('${CONFIG.SERVER_ICON_URL}${cityInfo['icon']}@2x.png')`;
      })
      .catch(error => alert('Упс! Что-то пошло не так: ' + error.message));
  }
}

function getCityInfo(cityName) {
  const url = `${CONFIG.SERVER_URL}?q=${cityName}&appid=${CONFIG.API_KEY}&units=metric`;
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status} (${response.statusText})`);
      }

      response.json();
    })
    .then(cityInfo => {
      function getIcon(cityInfo) {
        return cityInfo.weather[cityInfo.weather.length - 1].icon;
      }

      return {
        'name': cityInfo.name,
        'temperature': cityInfo.main.temp,
        'icon': getIcon(cityInfo),
      };
    })
    .catch(error => alert('Упс! Что-то пошло не так: ' + error.message));
}
