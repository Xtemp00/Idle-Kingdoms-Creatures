// Importation des modules nécessaires
import { showMenu, hideMenu } from './menu.js';
import { startIntroduction } from './introduction.js';
import { initGame } from './game.js';

document.addEventListener('DOMContentLoaded', function() {
    showMenu();
    attachMenuListeners();
});

function attachMenuListeners() {
    var playButton = document.getElementById('play-button');
    playButton.addEventListener('click', function() {
        // Afficher game-container
        document.getElementById('game-container').style.display = 'block';

        // Cacher le menu
        hideMenu();
        startGame();
    });

    // Définissez ici la fonction startGame
    function startGame() {
        console.log("Le jeu commence !");
        // Initialisation du jeu, chargement de l'interface, etc.
        startIntroduction();
    }
}

