# Поехали — Russian Journey V3

Application française d’apprentissage du russe, sans dépendance externe. 30 leçons de découverte et d’entraînement de zéro aux bases A2 ; ce parcours ne certifie pas un niveau CECRL.

## Utilisation

Ouvrir `index.html` ou publier le dossier à la racine de GitHub Pages (Settings → Pages → Deploy from a branch → main / root). Les fichiers nécessaires sont `index.html`, `style.css`, `curriculum.js`, `core.js` et `app.js`. Aucune compilation.

## Progression sur GitHub

1. Recommandé : créer un dépôt **privé** pour les résultats (par exemple `russian-progress`), avec un README pour initialiser sa branche main. Le site lui-même peut rester public.
2. Créer un jeton personnel **fine-grained**, limité au dépôt de progression, avec **Contents : Read and write**. Choisir une date d’expiration adaptée.
3. Dans le site → **Sauvegarde & audio**, renseigner compte, dépôt, branche, `progress/julien.json`, puis le jeton. La visibilité du dépôt est contrôlée ; un dépôt public demande une confirmation explicite.
4. À la connexion, les résultats GitHub sont chargés et fusionnés avec la session actuelle. Une nouvelle réponse déclenche une sauvegarde différée de 2,5 secondes ; les résultats sont aussi envoyés en fin de session. Le bouton Synchroniser recharge également les autres appareils.
5. Attendre **Sauvegardé sur GitHub** avant de fermer. Si un envoi échoue, les résultats restent en mémoire avec un indicateur d’attente : réessayer ou exporter JSON.

Aucun `localStorage`, `sessionStorage`, IndexedDB ou cookie de progression. Le jeton et les réglages de connexion restent en mémoire : ils sont à ressaisir après rechargement. Ne jamais publier un jeton dans le code. Les résultats contiennent des identifiants d’événements, des dates, des thèmes, des réussites et des temps estimés, pas le texte des réponses. Le fichier de progression est réservé à ce schéma ; un fichier mal formé n’est pas écrasé. Des sauvegardes simultanées sont fusionnées par identifiants et retentées en cas de conflit de SHA.

Ce choix convient à un outil personnel. Pour une application multi-utilisateur, utiliser plutôt un serveur avec une GitHub App ou OAuth et des secrets côté serveur. GitHub Pages seul ne peut pas fournir ce serveur.

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

`node tests/dom.test.cjs` pour les interactions et la synchronisation GitHub simulée (jsdom requis seulement pour ces tests, par exemple via `npm install --no-save jsdom`). Ces deux suites ont été exécutées lors de la livraison.

`node tests/browser.test.cjs` fournit les scénarios de navigation et de rendu dans Chromium (Playwright requis). Cette suite n’a pas été exécutée dans le conteneur : le téléchargement du navigateur était indisponible. La lecture réelle par une voix russe et l’envoi authentifié des résultats restent à vérifier sur ton appareil après connexion.
