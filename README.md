# Поехали — Russian Journey V3

Application française d’apprentissage du russe, sans dépendance externe. 30 leçons de découverte et d’entraînement de zéro aux bases A2 ; ce parcours ne certifie pas un niveau CECRL.

## Utilisation

Ouvrir `index.html` ou publier le dossier à la racine de GitHub Pages (Settings → Pages → Deploy from a branch → main / root). Les fichiers nécessaires sont `index.html`, `style.css`, `curriculum.js`, `core.js` et `app.js`. Aucune compilation.

## Sauvegarde automatique (V4)

Le site reste hébergé sur GitHub Pages. La progression est désormais enregistrée dans un service de stockage durable distinct, sans configuration GitHub ou Supabase à effectuer par l’utilisateur.

1. Dans le site, ouvrir **Sauvegarde & audio** et cliquer **Activer avec ChatGPT**.
2. Se connecter avec son compte ChatGPT dans l’onglet d’activation, puis revenir au cours.
3. La connexion est mémorisée sur cet appareil pendant 90 jours. Utiliser le même compte sur chaque appareil pour retrouver la même progression.

Seule la session de connexion est conservée dans `localStorage` ; aucune date, réponse, leçon ou progression n’y est enregistrée. Le jeton de session est délivré automatiquement par le serveur après connexion ; aucun jeton GitHub personnel n’est demandé et aucun secret de serveur n’est publié dans le dépôt.

L’activation dans un autre onglet permet à la session du cours déjà ouverte de conserver ses réponses en mémoire. Les modifications de connexion sont propagées entre onglets. À l’ouverture, les résultats sont chargés depuis le serveur. Après chaque réponse, l’envoi démarre après 2,5 secondes ; un envoi est également tenté en fin de session et au retour de la connexion Internet.

Le serveur ajoute les événements sans écraser l’historique. Les identifiants permettent d’éviter les doublons, même après une répétition de l’envoi ou sur plusieurs appareils. Chaque compte a son propre parcours ; la lecture et l’écriture de ses résultats exigent une session valide.

Attendre **Sauvegardé en ligne** avant de fermer. Hors ligne, les réponses non envoyées restent en mémoire et une alerte de fermeture rappelle qu’elles ne sont pas encore enregistrées. Utiliser l’export JSON pour emporter une copie si l’accès au service est interrompu. L’import des exports V3 reste disponible. Les éventuels anciens fichiers de progression GitHub ne sont pas supprimés.

Le service est déployé à https://poekhali-progress.osharkio.chatgpt.site. Son code et ses migrations sont versionnés séparément via Sites ; la clé de signature est configurée exclusivement comme secret d’exécution. Les réponses écrites exactes ne sont pas enregistrées, seulement leur réussite, leur thème et leur temps estimé.

## Pédagogie

- Six chapitres, 30 leçons, 33 lettres, vocabulaire et modèles propres à chaque thème.
- Découverte avec accents toniques, traduction et aide latine facultative.
- Reconnaissance, écriture avec clavier cyrillique, phrases à reconstruire, grammaire, compréhension de texte et écoute.
- Entraînement puis test à 80 %. Ouvrir une fiche ne valide jamais une leçon. Les leçons suivantes se débloquent par le résultat du test.
- Révisions après 1 / 3 / 7 / 14 / 30 jours ; erreur : retour après dix minutes. Trois réussites consécutives indiquent un mot consolidé, pas une preuve de maîtrise absolue.
- Objectif journalier : 15 réponses. Calendrier au jour local de l’appareil, détails du thème et score, compétences et temps actif estimé (temps de réponse plafonné à deux minutes par exercice).
- Accents facultatifs, ponctuation et casse tolérées, ё et е assimilés. Й reste distinct de И. Les traductions et reconstructions attendent un modèle précis ; il ne s’agit pas d’une correction intelligente de toutes les formulations naturelles.

## Audio

SpeechSynthesis avec une **vraie voix russe** détectée sur l’appareil, choix de voix et vitesse. Aucune voix étrangère n’est utilisée comme substitut. Sans voix russe, les exercices d’écoute ne sont pas inclus et cette limite est affichée. Le texte d’une question d’écoute reste masqué jusqu’à la correction. La réponse n’est permise qu’après la fin de la lecture.

L’aide latine est une translittération pédagogique cohérente, pas une transcription phonétique complète. L’oral libre, la conversation, les variantes de réponses et la prononciation doivent se travailler avec un russophone ; cette version ne note pas un enregistrement vocal.

## Vérification

`node tests/core.test.cjs` pour les fonctions de progression et de génération.

`node tests/dom.test.cjs` pour les interactions et la synchronisation en ligne simulée (jsdom requis seulement pour ces tests, par exemple via `npm install --no-save jsdom`). Ces deux suites ont été exécutées lors de la livraison.

`node tests/browser.test.cjs` fournit les scénarios de navigation et de rendu dans Chromium (Playwright requis). Cette suite n’a pas été exécutée dans le conteneur : le téléchargement du navigateur était indisponible. La lecture réelle par une voix russe et l’activation réelle avec ton compte ChatGPT restent à vérifier sur ton appareil.
