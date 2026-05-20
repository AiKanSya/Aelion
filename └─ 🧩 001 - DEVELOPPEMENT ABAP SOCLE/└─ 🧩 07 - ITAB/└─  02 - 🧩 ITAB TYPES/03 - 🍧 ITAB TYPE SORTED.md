# 🌸 ITAB TYPE SORTED TABLE OF

## 🌺 OBJECTIFS

- [ ] Comprendre la structure et le comportement d’une table triée (`TYPE SORTED TABLE OF`)
- [ ] Savoir déclarer une clé obligatoire avec `WITH UNIQUE KEY`
- [ ] Identifier les avantages et contraintes de performance
- [ ] Maîtriser l’insertion, la lecture et le tri automatique
- [ ] Appliquer les bonnes pratiques d’utilisation

## 🌺 DEFINITION

> Une SORTED TABLE est une table interne triée automatiquement selon une clé définie lors de la déclaration.  
> L’ordre est garanti et un index interne est maintenu pour les recherches par clé.

> [!TIP]
> Un annuaire trié par nom : chaque fiche est automatiquement insérée à la bonne position.  
> Impossible d’avoir deux fiches avec le même nom si la clé est unique.

> [!NOTE]
>
> - Une clé (`WITH UNIQUE KEY` ou `WITH NON-UNIQUE KEY`) est obligatoire.
> - L’insertion est automatiquement triée.
> - Les recherches sont optimisées (accès dichotomique).
> - Les insertions massives sont plus coûteuses qu’avec une `STANDARD TABLE`.

## 🌺 DECLARATION

### 1️⃣ DEFINIR UNE STRUCTURE DE LIGNE

    TYPES: BEGIN OF ty_person,
             id    TYPE char10,
             nom   TYPE char20,
             age   TYPE i,
           END OF ty_person.

### 2️⃣ D2CLARER UNE TABLE TRIEE AVEC LA CLE UNIQUE

    DATA: lt_persons TYPE SORTED TABLE OF ty_person
                      WITH UNIQUE KEY id.

### 3️⃣ DECLARER LA STRUCTURE DE TRAVAIL

    DATA: ls_person TYPE ty_person.

> [!IMPORTANT]
>
> - `SORTED TABLE` maintient un ordre trié automatique.
> - `WITH UNIQUE KEY` garantit l’unicité sur le champ clé.
> - `INSERT` insère la ligne au bon endroit, selon la clé.

## 🌺 INSERTION D’UNE LIGNE

    ls_person-id  = '0003'.
    ls_person-nom = 'Martin'.
    ls_person-age = 28.
    INSERT ls_person INTO TABLE lt_persons.

    ls_person-id  = '0001'.
    ls_person-nom = 'Dupont'.
    ls_person-age = 45.
    INSERT ls_person INTO TABLE lt_persons.

> [!TIP]
> Peu importe l’ordre du code, les lignes seront triées par la clé (`id`).

> [!CAUTION]
>
> - `APPEND` ne doit jamais être utilisé dans une `SORTED TABLE`.
> - Seule l’instruction `INSERT` maintient le tri automatique.
> - Si une clé dupliquée est insérée → erreur d’exécution (`sy-subrc ≠ 0`).

## 🌺 BONNES PRATIQUES

| 🍧 Bonne pratique                                | 🍧 Explication                    |
| ------------------------------------------------ | --------------------------------- |
| Toujours définir la clé à la déclaration         | Condition obligatoire pour le tri |
| Utiliser `INSERT` pour maintenir le tri          | `APPEND` casse l’ordre logique    |
| Préférer `SORTED TABLE` pour lectures fréquentes | Accès par clé optimisé            |
| Éviter pour insertions massives désordonnées     | Coût CPU du réordonnancement      |

> [!CAUTION]
> Une `SORTED TABLE` est idéale lorsque l’ordre et la recherche par clé sont prioritaires, pas la vitesse d’insertion.

## 🌺 EXEMPLES

### 🔹 EXEMPLE 1 – TABLE DE PRODUITS TRIÉE PAR ID

    TYPES: BEGIN OF ty_produit,
             id   TYPE char10,
             nom  TYPE char20,
             prix TYPE i,
           END OF ty_produit.

    DATA: lt_produits TYPE SORTED TABLE OF ty_produit
                          WITH UNIQUE KEY id,
          ls_produit TYPE ty_produit.

    ls_produit-id   = '0002'.
    ls_produit-nom  = 'Stylo'.
    ls_produit-prix = 2.
    INSERT ls_produit INTO TABLE lt_produits.

    ls_produit-id   = '0001'.
    ls_produit-nom  = 'Cahier'.
    ls_produit-prix = 5.
    INSERT ls_produit INTO TABLE lt_produits.

> [!IMPORTANT]
> L’ordre final dans la table est :  
> `0001 Cahier`, `0002 Stylo`.

### 🔹 EXEMPLE 2 – AJOUT D’UN TROISIÈME PRODUIT

    ls_produit-id   = '0003'.
    ls_produit-nom  = 'Gomme'.
    ls_produit-prix = 1.
    INSERT ls_produit INTO TABLE lt_produits.

> [!IMPORTANT]
> L’ordre reste automatiquement
> `0001`, `0002`, `0003`.

## 🌺 EXERCICES

### 🔹 1 – CREER UNE TABLE DE CLIENTS TRIÉE PAR ID

> [!IMPORTANT]
> Déclarer une table `lt_clients` triée par `id` et y insérer trois lignes désordonnées.

<details>
  <summary>SOLUTION</summary>

    TYPES: BEGIN OF ty_client,
             id     TYPE char10,
             nom    TYPE char20,
             prenom TYPE char20,
           END OF ty_client.

    DATA: lt_clients TYPE SORTED TABLE OF ty_client
                         WITH UNIQUE KEY id,
          ls_client  TYPE ty_client.

    ls_client-id = '003'.
    ls_client-nom = 'Durand'.
    ls_client-prenom = 'Alice'.
    INSERT ls_client INTO TABLE lt_clients.

    ls_client-id = '001'.
    ls_client-nom = 'Martin'.
    ls_client-prenom = 'Paul'.
    INSERT ls_client INTO TABLE lt_clients.

    ls_client-id = '002'.
    ls_client-nom = 'Bernard'.
    ls_client-prenom = 'Luc'.
    INSERT ls_client INTO TABLE lt_clients.

    LOOP AT lt_clients INTO ls_client.
      WRITE: / ls_client-id, ls_client-nom.
    ENDLOOP.

</details>

---

### 🔹 2 – TESTER UNE CLÉ DUPLIQUÉE

> [!IMPORTANT]
> Essayer d’insérer une ligne avec un `id` déjà existant et observer le `sy-subrc`.

<details>
  <summary>SOLUTION</summary>

    ls_client-id = '002'.
    ls_client-nom = 'Dupont'.
    ls_client-prenom = 'Jean'.
    INSERT ls_client INTO TABLE lt_clients.

    IF sy-subrc <> 0.
      WRITE: / 'Erreur : clé déjà existante.'.
    ENDIF.

</details>

---

## 🌺 RESUME

> - `TYPE SORTED TABLE OF` → table interne triée automatiquement selon une clé.
> - Clé obligatoire (`WITH UNIQUE KEY` ou `WITH NON-UNIQUE KEY`).
> - Accès par clé très rapide (binaire).
> - Insertion plus lente à cause du maintien de l’ordre.
> - Interdiction d’utiliser `APPEND`.
> - Idéale pour les listes triées, les recherches rapides et la garantie d’unicité.
