export function initWoodManagement(playerData, resourcesData) {
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

  if (unlockButton) {
      unlockButton.addEventListener('click', () => unlockNextResource(playerData, resource));
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
      });

      incrementWoodcuttingLevel(playerData);
      updateWoodcuttingXpBar(playerData);
  }, 1000);
}

function shouldUnlockResource(playerData, resource) {
  const currentResourceCount = playerData.inventory[resource.name] || 0;
  return currentResourceCount >= 100 && resource.next;
}

function unlockNextResource(playerData, resource) {
  const nextResourceName = resource.next.toLowerCase();
  const resourceButton = document.getElementById(`${nextResourceName}-button`);
  const unlockButton = document.getElementById(`${nextResourceName}-unlock-button`);

  if (resourceButton && unlockButton) {
      unlockButton.style.display = 'none';
      resourceButton.style.display = 'block';
  }
}

function incrementResource(resource, playerData) {
  const resourceName = resource.name;
  playerData.inventory[resourceName] = (playerData.inventory[resourceName] || 0) + playerData.skills.woodcutting;
  
  let xpGain = resource.hardness * 0.1 * playerData.skills.woodcutting;
  playerData.SkillsXp["woodcuttingXp"] = (playerData.SkillsXp["woodcuttingXp"] || 0) + xpGain;

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
  const progressElement = document.getElementById('woodcutting-xp-progress');
  if (progressElement) {
      const progressPercent = Math.min((woodcuttingXp / 100) * 100, 100);
      progressElement.style.width = progressPercent + '%';
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
      const elapsedTime = (currentTime - playerData.lastHarvestTime[resource.name]) / 1000;
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
  }, 1000);
}
