import { CONFIG } from "./config.js";
import * as Storage from "./storage.js";
import * as Favourite from "./favourite.js";

export const DATASET_FAVOURITE_CITY = 'favouriteCity';

export const WEATHER_ITEM = {
  'NOW': 'NOW',
  'FAVOURITE_CITIES': 'FAVOURITE_CITIES',
  'FORECAST': 'FORECAST',
  'DETAILS': 'DETAILS',
};

export const UI_ELEMENTS = {
  'WEATHER_FORM': document.querySelector('.weather-app__form'),
  'WEATHER_ITEMS': Array.from(document.querySelectorAll('.weather__item')),
  'WEATHER_ITEM': {
    [WEATHER_ITEM.NOW]: {
      'SELF': document.querySelector('.weather-now'),
      'MESSAGE': document.querySelector('.weather-now__message'),
      'CONTENT': document.querySelector('.weather-now__content'),
      'CITY': document.querySelector('.weather-now__city'),
      'TEMPERATURE': document.querySelector('.weather-now__temperature'),
      'FAVOURITE_CITY_BUTTON': document.querySelector('.weather-now__favourite-btn'),
    },
    [WEATHER_ITEM.FAVOURITE_CITIES]: {
      'SELF': document.querySelector('.weather-favourite-cities'),
      'MESSAGE': document.querySelector('.weather-favourite-cities__message'),
      'CONTENT': document.querySelector('.weather-favourite-cities__content'),
      'LIST': document.querySelector('.weather-favourite-cities__list'),
    },
    [WEATHER_ITEM.DETAILS]: {
      'SELF': document.querySelector('.weather-details'),
      'TITLE': document.querySelector('.weather-details__title'),
      'LIST': document.querySelector('.weather-details__list'),
    },
    [WEATHER_ITEM.FORECAST]: {
      'SELF': document.querySelector('.weather-forecast'),
    }
  },
  'WEATHER_TABS': document.querySelector('.weather-app__weather-tabs'),
  'WEATHER_TAB_ITEMS': Array.from(document.querySelectorAll('.weather-app__weather-tab')),
};

export const CITY_WEATHER_PROPERTIES = {
  name: 'name',
  temperature: 'temperature',
  feelsLike: 'feels like',
  weather: 'weather',
  icon: 'icon',
  sunrise: 'sunrise',
  sunset: 'sunset',
  details: 'details',
  isFavourite: 'is-favourite',
};

export function openWeatherItem(name) {
  if (WEATHER_ITEM[name]) {
    const weatherItem = UI_ELEMENTS.WEATHER_ITEM[name];
    weatherItem.MESSAGE.classList.add('hidden');
    weatherItem.CONTENT.classList.remove('hidden');
  }
}

export function closeWeatherItem(name) {
  if (WEATHER_ITEM[name]) {
    const weatherItem = UI_ELEMENTS.WEATHER_ITEM[name];
    weatherItem.CONTENT.classList.add('hidden');
    weatherItem.MESSAGE.classList.remove('hidden');
  }
}

export function clearWeatherFavouriteCitiesList () {
  UI_ELEMENTS.WEATHER_ITEM.FAVOURITE_CITIES.LIST.textContent = '';
}

export function renderCityWeatherNow(cityWeatherInfo) {
  const weatherItemNow = UI_ELEMENTS.WEATHER_ITEM.NOW;

  weatherItemNow.CITY.textContent = cityWeatherInfo[CITY_WEATHER_PROPERTIES.name];
  weatherItemNow.TEMPERATURE.textContent = Math.round(cityWeatherInfo[CITY_WEATHER_PROPERTIES.temperature]);
  weatherItemNow.CONTENT.style.backgroundImage = `url('${CONFIG.SERVER_ICON_URL}${cityWeatherInfo[CITY_WEATHER_PROPERTIES.icon]}@2x.png')`;
  weatherItemNow.FAVOURITE_CITY_BUTTON.dataset[DATASET_FAVOURITE_CITY] = cityWeatherInfo[CITY_WEATHER_PROPERTIES.name];

  if (!cityWeatherInfo[CITY_WEATHER_PROPERTIES.isFavourite]) {
    weatherItemNow.FAVOURITE_CITY_BUTTON.classList.remove('weather-now__favourite-btn--active');
  } else {
    weatherItemNow.FAVOURITE_CITY_BUTTON.classList.add('weather-now__favourite-btn--active');
  }
}

