const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const clearBtn = document.getElementById('clear-btn');
const list = document.getElementById('todo-list');

function saveTasks() {
    localStorage.setItem('tasks', list.innerHTML);
};

function addTask() {
    const taskText = input.value.trim();
    if (!taskText) return;

    const li = document.createElement('li');
    li.classList.add('todo-item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const span = document.createElement('span');
    span.textContent = taskText;


    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'УДАЛИТЬ';

    deleteBtn.classList.add('delete-btn');

    deleteBtn.addEventListener('click', () => li.remove());

    li.append(checkbox, span, deleteBtn);
    list.appendChild(li);

    input.value = '';

    saveTasks();
}



addBtn.addEventListener('click', addTask);

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTask();
});

clearBtn.addEventListener('click', () => {
    list.innerHTML = '';
    saveTasks();
});

list.innerHTML = localStorage
.getItem('tasks') || '';