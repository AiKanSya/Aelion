# 🌸 ODATA SERVICE

## 🧩 DEFINITION

Un `OData Service` est un service web qui permet aux applications de communiquer avec SAP en utilisant le protocole oData.  
Il définit ce que l’on peut faire avec les données : lire, créer, modifier ou supprimer des informations dans SAP.

> [!TIP]
> Imagine un `OData Service` comme un menu dans un restaurant : il te dit exactement ce que tu peux commander et comment.

## 🧩 UTILITE

Il permet aux applications `Fiori/UI5` de récupérer ou envoyer des données dans SAP de manière standard et sécurisée.  
Chaque service est associé à un ensemble de données précises (ex : commandes, clients, articles).

> [!TIP]
> Comme un serveur qui connaît le menu et peut te servir exactement ce que tu demandes, sans se tromper.

## 🧩 POINTS IMPORTANTS

- Un `OData Service` est souvent créé avec SEGW (Service Builder) dans SAP.
- Il utilise des verbes REST : GET (lire), POST (créer), PUT (modifier), DELETE (supprimer).
- Les données sont envoyées et reçues en JSON ou XML, formats faciles pour les applications web.

> [!TIP]
> Pense au service comme un pont entre SAP et ton application : il garantit que les données circulent correctement et de manière sécurisée.
