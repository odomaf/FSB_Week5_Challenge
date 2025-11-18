// 02-Challenge: Task Board (Unsolved Starter)
//
// Use this file to implement:
// - Task creation
// - Task rendering
// - Drag-and-drop across columns
// - Color-coding by due date using Day.js
// - Persistence with localStorage

// ===== State & Initialization =====

// Load tasks and nextId from localStorage (or use defaults)
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// Utility to save tasks + nextId
function saveState() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("nextId", JSON.stringify(nextId));
}

// ===== Core Functions =====

// - Return a unique id to use for a task
// - Increment nextId and persist using saveState()
function generateTaskId() {
  //console.log(`On entering generateTaskId, nextId is ${nextId}`);
  uniqueId = nextId;
  //console.log(`uniqueID is ${uniqueId}`);
  nextId++;
  //console.log(`nextId is now ${nextId}`);
  return uniqueId;
}

// TODO: createTaskCard(task)
// - Return a jQuery element representing a task card
// - Include:
//   - Title
//   - Description
//   - Due date
//   - Delete button
// - Add a data-task-id attribute for later lookups
// - Use Day.js to color-code:
//   - If task is not in "done":
//     - Add a warning style if due soon / today
//     - Add an overdue style if past due
function createTaskCard(task) {
  //all of this needs to change to use the task parameter above, but this is the function it should be in
  console.log(`Creating Card: ${task.title}`);

  //create all elements card will use
  var cardEl = document.createElement("div");
  var cardBodyEl = document.createElement("div");
  var cardTitleEl = document.createElement("h5");
  var cardDueDateEl = document.createElement("h6");
  var cardDescriptionEl = document.createElement("p");
  var cardStatusEl = document.createElement("h6");
  var cardRemoveButtonEl = document.createElement("button");
  var cardFormEl = document.createElement("form");

  //fill elements with data
  cardTitleEl.textContent = task.title;
  cardDueDateEl.textContent = task.dueDate;
  cardDescriptionEl.textContent = task.description;
  cardStatusEl.textContent = task.status;
  cardRemoveButtonEl.innerHTML = "Delete Task";

  //set element attributes
  cardEl.setAttribute("id", task.id);
  cardEl.setAttribute("class", "task-card");
  cardEl.setAttribute("style", "width: 18rem;");
  cardBodyEl.setAttribute("class", "card-body");
  cardTitleEl.setAttribute("class", "task-card-title");
  cardDueDateEl.setAttribute("class", "task-card-meta");
  cardDescriptionEl.setAttribute("class", "task-card-text");
  cardStatusEl.setAttribute("class", "task-card-meta");
  const formId = "form-" + task.id;
  cardFormEl.setAttribute("id", formId);
  cardRemoveButtonEl.setAttribute("class", "task-card-delete-button");
  const buttonId = "button-" + task.id;
  cardRemoveButtonEl.setAttribute("id", buttonId);

  //append elements
  cardFormEl.appendChild(cardRemoveButtonEl);
  cardBodyEl.appendChild(cardTitleEl);
  cardBodyEl.appendChild(cardDueDateEl);
  cardBodyEl.appendChild(cardDescriptionEl);
  cardBodyEl.appendChild(cardStatusEl);
  cardBodyEl.appendChild(cardFormEl);
  cardEl.appendChild(cardBodyEl);

  return cardEl;
}

// TODO: renderTaskList()
// - Clear all lane containers (#todo-cards, #in-progress-cards, #done-cards)
// - Loop through tasks array
// - For each task, create a card and append it to the correct lane
// - After rendering, make task cards draggable with jQuery UI
function renderTaskList() {
  //clear task board for fresh render
  const toDoSwimlaneEl = document.getElementById("todo-cards");
  toDoSwimlaneEl.innerHTML = "";
  console.log("RenderingTaskList");
  console.log(tasks);

  //for each item in the task list, append it to the
  //appropriate lane for its status,
  //add button functionality, & add draggable functionality
  for (i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const buttonId = "#button-" + task.id;
    // console.log(`Task Id: ${task.id}`);
    // console.log(`Task Title: ${task.title}`);
    const card = createTaskCard(task);
    // console.log(card);
    toDoSwimlaneEl.appendChild(card);
    const button = document.getElementById(buttonId);
    $(buttonId).on("click", handleDeleteTask);
    const taskElId = "#" + task.id;
    $(function () {
      $(taskElId).draggable();
    });
  }
}

