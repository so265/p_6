//add-photo.js

const form = document.getElementById("formulaire-add-photo");
 const btnAddPhoto = document.getElementById("button-add-photo");
 const inputFile = document.querySelector("#input-file");
 const modalAddPhoto = document.querySelector(".second-modal");  //Ces variables rprésentent différents éléments de la modal pour ajouter une photo
 const titleInput = modalAddPhoto.querySelector("#title-add-photo"); //Il faut bien selectionner l'ID de l'input l.63 ds index.html pour que le titre apparaisse sous la nouvelle image séléctionée
 const select = document.querySelector('#categorieSelect')
 const buttonValidate = modalAddPhoto.querySelector(".valider-photo");


  // Récupération des catégories
  
  fetch("http://localhost:5678/api/categories" , {
    method : "GET"
  }).then((res) => res.json())
  .then((categories) => {
      categories.forEach(category => {
        const option = document.createElement("option")
        option.value = category.id
        option.innerHTML = category.name
        select.appendChild(option)
      });
  })

 
   // J'ajoute un gestionnaire d'événement pour le changement de fichier
  inputFile.addEventListener("change", () => { ///J'écoute l'événement change qui se déclenche lorsque l'utilisateur sélectionne un fichier
    const file = inputFile.files[0]; // C'est pour récupérer le fichier sélectionné à l'aide de inputFile.files[0] 
    
    console.log("Fichier sélectionné :",file); //Le message ds la console sera fichier séléctionné: avec le contenu de la variable file qui représente l'image séléctionné
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file); //J'utilise l'url du fichier téléchargé. Cela crée une URL temporaire qui représente le contenu du fichier sélectionné.
    img.classList.add("image-ajout"); //J'applique du style à mon img, je vais récupérer la class ds add.photo.css
    const divAddPhoto = modalAddPhoto.querySelector(".add-photo");
    divAddPhoto.innerHTML=""; //Efface le contenu existant, cette ligne permet d'effacer tous les textes et icon présents avant le téléchargement de l'image et d'afficher que la nvelle image
    divAddPhoto.appendChild(img); //divAddPhoto = div ou se trouve l'image à pour enfant la nouvelle image, cela permet d'insérer l'image et de la voir
   
  const figure = img.parentNode; //Je récupére l'élément parent de "img" qui est la div avec la class add-photo ligne 52 ds index.html
  //console.log(figure);
  const figcaption = document.createElement("figcaption"); //Je crée ma légende
  figcaption.innerText = titleInput.value; //Ici le contenu text de l'élément figcaption est défini. en utilisant titleInput dc l'input l.63 ds index.html, j'affiche le titre
  figure.appendChild(figcaption); //figure a pour enfant figcaption

   
  });

buttonValidate.addEventListener("click", (event) => { //j'écoute au clic l'évenement sur le bouton de validation
  event.preventDefault();//preventDefault() est appelée sur l'objet event pour empêcher le comportement par défaut du navigateur lors du clic sur le bouton. Cela évite aussi que la page soit rechargée.
  const formData = new FormData(); // Cela crée une instance de l'objet FormData utilisée pour envoyer les données du formulaire.
  formData.append("image", inputFile.files[0]); //avec la méthode append() , j'ajoute les données de formulaire à l'instance "formData", fichier, titre et catégory
  formData.append("title",titleInput.value); //L'attribut "title" est utilisé pour identifier le titre côté serveur.
  formData.append("category", select.value);//Lorsque je séléctionne une valeur ds la liste déroulante(objets, hotels et restaurants ou appartements), celle-ci s'ajoute à l'instance "formData".L'attribut "category" est utilisé pour identifier la catégorie côté serveur. 

  

  fetch("http://localhost:5678/api/works", { //je fais une requéte fetch 
    method: "POST", //méthode post pour envoyer des données à un serveur, ici je l'utilse pour envoyer les données du formulaire (fichier sélectionné, le titre et la catégorie de la photo)au serveur à l'URL spécifiée ("http://localhost:5678/api/works").lE serveur peut enregistrer la nouvelle photo ds une base de données
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`, //je récupére un jeton d'autorisation(token) à partir du local storage
    },
    body: formData,
  })
    .then((response) => response.json()) //requéte réussie=convertie au format JSON
    .then((data) => {
      console.log(data);
      // je ferme la modale après l'ajout réussi de la nouvelle image
      closeModal() //aprés l'ajout réussie de la photo, je ferme la modale en appelant la fonction closeModal() ds modal.js ligne 112
    })
    .catch((error) => console.error(error));
});

