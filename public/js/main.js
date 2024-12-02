// Referencias a elementos del DOM
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const fecha = document.getElementById("fecha");

function cerrarSesion(event) {
    fetch("/api/auth/logout")
        .then(response => {
            if (response.ok) {
                window.location.href = "/";
            } else {
                console.log('Error during logout');
            }
        })
        .catch(err => console.log(err));
}

// Cargar tareas al inicio
loadTasks();

function registerForm(event) {
    event.preventDefault(); // Evita el envío por defecto del formulario

    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const registerForm = document.querySelector("#register-form");

    fetch("/api/auth/crear", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, name, email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            // Redirige a la página de inicio si el registro es exitoso
            window.location.href = "/";
        } else {
            alert(data.msg || 'Error al registrarse');
        }
    })
    .catch(err => {
        console.error(err);
        alert('Hubo un error al intentar registrarse.');
    });
}

function updateTask(id, concepto, fecha) {
    const taskUpdate = prompt("Actualiza la tarea", concepto);
    if (!taskUpdate) return;

    fetch(`http://localhost:8080/api/tareas/actualizar/${id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            concepto: taskUpdate,
            fecha
        })
    })
    .then(resp => {
        if (!resp.ok) throw new Error("Error al actualizar la tarea.");
        return resp.json();
    })
    .then(() => loadTasks()) // Recargar la lista después de actualizar
    .catch(err => {
        console.error(err);
        alert("Error al actualizar la tarea. Inténtalo de nuevo más tarde.");
    });
}

function deleteTask(id) {
    if (!confirm("¿Estás seguro de que quieres eliminar esta tarea?")) return;

    fetch(`http://localhost:8080/api/tareas/eliminar/${id}`, {
        method: "DELETE"
    })
    .then(resp => {
        if (!resp.ok) throw new Error("Error al eliminar la tarea.");
        return resp.json();
    })
    .then(() => loadTasks()) // Recargar la lista después de eliminar
    .catch(err => {
        console.error(err);
        alert("Error al eliminar la tarea. Inténtalo de nuevo más tarde.");
    });
}

taskForm.addEventListener("submit", addTask);

function addCalendar(fechas){
    let hoy = new Date().getDay();  // Método correcto para obtener el día de la semana

    // Crear un arreglo con contadores para cada día de la semana (0 = Domingo, 1 = Lunes, ..., 6 = Sábado)
    let tareasPorDia = [0, 0, 0, 0, 0, 0, 0];

    // Contamos las tareas por día
    fechas.forEach((i) => {
        const fecha = new Date(i.fecha).getDay(); // Obtener el día de la semana de la tarea
        tareasPorDia[fecha]++;  // Aumentar el contador del día correspondiente
    });

    // Generar el HTML para los días de la semana con la cantidad de tareas
    document.querySelector("#diasSemana").innerHTML = `
        <h2 class="text-xl font-semibold text-teal-600">Días</h2>
        <ul class="mt-4 space-y-2">
            <li><a href="#" class="block p-2 bg-teal-${hoy === 1 ? "400 font-bold" : "200"} dark:text-black rounded-lg hover:bg-teal-300 transition" value="1">Lunes ${tareasPorDia[1] > 0 ? `<span class="bg-teal-600 text-white rounded-full px-3 py-1 text-sm shadow-md  transform transition-all hover:scale-105">${tareasPorDia[1]}</span>` : ""}</a></li>
            <li><a href="#" class="block p-2 bg-teal-${hoy === 3 ? "400 font-bold" : "200"} dark:text-black rounded-lg hover:bg-teal-300 transition" value="3">Miércoles ${tareasPorDia[3] > 0 ? `<span class="bg-teal-600 text-white rounded-full px-3 py-1 text-sm shadow-md transform transition-all hover:scale-105">${tareasPorDia[3]}</span>` : ""}</a></li>
            <li><a href="#" class="block p-2 bg-teal-${hoy === 2 ? "400 font-bold" : "200"} dark:text-black rounded-lg hover:bg-teal-300 transition" value="2">Martes ${tareasPorDia[2] > 0 ? `<span class="bg-teal-600 text-white rounded-full px-3 py-1 text-sm shadow-md transform transition-all hover:scale-105">${tareasPorDia[2]}</span>` : ""}</a></li>
            <li><a href="#" class="block p-2 bg-teal-${hoy === 5 ? "400 font-bold" : "200"} dark:text-black rounded-lg hover:bg-teal-300 transition" value="5">Viernes ${tareasPorDia[5] > 0 ? `<span class="bg-teal-600 text-white rounded-full px-3 py-1 text-sm shadow-md transform transition-all hover:scale-105">${tareasPorDia[5]}</span>` : ""}</a></li>
            <li><a href="#" class="block p-2 bg-teal-${hoy === 4 ? "400 font-bold" : "200"} dark:text-black rounded-lg hover:bg-teal-300 transition" value="4">Jueves ${tareasPorDia[4] > 0 ? `<span class="bg-teal-600 text-white rounded-full px-3 py-1 text-sm shadow-md transform transition-all hover:scale-105">${tareasPorDia[4]}</span>` : ""}</a></li>
            <li><a href="#" class="block p-2 bg-teal-${hoy === 6 ? "400 font-bold" : "200"} dark:text-black rounded-lg hover:bg-teal-300 transition" value="6">Sábado ${tareasPorDia[6] > 0 ? `<span class="bg-teal-600 text-white rounded-full px-3 py-1 text-sm shadow-md transform transition-all hover:scale-105">${tareasPorDia[6]}</span>` : ""}</a></li>
            <li><a href="#" class="block p-2 bg-teal-${hoy === 0 ? "400 font-bold" : "200"} dark:text-black rounded-lg hover:bg-teal-300 transition" value="0">Domingo ${tareasPorDia[0] > 0 ? `<span class="bg-teal-600 text-white rounded-full px-3 py-1 text-sm shadow-md transform transition-all hover:scale-105">${tareasPorDia[0]}</span>` : ""}</a></li>
        </ul>
    `;
}


