# 🌸 READ TABLE

## 🌺 OBJECTIFS

- [ ] Lire une ligne d’une table interne avec `READ TABLE`
- [ ] Utiliser les options `WITH KEY`, `INDEX` pour localiser la ligne
- [ ] Comprendre les modes de stockage du résultat : `INTO`, `ASSIGNING`, `TRANSPORTING NO FIELDS`
- [ ] Maîtriser l’usage de FIELD-SYMBOLS pour manipuler directement la mémoire
- [ ] Vérifier les retours avec `SY-SUBRC` et connaître l’index via `SY-TABIX`

## 🌺 DEFINITION

    READ TABLE itab
      { INTO ls | ASSIGNING <lfs_> | TRANSPORTING NO FIELDS }
      { FROM ls | WITH KEY { comp1 = obj1 comp2 = obj2 ... } [BINARY SEARCH] | INDEX idx }.

> L’instruction `READ TABLE` permet de lire une ligne d’une table interne (`itab`) selon différents critères.

> [!TIP]
> rechercher une fiche dans un classeur, soit par exemple de fiche, soit par critère précis, soit par numéro.

## 🌺 EXEMPLES AVEC STRUCTURE

### READ AVEC UNE STRUCTURE ET CONDITION

> [!TIP]
> Version simple du READ avec une condition où les données de la ligne trouvée/lue sont stockées dans une structure déclarée en amont.

> [!CAUTION]
> Les conditions sont indispensables pour identifier la ligne souhaité. Il est donc impératif de bien renseigner le ou les conditions nécessaires à son identification.

    DATA: ls_struct TYPE ty_struct.

    READ TABLE lt_citizen INTO ls_struct WITH KEY country = 'FR'.
    IF sy-subrc = 0.
      WRITE:/ 'READ FROM structure :', ls_struct-country, ls_struct-name, ls_struct-age.
    ENDIF.

### READ AVEC UNE STRUCTURE ET CONDITIONS

> [!TIP]
> Version simple du READ avec plusieurs conditions où les données de la ligne trouvée/lue sont stockées dans une structure déclarée en amont.

> [!CAUTION]
> Les conditions sont indispensables pour identifier la ligne souhaité. Il est donc impératif de bien renseigner le ou les conditions nécessaires à son identification.

    DATA: ls_struct TYPE ty_struct.

    READ TABLE lt_citizen INTO ls_struct WITH KEY country = 'FR' name = 'Thierry'.
    IF sy-subrc = 0.
      WRITE:/ 'READ FROM structure :', ls_struct-country, ls_struct-name, ls_struct-age.
    ENDIF.

### READ AVEC UNE STRUCTURE SUR LA 1ERE LIGNE (INDEX 1)

> [!TIP]
> Version du READ ciblant la 1ère ligne où les données de cette ligne sont pointées dans un field-symbol déclaré en amont.

    DATA: ls_struct TYPE ty_struct.

    READ TABLE lt_citizen INTO ls_struct INDEX 1.
    IF sy-subrc = 0.
      WRITE:/ 'READ FROM structure :', ls_struct-country, ls_struct-name, ls_struct-age.
    ENDIF.

### READ AVEC UNE STRUCTURE ET CONDITION + PARAMETRE TRANSPORTING NO FIELDS

> [!TIP]
> Version simple du READ avec une condition où aucune donnée n'est récupérée. Ici le READ sert avant tout a vérifier la présence d'une entrée correspondante.

> [!CAUTION]
> Les conditions sont indispensables pour identifier la ligne souhaité. Il est donc impératif de bien renseigner le ou les conditions nécessaires à son identification.

    DATA: ls_struct TYPE ty_struct.

    READ TABLE lt_citizen WITH KEY country = 'FR' TRANSPORTING NO FIELDS.
    IF sy-subrc = 0.
      WRITE:/ 'Nous avons bien trouvé une ligne !'.
    ENDIF.

### READ AVEC STRUCTURE DECLAREE DYNAMIQUEMENT

> [!TIP]
> Version simple du READ avec plusieurs conditions où les données de la ligne trouvée/lue sont stockées dans une structure déclarée dynamiquement.

> [!CAUTION]
> Les conditions sont indispensables pour identifier la ligne souhaité. Il est donc impératif de bien renseigner le ou les conditions nécessaires à son identification.

    READ TABLE lt_citizen INTO DATA(ls_struct) WITH KEY country = 'FR' name = 'Thierry'.
    IF sy-subrc = 0.
      WRITE:/ 'READ FROM structure :', ls_struct-country, ls_struct-name, ls_struct-age.
    ENDIF.

## 🌺 EXEMPLES AVEC FIELD-SYMBOL

### READ AVEC FIELD-SYMBOL ET CONDITION

> [!TIP]
> Version du READ ciblant une ligne via condition et où les données de cette ligne sont pointées dans un field-symbol déclaré en amont.

