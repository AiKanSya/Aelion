# 🌸 EXERCICES — PASSAGE DES PARAMETRES

## 🌺 OBJECTIFS

- distinguer référence et valeur ;
- comprendre `VALUE`;
- utiliser `OPTIONAL`;
- utiliser une valeur par défaut ;
- éviter une modification involontaire.

## 🌺 DURÉE INDICATIVE

55 à 70 minutes.

## 🌺 EXERCICE 1 — PASSAGE PAR VALEUR

Dans `SE37`, activer le passage par valeur pour :

```text
IV_TEXT
IV_PREFIX
IV_UPPERCASE
EV_TEXT
```

Observer le bloc d’interface généré.

## 🌺 EXERCICE 2 — TROIS APPELS

Tester :

### Cas 1

```text
IV_TEXT = "  bonjour   monde  "
IV_PREFIX absent
IV_UPPERCASE absent
```

Attendu :

```text
bonjour monde
```

### Cas 2

```text
IV_PREFIX = "SAP: "
```

Attendu :

```text
SAP: bonjour monde
```

### Cas 3

```text
IV_UPPERCASE = ABAP_TRUE
```

Attendu :

```text
SAP: BONJOUR MONDE
```

## 🌺 EXERCICE 3 — IMPORT EN LECTURE

Ne pas modifier directement `IV_TEXT`.

Créer :

```abap
DATA(lv_text) = iv_text.
```

## 🌺 EXERCICE 4 — CHANGING PAR RÉFÉRENCE

Créer temporairement un module avec :

```text
CV_TEXT
```

Vérifier que la variable fournie par l’appelant est modifiée.

## 🌺 QUESTIONS

1. un paramètre facultatif absent reçoit-il son défaut ?
2. une sortie non récupérée empêche-t-elle l’exécution ?
3. un gros volume doit-il être copié sans justification ?
4. un paramètre `TABLES` peut-il être passé par valeur ?
5. pourquoi documenter un effet de bord ?

## 🌺 CRITÈRES DE VALIDATION

- [ ] `VALUE` est observé.
- [ ] Les trois combinaisons fonctionnent.
- [ ] L’import reste en lecture.
- [ ] L’effet de `CHANGING` est observé.
- [ ] Le choix référence/valeur est expliqué.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
DATA(lv_text) = iv_text.

CONDENSE lv_text.

IF iv_uppercase = abap_true.
  TRANSLATE lv_text TO UPPER CASE.
ENDIF.

IF iv_prefix IS INITIAL.
  ev_text = lv_text.
ELSE.
  ev_text = |{ iv_prefix }{ lv_text }|.
ENDIF.
```

</details>