// Cargar las tareas desde el servidor
function loadTasks() {
    fetch("http://localhost:8080/api/tareas")
        .then(response => {
            if (!response.ok) throw new Error("Error al obtener tareas.");
            return response.json();
        })
        .then(data => {
            addCalendar(data);
            taskList.innerHTML = ''; 
            data.forEach(task => {
                addTaskToList(task.concepto, task.fecha, task._id);
            });
        })
        .catch(error => {
            console.error(error);
            alert("Error al cargar las tareas.");
        });
}

// Agregar una tarea al servidor
function addTask(event) {
    event.preventDefault(); // Prevenir el refresh del formulario
    const concepto = taskInput.value.trim();
    const fechaTarea = new Date(fecha.value.trim()); 
    fechaTarea.setDate(fechaTarea.getDate() + 1);

    if (!concepto) return alert("Por favor, escribe una tarea.");
    if (!fechaTarea) return alert("Por favor, selecciona una fecha.");

    // Convertir la fecha a ISO (sin hora)
    const fechaISO = fechaTarea.toISOString().split("T")[0];
    fetch("http://localhost:8080/api/tareas/crear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ concepto, fecha: fechaISO })
    })
    .then(response => {
        if (!response.ok) throw new Error("Error al agregar tarea.");
        return response.json();
    })
    .then(() => {
        addTaskToList(concepto, fechaISO); // Agregar la tarea a la lista local
        taskInput.value = ""; // Limpiar input
    })
    .catch(error => {
        console.error("Error al agregar tarea:", error);
        alert("Error al agregar tarea.");
    });
}


function addTaskToList(concepto, fecha, id) {
    const date = new Date(fecha);
    const hoy = new Date(); // Fecha actual
    hoy.setHours(0, 0, 0, 0); // Ignorar horas para comparar solo la fecha
    date.setHours(0, 0, 0, 0);

    const esHoy = date.getTime() === hoy.getTime(); // Comparar fechas sin horas
    const timestamp = esHoy ? "Hoy" : date.toLocaleDateString();

    const taskElement = document.createElement("li");
    taskElement.classList.add("bg-teal-100", "p-4", "rounded-lg", "flex", "justify-between", "items-center","my-6");

    taskElement.innerHTML = `
        <h5>${esHoy ? "<span class='text-green-500 font-bold dark:text-black'>Hoy</span>" : `<span class="text-gray font-bold dark:text-black">${timestamp}</span>`}</h5>
        <span class="dark:text-black">${concepto}</span>
        <div class="flex gap-5">
            <span onclick="updateTask('${id}','${concepto}','${fecha}')" class="cursor-pointer"><i class="fa-solid fa-pen dark:text-black"></i></span>
            <span onclick="deleteTask('${id}')" class="cursor-pointer"><i class="fa-solid fa-x dark:text-black"></i></span>
        </div>
    `;

    // Insertar tareas "Hoy" primero
    if (esHoy) {
        // Verificar si ya existe un contenedor para tareas de hoy
        let hoyContainer = document.querySelector("#hoy-container");
        if (!hoyContainer) {
            hoyContainer = document.createElement("ul");
            hoyContainer.id = "hoy-container";
            hoyContainer.innerHTML = `
                <h4 class="text-lg font-bold text-green-500 mb-2">Tareas de Hoy</h4>
            `;
            taskList.prepend(hoyContainer); // Agregar al inicio de la lista
        }
        hoyContainer.appendChild(taskElement);
    } else {
        // Verificar si ya existe un separador entre hoy y otras tareas
        let otherTasksSeparator = document.querySelector("#other-tasks-separator");
        if (!otherTasksSeparator) {
            const separator = document.createElement("hr");
            separator.id = "other-tasks-separator";
            separator.classList.add("my-4", "border-t", "border-gray-300");
            taskList.appendChild(separator); // Agregar el separador
        }
        taskList.appendChild(taskElement);
    }
}


// Login
function dashboardRoute(event) {
    event.preventDefault();

    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    if (!username || !password) {
        alert('Por favor, ingresa ambos campos.');
        return;
    }

    fetch("/api/auth/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (!response.ok) throw new Error('Error en el login');
        return response.json();
    })
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
}
