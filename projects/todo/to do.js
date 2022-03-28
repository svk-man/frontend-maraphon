const STATUS = 'status';
export const STATUSES = {
  TO_DO: 'To Do',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
}

const DEFAULT_STATUS = STATUSES.TO_DO;

const PRIORITY = 'priority';
export const PRIORITIES = {
  LOW: 'LOW',
  HIGH: 'HIGH',
}

const DEFAULT_PRIORITY = PRIORITIES.LOW;

export let tasks = [ 
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
  return Object.values(STATUSES).includes(status);
}

function isValidPriority(priority) {
  return Object.values(PRIORITIES).includes(priority);
}

export function changeStatus(id, status) {
  if (!isValidStatus) {
    return;
  }

  const currentTask = tasks.find(task => task.id === id);
  if (currentTask) {
    currentTask.status = status;
  }
}

function changePriority(id, priority) {
  if (!isValidPriority) {
    return;
  }

  const currentTask = tasks.find(task => task.id === id);
  if (currentTask) {
    currentTask.priority = priority;
  }
}

export function generateId() {
  return tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 0;
}

export function addTask(name, status = DEFAULT_STATUS, priority = DEFAULT_PRIORITY) {
  if (name && isValidStatus(status) && isValidPriority(priority)) {
    const task = {
      id: generateId(),
      name,
      status,
      priority,
    };

    tasks.push(task);

    return task.id;
  }

  return -1;
}

export function getTask(id) {
  return tasks.find(task => task.id === id);
}

export function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
}

function showTasksByStatus(status = DEFAULT_STATUS) {
  let filteredTasks = [];
  if (isValidStatus) {
    filteredTasks = tasks.filter(task => task.status === status);
  }

  console.log(`${status}:`);
  if (filteredTasks) {
    filteredTasks.forEach(task => {
      console.log(`  id: ${task.id}, name: ${task.name}, status: ${status}, priority: ${task.priority}`);
    });
  } else {
    console.log('-\n');
  }
}

function showTasksByPriority(priority = PRIORITY_LOW) {
  let filteredTasks = [];
  if (isValidPriority) {
    filteredTasks = tasks.filter(task => task.priority === priority);
  }

  console.log(`${priority}:`);
  if (filteredTasks) {
    filteredTasks.forEach(task => {
      console.log(`  id: ${task.id}, name: ${task.name}, status: ${task.status}, priority: ${priority}`);
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
