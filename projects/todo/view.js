import { tasks, STATUSES, PRIORITIES, addTask, changeStatus, deleteTask } from "./to do.js";

export const UI_TODO_LIST = document.querySelector('.todo__list');

export function showTodoList() {
  clearTodoList();

  const sortedTasks = [...tasks].sort(compareTasks);
	const showPiorityTodoList = (priority) => {
		UI_TODO_LIST.append(createListItemCategory(priority));
		UI_TODO_LIST.append(createListItemAddTask(`Add ${priority === PRIORITIES.HIGH ? 'important ' : ''} task`, priority));
		sortedTasks
			.filter(task => task.priority === priority)
			.forEach(task => {
				UI_TODO_LIST.append(createListItemTask(task));
			});
	}

	showPiorityTodoList(PRIORITIES.HIGH);
	showPiorityTodoList(PRIORITIES.LOW);
}

function compareTasks(task1, task2) {
  const isHighPriorityTask1 = task1.priority === PRIORITIES.HIGH;
  const isHighPriorityTask2 = task2.priority === PRIORITIES.HIGH;
  if ((isHighPriorityTask1 && !isHighPriorityTask2) || task1.id < task2.id) {
    return -1;
  } else if ((!isHighPriorityTask1 && isHighPriorityTask2) || task2.id < task1.id) {
    return 1;
  } else {
    return 0;
  }
}

function clearTodoList() {
  UI_TODO_LIST.textContent = '';
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

function createListItemAddTask(placeholder, priority) {
  const li = document.createElement('li');
  li.classList.add('todo__item');

  const form = document.createElement('form');
  form.classList.add('todo__item-add-task');
  form.dataset['priority'] = priority;

  const inputText = document.createElement('input');
  inputText.classList.add('todo__item-input');
  inputText.type = 'text';
  inputText.placeholder = placeholder;
  form.addEventListener('submit', addListItemTask);
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

  const div = document.createElement('div');
  div.classList.add('todo__item-task');
  div.dataset.id = task.id;

  const input = document.createElement('input');
  input.classList.add('todo__item-checkbox');
  input.type = 'checkbox';
  input.name = itemId;
  input.id = itemId;
  input.addEventListener('change', changeListItemTaskStatus)
  if (task.status === STATUSES.DONE) {
    div.classList.add('todo__item-task--done');
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
  button.addEventListener('click', deleteListItemTask)
  div.append(button);

  li.append(div);

  return li;
}

function addListItemTask(event) {
  event.preventDefault();

  const form = event.target;
  const taskName = form.children[0].value;
  if (taskName.trim()) {
    const taskPriority = form.dataset['priority'].toUpperCase() === PRIORITIES.LOW ? PRIORITIES.LOW : PRIORITIES.HIGH;

    const taskId = addTask(taskName, STATUSES.TO_DO, taskPriority);
    const isTaskAdded = taskId !== -1;
    if (isTaskAdded) {
      showTodoList();
    }
  }
}

function changeListItemTaskStatus(event) {
  const listItemCheckbox = event.target;
  const listItemTask = listItemCheckbox.parentNode;
  const taskId = Number(listItemTask.dataset.id);

  changeStatus(taskId, listItemCheckbox.checked ? STATUSES.DONE : STATUSES.TO_DO);
  listItemTask.classList.toggle('todo__item-task--done');
}

function deleteListItemTask(event) {
  const listItemTask = event.target.parentNode;
  const taskId = Number(listItemTask.dataset.id);

  deleteTask(taskId);
  listItemTask.parentNode.remove();
}
