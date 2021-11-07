const STATUS_IN_PROGRESS = 'In Progress';
const STATUS_DONE = 'Done';
const STATUS_TO_DO = 'To Do';
const list = {
  'create a task': STATUS_IN_PROGRESS,
  'make a bed': STATUS_DONE,
  'write a post': STATUS_TO_DO,
}

function changeStatus(name, status) {
  if (status === STATUS_IN_PROGRESS || status === STATUS_DONE || status === STATUS_TO_DO) {
    list[name] = status;
    return true;
  }

  return false;
}

function addTask(name) {
  if (list[name] === undefined && name) {
    list[name] = STATUS_TO_DO;
    return true;
  }

  return false;
}

function deleteTask(name) {
  if (list[name] !== undefined) {
    delete list[name];
    return true;
  }

  return false;
}

function showList() {
  let message = '';
  let toDoTasks = '';
  let inProgressTasks = '';
  let doneTasks = '';

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

  message += `${STATUS_TO_DO}:\n`;
  message += toDoTasks ? toDoTasks : ' -\n';
  message += `${STATUS_IN_PROGRESS}:\n`;
  message += inProgressTasks ? inProgressTasks : ' -\n';
  message += `${STATUS_DONE}:\n`;
  message += doneTasks ? doneTasks : ' -\n';

  console.log(message);
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
