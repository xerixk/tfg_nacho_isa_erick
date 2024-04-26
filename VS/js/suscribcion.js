function logo(){
    window.location = "home.html";
}

let detalles = document.getElementById("detalles")

function verDetalles(detalles,verOcu){
    if (detalles.style.display === "block") {
        detalles.style.display = "none";
        verOcu.innerHTML="Ver detalles"
    } else {
        detalles.style.display = "block";
        verOcu.innerHTML="Ocultar detalles"
    }
}
