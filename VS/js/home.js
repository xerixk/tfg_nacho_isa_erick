

function irLog(){
    window.location = "login.html";
}


function irReg(){
    window.location = "suscripcion.html";
}




let cont = document.getElementById("peli_desta");

let destacado = "http://localhost:8084/pelicula/destacada";

let estrenos = "http://localhost:8084/pelicula/estrenos";

fetch(destacado).then(res => res.json()).then(dest =>{
    console.log(dest)
    dest.forEach(dest => {
        let contenedor = document.createElement("div");
        let imagen = document.createElement("img");

    
        contenedor.id = "cont_destac";
        imagen.id = "img";
        imagen.src = 'img/' + dest.imagen;
    
        contenedor.appendChild(imagen);
    
        cont.appendChild(contenedor);
    
    })
    
})

let contImg = document.getElementById("imagen0");



let contEstrenos = document.getElementById("estrenos");

fetch(estrenos).then(res => res.json()).then(estreno =>{
    estreno.forEach(estre => {
        let contenedor = document.createElement("div");
        let imagen = document.createElement("img");
    
        contenedor.id = "cont_destac";
        imagen.id = "img";
        imagen.src = 'img/' + estre.imagen;
    
        contenedor.appendChild(imagen);
    
        contEstrenos.appendChild(contenedor);
    
    })
    
})


function foferta(){
    window.location = "suscripcion.html";
}

function cerrarSesion() {
    sessionStorage.removeItem("username");
    window.location.href = "home.html";

 }