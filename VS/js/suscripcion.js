document.addEventListener('DOMContentLoaded', cargarTarifas);
// document.addEventListener('DOMContentLoaded', cambiarTarifa);

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
function cambiarTarifa() {
    let idTar = parseInt(sessionStorage.getItem('idTarifa'));

    fetch("http://localhost:8084/tarifa/todas")
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(tarifas => {
            console.log("Tarifas cargadas:", tarifas);

            tarifas.forEach(tarifa => {
                let contPlanes = document.querySelector(`#contenedor_planes [data-plan="${tarifa.idTarifa}"]`);
                if (contPlanes) {
                    let titPlan = contPlanes.querySelector('#titPlan');
                    titPlan.querySelector('h1').textContent = tarifa.nombre;
                    titPlan.querySelector('b').textContent = `${tarifa.precio}€/mes`;
                    let descripcion = contPlanes.querySelector('p');
                    descripcion.textContent = tarifa.descripcion;

                    let botComprar = contPlanes.querySelector('.bot');
                    if (botComprar) {
                        console.log("Comparando tarifa:", tarifa.idTarifa, idTar);
                        botComprar.textContent = "Cambiar Tarifa";
                        botComprar.setAttribute('onclick', `cambioTarifa(${tarifa.idTarifa})`);
                        if (tarifa.idTarifa === idTar) {
                            botComprar.disabled = true;
                            botComprar.textContent = "Tu tarifa actual";
                            contPlanes.classList.add('deshabilitado');
                            console.log("Botón deshabilitado para la tarifa actual:", tarifa.nombre);
                        }else{
                            contPlanes.classList.remove('deshabilitado');
                        }
                    } else {
                        console.warn("No se encontró el botón de compra.");
                    }
                } else {
                    console.warn(`No se encontró el contenedor para la tarifa con ID ${tarifa.idTarifa}`);
                }
            });

            const volverEnlace = document.querySelector('.volverText');
            if (volverEnlace) {
                volverEnlace.addEventListener('click', function (event) {
                    event.preventDefault();
                    window.location.href = "index.html";
                });
                volverEnlace.textContent = "Volver a página principal";
            } else {
                console.warn("No se encontró el enlace de volver.");
            }
        })
        .catch(error => {
            console.error('Error al cargar las tarifas:', error);
        });
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
                    let botComprar = contPlanes.querySelector('.bot');
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
    localStorage.setItem('idTarifa', idTarifa);
    window.location.href = "pago.html"
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
        "tarifa": {
            "idTarifa": idTarifa
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


function cambioTarifa(idTarifa) {
    let username = sessionStorage.getItem('username');
     
    if (!username || !idTarifa) {
        alert("El nombre de usuario y la nueva tarifa son requeridos.");
        return;
    }

    let userData = {
        username: username,
        idTarifa: idTarifa
    };
    fetch("http://localhost:8084/usuarios/updateTarifa", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al cambiar la tarifa.");
        }
        return response.text(); 
    })
    .then(data => {
        console.log('Tarifa actualizada exitosamente:', data);
        alert('La tarifa se ha actualizado exitosamente.');
        sessionStorage.setItem('idTarifa', idTarifa);
        window.location.href = "index.html";
    })
    .catch(error => {
        console.error('Error al cambiar la tarifa:', error.message);
        alert(`Error al cambiar la tarifa: ${error.message}`);
    });
}

function verSuscripcion() {
    
    let usernameReg = document.getElementById("username").value;
    let emailReg = document.getElementById("email").value;
    let passwordReg = document.getElementById("password").value;
    let nombreReg = document.getElementById("nombre").value;
    let apellidosReg = document.getElementById("apellido").value;
    localStorage.setItem('username', usernameReg);
    localStorage.setItem('email', emailReg);
    localStorage.setItem('password', passwordReg);
    localStorage.setItem('nombre', nombreReg);
    localStorage.setItem('apellido', apellidosReg);
    
    window.location.href = "suscripcion.html"
    document.removeEventListener('DOMContentLoaded', cambiarTarifa)
    document.addEventListener('DOMContentLoaded', cargarTarifas);
}
function mejorarTarifa() {
    console.log('mejSusc')
    window.location.href = "suscripcion.html";
    document.removeEventListener('DOMContentLoaded', cargarTarifas)
    document.addEventListener('DOMContentLoaded', cambiarTarifa);
}

