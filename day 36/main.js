/*
Напишите функцию printNumbers(from, to), которая выводит число каждую секунду, начиная от from и заканчивая to.

Сделайте два варианта решения.

Используя setInterval.
Используя рекурсивный setTimeout.
*/
function printNumbers(from, to) {
  let number = from;

  const timerId = setInterval(() => {
    console.log(number++);

    if (number > to) {
      clearInterval(timerId);
    }
  }, 1000);
}

function printNumbersRecursive(from, to) {
  let number = from;

  setTimeout(function tick() {
    console.log(number++);

    if (number <= to) {
      setTimeout(tick, 1000);
    }
  }, 1000);
}

printNumbers(5, 15);
