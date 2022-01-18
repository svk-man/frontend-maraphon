import { tasks, STATUSES, PRIORITIES, addTask, getTask, changeStatus, deleteTask } from "./to do.js";

export const UI_ELEMENTS = {
  highList: document.querySelectorAll('.todo__list')[0],
  lowList: document.querySelectorAll('.todo__list')[1],
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
  li.dataset.id = task.id;

  const input = document.createElement('input');
  input.classList.add('todo__item-checkbox');
  input.type = 'checkbox';
  input.name = id;
  input.id = id;
  input.addEventListener('change', changeListItemCheckboxStatus)
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

      form.children[0].value = '';
    }
  }

  return false;
}

function changeListItemCheckboxStatus(event) {
  const listItemCheckbox = event.target;
  const listItem = listItemCheckbox.parentNode;
  const taskId = Number(listItem.dataset.id);
  listItem.classList.toggle('todo__item--done');
  if (listItemCheckbox.checked) {
    changeStatus(taskId, STATUSES.DONE);
  } else {
    changeStatus(taskId, STATUSES.TO_DO);
  }
}

function deleteListItemCheckbox(event) {
  const listItem = event.target.parentNode;
  const taskId = Number(listItem.dataset.id);
  deleteTask(taskId);
  listItem.remove();
}
