const STATUS_IN_PROGRESS = 'In Progress';
const STATUS_DONE = 'Done';
const STATUS_TO_DO = 'To Do';
const list = {
  'create a task': STATUS_IN_PROGRESS,
  'make a bed': STATUS_DONE,
  'write a post': STATUS_TO_DO,
}

function changeStatus(name, status) {
  const isValidStatus = (status === STATUS_IN_PROGRESS || status === STATUS_DONE || status === STATUS_TO_DO);
  if (isNameInList(name) && isValidStatus) {
    list[name] = status;
    return true;
  }

  return false;
}

function addTask(name) {
  if (!isNameInList(name) && name) {
    list[name] = STATUS_TO_DO;
    return true;
  }

  return false;
}

function deleteTask(name) {
  if (isNameInList(name)) {
    delete list[name];
    return true;
  }

  return false;
}

function showList() {
  let tasks = '';
  let toDoTasks = '';
  let inProgressTasks = '';
  let doneTasks = '';
  let isNotFoundTasks = ' -\n';

  for (let task in list) {
    switch (list[task]) {
      case STATUS_TO_DO:
        toDoTasks += ` "${task}"\n`;
        break;
      case STATUS_IN_PROGRESS:
        inProgressTasks += ` "${task}"\n`;
        break;
      case STATUS_DONE:
        doneTasks += ` "${task}"\n`;
        break;
    }
  }

  tasks += `${STATUS_TO_DO}:\n`;
  tasks += toDoTasks ? toDoTasks : isNotFoundTasks;
  tasks += `${STATUS_IN_PROGRESS}:\n`;
  tasks += inProgressTasks ? inProgressTasks : isNotFoundTasks;
  tasks += `${STATUS_DONE}:\n`;
  tasks += doneTasks ? doneTasks : isNotFoundTasks;

  console.log(tasks);
}

function isNameInList(name) {
  return name in list;
}

addTask('have a walk');
/*console.log(changeStatus('have a walk', 'unknown status'));
console.log(addTask('have a walk'));
console.log(deleteTask('have a walk1'));
console.log(addTask());
console.log();*/
addTask('go to work');
addTask('come home');
changeStatus('write a post', STATUS_DONE);
changeStatus('go to work', STATUS_IN_PROGRESS);
changeStatus('have a walk', STATUS_DONE);
deleteTask('make a bed');
deleteTask('come home');
showList();
