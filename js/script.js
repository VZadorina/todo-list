// ======================
// DOM
// ======================
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const clearBtn = document.getElementById('clear-btn');
const list = document.getElementById('todo-list');

const filterAll = document.getElementById('filter-all');
const filterActive = document.getElementById('filter-active');
const filterCompleted = document.getElementById('filter-completed');

// ======================
// Save / Load
// ======================
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.todo-item').forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        const span = item.querySelector('span');

        tasks.push({
            text: span.textContent,
            checked: checkbox.checked
        });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const saved = localStorage.getItem('tasks');

    if (!saved) return;

    const tasks = JSON.parse(saved);

    list.innerHTML = '';

    tasks.forEach(task => {
        createTaskElement(task.text, task.checked);
    });
}

// ======================
// Create element
// ======================
function createTaskElement(text, checked = false) {
    const li = document.createElement('li');
    li.classList.add('todo-item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = checked;

    if (checked) {
        li.classList.add('completed');
    }

    checkbox.addEventListener('change', () => {
        li.classList.toggle('completed', checkbox.checked);
        saveTasks();
        applyCurrentFilter(); // ВАЖНО
    });

    const span = document.createElement('span');
    span.textContent = text;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'УДАЛИТЬ';
    deleteBtn.classList.add('delete-btn');

    deleteBtn.addEventListener('click', () => {
        li.remove();
        saveTasks();
        applyCurrentFilter(); // ВАЖНО
    });

    li.append(checkbox, span, deleteBtn);
    list.appendChild(li);
}

// ======================
// Add task
// ======================
function addTask() {
    const taskText = input.value.trim();

    if (!taskText) return;

    createTaskElement(taskText);

    input.value = '';

    saveTasks();

    applyCurrentFilter(); // ВАЖНО
}

// ======================
// Filters
// ======================
function filterTasks(type) {
    const tasks = document.querySelectorAll('.todo-item');

    tasks.forEach(task => {
        const checkbox = task.querySelector('input[type="checkbox"]');

        if (type === 'all') {
            task.style.display = 'flex';
        } else if (type === 'active') {
            task.style.display = checkbox.checked ? 'none' : 'flex';
        } else if (type === 'completed') {
            task.style.display = checkbox.checked ? 'flex' : 'none';
        }
    });
}

// безопасное применение текущего фильтра
function applyCurrentFilter() {
    const active = document.querySelector('.filters button.active');
    if (!active) return;

    const type = active.id.replace('filter-', '');
    filterTasks(type);
}

// ======================
// Active button
// ======================
function setActiveButton(button) {
    document.querySelectorAll('.filters button').forEach(btn => {
        btn.classList.remove('active');
    });
    button.classList.add('active');
}

// ======================
// Events
// ======================
addBtn.addEventListener('click', addTask);

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        addTask();
    }
});

clearBtn.addEventListener('click', () => {
    list.innerHTML = '';
    localStorage.removeItem('tasks'); // исправление
    setActiveButton(filterAll);
});

// фильтры
filterAll.addEventListener('click', () => {
    setActiveButton(filterAll);
    filterTasks('all');
});

filterActive.addEventListener('click', () => {
    setActiveButton(filterActive);
    filterTasks('active');
});

filterCompleted.addEventListener('click', () => {
    setActiveButton(filterCompleted);
    filterTasks('completed');
});

// ======================
// INIT
// ======================
loadTasks();
setActiveButton(filterAll);
filterTasks('all');