const API_URL = "https://frontend-developer-2r2v.onrender.com/api"; 

// Use same selectors you had
let allTasks = document.querySelector("#allTasks");
let taskInp = document.querySelector(".taskInput");
let addBtn = document.querySelector("#button-addon2");

// ✅ Use your deployed backend URL
const API = 'https://frontend-developer-2r2v.onrender.com/api';

const token = localStorage.getItem('token');

if (!token) {
  // Not logged in — redirect to login
  window.location.href = 'login.html';
}

// helper to create task DOM
function createTaskElement(task) {
  const taskContainer = document.createElement('div');
  taskContainer.classList.add('taskContainer');
  taskContainer.dataset.id = task._id;

  taskContainer.innerHTML = `
    <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''}>
    <p>${task.text}</p>
    <i class="fa-solid fa-trash delBtn"></i>
  `;

  // styling for completed
  if (task.completed) {
    const text = taskContainer.querySelector('p');
    text.style.textDecoration = 'line-through';
    text.style.color = '#9CA3AF';
    taskContainer.style.backgroundColor = '#0F5132';
    const cb = taskContainer.querySelector('.checkbox');
    cb.style.backgroundColor = '#16A34A';
  }

  return taskContainer;
}

// Load tasks from backend
async function loadTasks() {
  try {
    const res = await fetch(`${API}/tasks`, {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    if (!res.ok) throw new Error('Failed to fetch tasks');
    const tasks = await res.json();
    allTasks.innerHTML = '';
    tasks.forEach(t => allTasks.appendChild(createTaskElement(t)));
  } catch (err) {
    console.error('Load tasks error', err);
  }
}

allTasks.addEventListener("click", async function (e) {
  const parentTask = e.target.closest(".taskContainer");
  if (!parentTask) return;
  const id = parentTask.dataset.id;

  // Toggle completed
  if (e.target.classList.contains("checkbox")) {
    const completed = e.target.checked;
    try {
      const res = await fetch(`${API}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ completed })
      });
      if (!res.ok) throw new Error('Failed to update task');
      const updated = await res.json();

      // Update styles
      const text = parentTask.querySelector('p');
      if (completed) {
        e.target.style.backgroundColor = "#16A34A";
        parentTask.style.backgroundColor = "#0F5132";
        text.style.textDecoration = "line-through";
        text.style.color = "#9CA3AF";
      } else {
        e.target.style.backgroundColor = "#FFFFFF";
        parentTask.style.backgroundColor = "#161B22";
        text.style.textDecoration = "none";
        text.style.color = "#E6EDF3";
      }
    } catch (err) {
      console.error(err);
    }
  }

  // Delete task
  if (e.target.classList.contains("delBtn")) {
    try {
      const res = await fetch(`${API}/tasks/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token }
      });
      if (!res.ok) throw new Error('Failed to delete task');
      parentTask.remove();
    } catch (err) {
      console.error(err);
    }
  }
});

// Add new task
addBtn.addEventListener("click", async function () {
  let taskText = taskInp.value.trim();
  if (taskText === "") return;

  try {
    const res = await fetch(`${API}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ text: taskText })
    });
    if (!res.ok) throw new Error('Failed to add task');
    const task = await res.json();
    allTasks.appendChild(createTaskElement(task));
    taskInp.value = "";
  } catch (err) {
    console.error(err);
  }
});

// On load
loadTasks();

// Get the user info from localStorage
const user = JSON.parse(localStorage.getItem('user'));

// If user exists, update the name
if (user && user.name) {
    document.getElementById('userName').textContent = user.name;
}

// Display current time
function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // handle 0 as 12
    const minsStr = minutes < 10 ? '0' + minutes : minutes;

    document.getElementById('timeDisplay').textContent = `Time: ${hours}:${minsStr} ${ampm}`;
}

updateTime();
setInterval(updateTime, 1000);