> [!CAUTION]
> Les conditions sont indispensables pour identifier la ligne souhaité. Il est donc impératif de bien renseigner le ou les conditions nécessaires à son identification.

    FIELD-SYMBOLS: <lfs_citizen> TYPE ty_citizen.

    READ TABLE lt_citizen ASSIGNING <lfs_citizen> WITH KEY country = 'FR'.
    IF sy-subrc = 0.
      WRITE:/ 'READ FROM structure :', <lfs_citizen>-country, <lfs_citizen>-name, <lfs_citizen>-age.
    ENDIF.

### READ AVEC FIELD-SYMBOL ET CONDITIONS

> [!TIP]
> Version du READ ciblant une ligne via conditions et où les données de cette ligne sont pointées dans un field-symbol déclaré en amont.

> [!CAUTION]
> Les conditions sont indispensables pour identifier la ligne souhaité. Il est donc impératif de bien renseigner le ou les conditions nécessaires à son identification.

    FIELD-SYMBOLS: <lfs_citizen> TYPE ty_citizen.

    READ TABLE lt_citizen ASSIGNING <lfs_citizen> WITH KEY country = 'FR' name = 'Thierry'.
    IF sy-subrc = 0.
      WRITE:/ 'READ FROM structure :', <lfs_citizen>-country, <lfs_citizen>-name, <lfs_citizen>-age.
    ENDIF.

### READ AVEC FIELD-SYMBOL SUR LA 1ERE LIGNE (INDEX 1)

> [!TIP]
> Version du READ ciblant la 1ère ligne où les données de cette ligne sont pointées dans un field-symbol déclaré en amont.

    FIELD-SYMBOLS: <lfs_citizen> TYPE ty_citizen.

    READ TABLE lt_citizen ASSIGNING <lfs_citizen> INDEX 1.
    IF sy-subrc = 0.
      WRITE:/ 'READ FROM structure :', <lfs_citizen>-country, <lfs_citizen>-name, <lfs_citizen>-age.
    ENDIF.

### READ AVEC FIELD-SYMBOL AVEC CONDITION + PARAMETRE TRANSPORTING NO FIELDS

> [!TIP]
> Version du READ avec une condition où aucune donnée n'est récupérée. Ici le READ sert avant tout a vérifier la présence d'une entrée correspondante.

> [!CAUTION]
> Les conditions sont indispensables pour identifier la ligne souhaité. Il est donc impératif de bien renseigner le ou les conditions nécessaires à son identification.

    FIELD-SYMBOLS: <lfs_citizen> TYPE ty_citizen.

    READ TABLE lt_citizen ASSIGNING <lfs_citizen> WITH KEY country = 'FR' TRANSPORTING NO FIELDS.
    IF sy-subrc = 0.
      WRITE:/ 'Nous avons bien trouvé une ligne !'.
    ENDIF.

### READ AVEC FIELD-SYMBOL DECLAREE DYNAMIQUEMENT

> [!TIP]
> Version simple du READ avec plusieurs conditions où les données de la ligne trouvée/lue sont pointées dans une structure déclarée dynamiquement.

> [!CAUTION]
> Les conditions sont indispensables pour identifier la ligne souhaité. Il est donc impératif de bien renseigner le ou les conditions nécessaires à son identification.

    READ TABLE lt_citizen ASSIGNING FIELD-SYMBOL(<lfs_citizen>) WITH KEY country = 'FR' name = 'Thierry'.
    IF sy-subrc = 0.
      WRITE:/ 'READ FROM structure :', <lfs_citizen>-country, <lfs_citizen>-name, <lfs_citizen>-age.
    ENDIF.

## 🌺 BONNES PRATIQUES

| 🍧 Bonne pratique                          | 🍧 Explication                                                 |
| ------------------------------------------ | -------------------------------------------------------------- |
| Toujours tester `SY-SUBRC`                 | Assure que la ligne a été trouvée avant d’accéder aux champs   |
| Utiliser `ASSIGNING <fs>` pour performance | Évite la copie de la ligne, modifie directement la mémoire     |
| `TRANSPORTING NO FIELDS` pour vérification | Vérifie juste l’existence sans copier ni modifier              |
| Comparer avec READ TABLE INDEX et KEY      | Savoir choisir la méthode adaptée au type de table et à la clé |

## 🌺 RESUME

> `READ TABLE` permet de localiser et accéder à une ligne dans une table interne.
>
> - Options de recherche : `WITH KEY`, `INDEX`
> - Options de récupération : `INTO`, `ASSIGNING`, `TRANSPORTING NO FIELDS`
> - Variables système : `SY-SUBRC` et `SY-TABIX`
>
> [!TIP]
> rechercher une fiche dans un classeur et pointer directement dessus pour modification.
