function toUpperCaseFirstLetter(str) {
  return str.length ? str[0].toUpperCase() + str.slice(1) : '';
}

function truncate(str, maxlength = 10) {
  return str.slice(0, maxlength) + (str.length > maxlength ? '…' : '');
}

function showVerticalMessage(str) {
  const changedStr = truncate(toUpperCaseFirstLetter(str));

  for (const char of changedStr) {
    console.log(char);
  }
}

showVerticalMessage('');
console.log('------------------')
showVerticalMessage('мАрАфОн');
console.log('------------------')
showVerticalMessage('марафон');
console.log('------------------')
showVerticalMessage('Марафон');
console.log('------------------')
showVerticalMessage('великий фро');
console.log('------------------')
showVerticalMessage('великий фронтенд марафон');