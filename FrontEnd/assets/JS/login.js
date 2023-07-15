//login.js
/*email: sophie.bluel@test.tld
password: S0phie */

const formulaire = document.querySelector("#formulaire-login"); //Je selectionne le formulaire dans login.html
const error = document.querySelector("#error"); //Je selectionne le p de error dans login.html

formulaire.addEventListener("submit", (e) => {  //La méthode submit()provoque la soumission des valeurs du formulaire 
  e.preventDefault(); // Pour prévenir l’envoi d’un formulaire mal rempli/ je neutralise l'action par défaut de l’envoi du formulaire
  const email = formulaire.email.value; //".value" pr recuperer la valeur de l'email saisie par l'utilisateur
  const password = formulaire.password.value; //".value" pr recuperer la valeur du password saisie par l'utilisateur
  
  //Envoi la requête POST à l'API 
  fetch("http://localhost:5678/api/users/login", {  //La méthode fetch permet de contacter l'API à l'aide de l'URL
    method: "POST",
    headers: {
      "Content-Type": "application/json",// les données sont envoyées au format JSON
    },
    body: JSON.stringify({ email, password }), //Convertit l'e-mail et le mot de passe en string et les intégre dans le corps de la requête.
  })
    
    .then((response) => response.json()) //fetch envoie des promesses et pour les récupérer, j'utilise la méthode then qui renvoi la réponse de fetch
    .then((data) => {  //Json permet de transformer la réponse en un objet JS interprétable par le navigateur, ce 2éme .then me permet de récupérer ma réponse
      //Vérifie si la réponse de l'API contient un jeton d'accès.
      if (data.token) {  //"Les tokens d'authentification permettent aux utilisateurs de se connecter une seule fois à leur compte
        //Si "if" l'authentification est réussie, enregistrement du jeton d'authentification (token) dans le stockage local(localStorage).
        localStorage.setItem("token", data.token); //le localStorage permet aux développeurs de stocker et de récupérer des données dans le navigateur, données perdues lorsque l'utilisateur vide le cache
        //"setItem()"": Cette méthode est utilisée pour ajouter une clé et une valeur au localStorage.
        window.location.replace("index.html");//L'utilisateur est redirigé vers la page d'accueil.
      } else  {
        error.textContent = "Erreur dans l’identifiant ou le mot de passe"; //Si le mot de passe ou l'identifiant est invalide, ce message s'affiche
      }
    });
});


