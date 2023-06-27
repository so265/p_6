//add-photo.js

const form = document.getElementById("formulaire-add-photo");
 //const btnAddPhoto = document.querySelector(".button-add-photo");
 const btnAddPhoto = document.getElementById("button-add-photo");
 const inputFile = document.getElementById("input-file");

 
   // J'ajoute un gestionnaire d'événement pour le changement de fichier
  inputFile.addEventListener("change", () => {
    const file = inputFile.files[0]; // C'est pour récupérer le fichier sélectionné
    
      // Vous pouvez traiter le fichier ici, par exemple l'envoyer vers le serveur ou afficher un aperçu de l'image
      console.log("Fichier sélectionné :",file);

const modalAddPhoto = document.querySelector(".second-modal");
const titleInput = modalAddPhoto.querySelector(".label-title");
const categorySelect = modalAddPhoto.querySelector("#categorie-add-photo");
const buttonValidate = modalAddPhoto.querySelector(".valider-photo");

// Ajouter un écouteur d'événements input aux champs de formulaire
[titleInput, categorySelect].forEach((field) => {
  field.addEventListener("input", () => {
    // Vérifier si tous les champs sont remplis
    const AllFieldsFilled =
    titleInput.value.trim() !== "" && categorySelect.value !== "default";
    // Mettre à jour le style du bouton en conséquence
    buttonValidate.style.backgroundColor = AllFieldsFilled
      ? "#1D6154"
      : "";
  });
});

buttonValidate.addEventListener("click", (event) => {
  event.preventDefault();
  const formData = new FormData();
  formData.append("image", file);
  formData.append("title",titleInput.value);
  formData.append("category", categorySelect.value);

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Fermer la modale après l'ajout réussi de la nouvelle image
      closeModal()
    })
    .catch((error) => console.error(error));
});
// remplacer div ajouter un photo par l'image sélctionné 


/////Ajout

btnAddPhoto.addEventListener("click", () => {
  inputFile.click();
});///////////////////////



const img = document.createElement("img");
img.src = URL.createObjectURL(file); //J'utilise l'url du fichier téléchargé
img.classList.add("image-ajout");
const divAddPhoto = modalAddPhoto.querySelector(".add-photo");
divAddPhoto.innerHTML=""; //Efface le contenu existant
divAddPhoto.appendChild(img);
divAddPhoto.querySelector("#input-file").style.display = "none";
divAddPhoto.querySelector(".picture-format").style.display = "none";
divAddPhoto.querySelector(".divIconValidate").style.display = "none";
divAddPhoto.querySelector("#button-add-photo").style.display = "none";


});




/*btnAddPhoto.addEventListener("click", () => {
     inputFile.click();
   });*/

  
  
  //Au click sur l'élément input la boîte de dialogue de sélection de fichier s'ouvre



  


