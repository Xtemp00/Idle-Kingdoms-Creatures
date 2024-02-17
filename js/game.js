import { initWoodManagement } from './work/wood_management.js';
import { updatePlayerStats } from './player.js';
import { initMineManagement } from './work/mine_management.js';

let buildingsData, resourcesData, playerData, resourcesDataMines;

async function loadGameData() {
    try {
        const buildingsResponse = await fetch('../data/woodbuild.json');
        buildingsData = await buildingsResponse.json();

        const resourcesResponse = await fetch('../data/ressources.json');
        const resourcesRawData = await resourcesResponse.json();
        resourcesData = resourcesRawData.woods; // Accédez à la clé "woods" du JSON
        resourcesDataMines = resourcesRawData.MineOre; // Accédez à la clé "mines" du JSON

        const playerResponse = await fetch('../data/player.json');
        playerData = await playerResponse.json();

        console.log('Données du jeu chargées:', buildingsData, resourcesData, playerData);

        initWoodManagement(playerData,resourcesData,buildingsData);
        initMineManagement(playerData,resourcesDataMines,buildingsData);

        
    } catch (error) {
        console.error('Erreur lors du chargement des données du jeu:', error);
    }

}

export function initGame() {
    loadGameData();
}







