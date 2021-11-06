const list = {
  'create a task': 'In Progress',
  'make a bed': 'Done',
  'write a post': 'To Do',
}

function changeStatus(name, status) {
  if (status === 'In Progress' || status === 'Done' || status === 'To Do') {
    list[name] = status;
    return true;
  }

  return false;
}

function addTask(name) {
  if (list[name] === undefined) {
    list[name] = 'To Do';
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
      case 'To Do':
        toDoTasks += ` "${task}"\n`;
        break;
      case 'In Progress':
        inProgressTasks += ` "${task}"\n`;
        break;
      case 'Done':
        doneTasks += ` "${task}"\n`;
        break;
    }
  }

  message += 'Todo:\n';
  message += toDoTasks ? toDoTasks : ' -\n';
  message += 'In Progress:\n';
  message += inProgressTasks ? inProgressTasks : ' -\n';
  message += 'Done:\n';
  message += doneTasks ? doneTasks : ' -\n';

  console.log(message);
}

addTask('have a walk');
/*console.log(changeStatus('have a walk', 'status'));
console.log(addTask('have a walk'));
console.log(deleteTask('have a walk1'));
console.log();*/
addTask('go to work');
addTask('come home');
changeStatus('write a post', 'Done');
changeStatus('go to work', 'In Progress');
changeStatus('have a walk', 'Done');
deleteTask('make a bed');
deleteTask('come home');
showList();
