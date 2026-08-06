# 🌸 EXERCICES — MESSAGES ET RETOURS D'ERREUR

## 🌺 OBJECTIFS

- distinguer exception et message fonctionnel ;
- utiliser `BAPIRET2` ;
- éviter une sortie écran dans l’API ;
- renseigner le champ en erreur ;
- définir un contrat cohérent.

## 🌺 DURÉE INDICATIVE

60 à 75 minutes.

## 🌺 ÉVOLUTION DU MODULE

Ajouter :

```text
ES_RETURN TYPE BAPIRET2
```

à `Z_<TRI>_TEXT_NORMALIZE`.

## 🌺 RÈGLES

### Entrée vide

```text
TYPE      = E
MESSAGE   = Le texte est obligatoire
PARAMETER = IV_TEXT
FIELD     = IV_TEXT
```

### Succès

```text
TYPE    = S
MESSAGE = Texte normalisé
```

## 🌺 EXERCICE 1 — INITIALISATION

```abap
CLEAR:
  ev_text,
  es_return.
```

## 🌺 EXERCICE 2 — APPELANT

```abap
CALL FUNCTION 'Z_<TRI>_TEXT_NORMALIZE'
  EXPORTING
    iv_text = lv_input
  IMPORTING
    ev_text   = lv_output
    es_return = ls_return.
```

## 🌺 EXERCICE 3 — INTERPRÉTATION

```abap
IF ls_return-type CA 'AEX'.
  " Traitement bloquant
ENDIF.
```

Les avertissements `W` dépendent du contrat métier.

## 🌺 EXERCICE 4 — MAUVAIS CONTRAT

Analyser un module qui mélange :

```text
MESSAGE E
exception classique
BAPIRET2
code de retour
```

Choisir un mécanisme principal.

## 🌺 DIAGNOSTIC

Un module lance `MESSAGE E` pendant un appel RFC ou un traitement de fond.

Décrire pourquoi ce comportement est inadapté.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Aucun popup n’est imposé.
- [ ] La structure est initialisée.
- [ ] Le champ en erreur est renseigné.
- [ ] Le succès est distinct de l’erreur.
- [ ] L’appelant décide de l’affichage.
- [ ] Le contrat est cohérent.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
CLEAR:
  ev_text,
  es_return.

IF iv_text IS INITIAL.

  es_return = VALUE #(
    type      = 'E'
    message   = 'Le texte est obligatoire'
    parameter = 'IV_TEXT'
    field     = 'IV_TEXT'
  ).

  RETURN.

ENDIF.

DATA(lv_text) = iv_text.
CONDENSE lv_text.

IF iv_uppercase = abap_true.
  TRANSLATE lv_text TO UPPER CASE.
ENDIF.

ev_text = COND string(
  WHEN iv_prefix IS INITIAL
  THEN lv_text
  ELSE |{ iv_prefix }{ lv_text }|
).

es_return = VALUE #(
  type    = 'S'
  message = 'Texte normalisé'
).
```

Dans un projet réel, une classe de messages dédiée doit être utilisée lorsque les champs `ID` et `NUMBER` sont requis.

</details>
