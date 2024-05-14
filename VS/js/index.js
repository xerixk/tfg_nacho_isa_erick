
let urlcat = "http://localhost:8084/categoria/todas";

let urlpelis = "http://localhost:8084/pelicula/todas";

let urlpelisuser = "http://localhost:8084/pelicula/todasPorUser/{username}";

let urlporCategoria = "http://localhost:8084/pelicula/porCategoria/";

let verdescrip = "http://localhost:8084/pelicula/verDescripcion/";

let urlcategNom = "http://localhost:8084/pelicula/porNombre/?nombre=";
let user = sessionStorage.getItem("username")
function logo() {
    window.location = "index.html";
}

function fbuscar() {
    let buscar = document.getElementById("busqueda");
    buscar.style.display = "block";
}

let contenedorCat = document.getElementById("contenedor");
fetch(urlcat).then(res => res.json()).then(cat => {
    console.log(cat);
    console.log(urlcat);
    cat.forEach(categorias => {
        let nombre = document.createElement("p");
        let cont = document.createElement("div");

        nombre.innerHTML = `${categorias.nombre}`;
        nombre.id = `${categorias.idCategoria}`;
        cont.id = "cont_cat";
        cont.appendChild(nombre);
        contenedorCat.appendChild(cont);

        cont.addEventListener("click", () => verPorCategoria(nombre.id))

    })
});


function verPorCategoria(id) {
    contenedorPelis.innerHTML = "";
    fetch(urlporCategoria + id)
        .then(res => res.json())
        .then(verPorCat => {
            verPorCat.forEach(pelicula => {
                let cont = document.createElement("div");
                let nombre = document.createElement("p");
                let imagen = document.createElement("img");
                // let descripcion = document.createElement("p");

                imagen.src = 'img/' + pelicula.imagen;
                imagen.id = "img";
                nombre.innerHTML = `${pelicula.nombre}`;
                // descripcion.innerHTML = `${pelicula.descripcion}`;
                cont.class = "cont_pelis";
                cont.id = `${pelicula.idPelicula}`;
                cont.dataset.id = `${pelicula.idPelicula}`;
                nombre.id = "nombrePeli";
                cont.appendChild(imagen);
                cont.appendChild(nombre);
                // cont.appendChild(descripcion);
                contenedorPelis.appendChild(cont);

                cont.addEventListener("click", () => verDescPeli(cont.id));
            });
        });
}

let contenedorPelis = document.getElementById("contenedorPelis");
fetch(` http://localhost:8084/pelicula/todasPorUser/${user}`)
    .then(res => res.json())
    .then(peliculas => {
        peliculas.forEach(pelis => {

            let cont = document.createElement("div");
            let nombre = document.createElement("p");
            let imagen = document.createElement("img");
            // let descripcion = document.createElement("p");

            cont.id = "cont_pelis";
            nombre.id = `${pelis.idPelicula}`
            nombre.innerHTML = `${pelis.nombre}`;
            imagen.id = "img";
            imagen.src = 'img/' + pelis.imagen;
            // descripcion.innerHTML = `${pelis.descripcion}`;
            cont.dataset.id = `${pelis.idPelicula}`;
            cont.appendChild(imagen);
            cont.appendChild(nombre);

            contenedorPelis.appendChild(cont);

            cont.addEventListener("click", () => verDescPeli(nombre.id));


        })
    })

let contbsuqda = document.getElementById("busqueda");
let verpelicula = document.getElementById("pelicula");
function verDescPeli(id) {
    
    contenedorPelis.innerHTML = "";
    contenedorCat.innerHTML = "";
    contbsuqda.innerHTML = "";
    verpelicula.innerHTML = "";
    verpelicula.style.display = "flex";
    fetch(verdescrip + id).then(res => res.json()).then(pelicula => {

        let contene = document.createElement("div");
        let imagen = document.createElement("img");
        let nombre = document.createElement("p");
        let descripcion = document.createElement("p");
        let reparto = document.createElement("p");
        let guardar = document.createElement("i");

        contene.id = "verPeli";
        imagen.src = 'img/' + pelicula.imagen;
        nombre.innerHTML = `${pelicula.nombre}`;
        descripcion.innerHTML = `${pelicula.descripcion}`;
        reparto.innerHTML = `${pelicula.reparto}`;

        estaGuardada(user, id).then(existe => {
            if (existe) {
                guardar.innerHTML = `<i id="guardar" class="fa-solid fa-bookmark" onmouseover="vacio(this)" onmouseout="blanco(this)" onclick="guardarPeli(${pelicula.idPelicula})")></i>`
            } else {
                guardar.innerHTML = `<i id="guardar" class="fa-regular fa-bookmark" onmouseover="blanco(this)" onmouseout="vacio(this)" data-id="${pelicula.idPelicula}" onclick="guardarPeli(${pelicula.idPelicula})")></i>`;

            }
        }).catch(error => {
            console.error('Error al verificar si la película está guardada:', error);
            guardar.innerHTML = `<i id="guardar" class="fa-regular fa-bookmark" onmouseover="blanco(this)" onmouseout="vacio(this)" data-id="${pelicula.idPelicula}" onclick="guardarPeli(${pelicula.idPelicula})")></i>`;

        });



        contene.appendChild(imagen);
        contene.appendChild(nombre);
        contene.appendChild(descripcion);
        contene.appendChild(reparto);
        let contVideo = document.createElement("div");
        let video = document.createElement("video")
        contVideo.id = "idVideo";
        video.src = "videos/videoPrueba.mp4";
        video.controls = true;
        video.width = 500;
        video.height = 300;

        contVideo.appendChild(video)

        verpelicula.appendChild(contene);
        verpelicula.appendChild(contVideo);
        verpelicula.appendChild(guardar);

    })
}