export function renderFavouriteCities(favouriteCities) {
  const weatherItemFavouriteCities = UI_ELEMENTS.WEATHER_ITEM.FAVOURITE_CITIES;
  weatherItemFavouriteCities.LIST.textContent = '';

  favouriteCities.forEach(cityName => {
    weatherItemFavouriteCities.LIST.append(createWeatherFavouriteCitiesListItem(cityName));
  });
}

export function renderCityWeatherDetails(cityWeatherInfo) {
  const prepareDetailsItemKey = name => name[0].toUpperCase() + name.slice(1).toLowerCase();

  const weatherItemDetails = UI_ELEMENTS.WEATHER_ITEM.DETAILS;
  weatherItemDetails.LIST.textContent = '';
  weatherItemDetails.TITLE.textContent = cityWeatherInfo[CITY_WEATHER_PROPERTIES.name];

  const detailsItems = cityWeatherInfo[CITY_WEATHER_PROPERTIES.details];
  for (const detailsItemKey in detailsItems) {
    const li = document.createElement('li');
    li.classList.add('weather-details__item');
    li.textContent = `${prepareDetailsItemKey(detailsItemKey)}: `;

    switch(detailsItemKey) {
      case CITY_WEATHER_PROPERTIES.temperature:
      case CITY_WEATHER_PROPERTIES.feelsLike:
        const span = document.createElement('span');
        span.classList.add('weather-details__item-degree');
        span.textContent = detailsItems[detailsItemKey];
        li.append(span);
        break;
      case CITY_WEATHER_PROPERTIES.sunset:
      case CITY_WEATHER_PROPERTIES.sunrise:
          const date = new Date(detailsItems[detailsItemKey]);
          li.textContent += `${date.getHours()}:${date.getMinutes()}`;
        break;
      default:
        li.textContent += detailsItems[detailsItemKey];
    }

    weatherItemDetails.LIST.append(li);
  }
}

export function addWeatherFavouriteCitiesListItem(cityName) {
  Favourite.addFavouriteCity(cityName);

  const li = createWeatherFavouriteCitiesListItem(cityName);
  UI_ELEMENTS.WEATHER_ITEM.FAVOURITE_CITIES.LIST.append(li);

  UI_ELEMENTS.WEATHER_ITEM.NOW.FAVOURITE_CITY_BUTTON.classList.add('weather-now__favourite-btn--active');

  if (Favourite.isEmptyFavouriteCities()) {
    openWeatherItem(WEATHER_ITEM.FAVOURITE_CITIES);
  }
}

export function removeWeatherFavouriteCitiesListItem(cityName) {
  Favourite.removeFavouriteCity(cityName);
  
  const currentCity = Storage.getCurrentCity();
  if (currentCity[CITY_WEATHER_PROPERTIES.name] === cityName) {
    currentCity[CITY_WEATHER_PROPERTIES.isFavourite] = false;
    Storage.saveCurrentCity(currentCity);
  }

  const li = document.querySelector(`li[data-favourite-city='${cityName}']`);
  li.remove();

  if (UI_ELEMENTS.WEATHER_ITEM.NOW.FAVOURITE_CITY_BUTTON.dataset[DATASET_FAVOURITE_CITY] === cityName) {
    UI_ELEMENTS.WEATHER_ITEM.NOW.FAVOURITE_CITY_BUTTON.classList.remove('weather-now__favourite-btn--active');
  }

  if (!Favourite.isEmptyFavouriteCities()) {
    clearWeatherFavouriteCities();
  }
}

export function createWeatherFavouriteCitiesListItem(cityName) {
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
