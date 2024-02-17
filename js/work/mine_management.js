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
        "purediamondOre": 0
* 10. Square can be empty or contain a resource
* 11. All resources is available in the mine and the player can mine it 
* 12. Every resources has different value and probability to be found
*/

export function initMineManagement(playerData,resourcesData,buildingsData){
    console.log('Initialisation de la gestion de la mine');
    console.log('Données du joueur:', playerData);
    console.log('Données des ressources:', resourcesData);
    console.log('Données des batiments:', buildingsData);
    updatePlayerStats(playerData);
}





