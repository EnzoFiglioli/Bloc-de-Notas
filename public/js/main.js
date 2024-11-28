// Referencias a elementos del DOM
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Cargar tareas al inicio
loadTasks();

function registerForm(event) {
    event.preventDefault(); // Evita el envío por defecto del formulario

    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    const registerForm = document.querySelector("#register-form");

    fetch("/api/auth/crear", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            // Redirige a la página de inicio si el registro es exitoso
            window.location.href = "/";
        } else {
            // Muestra un mensaje de error si algo salió mal
            alert(data.msg || 'Error al registrarse');
        }
    })
    .catch(err => {
        console.error(err);
        alert('Hubo un error al intentar registrarse.');
    });
}

// Asegúrate de vincular la función al evento de submit del formulario

function updateTask(id, concepto) {
    const taskUpdate = prompt("Actualiza la tarea", concepto);
    fetch(`http://localhost:8080/api/tareas/actualizar/${id}`, {
        method: "PATCH",
        headers: {
            'Content-type':'application/json'
        },
        body: JSON.stringify({
            concepto: taskUpdate
        })
    })
    .then(resp => resp.json())
    .then(data => {
        console.log(data);
        loadTasks(); // Recargar la lista después de eliminar
    })
    .catch(err => {
        console.error(err);
        alert("Error al actualizar la tarea. Inténtalo de nuevo más tarde.");
    });
}

function deleteTask(id) {
    if (!confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
        return;
    }

    fetch(`http://localhost:8080/api/tareas/eliminar/${id}`, {
        method: "DELETE"
    })
    .then(resp => resp.json())
    .then(data => {
        console.log(data);
        loadTasks(); // Recargar la lista después de eliminar
    })
    .catch(err => {
        console.error(err);
        alert("Error al eliminar la tarea. Inténtalo de nuevo más tarde.");
    });
}

// Escuchar evento submit del formulario
taskForm.addEventListener("submit", addTask);

// Función para cargar las tareas desde el servidor
function loadTasks() {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/api/tareas")
        .then(response => response.json())
        .then(data => {
            taskList.innerHTML = ''; 
            data.forEach(task => addTaskToList(task.concepto, task.timestamp, task._id));
        })
        .catch(error => console.error("Error al obtener tareas:", error));
}

// Función para agregar una tarea al servidor
function addTask(event) {
    event.preventDefault(); // Prevenir el refresh del formulario
    const concepto = taskInput.value.trim(); // Obtener valor del input

    if (!concepto) return alert("Por favor, escribe una tarea."); // Validar campo vacío

    fetch("http://localhost:8080/api/tareas/crear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ concepto }) // Enviar tarea al servidor
    })
        .then(response => response.json())
        .then(() => {
            addTaskToList(concepto); // Agregar la tarea a la lista local
            taskInput.value = ""; // Limpiar input
        })
        .catch(error => console.error("Error al agregar tarea:", error));
}

// Función para agregar una tarea al DOM
function addTaskToList(concepto, fecha, id) {
    const date = new Date(fecha);
    let timestamp = date.toLocaleDateString();
    const taskElement = document.createElement("li");
    taskElement.classList.add("bg-teal-100", "p-4", "rounded-lg", "flex", "justify-between", "items-center");
    taskElement.innerHTML = `
        <h5>${timestamp}</h5>
        <span>${concepto}</span>
        <div class="flex gap-5">
            <span onclick="updateTask('${id}','${concepto}')" id="tarea-actualizar"><i class="fa-solid fa-pen"></i></span>
            <span onclick="deleteTask('${id}')" id="tarea-eliminar"><i class="fa-solid fa-x"></i></span>
        </div>
    `;
    taskList.appendChild(taskElement);
}

function dashboardRoute(event) {
    event.preventDefault();
    try {
        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;

        if (!username || !password) {
            alert('Por favor, ingresa ambos campos.');
            return;
        }

        fetch("/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                window.location.href = "/dashboard";
            } else {
                alert(data.msg || 'Error en el login');
            }
        })
        .catch(err => {
            console.error(err);
            alert('Hubo un error al intentar iniciar sesión.');
        });

    } catch (err) {
        console.error(err);
        alert('Error inesperado en el proceso de login.');
    }
}