//modal.js

/**************1ére modale****************/
// Je récupére les éléments de la modale et les boutons pour ouvrir et fermer la modale
const modalContainer = document.getElementById("modal-container");
const closeButton = document.querySelector(".close-modal");
const buttonModifier = document.getElementById("buttonModifier"); // Je clique sur ce bouton modifier pour ouvrir la modale
const galleryImagesInModal = document.querySelector("#gallery-pictures-modal"); //variable utilisé en ligne 43 et ligne 137

// Function pour fermer la modale
function closeModal() {
  modalContainer.style.display = "none";
}

//Fonction pour fermer la modale quand je click en dehors de la modale
function outsideModalClick(e) {
  if (e.target === modalContainer) {
    //La propriété target de l'objet event fait référence à l'élément DOM sur lequel l'événement a été initialement déclenché, c'est-à-dire l'élément sur lequel l'utilisateur a effectué une action qui a déclenché l'événement.
    closeModal();
  }
}
// Add event listeners pour ouvrir et fermer la modale
document.addEventListener("DOMContentLoaded", () => {//"DOMContentLoaded" gestionnaire d'événement qui permet de s'assurer que que le code s'exécute une fois que le document est prêt
  closeButton.addEventListener("click", closeModal); //je ferme la modale au click sur la croix
  buttonModifier.addEventListener("click", openModal); //j'ouvre la modale au click sur le bouton modifier
  window.addEventListener("click", outsideModalClick); //L'objet window est utilisé pour écouter l'événement au click
});

// Function pour ouvrir la 1ére modale
function openModal() {
  modalContainer.style.display = "flex";
  displayImagesInModal(); // J'appele la fonction l.43 pour afficher les images dans ma modale, lorsque je l'ouvre
}

//J'ajoute les images dans la modal
function displayImagesInModal() {
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((works) => {
    
      //const galleryImagesInModal = document.querySelector("#gallery-pictures-modal"); declarer en ligne 8, en variable globale
      // Effacer les images précédentes dans le modal
      galleryImagesInModal.innerHTML = "";

      // Parcourir les works et créer les éléments d'image
      works.forEach((work) => { //Je fais une boucle pour chaque image, chaque icon
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("modal-image-container");

        imageContainer.dataset.id = work.id//dataset est une propriété des éléments du DOM

        const image = document.createElement("img");
        image.src = work.imageUrl;
        image.alt = "Image du projet";
        image.classList.add("modal-image"); //j'ajoute la class css créee ds modal.css pour styliser l'image

        //Insertion de l'icone fléchée pour chaque image qui apparit au hover
       const arrowsUpDownLeftRight = document.createElement("i"); //J'ajoute l' image de la fleche a coté de la corbeille, cette icone sera vsible au hover
        //arrowsUpDownLeftRight.classList.add= `assets/icons/arrow-multi.png`;
        arrowsUpDownLeftRight.classList.add("fa-expand-arrows-alt");
        imageContainer.appendChild(arrowsUpDownLeftRight);

        //Fin insertion de l'icone fléchée


        //Insertion de l'image corbeille pour chaque image
        const imgSupprimerElement = document.createElement('i');//Je crée ma corbeille
        imgSupprimerElement.classList.add("fas", "fa-trash-alt");//Je cible ma corbeille dans mon dossier assets
        imgSupprimerElement.classList.add("delete-icon"); //class crée ds modal.css ligne 116
        imageContainer.appendChild(imgSupprimerElement);
        //Fin insertion image poubelle


        const editLabel = document.createElement("span");
        editLabel.innerText = "Éditer";
        editLabel.classList.add("editer"); //Je cree une class ds modal.css qui s'appelle editer

        galleryImagesInModal.appendChild(imageContainer);
        imageContainer.appendChild(image);
        imageContainer.appendChild(editLabel);

      });
    });
}

/************************Seconde modale**************************/
//**************J'ouvre la seconde modale
// Je récupére les éléments de la première modale et du bouton "Ajouter une photo"
const addPicturesButton = document.querySelector(".addPicturesModal"); //C'est le bouton ajouter une photo, au click sur ce bouton, je serai redirigé sur la seconde modale
const firstModal = document.querySelector(".modal"); //Je récupére la 1ére modale
const secondModal = document.querySelector(".second-modal"); //Je récupére la seconde modale
const arrowLeft = document.getElementById("arrow");

