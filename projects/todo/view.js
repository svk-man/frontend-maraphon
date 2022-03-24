import { tasks, STATUSES, PRIORITIES, addTask, getTask, changeStatus, deleteTask } from "./to do.js";

export const UI_ELEMENTS = {
  todoList: document.querySelector('.todo__list'),
  highList: document.querySelectorAll('.todo__list')[0],
  lowList: document.querySelectorAll('.todo__list')[1],
};

export function showTodoList() {
  clearTodoList();

  const sortedTasks = tasks.sort(compareTasks);
  let lastTaskPriority = null;
  sortedTasks.forEach(task => {
    if (task.priority != lastTaskPriority) {
      UI_ELEMENTS.todoList.append(createListItemCategory(task.priority));
      UI_ELEMENTS.todoList.append(createListItemAddTask(`Add ${task.priority === PRIORITIES.HIGH ? 'important ' : ''}task`));
    }

    UI_ELEMENTS.todoList.append(createListItemTask(task));

    lastTaskPriority = task.priority;
  });
}

function compareTasks(task1, task2) {
  if ((task1.priority === PRIORITIES.HIGH && task2.priority === PRIORITIES.LOW) || task1.id < task2.id) {
    return -1;
  } else if ((task1.priority === PRIORITIES.LOW && task2.priority === PRIORITIES.HIGH) || task2.id < task1.id) {
    return 1;
  } else {
    return 0;
  }
}

function clearTodoList() {
  UI_ELEMENTS.todoList.textContent = '';
}

function createListItemCategory(category) {
  const li = document.createElement('li');
  li.classList.add('todo__item');

  const span = document.createElement('span');
  span.textContent = category;
  span.classList.add('todo__item-category');

  li.append(span);

  return li;
}

function createListItemAddTask(placeholder) {
  const li = document.createElement('li');
  li.classList.add('todo__item');

  const form = document.createElement('form');
  form.classList.add('todo__item-add-task');

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

function createListItemTask(task) {
  const itemId = `todo-item-${task.id}`;

  const li = document.createElement('li');
  li.classList.add('todo__item');
  li.dataset.id = task.id;

  const div = document.createElement('div');
  div.classList.add('todo__item-task');

  const input = document.createElement('input');
  input.classList.add('todo__item-checkbox');
  input.type = 'checkbox';
  input.name = itemId;
  input.id = itemId;
  input.addEventListener('change', changeListItemCheckboxStatus)
  if (task.status === STATUSES.DONE) {
    li.classList.add('todo__item--done');
    input.checked = true;
  }

  div.append(input);

  const label = document.createElement('label');
  label.classList.add('todo__item-checkbox-label');
  label.htmlFor = itemId;
  label.textContent = task.name;
  div.append(label);

  const button = document.createElement('button');
  button.classList.add('todo__item-btn', 'todo__item-btn--delete');
  button.addEventListener('click', deleteListItemCheckbox)
  div.append(button);

  li.append(div);

  return li;
}

function addListItemCheckbox(event) {
  event.preventDefault();

  const form = this;
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

      form.reset();
    }
  }

  return false;
}

function changeListItemCheckboxStatus() {
  const listItemCheckbox = this;
  const listItem = listItemCheckbox.parentNode;
  const taskId = Number(listItem.dataset.id);
  listItem.classList.toggle('todo__item--done');
  if (listItemCheckbox.checked) {
    changeStatus(taskId, STATUSES.DONE);
  } else {
    changeStatus(taskId, STATUSES.TO_DO);
  }
}

function deleteListItemCheckbox() {
  const listItem = this.parentNode;
  const taskId = Number(listItem.dataset.id);
  deleteTask(taskId);
  listItem.remove();
}
