import { updatePlayerStats } from "../player.js";

export function initWoodManagement(playerData, resourcesData, buildingsData) {
  resourcesData.forEach(resource => {
      setupResourceButton(resource, playerData, buildingsData);
  });

  // Démarre la vérification périodique
  periodicCheck(playerData, resourcesData,buildingsData);
}

function setupResourceButton(resource, playerData, buildingsData) {
  const resourceName = resource.name.toLowerCase();
  const resourceButton = document.getElementById(`${resourceName}-button`);
  const unlockButton = document.getElementById(`${resourceName}-unlock-button`);
  const upgradeButtonLumberJack = document.getElementById(`Lumberjack-${resourceName}-upgrade-button`);

  if (resourceButton) {
    resourceButton.addEventListener('click', () => handleResourceClick(resource, playerData, buildingsData));
} else {
    console.error(`Button for ${resourceName} not found.`);
}

// Ajout d'un écouteur d'événements pour le bouton d'amélioration
if (upgradeButtonLumberJack) {
  upgradeButtonLumberJack.addEventListener('click', () => UpgradeLumberjack(playerData, buildingsData, resource));
} else {
    console.error(`Upgrade button for ${resourceName} not found.`);
} 
}

function handleResourceClick(resource, playerData, buildingsData) {
  const currentTime = Date.now();
  const lastHarvestTime = playerData.lastHarvestTime[resource.name] || 0;
  const elapsedTime = (currentTime - lastHarvestTime) / 1000;

  if (elapsedTime >= resource.harvestTime) {
      incrementResource(resource, playerData, buildingsData);
      updateResourceDisplay(resource.name, playerData);
      startTimer(resource, playerData, buildingsData);
  } else {
      const waitTime = resource.harvestTime - elapsedTime;
      console.log(`Attendez ${waitTime.toFixed(1)} secondes avant de récolter à nouveau.`);
  }
}

function periodicCheck(playerData, resourcesData,buildingsData) {
  setInterval(() => {
      resourcesData.forEach(resource => {
          if (shouldUnlockResource(playerData, resource)) {
              unlockNextResource(playerData, resource);
          }
          //si le joueur possede le lumberjack niveau dans le type de ressource alors le timer pour miner la ressource est declenché a chaque fois que le harvestTime est atteint
          //playerData.woodUpgradeData.res
          let resources = resource.name;
          if ( playerData.woodUpgrade[resource.name]["LumberJack"] > 0){
            const currentTime = Date.now();
            const lastHarvestTime = playerData.lastHarvestTime[resource.name] || 0;
            const elapsedTime = (currentTime - lastHarvestTime) / 1000;
          
            if ((elapsedTime >= resource.harvestTime) && (playerData.IsUnlockresources[resource.name] == true)) {
              incrementResource(resource, playerData, buildingsData);
              updateResourceDisplay(resource.name, playerData);
              incrementWoodcuttingLevel(playerData);
              updateWoodcuttingXpBar(playerData);
              updatePlayerStats(playerData);
              startTimer(resource, playerData, buildingsData);
            }
          }
      });

      incrementWoodcuttingLevel(playerData);
      updateWoodcuttingXpBar(playerData);
      updatePlayerStats(playerData);
  }, 50);
}

function shouldUnlockResource(playerData, resource) {
  const currentResourceCount = playerData.inventory[resource.name] || 0;
  return currentResourceCount >= 100 && resource.next;
}

function unlockNextResource(playerData, resource) {
  let nextResourceName = resource.next.toLowerCase();
  const resourceButton = document.getElementById(`${nextResourceName}-button`);
  const unlockButton = document.getElementById(`${nextResourceName}-unlock-button`);
  //on met la premeir lettre en majuscule pour que le nom de la ressource soit reconnu
  nextResourceName = nextResourceName.charAt(0).toUpperCase() + nextResourceName.slice(1);


  playerData.IsUnlockresources[nextResourceName] = true;


  if (resourceButton && unlockButton) {
      unlockButton.style.display = 'none';
      //faire apparaitre le bouton de récolte
      resourceButton.style.display = 'inline-block';
  }
}

function incrementResource(resource, playerData, buildingsData) {
  const resourceName = resource.name;
  playerData.inventory[resourceName] = (playerData.inventory[resourceName] || 0) + playerData.skills.woodcutting;
  
  let xpGain = resource.hardness * 0.1 * playerData.skills.woodcutting;
  let goldGain = resource.value * playerData.skills.woodcutting   +  (playerData.woodUpgrade[resource.name].LumberJack * buildingsData.buildings.find(building => building.name === "LumberJack").woodPerHit);
  playerData.SkillsXp["woodcuttingXp"] = (playerData.SkillsXp["woodcuttingXp"] || 0) + xpGain;
  playerData.stats["gold"] = (playerData.stats["gold"] || 0) + goldGain;
  playerData.inventory["Wood"] = (playerData.inventory["Wood"] || 0) + playerData.skills.woodcutting;


  console.log(`Le joueur a maintenant ${playerData.inventory[resourceName]} ${resourceName}`);
}

