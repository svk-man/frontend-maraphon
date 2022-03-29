export const UI_ELEMENTS = {
  FORM: document.querySelector('.form'),
  OUTPUT: {
    GENDER: document.querySelector('.output-gender'),
    NATION: document.querySelector('.output-nation'),
  },
};

export function setOutputGender(name, gender) {
  UI_ELEMENTS.OUTPUT.GENDER.textContent = `${name} is ${gender}`;
}

export function setOutputNation(countries) {
  UI_ELEMENTS.OUTPUT.NATION.textContent = `Probable nationality: ${countries}`;
}

export function clearOutput() {
  UI_ELEMENTS.OUTPUT.GENDER.textContent = '';
  UI_ELEMENTS.OUTPUT.NATION.textContent = '';
}
