function addPagoUser() {
    var username = localStorage.getItem('username');
    var email = localStorage.getItem('email');
    var password = localStorage.getItem('password');
    var nombre = localStorage.getItem('nombre');
    var apellidos = localStorage.getItem('apellido');
    var idTarifa=localStorage.getItem('idTarifa')

    var usuario = {
        "username": username,
        "email": email,
        "password": password,
        "nombre": nombre,
        "apellidos": apellidos,
        "tarifa":{
            "idTarifa":idTarifa
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


    console.log("Función addPagoUser() llamada");
    let namePago = document.getElementById("card_holder_name").value;
    let numPago = document.getElementById("card_number").value;
    let expiryPago = document.getElementById("expiry_date").value;
    let cvvPago = document.getElementById("cvv").value;
    let usernamePago = localStorage.getItem('username');


    if (!namePago || !numPago || !expiryPago || !cvvPago ) {
         alert("Faltan datos necesarios para completar el registro")
         return;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiryPago)) {
        console.log("La fecha de expiración no tiene el formato correcto");
        alert('La fecha de expiración debe estar en el formato MM/yy');
        return;
    }

    let [month, year] = expiryPago.split('/');
    let expiryDate = new Date(`20${year}`, month - 1, 1);

    if (expiryDate < new Date()) {
        alert('La fecha de expiración no puede ser anterior a la fecha actual');
        return;
    }

    if (!usernamePago) {
        alert('No se encontró el nombre de usuario en el almacenamiento local');
        return;
    }

    const pago = {
        nombreTitular: namePago,
        numeroTarjeta: numPago,
        fechaExpiracion: expiryDate,
        cvv: cvvPago,
        usuario: {
            username: usernamePago
        }
    };
    console.log("Enviando solicitud Fetch...");
    fetch('http://localhost:8084/banco/alta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pago)
    })
    .then(function(response) {
        console.log("Respuesta recibida:", response);
        if (!response.ok) {
            throw new Error('Error al insertar los datos bancarios.');
        }
        alert('Registro exitoso');
        console.log("Respuesta recibida:", response);
        window.location.href = 'login.html';
    })
    .catch(function(error) {
        alert('Error al procesar la solicitud: ' + error.message);
    });
}
