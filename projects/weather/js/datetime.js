const MONTHS = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

export function formatDate(date) {
  return `${date.getDate()} ${MONTHS[date.getMonth()]}`;
}

export function formatTime(date) {
	const hours = date.getHours();
	const minutes = date.getHours();
	const addLeadZero = (datePart) => {
		return `${datePart <= 9 ? '0' : ''}${datePart}`;
	}

  return `${addLeadZero(hours)}:${addLeadZero(minutes)}`;
}
