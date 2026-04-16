document.addEventListener('DOMContentLoaded', () => {
    let tareas = JSON.parse(localStorage.getItem('uniajc_pro_v3')) || [];
    let editandoID = null; // Para saber qué tarea estamos editando

    const listaUI = document.querySelector('#todo-list');
    const btnAgregar = document.querySelector('#add-todo-btn');
    
    // Inputs
    const inputTitulo = document.querySelector('#todo-title');
    const selectEstado = document.querySelector('#todo-status');
    const inputObs = document.querySelector('#todo-obs');
    const inputFecha = document.querySelector('#date-picker');

    const guardarDB = () => {
        localStorage.setItem('uniajc_pro_v3', JSON.stringify(tareas));
        renderizar();
    };

    const agregarTarea = () => {
        if (!inputTitulo.value || !inputFecha.value) return alert("Llena los campos obligatorios");

        if (editandoID) {
            // Lógica de ACTUALIZAR (Update)
            const index = tareas.findIndex(t => t.id === editandoID);
            tareas[index].titulo = inputTitulo.value;
            tareas[index].estado = selectEstado.value;
            tareas[index].obs = inputObs.value;
            tareas[index].fecha = inputFecha.value;
            
            editandoID = null;
            btnAgregar.innerText = "Agregar Tarea";
            btnAgregar.style.backgroundColor = ""; // Vuelve al morado
        } else {
            // Lógica de CREAR (Create)
            tareas.push({
                id: Date.now(),
                titulo: inputTitulo.value,
                estado: selectEstado.value,
                obs: inputObs.value,
                fecha: inputFecha.value
            });
        }

        limpiarFormulario();
        guardarDB();
    };

    window.prepararEdicion = (id) => {
        const tarea = tareas.find(t => t.id === id);
        inputTitulo.value = tarea.titulo;
        selectEstado.value = tarea.estado;
        inputObs.value = tarea.obs;
        inputFecha.value = tarea.fecha;

        editandoID = id;
        btnAgregar.innerText = "Actualizar Cambios";
        btnAgregar.style.backgroundColor = "#81c784"; // Verde para indicar edición
        window.scrollTo(0,0); // Sube al formulario
    };

    window.eliminarTarea = (id) => {
        tareas = tareas.filter(t => t.id !== id);
        guardarDB();
    };

    const limpiarFormulario = () => {
        inputTitulo.value = '';
        inputObs.value = '';
        inputFecha.value = '';
        selectEstado.value = 'en-proceso';
    };

    const renderizar = () => {
        listaUI.innerHTML = '';
        tareas.forEach(t => {
            const item = document.createElement('div');
            item.className = `todo-item ${t.estado}`;
            
            item.innerHTML = `
                <div class="todo-info">
                    <div class="header-item">
                        <strong>${t.titulo}</strong>
                        <span class="badge-estado">${t.estado.replace('-', ' ')}</span>
                    </div>
                    <small>📅 ${t.fecha}</small>
                    ${t.obs ? `<p class="obs-text"><strong>Avance:</strong> ${t.obs}</p>` : ''}
                </div>
                <div class="actions">
                    <button class="edit-btn" onclick="prepararEdicion(${t.id})">📝</button>
                    <button class="delete-btn" onclick="eliminarTarea(${t.id})">🗑️</button>
                </div>
            `;
            listaUI.appendChild(item);
        });
    };

    btnAgregar.addEventListener('click', agregarTarea);
    renderizar();
});