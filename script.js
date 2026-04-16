// Array para almacenar las tareas
let todos = JSON.parse(localStorage.getItem('todos')) || [
    {
        id: 1,
        title: 'Comprar víveres',
        dueDate: '2024-04-20',
        completed: false
    },
    {
        id: 2,
        title: 'Lavar el coche',
        dueDate: '2024-04-21',
        completed: false
    },
    {
        id: 3,
        title: 'Hacer la cena',
        dueDate: '2024-04-22',
        completed: false
    }
];

// Función para guardar las tareas en localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Función para renderizar la lista de tareas
function render() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'todo-item--completed' : ''}`;
        li.dataset.id = todo.id;

        li.innerHTML = `
            <input type="checkbox" class="todo-item__checkbox" ${todo.completed ? 'checked' : ''}>
            <span class="todo-item__text">${todo.title}</span>
            <span class="todo-item__date">${formatDate(todo.dueDate)}</span>
            <button class="todo-item__edit-btn" title="Editar">✏️</button>
            <button class="todo-item__delete-btn" title="Eliminar">🗑️</button>
        `;

        todoList.appendChild(li);
    });
}

// Función para formatear la fecha
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
}

// Función para añadir una nueva tarea
function addTodo(title, dueDate) {
    const newTodo = {
        id: Date.now(), // Usar timestamp como ID único
        title: title.trim(),
        dueDate: dueDate,
        completed: false
    };
    todos.push(newTodo);
    saveTodos();
    render();
}

// Función para eliminar una tarea
function deleteTodo(id) {
    if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
        todos = todos.filter(todo => todo.id !== id);
        saveTodos();
        render();
    }
}

// Función para editar una tarea
function editTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        const newTitle = prompt('Editar tarea:', todo.title);
        if (newTitle !== null && newTitle.trim() !== '') {
            todo.title = newTitle.trim();
            saveTodos();
            render();
        }
    }
}

// Función para alternar el estado completado de una tarea
function toggleCompleted(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        render();
    }
}

// Event listener para el formulario
document.getElementById('todo-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const titleInput = document.getElementById('todo-title');
    const dateInput = document.getElementById('date-picker');

    const title = titleInput.value;
    const dueDate = dateInput.value;

    if (title && dueDate) {
        addTodo(title, dueDate);
        titleInput.value = '';
        dateInput.value = '';
    }
});

// Event listener para la lista de tareas (delegación de eventos)
document.getElementById('todo-list').addEventListener('click', function (e) {
    const target = e.target;
    const li = target.closest('.todo-item');
    if (!li) return;

    const id = parseInt(li.dataset.id);

    if (target.classList.contains('todo-item__checkbox')) {
        toggleCompleted(id);
    } else if (target.classList.contains('todo-item__edit-btn')) {
        editTodo(id);
    } else if (target.classList.contains('todo-item__delete-btn')) {
        deleteTodo(id);
    }
});

// Renderizar la lista inicial
render();