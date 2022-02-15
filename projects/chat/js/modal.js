const UI_MODAL_ELEMENTS = {
  modal: document.querySelector('.modal'),
  modalClose: document.querySelector('.modal__close'),
  modalForm: document.querySelector('.modal__form'),
  modalFormInput: document.querySelector('.modal__form-input'),
};

UI_MODAL_ELEMENTS.modalClose.addEventListener('click', closeModal);
UI_MODAL_ELEMENTS.modalForm.addEventListener('submit', changeOptionsHandler);

window.addEventListener('click', (event) => {
  if (event.target === UI_MODAL_ELEMENTS.modal) {
    closeModal();
  }
});

export function openModal() {
  UI_MODAL_ELEMENTS.modal.style.display = 'flex';
}

export function closeModal() {
  UI_MODAL_ELEMENTS.modal.style.display = 'none';
}

function changeOptionsHandler() {
  const userName = UI_MODAL_ELEMENTS.modalFormInput.value;
  const isValidUserName = userName.trim() !== '';
  if (isValidUserName) {
    alert(userName);
    UI_MODAL_ELEMENTS.modalForm.reset();
    closeModal();
  }
}
