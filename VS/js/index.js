const urlcat = "http://localhost:8084/categoria/todas";
const urlpelisuser = "http://localhost:8084/pelicula/todasPorUser/";
const urlporCategoria = "http://localhost:8084/pelicula/porCategoria/";
const verdescrip = "http://localhost:8084/pelicula/verDescripcion/";
const urlcategNom = "http://localhost:8084/pelicula/porNombre/?nombre=";
const urlpelis = "http://localhost:8084/pelicula/todas";

const contenedorCat = document.getElementById("contenedor");
const contenedorPelis = document.getElementById("contenedorPelis");
const contbsuqda = document.getElementById("busqueda");
const verpelicula = document.getElementById("pelicula");
const nombreUserspan = document.getElementById("nombreUser");

let user = sessionStorage.getItem("username");
let idPerfil = sessionStorage.getItem("idPerfil");

function fbuscar() {
    let buscar = document.getElementById("busqueda");
    buscar.style.display = "block";
}
function logo() {
    window.location = "index.html";
}


window.onload = function() {
    obtenerUsername();
    cargarCategorias();
    cargarPeliculas();

    let admin = document.getElementsByClassName("admin");
    let usuario = document.getElementsByClassName("user");

    if (user && idPerfil) {
        admin.style.display = "none";
        usuario.style.display = "flex";
    } else {
        admin.style.display = "none";
        usuario.style.display = "flex";
    }
};

function cargarCategorias() {
    fetch(urlcat)
        .then(res => res.json())
        .then(cat => {
            cat.forEach(categorias => {
                let nombre = document.createElement("p");
                let cont = document.createElement("div");

                nombre.innerHTML = `${categorias.nombre}`;
                nombre.id = `${categorias.idCategoria}`;
                cont.id = "cont_cat";
                cont.appendChild(nombre);
                contenedorCat.appendChild(cont);

                cont.addEventListener("click", () => verPorCategoria(nombre.id));
            });
        });
}

function verPorCategoria(id) {
    contenedorPelis.innerHTML = "";
    fetch(urlporCategoria + id)
        .then(res => res.json())
        .then(verPorCat => {
            verPorCat.forEach(pelicula => {
                let cont = document.createElement("div");
                let nombre = document.createElement("p");
                let imagen = document.createElement("img");

                imagen.src = 'img/' + pelicula.imagen;
                imagen.id = "img";
                nombre.innerHTML = `${pelicula.nombre}`;
                cont.class = "cont_pelis";
                cont.id = `${pelicula.idPelicula}`;
                cont.dataset.id = `${pelicula.idPelicula}`;
                nombre.id = "nombrePeli";
                cont.appendChild(imagen);
                cont.appendChild(nombre);
                contenedorPelis.appendChild(cont);

                cont.addEventListener("click", () => verDescPeli(cont.id));
            });
        });
}

function cargarPeliculas() {
    let idPerfil = sessionStorage.getItem("idPerfil");

    if (idPerfil === "1") {
        fetch(urlpelis)
            .then(res => res.json())
            .then(peliculas => {
                peliculas.forEach(pelis => {
                let cont = document.createElement("div");
                let nombre = document.createElement("p");
                let imagen = document.createElement("img");

                cont.id = "cont_pelis";
                nombre.id = `${pelis.idPelicula}`;
                nombre.innerHTML = `${pelis.nombre}`;
                imagen.id = "img";
                imagen.src = 'img/' + pelis.imagen;
                cont.dataset.id = `${pelis.idPelicula}`;
                cont.appendChild(imagen);
                cont.appendChild(nombre);
                contenedorPelis.appendChild(cont);

                cont.addEventListener("click", () => verDescPeli(nombre.id));
            });
        });
    } else if (idPerfil === "2") {
        // Si el perfil es 2, hacer una llamada para obtener las películas del usuario
        let user = sessionStorage.getItem("username");
        fetch(`http://localhost:8084/pelicula/todasPorUser/${user}`)
            .then(res => res.json())
            .then(peliculas => {
                peliculas.forEach(pelis => {
                let cont = document.createElement("div");
                let nombre = document.createElement("p");
                let imagen = document.createElement("img");

                cont.id = "cont_pelis";
                nombre.id = `${pelis.idPelicula}`;
                nombre.innerHTML = `${pelis.nombre}`;
                imagen.id = "img";
                imagen.src = 'img/' + pelis.imagen;
                cont.dataset.id = `${pelis.idPelicula}`;
                cont.appendChild(imagen);
                cont.appendChild(nombre);
                contenedorPelis.appendChild(cont);

                cont.addEventListener("click", () => verDescPeli(nombre.id));
            });
        })
        .catch(error => console.error('Error al cargar las películas:', error));
} else {
    console.error('Perfil de usuario no válido.');
}
}

