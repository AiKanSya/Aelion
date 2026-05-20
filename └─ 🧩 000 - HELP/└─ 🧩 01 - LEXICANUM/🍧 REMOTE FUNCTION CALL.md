# 🌸 REMOTE FUNCTION CALL (RFC)

## 🧩 DEFINITION

`RFC` (Remote Function Call) est une méthode pour appeler et exécuter une fonction dans un autre système SAP ou sur un autre serveur.  
Il permet à un programme SAP d’utiliser des fonctions d’un autre système sans copier le code.

> [!TIP]
> Imagine `RFC` comme un téléphone/un Pad de prise de commande : tu contactes quelqu’un (un autre système) pour lui demander de faire quelque chose et il te répond.

## 🧩 UTILITE

`RFC` est utilisé pour échanger des données ou exécuter des fonctions à distance entre différents systèmes SAP, Front-End ou Back-End.  
Il rend la communication entre systèmes SAP rapide et sécurisée.

> [!TIP]
> Comme demander à un ami de te passer un objet dans une autre pièce : tu n’as pas besoin d’y aller toi-même.

## 🧩 POINTS IMPORTANTS

- Il existe plusieurs types de RFC :
  - Synchronous RFC (sRFC) : le programme attend la réponse.
  - Asynchronous RFC (aRFC) : le programme continue et récupère la réponse plus tard.
  - Transactional RFC (tRFC) : assure que la fonction est exécutée exactement une fois, même en cas de problème.
- Utilisé dans Fiori/UI5 pour récupérer ou envoyer des données via SAP Backend.

> [!TIP]
> Pense au `RFC` comme une conversation téléphonique ou un message à distance : tu peux attendre la réponse ou continuer ton travail pendant que l’autre système traite la demande.
