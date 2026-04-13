# Talent Management System - Frontend

## Description

Ce projet est une application frontend Angular développée pour la gestion des talents dans une entreprise. Elle permet de gérer les processus de recrutement, de formation, d'évaluation des candidats et employés, ainsi que d'autres fonctionnalités liées à la gestion des ressources humaines. L'application utilise le template NobleUI pour une interface utilisateur moderne et responsive.

Le système est conçu pour les administrateurs RH afin de faciliter la gestion des candidats, des recrutements, des formations, des évaluations, et plus encore. Il intègre des services backend pour la persistance des données et utilise Angular Material, PrimeNG, et d'autres bibliothèques pour une expérience utilisateur enrichie.

## Fonctionnalités

- **Authentification et Autorisation** : Système de connexion sécurisé avec garde d'authentification.
- **Gestion des Recrutements** : Création, mise à jour, suppression et suivi des processus de recrutement.
- **Gestion des Candidats** : Gestion complète des profils des candidats, y compris les candidatures, compétences, et statuts.
- **Gestion des Formations** : Organisation des sessions de formation, inscriptions, présences, et évaluations.
- **Évaluations et Résultats** : Système d'évaluation des candidats et employés, avec génération de rapports.
- **Gestion des Employés et Formateurs** : Profils des employés, formateurs, et leurs rôles.
- **Modules et Sessions** : Gestion des modules de formation et des sessions associées.
- **Rapports et Analyses** : Intégration de graphiques et tableaux pour analyser les données (utilisant ApexCharts, Chart.js).
- **Interface Utilisateur** : Interface responsive avec support RTL, animations, et composants avancés (calendrier, tableaux, formulaires).
- **Utilitaires** : Pipes personnalisés, spinner de chargement, alertes, et helpers.

## Technologies Utilisées

- **Framework** : Angular 14
- **UI Library** : NobleUI, Angular Material, PrimeNG, Bootstrap 5
- **Graphiques** : ApexCharts, Chart.js, ng2-charts
- **Calendrier** : FullCalendar
- **Formulaires** : Reactive Forms, ng-select, ngx-mask
- **Autres** : Feather Icons, SweetAlert2, ngx-datatable, etc.
- **Backend Integration** : HttpClient pour les appels API REST

## Installation

### Prérequis

- Node.js (version 14 ou supérieure)
- npm ou yarn
- Angular CLI (`npm install -g @angular/cli`)

### Étapes d'Installation

1. Clonez le repository :
   ```
   git clone https://gitlab.com/babacardiop1998/projet-groupe-3-angular.git
   cd projet-groupe-3-angular
   ```

2. Installez les dépendances :
   ```
   npm install
   ```

3. Configurez l'environnement :
   - Modifiez `src/environments/environment.ts` pour pointer vers votre API backend.

4. Lancez l'application en mode développement :
   ```
   npm start
   ```
   L'application sera accessible sur `http://localhost:4200`.

5. Pour la production :
   ```
   npm run build
   ```
   Les fichiers de build seront dans le dossier `dist`.

## Usage

- Accédez à l'application via le navigateur.
- Connectez-vous avec vos identifiants administrateur.
- Naviguez dans les sections "Gestion Recrutement" et "Gestion Formation" pour gérer les entités respectives.
- Utilisez les formulaires pour ajouter/modifier des données, et les tableaux pour visualiser et filtrer les informations.

## Structure du Projet

- `src/app/core/` : Guards, directives, données dummy.
- `src/app/services/` : Services pour l'interaction avec le backend (candidat, recrutement, formation, etc.).
- `src/app/views/` : Composants de vues, y compris layout, pages d'auth, gestion.
- `src/app/util/` : Pipes, spinner, helpers, constantes.
- `src/assets/` : Images, styles SCSS, polices.

## Scripts Disponibles

- `npm start` : Lance le serveur de développement.
- `npm run build` : Construit l'application pour la production.
- `npm test` : Exécute les tests unitaires.
- `npm run rtl` : Génère les styles RTL.

## Contribution

Les contributions sont les bienvenues. Veuillez suivre les étapes suivantes :

1. Forkez le repository.
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/nouvelle-fonction`).
3. Commitez vos changements (`git commit -am 'Ajoute nouvelle fonctionnalité'`).
4. Poussez vers la branche (`git push origin feature/nouvelle-fonction`).
5. Ouvrez une Pull Request.

## Auteurs

- Équipe Groupe 3 : 
   - Ahmed Combo Rachad
   - Babacar Diop
   - Emillie
   - Marie Sar

## Licence

Ce projet est sous licence [MIT](LICENSE).

## Statut du Projet

En développement actif. Pour toute question ou suggestion, contactez l'équipe via les issues GitLab.
