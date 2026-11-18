# Code secret en couleurs

**Version 1.0.0** · Variante pédagogique `code-couleurs-1.0`.

## Lancer le jeu
Ouvrir `index.html` dans un navigateur récent. Aucun compte, serveur applicatif ou clé API n'est nécessaire. Tests automatisés : Node.js 18+ puis `npm test`.

## Règles et source
Le jeu applique l'annexe « Règles communes » du document *Projet — Code secret en couleurs, inspiré du Mastermind*, édition 2.2 (pages 4 à 6). Le secret est une suite fixe et aléatoire de quatre couleurs parmi `rouge`, `bleu`, `vert`, `jaune`, `orange`, `violet`, répétitions possibles. Dix propositions ordonnées de quatre couleurs sont autorisées. Une proposition invalide ne consomme pas d'essai. Les indices comptent d'abord les positions exactes, puis les couleurs présentes ailleurs parmi les occurrences restantes. Une occurrence ne compte qu'une fois. La victoire est possible au dixième essai ; après dix essais valides sans victoire, la partie est perdue.

## Fichiers
- `index.html` : structure de la page.
- `style.css` : présentation responsive.
- `app.js` : interface et API publique.
- `game.js` : moteur, validation et calcul des indices.
- `tests/game.test.js` : tests automatisés.
- `AGENTS.md` : consignes pour Codex.

## API de test
L'application expose `window.CodeSecretAPI` :
```js
CodeSecretAPI.startGame();
CodeSecretAPI.submitGuess(["rouge", "bleu", "vert", "jaune"]);
CodeSecretAPI.getState();
```
L'état contient `status` (`playing`, `won`, `lost`), `attemptsUsed`, `attemptsRemaining` et `history`. Le secret n'est pas exposé.

**Conformité API 0.2 à confirmer :** le document fourni exige le contrat commun 0.2 mais ne contient pas son schéma technique. Cette API est une première interface fonctionnelle, pas une preuve de conformité officielle. Adapter noms et formats dès réception de la spécification.

## Choix avec Codex
Le moteur est séparé de l'interface pour tester les règles sans dépendre des clics. Le score retire d'abord les occurrences exactes, puis associe les couleurs restantes ; cela évite le double comptage des répétitions. Les couleurs sont nommées et les emplacements accessibles au clavier et au toucher.

## Vérifications et limites
Les tests couvrent palette, propositions invalides, exemples de score, répétitions, victoire au dixième essai, défaite et verrouillage après la fin. Le déploiement GitHub Pages, la conformité officielle API 0.2 et les tests sur smartphone réel restent à effectuer. La PWA est facultative et non implémentée. Ajouter au README les preuves avant/après d'une correction, le résultat d'un essai mobile et le retour sur le jeu d'un camarade pour J2.