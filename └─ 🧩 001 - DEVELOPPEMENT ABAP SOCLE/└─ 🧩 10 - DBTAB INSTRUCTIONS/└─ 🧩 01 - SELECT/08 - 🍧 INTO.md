# 🌸 INTO – STOCKER LES RESULTATS D'UN SELECT

## 🌺 OBJECTIFS

- [ ] Maîtriser les différentes variantes de INTO pour stocker les résultats d’un SELECT
- [ ] Comprendre l’usage dans les variables, structures et tables internes
- [ ] Appliquer INTO CORRESPONDING FIELDS OF pour associer correctement les champs
- [ ] Utiliser APPENDING pour ajouter des résultats sans écraser les précédents

## 🌺 DEFINITION

> L’instruction INTO définit où stocker le résultat d’un SELECT :
>
> - Dans une variable simple
> - Dans une structure
> - Dans une table interne
> - Dans une structure ou table interne déclarée directement dans la requête avec `@DATA`
> - Avec correspondance des champs pour ne pas dépendre de l’ordre des colonnes
> - Avec APPENDING pour ajouter des lignes sans écraser les existantes

> [!TIP]
> Comme dans un classeur Excel, vous pouvez copier les résultats d’une requête dans :
>
> - Une seule cellule (variable)
> - Une ligne (structure)
> - Une feuille complète (table interne)  
>   Vous pouvez également compléter la feuille existante sans supprimer les données déjà présentes.

## 🌺 SYNTAXES PRINCIPALES

### INTO Variable

        INTO lv_variable

### INTO structure

        INTO ls_structure

### INTO Table

        INTO TABLE lt_table

### INTO Variables multiples

        INTO (lv_var1, lv_var2, lv_var3, ...)

### INTO @DATA structure

        INTO @DATA(ls_structure)

### INTO @DATA table interne

        INTO @DATA(lt_table)

### INTO (@DATA variables)

        INTO (@DATA(lv_var1), @DATA(lv_var2), ...)

### INTO Corresponding Fields Of

        INTO CORRESPONDING FIELDS OF ls_structure
        INTO CORRESPONDING FIELDS OF TABLE lt_table

### APPENDING Table

        APPENDING [CORRESPONDING FIELDS OF] TABLE lt_table

## 🌺 BONNES PRATIQUES

| 🍧 Bonnes pratiques                                                           | 🍧 Explication                                         |
| ----------------------------------------------------------------------------- | ------------------------------------------------------ |
| Utiliser INTO CORRESPONDING FIELDS OF                                         | Pour éviter les erreurs si l’ordre des colonnes change |
| Préférer APPENDING pour ajouter des lignes                                    | Permet d’éviter de supprimer les données existantes    |
| Déclarer directement les tables/structures avec @DATA                         | Simplifie le code et évite les déclarations multiples  |
| Toujours utiliser des FIELD-SYMBOLS ou LIKE LINE OF pour parcourir les tables | Facilite l’accès aux données lors du LOOP              |

> [!TIP]
> Les exercices permettent de visualiser la différence entre `INTO`, `INTO TABLE`, `CORRESPONDING FIELDS` et `APPENDING`.
