const STORAGE_KEY = "lockbox_employee_tasks";

// Pre-populated default escape room employee tasks
const defaultEmployeeTasks = [
  {
    id: 101,
    name: "Clean rooms before first reservation",
    desc: "Sanitize props, sweep floor, and wipe glass surfaces in Haunted Lab & Ancient Tomb.",
    dueDate: new Date().toISOString().split("T")[0],
    priority: "High",
    status: "To Do"
  },
  {
    id: 102,
    name: "Make sure all room puzzles work",
    desc: "Test electronic locks, keypad codes, and celestial mirror alignment sensors.",
    dueDate: new Date().toISOString().split("T")[0],
    priority: "High",
    status: "In Progress"
  },
  {
    id: 103,
    name: "Refill smoke machine fluid",
    desc: "Check smoke fluid level in Haunted Lab fogger and refill if under 25%.",
    dueDate: new Date().toISOString().split("T")[0],
    priority: "Medium",
    status: "To Do"
  },
  {
    id: 104,
    name: "Reset Bank Heist laser maze",
    desc: "Align laser emitters and verify alarm trigger sensor responses.",
    dueDate: new Date().toISOString().split("T")[0],
    priority: "Medium",
    status: "Completed"
  }
];

let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultEmployeeTasks;

let statusChartInstance = null;
let priorityChartInstance = null;

document.addEventListener("DOMContentLoaded", () => {
  renderAll();
});

function saveTasksToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function renderAll() {
  saveTasksToStorage();
  const filtered = getFilteredTasks();
  
  renderTable(filtered);
  renderKanban();
  renderSummaryStats();
  renderCharts();
}

function getFilteredTasks() {
  const query = document.querySelector("#searchInput").value.toLowerCase();
  const status = document.querySelector("#statusFilter").value;
  const priority = document.querySelector("#priorityFilter").value;
  const sortBy = document.querySelector("#sortSelect").value;

  return tasks.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(query) || (t.desc && t.desc.toLowerCase().includes(query));
    const matchesStatus = status === "All" || t.status === status;
    const matchesPriority = priority === "All" || t.priority === priority;
    return matchesSearch && matchesStatus && matchesPriority;
  }).sort((a, b) => {
    if (sortBy === "dueDate") return new Date(a.dueDate) - new Date(b.dueDate);
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });
}

