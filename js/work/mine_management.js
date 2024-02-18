//mine-management.js
import { updatePlayerStats } from "../player.js";
/*Gameplan
* 1. Load the mine data
* 2. Differentiate between the different types of mines
* 3. It's different from the wood management 
* 4. The player can upgrade the mine
* 5. It's a grid 10*10 player can mine 1 square at a time and discover the resources
* 6. The player can upgrade the mine to get more resources
* 7. The upgrade can a the beginning mine random and a the end the upgrade can mine 2*2 or 3*3 etc
* 8. resources are automatically added to the player's inventory and sell for gold
* 9. all the resources are :
        "copperOre": 0,
        "ironOre": 0,
        "silverOre": 0,
        "goldOre": 0,
        "mithrilOre": 0,
        "diamondOre": 0,
        "emeraldOre": 0,
        "puregoldOre": 0,
        "puremithrilOre": 0,
        "pureemeraldOre": 0,
        "purediamondOre": 0,
        "DivineOre": 0
* 10. Square can be empty or contain a resource
* 11. All resources is available in the mine and the player can mine it 
* 12. Every resources has different value and probability to be found
* 13. The mine is like stage 1, stage 2, stage 3 etc and more the stage is high more the resources are valuable
*/

// mine-management.js

export function initMineManagement(playerData, resourcesData, buildingsData) {
    console.log('Initialisation de la gestion de la mine');
    // Charger et initialiser les données de la mine
    const mineData = loadMineData();

    // Créer et afficher la grille de mine
    createMineGrid(playerData, resourcesData, buildingsData);




    // Mettre à jour les statistiques du joueur
    updatePlayerStats(playerData);
}

function createMineGrid(playerData, resourcesData, buildingsData) {
    const gridContainer = document.getElementById("mine-grid");
    gridContainer.innerHTML = ''; // Nettoyer la grille existante

    for (let i = 0; i < 10; i++) {
        const row = document.createElement("div");
        row.className = "mine-row";

        for (let j = 0; j < 10; j++) {
            const cell = document.createElement("button");
            cell.className = "mine-cell";
            cell.onclick = function() { handleMineCellClick(i, j, playerData, resourcesData, buildingsData); };

            row.appendChild(cell);
        }

        gridContainer.appendChild(row);
    }
}

function handleMineCellClick(x, y, playerData, resourcesData, buildingsData) {
    console.log('Clic sur la cellule de la mine', x, y);

    // Vérifiez si la cellule a déjà été minée
    if (cellIsAlreadyMined(x, y, playerData)) {
        console.log("Cette cellule a déjà été minée.");
        return;
    }

    // Déterminer la ressource trouvée
    let foundResource = determineResourceFound(resourcesData);

    // Ajouter la ressource à l'inventaire du joueur si elle est trouvée
    if (foundResource) {
        console.log("Ressource trouvée:", foundResource.name);
        playerData.inventory[foundResource.name] = (playerData.inventory[foundResource.name] || 0) + 1;
        playerData.gold += foundResource.value; // Ajouter la valeur de la ressource à l'or du joueur
        playerData.inventory["Mine"] = (playerData.inventory["Mine"] || 0) + 1;
        // Mettre à jour l'interface utilisateur
        updateUIWithFoundResource(foundResource, playerData);
    } else {
        console.log("Pas de ressource trouvée dans cette cellule.");
    }

    // Marquer la cellule comme minée
    markCellAsMined(x, y, playerData);

    // Mettre à jour les statistiques du joueur
    updatePlayerStats(playerData);
}

function cellIsAlreadyMined(x, y, playerData) {
    // Vérifier si l'attribut minedCells existe dans playerData
    if (!playerData.minedCells) {
        // Si non, initialiser minedCells comme un tableau de 10x10 avec toutes les valeurs à false
        playerData.minedCells = Array(10).fill().map(() => Array(10).fill(false));
    }

    // Retourner l'état de la cellule (minée ou non)
    return playerData.minedCells[x][y];
}

function markCellAsMined(x, y, playerData) {
    // Marquer la cellule comme minée
    playerData.minedCells[x][y] = true;
    //ajouter une class html nommé mined pour marquer la cellule comme minée
    document.querySelector(`.mine-row:nth-child(${x + 1}) .mine-cell:nth-child(${y + 1})`).classList.add('mined');
}

function determineResourceFound(mineOreData) {
    let totalProbability = 0;
    mineOreData.forEach(ore => totalProbability += ore.probability);
    
    let random = Math.random() * totalProbability;
    let cumulativeProbability = 0;
    
    for (let ore of mineOreData) {
        cumulativeProbability += ore.probability;
        if (random <= cumulativeProbability) {
            return ore;
        }
    }
    
    return null; // Dans le cas où aucune ressource n'est trouvée
}

function updateUIWithFoundResource(resource, playerData) {
    // Afficher un message indiquant la ressource trouvée
    const messageArea = document.getElementById('mine-message-area');
    if (messageArea) {
        messageArea.textContent = `Vous avez trouvé ${resource.name}!`;
    }

    // Mettre à jour l'affichage de l'inventaire pour la ressource trouvée
    const resourceInventoryDisplay = document.getElementById(`${resource.name}-inventory`);
    if (resourceInventoryDisplay) {
        resourceInventoryDisplay.textContent = playerData.inventory[resource.name];
    }

    // Ajouter toute animation ou effet visuel supplémentaire si nécessaire
    // Par exemple, faire clignoter la cellule de la grille de la mine où la ressource a été trouvée
    // ou afficher une animation de particules pour indiquer la découverte de la ressource

}



function loadMineData() {
    // Charger les données de la mine depuis le serveur

}

// Ajoutez d'autres fonctions nécessaires pour la gestion de la mine





