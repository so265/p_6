/****Apparition de la border-top noire lors de la connexion ****/
function displayBorderTop (){
if (localStorage.getItem("token")) { /*Le token me permet de voir si l'utilisateur est connecté*/ 
    document.querySelector("#topBarEdition").style.display = "flex";
    const btn = document.querySelector("#ancre-logout").innerHTML = "logout"  /*Loorsque je suis connéctée, le mot logout apparait à la place de login */
    btn.addEventListener("click", function(e){
        e.preventDefault();
       
        localStorage.removeItem("token")
        window.location.reload();
    })
}else{
document.querySelector("#topBarEdition").style.display ="none";

}

}

displayBorderTop ();

