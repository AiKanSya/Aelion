# 🌸 IS INITIAL

## 🌺 OBJECTIFS

- [ ] Comprendre l'utilisation de `IS INITIAL` pour tester si une variable est vide ou contient sa valeur par défaut
- [ ] Savoir utiliser `IS NOT INITIAL` pour vérifier qu’une variable contient une valeur
- [ ] Appliquer `IS INITIAL` avec `IF` pour les conditions simples
- [ ] Appliquer `IS INITIAL` avec `CASE` pour gérer plusieurs cas
- [ ] Simplifier les tests de variables non initialisées ou vides

## 🌺 DEFINITION

> L’instruction `IS INITIAL` permet de tester si une variable est initialisée ou non.
>
> - `IS INITIAL` retourne vrai si la variable est vide ou contient la valeur par défaut pour son type.
> - `IS NOT INITIAL` retourne vrai si la variable contient une valeur.

> [!TIP]
> comme vérifier si une boîte est vide ou contient quelque chose

> [!IMPORTANT]
> très pratique pour éviter des erreurs lorsque l’on travaille sur des variables qui peuvent ne pas être encore remplies

## 🌺 SYNTAXE

### AVEC IF

    IF operand IS [NOT] INITIAL.
      [statement_block]
    ENDIF.

### AVEC CASE

    CASE operand.
      [WHEN IS [NOT] INITIAL].
        [statement_block1]
      ...
      [WHEN OTHERS].
        [statement_blockn]
    ENDCASE.

> [!NOTE]
> Le `IS INITIAL` fonctionne pour tous les types de variables : chaînes, nombres, dates, heures, tables internes.

## 🌺 IF IS INITIAL

    WRITE:/ '     - IS INITIAL + IF...'.

    DATA: lv_text TYPE string,
          lv_num  TYPE i.

    lv_text = ''.
    lv_num  = 0.

    IF lv_text IS INITIAL.
      WRITE:/ 'La variable lv_text est vide'.
    ENDIF.

    IF lv_num IS NOT INITIAL.
      WRITE:/ 'La variable lv_num contient une valeur'.
    ENDIF.

> [!TIP]
> vérifier une boîte avant de l’utiliser : si elle est vide, on peut la remplir, sinon on lit son contenu

## 🌺 RESUME

> - `IS INITIAL` teste si une variable est vide ou contient sa valeur par défaut.
> - `IS NOT INITIAL` teste si la variable contient une valeur.
> - Fonctionne pour tous les types de variables : chaînes, nombres, dates, tables internes.
>
> [!TIP]
> comme vérifier si une boîte est vide ou remplie avant d’agir sur son contenu
