import * as Storage from "./storage.js";
import * as Favourite from "./favourite.js";
import * as DateTime from "./datetime.js";

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
      'TITLE': document.querySelector('.weather-forecast__title'),
      'LIST': document.querySelector('.weather-forecast__items'),
    }
  },
  'WEATHER_TABS': document.querySelector('.weather-app__weather-tabs'),
  'WEATHER_TAB_ITEMS': Array.from(document.querySelectorAll('.weather-app__weather-tab')),
};

export const WEATHER_PROPERTIES = {
  CITY: 'name',
  TEMPERATURE: 'temperature',
  FEELS_LIKE: 'feels like',
  ICON: 'icon',
  SUNRISE: 'sunrise',
  SUNSET: 'sunset',
  IS_FAVOURITE: 'is_favourite',
  DETAILS: 'details',
  WEATHER: 'weather',
  DATETIME: 'datetime',
  LIST: 'list',
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

export function renderCityWeatherNow(cityWeatherData) {
  const weatherItemNow = UI_ELEMENTS.WEATHER_ITEM.NOW;

  weatherItemNow.CITY.textContent = cityWeatherData[WEATHER_PROPERTIES.CITY];
  weatherItemNow.TEMPERATURE.textContent = Math.round(cityWeatherData[WEATHER_PROPERTIES.TEMPERATURE]);
  weatherItemNow.CONTENT.style.backgroundImage = `url('${cityWeatherData[WEATHER_PROPERTIES.ICON]}')`;
  weatherItemNow.FAVOURITE_CITY_BUTTON.dataset[DATASET_FAVOURITE_CITY] = cityWeatherData[WEATHER_PROPERTIES.CITY];

  if (!cityWeatherData[WEATHER_PROPERTIES.IS_FAVOURITE]) {
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

export function renderCityWeatherDetails(cityWeatherData) {
  const prepareDetailsItemKey = name => name[0].toUpperCase() + name.slice(1).toLowerCase();

  const weatherItemDetails = UI_ELEMENTS.WEATHER_ITEM.DETAILS;
  weatherItemDetails.LIST.textContent = '';
  weatherItemDetails.TITLE.textContent = cityWeatherData[WEATHER_PROPERTIES.CITY];

  const detailsItems = cityWeatherData[WEATHER_PROPERTIES.DETAILS];
  for (const detailsItemKey in detailsItems) {
    const li = document.createElement('li');
    li.classList.add('weather-details__item');
    li.textContent = `${prepareDetailsItemKey(detailsItemKey)}: `;

    switch(detailsItemKey) {
      case WEATHER_PROPERTIES.TEMPERATURE:
      case WEATHER_PROPERTIES.FEELS_LIKE:
        const span = document.createElement('span');
        span.classList.add('weather-details__item-degree');
        span.textContent = detailsItems[detailsItemKey];
        li.append(span);
        break;
      case WEATHER_PROPERTIES.SUNSET:
      case WEATHER_PROPERTIES.SUNRISE:
          li.textContent += DateTime.formatTime(new Date(detailsItems[detailsItemKey]));
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

  if (!Favourite.isEmptyFavouriteCities()) {
    openWeatherItem(WEATHER_ITEM.FAVOURITE_CITIES);
  }
}

export function removeWeatherFavouriteCitiesListItem(cityName) {
  Favourite.removeFavouriteCity(cityName);

  const currentCity = Storage.getCurrentCity();
  if (currentCity[WEATHER_PROPERTIES.CITY] === cityName) {
    currentCity[WEATHER_PROPERTIES.IS_FAVOURITE] = false;
    Storage.saveCurrentCity(currentCity);
  }

  const li = document.querySelector(`li[data-favourite-city='${cityName}']`);
  li.remove();

  if (UI_ELEMENTS.WEATHER_ITEM.NOW.FAVOURITE_CITY_BUTTON.dataset[DATASET_FAVOURITE_CITY] === cityName) {
    UI_ELEMENTS.WEATHER_ITEM.NOW.FAVOURITE_CITY_BUTTON.classList.remove('weather-now__favourite-btn--active');
  }

  if (Favourite.isEmptyFavouriteCities()) {
    closeWeatherItem(WEATHER_ITEM.FAVOURITE_CITIES);
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

export function renderCityWeatherForecast(cityForecastData) {
  const weatherItemForecast = UI_ELEMENTS.WEATHER_ITEM.FORECAST;
  weatherItemForecast.TITLE.textContent = cityForecastData[WEATHER_PROPERTIES.CITY];
  weatherItemForecast.LIST.textContent = '';
  cityForecastData[WEATHER_PROPERTIES.LIST].forEach(cityForecastItem => {
    weatherItemForecast.LIST.insertAdjacentHTML('beforeend', createCityWeatherForecastListItem(cityForecastItem));
  });
}

function createCityWeatherForecastListItem(cityForecastItem) {
  const date = new Date(cityForecastItem[WEATHER_PROPERTIES.DATETIME]);

  return `<div class="weather-forecast__item">
  <p class="weather-forecast__item-datetime">
    <span class="weather-forecast__item-date">${DateTime.formatDate(date)}</span>
    <span class="weather-forecast__item-time">${DateTime.formatTime(date)}</span>
  </p>
  <div class="weather-forecast__item-details">
    <ul class="weather-forecast__item-details-list">
      <li class="weather-forecast__item-details-item">Temperature: <span class="weather-forecast__item-details-item-degree">${cityForecastItem[WEATHER_PROPERTIES.TEMPERATURE]}</span></li>
      <li class="weather-forecast__item-details-item">Feels like: <span class="weather-forecast__item-details-item-degree">${cityForecastItem[WEATHER_PROPERTIES.FEELS_LIKE]}</span></li>
    </ul>
    <div class="weather-forecast__item-details-condition">
      <p class="weather-forecast__item-details-condition-description">${cityForecastItem[WEATHER_PROPERTIES.WEATHER]}</p>
      <img class="weather-forecast__item-details-condition-icon" src="${cityForecastItem[WEATHER_PROPERTIES.ICON]}" alt="${cityForecastItem[WEATHER_PROPERTIES.WEATHER]}">
    </div>
  </div>
</div>`;
}


