//index.js

//J'affiche dynamiquement mon portofolio

let gallery = document.getElementsByClassName("gallery")[0];
let filtres = document.getElementsByClassName("filtres")[0];

fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((works) => {
    for (let i = 0; i < works.length; i++) {
      let figure = document.createElement("figure");
      figure.classList.add("work");
      figure.dataset.category = works[i].categoryId;
      gallery.appendChild(figure);

      let image = document.createElement("img");
      image.src = works[i].imageUrl;
      figure.appendChild(image);

      let figcaption = document.createElement("figcaption");
      figcaption.innerText = works[i].title;
      figure.appendChild(figcaption);
    }
  });

fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((categories) => {
    const boutonFiltreTous = document.createElement("button"); //Je déclare la variable en dehors de la boucle pour pouvoir la réutiliser en ligne 57
    categories.forEach((category, index) => {
      if (index === 0) {
        //const boutonFiltreTous = document.createElement("button");
        boutonFiltreTous.innerHTML = "Tous";
        boutonFiltreTous.classList.add("boutonsFiltres");
        filtres.appendChild(boutonFiltreTous);

        boutonFiltreTous.addEventListener("click", function (e) {
          displayWork(e, "tous");
        });
      }

      const boutonFiltre = document.createElement("button");
      boutonFiltre.innerHTML = category.name;
      filtres.appendChild(boutonFiltre);
      boutonFiltre.classList.add("boutonsFiltres");

      boutonFiltre.addEventListener("click", function (e) {
        displayWork(e, category.id);
      });

      boutonFiltreTous.addEventListener("mouseover", function (e) { //Au survol les boutons des filtres deviennent verts
        e.target.classList.add("hover"); //"e.target représente le bouton survolé"
      });

      boutonFiltreTous.addEventListener("mouseout", function (e) { //Les filtres reviennent à leurs états initial aprés le survol
        e.target.classList.remove("hover");
      });

      boutonFiltre.addEventListener("mouseover", function (e) {
        e.target.classList.add("hover");
      });

      boutonFiltre.addEventListener("mouseout", function (e) { //Les filtres reviennent à leurs états initial aprés le survol
        e.target.classList.remove("hover");
      });
    });
  });

function displayWork(e, id) {
  const boutonsFiltres = document.querySelectorAll(".boutonsFiltres");
  boutonsFiltres.forEach((filtre) => {
    if (filtre === e.target) {
      filtre.classList.add("boutonActive");
    } else {
      filtre.classList.remove("boutonActive");
    }
  });

  const worksInHtml = document.querySelectorAll(".work");

  worksInHtml.forEach((work) => {
    if (id !== "tous") {
      if (id == work.dataset.category) {
        work.style.display = "block";
      } else {
        work.style.display = "none";
      }
    } else {
      work.style.display = "block";
    }
  });
}

function hideFilters() {
  if (localStorage.getItem("token")) {
    filtres.style.display = "none";
  } else {
    filtres.style.display = "flex";
  }
}
hideFilters();

function displayEdit() {
  if (localStorage.getItem("token")) {
    const edit = document.querySelector("#buttonModifier");
    edit.style.visibility = "visible";
  } else {
    document.querySelector("#buttonModifier").style.display = "none";
  }
}
displayEdit();
