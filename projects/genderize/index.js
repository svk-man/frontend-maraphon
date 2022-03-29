const UI_ELEMENTS = {
  form: document.querySelector('.form'),
  outputName: document.querySelector('.output-name'),
  outputNation: document.querySelector('.output-nation'),
};

UI_ELEMENTS.form.addEventListener('submit', function(event) {
  event.preventDefault();

  const SERVER_URL = {
    name: 'https://api.genderize.io',
    nation: 'https://api.nationalize.io',
  };

  const nameField = this.children[0];
  const name = nameField.value;

  if (name) {
    const URL = {
      name: `${SERVER_URL.name}?name=${name}`,
      nation: `${SERVER_URL.nation}?name=${name}`,
    }
  
    fetch(URL.name)
    .then(response => response.json())
    .then(info => {
      UI_ELEMENTS.outputName.textContent = `${name} is ${info['gender']}`;
    });

    fetch(URL.nation)
    .then(response => response.json())
    .then(info => {
      const countries = info['country'].map(country => country['country_id']).join(', ');
      UI_ELEMENTS.outputNation.textContent = `Probable nationality: ${countries}`;
    });
  }
});

const formField = UI_ELEMENTS.form.children[0];
formField.addEventListener('change', () => { UI_ELEMENTS.output.textContent = ''; });


