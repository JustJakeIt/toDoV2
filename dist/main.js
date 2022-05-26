/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module 'date-fns'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module 'date-fns/parseISO'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n\n\n\nlet lastSelected;\n\n// creates empty array for \"Project\" Objects\n\nlet defaultProjectList = [];\nlet projectList = localStorage.getItem('myProjectList');\nprojectList = JSON.parse(projectList || JSON.stringify(defaultProjectList));\n//Assigns ID and saves to local storage\nlet defaultId = 0;\nlet id = Number(localStorage.getItem('currentId')) || defaultId;\n\nfunction saveToLocalStorage() {\n  localStorage.setItem('myProjectList', JSON.stringify(projectList));\n  localStorage.setItem('currentId', id.toString());\n}\n\n//clears list\nfunction clearContent() {\n  const ul = document.querySelector('ul');\n  ul.textContent = '';\n}\n\nfunction createHome() {\n  let homeSection = document.getElementById('homeSection');\n  let titleBar = document.createElement('h2');\n  titleBar.textContent = 'Home';\n  homeSection.appendChild(titleBar);\n  let allTask = document.createElement('div');\n  allTask.classList.add('home');\n  allTask.classList.add('item');\n  let allTaskImg = document.createElement('img');\n  allTaskImg.classList.add('icon');\n  allTaskImg.setAttribute('src', '/dist/assets/completed-task.png');\n  allTask.appendChild(allTaskImg);\n  let allTaskName = document.createElement('span');\n  allTaskName.textContent = 'All Tasks';\n  allTask.appendChild(allTaskName);\n  homeSection.appendChild(allTask);\n  allTask.addEventListener('click', (e) => {\n    selectHomeTile(e.target.closest('div'));\n    clearContent();\n    projectList.forEach((project) => {\n      project.taskList.forEach((task) => {\n        newTaskCard(\n          task.id,\n          task.title,\n          task.details,\n          task.date,\n          task.completed,\n          task.important\n        );\n      });\n    });\n  });\n\n  let today = document.createElement('div');\n  today.classList.add('home');\n  today.classList.add('item');\n  let todayImg = document.createElement('img');\n  todayImg.classList.add('icon');\n  todayImg.setAttribute('src', '/dist/assets/clock.png');\n  today.appendChild(todayImg);\n  let todayName = document.createElement('span');\n  todayName.textContent = 'Today';\n  today.appendChild(todayName);\n  homeSection.appendChild(today);\n  today.addEventListener('click', (e) => {\n    selectHomeTile(e.target.closest('div'));\n    clearContent();\n    let today = Date.parse(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'date-fns'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Date(), 'yyyy-MM-dd'));\n    projectList.forEach((project) => {\n      project.taskList.forEach((task) => {\n        let date = Date.parse(task.date);\n        if (Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'date-fns'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(date, today)) {\n          newTaskCard(\n            task.id,\n            task.title,\n            task.details,\n            task.date,\n            task.completed,\n            task.important\n          );\n        } else {\n          return;\n        }\n      });\n    });\n  });\n\n  let important = document.createElement('div');\n  important.classList.add('home');\n  important.classList.add('item');\n  let importantImg = document.createElement('img');\n  importantImg.classList.add('icon');\n  importantImg.setAttribute('src', '/dist/assets/warning.png');\n  important.appendChild(importantImg);\n  let importantName = document.createElement('span');\n  importantName.textContent = 'Important';\n  important.appendChild(importantName);\n  homeSection.appendChild(important);\n  important.addEventListener('click', (e) => {\n    selectHomeTile(e.target.closest('div'));\n    clearContent();\n    projectList.forEach((project) => {\n      project.taskList.forEach((task) => {\n        if (task.important) {\n          newTaskCard(\n            task.id,\n            task.title,\n            task.details,\n            task.date,\n            task.completed,\n            task.important\n          );\n        } else {\n          return;\n        }\n      });\n    });\n  });\n}\n\ncreateHome();\n// creates a Project Object with an id number, name, and a sub array of TaskList (which will contain tasks)\nconst CreateProject = (dataProject, name) => {\n  const taskList = [];\n  return {\n    dataProject,\n    name,\n    taskList,\n  };\n};\n\n// creates DOM element\nfunction newProjectCard(dataProject, projectName) {\n  let projectCard = document.createElement('div');\n  projectCard.classList.add('projectCard');\n  projectCard.classList.add('item');\n  projectCard.setAttribute('data-project', `${dataProject}`);\n  let leftSide = document.getElementById('leftSide');\n  leftSide.appendChild(projectCard);\n  projectCard.classList.add('title');\n  projectCard.textContent = projectName;\n  projectCard.addEventListener('click', (event) => {\n    selectTile(event.target);\n  });\n  //Need to add array interactions with buttons\n  let projectBtns = document.createElement('div');\n  projectBtns.classList.add('projectBtns');\n  projectCard.appendChild(projectBtns);\n  let renameBtn = document.createElement('button');\n  renameBtn.classList.add('projectRenameBtn');\n  projectBtns.appendChild(renameBtn);\n  renameBtn.textContent = 'Rename';\n  //make a required input box\n  renameBtn.addEventListener('click', (e) => {\n    let newName = prompt('Please enter new project name:');\n\n    if (newName !== '') {\n      projectCard.textContent = ' ';\n      projectCard.textContent = newName;\n      projectList[dataProject].name = newName;\n      projectCard.appendChild(projectBtns);\n    } else if (newName === ' ') {\n      projectCard.textContent = projectName;\n    }\n    e.preventDefault();\n    saveToLocalStorage();\n  });\n\n  let deleteProjectBtn = document.createElement('button');\n  deleteProjectBtn.textContent = 'Delete';\n  deleteProjectBtn.classList.add('deleteProjectBtn');\n  projectBtns.appendChild(deleteProjectBtn);\n  deleteProjectBtn.addEventListener('click', () => {\n    console.log(dataProject);\n    projectCard.remove();\n    sortArray();\n    projectList.splice(dataProject, 1);\n    saveToLocalStorage();\n    location.reload();\n    console.log(projectList);\n  });\n}\n\n//Iterates through all Project Objects within the project list array and creates a card for them\nconst displayProject = (array) => {\n  array.forEach((project) => {\n    newProjectCard(project.dataProject, project.name);\n  });\n};\n\n//Add Project interactions\nconst addProjectBtn = document.getElementById('addProjectBtn');\naddProjectBtn.addEventListener('click', () => {\n  let projectRenameForm = document.getElementById('projectForm');\n  projectRenameForm.reset();\n  projectRenameForm.classList.toggle('hidden');\n});\nconst cancelAddProject = document.querySelector('.projectCancel');\ncancelAddProject.addEventListener('click', () => {\n  let projectRenameForm = document.getElementById('projectForm');\n  projectRenameForm.reset();\n  projectRenameForm.classList.toggle('hidden');\n});\n\n// When user clicks \"Add\". new project is created in the array, and within the dom\nlet renameForm = document.querySelector('.projectAddBtn');\nrenameForm.addEventListener('click', (e) => {\n  let projectName = document.getElementById('projectInput').value;\n  let dataProject = nextDataNumber();\n  const newProject = CreateProject(dataProject, projectName);\n  newProjectCard(dataProject, projectName);\n  e.preventDefault();\n  projectList.push(newProject);\n  saveToLocalStorage();\n  let projectRenameForm = document.getElementById('projectForm');\n  projectRenameForm.reset();\n  projectRenameForm.classList.toggle('hidden');\n\n  console.log(projectList);\n});\n\nconst nextDataNumber = () => {\n  const allprojects = document.querySelectorAll('[data-project]');\n  return allprojects.length;\n};\n\nconsole.log(projectList);\n\nfunction sortArray() {\n  let i = 0;\n  //reorder the dataset in node and change dataProject accordingly\n  const tiles = document.querySelectorAll('.projectCard');\n  tiles.forEach((tile) => {\n    let dataNum = tile.dataset.project;\n    tile.dataset.project = i;\n    projectList[dataNum].dataProject = i;\n    i++;\n  });\n  //reorder projects according to their dataProject nunmber\n  projectList.sort((a, b) => a.dataProject - b.dataProject);\n  saveToLocalStorage();\n}\n\n//Create a \"Project\" Object with name, data project number to match index, and taskList\n\n//make task list an array of task objects\n//each task object with with completed, date due, details, id, important, and name\n\nconst CreateTask = (\n  dataProject,\n  id,\n  title,\n  details,\n  completed,\n  important,\n  date\n) => {\n  return {\n    dataProject,\n    id,\n    title,\n    details,\n    completed: completed,\n    important: important,\n    date: date,\n  };\n};\n\n// creates new task in Dom\nfunction newTaskCard(listId, title, notes, date, completed, important) {\n  const toDoList = document.getElementById('toDoList');\n  const taskCard = document.createElement('li');\n  taskCard.classList.add('taskCard');\n  taskCard.id = listId;\n  taskCard.important = important;\n  taskCard.completed = completed;\n  toDoList.appendChild(taskCard);\n\n  const taskComplete = document.createElement('div');\n  if (completed) {\n    taskComplete.classList.add('active');\n  } else {\n    taskComplete.classList.remove('active');\n  }\n  taskComplete.classList.add('taskComplete');\n  taskComplete.addEventListener('click', (e) => {\n    let listId = e.target.closest('li').id;\n    let selectedTask = findSelectedTask(listId);\n    selectedTask.completed = !selectedTask.completed;\n    saveToLocalStorage();\n    refreshDisplay(selectedTask.dataProject);\n  });\n  taskCard.appendChild(taskComplete);\n\n  const info = document.createElement('div');\n  info.classList.add('info');\n  taskCard.appendChild(info);\n\n  const taskName = document.createElement('div');\n  taskName.classList.add('taskName');\n  taskName.textContent = title;\n  info.appendChild(taskName);\n\n  const details = document.createElement('div');\n  details.classList.add('details');\n  details.textContent = notes;\n  info.appendChild(details);\n\n  const dueDate = document.createElement('div');\n  dueDate.classList.add('dueDate');\n  dueDate.textContent = date;\n  taskCard.appendChild(dueDate);\n\n  const importantBtn = document.createElement('img');\n  importantBtn.setAttribute('id', 'important');\n  importantBtn.classList.add('icon');\n  importantBtn.setAttribute('src', '/dist/assets/warning.png');\n  importantBtn.addEventListener('click', (e) => {\n    let listId = e.target.closest('li').id;\n    let selectedTask = findSelectedTask(listId);\n    selectedTask.important = !selectedTask.important;\n    saveToLocalStorage();\n    refreshDisplay(selectedTask.dataProject);\n    console.table(projectList);\n  });\n  taskCard.appendChild(importantBtn);\n\n  const options = document.createElement('div');\n  options.setAttribute('class', 'options');\n  taskCard.appendChild(options);\n\n  const editBtn = document.createElement('button');\n  editBtn.setAttribute('id', 'submitEdit');\n  editBtn.textContent = 'Edit';\n  editBtn.classList.add('taskMenuBtn');\n  options.appendChild(editBtn);\n  editBtn.addEventListener('click', (e) => {\n    let task = e.target.closest('li');\n    populateForm(e);\n    task.classList.add('hidden');\n    let taskEditForm = document.querySelector('.editForm');\n    taskEditForm.classList.toggle('hidden');\n  });\n\n  const deleteBtn = document.createElement('button');\n  deleteBtn.setAttribute('id', 'taskDelete');\n  deleteBtn.textContent = 'Delete';\n  deleteBtn.classList.add('taskMenuBtn');\n  options.appendChild(deleteBtn);\n  deleteBtn.addEventListener('click', (e) => {\n    let listNode = e.target.closest('li');\n    let id = listNode.id;\n    let selectedTask = findSelectedTask(id);\n    let dataProject = selectedTask.dataProject;\n    projectList[dataProject].taskList = projectList[\n      dataProject\n    ].taskList.filter((task) => task != selectedTask);\n    saveToLocalStorage();\n    listNode.remove();\n  });\n}\n\n// find the task via id\nfunction findSelectedTask(listId) {\n  let selectedTask = projectList.reduce((acc, project) => {\n    let currentTask = project.taskList.find((task) => task.id == listId);\n    if (currentTask != null) {\n      acc = currentTask;\n    }\n    return acc;\n  }, {});\n  return selectedTask;\n}\n\nfunction processDateData(date) {\n  let formattedDate;\n  if (!date) {\n    formattedDate = 'No Due Date';\n  } else {\n    formattedDate = date;\n  }\n  return formattedDate;\n}\n//finds the dataProject number of selected project\nfunction findCurrentDataProject() {\n  const selected = document.querySelector('.selected');\n  return selected.dataset.project;\n}\n// submits in information in add task form, creating a new task within the project\nfunction processListInput(e) {\n  let title = document.querySelector('.taskNameInput').value;\n  let details = document.querySelector('.taskNotes').value;\n  let dateInput = document.querySelector('.taskDate').value;\n  const taskForm = document.getElementById('taskForm');\n  let dataProject = findCurrentDataProject();\n  let date = processDateData(dateInput);\n  let listId = id;\n\n  const newTask = CreateTask(\n    dataProject,\n    listId,\n    title,\n    details,\n    false,\n    false,\n    date\n  );\n  projectList[dataProject].taskList.push(newTask);\n  id++;\n  saveToLocalStorage();\n  taskForm.classList.toggle('hidden');\n  newTaskCard(listId, title, details, date);\n  let inputForm = document.querySelector('.inputForm');\n  inputForm.reset();\n  e.preventDefault();\n}\n//erases task lists from dom before replacing task cards\nfunction displayTask(dataProject) {\n  const ul = document.querySelector('ul');\n  ul.textContent = '';\n  projectList[dataProject].taskList.forEach((task) => {\n    newTaskCard(\n      task.id,\n      task.title,\n      task.details,\n      task.date,\n      task.completed,\n      task.important\n    );\n  });\n}\nlet showAddTask = document.querySelector('.addTaskBtn');\nshowAddTask.addEventListener('click', () => {\n  const taskForm = document.getElementById('taskForm');\n  taskForm.classList.toggle('hidden');\n  showAddTask.classList.add('hidden');\n});\nlet addTaskBtn = document.querySelector('.submitTaskBtn');\naddTaskBtn.addEventListener('click', (e) => {\n  processListInput(e);\n  showAddTask.classList.remove('hidden');\n});\nlet cancelTaskBtn = document.querySelector('.taskCancel');\ncancelTaskBtn.addEventListener('click', () => {\n  const taskForm = document.getElementById('taskForm');\n  taskForm.classList.toggle('hidden');\n  showAddTask.classList.remove('hidden');\n});\n\nconst selectTile = (event) => {\n  if (lastSelected) {\n    lastSelected.classList.remove('selected');\n  }\n  lastSelected = event;\n  if (event.classList.contains('selected')) {\n    event.classList.remove('selected');\n  } else {\n    event.classList.add('selected');\n    displayTask(findCurrentDataProject());\n    showAddTask.classList.remove('hidden');\n  }\n};\n\nconst selectHomeTile = (event) => {\n  if (lastSelected) {\n    lastSelected.classList.remove('selected');\n  }\n  lastSelected = event;\n  if (event.classList.contains('selected')) {\n    event.classList.remove('selected');\n  } else {\n    event.classList.add('selected');\n    showAddTask.classList.add('hidden')\n  }\n};\ndisplayProject(projectList);\nfunction showHiddenTask() {\n  const hiddenTask = document.querySelector('li.hidden');\n  hiddenTask.classList.remove('hidden');\n}\nfunction findHiddenTask() {\n  const hiddenTask = document.querySelector('li.hidden');\n  return hiddenTask;\n}\nfunction createEditTask() {\n  const main = document.getElementById('toDo');\n  let editForm = document.createElement('form');\n  editForm.classList.add('editForm');\n  editForm.classList.add('hidden');\n  main.appendChild(editForm);\n  let editInputs = document.createElement('editInputs');\n  editForm.appendChild(editInputs);\n  let titleLabel = document.createElement('label');\n  editInputs.appendChild(titleLabel);\n  titleLabel.textContent = 'Title:';\n  let editTaskName = document.createElement('input');\n  editTaskName.setAttribute('type', 'text');\n  editTaskName.setAttribute('id', 'editTaskName');\n  editForm.appendChild(editTaskName);\n  let detailLabel = document.createElement('label');\n  detailLabel.textContent = 'Details:';\n  editForm.appendChild(detailLabel);\n  let detail = document.createElement('textarea');\n  detail.setAttribute('id', 'editTaskDetails');\n  detail.setAttribute('type', 'text');\n  editForm.appendChild(detail);\n  let dateLabel = document.createElement('label');\n  dateLabel.textContent = 'Date:';\n  editForm.appendChild(dateLabel);\n  let date = document.createElement('input');\n  date.setAttribute('type', 'date');\n  date.setAttribute('id', 'editDate');\n  editForm.appendChild(date);\n  let buttons = document.createElement('div');\n  buttons.classList.add('formBtn');\n  editForm.appendChild(buttons);\n  let submitEdit = document.createElement('input');\n  submitEdit.setAttribute('id', 'editFormSubmit');\n  submitEdit.setAttribute('type', 'submit');\n  submitEdit.setAttribute('value', 'Edit');\n  buttons.appendChild(submitEdit);\n\n  //process the input from the edit task form\n  submitEdit.addEventListener('click', (e) => {\n    let title = document.querySelector('#editTaskName').value;\n    let details = document.querySelector('#editTaskDetails').value;\n    let dateInput = document.querySelector('#editDate').value;\n    let taskId = findHiddenTask().id;\n    let selectedTask = findSelectedTask(taskId);\n\n    selectedTask.title = title;\n    selectedTask.details = details;\n    selectedTask.date = processDateData(dateInput);\n    saveToLocalStorage();\n\n    let taskEditForm = document.querySelector('.editForm');\n    taskEditForm.classList.toggle('hidden');\n\n    e.preventDefault();\n    editForm.reset();\n    showHiddenTask();\n    refreshDisplay(selectedTask.dataProject);\n  });\n\n  let cancelEdit = document.createElement('input');\n  cancelEdit.setAttribute('type', 'button');\n  cancelEdit.setAttribute('id', 'editFormCancel');\n  cancelEdit.setAttribute('value', 'Cancel');\n  buttons.appendChild(cancelEdit);\n  cancelEdit.addEventListener('click', () => {\n    editForm.classList.toggle('hidden');\n    showHiddenTask();\n    editForm.reset();\n  });\n}\ncreateEditTask();\n\nfunction populateForm(e) {\n  console.log(e.target.closest('li'));\n  let listNode = e.target.closest('li');\n  const editForm = document.querySelector('.editForm');\n  const taskTitle = listNode.querySelector('.taskName').textContent;\n  const taskDetails = listNode.querySelector('.details').textContent;\n  const taskDate = listNode.querySelector('.dueDate').textContent;\n\n  const titleInput = editForm.querySelector('#editTaskName');\n  const detailInput = editForm.querySelector('#editTaskDetails');\n  const dateInput = editForm.querySelector('#editDate');\n  titleInput.value = taskTitle;\n  detailInput.value = taskDetails;\n  dateInput.value = taskDate;\n}\n\nfunction refreshDisplay(dataProject) {\n  const selectedTile = document.querySelector('.selected');\n  if (selectedTile.closest('.projectCard') != null) {\n    displayTask(dataProject);\n  }\n}\n// mode select\n\nfunction modeSelect() {\n  const toggleSwitch = document.querySelector('.mode input[type=\"checkbox\"]');\n\n  function switchTheme(e) {\n    if (e.target.checked) {\n      document.documentElement.setAttribute('data-theme', 'light');\n    } else {\n      document.documentElement.removeAttribute('data-theme', 'light');\n    }\n  }\n  toggleSwitch.addEventListener('change', switchTheme, false);\n}\nconst sidebarHide = document.querySelector('.hideSidebar');\nconst leftSide = document.getElementById('leftSide');\nsidebarHide.addEventListener('click', () => {\n  leftSide.classList.toggle('hidden');\n});\n\nmodeSelect();\n//all task\n\n\n//# sourceURL=webpack://todov2/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;