const STATUS_TO_DO = 'To Do';
const STATUS_IN_PROGRESS = 'In Progress';
const STATUS_DONE = 'Done';
const PRIORITY_LOW = 'low';
const PRIORITY_HIGH = 'high';

const list = [ 
  {
    id: 1,
    name: 'create a post',
    status: STATUS_IN_PROGRESS,
    priority: PRIORITY_LOW
  }, 
  {
    id: 2,
    name: 'make a bed',
    status: STATUS_DONE,
    priority: PRIORITY_HIGH
  },
  {
    id: 3,
    name: 'write a post',
    status: STATUS_TO_DO,
    priority: PRIORITY_LOW
  }
]

function isNameInList(name) {
  return list.find(item => item.name === name);
}

function isValidStatus(status) {
  return status === STATUS_IN_PROGRESS || status === STATUS_DONE || status === STATUS_TO_DO;
}

function isValidPriority(priority) {
  return priority === PRIORITY_LOW || priority === PRIORITY_HIGH;
}

function changeStatus(name, status) {
  if (isNameInList(name) && isValidStatus(status)) {
    list.forEach(item => (item.name === name ? item.status = status : item));
  }
}

function changePriority(name, priority) {
  if (isNameInList(name) && isValidPriority(priority)) {
    list.forEach(item => (item.name === name ? item.priority = priority : item));
  }
}

function getMaxId() {
  let max = 0;

  list.forEach(item => (item.id > max ? max = item.id : max));

  return max;
}

function generateId() {
  return getMaxId() + 1;
}

function addTask(name, status = STATUS_TO_DO, priority = PRIORITY_LOW) {
  if (name && isValidStatus(status) && isValidPriority(priority) && !isNameInList(name)) {
    const task = {
      id: generateId(),
      name,
      status,
      priority
    };

    list.push(task);
  }
}

function deleteTask(name) {
  if (isNameInList(name)) {
    list.forEach((item, index) => (item.name === name ? list.splice(index, 1) : item));
  }
}

function showTasksByStatus(status = STATUS_TO_DO) {
  let filteredList = [];

  if (isValidStatus) {
    filteredList = list.filter(item => (item.status === status));
  }

  console.log(`${status}:`);
  if (filteredList.length) {
    filteredList.forEach(item => {
      console.log(`  id: ${item.id}, name: ${item.name}, status: ${status}, priority: ${item.priority}`);
    });
  } else {
    console.log('-\n');
  }
}

function showTasksByPriority(priority = PRIORITY_LOW) {
  let filteredList = [];

  if (isValidPriority) {
    filteredList = list.filter(item => (item.priority === priority));
  }

  console.log(`${priority}:`);
  if (filteredList.length) {
    filteredList.forEach(item => {
      console.log(`  id: ${item.id}, name: ${item.name}, status: ${item.status}, priority: ${priority}`);
    });
  } else {
    console.log('-\n');
  }
}

function showList() {
  showTasksByStatus(STATUS_TO_DO);
  showTasksByStatus(STATUS_IN_PROGRESS);
  showTasksByStatus(STATUS_DONE);

  console.log('\n');

  showTasksByPriority(PRIORITY_LOW);
  showTasksByPriority(PRIORITY_HIGH);
}

addTask('have a walk', STATUS_TO_DO, PRIORITY_HIGH);
addTask('go to work');
addTask('come home', STATUS_TO_DO, PRIORITY_HIGH);
changeStatus('write a post', STATUS_DONE);
changeStatus('go to work', STATUS_IN_PROGRESS);
changePriority('write a post', PRIORITY_LOW);
deleteTask('make a bed');
showList();
