//add-photo.js
//Ce fichier concerne juste le formulaire de la 2éme modale en ligne 49 de index.mtml, me permet d'ajouter une photo à la base de données via une requete POST.

const form = document.getElementById("formulaire-add-photo");
const btnAddPhoto = document.getElementById("button-add-photo");
const inputFile = document.querySelector("#input-file");
const modalAddPhoto = document.querySelector(".second-modal");
const titleInput = modalAddPhoto.querySelector("#title-add-photo");
const select = document.querySelector("#categorieSelect");
const buttonValidate = modalAddPhoto.querySelector(".valider-photo");

// Récupération des catégories
fetch("http://localhost:5678/api/categories", {
  method: "GET"
})
  .then((res) => res.json())
  .then((categories) => {
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.innerHTML = category.name;
      select.appendChild(option);
    });
  });

  //
inputFile.addEventListener("change", () => { 
  const file = inputFile.files[0];
  console.log("Fichier sélectionné :", file);

  if (!file) { //Je verifie la propriété files de inpute.files, si input.files est vide = pas de fichier séléctionné, j'affiche une alert de message.
    // Afficher un message d'erreur
    alert("Veuillez sélectionner une photo.");
    return; // return arrête l'exécution de la fonction. Cela empêche l'envoi des données du formulaire et la fermeture de la modal.
  }

  const img = document.createElement("img");
  img.src = URL.createObjectURL(file);
  img.classList.add("image-ajout");
  const divAddPhoto = modalAddPhoto.querySelector(".add-photo");
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

  if (!titleInput.value || select.value === "") {
    // Afficher un message d'erreur si le titre ou la catégorie ne sont pas sélectionnés
    alert("Veuillez remplir tous les champs du formulaire.");
    return; // Arrêter l'exécution de la fonction pour empêcher l'envoi du formulaire
  }

  event.stopPropagation();
  
  const formData = new FormData();
  formData.append("image", inputFile.files[0]);
  formData.append("title", titleInput.value);
  formData.append("category", select.value);

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data); //"data" représente les données renvoyées par l'API
      event.stopPropagation();  //a voir
      alert("La photo a été téléchargée avec succès!");
    })
    .catch((error) => console.error(error));
});


