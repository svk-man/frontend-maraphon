// Задача - Фильтрация уникальных элементов массива
function unique(arr) {
  const set = new Set(arr);

	return Array.from(set);
}

let values = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

console.log( unique(values) ); // Hare,Krishna,:-O


// Задача - Отфильтруйте анаграммы
function aclean(arr) {
	const map = new Map();

	arr.forEach(item => {
		const getKey = (item) => {
			return item
				.toLowerCase()
				.split("").sort().join("");
		}

		map.set(getKey(item), item);
	});

	return Array.from(map.values());
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

console.log( aclean(arr) );


// Задача - Перебираемые ключи
let map = new Map();

map.set("name", "John");

let keys = [...map.keys()];

// Error: keys.push is not a function
// Ошибка: keys.push -- это не функция
keys.push("more");