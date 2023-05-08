// Создайте дату
console.log(new Date(2012, 1, 20, 3, 12));


// Покажите день недели
function getWeekDay(date) {
	const weekDays = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

	return weekDays[date.getDay()];
}

let date1 = new Date(2012, 0, 3);  // 3 января 2012 года
console.log( getWeekDay(date1) );  // нужно вывести "ВТ"


// День недели в европейской нумерации
function getLocalDay(date) {
	const dayOfWeek = date.getDay();

	if (dayOfWeek === 0) {
		return 7;
	}

	return dayOfWeek;
}

let date2 = new Date(2012, 0, 3);  // 3 января 2012 года
console.log( getLocalDay(date2) ); // вторник, нужно показать 2


// Какой день месяца был много дней назад?
function getDateAgo(date, days) {
	const day = date.getDate();

	const newDate = new Date(date.getMilliseconds());
	newDate.setDate(day - days);

	return newDate.getDate();
}

let date3 = new Date(2015, 0, 2);

console.log( getDateAgo(date3, 1) ); // 1, (1 Jan 2015)
console.log( getDateAgo(date3, 2) ); // 31, (31 Dec 2014)
console.log( getDateAgo(date3, 365) ); // 2, (2 Jan 2014)


// Последнее число месяца?
function getLastDayOfMonth(year, month) {
	const date = new Date(year, month + 1, 0);

	return date.getDate();
}

console.log(getLastDayOfMonth(2012, 1));


// Сколько сегодня прошло секунд?
function getSecondsToday() {
	const date1 = new Date();
	const date2 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate(), 0, 0, 0, 0);

	return Math.round((date1 - date2) / 1000);
}

console.log(getSecondsToday());


// Сколько секунд осталось до завтра?
function getSecondsToTomorrow() {
	const date1 = new Date();
	const date2 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate() + 1, 0, 0, 0, 0);

	return Math.round((date2 - date1) / 1000);
}

console.log(getSecondsToTomorrow());


// Форматирование относительной даты
function formatDate(date) {
	const diff = new Date() - date;

	const seconds = diff / 1000;
	if (seconds <= 1) {
		return 'прямо сейчас';
	}

	const minutes = seconds / 60;
	if (minutes <= 1) {
		return `${seconds} сек. назад`;
	}

	const hours = minutes / 60;
	if (hours <= 1) {
		return `${minutes} мин. назад`;
	}

	const dateParts = [
		'0' + date.getDate(),
		'0' + date.getMonth(),
		date.getFullYear(),
		'0' + date.getHours(),
		'0' + date.getMinutes(),
	];

	const newDateParts = dateParts.map(datePart => {
		return datePart.toString().slice(-2);
	});

	return `${newDateParts[0]}.${newDateParts[1]}.${newDateParts[2]} ${newDateParts[3]}:${newDateParts[4]}`;
}

console.log( formatDate(new Date(new Date - 1)) ); // "прямо сейчас"
console.log( formatDate(new Date(new Date - 30 * 1000)) ); // "30 сек. назад"
console.log( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 мин. назад"
// вчерашняя дата вроде 31.12.2016, 20:00
console.log( formatDate(new Date(new Date - 86400 * 1000)) );