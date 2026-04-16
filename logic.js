const addButton = document.getElementById("addButton");
addButton.addEventListener("click", agregar);

function actualizarContadores() {
    const tareas = document.querySelectorAll("#taskList li");
    const completadas = document.querySelectorAll("#taskList input:checked");

    document.getElementById("completed").textContent = completadas.length;
    document.getElementById("waiting").textContent = tareas.length - completadas.length;
}

function agregar() {
    const inputTask = document.getElementById("inputTask");
    const tasklist = document.getElementById("taskList");
    let text = inputTask.value.trim();

    if (text === "") return;

    let li = document.createElement("li");
    li.className = "taskItem";

    const check = document.createElement("input");
    check.type = "checkbox";
    check.className = "check"

    const span = document.createElement("span");
    span.textContent = text;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "deleteBtn";
    deleteBtn.textContent = "🗑";

    
    check.addEventListener("change", function () {
        span.classList.toggle("completed");
        actualizarContadores();
    });
    
    deleteBtn.onclick = function () {
        li.remove();
        actualizarContadores();
    };
    const left = document.createElement("div");
    
    left.appendChild(check);
    left.appendChild(span);

    li.appendChild(left);
    li.appendChild(deleteBtn);

    tasklist.appendChild(li);

    inputTask.value = "";

    actualizarContadores();
}