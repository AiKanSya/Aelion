# 🌸 FROM (AS ALIAS) – TABLE SOURCE ET ALIAS

## 🌺 OBJECTIFS

- [ ] Comprendre l’utilisation de FROM pour indiquer la table source en ABAP
- [ ] Appliquer un alias pour simplifier la référence à la table dans la requête
- [ ] Utiliser les alias dans la sélection de colonnes
- [ ] Stocker les résultats dans une table interne et les parcourir

## 🌺 DEFINITION

> L’instruction `FROM` indique la table source à partir de laquelle les données seront récupérées.  
> L’option `AS alias` permet de donner un nom court à la table dans la requête, facilitant la lecture et la référence dans les conditions.

> [!TIP]
> Imaginez un classeur Excel appelé `ekpo`.  
> Vous pouvez lui donner temporairement un surnom `a` pour simplifier vos formules ou filtres, sans changer le nom réel du classeur.

> [!IMPORTANT]  
> L’alias est particulièrement utile pour raccourcir le code et rendre les références aux colonnes plus lisibles.

## 🌺 EXEMPLE

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
      FROM ekpo as a
      INTO TABLE lt_ekpo
      WHERE a~ebeln = '4500000106'.

    IF sy-subrc <> 0.
      MESSAGE 'Error select_from_as' TYPE 'E'.
    ENDIF.

> [!NOTE]  
> L’alias ne modifie pas la table source, il simplifie seulement l’écriture et la lecture dans le programme.

> [!CAUTION]
> Ne pas oublier le tilde (`~`) pour accéder aux colonnes via l’alias.

## 🌺 BONNES PRATIQUES

| 🍧 Bonnes pratiques                                      | 🍧 Explication                               |
| -------------------------------------------------------- | -------------------------------------------- |
| Toujours utiliser un alias pour clarifier les références | Simplifie la lecture du code                 |
| Choisir un nom court et significatif                     | Facilite la relecture et la maintenance      |
| Notation alias~colonne                                   | Utiliser pour accéder aux champs via l’alias |
| Documenter les alias                                     | Indiquer ce que chaque alias représente      |

> [!IMPORTANT]
>
> - Simplifier les requêtes avec plusieurs colonnes
> - Faciliter la lecture du code pour les débutants
> - Préparer le terrain avant d’aborder les sous-requêtes et les JOIN
