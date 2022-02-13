import { UI_ELEMENTS } from "./view.js";

const DATASET_WEATHER_TAB = 'weatherTab';

UI_ELEMENTS.WEATHER_TABS_PARENT.addEventListener('click', changeWeatherTabHandler);

function changeWeatherTabHandler(event) {
  const weatherTab = event.target;
  const isWeatherTab = weatherTab.classList.contains('weather-app__weather-tab');
  if (isWeatherTab) {
    const weatherTabKey = weatherTab.dataset[DATASET_WEATHER_TAB];

    UI_ELEMENTS.WEATHER_ITEMS.forEach(weatherItem => {
      if (weatherItem.classList.contains(`weather-${weatherTabKey}`)) {
        weatherItem.classList.remove('hidden');
      } else {
        weatherItem.classList.add('hidden');
      }
    });

    UI_ELEMENTS.WEATHER_TABS.forEach(weatherTab => {
      weatherTab.classList.remove('weather-app__weather-tab--active');
    });

    weatherTab.classList.add('weather-app__weather-tab--active');
  }
}