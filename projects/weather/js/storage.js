const FAVOURITE_CITIES_KEY = 'favourite-cities';
const CURRENT_CITY_KEY = 'current-city';

export function saveFavouriteCities(favouriteCities) {
  localStorage.setItem(FAVOURITE_CITIES_KEY, favouriteCities);
}

export function getFavouriteCities() {
  return localStorage.getItem(FAVOURITE_CITIES_KEY).split(',');
}

export function isEmptyFavouriteCities() {
  const favouriteCities = getFavouriteCities();
  return favouriteCities === null || favouriteCities === undefined;
}

export function saveCurrentCity(currentCity) {
  localStorage.setItem(CURRENT_CITY_KEY, JSON.stringify(currentCity));
}

export function getCurrentCity() {
  return JSON.parse(localStorage.getItem(CURRENT_CITY_KEY));
}

export function isEmptyCurrentCity() {
  const currentCity = getCurrentCity();
  return currentCity === null || currentCity === undefined;
}
