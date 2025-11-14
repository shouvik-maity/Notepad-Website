const topicInput = document.querySelector('.topic');
const detailInput = document.querySelector('.detail');
const addbtn = document.querySelector('.add');
const later = document.querySelector('.later');
let tasks = [];

// Load tasks from localStorage when page loads
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        displayTasks();
    }
}

// Add new task
function addtask() {
    const title = topicInput.value.trim();
    const description = detailInput.value.trim();
    
    if (title === '' || description === '') {
        alert("Please fill in both Topic and Description");
        return;
    }
    
    const task = {
        id: Date.now(),
        title: title,
        description: description,
        completed: false
    };
    
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    topicInput.value = '';
    detailInput.value = '';
    topicInput.focus();
    
    displayTasks();
    alert("Task Added Successfully");
}

// Display all tasks
function displayTasks() {
    if (tasks.length === 0) {
        later.innerHTML = '<div class="empty-state">No notes yet. Add one to get started!</div>';
        return;
    }
    
    later.innerHTML = tasks.map(task => `
        <div class="subcont">
            <div class="topicout">${task.title}</div>
            <div class="descripout">${task.description}</div>
            <div class="task-actions">
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
                <button class="complete-btn" onclick="toggleComplete(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
            </div>
        </div>
    `).join('');
}

// Delete task
function deleteTask(id) {
    if (confirm('Are you sure you want to delete this note?')) {
        tasks = tasks.filter(task => task.id !== id);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
    }
}

// Toggle task completion
function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
    }
}

// Event listeners
addbtn.addEventListener('click', addtask);
topicInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addtask();
});
detailInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addtask();
});

// Load tasks on page load
loadTasks();
