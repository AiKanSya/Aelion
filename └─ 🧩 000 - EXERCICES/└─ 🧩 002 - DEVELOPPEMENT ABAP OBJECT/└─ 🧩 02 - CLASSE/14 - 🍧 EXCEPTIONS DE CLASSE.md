# 🌸 EXERCICES — EXCEPTIONS DE CLASSE

## 🌺 OBJECTIFS

- créer une exception globale ;
- choisir sa superclasse ;
- la déclarer dans une méthode ;
- la lever ;
- la traiter ;
- chaîner une exception précédente.

## 🌺 DURÉE INDICATIVE

75 à 95 minutes.

## 🌺 EXCEPTION

Créer :

```text
ZCX_<TRI>_DIVISION_BY_ZERO
```

Superclasse recommandée pour l’exercice :

```text
CX_STATIC_CHECK
```

## 🌺 MÉTHODE

Dans `ZCL_<TRI>_CALCULATOR`, créer :

```text
DIVIDE
```

Signature :

```text
IV_NUMERATOR   TYPE DECFLOAT34
IV_DENOMINATOR TYPE DECFLOAT34
RV_RESULT      TYPE DECFLOAT34
RAISING        ZCX_<TRI>_DIVISION_BY_ZERO
```

## 🌺 IMPLÉMENTATION

```abap
METHOD divide.

  IF iv_denominator = 0.

    RAISE EXCEPTION TYPE
      zcx_<tri>_division_by_zero.

  ENDIF.

  rv_result =
    iv_numerator / iv_denominator.

ENDMETHOD.
```

## 🌺 EXERCICE 1 — TRAITEMENT

```abap
TRY.

    DATA(lv_result) =
      lo_calculator->divide(
        iv_numerator   = 10
        iv_denominator = 0
      ).

  CATCH zcx_<tri>_division_by_zero
    INTO DATA(lx_division).

    WRITE / lx_division->get_text( ).

ENDTRY.
```

## 🌺 EXERCICE 2 — HIÉRARCHIE

Comparer :

| Superclasse        | Contrôle                          |
| ------------------ | --------------------------------- |
| `CX_STATIC_CHECK`  | propagation déclarée statiquement |
| `CX_DYNAMIC_CHECK` | vérification plus dynamique       |
| `CX_NO_CHECK`      | déclaration non imposée           |

Utiliser `CX_NO_CHECK` avec prudence.

## 🌺 EXERCICE 3 — ATTRIBUT

Ajouter un attribut contenant le dénominateur ou un contexte métier.

Adapter le constructeur de l’exception.

## 🌺 EXERCICE 4 — PREVIOUS

Lorsqu’une exception technique est transformée en exception métier :

```abap
RAISE EXCEPTION TYPE zcx_<tri>_import
  EXPORTING
    previous = lx_previous.
```

Conserver la cause d’origine.

## 🌺 DIAGNOSTIC

Un `CATCH cx_root` vide absorbe toutes les erreurs.

Corriger en traitant les exceptions connues et en journalisant ou propageant les autres.

## 🌺 CRITÈRES DE VALIDATION

- [ ] L’exception globale existe.
- [ ] La méthode la déclare.
- [ ] Le cas zéro la lève.
- [ ] Le report la traite.
- [ ] Les trois familles sont distinguées.
- [ ] Le contexte peut être transporté.
- [ ] `PREVIOUS` est compris.
- [ ] Le catch vide est supprimé.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
TRY.

    WRITE /
      lo_calculator->divide(
        iv_numerator   = 10
        iv_denominator = 2
      ).

  CATCH zcx_<tri>_division_by_zero
    INTO DATA(lx_error).

    MESSAGE lx_error
      TYPE 'S'
      DISPLAY LIKE 'E'.

ENDTRY.
```

La classe métier lève l’exception. Le report choisit la restitution utilisateur.

</details>
