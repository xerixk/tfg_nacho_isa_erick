
let urlcat = "http://localhost:8084/categoria/todas";

let urlpelis = "http://localhost:8084/pelicula/todas";

let urlporCategoria = "http://localhost:8084/pelicula/porCategoria/";

let verdescrip = "http://localhost:8084/pelicula/verDescripcion/";

let urlcategNom = "http://localhost:8084/pelicula/porNombre/?nombre=";

function logo(){
    window.location = "index.html";
}

function irLog(){
    window.location = "login.html";
}

function irReg(){
    window.location = "suscripcion.html";
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


let contenedorPelis = document.getElementById("contenedorPelis");
fetch(urlpelis).then(res => res.json()).then(peliculas =>{
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

