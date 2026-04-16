let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

const entrada = document.getElementById("entrada-tarea");
const botonAgregar = document.getElementById("btn-agregar");
const lista = document.getElementById("lista-tareas");
const contador = document.getElementById("contador");

botonAgregar.addEventListener("click", agregarTarea);

mostrarTareas();

function agregarTarea(){

const texto = entrada.value.trim();

if(texto === "") return;

tareas.push({
texto: texto,
completada: false
});

entrada.value = "";

guardarLocalStorage();
mostrarTareas();

}

function mostrarTareas(){

lista.innerHTML = "";

tareas.forEach((tarea, indice)=>{

const elemento = document.createElement("li");


const checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.checked = tarea.completada;

checkbox.addEventListener("change", () => {
completarTarea(indice);
});


const texto = document.createElement("span");
texto.textContent = tarea.texto;

if(tarea.completada){
texto.classList.add("completada");
}


const botones = document.createElement("div");
botones.classList.add("botones");

const btnEditar = document.createElement("button");
btnEditar.textContent = "✏";
btnEditar.addEventListener("click", () => {
editarTarea(indice);
});

const btnEliminar = document.createElement("button");
btnEliminar.textContent = "🗑";
btnEliminar.addEventListener("click", () => {
eliminarTarea(indice);
});

botones.appendChild(btnEditar);
botones.appendChild(btnEliminar);


const izquierda = document.createElement("div");
izquierda.classList.add("tarea-izquierda");

izquierda.appendChild(checkbox);
izquierda.appendChild(texto);

elemento.appendChild(izquierda);
elemento.appendChild(botones);

lista.appendChild(elemento);

});

actualizarContador();

}

function eliminarTarea(indice){
tareas.splice(indice,1);
guardarLocalStorage();
mostrarTareas();
}

function completarTarea(indice){
tareas[indice].completada = !tareas[indice].completada;
guardarLocalStorage();
mostrarTareas();
}

function editarTarea(indice){

const nuevoTexto = prompt("Editar tarea:", tareas[indice].texto);

if(nuevoTexto !== null){
tareas[indice].texto = nuevoTexto;
guardarLocalStorage();
mostrarTareas();
}

}

function guardarLocalStorage(){
localStorage.setItem("tareas", JSON.stringify(tareas));
}

function actualizarContador(){

const pendientes = tareas.filter(t => !t.completada).length;
const completadas = tareas.filter(t => t.completada).length;

contador.textContent = `Tareas pendientes: ${pendientes} | Completadas: ${completadas}`;

}