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

function incrementResource(resourceName, playerData) {
  playerData.inventory[resourceName] = (playerData.inventory[resourceName] || 0) + playerData.skills.woodcutting;
  console.log(`Le joueur a maintenant ${playerData.inventory[resourceName]} ${resourceName}`);

  if (resourceName === 'Oak') {
      //updateOakCountProgress(playerData);
      checkAndUnlockNextResource(playerData, "Birch", 100);
  }
  if(resourceName === 'Birch') {
      checkAndUnlockNextResource(playerData, "Pine", 1000);
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