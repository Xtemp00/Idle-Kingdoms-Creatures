// menu.js
export function showMenu() {
    // on regarde si le joueur a appuyer sur le bouton play
    var playButton = document.querySelector('#play-button');
    playButton.addEventListener('click', function() {
        startGame();
    });

    // ... Autres fonctions liées au menu ...
}

export function hideMenu() {
    var menuContainer = document.getElementById('menu-container');
    if (menuContainer) {
        menuContainer.style.display = 'none'; // Cache le menu
    }
}