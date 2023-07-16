//index.js

//J'affiche dynamiquement mon portofolio

let gallery = document.getElementsByClassName("gallery")[0];
let filtres = document.getElementsByClassName("filtres")[0];

fetch("http://localhost:5678/api/works") //Requête Get vers cette URL pour récupérer une liste de travaux à afficher ds le portofolio
  .then((response) => response.json())
  .then((works) => {
    for (let i = 0; i < works.length; i++) { //boucle for utilisée pour parcourir les éléments du tableau "works" un par un.
      let figure = document.createElement("figure"); //Pour chaque élément du tableau, on crée un nouvel élément <figure>
      figure.classList.add("work");
      figure.dataset.category = works[i].categoryId;
      gallery.appendChild(figure);

      let image = document.createElement("img");
      image.src = works[i].imageUrl;
      figure.appendChild(image);

      let figcaption = document.createElement("figcaption");
      figcaption.innerText = works[i].title;
      figure.appendChild(figcaption);
      figure.dataset.id = works[i].id; //Pour supprimer l'image ajoutée dans la page d'accueil
    }
  });

fetch("http://localhost:5678/api/categories") //requête GET vers l'URL pour récupérer une liste de catégories pour le portfolio
  .then((response) => response.json())
  .then((categories) => { //"categories" il s'agit d'1 tableau contenant les infos pour filtrer les travaux ds le portofolio
    const boutonFiltreTous = document.createElement("button"); 
    categories.forEach((category, index) => {
      if (index === 0) { //pour le 1er élément du tableau, je cree un 1er élément "Tous"
        boutonFiltreTous.innerHTML = "Tous";
        boutonFiltreTous.classList.add("boutonsFiltres");
        filtres.appendChild(boutonFiltreTous);

        boutonFiltreTous.addEventListener("click", function (e) {
          displayWork(e, "tous"); //Au clic sur boutonFiltreTous, j'appele cette fonction "displayWork" l.69
        });
      }

      const boutonFiltre = document.createElement("button");
      boutonFiltre.innerHTML = category.name; //objets/appartements/hotels&restaurants
      filtres.appendChild(boutonFiltre);
      boutonFiltre.classList.add("boutonsFiltres");

      boutonFiltre.addEventListener("click", function (e) {
        displayWork(e, category.id); //réprésente l'identifiant de la catégorie associé à ce bouton 1/2ou3/diplayWork l.69
      });

      boutonFiltreTous.addEventListener("mouseover", function (e) { //Au survol les boutons des filtres deviennent verts
        e.target.classList.add("hover"); //"e.target représente le bouton survolé"
      });

      boutonFiltreTous.addEventListener("mouseout", function (e) { //Les filtres reviennent à leurs états initial aprés le survol
        e.target.classList.remove("hover");
      });

      boutonFiltre.addEventListener("mouseover", function (e) {
        e.target.classList.add("hover"); //au survol class CSS ajouté au bouton
      });

      boutonFiltre.addEventListener("mouseout", function (e) { //Les filtres reviennent à leurs états initial aprés le survol
        e.target.classList.remove("hover");
      });
    });
  });

  //cette fonction permet de visualiser visuellement quel bouton de filtrage est actif
function displayWork(e, id) { //appelé lorsque l'un des boutons de filtrages est cliqué, "e est l'événement cliqué, "id", est l'identifiant de l'élément cliqué, 
  const boutonsFiltres = document.querySelectorAll(".boutonsFiltres");
  boutonsFiltres.forEach((filtre) => { //boucle pour parcourir ts les boutonFiltres
    if (filtre === e.target) { //Je verifie si le bouton correspond à l'élément cliqué
      filtre.classList.add("boutonActive");
    } else {
      filtre.classList.remove("boutonActive");
    }
  });

  const worksInHtml = document.querySelectorAll(".work");

  worksInHtml.forEach((work) => { 
    if (id !== "tous") { //condition, je verifie si la valeur de l'id est different de Tous
      if (id == work.dataset.category) { //Seul les trvaux correspondant à la catégorie seront affichés
        work.style.display = "block"; //Il faut que les identifiants correspondent pour s'afficher
      } else {
        work.style.display = "none";
      }
    } else {
      work.style.display = "block";//Si l'ID est tous, cela veut dire pas de filtrage par catégorie
    }
  });
}

function hideFilters() {//cette fonction vérifie s'il existe une valeur "token" dans le localStorage
  if (localStorage.getItem("token")) { //je verifie s'il existe une valeur qui s'appelle "token ds le local Storage"
    filtres.style.display = "none"; //Si oui les filtres sont cachés
  } else {
    filtres.style.display = "flex"; //aussi non restent apparents
  }
}
hideFilters(); //J'appele la fonction pour l'éxécuter

function displayEdit() {
  if (localStorage.getItem("token")) { //Je verifie s'il y a une valeur token ds le local storage
    const edit = document.querySelector("#buttonModifier");
    edit.style.visibility = "visible";
  } else {
    document.querySelector("#buttonModifier").style.display = "none";
  }
}
displayEdit();
