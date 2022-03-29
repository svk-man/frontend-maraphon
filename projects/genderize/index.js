const UI_ELEMENTS = {
  FORM: document.querySelector('.form'),
  OUTPUT: {
    NAME: document.querySelector('.output-name'),
    NATION: document.querySelector('.output-nation'),
  },
};

const SERVER_URL = {
  NAME: 'https://api.genderize.io',
  NATION: 'https://api.nationalize.io',
};

UI_ELEMENTS.FORM.addEventListener('submit', (event) => {
  event.preventDefault();

  const nameField = event.target.children[0];
  const name = nameField.value;

  if (name) {
    const URL = {
      NAME: `${SERVER_URL.NAME}?name=${name}`,
      NATION: `${SERVER_URL.NATION}?name=${name}`,
    }
  
    fetch(URL.NAME)
    .then(response => response.json())
    .then(info => {
      UI_ELEMENTS.OUTPUT.NAME.textContent = `${name} is ${info['gender']}`;
    });

    fetch(URL.NATION)
    .then(response => response.json())
    .then(info => {
      const countries = info['country'].map(country => country['country_id']).join(', ');
      UI_ELEMENTS.OUTPUT.NATION.textContent = `Probable nationality: ${countries}`;
    });
  }
});

const formField = UI_ELEMENTS.FORM.children[0];
formField.addEventListener('change', () => {
  UI_ELEMENTS.OUTPUT.NAME.textContent = '';
  UI_ELEMENTS.OUTPUT.NATION.textContent = '';
});
