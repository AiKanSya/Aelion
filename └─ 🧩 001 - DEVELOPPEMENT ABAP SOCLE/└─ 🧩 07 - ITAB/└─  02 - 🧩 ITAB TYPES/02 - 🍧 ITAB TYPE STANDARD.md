# 🌸 ITAB TYPE STANDARD TABLE OF

## 🌺 OBJECTIFS

- [ ] Comprendre la différence entre `TYPE TABLE OF` et `TYPE STANDARD TABLE OF`
- [ ] Savoir déclarer un type standard de table interne
- [ ] Assimiler le comportement spécifique d’une table standard (index implicite, ordre d’insertion)
- [ ] Identifier les cas d’usage pertinents

## 🌺 DEFINITION

> Une table interne standard (`TYPE STANDARD TABLE OF`) est une table indexée automatiquement par ABAP.  
> Chaque ligne est accessible par un indice numérique (1, 2, 3, ...), représentant l’ordre d’insertion.

> [!IMPORTANT]
>
> - L’ordre d’insertion détermine l’ordre de lecture.
> - L’accès à une ligne spécifique nécessite souvent une recherche séquentielle (instruction `READ TABLE`).
> - Une table standard n’impose pas d’unicité sur les lignes.

> [!IMPORTANT]
>
> | 🍧 Type de table interne | 🍧 Indexée | 🍧 Accès direct | 🍧 Doublons autorisés | 🍧 Tri automatique |
> | ------------------------ | ---------- | --------------- | --------------------- | ------------------ |
> | STANDARD TABLE           | ✅ Oui     | ❌ Non          | ✅ Oui                | ❌ Non             |
> | SORTED TABLE             | ✅ Oui     | ✅ Oui (clé)    | ❌ Non (clé unique)   | ✅ Oui             |
> | HASHED TABLE             | ❌ Non     | ✅ Oui (clé)    | ❌ Non (clé unique)   | ❌ Non             |

## 🌺 DECLARATION

### 1️⃣ DEFINIR UN TYPE DE LIGNE

    TYPES: BEGIN OF ty_person,
             nom    TYPE char20,
             prenom TYPE char20,
             age    TYPE i,
             ville  TYPE char20,
           END OF ty_person.

### 2️⃣ DECLARER UNE TABLE STANDARD

    DATA: lt_persons TYPE STANDARD TABLE OF ty_person.

### 3️⃣ DECLARER UNE STRUCTURE TEMPORAIRE

    DATA: ls_person TYPE ty_person.

> [!TIP]
>
> - `ty_person` → modèle de fiche d’identité
> - `ls_person` → fiche en cours de remplissage
> - `lt_persons` → carnet de fiches numérotées automatiquement

## 🌺 INSERTION D’UNE LIGNE

    ls_person-nom    = 'Dupont'.
    ls_person-prenom = 'Jean'.
    ls_person-age    = 35.
    ls_person-ville  = 'Paris'.

    APPEND ls_person TO lt_persons.

> [!IMPORTANT]
> L’instruction `APPEND` ajoute la ligne à la fin de la table.  
> La table standard conserve l’ordre chronologique d’insertion.

> [!NOTE]
> Le `APPEND` crée implicitement un nouvel index pour la ligne ajoutée.

## 🌺 ACCES AUX DONNÉES

### 🔹 LECTURE SEQUENTIELLE

- BOUCLE avec stockage des données de la ligne lue dans une structure déjà déclarée en amont

      LOOP AT lt_persons INTO ls_person.
        WRITE: / ls_person-nom, ls_person-prenom.
      ENDLOOP.

- BOUCLE avec stockage des données de la ligne lue dans une structure déclarée dynamiquement

      LOOP AT lt_persons INTO DATA(ls_person).
        WRITE: / ls_person-nom, ls_person-prenom.
      ENDLOOP.

- BOUCLE avec stockage des données de la ligne lue dans un field-symbol déjà déclarée en amont

      LOOP AT lt_persons ASSIGNING <lfs_person>.
        WRITE: / ls_person-nom, ls_person-prenom.
      ENDLOOP.

