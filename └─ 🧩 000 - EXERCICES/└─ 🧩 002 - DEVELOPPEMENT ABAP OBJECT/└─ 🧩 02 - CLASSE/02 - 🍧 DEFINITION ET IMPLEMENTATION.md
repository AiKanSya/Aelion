# 🌸 EXERCICES — DÉFINITION ET IMPLÉMENTATION DANS SE24

## 🌺 OBJECTIFS

- distinguer déclaration et code ;
- utiliser les onglets du Class Builder ;
- créer une méthode ;
- activer correctement ;
- diagnostiquer une signature incohérente.

## 🌺 DURÉE INDICATIVE

50 à 65 minutes.

## 🌺 CLASSE

```text
ZCL_<TRI>_CALCULATOR
```

## 🌺 EXERCICE 1 — MÉTHODE ADD

Créer la méthode publique :

```text
ADD
```

Signature :

| Paramètre   | Direction | Type |
| ----------- | --------- | ---- |
| `IV_LEFT`   | Importing | `I`  |
| `IV_RIGHT`  | Importing | `I`  |
| `RV_RESULT` | Returning | `I`  |

## 🌺 EXERCICE 2 — IMPLÉMENTATION

```abap
METHOD add.

  rv_result =
    iv_left + iv_right.

ENDMETHOD.
```

## 🌺 EXERCICE 3 — TEST

```abap
DATA(lo_calculator) =
  NEW zcl_<tri>_calculator( ).

DATA(lv_result) =
  lo_calculator->add(
    iv_left  = 10
    iv_right = 20
  ).

WRITE / lv_result.
```

Résultat :

```text
30
```

## 🌺 EXERCICE 4 — ONGLETS

Identifier dans `SE24` :

- attributs ;
- méthodes ;
- événements ;
- types ;
- interfaces ;
- amis ;
- propriétés ;
- implémentation.

Les noms exacts varient selon la version.

## 🌺 DIAGNOSTIC

Modifier le type de `RV_RESULT` dans la définition sans adapter un appelant.

Rechercher les erreurs de syntaxe et corriger l’ensemble des dépendances.

## 🌺 CRITÈRES DE VALIDATION

- [ ] La signature est déclarée.
- [ ] Le code est dans l’implémentation.
- [ ] La méthode est activée.
- [ ] Le report retourne `30`.
- [ ] Les onglets sont identifiés.
- [ ] La modification de signature est diagnostiquée.

<details>
<summary>🍧 Afficher la solution</summary>

La définition décrit :

```text
nom
visibilité
type de méthode
paramètres
exceptions
```

L’implémentation contient :

```text
METHOD add.
  ...
ENDMETHOD.
```

</details>
