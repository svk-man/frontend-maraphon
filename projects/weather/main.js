import * as Tabs from './js/tabs.js';
import * as Storage from './js/storage.js';
import * as Favourite from "./js/favourite.js";
import * as View from "./js/view.js";
import * as Network from "./js/network.js";

const ERROR_MESSAGE = 'Упс! Что-то пошло не так: ';

/*Storage.clearCurrentCity();
Storage.clearFavouriteCities();*/

View.clearWeatherFavouriteCitiesList();
View.closeWeatherItem(View.WEATHER_ITEM.NOW);
View.closeWeatherItem(View.WEATHER_ITEM.FAVOURITE_CITIES);
loadCurrentCity();
loadFavouriteCities();

function loadCurrentCity() {
  if (!Storage.isEmptyCurrentCity()) {
    const currentCity = Storage.getCurrentCity();
    View.renderCityWeatherNow(currentCity);
    View.renderCityWeatherDetails(currentCity);
    console.log(currentCity);
    View.renderCityWeatherForecast(currentCity);
    View.openWeatherItem(View.WEATHER_ITEM.NOW);
    View.openWeatherItem(View.WEATHER_ITEM.DETAILS);
    View.openWeatherItem(View.WEATHER_ITEM.FORECAST);
  }
}

function loadFavouriteCities() {
  if (!Storage.isEmptyFavouriteCities()) {
    const favouriteCities = Storage.getFavouriteCities().split(',');
    View.renderFavouriteCities(favouriteCities);
    View.openWeatherItem(View.WEATHER_ITEM.FAVOURITE_CITIES);
    Favourite.saveFavouriteCities(favouriteCities);
  }
}

View.UI_ELEMENTS.WEATHER_FORM.addEventListener('submit', showCityWeatherHandler);
View.UI_ELEMENTS.WEATHER_ITEM.NOW.FAVOURITE_CITY_BUTTON.addEventListener('click', changeFavouriteCityHandler);
View.UI_ELEMENTS.WEATHER_ITEM.FAVOURITE_CITIES.LIST.addEventListener('click', showFavouriteCityWeatherHandler);
View.UI_ELEMENTS.WEATHER_ITEM.FAVOURITE_CITIES.LIST.addEventListener('click', removeFavouriteCityHandler);

function showCityWeatherHandler(event) {
  event.preventDefault();

  const form = event.target;
  const cityName = form.children[0].value;
  showCityWeather(cityName);

  form.reset();
}

function changeFavouriteCityHandler(event) {
  const favouriteCityButton = event.target;
  const cityName = favouriteCityButton.dataset[View.DATASET_FAVOURITE_CITY];
  const isFavouriteCityButtonActive = favouriteCityButton.classList.contains('weather-now__favourite-btn--active');

  const currentCity = Storage.getCurrentCity();
  currentCity[View.WEATHER_PROPERTIES.IS_FAVOURITE] = !isFavouriteCityButtonActive;
  if (!isFavouriteCityButtonActive) {
    View.addWeatherFavouriteCitiesListItem(cityName);
  } else {
    View.removeWeatherFavouriteCitiesListItem(cityName);
  }

  Storage.saveCurrentCity(currentCity);
  Storage.saveFavouriteCities(Favourite.getFavouriteCities());
}

function showFavouriteCityWeatherHandler(event) {
  const weatherFavouriteCitiesItemName = event.target;
  const isWeatherFavouriteCitiesItemName = weatherFavouriteCitiesItemName.classList.contains('weather-favourite-cities__item-name');
  if (isWeatherFavouriteCitiesItemName) {
    const weatherFavouriteCitiesItem = weatherFavouriteCitiesItemName.parentElement;
    const cityName = weatherFavouriteCitiesItem.dataset[View.DATASET_FAVOURITE_CITY];
    showCityWeather(cityName);
  }
}

function showCityWeather(cityName) {
  if (cityName) {
    Network.getCityWeatherData(cityName)
      .then(cityWeatherData => {
        View.renderCityWeatherNow(cityWeatherData);
        View.renderCityWeatherDetails(cityWeatherData);
        View.renderCityWeatherForecast(cityWeatherData);
        Storage.saveCurrentCity(cityWeatherData);
        View.openWeatherItem(View.WEATHER_ITEM.NOW);
        View.openWeatherItem(View.WEATHER_ITEM.DETAILS);
        View.openWeatherItem(View.WEATHER_ITEM.FORECAST);
      })
      .catch(error => alert(ERROR_MESSAGE + error.message));
  } else {
    View.closeWeatherItem(View.WEATHER_ITEM.NOW);
  }
}

function removeFavouriteCityHandler(event) {
  const removeButton = event.target;
  const isRemoveButton = removeButton.classList.contains('weather-favourite-cities__item-remove-button');
  if (isRemoveButton) {
    const li = removeButton.parentElement;
    const cityName = li.dataset[View.DATASET_FAVOURITE_CITY];

    View.removeWeatherFavouriteCitiesListItem(cityName);
    Storage.saveFavouriteCities(Favourite.getFavouriteCities());
  }
}
