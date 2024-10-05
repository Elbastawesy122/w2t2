const taskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const texteditt = document.getElementById('text-edit');
const textarea = document.getElementById('text-area');
let currentTaskElement = null; 
let oldTaskValue = ''; // Variable to store the old task value

// load tasks from localStorage
document.addEventListener('DOMContentLoaded', loadTasks);

// add a new task
addTaskButton.addEventListener('click', () => {
    const taskValue = taskInput.value;
    if (taskValue) {
        addTask(taskValue);
        storeTask(taskValue); 
        showNotification('Task added successfully');
        taskInput.value = '';
    }
});

// delete or show task
taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
        removeTaskFromStorage(e.target.parentElement.querySelector('.task-text').textContent);
        showNotification('Task deleted successfully');
    } else if (e.target.classList.contains('Show')) {
        texteditt.classList.toggle('active');
        currentTaskElement = e.target.parentElement.querySelector('.task-text'); 
        oldTaskValue = currentTaskElement.textContent; // Store the old task value
        textarea.value = currentTaskElement.textContent; 
    }
});

// handle edit button click
texteditt.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        texteditt.classList.remove('active');
    } else if (e.target.classList.contains('edit')) {
        const updatedText = textarea.value;
        if (currentTaskElement && updatedText.trim()) {
            currentTaskElement.textContent = updatedText; 
            updateTaskInStorage(oldTaskValue, updatedText); // Pass old and new task values
            texteditt.classList.remove('active'); 
            showNotification('Task updated successfully');
        }
    }
});

// add task to the DOM
function addTask(taskValue) {
    const li = document.createElement('li');
    li.innerHTML = `<span class="task-text">${taskValue}</span>
                    <button class="Show">Show</button>
                    <button class="delete">X</button>`;
    taskList.appendChild(li);
}

// load tasks from localStorage
function loadTasks() {
    const tasks = getTasksFromStorage();
    tasks.forEach(task => addTask(task));
}

// store tasks in localStorage
function storeTask(task) {
    let tasks = getTasksFromStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// update task in localStorage
function updateTaskInStorage(oldTask, newTask) {
    let tasks = getTasksFromStorage();
    const taskIndex = tasks.indexOf(oldTask);
    if (taskIndex !== -1) {
        tasks[taskIndex] = newTask; 
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

// get tasks from localStorage
function getTasksFromStorage() {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
}

// remove task from localStorage
function removeTaskFromStorage(taskText) {
    let tasks = getTasksFromStorage();
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// show notification
function showNotification(message) {
    alert(message);
}
