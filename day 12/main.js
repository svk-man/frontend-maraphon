/* Перепишите конструкцию if с использованием условного оператора '?':
let result;

if (a + b < 4) {
  result = 'Мало';
} else {
  result = 'Много';
}*/
let a = 10, b = 5;
let result = (a + b < 4) ? 'Мало' : 'Много';

/*
Перепишите if..else с использованием нескольких операторов '?'.

Для читаемости рекомендуется разбить код на несколько строк.

let message;

if (login == 'Сотрудник') {
  message = 'Привет';
} else if (login == 'Директор') {
  message = 'Здравствуйте';
} else if (login == '') {
  message = 'Нет логина';
} else {
  message = '';
}
*/
let login = 'Директор';
let message = (login == 'Сотрудник') ? 'Привет' :
  (login == 'Директор') ? 'Здравствуйте' :
  (login == '') ? 'Нет логина' :
  '';

/*
Напишите условие if для проверки, что переменная age находится в диапазоне между 14 и 90 включительно.

«Включительно» означает, что значение переменной age может быть равно 14 или 90.
*/
const age = 14;
if (age >= 14 && age <= 90) {
  console.log('Входит');
}

/*
Напишите условие if для проверки, что значение переменной age НЕ находится в диапазоне 14 и 90 включительно.

Напишите два варианта: первый с использованием оператора НЕ !, второй – без этого оператора.
*/
// if (!(age >= 14 && age <= 90))
// if (age < 14 || age > 90)