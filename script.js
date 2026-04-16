let tareas = [];

const entrada = document.getElementById("entrada-tarea");
const botonAgregar = document.getElementById("btn-agregar");
const lista = document.getElementById("lista-tareas");

botonAgregar.addEventListener("click", agregarTarea);

function agregarTarea(){

const texto = entrada.value;

if(texto === "") return;

tareas.push({
texto: texto,
completada: false
});

entrada.value = "";

mostrarTareas();

}

function mostrarTareas(){

lista.innerHTML = "";

tareas.forEach((tarea, indice)=>{

const elemento = document.createElement("li");

if(tarea.completada){
elemento.classList.add("completada");
}

elemento.innerHTML = `
${tarea.texto}

<div>
<button onclick="completarTarea(${indice})">✔</button>
<button onclick="editarTarea(${indice})">Editar</button>
<button onclick="eliminarTarea(${indice})">Eliminar</button>
</div>
`;

lista.appendChild(elemento);

});

}

function eliminarTarea(indice){
tareas.splice(indice,1);
mostrarTareas();
}

function completarTarea(indice){
tareas[indice].completada = !tareas[indice].completada;
mostrarTareas();
}

function editarTarea(indice){

const nuevoTexto = prompt("Editar tarea:", tareas[indice].texto);

if(nuevoTexto !== null){
tareas[indice].texto = nuevoTexto;
mostrarTareas();
}

}