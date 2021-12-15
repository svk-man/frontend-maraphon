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

function isValidStatus(status) {
  return status === STATUSES.inProgress || status === STATUSES.done || status === STATUSES.toDo;
}

function isValidPriority(priority) {
  return priority === PRIORITIES.low || priority === PRIORITIES.high;
}

function changeStatus(id, status) {
  const index = findTaskIndex(id);
  const isTaskFound = index !== -1;
  if (isTaskFound && isValidStatus(status)) {
    tasks[index].status = status;
  }
}

function changePriority(id, priority) {
  const index = findTaskIndex(id);
  const isTaskFound = index !== -1;
  if (isTaskFound && isValidPriority(priority)) {
    tasks[index].priority = priority;
  }
}

function generateId() {
  return tasks.length > 1 ? tasks[tasks.length - 1].id + 1 : 0;
}

function addTask(name, status = STATUSES.toDo, priority = PRIORITIES.low) {
  if (name && isValidStatus(status) && isValidPriority(priority)) {
    const task = {
      id: generateId(),
      name,
      status,
      priority,
    };

    tasks.push(task);
  }
}

function findTaskIndex(id) {
  return tasks.findIndex((item) => (item.id === id));
}

function deleteTask(id) {
  const index = findTaskIndex(id);
  const isFoundTask = index !== -1;
  if (isFoundTask) {
    tasks.splice(index, 1);
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
changeStatus(3, STATUSES.done);
changeStatus(5, STATUSES.inProgress);
changePriority(3, PRIORITIES.low);
deleteTask(2);
deleteTask(4);
showTasks();
