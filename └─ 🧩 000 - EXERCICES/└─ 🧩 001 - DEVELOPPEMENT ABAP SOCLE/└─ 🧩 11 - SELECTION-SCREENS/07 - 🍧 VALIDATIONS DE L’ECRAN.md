# 🌸 EXERCICE 07 — VALIDATIONS DE L’ÉCRAN

## 🌺 OBJECTIFS

- choisir une validation par champ, bloc ou globale ;
- produire un message `E`;
- vérifier une valeur en base ;
- contrôler un intervalle ;
- empêcher le traitement principal ;
- éviter un accès SQL répété inutilement.

## 🌺 DURÉE INDICATIVE

65 à 80 minutes.

## 🌺 EXERCICE 1 — MAXIMUM

```abap
AT SELECTION-SCREEN ON p_max.

  IF p_max NOT BETWEEN 1 AND 500.
    MESSAGE 'Le maximum doit être compris entre 1 et 500'
      TYPE 'E'.
  ENDIF.
```

## 🌺 EXERCICE 2 — NOM

Refuser un nom contenant uniquement des espaces après normalisation.

Pour une recherche partielle, protéger les caractères de motif si la règle ne permet pas à l’utilisateur d’utiliser `%` et `_`.

## 🌺 EXERCICE 3 — STATUT

Lorsqu’un paramètre unique `p_status` est utilisé :

```abap
AT SELECTION-SCREEN ON p_status.

  SELECT SINGLE status
    FROM zt_<tri>_stat
    WHERE status = @p_status
    INTO @DATA(lv_status).

  IF sy-subrc <> 0.
    MESSAGE 'Statut inconnu'
      TYPE 'E'.
  ENDIF.
```

Ne pas exécuter cette lecture lorsque `p_status` est facultatif et initial.

## 🌺 EXERCICE 4 — BLOC

```abap
AT SELECTION-SCREEN ON BLOCK b01.
```

Vérifier :

- au moins un critère ;
- cohérence des dates ;
- restrictions d’export.

## 🌺 EXERCICE 5 — TABLE DE SÉLECTION

Une table `SELECT-OPTIONS` peut contenir :

- plusieurs lignes ;
- des exclusions ;
- des motifs ;
- des intervalles.

Une simple vérification de `LOW` ne valide pas toute la table.

Parcourir toutes les lignes si une règle métier restreint les opérateurs.

Exemple :

```abap
LOOP AT s_stat INTO DATA(ls_status_range).

  IF ls_status_range-option <> 'EQ'.
    MESSAGE 'Seules les valeurs individuelles sont autorisées'
      TYPE 'E'.
  ENDIF.

ENDLOOP.
```

## 🌺 EXERCICE 6 — MESSAGE DANS VALUE-REQUEST

Les événements `ON VALUE-REQUEST` ne doivent pas utiliser un message d’erreur `E` comme une validation classique.

Gérer l’absence de valeurs sans bloquer incorrectement l’écran.

## 🌺 EXERCICE 7 — PREUVE DU CYCLE

Placer un point d’arrêt dans :

```text
AT SELECTION-SCREEN
START-OF-SELECTION
```

Saisir une valeur invalide.

Résultat attendu :

```text
START-OF-SELECTION n’est pas atteint.
```

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le maximum est validé par champ.
- [ ] Le statut facultatif est géré.
- [ ] Le bloc est validé.
- [ ] Toute la table de sélection est analysée.
- [ ] Un message `E` empêche le traitement.
- [ ] `VALUE-REQUEST` est distingué d’une validation.
- [ ] Le cycle est prouvé par débogage.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
AT SELECTION-SCREEN ON BLOCK b01.

  IF s_order[] IS INITIAL
     AND s_stat[] IS INITIAL
     AND s_curr[] IS INITIAL
     AND s_date[] IS INITIAL
     AND p_name IS INITIAL.

    MESSAGE 'Saisissez au moins un critère'
      TYPE 'E'.

  ENDIF.

  LOOP AT s_date INTO DATA(ls_date).

    IF ls_date-option = 'BT'
       AND ls_date-low > ls_date-high.

      MESSAGE 'La date de début doit précéder la date de fin'
        TYPE 'E'.

    ENDIF.

  ENDLOOP.
```

</details>
