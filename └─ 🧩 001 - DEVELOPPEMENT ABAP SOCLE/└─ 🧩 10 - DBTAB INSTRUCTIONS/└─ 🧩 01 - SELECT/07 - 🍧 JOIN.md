# 🌸 JOIN – COMBINER DES TABLES SAP

## 🌺 OBJECTIFS

- [ ] Comprendre l’utilisation des JOINS pour combiner des données de plusieurs tables
- [ ] Différencier INNER JOIN, LEFT JOIN, et RIGHT JOIN
- [ ] Appliquer les alias pour simplifier les références aux tables
- [ ] Utiliser les tables internes pour stocker et parcourir les résultats

## 🌺 DEFINITION

> Un JOIN permet de sélectionner des données de plusieurs tables associées par un ou plusieurs champs communs (`ON`).
>
> - INNER JOIN : sélectionne uniquement les lignes présentes dans les deux tables.
> - LEFT JOIN : sélectionne toutes les lignes de la table de gauche, en ajoutant les lignes correspondantes de la table de droite ou des valeurs nulles si absence de correspondance.
> - RIGHT JOIN : sélectionne toutes les lignes de la table de droite, avec les valeurs de la table de gauche ou nulles si absence de correspondance.

> [!TIP]
> Imaginez deux classeurs Excel : l’un pour les modèles de voitures, l’autre pour les conducteurs.
>
> - INNER JOIN : seules les combinaisons voiture/conducteur existantes dans les deux classeurs sont conservées.
> - LEFT JOIN : toutes les voitures apparaissent, même si aucun conducteur n’est associé.
> - RIGHT JOIN : tous les conducteurs apparaissent, même si aucune voiture ne leur correspond.

## 🌺 EXEMPLE

### INNER JOIN

    TYPES: BEGIN OF ty_ekko_ekpo,
            ebeln TYPE ekko-ebeln,
            bukrs TYPE ekko-bukrs,
            ebelp TYPE ekpo-ebelp,
            txz01 TYPE ekpo-txz01,
            matkl TYPE ekpo-matkl,
          END OF ty_ekko_ekpo.

    DATA: lt_ekko_ekpo TYPE STANDARD TABLE OF ty_ekko_ekpo.

    SELECT ekko~ebeln,
          ekko~bukrs,
          ekpo~ebelp,
          ekpo~txz01,
          ekpo~matkl
      FROM ekko
      INNER JOIN ekpo ON ekko~ebeln = ekpo~ebeln
      INTO TABLE @lt_ekko_ekpo
      WHERE ekko~ebeln = '4500000106'.

    IF sy-subrc <> 0.
      MESSAGE 'Error select_join' TYPE 'E'.
    ENDIF.

### INNER JOIN AS ALIAS

    TYPES: BEGIN OF ty_ekko_ekpo,
            ebeln TYPE ekko-ebeln,
            bukrs TYPE ekko-bukrs,
            ebelp TYPE ekpo-ebelp,
            txz01 TYPE ekpo-txz01,
            matkl TYPE ekpo-matkl,
          END OF ty_ekko_ekpo.

    DATA: lt_ekko_ekpo TYPE STANDARD TABLE OF ty_ekko_ekpo.

    SELECT header~ebeln,
          header~bukrs,
          post~ebelp,
          post~txz01,
          post~matkl
      FROM ekko AS header
      INNER JOIN ekpo AS post
        ON header~ebeln = post~ebeln
      INTO TABLE @lt_ekko_ekpo
      WHERE header~ebeln = '4500000106'.

    IF sy-subrc <> 0.
      MESSAGE 'Error select_join' TYPE 'E'.
    ENDIF.

### LEFT JOIN

    TYPES: BEGIN OF ty_ekko_ekpo,
            ebeln TYPE ekko-ebeln,
            bukrs TYPE ekko-bukrs,
            ebelp TYPE ekpo-ebelp,
            txz01 TYPE ekpo-txz01,
            matkl TYPE ekpo-matkl,
          END OF ty_ekko_ekpo.

    DATA: lt_ekko_ekpo TYPE STANDARD TABLE OF ty_ekko_ekpo.

    SELECT header~ebeln,
          header~bukrs,
          post~ebelp,
          post~txz01,
          post~matkl
      FROM ekko AS header
      LEFT JOIN ekpo AS post
        ON header~ebeln = post~ebeln
      INTO TABLE @lt_ekko_ekpo
      WHERE header~ebeln = '4500000106'.

    IF sy-subrc <> 0.
      MESSAGE 'Error select_join' TYPE 'E'.
    ENDIF.

### RIGHT JOIN

    TYPES: BEGIN OF ty_ekko_ekpo,
            ebeln TYPE ekko-ebeln,
            bukrs TYPE ekko-bukrs,
            ebelp TYPE ekpo-ebelp,
            txz01 TYPE ekpo-txz01,
            matkl TYPE ekpo-matkl,
          END OF ty_ekko_ekpo.

    DATA: lt_ekko_ekpo TYPE STANDARD TABLE OF ty_ekko_ekpo.

    SELECT header~ebeln,
          header~bukrs,
          post~ebelp,
          post~txz01,
          post~matkl
      FROM ekko AS header
      RIGHT JOIN ekpo AS post
        ON header~ebeln = post~ebeln
      INTO TABLE @lt_ekko_ekpo
      WHERE header~ebeln = '4500000106'.

    IF sy-subrc <> 0.
      MESSAGE 'Error select_join' TYPE 'E'.
    ENDIF.

## 🌺 BONNES PRATIQUES

| 🍧 Bonnes pratiques                                          | 🍧 Explication                                       |
| ------------------------------------------------------------ | ---------------------------------------------------- |
| Toujours utiliser des alias pour les tables                  | Facilite la lecture et la maintenance du code        |
| Préférer INNER JOIN pour les correspondances exactes         | Evite les lignes avec valeurs nulles inutiles        |
| LEFT/RIGHT JOIN pour conserver toutes les lignes d’une table | Utile pour les rapports complets                     |
| Utiliser COALESCE pour remplacer les valeurs nulles          | Rend la sortie plus lisible                          |
| Documenter les conditions de jointure                        | Facilite la compréhension des relations entre tables |

> [!TIP]
> Les alias simplifient les colonnes dans les SELECT complexes.  
> Les exercices permettent de comprendre l’impact des différents types de JOIN sur les résultats.
