/*
Напишите функцию camelize(str), которая преобразует строки вида «my-short-string» в «myShortString».

То есть дефисы удаляются, а все слова после них получают заглавную букву.

Примеры:

camelize("background-color") == 'backgroundColor';
camelize("list-style-image") == 'listStyleImage';
camelize("-webkit-transition") == 'WebkitTransition';
P.S. Подсказка: используйте split, чтобы разбить строку на массив символов, потом переделайте всё как нужно и методом join соедините обратно.
*/
function camelize(str) {
  return str
    .split('-')
    .map((item, index) => (index > 0) ? ucFirst(item) : item)
    .join('');
}

function ucFirst(str) {
  return str.charAt(str[0]).toUpperCase() + str.slice(1);
}

console.log(camelize("background-color") === 'backgroundColor');
console.log(camelize("list-style-image") === 'listStyleImage');
console.log(camelize("-webkit-transition") === 'WebkitTransition');
console.log();

/*
Напишите функцию filterRange(arr, a, b), которая принимает массив arr, ищет в нём элементы между a и b и отдаёт массив этих элементов.

Функция должна возвращать новый массив и не изменять исходный.

Например:
let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4);

alert( filtered ); // 3,1 (совпадающие значения)

alert( arr ); // 5,3,8,1 (без изменений)
*/
function filterRange(arr, a, b) {
  return arr.filter(item => (item >= a && item <= b));
}

let arr = [5, 3, 8, 1];
let filtered = filterRange(arr, 1, 4);

console.log(filtered); // 3,1 (совпадающие значения)
console.log(arr); // 5,3,8,1 (без изменений)
console.log();

/*
Напишите функцию filterRangeInPlace(arr, a, b), которая принимает массив arr и удаляет из него все значения кроме тех, которые находятся между a и b. То есть, проверка имеет вид a ≤ arr[i] ≤ b.

Функция должна изменять принимаемый массив и ничего не возвращать.

Например:

let arr = [5, 3, 8, 1];

filterRangeInPlace(arr, 1, 4); // удалены числа вне диапазона 1..4

alert( arr ); // [3, 1]
*/
function filterRangeInPlace(arr, a, b) {
  arr.forEach((item, index) => ((item < a || item > b) ? arr.splice(index, 1) : item));
}

arr = [5, 3, 8, 1];

filterRangeInPlace(arr, 1, 4); // удалены числа вне диапазона 1..4
console.log(arr); // [3, 1]
console.log();

/*
Сортировать в порядке по убыванию
let arr = [5, 2, 1, -10, 8];

// ... ваш код для сортировки по убыванию

alert( arr ); // 8, 5, 2, 1, -10
*/
arr = [5, 2, 1, -10, 8];

arr.sort((a, b) => b - a);

console.log(arr); // 8, 5, 2, 1, -10
console.log();

/*
У нас есть массив строк arr. Нужно получить отсортированную копию, но оставить arr неизменённым.

Создайте функцию copySorted(arr), которая будет возвращать такую копию.

let arr = ["HTML", "JavaScript", "CSS"];

let sorted = copySorted(arr);

alert( sorted ); // CSS, HTML, JavaScript
alert( arr ); // HTML, JavaScript, CSS (без изменений)
*/
function copySorted(arr) {
  return arr.slice().sort();
}

arr = ["HTML", "JavaScript", "CSS"];
let sorted = copySorted(arr);

console.log(sorted); // CSS, HTML, JavaScript
console.log(arr); // HTML, JavaScript, CSS (без изменений)
console.log();

