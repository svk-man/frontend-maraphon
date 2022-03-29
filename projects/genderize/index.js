import { UI_ELEMENTS, setOutputGender, setOutputNation, clearOutput } from "./view.js";

const SERVER_URL = {
  GENDER: 'https://api.genderize.io',
  NATION: 'https://api.nationalize.io',
};

UI_ELEMENTS.FORM.addEventListener('submit', (event) => {
  event.preventDefault();

  const nameField = event.target.children[0];
  const name = nameField.value;

  if (name) {
    const URL = {
      GENDER: `${SERVER_URL.GENDER}?name=${name}`,
      NATION: `${SERVER_URL.NATION}?name=${name}`,
    }
  
    fetch(URL.GENDER)
    .then(response => response.json())
    .then(info => {
      setOutputGender(name, info['gender']);
    });

    fetch(URL.NATION)
    .then(response => response.json())
    .then(info => {
      const countries = info['country'].map(country => country['country_id']).join(', ');
      setOutputNation(countries);
    });
  }
});

const formField = UI_ELEMENTS.FORM.children[0];
formField.addEventListener('change', clearOutput);
