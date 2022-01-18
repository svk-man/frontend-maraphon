export const UI_ELEMENTS = {
  highList: document.querySelectorAll('.todo__list')[0],
  lowList: document.querySelectorAll('.todo__list')[1],
  addButtons: document.querySelectorAll('.todo__item-btn--add'),
  removeButtons: document.querySelectorAll('.todo__item-btn--remove'),
  checkboxLabels: document.querySelectorAll('.todo__item-checkbox-label'),
  inputs: document.querySelectorAll('.todo__item-input'),
};

export function clearLists() {
  UI_ELEMENTS.highList.textContent = '';
  UI_ELEMENTS.lowList.textContent = '';

  UI_ELEMENTS.highList.append(createListItemInput('Добавить важных дел'));
  UI_ELEMENTS.lowList.append(createListItemInput());
}

function createListItemInput(placeholder = 'Добавить дел') {
  const li = document.createElement('li');
  li.classList.add('todo__item');

  const input = document.createElement('input');
  input.classList.add('todo__item-input');
  input.type = 'text';
  input.placeholder = placeholder;
  li.append(input);

  const button = document.createElement('button');
  button.classList.add('todo__item-btn', 'todo__item-btn--add');
  li.append(button);

  return li;
}
