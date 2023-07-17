//modal.js
// Gère principalement l'ouverture et la fermeture des deux modales, ainsi que l'affichage des images dans la première modale

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
  if (e.target === modalContainer) {//Si l'élément sur lequel l'utilisateur a cliqué correspond à modalContainer, cela signifie que l'utilisateur a cliqué en dehors de la modale. 
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
  displayImagesInModal(); // J'appele la fonction l.37 pour afficher les images dans ma modale, lorsque je l'ouvre
}

//J'ajoute les images dans la modal
function displayImagesInModal() {
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((works) => {
    //const galleryImagesInModal = document.querySelector("#gallery-pictures-modal"); declarer en ligne 8, en variable globale
    
      galleryImagesInModal.innerHTML = ""; //J'efface tt le contenu précédent
      // Parcourir les works et créer les éléments d'image
      works.forEach((work) => { //Je fais une boucle pour chaque image, chaque image est parcourue.
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("modal-image-container");
        imageContainer.dataset.id = work.id// la propriété dataset de l'élément imageContainer est utilisée pour définir un attribut data-id
        const image = document.createElement("img");
        image.src = work.imageUrl;
        image.alt = "Image du projet";
        image.classList.add("modal-image"); //j'ajoute la class css créee ds modal.css pour styliser l'image

        //Insertion de l'icone fléchée pour chaque image qui apparait au hover
       const arrowsUpDownLeftRight = document.createElement("i"); //J'ajoute l' image de la fleche a coté de la corbeille, cette icone sera vsible au hover
       arrowsUpDownLeftRight.classList.add("fas", "fa-expand-arrows-alt");//J'ai juste besoin d'ajouter des classes à une balise <i> pour utiliser les icons fontawsome
       imageContainer.appendChild(arrowsUpDownLeftRight);//permet de faire apparaitre la fléche

        //Fin insertion de l'icone fléchée

        //Icone carre noire en dessous de la fleche directionnelle
       const carre = document.createElement("i"); //J'ajoute l' image du carre noire en dessous de la fléche, a coté de la corbeille, cette icone sera vsible au hover
       carre.classList.add("fa-sharp", "fa-solid", "fa-square");//J'ai juste besoin d'ajouter des classes à une balise <i> pour utiliser les icons fontawsome
       imageContainer.appendChild(carre);//permet de faire apparaitre le carre noir

        //Insertion de l'image corbeille pour chaque image
        const imgSupprimerElement = document.createElement('i');//Je crée mon icon corbeille
        imgSupprimerElement.classList.add("fas", "fa-trash-alt");//J'ai juste besoin d'ajouter des classes à une balise <i> pour utiliser les icons fontawsome
        imgSupprimerElement.classList.add("delete-icon"); //class crée ds modal.css ligne 116
        imageContainer.appendChild(imgSupprimerElement);

        imgSupprimerElement.addEventListener("click", deleteWork) //Je mets l'écouteur d'événement sur la corbeille et pas galleryImagesInModal, function deleteWork en ligne 145
        //Fin insertion image poubelle


        const editLabel = document.createElement("span");
        editLabel.innerText = "éditer";
        editLabel.classList.add("editer"); //Je cree une class ds modal.css qui s'appelle editer

        galleryImagesInModal.appendChild(imageContainer);//l'élément imageContainer est ajouté à l'élément galleryImagesInModal, ce qui affiche la nouvelle image avec ses icônes dans la première modale et le portofolio.
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
const closeSecondModalButton = document.querySelector( ".second-modal .close-modal");
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
  displayImagesInModal()
}

arrowLeft.addEventListener("click", goBackToFirstModal); //au click sur la fléche de gauche, j'affiche à nouveau la 1ére modale.


//************Supression de travaux existant au click sur la corbeille ds la 1ére modale **************//

// Je supprime une image


function deleteWork(e) { //fonction appelée lorsque un utilisateur clique sur la corbeille
  e.stopPropagation(); // Empêche la propagation de l'événement click vers les parents afin d'éviter que d'autres éléments réagissent à ce clic.

  const imageContainer = e.target.parentElement;
  const imageId = imageContainer.dataset.id;

  // J'utilise une boîte de dialogue de confirmation personnalisée
  const userConfirmation = confirm("Voulez-vous vraiment supprimer la photo ?"); //La réponse de l'utilsateur true ou false est stockée ds cette variable 

  if (userConfirmation) {
    fetch(`http://localhost:5678/api/works/${imageId}`, { //si oui la la requéte de suppression est effectuée via une requete fetch
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        console.log(response);
        if (response.ok) { 
          imageContainer.remove(); //Je supprime l'image de la 1ere modale

   //Je supprime également l'image de la page d'accueil
          const workInGallery = document.querySelector( `.work[data-id="${imageId}"]`); ////data-id correspond à l'ID de l'image supprimée
          if (workInGallery) {
            workInGallery.remove(); ////Si je trouve cet élément "workInGallery", je le supprime
          }
        } else {
          throw new Error("Error deleting the image");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}