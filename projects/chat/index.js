const UI_ELEMENTS = {
  form: document.querySelector('.chat__form'),
  formInput: document.querySelector('.chat__form-input'),
};

UI_ELEMENTS.form.addEventListener('submit', sendMessageHandler);

function sendMessageHandler() {
  const message = UI_ELEMENTS.formInput.value;
  const isValidMessage = message.trim() !== '';
  if (isValidMessage) {
    alert(message);
    UI_ELEMENTS.form.reset();
  }
}
