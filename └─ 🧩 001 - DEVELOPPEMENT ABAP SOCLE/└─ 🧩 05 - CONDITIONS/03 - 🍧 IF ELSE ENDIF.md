# 🌸 IF ... ENDIF

## 🌺 OBJECTIFS

- [ ] Comprendre le fonctionnement de l’instruction `IF` en ABAP
- [ ] Savoir tester une ou plusieurs conditions avec `IF`, `ELSEIF` et `ELSE`
- [ ] Apprendre à combiner les conditions avec `AND` et `OR`
- [ ] Prévenir les erreurs et comportements inattendus (ex : division par zéro)
- [ ] Savoir organiser correctement les conditions pour respecter la priorité `AND` / `OR`

## 🌺 DEFINITION

> L’instruction `IF` permet de tester une condition sur une variable et d’exécuter un traitement uniquement si cette condition est vraie.  
> Elle peut être complétée par `ELSEIF` pour tester d’autres conditions et `ELSE` pour gérer tous les cas restants.

> [!TIP]
> Comme un passage piéton : si le feu est vert, vous traversez ; si le feu est orange, vous ralentissez ; sinon vous attendez.

> [!IMPORTANT] > `IF` est la structure de contrôle la plus simple pour gérer une logique conditionnelle dans ABAP.  
> La bonne utilisation de `AND` et `OR` permet de combiner plusieurs conditions logiques efficacement.

## 🌺 SYNTAXE

    IF log_exp1.
      [statement_block1]
    [ELSEIF log_exp2.
      [statement_block2]]
    ...
    [ELSE.
      [statement_blockn]]
    ENDIF.

- `log_exp` : expression logique à tester
- `ELSEIF` : permet de tester une autre condition si la première est fausse
- `ELSE` : exécute le traitement si toutes les conditions précédentes sont fausses

> [!NOTE]
> Les blocs `IF`/`ELSEIF`/`ELSE` doivent être correctement indentés pour une meilleure lisibilité du code.

## 🌺 EXEMPLES

### EXEMPLE SIMPLE

    WRITE:/ '     - IF SIMPLE...'.

    DATA: lv_a TYPE I,
          lv_b TYPE I,
          lv_c TYPE I.

    lv_b = 3.
    lv_c = 2.
    lv_a = lv_b + lv_c.

    IF lv_a = 5.
      WRITE:/ 'Condition confirmée, lv_a = 5'.
    ENDIF.

> [!TIP]
> Vérifier si un objet a la valeur attendue avant de passer à l’action suivante.

### AVEC ELSEIF ET ELSE

    WRITE:/ '     - IF ELSEIF...'.

    DATA lv_month TYPE I.
    lv_month = SY-DATUM+4(2).

    IF lv_month = 1.
      WRITE:/'C''est le mois de janvier'.
    ELSEIF lv_month = 2.
      WRITE:/'C''est le mois de février'.
    ELSEIF lv_month = 3.
      WRITE:/'C''est le mois de mars'.
    ELSEIF lv_month = 4.
      WRITE:/'C''est le mois d''avril'.
    ELSEIF lv_month = 5.
      WRITE:/'C''est le mois de mai'.
    ELSE.
      WRITE:/'Autre mois de l''année'.
    ENDIF.

> [!TIP] > `ELSEIF` permet d'éviter d'empiler plusieurs IF imbriqués et rend le code plus lisible.

### UTILISATION DE AND / OR

    WRITE:/ '     - IF ELSEIF AND/OR...'.

    DATA: lv_month TYPE i,
          lv_day   TYPE i.

    lv_month = SY-DATUM+4(2).
    lv_day   = SY-DATUM+6(2).

    IF lv_month = 12 OR lv_month = 1 OR lv_month = 2.
      WRITE:/'C''est l''hiver'.
    ELSEIF lv_month = 3 OR lv_month = 4 OR lv_month = 5.
      WRITE:/'C''est le printemps'.
    ELSEIF lv_month = 6 OR lv_month = 7 OR lv_month = 8.
      WRITE:/'C''est l''été'.
    ELSEIF lv_month = 9 OR lv_month = 10 OR lv_month = 11.
      WRITE:/'C''est l''automne'.
    ENDIF.

    IF lv_month = 1 AND lv_day = 1.
      WRITE:/'Bonne année'.
    ELSEIF lv_month = 12 AND lv_day = 25.
      WRITE:/'Joyeux Noël'.
    ELSEIF lv_month = 5 AND lv_day = 1.
      WRITE:/'Bonne fête du travail'.
    ELSE.
      WRITE:/'Bonne journée'.
    ENDIF.

> [!IMPORTANT]
> L’opérateur `AND` vérifie que toutes les conditions sont vraies, tandis que `OR` vérifie qu’au moins une condition est vraie.

## 🌺 PRIORITE AND / OR

> L’opérateur `AND` a toujours la priorité sur `OR`.  
> Pour éviter toute ambiguïté, utilisez des parenthèses.

    WRITE:/ '     - IF PRIORITY...'.

    IF ( lv_month = 1 OR lv_month = 2 ) AND lv_day = 1.
      WRITE:/ 'Nouvel an ou autre événement en janvier/février'.
    ENDIF.

> [!TIP]
> Toujours clarifier la logique avec des parenthèses pour éviter des résultats inattendus.

## 🌺 EVITER UN DUMP

    WRITE:/ '     - IF PREVENTIF ANTI DUMP...'.

    DATA: lv_a      TYPE I,
          lv_b      TYPE I,
          lv_result TYPE I.

    lv_a = 5.
    lv_b = 0.

    IF lv_b > 0.
      lv_result = lv_a / lv_b.
      WRITE lv_result.
    ELSE.
      WRITE 'La valeur de lv_b est égale à 0, opération impossible'.
    ENDIF.

> [!IMPORTANT]
> Vérifiez les conditions pour éviter des erreurs runtime, comme la division par zéro.

## 🌺 RESUME

> - `IF` teste une condition et exécute le bloc si elle est vraie.
> - `ELSEIF` permet de tester des conditions alternatives.
> - `ELSE` capture tous les autres cas non couverts.
> - `AND` / `OR` permettent de combiner plusieurs conditions.
> - Utiliser toujours un contrôle pour éviter les erreurs comme la division par zéro.
>
> [!TIP]
> Comme des feux de circulation et panneaux : selon la situation, l’action change.
