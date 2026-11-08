const STORAGE_KEY = "lockbox_employee_tasks";  //save and store all the task in the browser
const getToday = () => new Date().toISOString().split("T")[0]; //gets today's date

let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) ; //look for saved task in storege key 
let statusChart = null, priorityChart = null; //Empty variables ready to hold your Chart.js graph objects

// Initialize on load
document.addEventListener("DOMContentLoaded", renderAll);

// Save & Master Render
function saveTasks() { 
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); //takes the array of tasks, turns it into a text string and saves it into the browser's memory
}

function renderAll() { //saves the latest data and refreshes/ render all 4 dashboard sections
  saveTasks(); 
  const filtered = getFilteredTasks();
  renderTable(filtered);
  renderKanban();
  renderStats();
  renderCharts();
}

// Search the tasks
function getFilteredTasks() {
  const query = document.querySelector("#searchInput").value.toLowerCase();
  const status = document.querySelector("#statusFilter").value;
  const priority = document.querySelector("#priorityFilter").value;
  const sortBy = document.querySelector("#sortSelect").value;

  return tasks
    .filter(task => 
      (task.name.toLowerCase().includes(query) || (task.desc && task.desc.toLowerCase().includes(query))) &&
      (status === "All" || task.status === status) &&
      (priority === "All" || task.priority === priority)
    )

    //sort the tasks, ask for sort option if no check the next option
    .sort((a, b) => 
      sortBy === "dueDate" ? new Date(a.dueDate) - new Date(b.dueDate) : 
      sortBy === "name" ? a.name.localeCompare(b.name) : 0
    );
}

// Render Table View
function renderTable(taskList) {
  const tbody = document.querySelector("#taskTableBody");

  if (!taskList.length) { //If there are no tasks to show, display the message
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;">No employee tasks found.</td></tr>`;
    return;
  }

  //Transforms every task object into an HTML table row
  tbody.innerHTML = taskList.map(task => `
    <tr>
      <td><strong>${task.name}</strong></td>
      <td>${task.desc || '-'}</td>
      <td>${task.dueDate}</td>
      <td><span class="badge-${task.priority.toLowerCase()}">${task.priority}</span></td>
      <td>${task.status}</td>
      <td class="action-btns">${getActionBtns(task.id)}</td>
    </tr>
  `).join(""); //Joins all generated table row strings together
}

// Render Kanban Board
function renderKanban() {
  const containers = { 
    "To Do": document.querySelector("#kanbanTodo"),
    "In Progress": document.querySelector("#kanbanProgress"),
    "Completed": document.querySelector("#kanbanCompleted")
  };
  const counts = { "To Do": 0, "In Progress": 0, "Completed": 0 }; //create three counters

  Object.values(containers).forEach(container => container.innerHTML = ""); //clears the three columns

  tasks.forEach(task => {
    if (counts[task.status] !== undefined) counts[task.status]++; //increases the counter for the task's status
    
    const card = document.createElement("div");

    card.className = "kanban-card";

    card.draggable = true; //allows to drag the task with our mouse

    card.ondragstart = (e) => e.dataTransfer.setData("text/plain", task.id); //remembers the ID of the task when we start dragging it
    
    //Puts the task's name, description, priority, date and buttons inside the card
    card.innerHTML = `
      <div class="kanban-card-header">
        <h4>${task.name}</h4>
        <div class="card-action-btns">${getActionBtns(task.id)}</div>
      </div>
      <p>${task.desc || ''}</p>
      <div class="kanban-card-footer">
        <span class="badge-${task.priority.toLowerCase()}">${task.priority}</span>
        <span><i class="bi bi-calendar"></i> ${task.dueDate}</span>
      </div>
    `;
    containers[task.status]?.appendChild(card); //puts the card into the correct column
  });

  document.querySelector("#countTodo").textContent = counts["To Do"];
  document.querySelector("#countProgress").textContent = counts["In Progress"];
  document.querySelector("#countCompleted").textContent = counts["Completed"];
}

// Action buttons template helper
function getActionBtns(id) {
  return `
    <button class="btn-complete" title="Toggle Complete" onclick="toggleTaskComplete(${id})"><i class="bi bi-check-circle"></i></button> 
    <button class="btn-edit" title="Edit Task" onclick="editTask(${id})"><i class="bi bi-pencil"></i></button>
    <button class="btn-delete" title="Delete Task" onclick="deleteTask(${id})"><i class="bi bi-trash"></i></button>
  `;
}

