
let urlcat = "http://localhost:8084/categoria/todas";

let urlpelis = "http://localhost:8084/pelicula/todas";

let urlpelisuser = "http://localhost:8084/pelicula/todasPorUser/{username}";

let urlporCategoria = "http://localhost:8084/pelicula/porCategoria/";

let verdescrip = "http://localhost:8084/pelicula/verDescripcion/";

let urlcategNom = "http://localhost:8084/pelicula/porNombre/?nombre=";

function logo(){
    window.location = "index.html";
}

function fbuscar(){
    let buscar = document.getElementById("busqueda");
    buscar.style.display = "block";
}

let contenedorCat = document.getElementById("contenedor");
fetch(urlcat).then(res => res.json()).then(cat =>{
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


function verPorCategoria(id){
    contenedorPelis.innerHTML = "";
    fetch(urlporCategoria + id).then(res => res.json()).then(verPorCat =>{
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
            nombre.id = "nombrePeli";
            cont.appendChild(imagen);
            cont.appendChild(nombre);
            // cont.appendChild(descripcion);
            contenedorPelis.appendChild(cont);

            cont.addEventListener("click", () => verDescPeli(cont.id));
        });
    });
}
let user=sessionStorage.getItem("username")
let contenedorPelis = document.getElementById("contenedorPelis");
fetch(` http://localhost:8084/pelicula/todasPorUser/${user}`).then(res => res.json()).then(peliculas =>{
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

        cont.appendChild(imagen);
        cont.appendChild(nombre);
       
        contenedorPelis.appendChild(cont);

        cont.addEventListener("click", () => verDescPeli(nombre.id));

        
    })
})

let contbsuqda = document.getElementById("busqueda");
let verpelicula = document.getElementById("pelicula");
function verDescPeli(id){
    contenedorPelis.innerHTML = "";
    contenedorCat.innerHTML = "";
    contbsuqda.innerHTML = "";
    verpelicula.style.display = "flex";
    fetch(verdescrip + id).then(res => res.json()).then(pelicula =>{

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
        guardar.innerHTML = `<i class="fas fa-bookmark"></i>`;
    
    
        contene.appendChild(imagen);
        contene.appendChild(nombre);
        contene.appendChild(descripcion);
        contene.appendChild(reparto);
    
    
        verpelicula.appendChild(contene);
        verpelicula.appendChild(guardar);
    
    })
}


function busq_nombre(){
    let titulo = document.getElementById("busq_btn").value;
    contenedorPelis.innerHTML = "";
    fetch(urlcategNom + titulo).then(res => res.json()).then(peliNombre =>{
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

/*
document.addEventListener("DOMContentLoaded", function() {
    obtenerPeliculas();
});

function obtenerPeliculas() {
    fetch("http://localhost:8084/pelicula/todas")
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener las películas.');
        }
        return response.json();
    })
    .then(peliculas => {
        mostrarPeliculas(peliculas);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function mostrarPeliculas(peliculas) {
    const contenedor = document.getElementById("contenedorPelis");
    contenedor.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevas películas

    peliculas.forEach(pelicula => {
        const contenedorPelicula = document.createElement("div");
        contenedorPelicula.classList.add("pelicula");

        // Aquí puedes construir la estructura HTML para cada película, por ejemplo:
        const imagen = document.createElement("img");
        imagen.src = "img/" + pelicula.imagen;
        contenedorPelicula.appendChild(imagen);

        const titulo = document.createElement("h2");
        titulo.textContent = pelicula.nombre;
        contenedorPelicula.appendChild(titulo);

        // Puedes agregar más elementos HTML según tus necesidades

        contenedor.appendChild(contenedorPelicula);
    });
}
*/
let nombreUserspan=document.getElementById("nombreUser");
function obtenerUsername() {
    let username = sessionStorage.getItem("username");
    if (username) {
        nombreUserspan.textContent=username;
        
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

