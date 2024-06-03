document.addEventListener('DOMContentLoaded', cargarTarifas);

function logo() {
    window.location = "home.html";
}

function verDetalles(detalles, verOcu) {
    if (detalles.style.display === "block") {
        detalles.style.display = "none";
        verOcu.innerHTML = "ver detalles";
    } else {
        detalles.style.display = "block";
        verOcu.innerHTML = "ocultar detalles";
    }
}

function cargarTarifas() {
    fetch("http://localhost:8084/tarifa/todas")
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(tar => {
            console.log("Tarifas cargadas:", tar); 
            tar.forEach(tarifas => {
                let contPlanes = document.querySelector(`#contenedor_planes [data-plan="${tarifas.idTarifa}"]`);
                if (contPlanes) {
                    let titPlan = contPlanes.querySelector('#titPlan');
                    titPlan.querySelector('h1').textContent = tarifas.nombre;
                    titPlan.querySelector('b').textContent = `${tarifas.precio}€/mes`;
                    let descripcion = contPlanes.querySelector('p');
                    descripcion.textContent = tarifas.descripcion;
                    console.log(`Tarifa actualizada: ${tarifas.nombre} - ${tarifas.descripcion} - ${tarifas.precio}€/mes`);
                    let botComprar=contPlanes.querySelector('.bot');
                    botComprar.setAttribute('onclick', `comprarTarifa(${tarifas.idTarifa})`)
                } else {
                    console.warn(`No se encontró el contenedor para el plan con id ${tarifas.idTarifa}`);
                }
            });
        })
        .catch(error => {
            console.error('Error al cargar los planes:', error);
        });
}
function comprarTarifa(idTarifa) {
    console.log('Tarifa seleccionada:', idTarifa);
    localStorage.setItem('idTarifa',idTarifa);
    window.location.href="pago.html"
    var username = localStorage.getItem('username');
    var email = localStorage.getItem('email');
    var password = localStorage.getItem('password');
    var nombre = localStorage.getItem('nombre');
    var apellidos = localStorage.getItem('apellido');
    if (!username || !email || !password || !nombre || !apellidos || !idTarifa) {
        console.error('Faltan datos necesarios para registrar el usuario');
        return;
    }
    var usuario = {
        "username": username,
        "email": email,
        "password": password,
        "nombre": nombre,
        "apellidos": apellidos,
        "tarifa":{
            "idTarifa":idTarifa
        }
    };

    fetch(`http://localhost:8084/usuarios/alta`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud de registro.');
                }
                return response.json();
            })
            .then(data => {
                console.log('Usuario registrado:', data);
                alert("usuario registrado")
            })
            .catch(error => {
                console.error('Error:', error);
            });
}