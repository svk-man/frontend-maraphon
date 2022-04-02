let user = { name: "John", years: 30 };

let { name, years: age, isAdmin = false } = user;

console.log( name ); // John
console.log( age ); // 30
console.log( isAdmin ); // false

let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

function topSalary(salaries) {
  let maxSalary = 0;
  let nameMaxSalary = null;
  for (const [ name, salary ] of Object.entries(salaries)) {
    if (maxSalary < salary) {
      [nameMaxSalary, maxSalary] = [name, salary];
    }
  }

  return nameMaxSalary;
}

console.log(topSalary(salaries));