function calc(operator, operand1, operand2) {
  let result = '';
  operand1 = Number(operand1);
  operand2 = Number(operand2);

  function isValidOperand(operand) {
    return operand !== undefined && typeof(operand) === 'number' && !isNaN(operand);
  }

  if (isValidOperand(operand1) && isValidOperand(operand2)) {
    const operators = {
      'add': operand1 + operand2,
      'sub': operand1 - operand2,
      'mult': operand1 * operand2,
      'div': (operand2 === 0 ? 'Error: division by zero' : operand1 / operand2),
      'mod': (operand2 === 0 ? 'Error: division by zero' : operand1 % operand2),
      'pow': operand1 ** operand2,
    };
    
    result = operators[operator] !== undefined ? operators[operator] : 'Error: unknown operator';
  } else {
    result = 'Error: not valid operand';
  }

  return result;
}

console.log('Test 0: 0 * 50:', calc('mult', 0, 50));
console.log('Test 1: 30 + 10:', calc('add', 30, 10));
console.log('Test 2: 30 - 10:', calc('sub', 30, 10));
console.log('Test 3: 30 * 10:', calc('mult', 30, 10));
console.log('Test 4: 30 / 10:', calc('div', 30, 10));
console.log('Test 5: 30 % 20:', calc('mod', 30, 20));
console.log('Test 6: 2 ** 5:', calc('pow', 2, 5));
console.log('Test 7: is unknown operator?:', calc('unk', 2, 5));
console.log('Test 8: 10 / 0:', calc('div', 10, 0));
console.log('Test 9: 10 % 0:', calc('mod', 10, 0));
console.log('Test 10: operand2 - undefined:', calc('add', 10));
console.log('Test 11: operand2 - string:', calc('add', 10, 'string'));
console.log('Test 12: operand1 and operand2 - string type, but include only numbers:', calc('add', '123', '32'));
console.log('Test 13: operand1 and operand2 - string type, but include numbers and symbols:', calc('add', '123', '32as'));