function verDescPeli(id) {
    contenedorPelis.innerHTML = "";
    contenedorCat.innerHTML = "";
    contbsuqda.innerHTML = "";
    verpelicula.innerHTML = "";
    verpelicula.style.display = "flex";

    fetch(verdescrip + id)
        .then(res => res.json())
        .then(pelicula => {
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
                    guardar.innerHTML = `<i id="guardar" class="fa-solid fa-bookmark" onmouseover="vacio(this)" onmouseout="blanco(this)" onclick="guardarPeli(${pelicula.idPelicula})"></i>`;
                } else {
                    guardar.innerHTML = `<i id="guardar" class="fa-regular fa-bookmark" onmouseover="blanco(this)" onmouseout="vacio(this)" data-id="${pelicula.idPelicula}" onclick="guardarPeli(${pelicula.idPelicula})"></i>`;
                }
            }).catch(error => {
                console.error('Error al verificar si la película está guardada:', error);
                guardar.innerHTML = `<i id="guardar" class="fa-regular fa-bookmark" onmouseover="blanco(this)" onmouseout="vacio(this)" data-id="${pelicula.idPelicula}" onclick="guardarPeli(${pelicula.idPelicula})"></i>`;
            });

            contene.appendChild(imagen);
            contene.appendChild(nombre);
            contene.appendChild(descripcion);
            contene.appendChild(reparto);

            let contVideo = document.createElement("div");
            let video = document.createElement("video");
            contVideo.id = "idVideo";
            video.src = "videos/videoPrueba.mp4";
            video.controls = true;
            video.width = 500;
            video.height = 300;
            contVideo.appendChild(video);

            verpelicula.appendChild(contene);
            verpelicula.appendChild(contVideo);
            verpelicula.appendChild(guardar);
        });
}

function busq_nombre() {
    let titulo = document.getElementById("busq_btn").value;
    contenedorPelis.innerHTML = "";
    fetch(urlcategNom + titulo)
        .then(res => res.json())
        .then(peliNombre => {
            peliNombre.forEach(pelis => {
                let cont = document.createElement("div");
                let nombre = document.createElement("p");
                let imagen = document.createElement("img");

                cont.id = "cont_pelis";
                nombre.id = `${pelis.idPelicula}`;
                nombre.innerHTML = `${pelis.nombre}`;
                imagen.id = "img";
                imagen.src = 'img/' + pelis.imagen;

                cont.appendChild(imagen);
                cont.appendChild(nombre);
                contenedorPelis.appendChild(cont);

                cont.addEventListener("click", () => verDescPeli(nombre.id));
            });
        });
}
function esquema() {
    let esquema= document.getElementById("esquema");
    let vPrevia= document.getElementById("vPrevia");
    let contCategorias=document.getElementById("contenedor");
    let contPeliculas=document.getElementById("contenedorPelis");
    contPeliculas.style.display="none";
    esquema.style.display="none";
    vPrevia.style.display="block";
    contCategorias.style.display="none";
    let tablaPeliculas = document.getElementById("tablaPeliculas");
    let tablaCategorias = document.getElementById("tablaCategorias");
    tablaPeliculas.style.display = "block";
    tablaCategorias.style.display = "block";
    fetch("http://localhost:8084/pelicula/todas")
    .then(response => response.json())
    .then(data => {
        const tablaHTML = `
            <table class="custom-table">
            <caption>Lista de Películas</caption>
            
                <thead >
                    <tr>
                        <th scope="col">Id Pelicula</th>
                        <th scope="col">Nombre </th>
                        <th scope="col">Estreno </th>
                        <th scope="col">Duracion </th>
                        <th scope="col">Categoria</th>
                        <th scope="col">Tarifa</th>
                        <th scope="col" colspan="2">operaciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map(pelicula => `
                        <tr>
                            <td>${pelicula.idPelicula}</td>
                            <td>${pelicula.nombre}</td>
                            <td>${pelicula.fechaEstreno}</td>
                            <td>${pelicula.duracion} min</td>
                            <td>${pelicula.categoria ? pelicula.categoria.nombre : 'N/A'}</td>
                            <td>${pelicula.tarifa ? pelicula.tarifa.nombre : 'N/A'}</td>
                            <td><button class="edit-button">Editar</button></td>
                            <td><button class="delete-button" onclick="eliminarPeli(${pelicula.idPelicula})">Eliminar</button></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;

        tablaPeliculas.innerHTML = tablaHTML;
    })
    .catch(error => {
        console.error("Error al obtener los datos de las películas:", error);
    });
    fetch("http://localhost:8084/categoria/todas")
    .then(response => response.json())
    .then(data => {
        const tablaHTML = `
            <table class="custom-table">
            <caption>Lista de Categorias</caption>
            
                <thead >
                    <tr>
                        <th scope="col">Id Categoria </th>
                        <th scope="col">Nombre </th>
                        <th scope="col" colspan="2">operaciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map(categoria => `
                        <tr>
                            <td>${categoria.idCategoria}</td>
                            <td>${categoria.nombre}</td>
                            <td><button class="edit-button">Editar</button></td>
                            <td><button class="delete-button" onclick="eliminarCategoria(${categoria.idCategoria})">Eliminar</button></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;

        tablaCategorias.innerHTML = tablaHTML;
    })
    .catch(error => {
        console.error("Error al obtener los datos de las películas:", error);
    });

}

