# 🌸 SELECT DISTINCT – EXTRACTION DE VALEURS UNIQUES

## 🌺 OBJECTIFS

- [ ] Comprendre l’utilité de DISTINCT en ABAP
- [ ] Supprimer les doublons lors d’une sélection
- [ ] Récupérer une liste claire de valeurs uniques
- [ ] Stocker les résultats dans une table interne et les parcourir avec une boucle

## 🌺 DEFINITION

> L’instruction DISTINCT permet de sélectionner uniquement des valeurs uniques, en supprimant tous les doublons d’une table SAP.
>
> [!TIP]
> Imaginez un classeur Excel contenant plusieurs lignes pour chaque voiture : certaines marques et modèles apparaissent plusieurs fois.  
> Avec `DISTINCT`, vous gardez une seule occurrence de chaque marque/modèle, comme un catalogue simplifié.

> [!IMPORTANT]
> DISTINCT s’applique sur tous les champs sélectionnés : la combinaison des valeurs doit être unique pour qu’une ligne soit conservée.

> [!CAUTION]
> DISTINCT ne modifie pas la table d’origine. Elle ne fait que filtrer les doublons dans le résultat de la requête.  
> Utiliser DISTINCT sur de très grandes tables peut avoir un impact sur les performances.

## 🌺 SYNTAXE

    SELECT DISTINCT col1 col2 ...
      FROM table
      INTO TABLE @itab
      WHERE condition.

> [!NOTE]
>
> - `col1 col2 ...` : colonnes pour lesquelles les combinaisons doivent être uniques
> - `table` : table SAP ciblée
> - `itab` : table interne qui stockera les résultats uniques

## 🌺 EXEMPLE

### PERFORM SELECT_DISTINCT

    TYPES: BEGIN OF ty_ekpo,
            ebeln TYPE ekpo-ebeln,
            matnr TYPE ekpo-matnr,
            txz01 TYPE ekpo-txz01,
            matkl TYPE ekpo-matkl,
          END OF ty_ekpo.

    DATA: lt_ekpo TYPE STANDARD TABLE OF ty_ekpo.

    SELECT DISTINCT ebeln matnr txz01 matkl
      FROM ekpo
      INTO table lt_ekpo
      WHERE ebeln = '4500000106'.

    IF sy-subrc <> 0.
      MESSAGE 'Error select_distinct' TYPE 'E'.
    ENDIF.

> [!TIP]
> On parcourt la liste Excel et on ne garde qu’une seule ligne pour chaque combinaison marque/modèle.

### PERFORM SELECT_DISTINCT_ALL

    SELECT DISTINCT *
      FROM ekpo
      INTO table lt_ekpo_all
      WHERE ebeln = '4500000106'.

    IF sy-subrc <> 0.
      MESSAGE 'Error select_distinct_all' TYPE 'E'.
    ENDIF.

## 🌺 BONNES PRATIQUES

| 🍧 Bonnes pratiques                                 | 🍧 Explication                                                    |
| --------------------------------------------------- | ----------------------------------------------------------------- |
| Utiliser DISTINCT uniquement si nécessaire          | Évite de surcharger le serveur avec de gros volumes de données    |
| Toujours stocker le résultat dans une table interne | Permet de parcourir et manipuler facilement les lignes uniques    |
| Vérifier les champs sélectionnés                    | DISTINCT agit sur la combinaison des colonnes sélectionnées       |
| Ajouter une clause WHERE si possible                | Réduit le nombre de lignes à traiter et améliore les performances |

> [!IMPORTANT]
>
> - Pour obtenir une liste de valeurs uniques à afficher ou à utiliser dans un programme
> - Pour préparer des données pour des listes déroulantes ou des rapports simplifiés

> [!TIP]
> Tester DISTINCT avec un petit échantillon permet de bien visualiser quelles lignes sont supprimées et comment fonctionne le filtrage.