// TODO: handleAddTask(event)
// - Prevent default form submission
// - Read values from #taskTitle, #taskDescription, #taskDueDate
// - Validate: if missing, you can show a message or just return
// - Create a new task object with:
//   - id from generateTaskId()
//   - title, description, dueDate
//   - status: 'to-do'
// - Push to tasks array, save, re-render
// - Reset the form and close the modal
function handleAddTask(event) {
  event.preventDefault();
  console.log("Pressed the New Task button");

  const taskTitle = $("#taskTitle").val();
  const taskDueDate = $("#taskDueDate").val();
  const taskDescription = $("#taskDescription").val();
  const taskID = generateTaskId();
  const taskStatus = "todo";
  //   console.log(`Task id: ${taskID}`);
  //   console.log(`Task title: ${taskTitle}`);
  //   console.log(`Task Due Date: ${taskDueDate}`);
  //   console.log(`Task Description: ${taskDescription}`);

  const task = {
    id: taskID,
    title: taskTitle,
    dueDate: taskDueDate,
    description: taskDescription,
    status: taskStatus,
  };

  tasks.push(task);
  // console.log("Resetting Form");
  $("#taskForm").trigger("reset");
  $("#taskModal").modal("toggle");

  renderTaskList();
}

// TODO: handleDeleteTask(event)
// - Get the task id from the clicked button (data-task-id)
// - Remove that task from tasks array
// - Save and re-render
function handleDeleteTask(event) {
  event.preventDefault();

  //get taskId for card to delete
  const buttonId = "#" + event.target.id;
  const taskId = $(buttonId).parent().parent().parent()[0].id;
  // console.log(`Discovered taskId: ${taskId}`);

  //find the task with the correct id in the tasks array
  const task = tasks.find((obj) => obj.id == taskId);
  // console.log(`Deleting task with id ${task.id}  and title ${task.title}`);

  //get the index of the task we need to delete
  let taskIndex = tasks.findIndex((obj) => obj.id == taskId);
  // console.log(`Task index to delete: ${taskIndex}`);
  // console.log(`Tasks array length: ${tasks.length}`);

  //remove the task at that index from the tasks array
  if (taskIndex !== -1) {
    // console.log(`Removing task with splice: ${tasks[taskIndex].title}`);
    tasks.splice(taskIndex, 1);
    // console.log(`Tasks array length: ${tasks.length}`);
  }
  renderTaskList();
}

// TODO: handleDrop(event, ui)
// - Get the task id from the dragged card
// - Determine the new status from the lane's dataset/status or id
// - Update the task's status in the tasks array
// - Save and re-render
function handleDrop(event, ui) {
  console.log("You dropped a card on me");
}

// ===== Document Ready =====

$(function () {
  // Make lanes droppable
  // TODO: configure droppable to accept task cards and use handleDrop
  $(".lane-body").droppable({
    accept: ".task-card",
    drop: handleDrop,
  });

  // Show current date in header using Day.js
  $("#current-date").text(dayjs().format("[Today:] dddd, MMM D, YYYY"));

  // Initialize datepicker for due date
  // Hint: keep format consistent and use it in your parsing
  $("#taskDueDate").datepicker({
    dateFormat: "yy-mm-dd",
    changeMonth: true,
    changeYear: true,
    minDate: 0,
  });

  //clear tasks on page load
  //we may not need to do this, esp if we want tasks to persist. Consider?
  tasks = [];
  // console.log(`Length of tasks array: ${tasks.length}`);
  // Render tasks on load
  renderTaskList();

  // Form submit handler
  $("#taskForm").on("submit", handleAddTask);
});

// NOTE:
// - You are encouraged to use Day.js for ALL date logic.
// - You may adjust “due soon” rules, as long as they’re clearly implemented.
