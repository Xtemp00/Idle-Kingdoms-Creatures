import { updatePlayerStats } from "../player.js";

export function initEggManagement(playerData, resourcesDataEggs, eggbuildingsData) {
    displayNormalEggSection(playerData, eggbuildingsData);
}

//fonction pour afficher la section normal egg de l'oeuf
function displayNormalEggSection(playerData, eggbuildingsData) {
    const normalEggSection = document.getElementById("normal-egg-section");
    normalEggSection.style.display = "flex";
    normalEggSection.style.flexDirection = "column";
    normalEggSection.style.alignItems = "center";
    normalEggSection.style.justifyContent = "center";

    var normal = eggbuildingsData.NormalEgg;

    // Créer et styliser l'œuf normal
    var normaleggdiv = document.createElement("button");
    normaleggdiv.classList.add("egg");
    normaleggdiv.id = "normal-egg";
    normaleggdiv.style.backgroundImage = 'url("../../assets/images/egg/NormalEgg.jpg")';
    normaleggdiv.style.backgroundSize = "cover";
    normaleggdiv.style.backgroundPosition = "center";
    normaleggdiv.style.backgroundRepeat = "no-repeat";
    normaleggdiv.style.border = "2px solid black";
    normaleggdiv.style.borderRadius = "10px";
    normaleggdiv.style.width = "500px";
    normaleggdiv.style.height = "500px";
    normaleggdiv.style.marginBottom = "20px";
    normalEggSection.appendChild(normaleggdiv);

    // Créer et styliser les divs pour les animaux de compagnie
    normal.forEach(egg => {
        var eggDiv = document.createElement("div");
        eggDiv.classList.add("egg");
        eggDiv.id = egg.name;

        var name = document.createElement("p");
        name.textContent = "Name: " + egg.name;
        name.style.fontWeight = "bold"; // Style du texte
        name.style.fontSize = "1.2em"; // Taille du texte
        eggDiv.appendChild(name);

        var rarity = document.createElement("p");
        rarity.textContent = "Rarity: " + egg.rarity;
        rarity.style.fontWeight = "bold"; // Style du texte
        rarity.style.fontSize = "1.2em"; // Taille du texte
        eggDiv.appendChild(rarity);

        var skills = document.createElement("p");
        skills.textContent = "Skills: " + egg.skills;
        skills.style.fontWeight = "bold"; // Style du texte
        skills.style.fontSize = "1.2em"; // Taille du texte
        eggDiv.appendChild(skills);

        var goldMultiplier = document.createElement("p");
        goldMultiplier.textContent = "Gold Multiplier: " + egg.goldMultiplier;
        goldMultiplier.style.fontWeight = "bold"; // Style du texte
        goldMultiplier.style.fontSize = "1.2em"; // Taille du texte
        eggDiv.appendChild(goldMultiplier);

        var xpMultiplier = document.createElement("p");
        xpMultiplier.textContent = "XP Multiplier: " + egg.xpMultiplier;
        xpMultiplier.style.fontWeight = "bold"; // Style du texte
        xpMultiplier.style.fontSize = "1.2em"; // Taille du texte
        eggDiv.appendChild(xpMultiplier);

        var probability = document.createElement("p");
        probability.textContent = "Probability: " + egg.probability;
        probability.style.fontWeight = "bold"; // Style du texte
        probability.style.fontSize = "1.2em"; // Taille du texte
        eggDiv.appendChild(probability);

        eggDiv.style.backgroundImage = 'url("../../assets/images/pets/' + egg.name + '.jpg")';
        eggDiv.style.backgroundSize = "cover";
        eggDiv.style.backgroundPosition = "center";
        eggDiv.style.backgroundRepeat = "no-repeat";
        eggDiv.style.borderRadius = "10px";
        eggDiv.style.width = "300px";
        eggDiv.style.height = "500px"; // Hauteur augmentée
        eggDiv.style.display = "grid";
        eggDiv.style.gridTemplateRows = "repeat(6, 1fr)";
        eggDiv.style.margin = "10px";

        normalEggSection.appendChild(eggDiv);
    });
}


