# 🌸 ITAB TYPE TABLE OF

## 🌺 OBJECTIFS

- [ ] Comprendre ce qu’est une `TABLE INTERNE` en ABAP
- [ ] Déclarer un type de structure avec TYPES
- [ ] Créer une variable de type structure pour les lignes
- [ ] Créer une variable de type `TABLE INTERNE`
- [ ] Remplir une `TABLE INTERNE` avec des données structurées
- [ ] Assimiler l’analogie entre `TABLE INTERNE` et carnet d’adresses
- [ ] Appliquer les bonnes pratiques pour manipuler les tables internes

## 🌺 DEFINITION

> Une `TABLE INTERNE` est un conteneur temporaire de données dans un programme ABAP.  
> Elle permet de stocker plusieurs lignes de données structurées, chaque ligne pouvant être une `STRUCTURE` ou un simple type.

> [!TIP]
> Imaginez une `TABLE INTERNE` comme un carnet d’adresses
>
> - Chaque page correspond à une ligne de table (une `STRUCTURE`)
> - Chaque champ sur la page correspond à un champ de la `STRUCTURE` (nom, prénom, téléphone…)
> - Vous pouvez ajouter ou supprimer des pages sans toucher aux autres

> [!NOTE]
> Les `TABLES INTERNES` sont uniquement en mémoire pendant l’exécution du programme, elles ne sont pas persistantes comme une table en base de données.

## 🌺 DECLARATION

1️⃣ Définir un type de structure pour une ligne :

    TYPES: BEGIN OF ty_person,
             nom    TYPE char20,
             prenom TYPE char20,
             age    TYPE i,
             ville  TYPE char20,
          END OF ty_person.

2️⃣ Déclarer la `TABLE INTERNE` :

    DATA: lt_persons TYPE TABLE OF ty_person.

3️⃣ Déclarer une structure temporaire pour ajouter des lignes :

    DATA: ls_person TYPE ty_person.
    " ou encore
    DATA: ls_person_2 LIKE LINE OF lt_persons.

> [!TIP]
> Le TYPES `ty_person` = fiche d’identité  
> La TABLE `lt_persons` = carnet d’adresses  
> La STRUCTURE `ls_person` = page vide à remplir avant de l’insérer

## 🌺 AFFECTATION DE VALEUR ET INSERTION D’UNE LIGNE DANS UNE TABLE

    ls_person-nom    = 'Dupont'.
    ls_person-prenom = 'Jean'.
    ls_person-age    = 35.
    ls_person-ville  = 'Paris'.

    APPEND ls_person TO lt_persons.

> [!TIP]
> On remplit une fiche (`STRUCTURE`) et on la colle dans le carnet (`TABLE INTERNE`).

> [!TIP]
> Toujours utiliser une `STRUCTURE` temporaire pour manipuler les lignes avant de les insérer dans la table.

> [!CAUTION]
> Lorsque tu alimentes une table avec plusieurs lignes de manière automatique (dans une boucle par exemple), n'oublie pas de CLEAR la structure après tout ajout de ligne dans la table (ou avant toute affectation de valeur).

## 🌺 BONNES PRATIQUES

| 🍧 Bonne pratique                                   | 🍧 Explication                               |
| --------------------------------------------------- | -------------------------------------------- |
| Définir une structure pour chaque ligne             | Clarifie et standardise les données          |
| Utiliser `APPEND` pour ajouter des lignes           | Maintient l’ordre et l’intégrité de la table |
| Nommer tables et structures de façon explicite      | Lecture et maintenance facilitées            |
| Manipuler les lignes via une structure temporaire   | Séparation claire entre ligne et table       |
| CLEAR la structure avant affectation ou après ajout | Evite d'avoir des données erronées           |

## 🌺 EXERCICES – DECLARATION ET INSERTION

### 🔹 1 – CREER UNE TABLE INTERNE DE LIVRES

> [!IMPORTANT]
> Déclarer une `TABLE INTERNE` `lt_livres` avec une `STRUCTURE` `ty_livre` contenant
>
> - titre (CHAR30)
> - auteur (CHAR30)
> - annee (I)
> - genre (CHAR20)
>
> Ajouter une ligne à la table.

<details>
  <summary>SOLUTION</summary>

    TYPES: BEGIN OF ty_livre,
             titre  TYPE char30,
             auteur TYPE char30,
             annee  TYPE i,
             genre  TYPE char20,
           END OF ty_livre.

    DATA: lt_livres TYPE TABLE OF ty_livre,
          ls_livre TYPE ty_livre.

    ls_livre-titre  = '1984'.
    ls_livre-auteur = 'George Orwell'.
    ls_livre-annee  = 1949.
    ls_livre-genre  = 'Dystopie'.

    APPEND ls_livre TO lt_livres.

</details>

---

### 🔹 2 – AJOUTER UNE DEUXIEME LIGNE

> [!IMPORTANT]
> Ajouter un deuxième livre dans la même table `lt_livres`.

<details>
  <summary>SOLUTION</summary>

    ls_livre-titre  = 'Le Petit Prince'.
    ls_livre-auteur = 'Antoine de Saint-Exupéry'.
    ls_livre-annee  = 1943.
    ls_livre-genre  = 'Conte'.

    APPEND ls_livre TO lt_livres.

</details>

---

### 🔹 3 – CREER UNE TABLE DE CLIENTS

> [!IMPORTANT]
> Déclarer une `TABLE INTERNE lt_clients` avec une `STRUCTURE ty_client` contenant
>
> - nom (CHAR20)
> - prenom (CHAR20)
> - age (I)
> - ville (CHAR20)
>
> Ajouter deux clients différents.

<details>
  <summary>SOLUTION</summary>

    TYPES: BEGIN OF ty_client,
             nom    TYPE char20,
             prenom TYPE char20,
             age    TYPE i,
             ville  TYPE char20,
           END OF ty_client.

    DATA: lt_clients TYPE TABLE OF ty_client,
          ls_client TYPE ty_client.

    ls_client-nom    = 'Martin'.
    ls_client-prenom = 'Claire'.
    ls_client-age    = 28.
    ls_client-ville  = 'Lyon'.
    APPEND ls_client TO lt_clients.

    ls_client-nom    = 'Bernard'.
    ls_client-prenom = 'Paul'.
    ls_client-age    = 45.
    ls_client-ville  = 'Marseille'.
    APPEND ls_client TO lt_clients.

</details>

## 🌺 RESUME

> - Une `TABLE INTERNE` contient plusieurs lignes de données structurées.
> - Chaque ligne est une `STRUCTURE`, manipulée via une `VARIABLE` temporaire avant insertion.
> - Schéma général : `TYPES` → `DATA structure` → `DATA table` → `APPEND TO table`.
>
> [!TIP]
> carnet d’adresses pour la table, fiche d’identité pour chaque ligne.
>
> [!IMPORTANT]
> utiliser des `STRUCTURES` claires, manipuler les lignes via une `STRUCTURE` temporaire et éviter les header lines.
