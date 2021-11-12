function showVerticalMessage(str) {
  const tmpStr = truncate(ucFirst(str), 10);

  for (const char of tmpStr) {
    console.log(char);
  }
}

function ucFirst(str) {
  return str.length ? str[0].toUpperCase() + str.slice(1).toLowerCase() : '';
}

function truncate(str, maxlength) {
  return str.length > maxlength ?
    `${str.slice(0, maxlength - 1)}…` : str;
}

showVerticalMessage('');
console.log('------------------')
showVerticalMessage('мАрАфОн');
console.log('------------------')
showVerticalMessage('марафон');
console.log('------------------')
showVerticalMessage('Марафон');
console.log('------------------')
showVerticalMessage('великий фронтенд марафон');