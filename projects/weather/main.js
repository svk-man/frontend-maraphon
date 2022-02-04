import { CONFIG } from "./js/config.js";
import { addFavouriteCity, isFavouriteCityExists, removeFavouriteCity, printFavouriteCities, isEmptyFavouriteCities } from "./js/favourite.js";
import { UI_ELEMENTS } from "./js/view.js";

const ERROR_MESSAGE = 'Упс! Что-то пошло не так: ';
const DATASET_FAVOURITE_CITY = 'favouriteCity';

UI_ELEMENTS.WEATHER_FAVOURITE_CITIES_LIST.textContent = '';
clearWeatherNow();
clearWeatherFavouriteCities();

UI_ELEMENTS.WEATHER_FORM.addEventListener('submit', showCityWeatherHandler);
UI_ELEMENTS.WEATHER_NOW_FAVOURITE_CITY_BUTTON.addEventListener('click', changeFavouriteCityHandler);
UI_ELEMENTS.WEATHER_FAVOURITE_CITIES_LIST.addEventListener('click', showFavouriteCityHandler);
UI_ELEMENTS.WEATHER_FAVOURITE_CITIES_LIST.addEventListener('click', removeFavouriteCityHandler);

function showCityWeatherHandler(event) {
  event.preventDefault();

  const cityName = UI_ELEMENTS.WEATHER_INPUT.value;
  showCityWeather(cityName);
}

function showCityWeather(cityName) {
  if (cityName) {
    getCityWeatherInfo(cityName)
      .then(cityWeatherInfo => {
        UI_ELEMENTS.WEATHER_NOW_CITY.textContent = cityWeatherInfo['name'];
        UI_ELEMENTS.WEATHER_NOW_TEMPERATURE.textContent = Math.round(cityWeatherInfo['temperature']);
        UI_ELEMENTS.WEATHER_NOW_CONTENT.style.backgroundImage = `url('${CONFIG.SERVER_ICON_URL}${cityWeatherInfo['icon']}@2x.png')`;
        UI_ELEMENTS.WEATHER_NOW_FAVOURITE_CITY_BUTTON.dataset[DATASET_FAVOURITE_CITY] = cityWeatherInfo['name'];
        if (!isFavouriteCityExists(cityName)) {
          UI_ELEMENTS.WEATHER_NOW_FAVOURITE_CITY_BUTTON.classList.remove('weather-now__favourite-btn--active');
        } else {
          UI_ELEMENTS.WEATHER_NOW_FAVOURITE_CITY_BUTTON.classList.add('weather-now__favourite-btn--active');
        }

        openWeatherNow();
      })
      .catch(error => alert(ERROR_MESSAGE + error.message));
  }
}

function getCityWeatherInfo(cityName) {
  const url = `${CONFIG.SERVER_URL}?q=${cityName}&appid=${CONFIG.API_KEY}&units=metric`;
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status} (${response.statusText})`);
      }

      return response.json();
    })
    .then(cityWeatherInfo => {
      function getIcon(cityWeatherInfo) {
        return cityWeatherInfo.weather[cityWeatherInfo.weather.length - 1].icon;
      }

      return {
        'name': cityWeatherInfo.name,
        'temperature': cityWeatherInfo.main.temp,
        'icon': getIcon(cityWeatherInfo),
      };
    })
    .catch(error => alert(ERROR_MESSAGE + error.message));
}

function changeFavouriteCityHandler(event) {
  const favouriteCityButton = event.target;
  const cityName = favouriteCityButton.dataset[DATASET_FAVOURITE_CITY];
  const isFavouriteCityButtonActive = favouriteCityButton.classList.contains('weather-now__favourite-btn--active');
  
  if (!isFavouriteCityButtonActive) {
    addWeatherFavouriteCitiesListItem(cityName);
  } else {
    removeWeatherFavouriteCitiesListItem(cityName);
  }

  printFavouriteCities();
}

function addWeatherFavouriteCitiesListItem(cityName) {
  addFavouriteCity(cityName);

  const li = createWeatherFavouriteCitiesListItem(cityName);
  UI_ELEMENTS.WEATHER_FAVOURITE_CITIES_LIST.append(li);

  UI_ELEMENTS.WEATHER_NOW_FAVOURITE_CITY_BUTTON.classList.add('weather-now__favourite-btn--active');

  if (isEmptyFavouriteCities()) {
    openWeatherFavouriteCities();
  }
}

function removeWeatherFavouriteCitiesListItem(cityName) {
  removeFavouriteCity(cityName);

  const li = document.querySelector(`li[data-favourite-city='${cityName}']`);
  li.remove();

  UI_ELEMENTS.WEATHER_NOW_FAVOURITE_CITY_BUTTON.classList.remove('weather-now__favourite-btn--active');

  if (!isEmptyFavouriteCities()) {
    clearWeatherFavouriteCities();
  }
}

function createWeatherFavouriteCitiesListItem(cityName) {
  const li = document.createElement('li');
  li.classList.add('weather-favourite-cities__item');
  li.dataset[DATASET_FAVOURITE_CITY] = cityName;

  const p = document.createElement('p');
  p.classList.add('weather-favourite-cities__item-name');
  p.textContent = cityName;

  const button = document.createElement('button');
  button.classList.add('weather-favourite-cities__item-remove-button');

  li.append(p, button);

  return li;
}

function showFavouriteCityHandler(event) {
  const weatherFavouriteCitiesItemName = event.target;
  const isWeatherFavouriteCitiesItemName = weatherFavouriteCitiesItemName.classList.contains('weather-favourite-cities__item-name');
  if (isWeatherFavouriteCitiesItemName) {
    const weatherFavouriteCitiesItem = weatherFavouriteCitiesItemName.parentElement;
    const cityName = weatherFavouriteCitiesItem.dataset[DATASET_FAVOURITE_CITY];
    showCityWeather(cityName);
  }
}

function clearWeatherNow() {
  UI_ELEMENTS.WEATHER_NOW_MESSAGE.classList.remove('hidden');
  UI_ELEMENTS.WEATHER_NOW_CONTENT.classList.add('hidden');
}

function openWeatherNow() {
  UI_ELEMENTS.WEATHER_NOW_MESSAGE.classList.add('hidden');
  UI_ELEMENTS.WEATHER_NOW_CONTENT.classList.remove('hidden');
}

function clearWeatherFavouriteCities() {
  UI_ELEMENTS.WEATHER_FAVOURITE_CITIES_MESSAGE.classList.remove('hidden');
  UI_ELEMENTS.WEATHER_FAVOURITE_CITIES_CONTENT.classList.add('hidden');
}

function openWeatherFavouriteCities() {
  UI_ELEMENTS.WEATHER_FAVOURITE_CITIES_MESSAGE.classList.add('hidden');
  UI_ELEMENTS.WEATHER_FAVOURITE_CITIES_CONTENT.classList.remove('hidden');
}

function removeFavouriteCityHandler(event) {
  const removeButton = event.target;
  const isRemoveButton = removeButton.classList.contains('weather-favourite-cities__item-remove-button');
  if (isRemoveButton) {
    const li = removeButton.parentElement;
    const cityName = li.dataset[DATASET_FAVOURITE_CITY];

    removeWeatherFavouriteCitiesListItem(cityName);
  }
}