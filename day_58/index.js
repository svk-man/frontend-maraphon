const UI_ELEMENTS = {
  form: document.querySelector('.form'),
  output: document.querySelector('.output'),
};

UI_ELEMENTS.form.addEventListener('submit', function(event) {
  event.preventDefault();

  const nameField = this.children[0];
  const name = nameField.value;
  const serverUrl = 'https://api.genderize.io';

  if (name) {
    const url = `${serverUrl}?name=${name}`;
  
    fetch(url)
    .then(response => response.json())
    .then(info => {
      UI_ELEMENTS.output.textContent = `${name} is ${info['gender']}`;
    });
  }
});

const formField = UI_ELEMENTS.form.children[0];
formField.addEventListener('change', () => { UI_ELEMENTS.output.textContent = ''; });


