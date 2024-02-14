//a chaque instant on actualise les statistiques du joueur
//on va chercher les données du joueur PlayerDate dans le fichier player.js

export function updatePlayerStats(playerData) {
    //l'argent, le niveau etc

    const gold = playerData.stats["gold"];
    const level = playerData.stats["level"];
    const totalwood = playerData.inventory["Wood"];
    
    //on les affiche
    document.getElementById('player-gold').textContent = gold;
    document.getElementById('player-level').textContent = level;
    document.getElementById('player-wood').textContent = totalwood;


}

//on appelle la fonction pour actualiser les statistiques du joueur toute les 50ms
