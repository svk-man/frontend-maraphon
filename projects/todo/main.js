import { showTodoList } from "./view.js";

const STATUS = 'status';
const STATUSES = {
  TO_DO: 'To Do',
  IN_PROGRESS: 'In Progress',
  DONE: 'DONE',
}

const PRIORITY = 'priority';
const PRIORITIES = {
  LOW: 'LOW',
  HIGH: 'HIGH',
}

let tasks = [ 
  {
    id: 1,
    name: 'create a post',
    status: STATUSES.IN_PROGRESS,
    priority: PRIORITIES.LOW,
  }, 
  {
    id: 2,
    name: 'make a bed',
    status: STATUSES.DONE,
    priority: PRIORITIES.HIGH,
  },
  {
    id: 3,
    name: 'write a post',
    status: STATUSES.TO_DO,
    priority: PRIORITIES.LOW,
  },
];

function isValidStatus(status) {
  return status === STATUSES.IN_PROGRESS || status === STATUSES.DONE || status === STATUSES.TO_DO;
}

function isValidPriority(priority) {
  return priority === PRIORITIES.LOW || priority === PRIORITIES.HIGH;
}

function changeStatus(id, status) {
  tasks.some(function (element) {
    if (element.id === id) {
      element.status = status;
      return true;
    }

    return false;
  });
}

function changePriority(id, priority) {
  tasks.some(function (element) {
    if (element.id === id) {
      element.priority = priority;
      return true;
    }

    return false;
  });
}

function generateId() {
  return tasks.length > 1 ? tasks[tasks.length - 1].id + 1 : 0;
}

function addTask(name, status = STATUSES.TO_DO, priority = PRIORITIES.LOW) {
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

function deleteTask(id) {
  tasks = tasks.filter(function(element) {
    return element.id !== id;
  });
}

function showTasksByStatus(status = STATUSES.TO_DO) {
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

function getTasksByPriority(priority = PRIORITY_LOW) {
  if (isValidPriority) {
    return tasks.filter(item => (item.priority === priority));
  }

  return [];
}

function showTasksByPriority(priority = PRIORITY_LOW) {
  let filteredTasks = getTasksByPriority(priority);

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
      showTasksByStatus(STATUSES.TO_DO);
      showTasksByStatus(STATUSES.IN_PROGRESS);
      showTasksByStatus(STATUSES.DONE);
      break;
    case PRIORITY:
      showTasksByPriority(PRIORITIES.LOW);
      showTasksByPriority(PRIORITIES.HIGH);
      break;
  }
}

function showTasks() {
  showTasksBy(STATUS);
  console.log('\n');
  showTasksBy(PRIORITY);
}

addTask('have a walk', STATUSES.TO_DO, PRIORITIES.HIGH);
addTask('go to work');
addTask('come home', STATUSES.TO_DO, PRIORITIES.HIGH);
changeStatus(3, STATUSES.DONE);
changeStatus(5, STATUSES.IN_PROGRESS);
changePriority(3, PRIORITIES.LOW);
deleteTask(2);
deleteTask(4);
showTasks();

showTodoList(tasks);