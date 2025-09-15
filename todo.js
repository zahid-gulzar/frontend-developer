let greetBox = document.querySelector(".greeting");
let greeting = document.querySelector("#greet");
let timeDisplay = document.querySelector("#timeDisplay");

// --- Greeting based on time ---
function updateGreeting() {
    let now = new Date();
    let hour = now.getHours();

    if (hour < 12) {
        greeting.textContent = "Good Morning ☀️";
    } else if (hour < 18) {
        greeting.textContent = "Good Afternoon 🌞";
    } else {
        greeting.textContent = "Good Evening 🌙";
    }

    // Animate pop-in when greeting appears
    greeting.classList.add("popIn");
}

// --- Live Clock ---
function updateClock() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;
    minutes = minutes.toString().padStart(2, "0");

    timeDisplay.textContent = `Time: ${hours}:${minutes} ${ampm}`;
}

// Init
updateGreeting();
updateClock();
setInterval(updateClock, 1000);

// Animate fade-out before removal
setTimeout(() => {
    greetBox.classList.add("fadeOut");
    setTimeout(() => {
        greetBox.remove();
    }, 1000); // wait for fadeOut animation
}, 1500); // start fading after 4s

let allTasks = document.querySelector("#allTasks");
let taskInp = document.querySelector(".taskInput");
let addBtn = document.querySelector("#button-addon2");

// Event delegation for tasks
allTasks.addEventListener("click", function (e) {
    if (e.target.classList.contains("checkbox")) {
        let parentTask = e.target.closest(".taskContainer");
        let text = parentTask.querySelector("p");

        if (e.target.checked) {
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
    }

    if (e.target.classList.contains("delBtn")) {
        e.target.closest(".taskContainer").remove();
    }
});

// Add new task
addBtn.addEventListener("click", function () {
    let taskText = taskInp.value.trim();
    if (taskText === "") return;

    let taskContainer = document.createElement("div");
    taskContainer.classList.add("taskContainer");

    taskContainer.innerHTML = `
        <input type="checkbox" class="checkbox">
        <p>${taskText}</p>
        <i class="fa-solid fa-trash delBtn"></i>
    `;

    allTasks.appendChild(taskContainer);
    taskInp.value = "";
});