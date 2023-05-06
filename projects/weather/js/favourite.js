let _favouriteCities = new Set();

export function addFavouriteCity(name) {
  _favouriteCities.add(prepareCityName(name));
}

export function removeFavouriteCity(name) {
  _favouriteCities.delete(name);
}

export function isFavouriteCityExists(name) {
  return _favouriteCities.has(prepareCityName(name));
}

function prepareCityName(name) {
  return name[0].toUpperCase() + name.slice(1).toLowerCase();
}

export function isEmptyFavouriteCities() {
  return !_favouriteCities.size;
}

export function getFavouriteCities() {
  return Array.from(_favouriteCities);
}

export function saveFavouriteCities(favouriteCities) {
  _favouriteCities = new Set(Array.from(favouriteCities));
}