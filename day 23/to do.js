const list = {
  'create a task': 'In Progress',
  'make a bed': 'Done',
  'write a post': 'To Do',
}

function changeStatus(name, status) {
  list[name] = status;
}

function addTask(name) {
  list[name] = 'To Do';
}

function deleteTask(name) {
  delete list[name];
}

function showList() {
  let message = '';
  let toDoTasks = '';
  let inProgressTasks = '';
  let doneTasks = '';

  for (let task in list) {
    switch (list[task]) {
      case 'To Do':
        toDoTasks += task + '\n';
        break;
      case 'In Progress':
        inProgressTasks += task + '\n';
        break;
      case 'Done':
        doneTasks += task + '\n';
        break;
    }
  }

  message += 'Todo:\n';
  message += toDoTasks ? toDoTasks : '-\n';
  message += 'In Progress:\n';
  message += inProgressTasks ? inProgressTasks : '-\n';
  message += 'Done:\n';
  message += doneTasks ? doneTasks : '-\n';

  console.log(message);
}

addTask('have a walk');
addTask('go to work');
addTask('come home');
changeStatus('write a post', 'Done');
changeStatus('go to work', 'In Progress');
changeStatus('have a walk', 'Done');
deleteTask('make a bed');
deleteTask('come home');
showList();