//************* * Fonction pour ouvrir la seconde modale et fermer la première modale
function openSecondModal() {
  firstModal.style.display = "none"; // Je cache la première modale
  secondModal.style.display = "block"; // J'affiche la seconde modale
}

// J'ajoute un gestionnaire d'événement pour le bouton "Ajouter une photo", bouton qui me redirige sur la 2de modale"
addPicturesButton.addEventListener("click", openSecondModal);

//***************Je ferme la seconde modale

// Récupérer les éléments de la seconde modale et du bouton de fermeture
const closeSecondModalButton = document.querySelector(
  ".second-modal .close-modal"
);
//const secondModal = document.querySelector(".second-modal"); present en ligne 8

// Fonction pour fermer la seconde modale
function closeSecondModal() {
  secondModal.style.display = "none"; // Je Cache la seconde modale
  firstModal.style.display = "block"; //J'affiche à nouveau la 1ére modale pour eviter les erreurs de fermeture
}

// J'ajoute un gestionnaire d'événement pour le bouton de fermeture de la seconde modale
closeSecondModalButton.addEventListener("click", closeSecondModal); //Au click la function "closeSecondModal" est utilisée

//********** */ Fonction pour fermer la seconde modale lors d'un clic à l'extérieur de la modale ou sur la croix
function outsideSecondModalClick(e) {
  //contains()vérifie si l'élément cliqué est un descendant de la deuxième modale
  if (!secondModal.contains(e.target)) {
    // Je vérifie si l'élément cliqué est égal à la 2ème modale "secondModal" ou à l'un de ses éléments enfants.
    closeSecondModal(); //Si oui alors je ferme la modale
  }
}

//*********** */ Function pour revenir à la première modale avec la fléche en haut à gauche sur la seconde modale
function goBackToFirstModal() {
  secondModal.style.display = "none"; //Ma seconde modale disparait
  firstModal.style.display = "block"; //Ma premiére modale réapparait
}

arrowLeft.addEventListener("click", goBackToFirstModal); //au click sur la fléche de gauche, j'affiche à nouveau la 1ére modale.


//************Supression de travaux existant au click sur la corbeille ds la 1ére modale **************//

// Je récupère l'icône corbeille pour chaque image


//const galleryImagesInModal = document.querySelector("#gallery-pictures-modal"); //déclaré en ligne 8, car est utilisé 2 fois dans ce fichier modal.js

galleryImagesInModal.addEventListener("click", (e) => {  //"galleryImagesInModal" correspond à ma gallery d'image
  if (e.target.classList.contains("delete-icon")) { //delete-icon ds modal-css, ligne 105, c'est ma corbeille//"e.target", je determine l'élément réellement cliqué, je vérifie que cet élement posséde la classe"delete-icon"
    const imageContainer = e.target.parentElement; //Avec"parentElement", je remonte jusqu'à l'élément conteneur de l'image qui est "imageContainer" qui contient l'image + corbeille
    const imageId = imageContainer.dataset.id; // je mets en commentaire pour pas vraiment supprimer l'image/j' extrais l'ID de l'image à partir de l'attribut data-id de imageContainer."data-id" représente l'identifiant de l'image correspondante
//Lorsque je  clique sur la corbeille j'utilise imageContainer.dataset.id pour récupérer la valeur de l'attribut data-id, qui représente l'identifiant de l'image correspondante.

    fetch(`http://localhost:5678/api/works/${imageId}`, {  // L'URL de la requête est construite en utilisant l'ID de l'image, "imageId"=variable L137, permet de spécifier quelle image doit être suprimée
      method: "DELETE", //Je fais 1 requéte delete à l'API en utilisant 'fetch'
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // j'inclue le jeton d'authentification dans les en-têtes de la requête en utilisant localStorage.getItem("token").
      },
    })
      .then((response) => {
        console.log(response);
        if (response.ok) { //Si la réponse de la requête est response.ok, l'image est supprimée
          
          imageContainer.remove(); //donc je supprime l'élément "imageContainer"= image + corbeille du DOM en utilisant imageContainer.remove().
        } else {//si la reponse n'est pas "response.ok"
          throw new Error("Error deleting the image"); //je génére une erreur en utilisant throw new Error("Error deleting the image")
        }
      })
      .catch((error) => {
        console.error(error);//ce message s'affichera ds la console s'il y a une ereur
      });
  }
});


