// Sélectionne le lien Wikipedia et lui assigne l'URL de la page d'accueil
const wikipedia = document.querySelector("#wikipedia");
wikipedia.href ='https://fr.wikipedia.org/wiki/Wikip%C3%A9dia:Accueil_principal';

// Ajoute un événement sur le bouton "verifier" pour contrôler la réponse utilisateur
document.getElementById("verifier").addEventListener("click", function() {
    const champ = document.getElementById("reponse");
    const valeur = champ.value.trim(); // supprime les espaces autour du texte

    // Vérifie que la réponse est "Oui" ou "Non", sinon affiche un message
    if (valeur !== "Oui" && valeur !== "Non") {
        champ.value = "Il faut mettre Oui ou Non";
    }
});

// Sélection des trois choix par ID
let choix1 = document.getElementById("C1");
let choix2 = document.getElementById("C2");
let choix3 = document.getElementById("C3");

// Fonction pour récupérer l'élément suivant dans le DOM (ignore les textes, commentaires, etc.)
function getNextElement(input) {
    let node = input.nextSibling;
    while(node && node.nodeType !== Node.ELEMENT_NODE) { // Node.ELEMENT_NODE = 1
        node = node.nextSibling;
    }
    return node;
}

// Met à jour le texte des labels correspondants aux choix
getNextElement(choix1).textContent = "HP";
getNextElement(choix2).textContent = "Casque";
getNextElement(choix3).textContent = "Bluetooth";

// Récupère tous les boutons radio ayant le name="choix"
let radios = document.querySelectorAll('input[name="choix"]');

// Récupère le premier input de type volume (range)
let volumeInput = document.querySelector('input.volume');

// Récupère le label du volume situé juste après l'input
let volumeLabel = volumeInput.nextSibling.nextSibling;

// Ajoute un écouteur pour changer le texte du label selon le bouton radio sélectionné
radios.forEach(function(radio) {
    radio.addEventListener('change', function() {
        if(this.value == "1") {
            volumeLabel.textContent = "Volume HP";
        } else if(this.value == "2") {
            volumeLabel.textContent = "Volume Casque";
        } else if(this.value == "3") {
            volumeLabel.textContent = "Volume Bluetooth";
        }
    });
});

// Définition de la valeur max du volume
volumeInput.max = 11;

// Place la valeur initiale au milieu de la plage
volumeInput.value = Math.floor(volumeInput.max / 2);

console.log("Valeur max du volume :", volumeInput.max);

// Fonction pour afficher la valeur du volume dans un élément
function afficherVolume(elem) {
    document.getElementById('volumeValue').textContent = elem.value;
}

// Changement du texte du label associé à la case mute
let labelCase = document.querySelector("label[for='ouinon']");
labelCase.textContent = "Mute";

// Récupération de la checkbox pour mute/désactiver le volume
let muteCheckbox = document.getElementById('ouinon');

// Désactive le volume si la case est cochée, active sinon
muteCheckbox.addEventListener('change', function() {
    if(this.checked) {
        volumeInput.disabled = true;
    } else {
        volumeInput.disabled = false;
    }
});

// Ajout d'une nouvelle image dans la div "lienImages"
let divLienImages = document.getElementById("lienImages");

let nouvelleImage = document.createElement('img');
nouvelleImage.src = "https://upload.wikimedia.org/wikipedia/commons/b/bd/UPHF_logo.svg";
nouvelleImage.width = 200;
nouvelleImage.alt = "Logo UPHF";

divLienImages.appendChild(nouvelleImage);

// Récupération de l'input date et affichage de l'année choisie dans la console
let dateInput = document.getElementById('date');
dateInput.addEventListener('change', function() {
    let year = new Date(this.value).getFullYear();
    console.log("Année choisie :", year);
});

// Sélection des barres de progression
let prog1 = document.querySelector('progress');
let prog2 = document.querySelector('.progress-space');

// Initialisation des barres à 0
prog1.value = 0;
prog2.value = 0;

// Animation des barres : augmentation de 5% chaque seconde
let interval = setInterval(function() {
    if (prog1.value < 100) prog1.value += 5;
    if (prog2.value < 100) prog2.value += 5;

    // Arrête l'intervalle quand les deux barres atteignent 100%
    if (prog1.value >= 100 && prog2.value >= 100) clearInterval(interval);
}, 1000); // 1000 ms = 1 seconde


// Lors du chargement de la page
window.addEventListener('load', function() {
    // Cacher les sections "lienImages" et "barresProgression"
    let sections = document.querySelectorAll('#lienImages, #menu, #barresProgression');
    for (let i = 0; i < sections.length; i++) {
        sections[i].style.display = "none";
    }

     // Création d'un bloc contenant les cases à cocher pour afficher les sections
    let body = document.body;
    let divCases = document.createElement('div');
    divCases.style.marginBottom = '10px'; 

    // Case pour "Lien et images"
    let chkLien = document.createElement('input');
    chkLien.type = 'checkbox';
    chkLien.id = 'chkLien';
    chkLien.checked = false;
    let lblLien = document.createElement('label');
    lblLien.htmlFor = 'chkLien';
    lblLien.textContent = ' Afficher "Lien et images"';
    divCases.appendChild(chkLien);
    divCases.appendChild(lblLien);
    divCases.appendChild(document.createElement('br'));

    // Case pour "Les éléments !"
    let chkElem = this.document.createElement('input');
    chkElem.type = 'checkbox';
    chkElem.id = 'chkElem';
    chkElem.checked = false;
    let lblElem = document.createElement('label');
    lblElem.htmlFor = 'chkElem';
    lblElem.textContent = 'Afficher "les éléments !"';
    divCases.appendChild(chkElem);
    divCases.appendChild(lblElem);
    divCases.appendChild(document.createElement('br'));

    // Case pour "Barres de progression"
    let chkProg = document.createElement('input');
    chkProg.type = 'checkbox';
    chkProg.id = 'chkProg';
    chkProg.checked = false;
    let lblProg = document.createElement('label');
    lblProg.htmlFor = 'chkProg';
    lblProg.textContent = ' Afficher "Barres de progression"';
    divCases.appendChild(chkProg);
    divCases.appendChild(lblProg);
    divCases.appendChild(document.createElement('br'));

    // Insère le bloc de cases en haut de la page
    body.insertBefore(divCases, body.firstChild);

    // Lien entre les cases à cocher et l'affichage des sections
    chkLien.addEventListener('change', function() {
        let section = document.getElementById('lienImages');
        section.style.display = this.checked ? "block" : "none";
    });

    chkElem.addEventListener('change', function() {
        let section = document.getElementById('menu');
        section.style.display = this.checked ? "block" : "none";
    });

    chkProg.addEventListener('change', function() {
        let section = document.getElementById('barresProgression');
        section.style.display = this.checked ? "block" : "none";
    });
});