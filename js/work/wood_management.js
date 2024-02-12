export function initWoodManagement(playerData, resourcesData) {
  resourcesData.forEach(resource => {
      setupResourceButton(resource, playerData);
  });
}

function setupResourceButton(resource, playerData, resourcesData) {
  const resourceName = resource.name;
  const buttonId = `${resourceName.toLowerCase()}-button`;
  const amountId = `${resourceName.toLowerCase()}-amount`;
  const resourceButton = document.getElementById(buttonId);
  const resourceAmountDisplay = document.getElementById(amountId);

  if (resourceButton) {
    resourceButton.addEventListener('click', function() {
        const currentTime = Date.now();
        const lastHarvestTime = playerData.lastHarvestTime[resourceName] || 0;
        const elapsedTime = (currentTime - lastHarvestTime) / 1000; // Convertir en secondes

        if (elapsedTime >= resource.harvestTime) {
            incrementResource(resourceName, playerData, resourcesData);
            updateResourceDisplay(resourceName, playerData, resourceAmountDisplay);
            startTimer(resource, playerData);
            incrementWoodcuttingLevel(playerData);
            updateWoodcuttingXpBar(playerData);
        } else {
            const waitTime = resource.harvestTime - elapsedTime;
            console.log(`Attendez ${waitTime.toFixed(1)} secondes avant de récolter à nouveau.`);
        }
    });
  } else {
    console.error(`Button ${buttonId} not found.`);
  }

  /*if (resourceName === 'Oak') {
      updateOakCountProgress(playerData);
  }*/
}

function incrementResource(resourceName, playerData, resourcesData) {
  playerData.inventory[resourceName] = (playerData.inventory[resourceName] || 0) + playerData.skills.woodcutting;
  console.log(`Le joueur a maintenant ${playerData.inventory[resourceName]} ${resourceName}`);

  /*
  "SkillsXp": {
    "woodcuttingXp": 1,
    "fishingXp": 1,
    "miningXp": 1,
    "cookingXp": 1,
    "smithingXp": 1,
    "farmingXp": 1,
    "craftingXp": 1,
    "magicXp": 1,
    "combatXp": 1
  }*/

  if (resourceName === 'Oak') {
      //updateOakCountProgress(playerData);
      checkAndUnlockNextResource(playerData, "Birch", 100);
      playerData.SkillsXp["woodcuttingXp"] = (playerData.inventory[resourceName] || 0) + resourcesData[0].harvestTime * 0.1 * playerData.skills.woodcutting;
  }
  if(resourceName === 'Birch') {
      checkAndUnlockNextResource(playerData, "Pine", 1000);
      playerData.SkillsXp["woodcuttingXp"] = (playerData.inventory[resourceName] || 0) + resourcesData[1].harvestTime * 0.1 * playerData.skills.woodcutting;
  }
  if (resourceName === 'Pine') {
      /*checkAndUnlockNextResource(playerData, "Maple", 10000);*/
      playerData.SkillsXp["woodcuttingXp"] = (playerData.inventory[resourceName] || 0) + resourcesData[2].harvestTime * 0.1 * playerData.skills.woodcutting;
  }
}

//Fonction qui fait augmenter le niveau de compétence de woodcutting
function incrementWoodcuttingLevel(playerData) {
  //Ajouter 1 au niveau de compétence de woodcutting si le joueur a assez d'expérience l'experience necessaire pour monter de niveau est de (trouver une formule qui augmente pour chaque niveau) 
  // nextlvl = 100 * (1.1 ^ lvl)
  if (playerData.SkillsXp["woodcuttingXp"] >= 100 * (1.1 ^ playerData.skills.woodcutting)) {
      playerData.skills.woodcutting += 1;
      playerData.SkillsXp["woodcuttingXp"] = 0;
  }
  console.log(`Le joueur a maintenant ${playerData.skills.woodcutting} en woodcutting`);
}

//Fonction qui fait bouger la barre d'xp de woodcutting
function updateWoodcuttingXpBar(playerData) {
  const woodcuttingXp = playerData.SkillsXp[woodcuttingXp];
  const progressElement = document.getElementById('woodcutting-xp-progress');
  if (progressElement) {
      const progressPercent = Math.min((woodcuttingXp / 100) * 100, 100);
      progressElement.style.width = progressPercent + '%';
  } else {
      console.error('Element woodcutting-xp-progress non trouvé');
  }
}

function updateResourceDisplay(resourceName, playerData, displayElement) {
  const resourceAmount = playerData.inventory[resourceName] || 0;
  displayElement.textContent = resourceAmount;
}

function startTimer(resource, playerData) {
  playerData.lastHarvestTime[resource.name] = Date.now();
  let timerInterval = setInterval(function() {
      const currentTime = Date.now();
      const elapsedTime = (currentTime - playerData.lastHarvestTime[resource.name]) / 1000;
      const remainingTime = Math.max(resource.harvestTime - elapsedTime, 0);

      if (remainingTime <= 0) {
          clearInterval(timerInterval);
      } else {
          const progressPercent = (1 - remainingTime / resource.harvestTime) * 100;
          document.getElementById(`${resource.name.toLowerCase()}-timer-progress`).style.width = progressPercent + '%';
      }
  }, 1000);
}

/*function updateOakCountProgress(playerData) {
  const oakCount = playerData.inventory['Oak'] || 0;
  const progressElement = document.getElementById('oak-count-progress');
  if (progressElement) {
      const progressPercent = Math.min((oakCount / 100) * 100, 100);
      progressElement.style.width = progressPercent + '%';
  } else {
      console.error('Element oak-count-progress non trouvé');
  }
}*/

function checkAndUnlockNextResource(playerData, nextResourceName, unlockThreshold) {
  const currentResourceCount = playerData.inventory['Oak'] || 0;
  if (currentResourceCount >= unlockThreshold) {
      const nextResourceContainer = document.getElementById(nextResourceName);
      if (nextResourceContainer) {
          nextResourceContainer.style.display = 'block';
      }
  }
}