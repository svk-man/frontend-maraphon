function truncate(str, maxlength = 10) {
  return str.slice(0, maxlength);
}

function showVerticalMessage(str) {
  let changedStr = truncate(str);
  if (changedStr.startsWith('м')) {
    changedStr[0] = changedStr[0].toUpperCase();
  }

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
showVerticalMessage('великий фронтенд марафон');
