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
  uniqueId = nextId;
  nextId = nextId++;
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
  console.log(`Task title: ${task.title}`);
  console.log(`Task Due Date: ${task.dueDate}`);
  console.log(`Task Description: ${task.Description}`);

  cardTitle.textContent = taskTitleEl.val();
  $(function () {
    $("#sampleCard").draggable();
  });
}

// TODO: renderTaskList()
// - Clear all lane containers (#todo-cards, #in-progress-cards, #done-cards)
// - Loop through tasks array
// - For each task, create a card and append it to the correct lane
// - After rendering, make task cards draggable with jQuery UI
function renderTaskList() {
  console.log("RenderingTaskList");
  console.log(tasks);

  // Your code here
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
  console.log("Added a task");
  console.log(`Event ${event}`);
  const taskTitle = $("#taskTitle").val();
  const taskDueDate = $("#taskDueDate").val();
  const taskDescription = $("#taskDescription").val();
  const taskID = generateTaskId();
  const taskStatus = "todo";
  console.log(`Task id: ${taskID}`);
  console.log(`Task title: ${taskTitle}`);
  console.log(`Task Due Date: ${taskDueDate}`);
  console.log(`Task Description: ${taskDescription}`);

  const task = {
    id: taskID,
    title: taskTitle,
    dueDate: taskDueDate,
    description: taskDescription,
    status: taskStatus,
  };

  tasks.push(task);
  $("#taskModal").modal("toggle");
  renderTaskList();
}

// TODO: handleDeleteTask(event)
// - Get the task id from the clicked button (data-task-id)
// - Remove that task from tasks array
// - Save and re-render
function handleDeleteTask(event) {
  // Your code here
}

// TODO: handleDrop(event, ui)
// - Get the task id from the dragged card
// - Determine the new status from the lane's dataset/status or id
// - Update the task's status in the tasks array
// - Save and re-render
function handleDrop(event, ui) {
  // Your code here
}

// ===== Document Ready =====

$(function () {
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

  // Render tasks on load (will do nothing until you implement renderTaskList)
  renderTaskList();

  // Form submit handler
  $("#taskForm").on("submit", handleAddTask);

  // Make lanes droppable
  // TODO: configure droppable to accept task cards and use handleDrop
  $(".lane-body").droppable({
    // accept: '.task-card',
    // drop: handleDrop,
  });
});

// NOTE:
// - You are encouraged to use Day.js for ALL date logic.
// - You may adjust “due soon” rules, as long as they’re clearly implemented.
