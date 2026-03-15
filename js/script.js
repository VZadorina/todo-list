const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const clearBtn = document.getElementById('clear-btn');
const list = document.getElementById('todo-list');
const filterAll = document.getElementById('filter-all');
const filterActive = document.getElementById('filter-active');
const filterCompleted = document.getElementById('filter-completed');

function saveTasks() {
    // Сохраняем не только HTML, но и состояние чекбоксов
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
    if (saved) {
        const tasks = JSON.parse(saved);
        list.innerHTML = ''; // Очищаем список
        tasks.forEach(task => {
            createTaskElement(task.text, task.checked);
        });
    }
}

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
    if (checkbox.checked) {
        li.classList.add('completed');
    } else {
        li.classList.remove('completed');
    }
    saveTasks();
});

    const span = document.createElement('span');
    span.textContent = text;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'УДАЛИТЬ';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
        li.remove();
        saveTasks();
        // После удаления применяем текущий фильтр
        const activeFilter = document.querySelector('.filters button.active');
        if (activeFilter) {
            filterTasks(activeFilter.id.replace('filter-', ''));
        }
    });

    li.append(checkbox, span, deleteBtn);
    list.appendChild(li);
    return li;
}

function addTask() {
    const taskText = input.value.trim();
    if (!taskText) return;

    createTaskElement(taskText);
    input.value = '';
    saveTasks();
    
    // После добавления применяем текущий фильтр
    const activeFilter = document.querySelector('.filters button.active');
    if (activeFilter) {
        filterTasks(activeFilter.id.replace('filter-', ''));
    }
}

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

function setActiveButton(button) {
    const buttons = document.querySelectorAll('.filters button');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });
    button.classList.add('active');
}

// Обработчики событий
addBtn.addEventListener('click', addTask);

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

clearBtn.addEventListener('click', () => {
    list.innerHTML = '';
    saveTasks();
    setActiveButton(filterAll);
});

filterAll.addEventListener('click', () => {
    filterTasks('all');
    setActiveButton(filterAll);
});

filterActive.addEventListener('click', () => {
    filterTasks('active');
    setActiveButton(filterActive);
});

filterCompleted.addEventListener('click', () => {
    filterTasks('completed');
    setActiveButton(filterCompleted);
});

// Загружаем задачи при старте
loadTasks();

// Устанавливаем активную кнопку "ВСЕ" при загрузке
setActiveButton(filterAll);