function incrementWoodcuttingLevel(playerData) {
  let currentLevel = playerData.skills.woodcutting;
  let currentXp = playerData.SkillsXp["woodcuttingXp"];
  let xpForNextLevel = 30 * Math.pow(currentLevel, 1.5);

  if (currentXp >= xpForNextLevel) {
      playerData.skills.woodcutting += 1;
      console.log(`Le joueur a atteint le niveau ${playerData.skills.woodcutting} en woodcutting`);
  } else {
      let xpNeeded = xpForNextLevel - currentXp;
      console.log(`Le joueur a besoin de ${xpNeeded} XP supplémentaires pour atteindre le niveau ${currentLevel + 1} en woodcutting`);
  }
}

function updateWoodcuttingXpBar(playerData) {
  const woodcuttingXp = playerData.SkillsXp["woodcuttingXp"];
  const progressElement = document.getElementById('wood-xp-progress');
  
  if (progressElement) {
    const currentLevel = playerData.skills.woodcutting;
    const xpForNextLevel = 30 * Math.pow(currentLevel, 1.5);
    const xpForBeforeLevel = 30 * Math.pow(currentLevel - 1, 1.5);
    const xpNeeded = xpForNextLevel - woodcuttingXp;
    const progressPercent = ((woodcuttingXp - xpForBeforeLevel) / (xpForNextLevel - xpForBeforeLevel)) * 100;
    
    progressElement.style.width = `${progressPercent.toFixed(2)}%`;
    progressElement.textContent = `XP: ${(woodcuttingXp - xpForBeforeLevel).toFixed(2)} / ${(xpForNextLevel - xpForBeforeLevel).toFixed(2)} (${xpNeeded.toFixed(2)} restant)`;
  } else {
    console.error('Element woodcutting-xp-progress non trouvé');
  }
}

function updateResourceDisplay(resourceName, playerData) {
  const resourceAmount = playerData.inventory[resourceName] || 0;
  const displayElement = document.getElementById(`${resourceName.toLowerCase()}-amount`);
  if (displayElement) {
      displayElement.textContent = resourceAmount;
  }
}

function startTimer(resource, playerData, buildingsData) {
  playerData.lastHarvestTime[resource.name] = Date.now();
  let timerInterval = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = (currentTime - playerData.lastHarvestTime[resource.name]) / 1000; // Toujours en secondes
      const remainingTime = Math.max((resource.harvestTime / buildingsData.buildings.find(building => building.name === "LumberJack").speed)- elapsedTime, 0);

      if (remainingTime <= 0) {
          clearInterval(timerInterval);
      } else {
          const progressPercent = (1 - remainingTime / resource.harvestTime) * 100;
          const progressElement = document.getElementById(`${resource.name.toLowerCase()}-timer-progress`);
          if (progressElement) {
              progressElement.style.width = progressPercent + '%';
          }
          
      }
  }, 50); // Mise à jour toutes les 100 millisecondes
  updatePlayerStats(playerData);
}




// Place for the Upgrade Menu
//le but de ccette endroit est de gerer l'amelioration des ressources
function UpgradeLumberjack(playerData, buildingsData, resource) {
  // Récupérer le niveau actuel d'amélioration pour le bûcheron du type de bois spécifié
  let currentLevel = playerData.woodUpgrade[resource.name].LumberJack || 0;

  // Calculer le coût de l'amélioration
    //buildingsData.find is not a function
  let cost = buildingsData.buildings.find(building => building.name === "LumberJack").GoldCost * Math.pow(2, currentLevel);
    
  // Vérifier si le joueur a assez d'or pour l'amélioration
  if (playerData.stats["gold"] >= cost) {
      // Déduire le coût et augmenter le niveau d'amélioration
      playerData.stats["gold"] -= cost;
      playerData.woodUpgrade[resource.name].LumberJack = currentLevel + 1;
      //afficher sur le fichier html les nouveaux prix et le niveau
      let resourceNameLower = resource.name.toLowerCase();

      let resourcelvlId = `Lumberjack-${resourceNameLower}-level`;
      
      let resourcecostId = `Lumberjack-${resourceNameLower}-cost`;
  
      let resourcelvl = document.getElementById(resourcelvlId);
      let resourcecost = document.getElementById(resourcecostId);
  
      if (resourcelvl && resourcecost) {
          resourcelvl.textContent = `Niveau: ${currentLevel + 1}`;
          resourcecost.textContent = `Coût: ${cost}`;
      } else {
          console.error("Élément HTML non trouvé pour", resourcelvlId, "ou", resourcecostId);
      }

      } else {
      // Gérer le cas où le joueur n'a pas assez d'or (afficher un message, etc.)
      console.log("Pas assez d'or pour cette amélioration !");
  }

  // Mettre à jour les statistiques du joueur (cette fonction doit être définie ailleurs dans votre code)
  updatePlayerStats(playerData);
}
