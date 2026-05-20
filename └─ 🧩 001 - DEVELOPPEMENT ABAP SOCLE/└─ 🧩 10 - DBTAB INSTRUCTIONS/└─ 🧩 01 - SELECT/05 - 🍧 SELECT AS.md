# 🌸 COL AS ALIAS – RENOMMER LES CHAMPS

## 🌺 OBJECTIFS

- [ ] Comprendre l’utilisation des alias pour renommer des colonnes
- [ ] Faciliter la lecture et la compréhension des champs sélectionnés
- [ ] Appliquer les alias dans une sélection DISTINCT ou normale
- [ ] Stocker les résultats dans une table interne avec les nouveaux noms

## 🌺 DEFINITION

> L’instruction `AS alias` permet de renommer une colonne dans le résultat d’une requête ABAP.  
> Cela rend le titre des colonnes plus significatif ou plus lisible dans le programme.

> [!TIP]
> Imaginez un classeur Excel où les colonnes ont des noms techniques (ex : `CAR_BRAND`).  
> Vous pouvez créer un titre simplifié (`Marque`) pour chaque colonne, sans modifier la table originale.

> [!IMPORTANT]
> Les alias facilitent la lecture, surtout dans les rapports ou lorsqu’on combine plusieurs colonnes avec DISTINCT ou JOIN.

> [!CAUTION]
> L’alias n’existe que dans le contexte du SELECT. Il ne modifie ni la table ni les champs dans la base SAP.

## 🌺 EXEMPLE

### PERFORM SELECT_AS

    TYPES: BEGIN OF ty_ekpo,
            doc_achat    TYPE ekpo-ebeln,
            article      TYPE ekpo-matnr,
            designation  TYPE ekpo-txz01,
            grp_marchand TYPE ekpo-matkl,
          END OF ty_ekpo.

    DATA: lt_ekpo TYPE STANDARD TABLE OF ty_ekpo.

    SELECT ebeln AS doc_achat
          matnr AS article
          txz01 AS designation
          matkl AS grp_marchand
      FROM ekpo
      INTO TABLE lt_ekpo
      WHERE ebeln = '4500000106'.

    IF sy-subrc <> 0.
      MESSAGE 'Error select_as' TYPE 'E'.
    ENDIF.

## 🌺 BONNES PRATIQUES

| 🍧 Bonnes pratiques                  | 🍧 Explication                                                |
| ------------------------------------ | ------------------------------------------------------------- |
| Toujours utiliser des alias clairs   | Facilite la lecture et la compréhension du code               |
| Ne pas abuser des alias complexes    | Reste simple pour les utilisateurs et développeurs            |
| Utiliser les alias dans les rapports | Les noms personnalisés améliorent la lisibilité des résultats |

> [!IMPORTANT]
>
> - Pour renommer des colonnes dans des requêtes complexes
> - Pour améliorer la lisibilité des résultats dans les tables internes ou les rapports ABAP

> [!TIP]
> Les alias peuvent être utilisés avec n’importe quel SELECT, y compris ceux utilisant JOIN ou WHERE. Cela améliore la clarté et évite les confusions lors du traitement des données.