// Drag & Drop, allows to move tasks
const allowDrop = (e) => e.preventDefault();

//drag the task, changes it status automatically
function handleDrop(e, newStatus) {
  e.preventDefault();
  const id = parseInt(e.dataTransfer.getData("text/plain"));
  const task = tasks.find(item => item.id === id);
  if (task) { task.status = newStatus; renderAll(); }
}

// Render Summary Numbers (total, complete, pending tasks)
function renderStats() {
  const completed = tasks.filter(task => task.status === "Completed").length;
  document.querySelector("#statTotal").textContent = tasks.length;
  document.querySelector("#statPending").textContent = tasks.length - completed;
  document.querySelector("#statCompleted").textContent = completed;
}

// Render Chart.js Analytics
function renderCharts() {
  const completed = tasks.filter(task => task.status === "Completed").length;
  const priorities = ["High", "Medium", "Low"].map(p => tasks.filter(task => task.priority === p).length);

  //removes the old charts before creating new ones
  statusChart?.destroy(); 
  priorityChart?.destroy();

  //creates doughnut chart
  statusChart = new Chart(document.querySelector("#statusChart"), {
    type: "doughnut",
    data: { labels: ["Completed", "Pending"], datasets: [{ data: [completed, tasks.length - completed], backgroundColor: ["#22c55e", "#f59e0b"] }] },
    options: { plugins: { legend: { labels: { color: "#ffffff" } } } }
  });

  //creates a bar chart
  priorityChart = new Chart(document.querySelector("#priorityChart"), {
    type: "bar",
    data: { labels: ["High", "Medium", "Low"], datasets: [{ label: "Tasks", data: priorities, backgroundColor: ["#ef4444", "#f59e0b", "#3b82f6"] }] },
    options: { scales: { x: { ticks: { color: "#ffffff" } }, y: { ticks: { color: "#ffffff" }, beginAtZero: true } }, plugins: { legend: { labels: { color: "#ffffff" } } } }
  });
}

// pop-up window for add new task
function openTaskModal() {
  document.querySelector("#taskForm").reset();
  document.querySelector("#taskId").value = "";
  document.querySelector("#modalFormTitle").textContent = "Add Employee Task";
  document.querySelector("#taskDueDate").value = getToday();
  document.querySelector("#taskModal").style.display = "flex";
}

const closeTaskModal = () => document.querySelector("#taskModal").style.display = "none"; //close the pop-up

//saves a task
function saveTask(e) {
  e.preventDefault(); //stop refreshing the page

  const id = document.querySelector("#taskId").value;
  const name = document.querySelector("#taskName").value.trim();
  const dueDate = document.querySelector("#taskDueDate").value;
  if (!name || !dueDate) return;

  //Creates a new object containing all the task information
  const taskData = {
    name,
    desc: document.querySelector("#taskDesc").value.trim(),
    dueDate,
    priority: document.querySelector("#taskPriority").value,
    status: document.querySelector("#taskStatus").value
  };

  if (id) {
    Object.assign(tasks.find(item => item.id === parseInt(id)), taskData); //update the id information
  } else {
    tasks.push({ id: Date.now(), ...taskData }); //create new task
  }

  //close the pop-up and refresh the board
  closeTaskModal();
  renderAll();
}

//edit tsak, show the information of the edit task
function editTask(id) {
  const task = tasks.find(item => item.id === id);
  if (!task) return;

  document.querySelector("#taskId").value = task.id;
  document.querySelector("#taskName").value = task.name;
  document.querySelector("#taskDesc").value = task.desc || "";
  document.querySelector("#taskDueDate").value = task.dueDate;
  document.querySelector("#taskPriority").value = task.priority;
  document.querySelector("#taskStatus").value = task.status;
  document.querySelector("#modalFormTitle").textContent = "Edit Employee Task";
  document.querySelector("#taskModal").style.display = "flex";
}

//delete a task
function deleteTask(id) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks = tasks.filter(task => task.id !== id); //keeps all tasks EXCEPT the one with the ID we want to delete
    renderAll();
  }
}

//set a task as completed
function toggleTaskComplete(id) {
  const task = tasks.find(item => item.id === id);
  if (task) {
    task.status = task.status === "Completed" ? "To Do" : "Completed";
    renderAll();
  }
}