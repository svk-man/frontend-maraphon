import { Storage } from "./storage.js";

// Basic operations
const name = new Storage('name');

console.log('LocalStorage: ', name.isLocalStorage(), 'SessionStorage', name.isSessionStorage());

console.log('clear name');
name.clear();

console.log('get name: ', name.get());

console.log('set name Stefan');
name.set('Stefan');

console.log('get name: ', name.get());

console.log('clear name');
name.clear();

console.log('get name: ', name.get());

console.log('isEmpty: ', name.isEmpty());

console.log('set name Joseph');
name.set('Joseph');

console.log('isEmpty: ', name.isEmpty());

console.log('\n');

// Add new Storage instances
const fruits = new Storage('fruits');

fruits.set(['apple', 'raspberry', 'pear', 'pineapple', 'mango']);
console.log('get fruits: ', fruits.get().split(','));

const user = new Storage('user');
user.set(JSON.stringify({name: 'Egor', age: '35'}));
console.log('get user: ', JSON.parse(user.get()));

console.log('\n');

// Use SessionStorage
const films = new Storage('films', {storageType: 'sessionStorage'});
films.set(['Moonfall', 'Death on the Nile', 'Uncharted', 'The Batman', 'The Lost City']);
console.log('SessionStorage: ', films.isSessionStorage(), 'LocalStorage: ', films.isLocalStorage());
console.log('get films: ', films.get().split(','));
