# 🌸 SPLIT

## 🌺 OBJECTIFS

- [ ] Comprendre l'utilisation de l'instruction `SPLIT` en ABAP
- [ ] Séparer une chaîne de caractères selon un séparateur défini
- [ ] Stocker le résultat dans des `VARIABLES` ou une table interne

## 🌺 DEFINITION

> `SPLIT` permet de découper une chaîne de caractères selon un séparateur et de stocker chaque partie dans une variable ou une table interne.

> [!TIP]
> Prendre une phrase et couper chaque mot pour le mettre dans des boîtes séparées.

## 🌺 SYNTAXE

    SPLIT dobj
      AT sep
      INTO { {result1 result2 ...} | {TABLE itab} }
      [IN {BYTE|CHARACTER} MODE].

- dobj : chaîne de caractères à séparer
- AT sep : caractère séparateur
- INTO result1 result2 ... : variables pour recevoir les morceaux
- INTO TABLE itab : table interne pour recevoir tous les morceaux
- IN BYTE|CHARACTER MODE : mode de traitement des caractères

> [!TIP]
>
> - `IN BYTE MODE` = travailler en mode binaire pur (peu utilisé)
> - `IN CHARACTER MODE` = travailler sur les caractères comme des lettres

## 🌺 EXEMPLE DE BASE

    WRITE:/ '     - SPLIT...'.

    DATA: lv_text1(20) TYPE C,
          lv_text2(20) TYPE C,
          lv_text3(20) TYPE C,
          lv_text4(20) TYPE C,
          lv_text5(20) TYPE C.

    CONSTANTS: lc_string(50) TYPE C VALUE 'Hello World Bienvenue sur SAP'.

    SPLIT lc_string
      AT space
      INTO lv_text1 lv_text2 lv_text3 lv_text4 lv_text5.

    WRITE:/ 'lv_text1 : ', lv_text1,
          / 'lv_text2 : ', lv_text2,
          / 'lv_text3 : ', lv_text3,
          / 'lv_text4 : ', lv_text4,
          / 'lv_text5 : ', lv_text5.

> [!TIP]
> Chaque mot de la phrase est mis dans une boîte distincte

## 🌺 DECLARATION DYNAMIQUE

- Les variables peuvent être créées directement dans l’instruction `SPLIT`

      WRITE:/ '     - SPLIT DYNAMIQUE...'.

      CONSTANTS: lc_string(50) TYPE C VALUE 'Hello World Bienvenue sur SAP'.

      SPLIT lc_string AT space
        INTO DATA(lv_text1)
            DATA(lv_text2)
            DATA(lv_text3)
            DATA(lv_text4)
            DATA(lv_text5).

- Les variables `lv_text1` à `lv_text5` sont automatiquement de type `STRING`

- Pour une table interne :

      CONSTANTS: lc_string(50) TYPE C VALUE 'Hello World Bienvenue sur SAP'.

      SPLIT lc_string AT space INTO TABLE DATA(tab_result).

> [!TIP]
> Chaque mot devient un élément d'une liste

> [!TIP]
>
> - Visualiser la chaîne comme une phrase à découper en mots
> - `SPLIT` est l’inverse de `CONCATENATE` : on passe de la phrase complète aux morceaux
> - Très utile pour analyser ou transformer des données textuelles

## 🌺 RESUME

> - `SPLIT` = découper une chaîne selon un séparateur
> - Résultat dans variables individuelles ou table interne
>
> [!TIP]
> mettre chaque mot dans une boîte séparée ou dans une liste
