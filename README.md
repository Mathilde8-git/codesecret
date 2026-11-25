# Mastermind — Code secret en couleurs

**Version 1.0.0** · Variante pédagogique `code-couleurs-1.0`.

## Lancer le jeu
Ouvrir `index.html` dans un navigateur récent. Aucun compte, serveur applicatif ou clé API n'est nécessaire. Tests automatisés : Node.js 18+ puis `npm test`.

## Règles et source
Le jeu applique l'annexe « Règles communes » du document *Projet — Code secret en couleurs, inspiré du Mastermind*, édition 2.2 (pages 4 à 6). Le secret est une suite fixe et aléatoire de quatre couleurs parmi `rouge`, `bleu`, `vert`, `jaune`, `orange`, `violet`, répétitions possibles. Dix propositions ordonnées de quatre couleurs sont autorisées. Une proposition invalide ne consomme pas d'essai. Les indices comptent d'abord les positions exactes, puis les couleurs présentes ailleurs parmi les occurrences restantes. Une occurrence ne compte qu'une fois. La victoire est possible au dixième essai ; après dix essais valides sans victoire, la partie est perdue.

## Application installable (PWA)
Le jeu est une application web progressive (PWA) installable sur l'écran d'accueil depuis un navigateur compatible. Après un premier chargement en ligne, les fichiers essentiels sont mis en cache pour permettre de jouer hors connexion. Sur iPhone/iPad : Safari > Partager > Ajouter à l'écran d'accueil. Sur Android/ordinateur : utiliser le bouton ou menu « Installer » du navigateur, s'il est proposé.

L'icône de l'application se trouve dans `icons/` (formats SVG 192 et 512 px). Elle représente les quatre couleurs du jeu sur un fond bleu nuit, avec le nom **Mastermind**.

## Partager le jeu
Un panneau « Partager Mastermind » dans l’application affiche un QR code de l’adresse publique et propose le partage natif ou la copie du lien. Le QR code est généré via un service externe ; une connexion Internet est requise pour le faire apparaître.

## Fichiers
- `index.html` : structure de la page et métadonnées PWA.
- `manifest.webmanifest` : paramètres d'installation.
- `sw.js` : cache hors ligne.
- `icons/` : icônes de l'application (Mastermind, billes colorées, fond bleu nuit).
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
// Mode test : secret déterministe, mêmes règles et même état que l’interface
CodeSecretAPI.startTestGame(["rouge", "bleu", "vert", "jaune"]);
```
L'état contient `status` (`playing`, `won`, `lost`), `attemptsUsed`, `attemptsRemaining` et `history`. Le secret n'est pas exposé.

**Conformité API 0.2 à confirmer :** le document fourni exige le contrat commun 0.2 mais ne contient pas son schéma technique. Cette API est une première interface fonctionnelle, pas une preuve de conformité officielle. Adapter noms et formats dès réception de la spécification.

## Choix avec Codex
Le moteur est séparé de l'interface pour tester les règles sans dépendre des clics. Le score retire d'abord les occurrences exactes, puis associe les couleurs restantes ; cela évite le double comptage des répétitions. Les couleurs sont nommées et les emplacements accessibles au clavier et au toucher.

## Vérifications et limites
Les tests couvrent palette, propositions invalides, exemples de score, répétitions, victoire au dixième essai, défaite et verrouillage après la fin. Le déploiement GitHub Pages, la conformité officielle API 0.2 et les tests sur smartphone réel restent à effectuer. La PWA est implémentée (manifest, icônes et service worker) ; son installation et le mode hors ligne restent à vérifier sur navigateur et smartphone réels. Ajouter au README les preuves avant/après d'une correction, le résultat d'un essai mobile et le retour sur le jeu d'un camarade pour J2.

## Scénarios de vérification manuelle (version 1.0.0)

Les scénarios ci-dessous sont consignés avant leur exécution. Pour connaître le secret sans modifier le jeu, ils utilisent le moteur de test `createGame(codeFixe)` de `game.js` (mode déterministe).

| Cas | État de départ connu | Action | Attendu |
|---|---|---|---|
| 1 — Proposition invalide | Nouvelle partie, secret fixé à `[rouge, bleu, vert, jaune]`, 0 essai utilisé | Soumettre `[rouge, bleu]` | Refus avec `ok: false`; état toujours `playing`, 0 essai utilisé et historique vide. |
| 2 — Couleurs répétées | Nouvelle partie, secret fixé à `[rouge, rouge, bleu, vert]`, 0 essai utilisé | Soumettre `[rouge, rouge, rouge, rouge]` | Proposition acceptée ; retour `wellPlaced: 2`, `misplaced: 0` ; 1 essai dans l'historique. |
| 3 — Victoire au dernier essai puis verrouillage | Nouvelle partie, secret fixé à `[rouge, bleu, vert, jaune]`, 0 essai utilisé | Soumettre neuf fois `[violet, violet, violet, violet]`, puis le secret exact ; tenter ensuite une autre proposition | Les neuf premiers essais restent `playing`; le dixième donne `won`; la proposition suivante est refusée et l'état final ne change pas. |

### Résultats d'exécution

Exécution réalisée avec Node.js (moteur `game.js`, version du jeu **1.0.0**, branche `main`). Le secret a été fixé par `createGame(codeFixe)` ; aucun fichier du jeu n'a été modifié.

| Cas | Obtenu | Verdict / version testée |
|---|---|---|
| 1 — Proposition invalide | `ok: false`, message « La proposition doit contenir exactement quatre couleurs. » ; état `playing`, 0 essai utilisé, 10 restants, historique vide. | **Réussi** · v1.0.0 |
| 2 — Couleurs répétées | `ok: true`, essai 1, `wellPlaced: 2`, `misplaced: 0` ; historique contient une proposition, 9 essais restants. | **Réussi** · v1.0.0 |
| 3 — Victoire au dernier essai puis verrouillage | Les neuf premiers essais restent `playing`. Le dixième renvoie `won`, `attempt: 10`, 4 bien placées et 0 mal placée. Une tentative après la victoire renvoie `ok: false` (« La partie est terminée… ») ; l'état reste identique, à 10 essais utilisés. | **Réussi** · v1.0.0 |

**Bilan : 3 scénarios sur 3 réussis.** Ces vérifications ciblent le moteur `game.js` avec secret fixé ; elles ne constituent pas un test manuel de l'interface dans un navigateur.
