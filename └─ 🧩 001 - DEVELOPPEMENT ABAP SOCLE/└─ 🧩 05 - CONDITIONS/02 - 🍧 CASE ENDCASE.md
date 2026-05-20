# 🌸 CASE ... ENDCASE

## 🌺 OBJECTIFS

- [ ] Comprendre le fonctionnement de l’instruction `CASE` en ABAP
- [ ] Savoir tester une variable et exécuter des traitements selon sa valeur
- [ ] Apprendre à utiliser `WHEN`, `OR` et `WHEN OTHERS` pour gérer tous les cas possibles
- [ ] Éviter les comportements inattendus en prévoyant un traitement par défaut

## 🌺 DEFINITION

> L’instruction `CASE` permet de vérifier la valeur d’une (seule) variable et d’exécuter différents traitements selon cette valeur.

> [!TIP]
> Comme un feu tricolore : selon la couleur (valeur), vous effectuez une action différente (stop, avancer, ralentir).

> [!IMPORTANT]
> Le `CASE` est souvent plus lisible qu’une série de `IF ... ELSEIF ... ELSE` quand on a plusieurs valeurs à tester pour la même variable.

## 🌺 SYNTAXE

    CASE operand.
      [WHEN operand1 [OR operand2 [OR operand3 [...]]].
        [statement_block1]]
      ...
      [WHEN OTHERS.
        [statement_blockn]]
    ENDCASE.

- `operand` : variable à tester
- `WHEN` : définit une ou plusieurs valeurs et le traitement associé
- `OR` : permet d’associer plusieurs valeurs pour un même traitement
- `WHEN OTHERS` : optionnel, capture tous les cas non prévus

> [!TIP]
> Toujours prévoir un `WHEN OTHERS` pour éviter des comportements inattendus si la valeur de la variable n’est pas dans les cas définis.

> [!IMPORTANT]
> Préférer `CASE` lorsque plusieurs valeurs d’une même variable doivent déclencher des traitements distincts, pour une meilleure lisibilité et maintenance du code.

## 🌺 EXEMPLE

    WRITE:/ '     - CASE ENDCASE...'.

    DATA: lv_month TYPE i.

    lv_month = SY-DATUM+4(2).

    CASE lv_month.
      WHEN 12 OR 1 OR 2.
        WRITE:/'C''est l''hiver'.
      WHEN 3 OR 4 OR 5.
        WRITE:/'C''est le printemps'.
      WHEN 6 OR 7 OR 8.
        WRITE:/'C''est l''été'.
      WHEN 9 OR 10 OR 11.
        WRITE:/'C''est l''automne'.
      WHEN OTHERS.
        WRITE:/'Y a plus de saison!'.
    ENDCASE.

> [!TIP]
> Le programme lit la variable `lv_month` comme si on lisait un choix de menu : selon la valeur, une action spécifique est effectuée.

## 🌺 RESUME

> - `CASE` teste une variable pour exécuter différents traitements selon sa valeur.
> - `WHEN` définit les valeurs possibles et le traitement associé.
> - `OR` permet de regrouper plusieurs valeurs sous un même traitement.
> - `WHEN OTHERS` capture toutes les valeurs non prévues pour éviter des erreurs.
>
> [!TIP]
> Comme un menu avec plusieurs options : selon le choix de l’utilisateur, une action différente sera exécutée.
