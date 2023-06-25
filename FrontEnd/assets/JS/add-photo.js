/*const form = document.getElementsById("formulaire-add-photo");
form.addEventListener("submit", function(e) {
    console.log(e);
}

)*/


const form = document.getElementsById("formulaire-add-photo");
 const btnAddPhoto = document.querySelector(".button-add-photo");
 const inputFile = document.getElementById("input-file");

 btnAddPhoto.addEventListener("click", () => {
   // J'ajoute un gestionnaire d'événement pour le changement de fichier
  inputFile.addEventListener("change", (e) => {
    const file = e.target.files[0]; // C'est pour récupérer le fichier sélectionné
    if (file) {
      // Vous pouvez traiter le fichier ici, par exemple l'envoyer vers le serveur ou afficher un aperçu de l'image
      console.log(file);
    }
  });

  
  
  //Au click sur l'élément input la boîte de dialogue de sélection de fichier s'ouvre
  inputFile.click();
});

