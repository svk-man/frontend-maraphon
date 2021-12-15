function truncate(str, maxLength = 10) {
  return str.slice(0, maxLength);
}

function showVerticalMessage(str) {
  let truncatedStr = truncate(str);
  if (truncatedStr.startsWith('м')) {
    truncatedStr[0] = truncatedStr[0].toUpperCase();
  }

  for (const char of truncatedStr) {
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
