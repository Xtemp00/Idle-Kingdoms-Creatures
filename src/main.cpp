#include <iostream>
#include <string>

// Fonction pour afficher le menu principal
void afficherMenuPrincipal() {
    std::cout << "========================" << std::endl;
    std::cout << "       MENU PRINCIPAL    " << std::endl;
    std::cout << "========================" << std::endl;
    std::cout << std::endl;
    std::cout << "  [J] Jouer" << std::endl;
    std::cout << "  [Q] Quitter" << std::endl;
    std::cout << std::endl;
    std::cout << "========================" << std::endl;
}

// Fonction pour gérer la sélection du menu principal
void gererMenuPrincipal() {
    char choix;
    while (true) {
        afficherMenuPrincipal();
        std::cout << "Choisissez une option : ";
        std::cin >> choix;

        // Convertir le choix en majuscule pour la comparaison
        choix = std::toupper(choix);

        // Gérer les options du menu
        switch (choix) {
            case 'J':
                std::cout << "Lancement du jeu..." << std::endl;
                return; // Quitter la fonction et lancer le jeu
            case 'Q':
                std::cout << "Fermeture du jeu..." << std::endl;
                exit(0); // Quitter le programme
            default:
                std::cout << "Option invalide. Veuillez réessayer." << std::endl;
        }
    }
}

int main() {
    gererMenuPrincipal(); // Appeler la fonction pour gérer le menu principal
    return 0;
}
