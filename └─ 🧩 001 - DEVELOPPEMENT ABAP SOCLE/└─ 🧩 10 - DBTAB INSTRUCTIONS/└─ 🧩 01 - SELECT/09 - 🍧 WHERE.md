# 🌸 WHERE – FILTRER LES RESULTATS D'UN SELECT

## 🌺 OBJECTIFS

- [ ] Comprendre le rôle de la clause WHERE pour filtrer les résultats d’un SELECT
- [ ] Utiliser les opérateurs de comparaison et les logiques (`AND`, `OR`)
- [ ] Gérer les parenthèses pour contrôler l’ordre des conditions
- [ ] Appliquer des sous-requêtes dans le WHERE

## 🌺 DEFINITION

> La clause WHERE permet de restreindre les résultats en fonction de conditions définies sur :
>
> - des variables
> - des constantes
> - des colonnes
> - des sous-requêtes

> [!TIP]
> Comme filtrer un classeur Excel pour ne conserver que certaines lignes :
>
> - Colonne "Marque" = PEUGEOT ou VOLKSWAGEN
> - Colonne "Année" ≥ 2015  
>   Seules les lignes correspondant aux critères sont extraites.

## 🌺 SYNTAXE PRINCIPALE

    WHERE ( condition_1 OR condition_2 ) AND condition_3

> [!NOTE]  
> Les parenthèses permettent de regrouper les conditions et éviter une interprétation incorrecte par le moteur SQL.

## 🌺 EXEMPLE

    TYPES: BEGIN OF ty_ekko_ekpo,
            ebeln TYPE ekko-ebeln,
            bukrs TYPE ekko-bukrs,
            lifnr TYPE ekko-lifnr,
            ernam TYPE ekko-ernam,
            ebelp TYPE ekpo-ebelp,
            txz01 TYPE ekpo-txz01,
            matkl TYPE ekpo-matkl,
          END OF ty_ekko_ekpo.

    DATA: lt_ekko_ekpo TYPE STANDARD TABLE OF ty_ekko_ekpo.

    SELECT header~ebeln,
          header~bukrs,
          header~lifnr,
          header~ernam,
          post~ebelp,
          post~txz01,
          post~matkl
      FROM ekko AS header
      INNER JOIN ekpo AS post
        ON header~ebeln = post~ebeln
      INTO TABLE @lt_ekko_ekpo
      WHERE header~bukrs = '1710'
        AND header~ernam = 'S4H_CO'
        AND ( post~matkl = 'ZFRAME' OR post~matkl = 'ZHANDLE' OR post~matkl = 'ZSEAT' ).

    IF sy-subrc <> 0.
      MESSAGE 'Error select_where' TYPE 'E'.
    ENDIF.

## 🌺 BONNES PRATIQUES

| 🍧 Bonnes pratiques                   | 🍧 Explication                                            |
| ------------------------------------- | --------------------------------------------------------- |
| Toujours utiliser les parenthèses     | Pour éviter les erreurs d’ordre dans les conditions       |
| Combiner AND / OR avec logique claire | Facilite la lecture et la maintenance du code             |
| Limiter les données retournées        | Optimise les performances, surtout sur les grandes tables |
