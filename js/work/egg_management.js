import { updatePlayerStats } from "../player.js";

export function initEggManagement(playerData, resourcesDataEggs, eggbuildingsData) {
    displayNormalEggSection(playerData, eggbuildingsData);
}

//fonction pour afficher la section normal egg de l'oeuf
function displayNormalEggSection(playerData, eggbuildingsData) {
    const normalEggSection = document.getElementById("normal-egg-section");
    normalEggSection.style.display = "block";
    /*const specialEggSection = document.getElementById("specialEggSection");
    specialEggSection.style.display = "none";*/

    //on va chercher dans eggbuildingdata et on affiche chaque pet avec ces caracteristique etc
    var normal = eggbuildingsData.NormalEgg;
    console.log(normal);

    //on va ajouter des div avec du style pour chaque pet
    for (let i = 0; i < normal.length; i++) {
        var egg = normal[i];
        var eggDiv = document.createElement("div");
        console.log(eggDiv);
        console.log(egg);
        eggDiv.classList.add("egg");
        eggDiv.id = egg.id;
        //TODO
    }


            

}

