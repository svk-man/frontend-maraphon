let favouriteCities = [];

export function addFavouriteCity(name) {
  console.log(name);
  favouriteCities.push(prepareCityName(name));
}

export function removeFavouriteCity(name) {
  const index = favouriteCities.indexOf(prepareCityName(name));
  const isFavouriteCityExists = index !== -1;
  if (isFavouriteCityExists) {
    favouriteCities.splice(index, 1);
  }
}

export function isFavouriteCityExists(name) {
  return favouriteCities.includes(prepareCityName(name));
}

function prepareCityName(name) {
  return name[0].toUpperCase() + name.slice(1).toLowerCase();
}

export function printFavouriteCities() {
  console.log(favouriteCities);
}

export function isEmptyFavouriteCities() {
  return !!favouriteCities.length;
}