/*
Создайте функцию конструктор Calculator, которая создаёт «расширяемые» объекты калькулятора.

Задание состоит из двух частей.

Во-первых, реализуйте метод calculate(str), который принимает строку типа "1 + 2" в формате «ЧИСЛО оператор ЧИСЛО» (разделено пробелами) и возвращает результат. Метод должен понимать плюс + и минус -.

Пример использования:

let calc = new Calculator;

alert( calc.calculate("3 + 7") ); // 10
Затем добавьте метод addMethod(name, func), который добавляет в калькулятор новые операции. Он принимает оператор name и функцию с двумя аргументами func(a,b), которая описывает его.

Например, давайте добавим умножение *, деление / и возведение в степень **:

let powerCalc = new Calculator;
powerCalc.addMethod("*", (a, b) => a * b);
powerCalc.addMethod("/", (a, b) => a / b);
powerCalc.addMethod("**", (a, b) => a ** b);

let result = powerCalc.calculate("2 ** 3");
alert( result ); // 8
Для этой задачи не нужны скобки или сложные выражения.
Числа и оператор разделены ровно одним пробелом.
Не лишним будет добавить обработку ошибок.
*/
class Calculator {
  operations = {};

  constructor() {
    this.operations['+'] = (a, b) => a + b;
    this.operations['-'] = (a, b) => a - b;
  }

  calculate(str) {
    const strArr = str.split(' ');

    const firstOperand = +strArr[0];
    const operation = strArr[1];
    const secondOperand = +strArr[2];

    const isValidExpression = this.operations[operation] && isFinite(firstOperand) && isFinite(secondOperand);
    if (!isValidExpression) {
      return NaN;
    }

    return this.operations[operation](firstOperand, secondOperand);
  }

  addMethod(name, func) {
    this.operations[name] = func;
  }
}

let powerCalc = new Calculator;
console.log(powerCalc.calculate("3 + 7"));

powerCalc.addMethod("*", (a, b) => a * b);
powerCalc.addMethod("/", (a, b) => a / b);
powerCalc.addMethod("**", (a, b) => a ** b);

let result = powerCalc.calculate("2 ** 3");
console.log(result); // 8
console.log();

/*
У вас есть массив объектов user, и в каждом из них есть user.name. Напишите код, который преобразует их в массив имён.

Например:

let vasya = { name: "Вася", age: 25 };
let petya = { name: "Петя", age: 30 };
let masha = { name: "Маша", age: 28 };

let users = [ vasya, petya, masha ];

let names = // ... ваш код

alert( names ); // Вася, Петя, Маша
*/
let vasya = { name: "Вася", age: 25 };
let petya = { name: "Петя", age: 30 };
let masha = { name: "Маша", age: 28 };

let users = [ vasya, petya, masha ];

let names = users.map(item => item.name);

console.log(names);

/*
У вас есть массив объектов user, и у каждого из объектов есть name, surname и id.

Напишите код, который создаст ещё один массив объектов с параметрами id и fullName, где fullName – состоит из name и surname.

Например:

let vasya = { name: "Вася", surname: "Пупкин", id: 1 };
let petya = { name: "Петя", surname: "Иванов", id: 2 };
let masha = { name: "Маша", surname: "Петрова", id: 3 };

let users = [ vasya, petya, masha ];

let usersMapped = // ... ваш код ...

usersMapped = [
  { fullName: "Вася Пупкин", id: 1 },
  { fullName: "Петя Иванов", id: 2 },
  { fullName: "Маша Петрова", id: 3 }
]

alert( usersMapped[0].id ) // 1
alert( usersMapped[0].fullName ) // Вася Пупкин
Итак, на самом деле вам нужно трансформировать один массив объектов в другой. Попробуйте использовать =>. Это небольшая уловка.
*/
vasya = { name: "Вася", surname: "Пупкин", id: 1 };
petya = { name: "Петя", surname: "Иванов", id: 2 };
masha = { name: "Маша", surname: "Петрова", id: 3 };

users = [ vasya, petya, masha ];

let usersMapped = users.map(item => ({
  'id': item.id,
  'fullName': item.name + ' ' + item.surname
}));

console.log(usersMapped[0].id); // 1
console.log(usersMapped[0].fullName); // Вася Пупкин
console.log();

