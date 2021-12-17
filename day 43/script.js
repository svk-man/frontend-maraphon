function getOperands(text, operator) {
  let operands = ['', ''];
  let j = 0;
  for (let i = 0; i < text.length; i++) {
    const isNumber = text[i - 1] >= 0 || text[i - 1] <= 9;
    if (i > 0 && isNumber && text[i] === operator) {
      j++;
      continue;
    }

    operands[j] += text[i];
  }

  if (operands[1] === '') {
    operands[1] = (operator === '*' || operator === '/') ? '1' : '0';
  }

  return operands;
}

getOperands('1+', '+');
getOperands('5-+', '-');
getOperands('1*', '*');
getOperands('1/', '/');