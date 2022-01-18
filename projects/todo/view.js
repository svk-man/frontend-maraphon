import { tasks, PRIORITIES, STATUSES, getTask, addTask, deleteTask } from "./to do.js";

export const UI_ELEMENTS = {
  highList: document.querySelectorAll('.todo__list')[0],
  lowList: document.querySelectorAll('.todo__list')[1],
  addButtons: document.querySelectorAll('.todo__item-btn--add'),
  deleteButtons: document.querySelectorAll('.todo__item-btn--delete'),
  checkboxLabels: document.querySelectorAll('.todo__item-checkbox-label'),
  inputs: document.querySelectorAll('.todo__item-input'),
};

export function showTodoList() {
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

  const form = document.createElement('form');
  form.classList.add('todo__item-form');

  const inputText = document.createElement('input');
  inputText.classList.add('todo__item-input');
  inputText.type = 'text';
  inputText.placeholder = placeholder;
  form.addEventListener('submit', addListItemCheckbox);

  form.append(inputText);

  const inputSubmit = document.createElement('input');
  inputSubmit.classList.add('todo__item-btn', 'todo__item-btn--add');
  inputSubmit.type = 'submit';
  inputSubmit.value = '';
  form.append(inputSubmit);

  li.append(form);

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
  button.classList.add('todo__item-btn', 'todo__item-btn--delete');
  button.dataset.id = task.id;
  button.addEventListener('click', deleteListItemCheckbox)
  li.append(button);

  return li;
}

function addListItemCheckbox(event) {
  event.preventDefault();

  const form = event.target;
  const taskName = form.children[0].value;

  if (taskName.trim()) {
    const isHighListForm = UI_ELEMENTS.highList.contains(form);
    const taskPriority = isHighListForm ? PRIORITIES.HIGH : PRIORITIES.LOW;

    const taskId = addTask(taskName, STATUSES.TO_DO, taskPriority);
    const isTaskAdded = taskId !== -1;
    if (isTaskAdded) {
      const li = createListItemCheckbox(getTask(taskId));
      if (isHighListForm) {
        UI_ELEMENTS.highList.append(li);
      } else {
        UI_ELEMENTS.lowList.append(li);
      }
    }
  }

  return false;
}

function deleteListItemCheckbox(event) {
  const checkboxButton = event.target;
  const taskId = Number(checkboxButton.dataset.id);
  deleteTask(taskId);
  checkboxButton.parentNode.remove();
}