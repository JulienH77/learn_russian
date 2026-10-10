# Lingo · aventure russe & chinois · V7

Application en français, sans compilation ni dépendance à charger pour fonctionner. Ouvrir `index.html` avec un serveur HTTP ou utiliser GitHub Pages.

## Apprentissage

- **Russe prioritaire** : 68 étapes courtes dans 10 mondes thématiques, du premier bonjour aux conversations, avec un monde bonus pour échanger à deux.
- **Mandarin débutant** : 15 étapes dans 3 mondes, caractères simplifiés, pinyin avec tons, règles et exercices expliqués en français.
- Une règle courte, 2 à 4 mots par étape, puis reconnaissance, traduction inverse, paires à associer, mots/phrases à reconstruire et rappel sans aide. Clavier cyrillique intégré ; clavier de voyelles accentuées pour le pinyin.
- Bilan à 80 % sur les premières réponses sans indice. Les erreurs reviennent une fois dans la séance, sans gonfler le score. Une fiche consultée ne valide pas la leçon.
- Révisions à 1, 3, 7, 14 et 30 jours selon les réussites ; retour après 10 minutes en cas d’erreur. Intervalles simples, sans estimation personnalisée de mémoire.
- Calendrier réel des réponses et bilans, séparé par langue. Aucun résultat fictif au démarrage.
- Audio par SpeechSynthesis, uniquement avec une voix russe ou mandarin adaptée. Aucune notation de la prononciation ou de l’écriture manuscrite. Une question audio peut être passée sans pénalité si la voix échoue.
- Les traductions et le pinyin attendent les modèles enseignés. Le russe accepte les différences de casse, les accents toniques facultatifs et ё/е. Les tons du pinyin restent obligatoires ; ses espaces sont facultatifs.

Principes inspirés du rappel actif et de la pratique espacée : https://www.learningscientists.org/faq et https://blog.duolingo.com/spaced-repetition-for-learning/. Contenus et interface originaux, sans affiliation. Ce parcours d’introduction ne certifie aucun niveau CECRL ou HSK.

## Un JSON pour tous les appareils

Le fichier `progress/julien.json`, branche `main` du dépôt public `JulienH77/learn_russian`, contient les événements des deux langues. Il est lu à l’ouverture, avec contournement du cache HTTP. Les résultats ne sont jamais persistés dans localStorage, sessionStorage, IndexedDB ou un service worker.

Pour enregistrer automatiquement, ouvrir **Sauvegarde & réglages** et suivre les trois étapes : créer un jeton GitHub fine-grained, sélectionner uniquement `learn_russian`, autoriser **Contents: Read and write**, puis le coller dans le site. Aucun jeton ne doit être placé dans le dépôt ou dans le JSON. Il est transmis uniquement à l’API GitHub.

Par défaut, l’autorisation est retenue dans sessionStorage jusqu’à la fermeture de l’onglet. La case facultative « Mémoriser » utilise localStorage pour l’autorisation seulement. Sur un nouvel appareil, la lecture fonctionne sans connexion ; il faut fournir une autorisation pour enregistrer de nouvelles séances. Le dépôt public rend les dates et résultats publics.

Les réponses en cours sont en mémoire vive jusqu’à l’envoi : attendre **Enregistré dans GitHub** avant de fermer. L’enregistrement est regroupé après 8 secondes sans nouvelle réponse et lancé à la fin d’une séance. Une alerte protège la fermeture avec des réponses en attente. En cas d’échec, garder l’onglet ouvert ou exporter le JSON. L’export/import permet aussi un transfert manuel sans jeton.

La synchronisation lit le dernier fichier, fusionne les identifiants d’événements et utilise son SHA pour écrire. En cas de conflit, elle relit et réessaie, au maximum trois fois. Les réponses arrivées pendant l’envoi restent en attente. Les JSON invalides ne sont jamais remplacés. Les exports de schéma 1 sont importables ; les anciens événements sans langue sont considérés comme russes. Aucun ancien stockage externe n’est interrogé.

## Fichiers

`index.html`, `style.css`, `game.css`, `app.js`, `learn-core.js`, `game-core.js`, `courses.js`, `game-courses.js`, `curriculum.js` et `core.js` (translittération russe) sont nécessaires. Le fichier de progression est conservé séparément des sources.

## Vérification

- `node tests/core.test.cjs` : 83 étapes, questions, unicité, tons, langues séparées, ancien JSON, révisions.
- `node tests/dom.test.cjs` (jsdom requis) : séances complètes russe/chinois, erreurs, indices, clavier, calendrier, deux appareils, conflits GitHub, réponses pendant l’envoi et JSON invalide.
- `node tests/browser.test.cjs` (Playwright et Chromium requis) : vérification visuelle et débordements sur mobile. Le navigateur Chromium n’a pas pu être téléchargé dans l’environnement de création ; cette suite n’y a donc pas été exécutée.

Les deux premières suites passent. La voix réelle et l’écriture avec le jeton de l’utilisateur doivent être vérifiées sur son appareil ; aucun jeton utilisateur n’est inclus ou nécessaire aux tests simulés.

Contrôle manuel du site publié : accueil, carte de russe et passage au parcours mandarin vérifiés dans le navigateur. Le JSON public se charge correctement.

## Version ludique

Chemin de niveaux, mascotte vectorielle originale, mondes colorés, quêtes quotidiennes et XP calculés depuis les événements réels. 10 XP par bonne réponse sans aide hors reprise ; 30 XP au premier succès de chaque niveau. Les bilans se fondent sur le premier essai et les paires erronées font reprendre le jeu. Aucun classement fictif, aucune vie payante.

Les identifiants de mots sont conservés. Les nouvelles étapes possèdent un alias vers leur ancienne leçon : une ancienne leçon validée débloque ses nouvelles étapes. Le JSON distant ne fait pas partie des fichiers remplacés par cette mise à jour.
