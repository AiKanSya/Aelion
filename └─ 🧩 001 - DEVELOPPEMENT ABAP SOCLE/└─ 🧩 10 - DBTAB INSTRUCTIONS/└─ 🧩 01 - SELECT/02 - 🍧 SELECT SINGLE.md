# 🌸 SELECT SINGLE – EXTRACTION D’UN ENREGISTREMENT UNIQUE

## 🌺 OBJECTIFS

- [ ] Comprendre l’utilité de l’instruction `SELECT SINGLE`
- [ ] Savoir récupérer un seul enregistrement depuis une table SAP
- [ ] Appliquer des filtres pour obtenir précisément l’enregistrement souhaité

## 🌺 DEFINITION

> `SELECT SINGLE` permet de lire un seul enregistrement d’une table SAP correspondant aux conditions spécifiées.  
> Il s’arrête dès qu’il trouve la première correspondance et ne lit pas toute la table.

> [!TIP]
> Imaginez que vous cherchez une fiche client dans un classeur : au lieu de feuilleter toutes les fiches, vous vous arrêtez dès que vous trouvez celle qui correspond exactement au critère recherché.

> [!IMPORTANT]
>
> - `SELECT SINGLE` est optimisé pour récupérer un enregistrement précis.
> - Il est plus rapide qu’un `SELECT` classique avec `WHERE` si vous savez qu’il n’existe qu’un seul enregistrement ou que vous voulez seulement le premier correspondant.

> [!CAUTION] > `SELECT SINGLE` ne garantit pas de lecture unique si plusieurs enregistrements respectent la condition : il retourne simplement le premier trouvé.

## 🌺 SYNTAXE

    SELECT SINGLE col1 col2 ...
      FROM table
      INTO dest
      WHERE condition.

> [!NOTE]
>
> - `col1 col2 ...` : colonnes à récupérer
> - `table` : table SAP ciblée
> - `dest` : variable ou structure ABAP où stocker l’enregistrement
> - `condition` : filtre pour sélectionner l’enregistrement

## 🌺 EXEMPLE

### PERFORM SELECT_SINGLE_VARIABLE

    DATA: lv_matnr TYPE ekpo-matnr.

    SELECT SINGLE matnr
      FROM ekpo
      INTO lv_matnr
      WHERE ebeln = '4500000106'.

    IF sy-subrc <> 0.
      MESSAGE 'Error select_single_var' TYPE 'E'.
    ENDIF.

    WRITE:/ 'SELECT_SINGLE_VAR',
          / '└─ Article       : ', lv_matnr.
    ULINE.

> [!IMPORTANT]
>
> - La variable `lv_matnr` contiendra le code Article
> - Seul le premier enregistrement correspondant à `ebeln = '4500000106'` est récupéré

> [!TIP]
> Comme demander au système : "Donne-moi directement la fiche exacte de ce consultant et ne cherche pas plus loin."

> [!TIP]
> Utiliser `SELECT SINGLE` quand vous êtes sûr que la condition cible un enregistrement précis, sinon préférez `SELECT INTO TABLE` pour récupérer tous les enregistrements correspondants.

### PERFORM SELECT_SINGLE_VARIABLES

    DATA: lv_matnr TYPE ekpo-matnr,
          lv_txz01 TYPE ekpo-txz01.

    SELECT SINGLE matnr txz01
      FROM ekpo
      INTO (lv_matnr, lv_txz01)
      WHERE ebeln = '4500000106'.

    IF sy-subrc <> 0.
      MESSAGE 'Error select_single_vars' TYPE 'E'.
    ENDIF.

### PERFORM SELECT_SINGLE_VARIABLE_INTO_LS

    TYPES: BEGIN OF ty_ekpo,
            matnr TYPE ekpo-matnr,
            txz01 TYPE ekpo-txz01,
            matkl TYPE ekpo-matkl,
          END OF ty_ekpo.

    DATA: ls_ekpo TYPE ty_ekpo.

    SELECT SINGLE matnr txz01 matkl
      FROM ekpo
      INTO ls_ekpo
      WHERE ebeln = '4500000106'.

    IF sy-subrc <> 0.
      MESSAGE 'Error select_single_vars_into_struct' TYPE 'E'.
    ENDIF.

### PERFORM SELECT_SINGLE_VARIABLE_INTO_TAB

    TYPES: BEGIN OF ty_ekpo,
            ebeln TYPE ekpo-ebeln,
            matnr TYPE ekpo-matnr,
            txz01 TYPE ekpo-txz01,
            matkl TYPE ekpo-matkl,
          END OF ty_ekpo.

    DATA: ls_ekpo TYPE ty_ekpo,
          lt_ekpo TYPE STANDARD TABLE OF ty_ekpo.

    SELECT ebeln matnr txz01 matkl
      UP TO 1 ROWS
      FROM ekpo
      INTO TABLE lt_ekpo
      WHERE ebeln = '4500000106'.

    IF sy-subrc <> 0.
      MESSAGE 'Error select_single_vars_into_tab' TYPE 'E'.
    ENDIF.

## 🌺 BONNES PRATIQUES

| 🍧 Bonnes pratiques                                        | 🍧 Explication                                                       |
| ---------------------------------------------------------- | -------------------------------------------------------------------- |
| Toujours utiliser une condition WHERE                      | Évite de récupérer un enregistrement aléatoire                       |
| Ne pas utiliser SELECT SINGLE pour de grandes recherches   | Optimiser SELECT classique si plusieurs résultats sont attendus      |
| Préférer INTO sur INTO TABLE pour un enregistrement unique | Simplifie le code et améliore les performances                       |
| Documenter la condition de filtrage                        | Permet de savoir quel critère a été utilisé pour récupérer la donnée |

> [!IMPORTANT]
>
> - `SELECT SINGLE` pour des données uniques (clé primaire ou identifiant unique)
> - `SELECT` classique ou `FOR ALL ENTRIES` pour plusieurs lignes

> [!TIP]
> Vous pouvez tester vos `SELECT SINGLE` dans `SE38` ou un programme ABAP pour voir directement les valeurs retournées.

## 🌺 RESUME

> - `SELECT SINGLE` lit un seul enregistrement correspondant à vos critères.
> - Plus rapide qu’un `SELECT` classique pour une recherche ciblée.
> - Ne garantit pas l’unicité si plusieurs enregistrements répondent à la condition.
>
> [!TIP]
> chercher la fiche exacte dans un classeur et s’arrêter dès qu’on la trouve.
