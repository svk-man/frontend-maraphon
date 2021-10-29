/*
При помощи цикла for выведите чётные числа от 2 до 10
*/
function printEvenNumbers() {
  for (let i = 2; i <= 10; i++) {
    if (i % 2) continue;

    console.log(i);
  }
}

printEvenNumbers();
console.log();

function getEvenNumbers() {
  let result = [];

  for (let i = 2; i <= 10; i++) {
    if (i % 2) continue;

    result.push(i);
  }

  return result;
}

let evenNumbers = getEvenNumbers();
evenNumbers.forEach(value => console.log(value));
console.log();

/*
Перепишите код, заменив цикл for на while, без изменения поведения цикла.
*/
for (let i = 0; i < 3; i++) {
  console.log( `number ${i}!` );
}

console.log();

let i = 0;
while (i < 3) {
  console.log(`number ${i}!`);
  i++;
}

console.log();
/*
Натуральное число, большее 1, называется простым, если оно ни на что не делится, кроме себя и 1.

Другими словами, n > 1 – простое, если при его делении на любое число кроме 1 и n есть остаток.

Например, 5 это простое число, оно не может быть разделено без остатка на 2, 3 и 4.

Напишите код, который выводит все простые числа из интервала от 2 до n.

Для n = 10 результат должен быть 2,3,5,7.

P.S. Код также должен легко модифицироваться для любых других интервалов.
*/
function checkSimpleNumber(num) {
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (!(num % i)) {
      return false;
    }
  }

  return true;
}

function printSimpleNumbers(n) {
  for (let i = 2; i < n; i++) {
    if (checkSimpleNumber(i)) {
      console.log(i);
    }
  }
}

printSimpleNumbers(10);
