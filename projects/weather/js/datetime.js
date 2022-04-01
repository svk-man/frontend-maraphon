const MONTHS = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

export function formatDate(date) {
  return `${date.getDate()} ${MONTHS[date.getMonth()]}`;
}

export function formatTime(date) {
  return `${date.getHours()}:${date.getMinutes()}`;
}
