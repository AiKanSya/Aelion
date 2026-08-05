# 🌸 EXERCICE 04 — ÉCRAN DYNAMIQUE AVEC MODIF ID

## 🌺 OBJECTIFS

- attribuer un groupe de modification ;
- parcourir `SCREEN`;
- activer et désactiver des champs ;
- utiliser `USER-COMMAND`;
- distinguer écran inactif et donnée initiale ;
- éviter la logique métier dans `OUTPUT`.

## 🌺 DURÉE INDICATIVE

55 à 70 minutes.

## 🌺 DÉCLARATION

```abap
PARAMETERS p_detail AS CHECKBOX
  USER-COMMAND det.

PARAMETERS:
  p_user TYPE syuname MODIF ID det,
  p_date TYPE sydatum MODIF ID det.
```

## 🌺 EXERCICE 1 — OUTPUT

```abap
AT SELECTION-SCREEN OUTPUT.

  LOOP AT SCREEN.

    IF screen-group1 = 'DET'.

      IF p_detail = abap_true.
        screen-active = '1'.
      ELSE.
        screen-active = '0'.
      ENDIF.

      MODIFY SCREEN.

    ENDIF.

  ENDLOOP.
```

## 🌺 EXERCICE 2 — TESTS

Tester :

1. case non cochée ;
2. case cochée ;
3. retour à l’état non coché ;
4. valeurs saisies avant désactivation ;
5. exécution avec champ inactif.

## 🌺 QUESTIONS

1. la valeur du paramètre est-elle automatiquement effacée lorsque le champ devient inactif ?
2. faut-il faire `CLEAR p_user` si la valeur ne doit plus être utilisée ?
3. pourquoi `USER-COMMAND` provoque-t-il un cycle écran ?
4. quel événement modifie les propriétés ?
5. faut-il exécuter un `SELECT` dans la boucle `SCREEN` ?

## 🌺 EXERCICE 3 — INPUT OU ACTIVE

Comparer :

```abap
screen-input = '0'.
```

et :

```abap
screen-active = '0'.
```

Observer :

- champ affiché mais non saisissable ;
- champ retiré ou inactif selon le contexte.

## 🌺 EXERCICE 4 — GROUPE DE TROIS CARACTÈRES

Le `MODIF ID` utilise un identifiant de trois caractères.

Tester un nom lisible :

```text
DET
```

## 🌺 EXERCICE 5 — CAS INCORRECT

Analyser :

```abap
AT SELECTION-SCREEN OUTPUT.

  IF p_detail = abap_false.
    CLEAR p_user.
    SELECT ...
  ENDIF.
```

Séparer :

- adaptation écran ;
- nettoyage de données ;
- traitement principal.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Les deux champs appartiennent à `DET`.
- [ ] La case provoque un rafraîchissement.
- [ ] Les champs sont activés ou désactivés.
- [ ] Les valeurs résiduelles sont comprises.
- [ ] `SCREEN` est modifiée correctement.
- [ ] Aucune sélection métier n’est exécutée dans `OUTPUT`.
- [ ] Le cas incorrect est restructuré.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
AT SELECTION-SCREEN OUTPUT.

  LOOP AT SCREEN.

    IF screen-group1 = 'DET'.

      screen-active = COND #(
        WHEN p_detail = abap_true
        THEN '1'
        ELSE '0'
      ).

      MODIFY SCREEN.

    ENDIF.

  ENDLOOP.
```

Nettoyage éventuel :

```abap
AT SELECTION-SCREEN.

  IF p_detail = abap_false.
    CLEAR:
      p_user,
      p_date.
  ENDIF.
```

</details>
