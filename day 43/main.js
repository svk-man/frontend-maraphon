const output = document.querySelector('.calc__output');
const OUTPUT_MAX_SIZE = 5;

const clearBtn = document.querySelector('.calc__clear-btn');
clearBtn.addEventListener('click', clearOutput);

const numberBtns = document.querySelectorAll('.calc__number-btn');
for (const numberBtn of numberBtns) {
  numberBtn.addEventListener('click', addNumberToOutput);
}

function clearOutput() {
  output.textContent = '0';
}

function isEmptyOutput() {
  return output.textContent === '0';
}

function addNumberToOutput(event) {
  const numberBtnText = event.target.textContent;
  let outputText = output.textContent;

  if (numberBtnText === '0' && isEmptyOutput()) {
    return;
  }

  if (isEmptyOutput()) {
    outputText = '';
  }

  const isPossibleToAddToOutput = outputText.length < OUTPUT_MAX_SIZE;
  if (isPossibleToAddToOutput) {
    output.textContent = outputText + numberBtnText;
  }
}

/*
const BTN_CLEAR_TEXT = 'C';
const BTN_ADD_TEXT = '+';
const BTN_SUB_TEXT = '–';
const BTN_MULT_TEXT = '×';
const BTN_DIV_TEXT = '÷';
const BTN_EQUAL_TEXT = '=';
const BTN_REMOVE_TEXT = String.fromCharCode('9003');
const OPERATION_ADD = 'add';
const OPERATION_SUB = 'sub';
const OPERATION_MULT = 'mult';
const OPERATION_DIV = 'div';
const OPERATION_EQUAL = 'equal';
const OPERATION_MOD = 'mod';
const OPERATION_POW = 'pow';
const ERROR_MESSAGE = 'ERROR';
const calcRes = document.querySelector('.calc__res');
const calcBtns = document.querySelectorAll('.calc__btn');
const calcBtnsOpers = {};
calcBtnsOpers[BTN_ADD_TEXT] = OPERATION_ADD;
calcBtnsOpers[BTN_SUB_TEXT] = OPERATION_SUB;
calcBtnsOpers[BTN_MULT_TEXT] = OPERATION_MULT;
calcBtnsOpers[BTN_DIV_TEXT] = OPERATION_DIV;
calcBtnsOpers[BTN_EQUAL_TEXT] = OPERATION_EQUAL;

console.log(calcBtnsOpers);

function clearResult() {
  calcRes.innerHTML = '';
}

function getOperatorFromResult() {
  for (const operator in calcBtnsOpers) {
    if (calcRes.innerHTML.includes(operator)) {
      return operator;
    }
  }

  return '';
}

function removeSymbolFromResult() {
  let result = calcRes.innerHTML;
  const resultLength = result.length;
  if (resultLength) {
    const prevSymbol = result[resultLength - 2];
    result = result.slice(0, prevSymbol === '.' ? resultLength - 2 : resultLength - 1);
    result = result === BTN_SUB_TEXT ? '' : result;
    calcRes.innerHTML = result;
  }
}

function addTextToResult(text) {
  const isZeroFound = calcRes.innerHTML === '0' && text === '0';
  const isMultFound = !calcRes.innerHTML && text === BTN_MULT_TEXT;
  const isDivFound = !calcRes.innerHTML && text === BTN_DIV_TEXT;

  if (calcRes.innerHTML.length < RES_MAX_SIZE && !isZeroFound) {
    const operator = getOperatorFromResult();
    const isOperatorText = !!calcBtnsOpers[text];
    if (operator && isOperatorText) {
      removeSymbolFromResult();
    }

    if (text.endsWith('.0')) {
      text = text.replace('.0', '');
    }

    calcRes.innerHTML += text;
    if (isMultFound || isDivFound) {
      clearResult();
    }
  }
}

function calc(operator, operand1, operand2) {
  let result = '';
  operand1 = Number(operand1);
  operand2 = Number(operand2);

  function isValidOperand(operand) {
    return operand !== undefined && typeof(operand) === 'number' && !isNaN(operand);
  }

  if (isValidOperand(operand1) && isValidOperand(operand2)) {
    const operators = {};
    operators[OPERATION_ADD] = operand1 + operand2;
    operators[OPERATION_SUB] = operand1 - operand2;
    operators[OPERATION_MULT] = operand1 * operand2;
    operators[OPERATION_DIV] = (operand2 === 0 ? `${ERROR_MESSAGE}: division by zero` : operand1 / operand2);
    operators[OPERATION_MOD] = (operand2 === 0 ? `${ERROR_MESSAGE}: division by zero` : operand1 % operand2);
    operators[OPERATION_POW] = operand1 ** operand2;

    result = operators[operator] !== undefined ? String(operators[operator]) : `${ERROR_MESSAGE}: unknown operator`;
  } else {
    result = `${ERROR_MESSAGE}: not valid operand`;
  }

  return result;
}

function calcResult() {
  const calcResText = calcRes.innerHTML;
  const operator = getOperatorFromResult();
  const isOperatorExists = !!operator;
  if (isOperatorExists) {
    const operands = calcResText.split(operator);
    if (operands[1] === '' && (operator === BTN_MULT_TEXT || operator === BTN_DIV_TEXT)) {
      operands[1] = 1;
    }

    const result = calc(calcBtnsOpers[operator], operands[0], operands[1]);
    clearResult();
    addTextToResult(!result.includes(ERROR_MESSAGE) ? Math.fround(result).toFixed(1).replace('-', BTN_SUB_TEXT) : ERROR_MESSAGE);
  }
}

for (const calcBtn of calcBtns) {
  calcBtn.onclick = function() {
    const calcResText = calcRes.innerHTML;
    const calcBtnText = calcBtn.innerHTML;
    const isClearBtn = calcBtnText === BTN_CLEAR_TEXT;
    const isNumberBtn = Number(calcBtnText) >= 0 || Number(calcBtnText) <= 9;
    const isRemoveBtn = calcBtnText === BTN_REMOVE_TEXT;
    const isOperatorBtn = !!calcBtnsOpers[calcBtnText];
    const isEqualBtn = calcBtnText === BTN_EQUAL_TEXT;
    const isCalcResTextExist = !!calcResText;
    const isCalcResTextErrorExist = calcResText.includes(ERROR_MESSAGE);

    if (isCalcResTextErrorExist) {
      clearResult();
    }

    if (isNumberBtn) {
      addTextToResult(calcBtnText);
    } else if (isOperatorBtn) {
      if (isCalcResTextExist) {
        calcResult();
      }

      if (!isEqualBtn) {
        addTextToResult(calcBtnText);
      }
    } else if (isRemoveBtn) {
      removeSymbolFromResult();
    } else if (isClearBtn) {
      clearResult();
    }
  }
}
*/