function eliminarCategoria(id) {
    if (confirm("¿Estás seguro de que quieres eliminar esta Categoria?")) {
        fetch(`http://localhost:8084/categoria/eliminarCat/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.status === 204) {
                alert('Categoria eliminada con éxito');
                // Actualizar la lista de películas o recargar la página
                esquema();  // O cualquier función que refresque la lista
            } else {
                alert('Error al eliminar la Categoria');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al eliminar la Categoria');
        });
    }
}

function eliminarPeli(id) {
    if (confirm("¿Estás seguro de que quieres eliminar esta película?")) {
        fetch(`http://localhost:8084/pelicula/eliminarPeli/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.status === 204) {
                alert('Película eliminada con éxito');
                // Actualizar la lista de películas o recargar la página
                esquema();  // O cualquier función que refresque la lista
            } else {
                alert('Error al eliminar la película');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al eliminar la película');
        });
    }
}
function vPrevia() {
    window.location.href="index.html"
}

function miLista() {
    if (!user) return;

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

function obtenerUsername() {
    let username = sessionStorage.getItem("username");
    if (username) {
        nombreUserspan.textContent = username;
    }
    let idPerfil = sessionStorage.getItem("idPerfil");

    let elementosAdmin = document.querySelectorAll(".admin");
    let elementosUser = document.querySelectorAll(".user");
    if (idPerfil === "1") {
        elementosAdmin.forEach(elemento => {
            elemento.style.display = "block";
        });
        elementosUser.forEach(elemento=> {
            elemento.style.display = "none";
        });
    }else if(idPerfil === "2"){
        elementosAdmin.forEach(elemento => {
            elemento.style.display = "none";
    });
    elementosUser.forEach(elemento=> {
        elemento.style.display = "block";
    });
}
}

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
        if(usuario.perfiles && usuario.perfiles.length > 0){
            sessionStorage.setItem("username", usuario.username);
            sessionStorage.setItem("idPerfil", usuario.perfiles[0].idPerfil);
            window.location.href = "index.html";    
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
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

function blanco(elemento) {
    elemento.classList.remove("fa-regular");
    elemento.classList.add("fa-solid");
}

function vacio(elemento) {
    elemento.classList.remove("fa-solid");
    elemento.classList.add("fa-regular");
}

function guardarPeli(peliculaId) {
    if (!user) return;
    
    estaGuardada(user, peliculaId)
    .then(existe => {
        if (existe) {
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
                actualizarIcono(false);
                miLista(); 
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Ocurrió un error al intentar eliminar la película guardada.');
            });
        } else {
            var guardar = {
                "idPelicula": peliculaId,
                "username": user
            };

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