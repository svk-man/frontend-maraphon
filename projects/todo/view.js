export const UI_ELEMENTS = {
  highList: document.querySelectorAll('.todo__list')[0],
  lowList: document.querySelectorAll('.todo__list')[1],
  addButtons: document.querySelectorAll('.todo__item-btn--add'),
  removeButtons: document.querySelectorAll('.todo__item-btn--remove'),
  checkboxLabels: document.querySelectorAll('.todo__item-checkbox-label'),
  inputs: document.querySelectorAll('.todo__item-input'),
};

const PRIORITIES = {
  LOW: 'LOW',
  HIGH: 'HIGH',
}

const STATUSES = {
  TO_DO: 'To Do',
  IN_PROGRESS: 'In Progress',
  DONE: 'DONE',
}

export function showTodoList(tasks) {
  clearLists();

  tasks.forEach(task => {
    const li = createListItemCheckbox(task);
    if (task.priority === PRIORITIES.HIGH) {
      UI_ELEMENTS.highList.append(li);
    } else {
      UI_ELEMENTS.lowList.append(li);
    }
  });
}

function clearLists() {
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

function createListItemCheckbox(task) {
  const id = `todo-${task.priority.toLowerCase()}-item-${task.id}`;

  const li = document.createElement('li');
  li.classList.add('todo__item');

  const input = document.createElement('input');
  input.classList.add('todo__item-checkbox');
  input.type = 'checkbox';
  input.name = id;
  input.id = id;
  if (task.status === STATUSES.DONE) {
    li.classList.add('todo__item--done');
    input.checked = true;
  }

  li.append(input);

  const label = document.createElement('label');
  label.classList.add('todo__item-checkbox-label');
  label.htmlFor = id;
  label.textContent = task.name;
  li.append(label);

  const button = document.createElement('button');
  button.classList.add('todo__item-btn', 'todo__item-btn--remove');
  li.append(button);

  return li;
}