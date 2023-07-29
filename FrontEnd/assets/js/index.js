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

// on était bloquer sur ce code car quand on cliquer sur les categorie cela nous afficher pas la categorie seule
// il y avait aussi le fait que categorie 1,2,3 s'afficher en plus des catgeorie avec le nom correcte

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