/*
Напишите функцию sortByAge(users), которая принимает массив объектов со свойством age и сортирует их по нему.

Например:

let vasya = { name: "Вася", age: 25 };
let petya = { name: "Петя", age: 30 };
let masha = { name: "Маша", age: 28 };

let arr = [ vasya, petya, masha ];

sortByAge(arr);

// теперь: [vasya, masha, petya]
alert(arr[0].name); // Вася
alert(arr[1].name); // Маша
alert(arr[2].name); // Петя
*/
vasya = { name: "Вася", age: 25 };
petya = { name: "Петя", age: 30 };
masha = { name: "Маша", age: 28 };

arr = [ vasya, petya, masha ];

function sortByAge(users) {
  users.sort((firstUser, secondUser) => firstUser.age - secondUser.age);
}

sortByAge(arr);

// теперь: [vasya, masha, petya]
console.log(arr[0].name); // Вася
console.log(arr[1].name); // Маша
console.log(arr[2].name); // Петя
console.log();

/*
Напишите функцию shuffle(array), которая перемешивает (переупорядочивает случайным образом) элементы массива.

Многократные прогоны через shuffle могут привести к разным последовательностям элементов. Например:

let arr = [1, 2, 3];

shuffle(arr);
// arr = [3, 2, 1]

shuffle(arr);
// arr = [2, 1, 3]

shuffle(arr);
// arr = [3, 1, 2]
// ...
Все последовательности элементов должны иметь одинаковую вероятность.
Например, [1,2,3] может быть переупорядочено как [1,2,3] или [1,3,2], или [3,1,2] и т.д., с равной вероятностью каждого случая.
*/
console.log();
function shuffle(arr) {
  let result = [];

  arr.forEach(item => {
    Math.round(Math.random()) ? result.push(item) : result.unshift(item);
  });

  return result;
}

arr = [1, 2, 3];
console.log(shuffle(arr));
console.log(shuffle(arr));
console.log(shuffle(arr));
console.log();

// подсчёт вероятности для всех возможных вариантов
let count = {
  '123': 0,
  '132': 0,
  '213': 0,
  '231': 0,
  '321': 0,
  '312': 0
};

for (let i = 0; i < 1000000; i++) {
  let array = [1, 2, 3];
  array = shuffle(array);
  count[array.join('')]++;
}

// показать количество всех возможных вариантов
for (let key in count) {
  console.log(`${key}: ${count[key]}`);
}

console.log();

/*
Напишите функцию getAverageAge(users), которая принимает массив объектов со свойством age и возвращает средний возраст.

Формула вычисления среднего арифметического значения: (age1 + age2 + ... + ageN) / N.

Например:

let vasya = { name: "Вася", age: 25 };
let petya = { name: "Петя", age: 30 };
let masha = { name: "Маша", age: 29 };

let arr = [ vasya, petya, masha ];

alert( getAverageAge(arr) ); // (25 + 30 + 29) / 3 = 28
*/
vasya = { name: "Вася", age: 25 };
petya = { name: "Петя", age: 30 };
masha = { name: "Маша", age: 29 };

arr = [ vasya, petya, masha ];

function getAverageAge(arr) {
  return arr.reduce((sumAge, user) => sumAge + user.age, 0) / arr.length;
}

console.log(getAverageAge(arr)); // (25 + 30 + 29) / 3 = 28
console.log();

/*
Пусть arr – массив строк.

Напишите функцию unique(arr), которая возвращает массив, содержащий только уникальные элементы arr.

Например:

function unique(arr) {
  // ваш код
}

let strings = ["кришна", "кришна", "харе", "харе",
  "харе", "харе", "кришна", "кришна", ":-O"
];

alert( unique(strings) ); // кришна, харе, :-O
*/
let strings = ["кришна", "кришна", "харе", "харе",
  "харе", "харе", "кришна", "кришна", ":-O"
];

function unique(arr) {
  let result = [];

  arr.forEach(item => !result.includes(item) ? result.push(item) : null);

  return result;
}

console.log(unique(strings)); // кришна, харе, :-O