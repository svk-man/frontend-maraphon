import { Storage } from "./storage.js";

// Basic operations
const names = new Storage('names');

console.log('clear');
names.clear();

console.log('get: ', names.get());

console.log('set');
names.set('Stefan');

console.log('get: ', names.get());

console.log('clear');
names.clear();

console.log('get: ', names.get());

console.log('isEmpty: ', names.isEmpty());

console.log('set');
names.set('Joseph');

console.log('isEmpty: ', names.isEmpty());

console.log('\n');

// Add new Storage instances
const fruits = new Storage('fruits');

fruits.set(['apple', 'raspberry', 'pear', 'pineapple', 'mango']);
console.log('get fruits: ', fruits.get().split(','));

const user = new Storage('user');
user.set(JSON.stringify({name: 'Egor', age: '35'}));
console.log('get user: ', JSON.parse(user.get()));