import { updatePlayerStats } from "../player.js";

export function initEggManagement(playerData, PetsData) {
    displayNormalEggSection(playerData, PetsData);
    displayPetInventory(playerData);
}

//fonction pour afficher la section normal egg de l'oeuf
function displayNormalEggSection(playerData, PetsData) {
    // Configuration for normal-egg-section
    let normalEggSection = document.getElementById("normal-egg-section");
    normalEggSection.style.margin = "10px";
    normalEggSection.style.padding = "10px";
    normalEggSection.style.backgroundColor = "#f8f0e3";
    normalEggSection.style.border = "1px solid #c0a080";
    normalEggSection.style.borderRadius = "10px";
    normalEggSection.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.5)";
    normalEggSection.style.textAlign = "center";
    normalEggSection.style.color = "#000";
    normalEggSection.style.width = "700px";
    normalEggSection.style.position = "absolute"; // Changed to absolute
    normalEggSection.style.left = "10px"; // Position to the left
    normalEggSection.style.top = "620px"; // Position below the egg button
    normalEggSection.style.display = "grid";
    normalEggSection.style.gridTemplateColumns = "repeat(3, 1fr)";


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
    eggButton.style.margin = "auto";    
    eggButton.style.display = "block";
    eggButton.style.marginTop = "10px";
    eggButton.style.marginBottom = "10px";
    eggButton.style.position = "relative"; // Ensure this is positioned relatively
    eggButton.style.zIndex = "2"; // Higher z-index to ensure it's above the section


    eggButton.addEventListener("click", function() {
        openNormalEgg(playerData,PetsData);
    });

    for (let i = 0; i < PetsData.NormalEgg.length; i++) {
            let pet = PetsData.NormalEgg[i];
            let petDiv = document.createElement("div");
            petDiv.className = "pet-div";
            petDiv.style.margin = "10px";
            petDiv.style.padding = "10px";
            petDiv.style.backgroundColor = "#f8f0e3";
            petDiv.style.border = "1px solid #c0a080";
            petDiv.style.borderRadius = "10px";
            petDiv.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.5)";
            petDiv.style.textAlign = "center";
            petDiv.style.color = "#000";
            petDiv.style.width = "80%";
            petDiv.style.height = "80%";
            //padding pour centrer le texte
            petDiv.style.display = "flex";
            petDiv.style.flexDirection = "column";
            petDiv.style.justifyContent = "center";
            petDiv.style.alignItems = "center";
            

            // il faut que le background de la div soit l'image
            petDiv.style.backgroundImage = "url('../../assets/images/pets/" + pet.name + ".jpg')";
            petDiv.style.backgroundSize = "cover";
            petDiv.style.backgroundPosition = "center";
            petDiv.style.backgroundRepeat = "no-repeat";
        
            let petName = document.createElement("p");
            petName.textContent = pet.name;
            petName.style.fontSize = "2em";
            petName.style.fontWeight = "bold";

            petDiv.appendChild(petName);

            let petProbability = document.createElement("p");
            petProbability.textContent = pet.probability * 100 + "%";
            // on met en gras et de maniere plus lisible
            petProbability.style.fontSize = "4em";
            petProbability.style.fontWeight = "bold";
            //on arrondit le pourcentage a 3 chiffres apres la virgule
            petProbability.textContent = (Math.round(pet.probability * 1000) / 10) + "%";
            

            petDiv.appendChild(petProbability);
            // Ajouter d'autres détails comme rarity, skills, etc.
        
            normalEggSection.appendChild(petDiv);
    }
}       

//fonction pour ouvrir l'oeuf normalfunction openNormalEgg(playerData, PetsData) {
function openNormalEgg(playerData, PetsData) {
        let totalProbability = 0;
        // Convert probability strings to numbers and sum up
        PetsData.NormalEgg.forEach(pet => totalProbability += parseFloat(pet.probability));

        //le prix de l'oeuf est de 10000
        if (playerData.stats["gold"] < 10000) {
            console.log("You don't have enough coins to buy this egg!");
            return;
        } else { 

            playerData.stats["gold"] -= 10000;
            let random = Math.random() * totalProbability;
            let cumulativeProbability = 0;
            let pet = null;
        
            for (let i = 0; i < PetsData.NormalEgg.length; i++) {
                let currentPet = PetsData.NormalEgg[i];
                cumulativeProbability += parseFloat(currentPet.probability);
                if (random <= cumulativeProbability) {
                    pet = currentPet;
                    break;
                }
            }
        
            if (pet) {
                let message = "Congratulations! You got a " + pet.name + "!";
                console.log(message);
                updatePlayerStats(playerData);
                playerData.PetInventory[pet.name] = playerData.PetInventory[pet.name] + 1 || 1; // Handle undefined pet
            } else {
                console.log("You got nothing!");
            }
        }
        
}

//fonction qui affiche les pets dans l'inventaire sur la console toute les 2 secondes
function displayPetInventory(playerData) {
    setInterval(function() {
        console.log(playerData.PetInventory);
    }, 2000);
}