function renderTable(taskList) {
  const tbody = document.querySelector("#taskTableBody");
  tbody.innerHTML = "";

  if (taskList.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;">No employee tasks found.</td></tr>`;
    return;
  }

  taskList.forEach(t => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${t.name}</strong></td>
      <td>${t.desc || '-'}</td>
      <td>${t.dueDate}</td>
      <td><span class="badge-${t.priority.toLowerCase()}">${t.priority}</span></td>
      <td>${t.status}</td>
      <td class="action-btns">
        <button class="btn-complete" title="Toggle Complete" onclick="toggleTaskComplete(${t.id})"><i class="bi bi-check-circle"></i></button>
        <button class="btn-edit" title="Edit Task" onclick="editTask(${t.id})"><i class="bi bi-pencil"></i></button>
        <button class="btn-delete" title="Delete Task" onclick="deleteTask(${t.id})"><i class="bi bi-trash"></i></button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function renderKanban() {
  const todoContainer = document.querySelector("#kanbanTodo");
  const progressContainer = document.querySelector("#kanbanProgress");
  const completedContainer = document.querySelector("#kanbanCompleted");

  todoContainer.innerHTML = "";
  progressContainer.innerHTML = "";
  completedContainer.innerHTML = "";

  let counts = { "To Do": 0, "In Progress": 0, "Completed": 0 };

  tasks.forEach(t => {
    if (counts[t.status] !== undefined) {
      counts[t.status]++;
    }
    
    const card = document.createElement("div");
    card.className = "kanban-card";
    card.draggable = true;
    card.ondragstart = (e) => e.dataTransfer.setData("text/plain", t.id);

    card.innerHTML = `
      <div class="kanban-card-header">
        <h4>${t.name}</h4>
        <div class="card-action-btns">
          <button class="btn-complete" title="Toggle Complete" onclick="toggleTaskComplete(${t.id})"><i class="bi bi-check-circle"></i></button>
          <button class="btn-edit" title="Edit Task" onclick="editTask(${t.id})"><i class="bi bi-pencil"></i></button>
          <button class="btn-delete" title="Delete Task" onclick="deleteTask(${t.id})"><i class="bi bi-trash"></i></button>
        </div>
      </div>
      <p>${t.desc || ''}</p>
      <div class="kanban-card-footer">
        <span class="badge-${t.priority.toLowerCase()}">${t.priority}</span>
        <span><i class="bi bi-calendar"></i> ${t.dueDate}</span>
      </div>
    `;

    if (t.status === "To Do") todoContainer.appendChild(card);
    else if (t.status === "In Progress") progressContainer.appendChild(card);
    else if (t.status === "Completed") completedContainer.appendChild(card);
  });

  document.querySelector("#countTodo").textContent = counts["To Do"];
  document.querySelector("#countProgress").textContent = counts["In Progress"];
  document.querySelector("#countCompleted").textContent = counts["Completed"];
}

function allowDrop(e) {
  e.preventDefault();
}

function handleDrop(e, newStatus) {
  e.preventDefault();
  const id = parseInt(e.dataTransfer.getData("text/plain"));
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.status = newStatus;
    renderAll();
  }
}

function renderSummaryStats() {
  document.querySelector("#statTotal").textContent = tasks.length;
  document.querySelector("#statPending").textContent = tasks.filter(t => t.status !== "Completed").length;
  document.querySelector("#statCompleted").textContent = tasks.filter(t => t.status === "Completed").length;
}

function renderCharts() {
  const completed = tasks.filter(t => t.status === "Completed").length;
  const pending = tasks.length - completed;

  const high = tasks.filter(t => t.priority === "High").length;
  const medium = tasks.filter(t => t.priority === "Medium").length;
  const low = tasks.filter(t => t.priority === "Low").length;

  if (statusChartInstance) statusChartInstance.destroy();
  if (priorityChartInstance) priorityChartInstance.destroy();

  const ctx1 = document.querySelector("#statusChart").getContext("2d");
  statusChartInstance = new Chart(ctx1, {
    type: "doughnut",
    data: {
      labels: ["Completed", "Pending"],
      datasets: [{ data: [completed, pending], backgroundColor: ["#22c55e", "#f59e0b"] }]
    },
    options: { plugins: { legend: { labels: { color: "#ffffff" } } } }
  });

  const ctx2 = document.querySelector("#priorityChart").getContext("2d");
  priorityChartInstance = new Chart(ctx2, {
    type: "bar",
    data: {
      labels: ["High", "Medium", "Low"],
      datasets: [{ label: "Tasks", data: [high, medium, low], backgroundColor: ["#ef4444", "#f59e0b", "#3b82f6"] }]
    },
    options: {
      scales: {
        x: { ticks: { color: "#ffffff" } },
        y: { ticks: { color: "#ffffff" }, beginAtZero: true }
      },
      plugins: { legend: { labels: { color: "#ffffff" } } }
    }
  });
}

function openTaskModal() {
  document.querySelector("#taskForm").reset();
  document.querySelector("#taskId").value = "";
  document.querySelector("#modalFormTitle").textContent = "Add Employee Task";
  document.querySelector("#taskDueDate").value = new Date().toISOString().split("T")[0];
  document.querySelector("#taskModal").style.display = "flex";
}

function closeTaskModal() {
  document.querySelector("#taskModal").style.display = "none";
}

function saveTask(e) {
  e.preventDefault();
  const id = document.querySelector("#taskId").value;
  const name = document.querySelector("#taskName").value.trim();
  const desc = document.querySelector("#taskDesc").value.trim();
  const dueDate = document.querySelector("#taskDueDate").value;
  const priority = document.querySelector("#taskPriority").value;
  const status = document.querySelector("#taskStatus").value;

  if (!name || !dueDate) return;

  if (id) {
    const t = tasks.find(item => item.id === parseInt(id));
    if (t) {
      t.name = name; 
      t.desc = desc; 
      t.dueDate = dueDate;
      t.priority = priority; 
      t.status = status;
    }
  } else {
    tasks.push({ 
      id: Date.now(), 
      name, 
      desc, 
      dueDate, 
      priority, 
      status 
    });
  }

  closeTaskModal();
  renderAll();
}

function editTask(id) {
  const t = tasks.find(item => item.id === id);
  if (!t) return;

  document.querySelector("#taskId").value = t.id;
  document.querySelector("#taskName").value = t.name;
  document.querySelector("#taskDesc").value = t.desc || "";
  document.querySelector("#taskDueDate").value = t.dueDate;
  document.querySelector("#taskPriority").value = t.priority;
  document.querySelector("#taskStatus").value = t.status;

  document.querySelector("#modalFormTitle").textContent = "Edit Employee Task";
  document.querySelector("#taskModal").style.display = "flex";
}

function deleteTask(id) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks = tasks.filter(t => t.id !== id);
    renderAll();
  }
}

function toggleTaskComplete(id) {
  const t = tasks.find(item => item.id === id);
  if (t) {
    t.status = t.status === "Completed" ? "To Do" : "Completed";
    renderAll();
  }
}