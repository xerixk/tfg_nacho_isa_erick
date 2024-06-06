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
    verpelicula.style.display = "block";

    fetch(verdescrip + id)
        .then(res => res.json())
        .then(pelicula => {
            let contene = document.createElement("div");
            let conteneImagen = document.createElement("div");
            let conteneDesc = document.createElement("div");
            let imagen = document.createElement("img");
            let nombre = document.createElement("p");
            let descripcion = document.createElement("p");
            let reparto = document.createElement("p");
            let guardar = document.createElement("i");
            conteneImagen.id="conteneImagen";
            conteneDesc.id="conteneDesc";
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

            conteneImagen.appendChild(imagen);
            conteneImagen.appendChild(nombre);
            conteneDesc.appendChild(descripcion);
            conteneDesc.appendChild(reparto);
            contene.appendChild(conteneImagen)
            contene.appendChild(conteneDesc)

            let contVideo = document.createElement("div");
            let video = document.createElement("video");
            contVideo.id = "idVideo";
            video.src = "videos/"+pelicula.video;
            video.controls = true;
            video.width = 500;
            video.height = 300;
            contVideo.appendChild(video);

            contVideo.appendChild(guardar);
            verpelicula.appendChild(contVideo);
            verpelicula.appendChild(contene);
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

let contCategorias=document.getElementById("contenedor");
let contPeliculas=document.getElementById("contenedorPelis");

let tablaPeliculas = document.getElementById("tablaPeliculas");
let tablaCategorias = document.getElementById("tablaCategorias");
function esquema() {

    document.getElementById("pelicula").style.display = "none";
    document.getElementById("form_addMovie").style.display = "none";
    let esquema= document.getElementById("esquema");
    let vPrevia= document.getElementById("vPrevia");
    contPeliculas.style.display="none";
    esquema.style.display="none";
    vPrevia.style.display="block";
    contCategorias.style.display="none";
    tablaPeliculas.style.display = "block";
    tablaCategorias.style.display = "block";
    fetch("http://localhost:8084/pelicula/todas")
    .then(response => response.json())
    .then(data => {
        const tablaHTML = `
            <table class="custom-table">
            <caption>Lista de Películas</caption>
            
                <thead >
                    <tr >
                        <td scope="col" colspan="8">
                            <button type="button" class="buttonAdd" onclick="fañadirpeliEsq()" id="añadirPeliTable">
                            <span class="button__text" onclick="feañadirCat()">Añadir Pelicula</span>
                            <span class="button__icon" onclick="feañadirCat()"><svg onclick="feañadirCat()" class="svg" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="12" x2="12" y1="5" y2="19"></line><line x1="5" x2="19" y1="12" y2="12"></line></svg></span>
                            </button> 
                        </td>
                        
                    </tr>
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
                            <td><button class="edit-button Btn" onclick="formEditPeli(${pelicula.idPelicula})">Editar<svg class="svg" viewBox="0 0 512 512">
                            <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg></button></td>
                            <td>
                            <button type="button" class="buttonDelete" onclick="eliminarPeli(${pelicula.idPelicula})">
                            <span class="button__text">Eliminar</span>
                            <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="512" viewBox="0 0 512 512" height="512" class="svg"><title></title><path style="fill:none;stroke:#323232;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" d="M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320"></path><line y2="112" y1="112" x2="432" x1="80" style="stroke:#323232;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"></line><path style="fill:none;stroke:#323232;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" d="M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40"></path><line y2="400" y1="176" x2="256" x1="256" style="fill:none;stroke:#323232;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"></line><line y2="400" y1="176" x2="192" x1="184" style="fill:none;stroke:#323232;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"></line><line y2="400" y1="176" x2="320" x1="328" style="fill:none;stroke:#323232;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"></line></svg></span>
                          </button>                            </td>
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
                    <tr >
                        <td scope="col" colspan="4" > 
                            <button type="button" class="buttonAdd" onclick="feañadirCat()" id="añadirCatTable">
                            <span class="button__text" onclick="feañadirCat()">Añadir Categoria</span>
                            <span class="button__icon" onclick="feañadirCat()"><svg onclick="feañadirCat()" class="svg" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="12" x2="12" y1="5" y2="19"></line><line x1="5" x2="19" y1="12" y2="12"></line></svg></span>
                            </button> 
                        </td>
                       
                    </tr>
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
                            <td><button class="edit-button Btn" onclick="formEditarCategoria(${categoria.idCategoria})">Editar <svg class="svg" viewBox="0 0 512 512">
                            <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg></button></td>
                            <td>
                            <button type="button" class="buttonDelete" onclick="eliminarCategoria(${categoria.idCategoria})">
  <span class="button__text">Eliminar</span>
  <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="512" viewBox="0 0 512 512" height="512" class="svg"><title></title><path style="fill:none;stroke:#323232;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" d="M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320"></path><line y2="112" y1="112" x2="432" x1="80" style="stroke:#323232;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"></line><path style="fill:none;stroke:#323232;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" d="M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40"></path><line y2="400" y1="176" x2="256" x1="256" style="fill:none;stroke:#323232;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"></line><line y2="400" y1="176" x2="192" x1="184" style="fill:none;stroke:#323232;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"></line><line y2="400" y1="176" x2="320" x1="328" style="fill:none;stroke:#323232;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"></line></svg></span>
</button>
                        </td>
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
                esquema();
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
                esquema();  
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
let bcat=document.getElementById("bcat");
let cancesq=document.getElementById("cancelarCat")
function fañadirCat() {
    contPeliculas.style.display="none";
    contCategorias.style.display="none";
    document.getElementById("form_publicarCt").style.display = "block";
    bcat.onclick=añadirCategoriavp;
    cancesq.onclick=cancelarCatVP;
    document.getElementById("nombreNewCat").value="";
}
function feañadirCat() {
    document.getElementById("tablaPeliculas").style.display = "none";
    document.getElementById("añadirCatTable").disabled=true;
    document.getElementById("añadirCatTable").style.cursor="not-allowed";
    document.getElementById("form_publicarCt").style.display = "block";
    bcat.onclick=añadirCategoriaEsq;
    cancesq.onclick=cancelarCatEsq;
    document.getElementById("nombreNewCat").value="";
    
}
function añadirCategoriaEsq() {

    const nombreCat = document.getElementById("nombreNewCat").value;

    const data = {
        nombre: nombreCat
    };

    fetch("http://localhost:8084/categoria/alta", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result && result.idCategoria) {
            alert("Categoría añadida con éxito");
            document.getElementById("nombreNewCat").value = '';
            cargarCategorias();
            esquema();
            document.getElementById("form_publicarCt").style.display = "none";

        } else {
            alert("Error al añadir la categoría");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Error al añadir la categoría");
    });
}
function añadirCategoriavp() {
    const nombreCat = document.getElementById("nombreNewCat").value;

    const data = {
        nombre: nombreCat
    };

    fetch("http://localhost:8084/categoria/alta", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result && result.idCategoria) {
            alert("Categoría añadida con éxito");
            document.getElementById("nombreNewCat").value = '';
            cargarCategorias();
           window.location.href="index.html"
            document.getElementById("form_publicarCt").style.display = "none";

        } else {
            alert("Error al añadir la categoría");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Error al añadir la categoría");
    });
}
function cancelarCatVP() {
    contCategorias.style.display = "flex";
    contPeliculas.style.display="flex";
    document.getElementById("form_publicarCt").style.display = "none";
}
function cancelarCatEsq() {
    document.getElementById("tablaPeliculas").style.display = "block";
    document.getElementById("form_publicarCt").style.display = "none";
    document.getElementById("añadirCatTable").disabled=false;
    document.getElementById("añadirCatTable").style.cursor="pointer";

}
function cancelarPeliVP() {
    contCategorias.style.display = "flex";
    contPeliculas.style.display="flex";
    document.getElementById("form_addMovie").style.display = "none";
}
function cancelarPeliEsq() {
    document.getElementById("tablaCategorias").style.display = "block";
    document.getElementById("form_addMovie").style.display = "none";
    document.getElementById("añadirPeliTable").disabled=false;
    document.getElementById("añadirPeliTable").style.cursor="pointer";
}
let btPel=document.getElementById("bpeli");
let canPeli=document.getElementById("cnPeli");

function fañadirpeliVP() {
    contPeliculas.style.display="none";
    contCategorias.style.display="none";
    document.getElementById("form_addMovie").style.display = "block";
    let selectPel= document.getElementById("categoriaPelicula");
    let check= document.getElementById("checkPeliculaTarifa");
    btPel.onclick=añadirPeliculaVP;
    canPeli.onclick=cancelarPeliVP;
    
check.innerHTML='';
selectPel.innerHTML='';
document.getElementById('nombrePelicula').value = "";
document.getElementById('descripcionPelicula').value = "";
document.getElementById('fechaEstrenoPelicula').value = "";
document.getElementById('duracionPelicula').value = "";
document.getElementById('imagenPelicula').value = "";
document.getElementById('videoPelicula').value = "";
document.getElementById('repartoPelicula').value = "";

    fetch('http://localhost:8084/categoria/todas')
    .then(res => res.json())
    .then(cat => {

       

        if (cat.length > 0) {
        cat.forEach(categoria => {
            let option = document.createElement('option');
            option.value = categoria.idCategoria;
            option.textContent = categoria.nombre;
            selectPel.appendChild(option);
        });
    } else {
        let option = document.createElement('option');
        option.textContent = 'No hay categorías disponibles';
        selectPel.appendChild(option);
        selectPel.disabled = true; 
    }
})
.catch(error => {
    console.error('Error al obtener categorías:', error);
    let option = document.createElement('option');
    option.textContent = 'Error al cargar categorías';
    selectPel.appendChild(option);
    selectPel.disabled = true; 
    });

    fetch(`http://localhost:8084/tarifa/todas`)
    .then(res => res.json())
    .then(tar => {
        tar.forEach(tarifas => {
                check.innerHTML+=`
                <input type="radio" name="tarifa" value="${tarifas.idTarifa}" id="${tarifas.nombre}">
                <label for="${tarifas.nombre}">${tarifas.nombre}</label>`
        });
    });
    
    
}
function añadirPeliculaVP() {
    
    let nombre = document.getElementById("nombrePelicula").value;
    let descripcion = document.getElementById("descripcionPelicula").value;
    let reparto = document.getElementById("repartoPelicula").value;
    let imagen = document.getElementById("imagenPelicula").value;
    let video = document.getElementById("videoPelicula").value;
    let categoriaId = document.getElementById("categoriaPelicula").value;
    let duracion = document.getElementById("duracionPelicula").value;
    let fechaEstreno = document.getElementById("fechaEstrenoPelicula").value;
    let tarifaId =parseInt( document.querySelector('input[name="tarifa"]:checked').value);

    let imagenNombre="";
    imagenNombre=imagen.substring(imagen.lastIndexOf("\\") + 1);
    let videoNombre="";
    videoNombre=video.substring(video.lastIndexOf("\\") + 1);
    let pelicula = {
        'nombre': nombre,
        'descripcion': descripcion,
        'reparto': reparto,
        'imagen': imagenNombre,
        'categoria': categoriaId,
        'duracion': duracion,
        'fechaEstreno': fechaEstreno,
        'tarifa':tarifaId,
        'video': videoNombre
    };
    fetch("http://localhost:8084/pelicula/alta", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pelicula)
    })
    .then(response => {
        if (response.ok) {
            alert("Película agregada correctamente.");
           window.location.href="index.html"
        } else {
            alert("Error al agregar la película.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Error al agregar la película.");
    });
}

function fañadirpeliEsq() {
     document.getElementById("tablaCategorias").style.display = "none";
     document.getElementById("form_addMovie").style.display = "block";
    canPeli.onclick=cancelarPeliEsq
    let select= document.getElementById("categoriaPelicula");
    let check= document.getElementById("checkPeliculaTarifa");
    btPel.onclick=añadirPeliculaEsq;
    document.getElementById("añadirPeliTable").disabled=true;
    document.getElementById("añadirPeliTable").style.cursor="not-allowed";
    document.getElementById("nombrePelicula").value="";
document.getElementById("descripcionPelicula").value="";
document.getElementById("repartoPelicula").value="";
document.getElementById("imagenPelicula").value="";
document.getElementById("videoPelicula").value="";
document.getElementById("duracionPelicula").value="";
document.getElementById("fechaEstrenoPelicula").value="";
    
check.innerHTML='';
  
    fetch(urlcat)
    .then(res => res.json())
    .then(cat => {
        cat.forEach(categorias => {
                select.innerHTML+=`<option value=${categorias.idCategoria}>${categorias.nombre}</option>`
        });
    });

    fetch(`http://localhost:8084/tarifa/todas`)
    .then(res => res.json())
    .then(tar => {
        tar.forEach(tarifas => {
                check.innerHTML+=` <label><input type="radio" name="tarifa" value="${tarifas.idTarifa}">${tarifas.nombre}</label>`
        });
    });
    
    
}

function añadirPeliculaEsq() {
    document.getElementById("añadirPeliTable").style.display = "block";

    let nombre = document.getElementById("nombrePelicula").value;
    let descripcion = document.getElementById("descripcionPelicula").value;
    let reparto = document.getElementById("repartoPelicula").value;
    let imagen = document.getElementById("imagenPelicula").value;
    let video = document.getElementById("videoPelicula").value;
    let categoriaId = document.getElementById("categoriaPelicula").value;
    let duracion = document.getElementById("duracionPelicula").value;
    let fechaEstreno = document.getElementById("fechaEstrenoPelicula").value;
    let tarifaId =parseInt( document.querySelector('input[name="tarifa"]:checked').value);

    let imagenNombre="";
    imagenNombre=imagen.substring(imagen.lastIndexOf("\\") + 1);
    let videoNombre="";
    videoNombre=video.substring(video.lastIndexOf("\\") + 1);
    let pelicula = {
        'nombre': nombre,
        'descripcion': descripcion,
        'reparto': reparto,
        'imagen': imagenNombre,
        'categoria': categoriaId,
        'duracion': duracion,
        'fechaEstreno': fechaEstreno,
        'tarifa':tarifaId,
        'video': videoNombre
    };

    fetch("http://localhost:8084/pelicula/alta", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pelicula)
    })
    .then(response => {
        if (response.ok) {
            alert("Película agregada correctamente.");
            document.getElementById("form_addMovie").style.display = "none";            
             esquema();
        } else {
            alert("Error al agregar la película.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Error al agregar la película.");
    });
}

let formEditCat=document.getElementById("formUpdcat");
let formEditPelic=document.getElementById("formUpdPeli");

function formEditarCategoria(idCat){
tablaPeliculas.style.display="none"
formEditCat.style.display="block"
document.getElementById("añadirCatTable").disabled=true;
    document.getElementById("añadirCatTable").style.cursor="not-allowed";

    fetch(`http://localhost:8084/categoria/porId/${idCat}`)
        .then(response => response.json())
        .then(data => {
            
            document.getElementById('nombreModCat').value = data.nombre;
            document.getElementById('aceptarModCat').onclick = function () {
                aceptarModCate(data.idCategoria)
            };
            
            
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al cargar los detalles de la categoría');
        });
}

function cancelarModCate() {
    tablaPeliculas.style.display="block"
formEditCat.style.display="none"
document.getElementById("añadirCatTable").disabled=false;
    document.getElementById("añadirCatTable").style.cursor="pointer";
}
function aceptarModCate(idCat) {
    let nombreInpMod = document.getElementById('nombreModCat').value;
    let data = {
          nombre: nombreInpMod
        };
        fetch(`http://localhost:8084/categoria/actualizar/${idCat}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al actualizar la categoría');
        }
        return response.json();
    })
    .then(data => {
        formEditCat.style.display="none"
        alert('Categoría actualizada correctamente');
        esquema();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al actualizar la categoría');
    });
}

function formEditPeli(idPelic) {
    tablaCategorias.style.display="none"
    formEditPelic.style.display="block"
    document.getElementById("añadirPeliTable").disabled=true;
    document.getElementById("añadirPeliTable").style.cursor="not-allowed";

    fetch(`http://localhost:8084/pelicula/verDescripcion/${idPelic}`)
    .then(response => response.json())
    .then(data => {

       
        let contImgDiv=document.getElementById("imagenUdPeli");
        let contVidDiv=document.getElementById("contVideoUpdPeli");
        let selectUpdPeli= document.getElementById("categoriaUpdPeli");
        let tarifaUpdPeli= document.getElementById("tarifaUpdPeli");
        contImgDiv.innerHTML = "";
        contVidDiv.innerHTML = "";
        selectUpdPeli.innerHTML = "";
        tarifaUpdPeli.innerHTML = "";

        document.getElementById('nombreUpdPeli').value = data.nombre;
        document.getElementById('descripcionUpdPeli').value = data.descripcion;
        document.getElementById('fechaEstrenoUpdPeli').value = data.fechaEstreno;
        document.getElementById('duracionUpdPeli').value = data.duracion;

        if (data.destacado) {
            document.getElementById('destacadoUpdPeli1').checked = true;
        } else {
            document.getElementById('destacadoUpdPeli0').checked = true;
        }
        
        if (!data.estreno) {
            document.getElementById('estrenoUpdPeli0').checked = true;
        } else {
            document.getElementById('estrenoUpdPeli1').checked = true;
        }

        let imagen = document.createElement("img");
        imagen.id="imgUpdImg";
        imagen.src = 'img/' + data.imagen;
        let fileImg= document.createElement("input")
        fileImg.type="file";
        fileImg.name="imagen";
        fileImg.id="imagenUpdPeli";
        contImgDiv.appendChild(imagen)
        contImgDiv.appendChild(fileImg)
        document.getElementById("repartoUpdPeli").value=data.reparto;

        fetch(urlcat)
        .then(res => res.json())
        .then(cat => {
            selectUpdPeli.innerHTML="";
            cat.forEach(categorias => {
                let option=document.createElement('option');
                option.value=categorias.idCategoria;
                option.textContent=categorias.nombre;
                if (categorias.idCategoria === data.categoria.idCategoria) {
                    option.selected=true;     
                }
                selectUpdPeli.appendChild(option);
            });
        });

        fetch(`http://localhost:8084/tarifa/todas`)
                .then(res => res.json())
                .then(tar => {
                    console.log('Tarifas:', tar); 
                    tar.forEach(tarifas => {
                        let radioInput= document.createElement('input');
                        radioInput.type="radio";
                        radioInput.name="tarifa";
                        radioInput.value=tarifas.idTarifa;
                        radioInput.id=tarifas.nombre;
                        if (data.tarifa && data.tarifa.idTarifa===tarifas.idTarifa) {
                            radioInput.checked=true;
                        }
                        let label = document.createElement('label');
                        label.setAttribute('for', tarifas.nombre);
                        label.textContent = tarifas.nombre;
                        tarifaUpdPeli.appendChild(radioInput);
                        tarifaUpdPeli.appendChild(label);
                });
            });

        let videoUpd = document.createElement("video");
        videoUpd.src = "videos/videoPrueba.mp4";
        videoUpd.controls = true;
        videoUpd.width = 300;
        videoUpd.height = 150;

        let fileVid= document.createElement("input")
        fileVid.type="file";
        fileVid.name="video";
        fileVid.id="videoUpdPeli";
        contVidDiv.appendChild(videoUpd)
        contVidDiv.appendChild(fileVid)

        document.getElementById('aceptarModPelii').onclick = function () {
            aceptarModPelicula(data.idPelicula);
        };
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al cargar los detalles de la Pelicula');
    });

}
function cancelarModPeli() {
    tablaCategorias.style.display="block"
    formEditPelic.style.display="none"
    document.getElementById("añadirPeliTable").disabled=false;
    document.getElementById("añadirPeliTable").style.cursor="pointer";
    
}
function aceptarModPelicula(idPelic) {
    let nombreInpModPel = document.getElementById("nombreUpdPeli").value;
    let descripcionInpModPel = document.getElementById("descripcionUpdPeli").value;
    let fechaEstrInpModPel = document.getElementById("fechaEstrenoUpdPeli").value;
    let duracionInpModPel = document.getElementById("duracionUpdPeli").value;
    let destacadoInpModPel = document.querySelector('input[name="destacado"]:checked').value;
    let esternoInpModPel = document.querySelector('input[name="estreno"]:checked').value;
    let imagenInpModPel = document.getElementById('imagenUpdPeli').value; 
    let repartoInpModPel = document.getElementById('repartoUpdPeli').value;
    let categoriaInpModPel = document.getElementById('categoriaUpdPeli').value;
    let tarifaInpModPel = parseInt(document.querySelector('input[name="tarifa"]:checked').value);
    let videoInput = document.getElementById('videoUpdPeli').value; 
    let imagenNombre="";
    imagenNombre=imagenInpModPel.substring(imagenInpModPel.lastIndexOf("\\") + 1);
    let videoNombre="";
    videoNombre=videoInput.substring(videoInput.lastIndexOf("\\") + 1);
    let data = {
        nombre: nombreInpModPel,
        descripcion: descripcionInpModPel,
        fechaEstreno: fechaEstrInpModPel,
        duracion: duracionInpModPel,
        destacado: destacadoInpModPel,
        estreno: esternoInpModPel,
        imagen: imagenNombre,
        reparto: repartoInpModPel,
        categoria: categoriaInpModPel,
        tarifa: tarifaInpModPel,
        video: videoNombre
    };

        fetch(`http://localhost:8084/pelicula/actualizar/${idPelic}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al actualizar la película');
            }
            return response.json();
        })
        .then(data => {
            formEditPelic.style.display = "none";
            alert('Película actualizada correctamente');
            esquema();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al actualizar la película');
        });
   
}
function cerrarSesion() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("idTarifa");
    window.location.href = "home.html";

 }