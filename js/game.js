import { initWoodManagement } from './work/wood_management.js';

let buildingsData, resourcesData, playerData;

async function loadGameData() {
    try {
        const buildingsResponse = await fetch('../data/woodbuild.json');
        buildingsData = await buildingsResponse.json();

        const resourcesResponse = await fetch('../data/ressources.json');
        const resourcesRawData = await resourcesResponse.json();
        resourcesData = resourcesRawData.woods; // Accédez à la clé "woods" du JSON

        const playerResponse = await fetch('../data/player.json');
        playerData = await playerResponse.json();

        console.log('Données du jeu chargées:', buildingsData, resourcesData, playerData);

        initWoodManagement(playerData,resourcesData);
        // Fonction qui permet d'afficher toute la section inventaire du joueur a partir du fichier json
        // de plus l'afficher sur l'id player-inventory

        /*function displayPlayerInventory() {
            const playerInventoryElement = document.getElementById('player-inventory');
            playerInventoryElement.innerHTML = JSON.stringify(playerData.inventory);
        }
        
        var playButton = document.getElementById('test-button');
        playButton.addEventListener('click', function() {
            displayPlayerInventory();
        });*/


    } catch (error) {
        console.error('Erreur lors du chargement des données du jeu:', error);
    }
}

export function initGame() {
    loadGameData();
}




