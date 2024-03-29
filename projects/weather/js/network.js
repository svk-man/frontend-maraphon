import { CONFIG } from "./config.js";
import * as Favourite from "./favourite.js";
import { WEATHER_PROPERTIES } from "./view.js";

const ERROR_MESSAGE = 'Упс! Что-то пошло не так: ';

export async function getCityWeatherData(cityName) {
  const weatherUrl = `${CONFIG.SERVER_URL.WEATHER}?q=${cityName}&appid=${CONFIG.API_KEY}&units=metric`;
  const forecastUrl = `${CONFIG.SERVER_URL.FORECAST}?q=${cityName}&appid=${CONFIG.API_KEY}&units=metric&cnt=40`;
  const cityWeatherInfo = {};

  try {
    let jsonData = await loadJsonData(weatherUrl);
    Object.assign(cityWeatherInfo, getCityWeather(jsonData));

    jsonData = await loadJsonData(forecastUrl);
    Object.assign(cityWeatherInfo, getCityForecast(jsonData));
  } catch(error) {
    alert(ERROR_MESSAGE + error.message);
  }

  return cityWeatherInfo;
}

async function loadJsonData(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error: ${response.status} (${response.statusText})`);
  }

  return await response.json();
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
