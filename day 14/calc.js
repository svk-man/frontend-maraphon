function calc(operation, operand1, operand2) {
  function isValidOperand(operand) {
    return operand && typeof(operand) === 'number' && !isNaN(operand);
  }

  let result = '';
  operand1 = Number(operand1);
  operand2 = Number(operand2);

  if (isValidOperand(operand1) && isValidOperand(operand2)) {
    switch (operation) {
      case 'add':
        result = operand1 + operand2;
        break;
      case 'sub':
        result = operand1 - operand2;
        break;
      case 'mul':
        result = operand1 * operand2;
        break;
      case 'div':
        result = (operand2 === 0 ? 'Error' : operand1 / operand2);
        break;
      case 'mod':
        result = operand1 % operand2;
        break;
      case 'pow':
        result = operand1 ** operand2;
        break;
      default:
        result = 'unknown operation';
    }
  } else {
    result = 'Error';
  }

  return result;
}

console.log('Test 1: 30 + 10:', calc('add', 30, 10));
console.log('Test 2: 30 - 10:', calc('sub', 30, 10));
console.log('Test 3: 30 * 10:', calc('mul', 30, 10));
console.log('Test 4: 30 / 10:', calc('div', 30, 10));
console.log('Test 5: 30 % 20:', calc('mod', 30, 20));
console.log('Test 6: 2 ** 5:', calc('pow', 2, 5));
console.log('Test 7: is unknown operation?:', calc('unk', 2, 5));
console.log('Test 8: 10 / 0:', calc('div', 10, 0));
console.log('Test 9: operand2 - undefined:', calc('add', 10));
console.log('Test 10: operand2 - string:', calc('add', 10, 'string'));
console.log('Test 11: operand1 and operand2 - string type, but include only numbers:', calc('add', '123', '32'));
console.log('Test 12: operand1 and operand2 - string type, but include numbers and symbols:', calc('add', '123', '32as'));