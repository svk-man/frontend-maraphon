// Две функции - один объект
const obj = {};

function A() { return obj; }
function B() { return obj; }

let a = new A();
let b = new B();

console.log( a == b ); // true


// Создайте калькулятор при помощи конструктора, new Calculator
function Calculator() {
	this.read = function () {
		const a = +prompt("Введите число a", 0);
		const b = +prompt("Введите число b", 0);

		this.a = a;
		this.b = b;
	}

	this.sum = function () {
		return this.a + this.b;
	}

	this.mul = function () {
		return this.a * this.b;
	}
}

let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );


// Создайте new Accumulator
function Accumulator(startingValue) {
	this.value = startingValue;

	this.read = function () {
		const value = +prompt("Введите число", 0);

		this.value += value;
	}
}

let accumulator = new Accumulator(1); // начальное значение 1

accumulator.read(); // прибавляет введённое пользователем значение к текущему значению
accumulator.read(); // прибавляет введённое пользователем значение к текущему значению

alert(accumulator.value); // выведет сумму этих значений