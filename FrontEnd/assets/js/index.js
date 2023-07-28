function getWorks() {
    fetch("http://localhost:5678/api/works")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        createFilters(data);
        data.forEach(showWork);
    })
}

function showWork(work){
    const portfolio = document.getElementById("portfolio");
    const gallery = portfolio.getElementsByClassName("gallery")[0];

    const img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;

    const figcaption = document.createElement("figcaption");
    figcaption.innerText = work.title;

    const figure = document.createElement("figure");
    figure.appendChild(img);
    figure.appendChild(figcaption);

    gallery.appendChild(figure);

}

function createFilters(works){
    console.log(works);
    //lister les categories contenu dans la variable works
        fetch("http://localhost:5678/api/categories")
        .then((response) => {
            return response.json()
        })
        .then(createCategories);
}
    //pour chaque categorie creer node pour un bouton categorie
function createCategories(categories){
    const divFilters = document.createElement("div");
    divFilters.classList.add("filters");
    const gallery = portfolio.getElementsByClassName("gallery")[0];

    const allowedCategories = ["hôtel et restaurants", "objets", "appartements", "tous"];


    categories.forEach((category)=>{
        console.log(category)
        if (allowedCategories.includes(category.name.toLowerCase())) {
        const button = document.createElement("button");
        button.classList.add("filters-button");
        button.innerText = category.name;
        button.dataset.categoryId = category.id;
        divFilters.appendChild(button);
        }
    })

    const buttonTous = document.createElement("button");
    buttonTous.classList.add("filters-button");
    buttonTous.innerText = "Tous";
    buttonTous.dataset.categoryId = 0;
    divFilters.appendChild(buttonTous);




    gallery.prepend(divFilters);
}



getWorks();


document.addEventListener("DOMContentLoaded", function(event) {
    const filtersButtons = document.getElementsByClassName("filters-button")
    for (let filterButton of filtersButtons) {
        filterButton.addEventListener('click', () => {

            console.log('ok');
            console.log(filterButton.dataset.categoryId);
        });
    }
});


// fonction pour récuperer l'id utilisateur et le token
function getAuthorization() {
    const token = JSON.parse(localStorage.getItem('auth')).token;
    return 'Bearer ' + token;
}


 // Fonction pour voir si l'utilisateur est connecté
function isConnected() {
    const connecting = getAuthorization() ? true : false;
    return connecting
}



const form = document.getElementsByClassName("form-login")[0].elements;
const messageError = document.getElementById("msg-error");
const loginURL = "http://localhost:5678/api/users/login";

// Se connecter lorque l'on clic sur le bouton
form["submit-login"].addEventListener("click",function (event) {
event.preventDefault();

    fetch(loginURL, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            email: form.email.value,
            password: form.password.value,
        }),
    })
    .then((response) => response.json())
    .then((data) => {

        localStorage.setItem('auth', JSON.stringify(data));

        window.location = "login.html";

    })
    .catch((error) => {
        console.error('Error:', error);
    });
})

window.onload = function() {
    if(isConnected()) {
        // L'utilisateur est connecté
        // Affichez les informations appropriées
        // Par exemple, vous pouvez cacher le bouton de connexion et afficher le nom de l'utilisateur
        document.getElementById('loginButton').style.display = 'none';
        document.getElementById('username').style.display = 'block';
    } else {
        // L'utilisateur n'est pas connecté
        // Affichez le bouton de connexion et cachez le nom de l'utilisateur
        document.getElementById('loginButton').style.display = 'block';
        document.getElementById('username').style.display = 'none';
    }
}