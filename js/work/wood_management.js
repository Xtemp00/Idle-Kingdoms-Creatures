import { updatePlayerStats } from "../player.js";

export function initWoodManagement(playerData, resourcesData, buildingsData) {
  resourcesData.forEach(resource => {
      setupResourceButton(resource, playerData);
  });

  // Démarre la vérification périodique
  periodicCheck(playerData, resourcesData);
}

function setupResourceButton(resource, playerData) {
  const resourceName = resource.name.toLowerCase();
  const resourceButton = document.getElementById(`${resourceName}-button`);
  const unlockButton = document.getElementById(`${resourceName}-unlock-button`);

  if (resourceButton) {
      resourceButton.addEventListener('click', () => handleResourceClick(resource, playerData));
  } else {
      console.error(`Button for ${resourceName} not found.`);
  }
}

function handleResourceClick(resource, playerData) {
  const currentTime = Date.now();
  const lastHarvestTime = playerData.lastHarvestTime[resource.name] || 0;
  const elapsedTime = (currentTime - lastHarvestTime) / 1000;

  if (elapsedTime >= resource.harvestTime) {
      incrementResource(resource, playerData);
      updateResourceDisplay(resource.name, playerData);
      startTimer(resource, playerData);
  } else {
      const waitTime = resource.harvestTime - elapsedTime;
      console.log(`Attendez ${waitTime.toFixed(1)} secondes avant de récolter à nouveau.`);
  }
}

function periodicCheck(playerData, resourcesData) {
  setInterval(() => {
      resourcesData.forEach(resource => {
          if (shouldUnlockResource(playerData, resource)) {
              unlockNextResource(playerData, resource);
          }
          //si le joueur possede le lumberjack niveau dans le type de ressource alors le timer pour miner la ressource est declenché a chaque fois que le harvestTime est atteint
          //playerData.woodUpgradeData.res
          let resources = resource.name;
          console.log(playerData.woodUpgrade[resources]["LumberJack"]);
          if ( playerData.woodUpgrade[resources]["LumberJack"] > 0){
            const currentTime = Date.now();
            const lastHarvestTime = playerData.lastHarvestTime[resource.name] || 0;
            const elapsedTime = (currentTime - lastHarvestTime) / 1000;
          
            if ((elapsedTime >= resource.harvestTime) && (playerData.IsUnlockresources[resources] == true)) {
              incrementResource(resource, playerData);
              updateResourceDisplay(resource.name, playerData);
              incrementWoodcuttingLevel(playerData);
              updateWoodcuttingXpBar(playerData);
              updatePlayerStats(playerData);
              startTimer(resource, playerData);
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
  const nextResourceName = resource.next.toLowerCase();
  const resourceButton = document.getElementById(`${nextResourceName}-button`);
  const unlockButton = document.getElementById(`${nextResourceName}-unlock-button`);
  playerData.IsUnlockresources[nextResourceName] = true;

  if (resourceButton && unlockButton) {
      unlockButton.style.display = 'none';
      //faire apparaitre le bouton de récolte
      resourceButton.style.display = 'inline-block';
  }
}

function incrementResource(resource, playerData) {
  const resourceName = resource.name;
  playerData.inventory[resourceName] = (playerData.inventory[resourceName] || 0) + playerData.skills.woodcutting;
  
  let xpGain = resource.hardness * 0.1 * playerData.skills.woodcutting;
  let goldGain = resource.value * playerData.skills.woodcutting;
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

function startTimer(resource, playerData) {
  playerData.lastHarvestTime[resource.name] = Date.now();
  let timerInterval = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = (currentTime - playerData.lastHarvestTime[resource.name]) / 1000; // Toujours en secondes
      const remainingTime = Math.max(resource.harvestTime - elapsedTime, 0);

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
  let cost = buildingsData[resource.name].upgradeCost * Math.pow(1.1, currentLevel);

  // Vérifier si le joueur a assez d'or pour l'amélioration
  if (playerData.stats["gold"] >= cost) {
      // Déduire le coût et augmenter le niveau d'amélioration
      playerData.stats["gold"] -= cost;
      playerData.woodUpgrade[resource.name].LumberJack = currentLevel + 1;
  } else {
      // Gérer le cas où le joueur n'a pas assez d'or (afficher un message, etc.)
      console.log("Pas assez d'or pour cette amélioration !");
  }

  // Mettre à jour les statistiques du joueur (cette fonction doit être définie ailleurs dans votre code)
  updatePlayerStats(playerData);
}
