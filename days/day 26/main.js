/*
Напишите функцию ucFirst(str), возвращающую строку str с заглавным первым символом. Например:

ucFirst("вася") == "Вася";
*/
function ucFirst(str) {
  //return str.charAt().toUpperCase() + str.slice(1).toLowerCase();
  return str.length ? str[0].toUpperCase() + str.slice(1).toLowerCase() : '';
}

console.log(ucFirst("Вася"));
console.log();

/*
Напишите функцию checkSpam(str), возвращающую true, если str содержит 'viagra' или 'XXX', а иначе false.

Функция должна быть нечувствительна к регистру:

checkSpam('buy ViAgRA now') == true
checkSpam('free xxxxx') == true
checkSpam("innocent rabbit") == false
*/
function checkSpam(str) {
  let lowerStr = str.toLowerCase();
  return lowerStr.includes('viagra') || lowerStr.includes('xxx');
}

console.log(checkSpam('buy ViAgRA now') === true);
console.log(checkSpam('free xxxxx') === true);
console.log(checkSpam("innocent rabbit") === false);
console.log();

/*
Создайте функцию truncate(str, maxlength), которая проверяет длину строки str и, если она превосходит maxlength,
заменяет конец str на "…", так, чтобы её длина стала равна maxlength.

Результатом функции должна быть та же строка, если усечение не требуется, либо, если необходимо, усечённая строка.

truncate("Вот, что мне хотелось бы сказать на эту тему:", 20) = "Вот, что мне хотело…"

truncate("Всем привет!", 20) = "Всем привет!"
*/
function truncate(str, maxlength) {
  return str.length > maxlength ?
    `${str.slice(0, maxlength - 1)}…` : str;
}

console.log(truncate('Вот, что мне хотелось бы сказать на эту тему:', 20) === 'Вот, что мне хотело…');
console.log(truncate('Всем привет!', 20) === 'Всем привет!');
console.log();

/*
Есть стоимость в виде строки "$120". То есть сначала идёт знак валюты, а затем – число.

Создайте функцию extractCurrencyValue(str), которая будет из такой строки выделять числовое значение и возвращать его.

alert( extractCurrencyValue('$120') === 120 ); // true
*/
function extractCurrencyValue(str) {
  return Number(str.slice(1));
}

console.log(extractCurrencyValue('$120') === 120); // true