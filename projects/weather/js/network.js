import { CONFIG } from "./config.js";
import * as Favourite from "./favourite.js";
import { CITY_WEATHER_PROPERTIES } from "./view.js";

const ERROR_MESSAGE = 'Упс! Что-то пошло не так: ';

export function getCityWeatherInfo(cityName) {
  const url = `${CONFIG.SERVER_URL}?q=${cityName}&appid=${CONFIG.API_KEY}&units=metric`;
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status} (${response.statusText})`);
      }

      return response.json();
    })
    .then(cityWeatherInfo => {
      const getIcon = cityWeatherInfo => cityWeatherInfo.weather[cityWeatherInfo.weather.length - 1].icon;
      const getWeather = cityWeatherInfo => cityWeatherInfo.weather[cityWeatherInfo.weather.length - 1].main;
      const getSunrise = cityWeatherInfo => cityWeatherInfo.sys.sunrise;
      const getSunset = cityWeatherInfo => cityWeatherInfo.sys.sunset;

      return {
        [CITY_WEATHER_PROPERTIES.name]: cityWeatherInfo.name,
        [CITY_WEATHER_PROPERTIES.temperature]: cityWeatherInfo.main.temp,
        [CITY_WEATHER_PROPERTIES.icon]: getIcon(cityWeatherInfo),
        [CITY_WEATHER_PROPERTIES.isFavourite]: Favourite.isFavouriteCityExists(cityWeatherInfo.name),
        [CITY_WEATHER_PROPERTIES.details]: {
          [CITY_WEATHER_PROPERTIES.temperature]: cityWeatherInfo.main.temp,
          [CITY_WEATHER_PROPERTIES.feelsLike]: cityWeatherInfo.main['feels_like'],
          [CITY_WEATHER_PROPERTIES.weather]: getWeather(cityWeatherInfo),
          [CITY_WEATHER_PROPERTIES.sunrise]: getSunrise(cityWeatherInfo),
          [CITY_WEATHER_PROPERTIES.sunset]: getSunset(cityWeatherInfo),
        },
      };
    })
    .catch(error => alert(ERROR_MESSAGE + error.message));
}
