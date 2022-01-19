import data from './data.json';

for (const user of data["users"]) {
  console.log(`${user.firstName} ${user.lastName}, born at ${user.dateOfBirth} - ${user.knowsAs}`);
}

console.log('\n\n');

let jsonData = JSON.stringify(data);
console.log(jsonData);

console.log('\n\n');

jsonData = JSON.stringify(data, function(key, value) {
  return key === 'dateOfBirth' ? undefined : value;
}, 10);
console.log(jsonData);

console.log('\n\n');

console.log(JSON.parse(jsonData, function(key, value) {
  return key === 'knowsAs' ? undefined : value;
}));
