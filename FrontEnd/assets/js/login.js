if(isConnected()) {
    localStorage.clear();
    window.location = "index.html";
}

const form = document.getElementsByClassName("form-login")[0].elements;
const messageError = document.getElementById("msg-error");
const loginURL = "http://localhost:5678/api/users/login";

messageError.style.display="none";


// Se connecter lorque l'on clic sur le bouton
form["submit-login"].addEventListener("click",function (event) {
event.preventDefault();

    fetch(loginURL, {
        method: "POST",
        headers: {
            //'Authorization': 'Bearer ' + localStorage.getItem('token'),//a rajouter pour toute les autres requete auth
            'Accept': 'application/json',
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            email: form.email.value,
            password: form.password.value,
        }),
    })
    .then((response) => {
        if(!response.ok){

            throw new Exception('Login incorrect');
        }else{
            return response.json()
        }

    })
    .then((data) => {
        console.log(data);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('token', data.token);

        window.location = "index.html";

    })
    .catch((error) => {
        messageError.style.display="block";

    });
})

