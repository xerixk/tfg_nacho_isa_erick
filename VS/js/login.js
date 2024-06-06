let urlogin = "http://localhost:8084/usuario/login";
let urlregistro = "http://localhost:8084/usuario/registro";




document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const registro = urlParams.get('registro');
    const signInButton = document.getElementById("signIn");
    const signUpButton = document.getElementById("signUp");
    const signInContainer = document.querySelector(".sign-in-container");
    const signUpContainer = document.querySelector(".sign-up-container");
    const container = document.getElementById("container");

    if (registro === "true") {
        signUpContainer.style.display = "block";
        signInContainer.style.display = "none";
        container.classList.add("right-panel-active");
    }

    signInButton.addEventListener("click", function () {
        signInContainer.style.display = "block";
        signUpContainer.style.display = "none";
        container.classList.remove("right-panel-active");
    });

    signUpButton.addEventListener("click", function () {
        signInContainer.style.display = "none";
        signUpContainer.style.display = "block";
        container.classList.add("right-panel-active");
    });
});

function inicioSesion() {
    let userInput = document.getElementById("user").value;
    let passInput = document.getElementById("pass").value;

    if (userInput.trim() === "" || passInput.trim() === "") {
        alert("Por favor ingresa tu nombre de usuario y contraseña.");
        return;
    }

    var datosInicioSesion = {
        "username": userInput,
        "password": passInput,
    };

    fetch("http://localhost:8084/usuarios/login", {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosInicioSesion)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud de inicio de sesión.');
            }
            return response.json();
        })
        .then(usuario => {
            sessionStorage.setItem("username", usuario.username);
            sessionStorage.setItem("idPerfil", usuario.idPerfil);
            if (usuario.idTarifa != null) {
                sessionStorage.setItem("idTarifa", usuario.idTarifa);
            } else {
                sessionStorage.removeItem('idTarifa');
            }
            window.location.href = "index.html";
        })
        .catch(error => {
            console.error('Error:', error);
        });
}




