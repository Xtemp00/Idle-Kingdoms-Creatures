// Fonction pour afficher/masquer les sections
function toggleSections(sectionToShow) {
    const citymap = document.getElementById('game-citymap');
    const woodSection = document.getElementById('game-part-wood');
    const woodXp = document.getElementById('wood-xp-progress-bar');
    //const mineSection = document.getElementById('mine-section');

    // Masquer la citymap
    citymap.style.display = 'none';

    // Masquer toutes les sections
    woodSection.style.display = 'none';
    //mineSection.style.display = 'none';

    // Afficher la section demandée
    if (sectionToShow === 'wood') {
        woodSection.style.display = 'flex';
        woodXp.style.display = 'block';
    } /*else if (sectionToShow === 'mine') {
        mineSection.style.display = 'block';
    }*/
}

// Ajouter des écouteurs d'événements aux boutons
document.getElementById('wood-button').addEventListener('click', function() {
    toggleSections('wood');
});

document.getElementById('mine-button').addEventListener('click', function() {
    toggleSections('mine');
});
