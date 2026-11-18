# AGENTS.md — Consignes pour Codex

## Mission
Maintenir le jeu individuel « Code secret en couleurs » selon le document pédagogique fourni et l'annexe `code-couleurs-1.0`. Ne pas substituer des règles commerciales différentes.

## Règles faisant foi
- Palette et identifiants exacts, dans l'ordre : `rouge`, `bleu`, `vert`, `jaune`, `orange`, `violet`.
- Code secret aléatoire fixe de quatre couleurs ; répétitions possibles.
- Dix essais maximum ; chaque proposition comporte quatre couleurs ordonnées, modifiables avant validation.
- Proposition incomplète ou invalide : refus expliqué, sans consommer d'essai ni modifier l'historique.
- Compter d'abord les bien placées, puis les mal placées parmi les occurrences restantes. Chaque occurrence ne compte qu'une fois. Les indices ne désignent pas les pions.
- Quatre bien placées = victoire, y compris au dixième essai. Dix propositions valides sans victoire = défaite.
- Après la fin, aucune proposition ne modifie la partie. « Nouvelle partie » réinitialise code, essais et historique.

## Architecture
- `game.js` : logique, validation, score et état.
- `app.js` : interface et `window.CodeSecretAPI`.
- `index.html`, `style.css` : structure et présentation.
- `tests/game.test.js` : tests des règles.

## API
Le projet exige l'API commune de test 0.2. Le document de consignes ne fournit pas le schéma exact. Ne prétends pas que l'API actuelle est officiellement conforme. Dès réception du contrat, vérifier signatures, paramètres, formats de retour et accès sur l'application publiée. L'API doit piloter le même jeu que l'interface et ne jamais révéler le secret.

## Méthode
1. Lire le code avant modification.
2. Faire des changements petits et expliquer leur but.
3. Ajouter un test avant toute correction de logique.
4. Exécuter `npm test` après chaque changement.
5. Vérifier dans un navigateur : proposition incomplète, répétitions, historique, victoire, défaite, clic après fin, nouvelle partie.
6. Distinguer dans le README les éléments vérifiés, supposés et inconnus. Ne pas inventer de résultats de tests ou de déploiement.

## Contraintes
Pas de compte, paiement, classement en ligne, collecte de données personnelles, serveur applicatif, service d'IA ou clé API dans le jeu. Garder une interface responsive, utilisable au clavier et au toucher ; les couleurs doivent aussi être identifiables par leur nom. Ne publier aucun secret d'accès ni donnée personnelle.