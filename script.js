function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const taskList = document.getElementById('taskList');
    const newTask = document.createElement('li');
    newTask.className = 'task-item';

    newTask.innerHTML = `
        <input type="checkbox" class="task-checkbox" onchange="toggleTask(this)">
        <span class="task-text">${escapeHtml(taskText)}</span>
        <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
    `;

    taskList.appendChild(newTask);
    input.value = '';
    input.focus();
    updateStats();
    updateEmptyState();
}

function deleteTask(button) {
    button.parentElement.remove();
    updateStats();
    updateEmptyState();
}

function toggleTask(checkbox) {
    const taskItem = checkbox.parentElement;
    taskItem.classList.toggle('completed');
    updateStats();
}

function updateStats() {
    const taskList = document.getElementById('taskList');
    const tasks = taskList.querySelectorAll('.task-item');
    const completed = taskList.querySelectorAll('.task-item.completed');
    
    const total = tasks.length;
    const complete = completed.length;
    const pending = total - complete;

    document.getElementById('totalCount').textContent = total;
    document.getElementById('completeCount').textContent = complete;
    document.getElementById('pendingCount').textContent = pending;
}

function updateEmptyState() {
    const taskList = document.getElementById('taskList');
    const emptyState = document.getElementById('emptyState');
    
    if (taskList.querySelectorAll('.task-item').length === 0) {
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Allow Enter key to add task
document.getElementById('taskInput').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

updateStats();
updateEmptyState();
