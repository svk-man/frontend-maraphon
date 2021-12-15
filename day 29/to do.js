const STATUS = 'status';
const STATUSES = {
  toDo: 'To Do',
  inProgress: 'In Progress',
  done: 'Done',
}

const PRIORITY = 'priority';
const PRIORITIES = {
  low: 'low',
  high: 'high',
}

const tasks = [ 
  {
    id: 1,
    name: 'create a post',
    status: STATUSES.inProgress,
    priority: PRIORITIES.low,
  }, 
  {
    id: 2,
    name: 'make a bed',
    status: STATUSES.done,
    priority: PRIORITIES.high,
  },
  {
    id: 3,
    name: 'write a post',
    status: STATUSES.toDo,
    priority: PRIORITIES.low,
  },
];

function isNameInTasks(name) {
  return tasks.find(item => item.name === name);
}

function isValidStatus(status) {
  return status === STATUSES.inProgress || status === STATUSES.done || status === STATUSES.toDo;
}

function isValidPriority(priority) {
  return priority === PRIORITIES.low || priority === PRIORITIES.high;
}

function changeStatus(name, status) {
  if (isNameInTasks(name) && isValidStatus(status)) {
    tasks.forEach(item => (item.name === name ? item.status = status : item));
  }
}

function changePriority(name, priority) {
  if (isNameInTasks(name) && isValidPriority(priority)) {
    tasks.forEach(item => (item.name === name ? item.priority = priority : item));
  }
}

function getMaxId() {
  let max = 0;

  tasks.forEach(item => (item.id > max ? max = item.id : max));

  return max;
}

function generateId() {
  return getMaxId() + 1;
}

function addTask(name, status = STATUSES.toDo, priority = PRIORITIES.low) {
  if (name && isValidStatus(status) && isValidPriority(priority) && !isNameInTasks(name)) {
    const task = {
      id: generateId(),
      name,
      status,
      priority,
    };

    tasks.push(task);
  }
}

function deleteTask(name) {
  if (isNameInTasks(name)) {
    tasks.forEach((item, index) => (item.name === name ? tasks.splice(index, 1) : item));
  }
}

function showTasksByStatus(status = STATUSES.toDo) {
  let filteredTasks = [];

  if (isValidStatus) {
    filteredTasks = tasks.filter(item => (item.status === status));
  }

  console.log(`${status}:`);
  if (filteredTasks.length) {
    filteredTasks.forEach(item => {
      console.log(`  id: ${item.id}, name: ${item.name}, status: ${status}, priority: ${item.priority}`);
    });
  } else {
    console.log('-\n');
  }
}

function showTasksByPriority(priority = PRIORITY_LOW) {
  let filteredTasks = [];

  if (isValidPriority) {
    filteredTasks = tasks.filter(item => (item.priority === priority));
  }

  console.log(`${priority}:`);
  if (filteredTasks.length) {
    filteredTasks.forEach(item => {
      console.log(`  id: ${item.id}, name: ${item.name}, status: ${item.status}, priority: ${priority}`);
    });
  } else {
    console.log('-\n');
  }
}

function showTasksBy(property) {
  switch(property) {
    case STATUS:
      showTasksByStatus(STATUSES.toDo);
      showTasksByStatus(STATUSES.inProgress);
      showTasksByStatus(STATUSES.done);
      break;
    case PRIORITY:
      showTasksByPriority(PRIORITIES.low);
      showTasksByPriority(PRIORITIES.high);
      break;
  }
}

function showTasks() {
  showTasksBy(STATUS);
  console.log('\n');
  showTasksBy(PRIORITY);
}

addTask('have a walk', STATUSES.toDo, PRIORITIES.high);
addTask('go to work');
addTask('come home', STATUSES.toDo, PRIORITIES.high);
changeStatus('write a post', STATUSES.done);
changeStatus('go to work', STATUSES.inProgress);
changePriority('write a post', PRIORITIES.low);
deleteTask('make a bed');
showTasks();
