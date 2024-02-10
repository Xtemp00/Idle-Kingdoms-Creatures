// game.js
import { initGame } from './game.js';

export function initGame() {
    // Initialiser le jeu principal
    createGameUI();
}

function createGameUI() {
    var gameUI = document.createElement('div');
    gameUI.id = 'game-ui';
    gameUI.innerHTML = '<h1>Bienvenue dans le Jeu!</h1>';
    // Ajoutez plus d'éléments à l'UI du jeu ici

    document.body.appendChild(gameUI);
}