# 🌸 GATEWAY

## 🧩 OBJECTIVES

- [ ] Comprendre la `SAP Gateway` (Server).
- [ ] (Optionnel) Identifier les choix de `Deployment`
- [ ] (Optionnel) Identifier les produits SAP qui utilisent `SAP Gateway`.

## 🧩 DEFINITION

> [!IMPORTANT]
> La `SAP Gateway` est un `Server` (Barman de la Brasserie ou Chef de Cuisine) qui permet d’exposer les données SAP (Plats et Boissons) via `OData` (la carte de la Brasserie), facilitant ainsi l’accès aux informations (menus, plats, boissons ...) depuis des `Clients` (applications, mobiles ou web - Chef de Rang).  
> Il sert de pont entre le `Front-End` (applications) et le `Back-End` (données SAP).

> [!TIP]
> Imaginez `SAP Gateway` comme un Chef de Rang : il prend la `Request` (commande) du `Client` (application), la transmet au back-end (Barman/Chef de Cuisine), et renvoie les données (Plats et Boissons) au `Client` (application) pour être `consumed` (consommé) par les `Users` (fétards).

## 🧩 SAP GATEWAY FLEXIBLE DEPLOYMENT (OPTIONAL)

`SAP Gateway` peut être déployé de deux façons :

> [!TIP]
>
> - `Hub Deployment` = deux lieux : salle (`FES`) et cuisine/bar (`BES`).
> - `Embedded Development` = tout dans un même lieu, plus rapide et simple.

### 🍧 HUB DEPLOYMENT

FES (Front-End Server) et BES (Back-End Server) sont sur des systèmes séparés.

> [!IMPORTANT]
> Communication via RFC (Remote Function Call).

### 🍧 EMBEDDED DEVELOPMENT

Le Front-End et le Back-End peuvent être exécutés dans le même système ABAP (depuis la version 7.40).

> [!IMPORTANT]
> L'Embedded Development est recommandé pour SAP S/4HANA.

## 🧩 DEPLOYMENT SCENARIOS

> [!NOTE]
> les 3 principaux.

> [!TIP]  
> Pour se souvenir :
>
> - Embedded Development = tout dans le même bâtiment (rapide, simple).
> - Hub = lieux séparés (plus de flexibilité et sécurité pour multi-backends).

### 🍧 DEPLOYMENT IN THE BES (BACK-END)

- Comment : services développés et déployés dans le `BES` ; le `FES` (hub) sert surtout à enregistrer/publier les services et exposer vers l’extérieur. Communication interne par RFC.
- Avantages : administration centralisée, sécurité, composition multi-origine, bon pour Business Suite.
- Inconvénients : Server supplémentaire (`FES`), communication RFC nécessaire.

> [!TIP]  
> Hub (`BES` dev) = plusieurs parties en cuisine (`BES`) préparant des entrées, plats et desserts, la salle (`FES`) centralise l’accès.

### 🍧 DEPLOYMENT IN THE FES (FRONT-END)

- Comment : le service est implémenté dans le hub/`FES` ; utile quand on ne peut pas installer certains composants dans le `BES`.
- Avantages : centralisation frontale, simplifie administration et versioning du front.
- Inconvénients : séparation logique entre implémentation et données (RFC), Server supplémentaire, complexité si logique métier doit rester dans `BES`.

> [!IMPORTANT]  
> Option choisie quand le `BES` est contraint (versions anciennes, restrictions d’install).

### 🍧 EMBEDDED DEPLOYMENT (INTEGRATED)

- Comment : front-end et back-end coexistent dans le même système ABAP (`FES` et `BES` ensemble). Recommandé pour SAP S/4HANA.
- Avantages : déploiement plus simple, meilleures performances (pas d’aller-retour RFC pour chaque opération), exposition rapide des services.
- Inconvénients : moins adapté si on doit combiner plusieurs `BES`/version différentes ; mises à niveau du système peuvent impacter les services exposés.

> [!CAUTION]  
> Si le système est exposé à Internet en embedded, prévoir des mesures de sécurité renforcées !

## 🧩 KEY POINTS

- `SAP Gateway` = pont entre applications et données SAP via `OData`.
- `Déploiement flexible` : `FES`/`BES` deployment ou Embedded Development selon les `bes`oins.
- De nombreux produits SAP utilisent SAP Gateway, comme Fiori Launchpad, Multichannel Foundation, Mobile Start, Mobile Services Client.

## 🧩 EXAMPLES OF SAP PRODUCTS USING SAP GATEWAY (OPTIONAL)

### 🍧 SAP FIORI LAUNCHPAD

> [!TIP]
> Fiori Launchpad = le menu du restaurant : tout est organisé pour que le User trouve facilement ce qu’il veut.
> C'est un Client Web SAP

- Interface principale pour les utilisateurs `SAP S/4HANA`.
- Caractéristiques clés :
  - Applications regroupées dans une vue unique.
  - Contexte pertinent pour une prise de décision rapide.
  - Approvals et notifications interactives.
  - Applications attribuées à des rôles spécifiques.
  - Personnalisation et responsive design.

### 🍧 SAP MULTICHANNEL FOUNDATION FOR UTILITIES AND PUBLIC SECTOR

> [!TIP]
> Comme un guichet unique digital pour gérer toutes les interactions avec le User.

- Solution client orientée services publics.
- Fournit des services OData standardisés pour interagir avec les Clients via Web, mobile et réseaux sociaux.
- Fonctionnalités :
  - Créer et gérer un compte
  - Consulter l’historique et les factures
  - Mettre à jour ses informations
  - Soumettre des demandes et contrats

### 🍧 SAP MOBILE START

> [!TIP]
> Mobile Start = le menu digital du restaurant sur votre smartphone/tablette.

- Application mobile intégrée à SAP S/4HANA et à la BTP.
- Fonctionne sur iOS et Android.
- Intègre notifications, widgets et recherche sur smartphone et tablette.

### 🍧 SAP MOBILE SERVICES CLIENT

> [!TIP]
> SAP Mobile Services Client = la tablette ou le terminal du Server pour exécuter les applications créées par les développeurs.

- Plateforme pour exécuter des applications créées avec Mobile Development Toolkit (MDK).
- Fournit un Client multi-plateforme pour Apple iOS et Android.
