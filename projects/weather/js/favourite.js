let _favouriteCities = [];

export function addFavouriteCity(name) {
  _favouriteCities.push(prepareCityName(name));
}

export function removeFavouriteCity(name) {
  const index = _favouriteCities.indexOf(prepareCityName(name));
  const isFavouriteCityExists = index !== -1;
  if (isFavouriteCityExists) {
    _favouriteCities.splice(index, 1);
  }
}

export function isFavouriteCityExists(name) {
  return _favouriteCities.includes(prepareCityName(name));
}

function prepareCityName(name) {
  return name[0].toUpperCase() + name.slice(1).toLowerCase();
}

export function isEmptyFavouriteCities() {
  return !!_favouriteCities.length;
}

export function getFavouriteCities() {
  return _favouriteCities;
}

export function saveFavouriteCities(favouriteCities) {
  _favouriteCities = favouriteCities;
}