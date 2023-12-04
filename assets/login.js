document.getElementById("formSubmit").addEventListener("click", function (e){
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const loginData = {
        email: email,
        password: password
    };

    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(data => {
        console.log("data", data);
        if (data.token) {
            window.localStorage.setItem("jwt", data.token);
            window.localStorage.setItem("connected", true);
            window.location.replace("http://127.0.0.1:5500/FrontEnd/index.html");         
        } else {
            document.getElementById("msg-error").innerHTML += "Erreur dans l’identifiant ou le mot de passe";
        }
    })
    e.preventDefault();
});