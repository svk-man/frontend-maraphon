function checkAge(age) {
  //return (age > 18) ? true : confirm('Родители разрешили?');
  return (age > 18) || confirm('Родители разрешили?');
}

function min(a, b) {
  return a < b ? a : b;
}

function pow(x, n) {
  let result = x;

  let i = 1;
  while (i < n) {
    result *= x;
    i++;
  }

  return result;
}

console.log(checkAge(20));
console.log(min(10, 20));
console.log(pow(3, 3));