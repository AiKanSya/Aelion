# 🌸 REST (REPRESENTATIONAL STATE TRANSFERT)

## 🧩 OBJECTIVES

- [ ] Comprendre ce qu’est `REST`
- [ ] Savoir pourquoi `REST` est utilisé dans `OData` et `Gateway`

## 🧩 DEFINITION

> [!IMPORTANT]
> Le `REST` est une manière simple et standardisée pour deux systèmes de communiquer via `HTTP`.
> On utilise `REST` pour créer des services simples, rapides et compatibles avec tout (applications web, mobiles, SAP, etc.).  
> L'`OData` est bâti sur `REST`, donc comprendre `REST` = comprendre la base d’`OData`.
>
> Le `REST` est basé sur 6 contraintes

> [!TIP]
> C’est la philosophie qui a servi à construire le Web tel qu’on le connaît aujourd’hui.

> [!NOTE]
> Le `REST` ne veut pas dire "utiliser HTTP simplement" mais "utiliser HTTP correctement", selon 6 règles appelées `REST Architectural Constraints`.

## 🧩 6 REST ARCHITECTURAL CONSTRAINTS

### 🍧 CLIENT/SERVER

> [!NOTE]
> "Chacun son `Role`"

> [!TIP]
>
> - Le `Client` = le Chef de rang d'une Brasserie à l'Oktoberfest
> - Le `Server` = le Barman de cette Brasserie tout comme le Chef de cuisne
>
> le Barman ne s’occupe pas d’apporter les boissons, et le Chef de rang ne les prépare pas, ni le Chef de cuisine.

- Le `Client` (navigateur, app mobile…) affiche les données.
- Le `Server` les stocke et les envoie.
- Ils évoluent indépendamment !

### 🍧 CACHEABILITY

> [!NOTE]
> "Pouvoir réutiliser les `Responses`"

> [!TIP]
> Lorsqu'une `Request` (commande) est passée, la `Response` (boissons) reçue du `Server` (Barman) sont enregistrés dans le `Cache` (Pad) du `Client` (Chef de rang) comme quoi la `Response` (boissons) a bien était reçue et traitée (Status 200 - Success). Au départ du `User` (les fétards), le `Client` (Chef de rang) pourra alors faire facturer les `Responses` (boissons).

- Le `Server` indique si une réponse peut être mise en Cache.
- Le `Client` réutilise les données 👉 l’application va plus vite.

### 🍧 STATELESSNESS

> [!NOTE]
> "Pas de mémoire côté `Server`"

> [!TIP]  
> Le `Server` (Barman) peut recevoir de multiples `Requests` (Commandes). Afin de faciliter son travail, il compte sur le `Client` (Chef de rang) pour récupérer les informations pour répondre à chaque `Request`.
>
> - La première `Request` (1ère tournée) émise par le `User` (les fétards) et transmise par le `Client` (Chef de rang) va contenir les informations nécessaires au traitement de la `Response` (boissons de la 1ère tournée). le `Client` (Barman) va alors préparer la `Response` (boissons de la 1ère tournée) et la transmettre au `Client` (Chef de rang) afin qu'elle soit `Consumed` (consommées) par le `User` (les fétards).
> - La seconde `Request` (2e tournée) devra contenir les informations nécessaires à son traitement.

- Le `Server` ne garde pas d’information sur le `Client` entre deux `Requests`.
- Chaque `Requests` au `Server` est indépendante : 👉 Le `Client` doit fournir toutes les infos nécessaires à chaque `Requests`.

### 🍧 LAYERED SYSTEM

> [!NOTE]  
> "Plusieurs couches possibles"

> [!TIP]  
> Le `Client` (Chef de Rang) peut être surchargé avec des `Users` (des "Karens" ?) un peu excités, leur `Request` (Commande) pourrait alors passer par la `Security` (Agent de sécurité du festival) ou par un `Proxy` (Manager) afin d'authentifier (légitimité de leur présence) et autoriser la `Request` (Commande).

- Le `Client` ne sait pas s’il parle à un `Server` direct ou à un `intermédiaire` (`Proxy`, `Cache`, `Security`).
- Cela permet au système d’être plus robuste et Scalable (capacité de s'adapter à la demande, principalement d'augmenter cette capacité selon les besoins des utilisateurs).

### 🍧 UNIFORM INTERFACE

> [!NOTE]  
> "Tout doit être cohérent"

> [!TIP]  
> Admettons que le `Client` (Chef de Rang) transmette des informations erronées, incomplètes ou incohérentes (Chef de Rang saoul ?), le Server (Barman) ne traitera pas/traitera mal la Request (commande) et inversement.

Le `Client` parle au `Server` grâce à une interface simple et uniforme.

Cela implique :

- Une `URL` représentant une ressource (ex : /Products).
- Le `Client` peut `Create`, `Read`, `Update`, `Delete` 👉 `CRUD`.
- Les `Responses` doivent être claires, explicites.
- Le `Server` guide le Client grâce à des liens.

> [!IMPORTANT]
> C’est ce principe qui a permis la création d’`OData`
> (`OData` = `REST` + règles supplémentaires pour structurer les données).

### 🍧 CODE ON DEMAND

> [!NOTE]  
> "Optionnel"

> [!TIP]  
> Il est possible que certaines `Responses` (boissons) nécessitent un traitement spécifique côté Client (Chef de Rang) comme par exemple injecter un script (exemple : prévenir les fétards de la rupture de stock, allumer des bougies, etc).

- Le `Server` peut envoyer du code que le `Client` exécute.
- Exemple : du `JavaScript` envoyé par un site web.

> [!TIP]
> Cela est rare en `OData`, mais le principe existe.
