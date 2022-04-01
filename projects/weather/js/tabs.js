import { UI_ELEMENTS } from "./view.js";

const DATASET_WEATHER_TAB = 'weatherTab';

UI_ELEMENTS.WEATHER_TABS.addEventListener('click', changeWeatherTab);

function changeWeatherTab(event) {
  const currentWeatherTab = event.target;
  const isWeatherTab = currentWeatherTab.classList.contains('weather-app__weather-tab');
  if (isWeatherTab) {
    const setActiveWeatherItem = (weatherItemName) => {
      UI_ELEMENTS.WEATHER_ITEMS.forEach(weatherItem => {
        if (weatherItem.classList.contains(`weather-${weatherItemName}`)) {
          weatherItem.classList.remove('hidden');
        } else {
          weatherItem.classList.add('hidden');
        }
      });
    };

    const setActiveWeatherTab = (weatherTab) => {
      UI_ELEMENTS.WEATHER_TAB_ITEMS.forEach(weatherTabItem => {
        weatherTabItem.classList.remove('weather-app__weather-tab--active');
      });
  
      weatherTab.classList.add('weather-app__weather-tab--active');
    };

    const weatherTabKey = currentWeatherTab.dataset[DATASET_WEATHER_TAB];
    setActiveWeatherItem(weatherTabKey);
    setActiveWeatherTab(currentWeatherTab);
  }
}