- BOUCLE avec stockage des données de la ligne lue dans un field-symbol déclarée dynamiquement

      LOOP AT lt_persons ASSIGNING FIELD-SYMBOL(<lfs_person>).
        WRITE: / ls_person-nom, ls_person-prenom.
      ENDLOOP.

### 🔹 LECTURE PAR INDEX

    READ TABLE lt_persons INDEX 2 INTO ls_person.
    IF sy-subrc = 0.
      WRITE: / 'Deuxième personne :', ls_person-nom.
    ENDIF.

> [!CAUTION]
> Une table standard ne garantit pas de tri ou d’accès direct par clé.  
> L’accès se fait par index ou recherche séquentielle.

## 🌺 BONNES PRATIQUES

| 🍧 Bonne pratique                                          | 🍧 Explication                                     |
| ---------------------------------------------------------- | -------------------------------------------------- |
| Utiliser `TYPE STANDARD TABLE OF` pour les listes simples  | Idéal pour traitements linéaires, sans clé logique |
| Définir un type clair pour les lignes                      | Simplifie la maintenance et les vérifications      |
| Éviter les recherches répétées par clé                     | Préférer `SORTED TABLE` pour cela                  |
| Nommer les objets (`ty_`, `lt_`, `ls_`) de façon cohérente | Améliore la lisibilité                             |

> [!CAUTION]
> Tables standard → manipulation séquentielle (boucles, appends, tri manuel).

## 🌺 EXEMPLES

### 🔹 EXEMPLE 1 – TABLE DE LIVRES

    TYPES: BEGIN OF ty_livre,
             titre  TYPE char30,
             auteur TYPE char30,
             annee  TYPE i,
             genre  TYPE char20,
           END OF ty_livre.

    DATA: lt_livres TYPE STANDARD TABLE OF ty_livre,
          ls_livre  TYPE ty_livre.

    ls_livre-titre  = '1984'.
    ls_livre-auteur = 'George Orwell'.
    ls_livre-annee  = 1949.
    ls_livre-genre  = 'Dystopie'.
    APPEND ls_livre TO lt_livres.

    ls_livre-titre  = 'Le Petit Prince'.
    ls_livre-auteur = 'Antoine de Saint-Exupéry'.
    ls_livre-annee  = 1943.
    ls_livre-genre  = 'Conte'.
    APPEND ls_livre TO lt_livres.

### 🔹 EXEMPLE 2 – TRI MANUEL D’UNE TABLE STANDARD

    SORT lt_livres BY auteur.

> [!IMPORTANT]  
> Une table standard n’est pas triée automatiquement.  
> `SORT` est nécessaire pour organiser les lignes par champ.

## 🌺 EXERCICES

### 🔹 1 – TABLE DE CLIENTS

> [!IMPORTANT]  
> Déclarer une table standard `lt_clients` avec une structure `ty_client` contenant
>
> - nom (CHAR20)
> - prenom (CHAR20)
> - age (I)
> - ville (CHAR20)
>
> Ajouter deux clients et afficher leurs noms.

<details>
  <summary>SOLUTION</summary>

    TYPES: BEGIN OF ty_client,
             nom    TYPE char20,
             prenom TYPE char20,
             age    TYPE i,
             ville  TYPE char20,
           END OF ty_client.

    DATA: lt_clients TYPE STANDARD TABLE OF ty_client,
          ls_client  TYPE ty_client.

    ls_client-nom = 'Martin'.
    ls_client-prenom = 'Claire'.
    ls_client-age = 28.
    ls_client-ville = 'Lyon'.
    APPEND ls_client TO lt_clients.

    ls_client-nom = 'Bernard'.
    ls_client-prenom = 'Paul'.
    ls_client-age = 45.
    ls_client-ville = 'Marseille'.
    APPEND ls_client TO lt_clients.

</details>

---

## 🌺 RESUME

> - `TYPE STANDARD TABLE OF` → table interne indexée automatiquement.
> - Ordre d’insertion conservé.
> - Accès séquentiel ou par index.
> - Pas de tri ni de clé unique par défaut.
> - Idéale pour listes simples ou traitements linéaires.
