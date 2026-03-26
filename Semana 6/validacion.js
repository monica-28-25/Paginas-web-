const estado = {
    usuarios: []
};

let indiceEditando = -1;

const formulario = document.getElementById("formulario");

const campos = {
    nombre: document.getElementById("nombre"),
    correo: document.getElementById("correo"),
    edad: document.getElementById("edad"),
    password: document.getElementById("password"),
    descripcion: document.getElementById("descripcion"),
};

formulario.addEventListener("submit", manejarSubmit);

function manejarSubmit(e) {
    e.preventDefault();

    const datos = obtenerDatos();
    const errores = validarFormulario(datos);

    if (Object.keys(errores).length > 0) {
        mostrarErrores(errores);
        return;
    }

    if (indiceEditando >= 0) {
        estado.usuarios[indiceEditando] = datos;
        indiceEditando = -1;
    } else {
        if (usuarioExiste(datos.correo)) {
            alert("El usuario ingresado ya se encuentra registrado");
            return;
        }
        estado.usuarios.push(datos);
    }

    formulario.reset();
    renderUsuarios();
}

function obtenerDatos() {
    return {
        nombre: campos.nombre.value.trim(),
        correo: campos.correo.value.trim(),
        edad: parseInt(campos.edad.value),
        password: campos.password.value.trim(),
        descripcion: campos.descripcion.value.trim(),
    };
}

function validarFormulario(datos) {
    const errores = {};

    if (datos.nombre.length < 3) {
        errores.nombre = "El minimo de caracteres es de 3";
    }
    if (!datos.correo.includes("@")) {
        errores.correo = "Correo invalido";
    }
    if (isNaN(datos.edad) || datos.edad < 1) {
        errores.edad = "Edad invalida";
    }
    if (datos.password.length < 6) {
        errores.password = "Minimo 6 caracteres";
    }

    return errores;
}

function mostrarErrores(errores) {
    document.getElementById("errorNombre").textContent = errores.nombre || "";
    document.getElementById("errorCorreo").textContent = errores.correo || "";
    document.getElementById("errorEdad").textContent = errores.edad || "";
    document.getElementById("errorPassword").textContent = errores.password || "";
}

function usuarioExiste(correo) {
    for (let i = 0; i < estado.usuarios.length; i++) {
        if (estado.usuarios[i].correo === correo) {
            return true;
        }
    }
    return false;
}

function renderUsuarios() {
    const tabla = document.getElementById("tablaUsuarios");
    const cuerpo = document.getElementById("cuerpoTabla");

    tabla.style.display = "table";
    cuerpo.innerHTML = "";

    for (let i = 0; i < estado.usuarios.length; i++) {
        const u = estado.usuarios[i];
        const fila = document.createElement("tr");

        fila.innerHTML =
            "<td>" + u.nombre + "</td>" +
            "<td>" + u.correo + "</td>" +
            "<td>" + u.edad + "</td>" +
            "<td>" + u.descripcion + "</td>" +
            "<td><button class='btn btn-sm btn-secondary' onclick='editarUsuario(" + i + ")'>Modificar</button></td>";

        cuerpo.appendChild(fila);
    }
}

function editarUsuario(i) {
    const u = estado.usuarios[i];

    campos.nombre.value = u.nombre;
    campos.correo.value = u.correo;
    campos.edad.value = u.edad;
    campos.password.value = u.password;
    campos.descripcion.value = u.descripcion;

    indiceEditando = i;
}