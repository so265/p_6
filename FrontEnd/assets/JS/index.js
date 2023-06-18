//index.js

//J'affiche dynamiquement mon portofolio

let gallery = document.getElementsByClassName("gallery")[0]; //gallery est un tableau qui part de l'index 0
let filtres = document.getElementsByClassName("filtres")[0];

//je me connecte à l'API, je fais des get request, je récupére les données depuis cette API, get = récupérer des datas, post = envoyer des datas

fetch("http://localhost:5678/api/works") //fetch prend 2 parametres une URL(pour contacter l'API)et des options
  .then((response) => response.json()) //fetch envoie des promesses et pour les récupérer, j'utilise la méthode then qui renvoi la réponse de fetch,
  .then((works) => {
    //Json permet de transformer la réponse en un objet JS interprétable par le navigateur, ce 2éme .then me permet de récupérer ma réponse
    for (
      // boucle for ([initialisation]; [condition]; [expression-finale]) + instructions
      let i = 0;
      i < works.length;
      i++ //i doit être inférieur à la totalité de works(11 projets ds le portofolio), lenght permet de compter les elements du tableau //Affichage de tous les projets de l'architecte, je me référe au code ds index.html pour créer mes variables
    ) {
      //let gallery = document.getElementsByClassName("gallery")[0];
      let figure = document.createElement("figure"); //Je crée un élement figure dont le  parent est la div gallery
      figure.classList.add("work");

      figure.dataset.category = works[i].categoryId;

      gallery.appendChild(figure); //galery est le parent de figure, comme coder en statique dans index.html

      let image = document.createElement("img"); //Je crée un élement img avec pour parent l'element figure, les images s'afficheront ainsi que les titres(bien utiliser img)
      image.src = works[i].imageUrl; //je récupére ds mon API, imageURL et title, pour afficher l'image et le titre/imageUrl = propriété d'1 objet//works est un tableau
      figure.appendChild(image); //figure est le parent de images

      let figcaption = document.createElement("figcaption"); //je  crée un élement figcaption avec pour parent l'element figure, correspond à la description du lieu
      figcaption.innerText = works[i].title; //je vais chercher title dans mon API, innerText permet de récupérer du texte brut
      figure.appendChild(figcaption); //figure est le parent de images
      //console.log(figcaption);
    }
  });

fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())

  .then((response) => {
    response.forEach((category, index) => {
      if (index === 0) {
        const boutonFiltreTous =
          document.createElement(
            "button"
          ); /*Je crée le button qui s'appelle tous*/
        boutonFiltreTous.innerHTML = "Tous";
        boutonFiltreTous.classList.add("boutonsFiltres");

        filtres.appendChild(boutonFiltreTous); //Filtres(DIV crée en HTML) a pour enfant le boutton tous

        boutonFiltreTous.addEventListener(
          "click",
          function (
            e //Lorsque je clique sur le bouton, je déclenche une fonction, "e", correspond à mes filtres
          ) {
            displayWork(e, "tous");
          }
        );
      }

      const boutonFiltre =
        document.createElement(
          "button"
        ); /*Je crée les 3 button filtres que je récupére da mon API(sauf tous crée au-dessus*/
      boutonFiltre.innerHTML = category.name;

      filtres.appendChild(boutonFiltre); //Filtres(DIV crée en HTML) a pour enfant le boutton tous
      boutonFiltre.classList.add("boutonsFiltres");

      boutonFiltre.addEventListener(
        "click",
        function (
          e //Lorsque je clique sur le bouton, je déclenche une fonction
        ) {
          displayWork(e, category.id); //signifie, tu me retournes un nouveau tableau avec ttes les category, donc tous les projets, "e", correspond à mes filtres
        }
      );
    });
  });

function displayWork(e, id) {
  //displayWork=afficher le work(=ressource de l'url(http://localhost:5678/api/works) de l'api = projet portofolio image + texte /filtre est un argument, "e" correspons à mon filtre
  const boutonsFiltres = document.querySelectorAll(".boutonsFiltres");
  boutonsFiltres.forEach((filtre) => {
    if (filtre === e.target) {
      //"e.target", correspond à mon filtre
      filtre.classList.add("boutonActive");
    } else {
      filtre.classList.remove("boutonActive");
    }
  });

  const worksInHtml = document.querySelectorAll(".work");

  worksInHtml.forEach((work) => {
    console.log(typeof work.dataset.category);
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

/******Cacher des filtres lors de la connexion*****/
function hideFilters() {
  if (localStorage.getItem("token")) {  /*Le token me permet de voir si l'utilisateur est connecté*/ 
    const filtresCaches = filtres.style.display = "none";

    filtresCaches.addEventListener("click", function (e) {
      e.preventDefault(); // Pour prévenir l’envoi d’un formulaire mal rempli/ je vneutralise l'action par défaut de l’envoi du formulaire)

      localStorage.removeItem("token");
      window.location.reload();
    });
  } else {
    filtres.style.display = "flex";
  }
}
hideFilters();

/******Je fais apparaitre le bouton modifier lors de la connexion******/

function displayEdit() {
  if (localStorage.getItem("token")) { /*Le token me permet de voir si l'utilisateur est connecté*/ 
    const edit = document.querySelector("#buttonModifier")
    edit.style.visibility = "visible";
     
    edit.addEventListener("click", function(e){
          e.preventDefault(); // Pour prévenir l’envoi d’un formulaire mal rempli/ je vneutralise l'action par défaut de l’envoi du formulaire)
         
          localStorage.removeItem("token")
          window.location.reload();
      })
  }else{
  document.querySelector("#buttonModifier").style.display ="none";
  
  }
  
  }
displayEdit();