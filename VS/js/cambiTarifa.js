document.addEventListener('DOMContentLoaded', cambiarTarifa);
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

function verDetalles(detalles, verOcu) {
    if (detalles.style.display === "block") {
        detalles.style.display = "none";
        verOcu.innerHTML = "ver detalles";
    } else {
        detalles.style.display = "block";
        verOcu.innerHTML = "ocultar detalles";
    }
}

function logo() {
    window.location = "index.html";
}