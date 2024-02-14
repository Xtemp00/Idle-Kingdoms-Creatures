// Fonction pour afficher/masquer les sections
function toggleSections(sectionToShow) {
    const citymap = document.getElementById('game-citymap');
    const woodSection = document.getElementById('game-part-wood');
    const woodXp = document.getElementById('wood-xp-progress-bar');
    const minimap = document.getElementById('wood-minimap');
    //const mineSection = document.getElementById('mine-section');

    // Masquer la citymap
    citymap.style.display = 'none';

    // Masquer toutes les sections
    woodSection.style.display = 'none';
    woodXp.style.display = 'none';
    //mineSection.style.display = 'none';

    // Afficher la section demandée
    if (sectionToShow === 'wood') {
        woodSection.style.display = 'grid';
        woodXp.style.display = 'flex';
        minimap.style.display = 'flex';
    } /*else if (sectionToShow === 'mine') {
        mineSection.style.display = 'block';
    }*/
    else if (sectionToShow === 'citymap') {
        citymap.style.display = 'flex';
        minimap.style.display = 'none';
    }
}

// Ajouter des écouteurs d'événements aux boutons
document.getElementById('wood-button').addEventListener('click', function() {
    toggleSections('wood');
});

document.getElementById('mine-button').addEventListener('click', function() {
    toggleSections('mine');
});

document.getElementById('minimap-button').addEventListener('click', function() {
    // Votre logique pour retourner a la city
    // Par exemple, afficher le menu ou changer de page
    toggleSections('citymap');

});


// fonction pour afficher le menu amélioration
function showOakUpgradeMenu() {
    const upgradeMenu = document.getElementById('oak-upgrade-menu');
    upgradeMenu.style.display = 'grid';
}

document.getElementById('Oak-upgrade-button').addEventListener('click', function() {
    showOakUpgradeMenu();
});

// fonction pour cacher le menu amélioration
function hideOakUpgradeMenu() {
    const upgradeMenu = document.getElementById('oak-upgrade-menu');
    upgradeMenu.style.display = 'none';
}

document.getElementById('Oak-upgrade-close-button').addEventListener('click', function() {
    hideOakUpgradeMenu();
});