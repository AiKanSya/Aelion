# 🌸 CLIENT (USER APPLICATION)

## 🧩 DEFINITION

Le Client est le logiciel ou l’application que l’utilisateur utilise pour accéder à SAP.  
Cela peut être : un navigateur web, une application mobile `Fiori/UI5`, ou SAP GUI sur un ordinateur.

> [!TIP]
> Imagine le `Client` comme le menu numérique sur une tablette dans un restaurant : c’est ce que le client utilise pour passer sa commande.

## 🧩 UTILITE

Le `Client` permet à l’utilisateur de visualiser et interagir avec les données SAP sans avoir besoin de connaître la complexité du système Back-End.  
Toutes les actions de l’utilisateur passent par le Front-End Server et les services SAP.

> [!TIP]
> Comme une télécommande pour une TV : elle contrôle ce qui se passe sur l’écran sans que tu aies à toucher les circuits internes.

## 🧩 POINTS IMPORTANTS

- Le `Client` envoie les requêtes à SAP via REST / OData et reçoit les réponses.
- Il dépend du Front-End Server (FES) pour accéder aux applications `Fiori/UI5`.
- Il ne contient pas les données SAP lui-même ; il est seulement l’interface pour l’utilisateur.

> [!TIP]
> Le `Client` = l’interface entre l’utilisateur et le système SAP, comme la tablette pour commander au restaurant.
