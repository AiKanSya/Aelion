# 🌸 ORDER BY – TRI DES RESULTATS

## 🌺 OBJECTIFS

- [ ] Trier les résultats d'une requête par une ou plusieurs colonnes
- [ ] Utiliser les options `ASCENDING` et `DESCENDING`
- [ ] Combiner `ORDER BY` avec `GROUP BY` et des fonctions d’agrégat
- [ ] Afficher les résultats dans un ordre clair et lisible

## 🌺 DEFINITION

> `ORDER BY col1 [ASCENDING|DESCENDING], col2 [ASCENDING|DESCENDING], …`  
> Permet de trier les résultats d’un SELECT selon une ou plusieurs colonnes.  
> `PRIMARY KEY` trie automatiquement selon la clé primaire de la table.

> [!TIP]
> Comme dans Excel, on peut trier les lignes d’un tableau par colonne : alphabétiquement ou du plus grand au plus petit.

> [!NOTE]  
> `ASCENDING` est le tri par défaut ; `DESCENDING` inverse l’ordre.

## EXEMPLE

    TYPES: BEGIN OF ty_ekko,
            ebeln TYPE ekko-ebeln,
            bukrs TYPE ekko-bukrs,
            lifnr TYPE ekko-lifnr,
            ernam TYPE ekko-ernam,
          END OF ty_ekko,

          BEGIN OF ty_ekpo,
            ebeln TYPE ekpo-ebeln,
            ebelp TYPE ekpo-ebelp,
            txz01 TYPE ekpo-txz01,
            matkl TYPE ekpo-matkl,
          END OF ty_ekpo.

    DATA: lt_ekko TYPE STANDARD TABLE OF ty_ekko,
          lt_ekpo TYPE STANDARD TABLE OF ty_ekpo.

    SELECT header~ebeln,
          header~bukrs,
          header~lifnr,
          header~ernam
      FROM ekko AS header
      INTO TABLE @lt_ekko
      WHERE header~bukrs = '1710'
        AND header~ernam = 'S4H_CO'
      ORDER BY header~lifnr DESCENDING.

    IF sy-subrc <> 0.
      MESSAGE 'Error select_order_by' TYPE 'E'.
    ENDIF.

    SELECT post~ebeln,
          post~ebelp,
          post~txz01,
          post~matkl
      FROM ekpo AS post
      INTO TABLE @lt_ekpo
      FOR ALL ENTRIES IN @lt_ekko
      WHERE post~ebeln = @lt_ekko-ebeln
        AND ( post~matkl = 'ZFRAME' OR post~matkl = 'ZHANDLE' OR post~matkl = 'ZSEAT' )
      ORDER BY PRIMARY KEY.

    IF sy-subrc <> 0.
      MESSAGE 'Error select_order_by' TYPE 'E'.
    ENDIF.

## 🌺 BONNES PRATIQUES

- Utiliser `ASCENDING` ou `DESCENDING` explicitement pour clarifier le tri.
- Prioriser les colonnes dans `ORDER BY` selon la logique métier.
- Combiner avec `GROUP BY` pour présenter les résultats agrégés de façon lisible.
- Éviter de trier sur des colonnes volumineuses pour ne pas ralentir le SELECT.
