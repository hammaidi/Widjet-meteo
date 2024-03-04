// Paramètres de l'API pour récupérer la météo, ils se récupèrent sur le site d'openWeatherMap
const api = {
    clef: "1ad22342e17a068ed602313e121dc6ff",
    lien: "http://api.openweathermap.org/data/2.5/"
}

// Récupération des éléments du document HTML
const zoneTexte = document.getElementById("zoneTxt");
const ville = document.getElementById("ville");
const dateAjd = document.getElementById("date");
const temp = document.getElementById("temp");
const meteo = document.getElementById("meteo");
const humidite = document.getElementById("humidite");

// Gestion des evenements sur la page
zoneTexte.addEventListener('keypress', recherche); // lorsque j'appuis sur une touche dans la zone texte on appelle "recherche"


// Listes des fonctions 
// Recherche pour envoyer la ville saisie dans une requete
function recherche(event) // event par défaut en JS contient ce qui a déclenché l'evenement
{
    if (event.keyCode == 13) // si la touche correspond à la touche 13 (touche Entrée en JS)
    {
        getResultat(zoneTexte.value); // on appelle la fonction qui va chercher les données avec en param la ville saisie
    }
}

// getResultat pour récupérer les données de la ville saisie
function getResultat(villeRecherche)
{
    fetch(`${api.lien}weather?q=${villeRecherche}&units=metric&APPID=${api.clef}`)
    .then(dataMeteo => { return dataMeteo.json(); })
    .then(printResultat);
}

// printResultat pour afficher les données récupérées dans la fonction précédente
function printResultat(dataMeteo)
{
    ville.textContent = `${dataMeteo.name}, ${dataMeteo.sys.country}`;
    // Date du jour 
    let today = new Date();
    dateAjd.textContent = `${today.getDate().toString()}/${(today.getMonth()+1).toString()}/${today.getFullYear().toString()}`;
    //Temperature arrondie au plus proche
    temp.textContent = `${Math.round(dataMeteo.main.temp)} °C`;
    // Temps global 
    meteo.textContent = `${dataMeteo.weather[0].main}`;
    // Humidité
    humidite.textContent = `Humidity : ${dataMeteo.main.humidity}%`;
}