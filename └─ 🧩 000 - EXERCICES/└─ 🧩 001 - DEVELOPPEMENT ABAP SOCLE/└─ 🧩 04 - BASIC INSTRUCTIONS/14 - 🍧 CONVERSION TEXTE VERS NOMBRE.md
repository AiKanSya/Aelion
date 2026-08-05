# 🌸 EXERCICES — CONVERSION SÉCURISÉE D'UN TEXTE EN NOMBRE

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [CONVERSION SÉCURISÉE D'UN TEXTE EN NOMBRE](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 04 - BASIC INSTRUCTIONS/14 - 🍧 CONVERSION TEXTE VERS NOMBRE.md>)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- convertir un texte avec `CONV` ;
- intercepter un texte non numérique ;
- intercepter un dépassement ;
- séparer conversion technique et règle métier ;
- conserver la source pour produire un diagnostic ;
- poursuivre après une erreur locale.

## 🌺 DURÉE INDICATIVE

45 à 60 minutes.

## 🌺 CONTEXTE

Un âge est reçu sous forme de texte.

Le traitement doit retourner :

- l’âge numérique ;
- un indicateur de validité ;
- un message explicatif.

Règles métier :

- âge minimal : `18` ;
- âge maximal : `120` ;
- une chaîne vide est invalide ;
- une valeur non numérique est invalide ;
- une valeur hors capacité du type `i` est invalide.

## 🌺 EXERCICE 1 — CLASSIFICATION

Compléter :

| Entrée                    | Conversion technique | Règle métier |
| ------------------------- | -------------------- | ------------ |
| `25`                      |                      |              |
| `17`                      |                      |              |
| `ABC`                     |                      |              |
| chaîne vide               |                      |              |
| valeur extrêmement grande |                      |              |
| `121`                     |                      |              |

## 🌺 EXERCICE 2 — SOUS-ROUTINE

Créer :

```abap
FORM convert_age
  USING
    iv_age_text TYPE string
  CHANGING
    cv_age      TYPE i
    cv_is_valid TYPE abap_bool
    cv_message  TYPE string.
```

Traitement attendu :

1. réinitialiser les paramètres de sortie ;
2. rejeter explicitement une chaîne vide ;
3. convertir avec `CONV i( )` dans un bloc `TRY` ;
4. intercepter `cx_sy_conversion_no_number` ;
5. intercepter `cx_sy_conversion_overflow` ;
6. appliquer ensuite la règle métier `18` à `120`.

## 🌺 EXERCICE 3 — CAS DE TEST

Tester séparément :

```text
25
17
ABC
999999999999999999999999999999
121
chaîne vide
```

Résultats attendus :

| Entrée             | Âge | Valide | Message                    |
| ------------------ | --: | ------ | -------------------------- |
| `25`               |  25 | `X`    | Âge valide                 |
| `17`               |  17 | espace | Âge inférieur à 18         |
| `ABC`              |   0 | espace | Valeur non numérique : ABC |
| très grande valeur |   0 | espace | Dépassement numérique      |
| `121`              | 121 | espace | Âge supérieur à 120        |
| vide               |   0 | espace | Âge non renseigné          |

## 🌺 EXERCICE 4 — DIAGNOSTIC

Analyser :

```abap
DATA lv_age TYPE i.

lv_age = 'ABC'.
```

1. Pourquoi cette affectation est-elle dangereuse ?
2. Pourquoi un simple contrôle métier après l’affectation ne suffit-il pas ?
3. Pourquoi faut-il conserver le texte source ?
4. Pourquoi `CATCH cx_root` est-il trop générique dans cet exercice ?

## 🌺 CRITÈRES DE VALIDATION

- [ ] La chaîne vide est traitée explicitement.
- [ ] `CONV i( )` est utilisé.
- [ ] Les deux exceptions sont distinguées.
- [ ] La règle métier intervient après la conversion.
- [ ] La source invalide apparaît dans le message.
- [ ] Aucun dump n’est produit.
- [ ] Tous les cas sont exécutés.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — classification

| Entrée             | Conversion            | Règle métier               |
| ------------------ | --------------------- | -------------------------- |
| `25`               | Réussie               | Valide                     |
| `17`               | Réussie               | Invalide : inférieur à 18  |
| `ABC`              | Échec : non numérique | Non évaluée                |
| vide               | Rejet explicite       | Non évaluée                |
| très grande valeur | Échec : dépassement   | Non évaluée                |
| `121`              | Réussie               | Invalide : supérieur à 120 |

### Solution — sous-routine

```abap
FORM convert_age
  USING
    iv_age_text TYPE string
  CHANGING
    cv_age      TYPE i
    cv_is_valid TYPE abap_bool
    cv_message  TYPE string.

  CLEAR: cv_age,
         cv_is_valid,
         cv_message.

  IF iv_age_text IS INITIAL.
    cv_message = `Âge non renseigné`.
    RETURN.
  ENDIF.

  TRY.
      cv_age = CONV i( iv_age_text ).

    CATCH cx_sy_conversion_no_number.
      cv_message = |Valeur non numérique : { iv_age_text }|.
      RETURN.

    CATCH cx_sy_conversion_overflow.
      cv_message = `Dépassement numérique`.
      RETURN.
  ENDTRY.

  IF cv_age < 18.
    cv_message = `Âge inférieur à 18`.
  ELSEIF cv_age > 120.
    cv_message = `Âge supérieur à 120`.
  ELSE.
    cv_is_valid = abap_true.
    cv_message = `Âge valide`.
  ENDIF.

ENDFORM.
```

### Solution — exécution d’un cas

```abap
DATA lv_age_text TYPE string VALUE `25`.
DATA lv_age      TYPE i.
DATA lv_is_valid TYPE abap_bool.
DATA lv_message  TYPE string.

PERFORM convert_age
  USING
    lv_age_text
  CHANGING
    lv_age
    lv_is_valid
    lv_message.

WRITE: / 'Source  :', lv_age_text,
       / 'Âge     :', lv_age,
       / 'Valide  :', lv_is_valid,
       / 'Message :', lv_message.
```

Modifier `lv_age_text` pour exécuter les autres cas.

L’affectation directe d’un texte invalide vers un entier peut provoquer une erreur d’exécution avant tout contrôle métier. Les exceptions précises permettent de distinguer une représentation non numérique d’un dépassement.

</details>
