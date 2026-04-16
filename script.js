const entradaTarea = document.getElementById('entradaTarea');
const botonAgregarTarea = document.getElementById('botonAgregarTarea');
const listaTareas = document.getElementById('tareas');

function crearBotonAccion(label, nombreClase, manejadorClick) {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = label;
  button.className = `boton-accion-tarea ${nombreClase}`;
  button.addEventListener('click', manejadorClick);
  return button;
}

function crearTextoTarea(texto) {
  const textoTarea = document.createElement('span');
  textoTarea.className = 'texto-tarea';
  textoTarea.textContent = texto;
  return textoTarea;
}

function crearItemTarea(texto) {
  const itemTarea = document.createElement('li');
  itemTarea.className = 'tarea-item';

  let textoTarea = crearTextoTarea(texto);
  const botonCompletar = crearBotonAccion('Completar', 'boton-completar', () => {
    const completada = itemTarea.classList.toggle('completada');
    botonCompletar.textContent = completada ? 'Desmarcar' : 'Completar';
  });

  const botonEditar = crearBotonAccion('Editar', 'boton-editar', () => {
    if (itemTarea.classList.contains('editando')) {
      guardarEdicionTarea();
    } else {
      iniciarEdicionTarea();
    }
  });

  const botonEliminar = crearBotonAccion('Eliminar', 'boton-eliminar', () => {
    listaTareas.removeChild(itemTarea);
  });

  function iniciarEdicionTarea() {
    itemTarea.classList.add('editando');
    const entradaEdicion = document.createElement('input');
    entradaEdicion.type = 'text';
    entradaEdicion.className = 'entrada-edicion';
    entradaEdicion.value = textoTarea.textContent;

    itemTarea.replaceChild(entradaEdicion, textoTarea);
    botonEditar.textContent = 'Guardar';
    entradaEdicion.focus();

    entradaEdicion.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        guardarEdicionTarea();
      } else if (event.key === 'Escape') {
        cancelarEdicionTarea();
      }
    });
  }

  function guardarEdicionTarea() {
    const entradaEdicion = itemTarea.querySelector('.entrada-edicion');
    if (!entradaEdicion) return;

    const textoActualizado = entradaEdicion.value.trim();
    if (textoActualizado === '') {
      entradaEdicion.focus();
      return;
    }

    const textoTareaActualizado = crearTextoTarea(textoActualizado);
    itemTarea.replaceChild(textoTareaActualizado, entradaEdicion);
    textoTarea = textoTareaActualizado;
    itemTarea.classList.remove('editando');
    botonEditar.textContent = 'Editar';
  }

  function cancelarEdicionTarea() {
    const entradaEdicion = itemTarea.querySelector('.entrada-edicion');
    if (!entradaEdicion) return;

    itemTarea.replaceChild(textoTarea, entradaEdicion);
    itemTarea.classList.remove('editando');
    botonEditar.textContent = 'Editar';
  }

  itemTarea.appendChild(textoTarea);
  itemTarea.appendChild(botonCompletar);
  itemTarea.appendChild(botonEditar);
  itemTarea.appendChild(botonEliminar);
  return itemTarea;
}

function agregarTarea() {
  const textoTareaNueva = entradaTarea.value.trim();
  if (textoTareaNueva === '') {
    entradaTarea.focus();
    return;
  }

  const itemTarea = crearItemTarea(textoTareaNueva);
  listaTareas.appendChild(itemTarea);
  entradaTarea.value = '';
  entradaTarea.focus();
}

botonAgregarTarea.addEventListener('click', agregarTarea);

entradaTarea.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    agregarTarea();
  }
});
