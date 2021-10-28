function Calc(action, a, b) {
  if (a === undefined || b === undefined) {
    return 'Error';
  }

  a = Number(a);
  b = Number(b);
  if (!(typeof a === 'number' && !isNaN(a) && typeof b === 'number' && !isNaN(b))) {
    return 'Error';
  }

  let result = '';
  switch(action) {
    case 'add':
      result = a + b;
      break;
    case 'sub':
      result = a - b;
      break;
    case 'mul':
      result = a * b;
      break;
    case 'div':
      result = (b === 0 ? 'Error' : a / b);
      break;
    case 'mod':
      result = a % b;
      break;
    case 'pow':
      result = a ** b;
      break;
    default:
      result = 'unknown operation';
  }

  return result;
}

console.log('Test 1: 30 + 10:', Calc('add', 30, 10));
console.log('Test 2: 30 - 10:', Calc('sub', 30, 10));
console.log('Test 3: 30 * 10:', Calc('mul', 30, 10));
console.log('Test 4: 30 / 10:', Calc('div', 30, 10));
console.log('Test 5: 30 % 20:', Calc('mod', 30, 20));
console.log('Test 6: 2 ** 5:', Calc('pow', 2, 5));
console.log('Test 7: 10 / 0:', Calc('div', 10, 0));
console.log('Test 8: b - undefined:', Calc('add', 10));
console.log('Test 9: b - string:', Calc('add', 10, 'string'));
console.log('Test 10: a, b - string, but numbers:', Calc('add', '123', '32'));
console.log('Test 11: a, b - string, but numbers and symbols:', Calc('add', '123', '32as'));