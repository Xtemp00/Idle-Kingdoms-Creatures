import { updatePlayerStats } from "../player.js";

export function initEggManagement(playerData, PetsData) {
    displayNormalEggSection(playerData, PetsData);
}

//fonction pour afficher la section normal egg de l'oeuf
function displayNormalEggSection(playerData, PetsData) {
    //dans normal-egg-section du code html on va afficher les oeufs dans la box avec 3 par ligne max et on va afficher leur image et la probabilité de les obtenir mit en %.
    let normalEggSection = document.getElementById("normal-egg-section");
    /*margin: 10px;
    padding: 10px;
    background-color: #f8f0e3;
    border: 1px solid #c0a080;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    text-align: center;
    color: #000;*/
    normalEggSection.style.margin = "10px";
    normalEggSection.style.padding = "10px";
    normalEggSection.style.backgroundColor = "#f8f0e3";
    normalEggSection.style.border = "1px solid #c0a080";
    normalEggSection.style.borderRadius = "10px";
    normalEggSection.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.5)";
    normalEggSection.style.textAlign = "center";
    normalEggSection.style.color = "#000";
    normalEggSection.style.width = "60%";
    



    //le normal-egg-button est placer en plein milieu en gros et a pour background l'image de l'oeuf
    let eggButton = document.getElementById("normal-egg-button");
    eggButton.style.backgroundImage = "url('../../assets/images/Egg/NormalEgg.jpg')";
    eggButton.style.backgroundSize = "cover";
    eggButton.style.backgroundPosition = "center";
    eggButton.style.backgroundRepeat = "no-repeat";
    eggButton.style.width = "500px";
    eggButton.style.height = "500px";
    eggButton.style.border = "none";
    eggButton.style.cursor = "pointer";
    eggButton.addEventListener("click", function() {
        openNormalEggModal(playerData,PetsData);
    });

    //maintenant on va afficher les oeufs dans la box
    /* "NormalEgg" : [
        {
            "name" : "rockPet",
            "rarity" : "common",
            "skills" : "mine",
            "goldMultiplier" : "1.5",
            "xpMultiplier" : "1",
            "probability" : "0.5"
        },*/

    for (let i = 0; i < PetsData.NormalEgg.length; i++) {
            let pet = PetsData.NormalEgg[i];
            let petDiv = document.createElement("div");
            petDiv.className = "pet-div";
            /*    margin: 10px;
            padding: 10px;
            background-color: #f8f0e3;
            border: 1px solid #c0a080;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
            text-align: center;
            color: #000;*/
            petDiv.style.margin = "10px";
            petDiv.style.padding = "10px";
            petDiv.style.backgroundColor = "#f8f0e3";
            petDiv.style.border = "1px solid #c0a080";
            petDiv.style.borderRadius = "10px";
            petDiv.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.5)";
            petDiv.style.textAlign = "center";
            petDiv.style.color = "#000";

            
            let petImage = document.createElement("img");
            petImage.src = "../../assets/images/pets/" + pet.name + ".jpg";
            petImage.style.width = "20%";
            petImage.style.height = "auto"; // Pour garder le ratio de l'image
            petImage.style.border = "none";
            petImage.style.cursor = "pointer";
            petDiv.appendChild(petImage);
        
            let petName = document.createElement("p");
            petName.textContent = pet.name;
            petDiv.appendChild(petName);

            let petProbability = document.createElement("p");
            petProbability.textContent = "Probability: " + pet.probability * 100 + "%";
            petDiv.appendChild(petProbability);
            // Ajouter d'autres détails comme rarity, skills, etc.
        
            normalEggSection.appendChild(petDiv);
    }
}