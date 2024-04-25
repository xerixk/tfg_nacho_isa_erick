let urlogin = "http://localhost:8084/usuario/login";
let urlregistro = "http://localhost:8084/usuario/registro";




document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
     const registro = urlParams.get('registro');
    const signInButton = document.getElementById("signIn");
    const signUpButton = document.getElementById("signUp");
    const signInContainer = document.querySelector(".sign-in-container");
    const signUpContainer = document.querySelector(".sign-up-container");
    const container = document.getElementById("container");

    if(registro=== "true"){
        signUpContainer.style.display = "block";
            signInContainer.style.display = "none";
            container.classList.add("right-panel-active");
    }

    signInButton.addEventListener("click", function() {
        signInContainer.style.display = "block";
        signUpContainer.style.display = "none";
        container.classList.remove("right-panel-active");
    });

    signUpButton.addEventListener("click", function() {
        signInContainer.style.display = "none";
        signUpContainer.style.display = "block";
        container.classList.add("right-panel-active");
    });
});


