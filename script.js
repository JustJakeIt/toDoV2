let lastSelected;
// creates empty array for "Project" Objects

let defaultProjectList = [];
let projectList = localStorage.getItem('myProjectList');
projectList = JSON.parse(projectList || JSON.stringify(defaultProjectList));
//Assigns ID and saves to local storage
let defaultId = 0;
let id = Number(localStorage.getItem('currentId')) || defaultId;

function saveToLocalStorage() {
  localStorage.setItem('myProjectList', JSON.stringify(projectList));
  localStorage.setItem('currentId', id.toString());
}

// creates a Project Object with an id number, name, and a sub array of TaskList (which will contain tasks)
const CreateProject = (dataProject, name) => {
  const taskList = [];
  return {
    dataProject,
    name,
    taskList,
  };
};

// creates DOM element
function newProjectCard(dataProject, projectName) {
  let projectCard = document.createElement('div');

  projectCard.classList.add('projectCard');
  projectCard.setAttribute('data-project', `${dataProject}`);
  let container = document.getElementById('container');
  let title = document.createElement('div');
  title.classList.add('title');
  title.textContent = projectName;
  projectCard.appendChild(title);
  container.appendChild(projectCard);
  projectCard.addEventListener('click', (event) => {
    selectTile(event.target);
  });
  //Need to add array interactions with buttons
  let projectBtns = document.createElement('div');
  projectBtns.classList.add('projectBtns');
  projectCard.appendChild(projectBtns);
  let renameBtn = document.createElement('button');
  renameBtn.classList.add('projectRenameBtn');
  projectBtns.appendChild(renameBtn);
  renameBtn.textContent = 'Rename';
  //make a required input box
  renameBtn.addEventListener('click', (e) => {
    let newName = prompt('Please enter new project name:');
    e.preventDefault();
    if (newName !== '') {
      title.textContent = ' ';
      title.textContent = newName;
      projectList[dataProject].name = newName;
    } else if (newName === ' ') {
      title.textContent = projectName;
    }
  });

  let deleteProjectBtn = document.createElement('button');
  deleteProjectBtn.textContent = 'Delete';
  deleteProjectBtn.classList.add('deleteProjectBtn');
  projectBtns.appendChild(deleteProjectBtn);
  deleteProjectBtn.addEventListener('click', () => {
    console.log(dataProject);
    projectCard.remove();
    sortArray();
    projectList.splice(dataProject, 1);
    saveToLocalStorage();
    location.reload();
    console.log(projectList);
  });
}

//Iterates through all Project Objects within the project list array and creates a card for them
const displayProject = (array) => {
  array.forEach((project) => {
    newProjectCard(project.dataProject, project.name);
  });
};

//Add Project interactions
const addProjectBtn = document.getElementById('addProjectBtn');
addProjectBtn.addEventListener('click', () => {
  let projectRenameForm = document.getElementById('projectForm');
  projectRenameForm.reset();
  projectRenameForm.classList.toggle('hidden');
});
const cancelAddProject = document.querySelector('.projectCancel');
cancelAddProject.addEventListener('click', () => {
  let projectRenameForm = document.getElementById('projectForm');
  projectRenameForm.reset();
  projectRenameForm.classList.toggle('hidden');
});

// When user clicks "Add". new project is created in the array, and within the dom
let renameForm = document.querySelector('.projectAddBtn');
renameForm.addEventListener('click', (e) => {
  let projectName = document.getElementById('projectInput').value;
  let dataProject = nextDataNumber();
  const newProject = CreateProject(dataProject, projectName);
  newProjectCard(dataProject, projectName);
  e.preventDefault();
  projectList.push(newProject);
  saveToLocalStorage();
  let projectRenameForm = document.getElementById('projectForm');
  projectRenameForm.reset();
  projectRenameForm.classList.toggle('hidden');

  console.log(projectList);
});

const nextDataNumber = () => {
  const allprojects = document.querySelectorAll('[data-project]');
  return allprojects.length;
};

console.log(projectList);

function sortArray() {
  let i = 0;
  //reorder the dataset in node and change dataProject accordingly
  const tiles = document.querySelectorAll('.projectCard');
  tiles.forEach((tile) => {
    let dataNum = tile.dataset.project;
    tile.dataset.project = i;
    projectList[dataNum].dataProject = i;
    i++;
  });
  //reorder projects according to their dataProject nunmber
  projectList.sort((a, b) => a.dataProject - b.dataProject);
  saveToLocalStorage();
}
//Create a "Project" Object with name, data project number to match index, and taskList

//make task list an array of task objects
//each task object with with completed, date due, details, id, important, and name

