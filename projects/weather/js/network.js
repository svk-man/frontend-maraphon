import { CONFIG } from "./config.js";
import * as Favourite from "./favourite.js";
import { WEATHER_PROPERTIES } from "./view.js";

const ERROR_MESSAGE = 'Упс! Что-то пошло не так: ';

export function getCityWeatherData(cityName) {
  const weatherUrl = `${CONFIG.SERVER_URL.WEATHER}?q=${cityName}&appid=${CONFIG.API_KEY}&units=metric`;
  const forecastUrl = `${CONFIG.SERVER_URL.FORECAST}?q=${cityName}&appid=${CONFIG.API_KEY}&units=metric&cnt=5`;
  const cityWeatherInfo = {};
  return loadJsonData(weatherUrl)
    .then(jsonData => {
      Object.assign(cityWeatherInfo, getCityWeather(jsonData));
      return loadJsonData(forecastUrl);
    })
    .then(jsonData => {
      Object.assign(cityWeatherInfo, getCityForecast(jsonData));
      return cityWeatherInfo;
    })
    .catch(error => alert(ERROR_MESSAGE + error.message));
}

function loadJsonData(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status} (${response.statusText})`);
      }

      return response.json();
    });
}

function getCityWeather(jsonData) {
  const getCityName = jsonData => jsonData.name;
  const getTemperature = jsonData => jsonData.main.temp;
  const getIcon = jsonData => getIconUrl(jsonData.weather[jsonData.weather.length - 1].icon);
  const getIsFavourite = jsonData => Favourite.isFavouriteCityExists(jsonData.name);
  const getWeather = jsonData => jsonData.weather[jsonData.weather.length - 1].main;
  const getFeelsLike = jsonData => jsonData.main.feels_like;
  const getSunrise = jsonData => jsonData.sys.sunrise;
  const getSunset = jsonData => jsonData.sys.sunset;

  return {
    [WEATHER_PROPERTIES.CITY]: getCityName(jsonData),
    [WEATHER_PROPERTIES.TEMPERATURE]: getTemperature(jsonData),
    [WEATHER_PROPERTIES.ICON]: getIcon(jsonData),
    [WEATHER_PROPERTIES.IS_FAVOURITE]: getIsFavourite(jsonData),
    [WEATHER_PROPERTIES.DETAILS]: {
      [WEATHER_PROPERTIES.TEMPERATURE]: getTemperature(jsonData),
      [WEATHER_PROPERTIES.FEELS_LIKE]: getFeelsLike(jsonData),
      [WEATHER_PROPERTIES.WEATHER]: getWeather(jsonData),
      [WEATHER_PROPERTIES.SUNRISE]: getSunrise(jsonData),
      [WEATHER_PROPERTIES.SUNSET]: getSunset(jsonData),
    },
  };
}

function getCityForecast(jsonData) {
  const getDatetime = jsonData => jsonData.dt;
  const getTemperature = jsonData => jsonData.main.temp;
  const getFeelsLike = jsonData => jsonData.main.feels_like;
  const getWeather = jsonData => jsonData.weather[jsonData.weather.length - 1].main;
  const getIcon = jsonData => getIconUrl(jsonData.weather[jsonData.weather.length - 1].icon);
  const getForecastItems = jsonData => {
    return jsonData.list.map(forecastItem => {
      return {
        [WEATHER_PROPERTIES.DATETIME]: getDatetime(forecastItem),
        [WEATHER_PROPERTIES.TEMPERATURE]: getTemperature(forecastItem),
        [WEATHER_PROPERTIES.FEELS_LIKE]: getFeelsLike(forecastItem),
        [WEATHER_PROPERTIES.WEATHER]: getWeather(forecastItem),
        [WEATHER_PROPERTIES.ICON]: getIcon(forecastItem),
      };
    });
  };

  return {
    [WEATHER_PROPERTIES.LIST]: getForecastItems(jsonData),
  };
}

function getIconUrl(name) {
  return `${CONFIG.SERVER_URL.ICON}${name}@4x.png`;
}
