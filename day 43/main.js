const output = document.querySelector('.calc__output');
const OUTPUT_MAX_SIZE = 5;

const clearBtn = document.querySelector('.calc__clear-btn');
clearBtn.addEventListener('click', clearOutput);

const numberBtns = document.querySelectorAll('.calc__number-btn');
for (const numberBtn of numberBtns) {
  numberBtn.addEventListener('click', addNumberToOutput);
}

const deleteBtn = document.querySelector('.calc__delete-btn');
deleteBtn.addEventListener('click', deleteSymbolFromOutput);

const operatorBtns = document.querySelectorAll('.calc__operator-btn');
for (const operatorBtn of operatorBtns) {
  operatorBtn.addEventListener('click', calculate);
}

function clearOutput() {
  output.textContent = '0';
  operand1 = null;
  operation = null;
  operand2 = null;
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

  if (isEmptyOutput() || isOperationPrevious) {
    outputText = '';
  }

  const isPossibleToAddToOutput = outputText.length < OUTPUT_MAX_SIZE;
  if (isPossibleToAddToOutput) {
    output.textContent = outputText + numberBtnText;
    isOperationPrevious = false;
  }
}

function deleteSymbolFromOutput() {
  const outputText = output.textContent;

  output.textContent = outputText.slice(0, outputText.length - 1);
  if (!output.textContent.length) {
    clearOutput();
  }
}

const OPERATIONS = {
  ADD: 'add',
  SUB: 'sub',
  MULT: 'mult',
  DIV: 'div',
  EQUAL: 'equal',
  MOD: 'mod',
  POW: 'pow',
};

const OPERATION_BTNS = {
  '+': OPERATIONS.ADD,
  '–': OPERATIONS.SUB,
  '×': OPERATIONS.MULT,
  '÷': OPERATIONS.DIV,
  '=': OPERATIONS.EQUAL,
};

let isOperationPrevious = false;
let operand1 = null;
let operation = null;
let operand2 = null;
function calculate(event) {
  if (!isOperationPrevious) {
    if (!operand1) {
      operand1 = output.textContent;
    } else {
      operand2 = output.textContent;
    }

    if (operand1 && operation && operand2) {
      const result = calc(operation, operand1, operand2);
      output.textContent = result;
      operand1 = result;
    }
  }

  if (OPERATION_BTNS[event.target.textContent] !== OPERATIONS.EQUAL) {
    operation = OPERATION_BTNS[event.target.textContent];
    operand2 = null;
  }

  isOperationPrevious = true;
}

const ERROR_MESSAGE = 'ERROR';
function calc(operator, operand1, operand2) {
  let result = '';
  operand1 = Number(operand1);
  operand2 = Number(operand2);

  function isValidOperand(operand) {
    return operand !== undefined && typeof(operand) === 'number' && !isNaN(operand);
  }

  if (isValidOperand(operand1) && isValidOperand(operand2)) {
    const operators = {
      [OPERATIONS.ADD]: operand1 + operand2,
      [OPERATIONS.SUB]: operand1 - operand2,
      [OPERATIONS.MULT]: operand1 * operand2,
      [OPERATIONS.DIV]: (operand2 === 0 ? `${ERROR_MESSAGE}: division by zero` : operand1 / operand2),
      [OPERATIONS.MOD]: (operand2 === 0 ? `${ERROR_MESSAGE}: division by zero` : operand1 % operand2),
      [OPERATIONS.POW]: operand1 ** operand2,
    };

    result = operators[operator] !== undefined ? String(operators[operator]) : `${ERROR_MESSAGE}: unknown operator`;
  } else {
    result = `${ERROR_MESSAGE}: not valid operand`;
  }

  return result;
}