const CreateTask = (
  dataProject,
  id,
  title,
  details,
  completed,
  important,
  date
) => {
  return {
    dataProject,
    id,
    title,
    details,
    completed: completed,
    important: important,
    date: date,
  };
};

//creates new task in Dom
function newTaskCard(listId, title, notes, date, completed, important) {
  const toDoList = document.getElementById('toDoList');
  const taskCard = document.createElement('li');
  taskCard.classList.add('taskCard');
  taskCard.id = listId;
  taskCard.important = important;
  taskCard.completed = completed;
  toDoList.appendChild(taskCard);

  const taskComplete = document.createElement('div');
  if (completed) {
    taskComplete.classList.add('complete');
  }
  taskComplete.classList.add('taskComplete');
  taskComplete.addEventListener('click', (e) => {
    let listId = e.target.closest('li').id;
    let selectedTask = findSelectedTask(listId);
    selectedTask.completed = !selectedTask.completed;
    saveToLocalStorage();
  });
  taskCard.appendChild(taskComplete);

  const info = document.createElement('div');
  info.classList.add('info');
  taskCard.appendChild(info);

  const taskName = document.createElement('div');
  taskName.classList.add('name');
  taskName.textContent = title;
  info.appendChild(taskName);

  const details = document.createElement('div');
  details.classList.add('details');
  details.textContent = notes;
  info.appendChild(details);

  const dueDate = document.createElement('div');
  dueDate.classList.add('dueDate');
  dueDate.textContent = date;
  taskCard.appendChild(dueDate);

  const importantBtn = document.createElement('div');
  importantBtn.setAttribute('id', 'important');
  importantBtn.addEventListener('click', (e) => {
    let listId = e.target.closest('li').id;
    let selectedTask = findSelectedTask(listId);
    selectedTask.important = !selectedTask.important;
    saveToLocalStorage();
    refreshDisplay(selectedTask.dataProject);
    console.table(projectList);
  });
  taskCard.appendChild(importantBtn);

  const options = document.createElement('div');
  options.setAttribute('class', 'options');
  taskCard.appendChild(options);

  const editBtn = document.createElement('button');
  editBtn.setAttribute('id', 'submitEdit');
  editBtn.textContent = 'Edit';
  editBtn.classList.add('taskMenuBtn');
  options.appendChild(editBtn);
  editBtn.addEventListener('click', (e) => {
    let task = e.target.closest('li');
    populateForm(e);
    task.classList.add('hidden');
    let taskEditForm = document.querySelector('.editForm');
    taskEditForm.classList.toggle('hidden');
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('id', 'taskDelete');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('taskMenuBtn');
  options.appendChild(deleteBtn);
  deleteBtn.addEventListener('click', (e) => {
    let listNode = e.target.closest('li');
    let id = listNode.id;
    let selectedTask = findSelectedTask(id);
    let dataProject = selectedTask.dataProject;
    projectList[dataProject].taskList = projectList[
      dataProject
    ].taskList.filter((task) => task != selectedTask);
    saveToLocalStorage();
    listNode.remove();
  });
}

//find the task via id
function findSelectedTask(listId) {
  let selectedTask = projectList.reduce((acc, project) => {
    let currentTask = project.taskList.find((task) => task.id == listId);
    if (currentTask != null) {
      acc = currentTask;
    }
    return acc;
  }, {});
  return selectedTask;
}

function processDateData(date) {
  let formattedDate;
  if (!date) {
    formattedDate = 'No Due Date';
  } else {
    formattedDate = date;
  }
  return formattedDate;
}
//finds the dataProject number of selected project
function findCurrentDataProject() {
  const selected = document.querySelector('.selected');
  return selected.dataset.project;
}
// submits in information in add task form, creating a new task within the project
function processListInput(e) {
  let title = document.querySelector('.taskNameInput').value;
  let details = document.querySelector('.taskNotes').value;
  let dateInput = document.querySelector('.taskDate').value;
  const taskForm = document.getElementById('taskForm');
  let dataProject = findCurrentDataProject();
  let date = processDateData(dateInput);
  let listId = id;

  const newTask = CreateTask(
    dataProject,
    listId,
    title,
    details,
    false,
    false,
    date
  );
  projectList[dataProject].taskList.push(newTask);
  id++;
  saveToLocalStorage();
  taskForm.classList.toggle('hidden');
  newTaskCard(listId, title, details, date);
  let inputForm = document.querySelector('.inputForm');
  inputForm.reset();
  e.preventDefault();
}
//erases task lists from dom before replacing task cards
function displayTask(dataProject) {
  const ul = document.querySelector('ul');
  ul.textContent = '';
  projectList[dataProject].taskList.forEach((task) => {
    newTaskCard(
      task.id,
      task.title,
      task.details,
      task.date,
      task.completed,
      task.important
    );
  });
}
let showAddTask = document.querySelector('.addTaskBtn');
showAddTask.addEventListener('click', () => {
  const taskForm = document.getElementById('taskForm');
  taskForm.classList.toggle('hidden');
});
let addTaskBtn = document.querySelector('.submitTaskBtn');
addTaskBtn.addEventListener('click', (e) => {
  processListInput(e);
});

const selectTile = (event) => {
  if (lastSelected) {
    lastSelected.classList.remove('selected');
  }
  lastSelected = event;
  if (event.classList.contains('selected')) {
    event.classList.remove('selected');
  } else {
    event.classList.add('selected');
    displayTask(findCurrentDataProject());
  }
};
displayProject(projectList);
function showHiddenTask() {
  const hiddenTask = document.querySelector('li.hidden');
  hiddenTask.classList.remove('hidden');
}
function findHiddenTask() {
  const hiddenTask = document.querySelector('li.hidden');
  return hiddenTask;
}
function updateCompletedTask(e) {
  let listId = e.target.closest('li').id;
  let selectedTask = findSelectedTask(listId);
  selectedTask.completed = !selectedTask.completed;
  saveToLocalStorage();
}

function createEditTask() {
  const main = document.getElementById('toDo');
  let editForm = document.createElement('form');
  editForm.classList.add('editForm');
  editForm.classList.add('hidden');
  main.appendChild(editForm);
  let editInputs = document.createElement('editInputs');
  editForm.appendChild(editInputs);
  let titleLabel = document.createElement('label');
  editInputs.appendChild(titleLabel);
  titleLabel.textContent = 'Title:';
  let editTaskName = document.createElement('input');
  editTaskName.setAttribute('type', 'text');
  editTaskName.setAttribute('id', 'editTaskName');
  editForm.appendChild(editTaskName);
  let detailLabel = document.createElement('label');
  detailLabel.textContent = 'Details:';
  editForm.appendChild(detailLabel);
  let detail = document.createElement('textarea');
  detail.setAttribute('id', 'editTaskDetails');
  detail.setAttribute('type', 'text');
  editForm.appendChild(detail);
  let dateLabel = document.createElement('label');
  dateLabel.textContent = 'Date:';
  editForm.appendChild(dateLabel);
  let date = document.createElement('input');
  date.setAttribute('type', 'date');
  date.setAttribute('id', 'editDate');
  editForm.appendChild(date);
  let buttons = document.createElement('div');
  buttons.classList.add('formBtn');
  editForm.appendChild(buttons);
  let submitEdit = document.createElement('input');
  submitEdit.setAttribute('id', 'editFormSubmit');
  submitEdit.setAttribute('type', 'submit');
  submitEdit.setAttribute('value', 'Edit');
  buttons.appendChild(submitEdit);
  submitEdit.addEventListener('click', (e) => {
    //process the input from the edit task form
    let title = document.querySelector('#editTaskName').value;
    let details = document.querySelector('#editTaskDetails').value;
    let dateInput = document.querySelector('#editDate').value;
    let taskId = findHiddenTask().id;
    let selectedTask = findSelectedTask(taskId);

    selectedTask.title = title;
    selectedTask.details = details;
    selectedTask.date = processDateData(dateInput);
    saveToLocalStorage();

    let taskEditForm = document.querySelector('.editForm');
    taskEditForm.classList.toggle('hidden');

    e.preventDefault();
    editForm.reset();
    showHiddenTask();
    refreshDisplay(selectedTask.dataProject);
  });

  let cancelEdit = document.createElement('input');
  cancelEdit.setAttribute('type', 'button');
  cancelEdit.setAttribute('id', 'editFormCancel');
  cancelEdit.setAttribute('value', 'Cancel');
  buttons.appendChild(cancelEdit);
  cancelEdit.addEventListener('click', () => {
    editForm.classList.toggle('hidden');
    showHiddenTask();
    editForm.reset();
  });
}
createEditTask();

function populateForm(e) {
  let listNode = e.target.closest('li');
  const editForm = document.querySelector('.editForm');
  const taskTitle = listNode.querySelector('.name').textContent;
  const taskDetails = listNode.querySelector('.details').textContent;
  const taskDate = listNode.querySelector('.dueDate').textContent;

  const titleInput = editForm.querySelector('#editTaskName');
  const detailInput = editForm.querySelector('#editTaskDetails');
  const dateInput = editForm.querySelector('#editDate');
  titleInput.value = taskTitle;
  detailInput.value = taskDetails;
  dateInput.value = taskDate;
}

function refreshDisplay(dataProject) {
  const selectedTile = document.querySelector('.selected');
  if (selectedTile.closest('.projectCard') != null) {
    displayTask(dataProject);
  }
}

//ability to mark important/complete