function busq_nombre() {
    let titulo = document.getElementById("busq_btn").value;
    contenedorPelis.innerHTML = "";
    fetch(urlcategNom + titulo).then(res => res.json()).then(peliNombre => {
        console.log(urlcategNom + titulo)
        peliNombre.forEach(pelis => {
            let cont = document.createElement("div");
            let nombre = document.createElement("p");
            let imagen = document.createElement("img");

            cont.id = "cont_pelis";
            nombre.id = `${pelis.idPelicula}`
            nombre.innerHTML = `${pelis.nombre}`;
            imagen.id = "img";
            imagen.src = 'img/' + pelis.imagen;

            cont.appendChild(imagen);
            cont.appendChild(nombre);

            contenedorPelis.appendChild(cont);

            cont.addEventListener("click", () => verDescPeli(nombre.id));


        })

    })
}
function miLista() { 
    contenedorPelis.innerHTML = "";
    verpelicula.innerHTML = "";
    verpelicula.style.display = "none";
    fetch(`http://localhost:8084/guardar/todasPorUser/${user}`)
        .then(res => res.json())
        .then(peliculas => {
            peliculas.forEach(pelicula => {
                let cont = document.createElement("div");
                let nombre = document.createElement("p");
                let imagen = document.createElement("img");

                cont.id = "cont_pelis";
                nombre.id = `${pelicula.idPelicula}`;
                nombre.innerHTML = `${pelicula.nombre}`;
                imagen.id = "img";
                imagen.src = `img/${pelicula.imagen}`;

                cont.appendChild(imagen);
                cont.appendChild(nombre);
                contenedorPelis.appendChild(cont);

                cont.addEventListener("click", () => verDescPeli(nombre.id));
            });
        })
        .catch(error => console.error('Error:', error));
}

let nombreUserspan = document.getElementById("nombreUser");
function obtenerUsername() {
    let username = sessionStorage.getItem("username");
    if (username) {
        nombreUserspan.textContent = username;

    }
}
obtenerUsername();


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
            console.log(usuario);
            sessionStorage.setItem("username", usuario.username);
            window.location.href = "index.html";

        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function verSuscripcion() {
    window.location.href = "suscripcion.html";
}

function registrar() {
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var nombre = document.getElementById("nombre").value;
    var apellidos = document.getElementById("apellido").value;

    var usuario = {
        "username": username,
        "email": email,
        "password": password,
        "nombre": nombre,
        "apellidos": apellidos
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


        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function estaGuardada(user, peliculaId) {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:8084/guardar/existe/${user}/${peliculaId}`)
            .then(response => response.json())
            .then(estaGuardada => {
                resolve(estaGuardada);
            })
            .catch(error => {
                reject(error);
            });
    });
}


// window.onload = function() {
//     let user = sessionStorage.getItem("username");
//     let peliculaId = obtenerPeliculaId(); // Obtener el ID de la película
//     estaGuardada(user, peliculaId);
// };
// let peliculaGuardar = document.getElementById('guardar');

// function obtenerPeliculaId() {
//     let peliculaId = peliculaGuardar.dataset.id;
//     return peliculaId;
// }
function blanco(elemento) {

    elemento.classList.remove("fa-regular");
    elemento.classList.add("fa-solid");


}
function vacio(elemento) {
    elemento.classList.remove("fa-solid");
    elemento.classList.add("fa-regular");
}

function guardarPeli(peliculaId) {
    estaGuardada(user, peliculaId)
        .then(existe => {
            if (existe) {
                // Si la película ya está guardada, eliminarla
                fetch(`http://localhost:8084/guardar/eliminar/${peliculaId}/${user}`, {
                    method: 'DELETE'
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al intentar eliminar la película guardada.');
                    }
                    return response.text();
                })
                .then(message => {
                    alert(message); 
                    actualizarIcono(false)
                    miLista(); // Actualizar la lista después de eliminar
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Ocurrió un error al intentar eliminar la película guardada.');
                });
            } else {
                // Si la película no está guardada, añadirla
                var guardar = {
                    "idPelicula": peliculaId,
                    "username": user
                }
                fetch(`http://localhost:8084/guardar/insertar/${peliculaId}/${user}`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(guardar)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al intentar guardar la película.');
                    }
                    return response.text();
                })
                .then(message => {
                    alert(message);
                    actualizarIcono(true); 
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Ocurrió un error al intentar guardar la película.');
                });
            }
        })
        .catch(error => {
            console.error('Error al verificar si la película está guardada:', error);
            alert('Ocurrió un error al verificar si la película está guardada.');
        });
}
function actualizarIcono(guardado) {
    let icono = document.getElementById("guardar");
    if (guardado) {
        icono.classList.remove("fa-regular");
        icono.classList.add("fa-solid");
    } else {
        icono.classList.remove("fa-solid");
        icono.classList.add("fa-regular");
    }
}