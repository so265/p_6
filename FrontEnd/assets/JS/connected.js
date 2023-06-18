/****Apparition de la border-top noire lors de la connexion ****/
function displayBorderTop (){
if (localStorage.getItem("token")) { /*Le token me permet de voir si l'utilisateur est connecté*/ 
    document.querySelector("#topBarEdition").style.display = "flex"; /*border-top noire qui apparait lors de la connexion*/
    const btn = document.querySelector("#ancre-logout")
    btn.innerHTML = "logout"  /*Lorsque je suis connéctée, le mot logout apparait à la place de login */
    
    btn.addEventListener("click", function(e){
        e.preventDefault();
       
        localStorage.removeItem("token") //La méthode removeItem() supprime l'élément de l'objet de stockage spécifié.
        window.location.reload(); //La location.reload()méthode qui recharge l'URL actuelle,
    })
}else{
document.querySelector("#topBarEdition").style.display ="none"; /*aussi non la barre noire n'apparait si non connecté*/

}

}

displayBorderTop ();

