/*
Что выведет следующий код?

let fruits = ["Яблоки", "Груша", "Апельсин"];

// добавляем новое значение в "копию"
let shoppingCart = fruits;
shoppingCart.push("Банан");

// что в fruits?
alert( fruits.length ); // ?
*/
let fruits = ["Яблоки", "Груша", "Апельсин"];

// добавляем новое значение в "копию"
let shoppingCart = fruits;
shoppingCart.push("Банан");

// что в fruits?
console.log( fruits.length ); // 4
console.log();

/*
Давайте произведём 5 операций с массивом.

Создайте массив styles с элементами «Джаз» и «Блюз».
Добавьте «Рок-н-ролл» в конец.
Замените значение в середине на «Классика». Ваш код для поиска значения в середине должен работать для массивов с любой длиной.
Удалите первый элемент массива и покажите его.
Вставьте «Рэп» и «Регги» в начало массива.

Массив по ходу выполнения операций:
Джаз, Блюз
Джаз, Блюз, Рок-н-ролл
Джаз, Классика, Рок-н-ролл
Классика, Рок-н-ролл
Рэп, Регги, Классика, Рок-н-ролл
*/
let styles = ['Джаз', 'Блюз'];
console.log(styles);

styles.push('Рок-н-ролл', 'Кратко');
console.log(styles);

styles[Math.floor((styles.length - 1) / 2)] = 'Классика';
console.log(styles);

const removedItem = styles.shift();
console.log(removedItem);
console.log(styles);

styles.unshift('Рэп', 'Регги');
console.log(styles);
console.log();

/*
Каков результат? Почему?

let arr = ["a", "b"];

arr.push(function() {
  alert( this );
})

arr[2](); // ?
*/
let arr = ["a", "b"];

arr.push(function() {
  console.log( this );
})

arr[2](); // ?
console.log();

/*
Напишите функцию sumInput(), которая:

Просит пользователя ввести значения, используя prompt и сохраняет их в массив.
Заканчивает запрашивать значения, когда пользователь введёт не числовое значение, пустую строку или нажмёт «Отмена».
Подсчитывает и возвращает сумму элементов массива.
P.S. Ноль 0 – считается числом, не останавливайте ввод значений при вводе «0».
*/
function sumInput() {
  const numbers = [];
  let value = 0;
  let sum = 0;
  
  function isValidNumber(value) {
    const number = +value;
    return value != '' && value !== null && isFinite(number);
  }

  do {
    value = prompt('Введите числовое значение');
    if (isValidNumber(value)) {
      numbers.push(+value);
    } else {
      break;
    }
  } while (true);

  for (let number of numbers) {
    sum += number;
  }

  return sum;
}

/*console.log(sumInput());*/

/*
На входе массив чисел, например: arr = [1, -2, 3, 4, -9, 6].

Задача: найти непрерывный подмассив в arr, сумма элементов в котором максимальна.

Функция getMaxSubSum(arr) должна возвращать эту сумму.

Например:
getMaxSubSum([-1, 2, 3, -9]) = 5 (сумма выделенных)
getMaxSubSum([2, -1, 2, 3, -9]) = 6
getMaxSubSum([-1, 2, 3, -9, 11]) = 11
getMaxSubSum([-2, -1, 1, 2]) = 3
getMaxSubSum([100, -9, 2, -3, 5]) = 100
getMaxSubSum([1, 2, 3]) = 6 (берём все)

Если все элементы отрицательные – ничего не берём(подмассив пустой) и сумма равна «0»:
getMaxSubSum([-1, -2, -3]) = 0

Попробуйте придумать быстрое решение: O(n2), а лучше за О(n) операций.
*/
function getMaxSubSum(arr) {
  let sum = 0;
  let max = 0;

  for (let arItem of arr) {
    if (arItem > 0) {
      max += arItem;
    } else {
      if (max > sum) {
        sum = max;
      }

      max = 0;
    }
  }

  return max > sum ? max : sum;
}

console.log(getMaxSubSum([-1, 2, 3, -9]));
console.log(getMaxSubSum([2, -1, 2, 3, -9]));
console.log(getMaxSubSum([-1, 2, 3, -9, 11]));
console.log(getMaxSubSum([-2, -1, 1, 2]));
console.log(getMaxSubSum([100, -9, 2, -3, 5]));
console.log(getMaxSubSum([1, 2, 3]));
console.log(getMaxSubSum([-1, -2, -3]));