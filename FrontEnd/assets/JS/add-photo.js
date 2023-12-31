//add-photo.js
//Ce fichier concerne juste le formulaire de la 2éme modale, me permet d'ajouter une photo à la base de données via une requete POST.

const form = document.getElementById("formulaire-add-photo");
const btnAddPhoto = document.getElementById("button-add-photo");
const inputFile = document.querySelector("#input-file");
const modalAddPhoto = document.querySelector(".second-modal");
const titleInput = modalAddPhoto.querySelector("#title-add-photo");
const select = document.querySelector("#categorieSelect");
const buttonValidate = modalAddPhoto.querySelector(".valider-photo");
const divAddPhoto = modalAddPhoto.querySelector(".add-photo");

// Récupération des catégories
fetch("http://localhost:5678/api/categories", { //Je récupére les catégories disponibles via l'API
  method: "GET"
})
  .then((res) => res.json())
  .then((categories) => {
    categories.forEach((category) => { //les catégories sont parcourues avec forEach()
      const option = document.createElement("option"); //pour chaque catégorie 1 nvelle option est créee & ajouté à l'élément select
      option.value = category.id;
      option.innerHTML = category.name;
      select.appendChild(option);
    });
  });

  //
inputFile.addEventListener("change", () => { //lorsque l'utilisateur selectionne 1 fichier
  const file = inputFile.files[0]; //récupère le premier fichier sélectionné par l'utilisateur
  //console.log("Fichier sélectionné :", file); //indique le fichier qui a été sélectionné.

  if (!file) { //Je verifie la propriété files de inpute.files, si input.files est vide = pas de fichier séléctionné, j'affiche une alert de message.
    // Afficher un message d'erreur
    alert("Veuillez sélectionner une photo.");
    return; // return arrête l'exécution de la fonction. Cela empêche l'envoi des données du formulaire et la fermeture de la modal.
  }

  const img = document.createElement("img");
  img.src = URL.createObjectURL(file);
  img.classList.add("image-ajout");
 
  divAddPhoto.innerHTML = "";
  divAddPhoto.appendChild(img);

  const figure = img.parentNode;
  const figcaption = document.createElement("figcaption");
  figcaption.innerText = titleInput.value;
  figure.appendChild(figcaption);
});

buttonValidate.addEventListener("click", (event) => {
  event.preventDefault(); //empêche le rechargement de la page ou la soumission du formulaire car les conditions de sélection d'une photo ne sont pas remplies

  if (!inputFile.files || inputFile.files.length === 0) { //Si l'une de ces conditions est vraie, cela signifie qu'aucun fichier n'est sélectionné
    // Afficher un message d'erreur
    alert("Veuillez sélectionner une photo.");
    return; // Arrêter l'exécution de la fonction pour empêcher la fermeture de la modal
  }

  if (!titleInput.value || select.value === "") {//si champ de titre ou liste déroulante de catégorie non rempli
    // Alors j' Affiche un message d'erreur 
    alert("Veuillez remplir tous les champs du formulaire.");
    return; // Arrêter l'exécution de la fonction pour empêcher l'envoi du formulaire
  }

  event.stopPropagation();
  
  const formData = new FormData(); //nouvel objet FormData, je collecte et regroupe toutes les données saisies dans un formulaire afin de les envoyer facilement dans une requête HTTP
  formData.append("image", inputFile.files[0]); //J'ajoute l'image séléctionnée à l'objet formData
  formData.append("title", titleInput.value);
  formData.append("category", select.value);

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`, //je recupere le jeton d'accés du localStorage
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      event.stopPropagation();  //a voir
      alert("La photo a été téléchargée avec succès!");
      resetForm()
      getImages();
})
    .catch((error) => console.error(error));
});

function getImages() {   //Quand j'ai téléchargé l'image, je refais un appel à l'API pour afficher la nouvelle image dans la page d'accueil
  let gallery = document.getElementsByClassName("gallery")[0];
  gallery.innerHTML = "";
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
}


// Fonction pour réinitialiser le formulaire
function resetForm() {
  titleInput.value = "";
  select.value = "";
  divAddPhoto.innerHTML =`<div class="divIconValidate">
  <i class="fa fa-image"></i>
</div>
<label for="input-file" id="button-add-photo">+ Ajouter photo</label>
<input type="file" id="input-file"><br>
<span class="picture-format">jpg, png : 4mo max</span>`;

form.reset(); //Je réinitialise le formulaire sans recharger la page
}