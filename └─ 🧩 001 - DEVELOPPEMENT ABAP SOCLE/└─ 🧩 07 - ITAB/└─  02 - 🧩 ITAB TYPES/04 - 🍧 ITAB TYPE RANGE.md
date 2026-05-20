# 🌸 TYPE RANGE OF

## 🌺 OBJECTIFS

- [ ] Comprendre le rôle d’une `RANGE TABLE`
- [ ] Identifier les champs prédéfinis : `SIGN`, `OPTION`, `LOW`, `HIGH`
- [ ] Comprendre la notion d’inclusion/exclusion et d’intervalles

## 🌺 DEFINITION

> Une `RANGE TABLE` est une table interne spéciale pour définir des intervalles de valeurs.  
> Elle est utilisée pour filtrer des données dans les `requêtes SQL` et les `écrans de sélection`.

> [!TIP]
> Imaginez un filtre de recherche avancé
>
> - Vous indiquez ce que vous voulez inclure ou exclure
> - Vous précisez des intervalles de valeurs
> - La table RANGE stocke toutes ces informations de manière structurée pour la requête

### CHAMPS PREDEFINIS

- `SIGN` (C, 1) → Incluse (I) ou Exclue (E)
- `OPTION` (C, 2) → opérateur : EQ, BT…
- `LOW` → limite inférieure de l’intervalle
- `HIGH` → limite supérieure de l’intervalle

> [!NOTE]
> Chaque ligne de la `RANGE TABLE` correspond à une règle de filtrage.

## 🌺 DECLARATION

    " Déclaration d’une RANGE TABLE pour des numéros de produits (MATNR)
    DATA: lr_matnr TYPE RANGE OF matnr.

> [!TIP]
> La `lr_matnr` est directement utilisable dans des `SELECT` ou pour `SELECT-OPTIONS`.

## 🌺 ALIMENTATION

    DATA: ls_matnr TYPE LINE OF lr_matnr.

    " Inclure les produits 1000 à 2000
    ls_matnr-sign   = 'I'.
    ls_matnr-option = 'BT'.
    ls_matnr-low    = '1000'.
    ls_matnr-high   = '2000'.
    APPEND ls_matnr TO lr_matnr.

    " Exclure le produit 1500
    ls_matnr-sign   = 'E'.
    ls_matnr-option = 'EQ'.
    ls_matnr-low    = '1500'.
    ls_matnr-high   = ''.
    APPEND ls_matnr TO lr_matnr.

> [!IMPORTANT]
> Le `SIGN` = I → inclusion, E → exclusion  
> Le `OPTION` = BT → entre deux valeurs, EQ → valeur unique
>
> Les `RANGE TABLE` simplifient le filtrage complexe sans écrire de multiples conditions `IF`.

## 🌺 EXERCICES

### 🔹 1 – CREER UNE RANGE TABLE DE PRODUITS

> [!IMPORTANT]
> Déclarer une `RANGE TABLE` `lr_prod` pour le type `matnr`.  
> Ajouter un intervalle inclus de 500 à 1000 et une exclusion pour 750.

<details>
  <summary>SOLUTION</summary>

    DATA: lr_prod TYPE RANGE OF matnr,
          ls_prod TYPE LINE OF lr_prod.

    " Inclure 500 à 1000
    ls_prod-sign   = 'I'.
    ls_prod-option = 'BT'.
    ls_prod-low    = '500'.
    ls_prod-high   = '1000'.
    APPEND ls_prod TO lr_prod.

    " Exclure 750
    ls_prod-sign   = 'E'.
    ls_prod-option = 'EQ'.
    ls_prod-low    = '750'.
    ls_prod-high   = ''.
    APPEND ls_prod TO lr_prod.

</details>

---

### 🔹 2 – AJOUTER UN NOUVEL INTERVALLE

> [!IMPORTANT]
> Ajouter un intervalle inclus de 1100 à 1200 et afficher la `RANGE TABLE`.

<details>
  <summary>SOLUTION</summary>

    ls_prod-sign   = 'I'.
    ls_prod-option = 'BT'.
    ls_prod-low    = '1100'.
    ls_prod-high   = '1200'.
    APPEND ls_prod TO lr_prod.

    LOOP AT lr_prod INTO ls_prod.
      WRITE: / 'SIGN:', ls_prod-sign,
               'OPTION:', ls_prod-option,
               'LOW:', ls_prod-low,
               'HIGH:', ls_prod-high.
    ENDLOOP.

</details>

---

### 🔹 3 – AJOUTER UNE EXCLUSION

> [!IMPORTANT]
> Exclure le produit 1120 et afficher toute la `RANGE TABLE`.

<details>
  <summary>SOLUTION</summary>

    ls_prod-sign   = 'E'.
    ls_prod-option = 'EQ'.
    ls_prod-low    = '1120'.
    ls_prod-high   = ''.
    APPEND ls_prod TO lr_prod.

    LOOP AT lr_prod INTO ls_prod.
      WRITE: / 'SIGN:', ls_prod-sign,
               'OPTION:', ls_prod-option,
               'LOW:', ls_prod-low,
               'HIGH:', ls_prod-high.
    ENDLOOP.

</details>

> [!CAUTION]
> L’ordre des lignes n’a pas d’importance. Chaque ligne est évaluée lors du filtrage.

## 🌺 RESUME

> - `TYPE RANGE OF` → table interne pour stocker intervalles et exclusions.
> - Champs : `SIGN`, `OPTION`, `LOW`, `HIGH`
> - Analogie : un filtre avancé qui mémorise les inclusions, exclusions et intervalles
> - Astuce : chaque `APPEND` ajoute une nouvelle "règle" de filtrage
