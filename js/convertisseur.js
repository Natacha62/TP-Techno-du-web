// Récupération des champs input pour chaque devise
let euro = document.getElementById("euro");
let dollarAmericain = document.getElementById("dollarAmericain");
let dollarAustralien = document.getElementById("dollarAustralien");

// Version 2 : conversion automatique à chaque saisie
/* Ajoute un écouteur sur chaque champ pour déclencher la conversion 
quand l'utilisateur tape quelque chose*/
euro.addEventListener("input", function(){convArgent(this.id, this.value);}); 
dollarAmericain.addEventListener("input", function(){convArgent(this.id, this.value);}); 
dollarAustralien.addEventListener("input", function(){convArgent(this.id, this.value);});

// Version 1 : conversion via un bouton (commentée)
// Permet de convertir en cliquant sur un bouton "convertir" et de réinitialiser les champs
let btnConvertir = document.getElementById("convertir");
let enModeConversion = true;

btnConvertir.addEventListener("click", function(){
    if(enModeConversion){ // Si on est en mode conversion
        // On vérifie quel champ contient une valeur et on lance la conversion
        if(euro.value !== "") {
            convArgent("euro", euro.value);
        }
        else if(dollarAmericain.value !== ""){
            convArgent("dollarAmericain", dollarAmericain.value);
        }
        else if(dollarAustralien.value !== ""){
            convArgent("dollarAustralien", dollarAustralien.value);
        }
        enModeConversion=false; // On passe en mode reset
    }
    else{
        resetChamps(); // Réinitialise tous les champs
        enModeConversion = true; // Repasser en mode conversion
    }
})

// Fonction pour réinitialiser les champs de saisie
function resetChamps() {
    euro.value = "";
    dollarAmericain.value = "";
    dollarAustralien.value = "";
}

// Fonction de conversion principale
// id : identifiant du champ qui a été modifié et valeur : valeur saisie dans ce champ
function convArgent(id, valeur) {
    valeur = parseFloat(valeur); // Conversion en nombre à virgule
    if (isNaN(valeur)) return;  // Si ce n'est pas un nombre, on quitte la fonction

    // Conversion selon la devise saisie
    // Convertir l'euro en dollars américains et australiens
    if(id == "euro"){
        dollarAmericain.value = (valeur * 1.18).toFixed(2); // arrondi à 2 décimales
        dollarAustralien.value = (valeur * 1.79).toFixed(2);
    }
    // Convertir le dollar américain en euros et dollars australiens
    else if(id == "dollarAmericain"){
        euro.value = (valeur * 0.85).toFixed(2);
        dollarAustralien.value = (valeur * 1.52).toFixed(2);
    }
    // Convertir le dollar australien en euros et dollars américains
    else if (id == "dollarAustralien"){
        euro.value = (valeur * 0.56).toFixed(2);
        dollarAmericain.value = (valeur * 0.66).toFixed(2);
    }
}



