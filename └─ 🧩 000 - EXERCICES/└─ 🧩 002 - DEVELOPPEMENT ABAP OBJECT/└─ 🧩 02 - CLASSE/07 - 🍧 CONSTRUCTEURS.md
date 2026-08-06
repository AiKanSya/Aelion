# 🌸 EXERCICES — CONSTRUCTEURS

## 🌺 OBJECTIFS

- utiliser `CONSTRUCTOR` ;
- utiliser `CLASS_CONSTRUCTOR` ;
- garantir un état initial valide ;
- traiter une exception de construction ;
- comprendre le constructeur d’une superclasse.

## 🌺 DURÉE INDICATIVE

70 à 90 minutes.

## 🌺 ÉVOLUTION DE PRODUCT

Créer le constructeur d’instance :

```text
IV_NAME  TYPE STRING
IV_PRICE TYPE DECFLOAT34
```

Raising :

```text
ZCX_<TRI>_INVALID_AMOUNT
```

## 🌺 IMPLÉMENTATION

```abap
METHOD constructor.

  IF iv_name IS INITIAL
     OR iv_price < 0.

    RAISE EXCEPTION TYPE zcx_<tri>_invalid_amount.

  ENDIF.

  mv_name  = iv_name.
  mv_price = iv_price.

  gv_product_count =
    gv_product_count + 1.

ENDMETHOD.
```

## 🌺 EXERCICE 1 — CRÉATION VALIDE

```abap
DATA(lo_product) =
  NEW zcl_<tri>_product(
    iv_name  = `Clavier`
    iv_price = '50'
  ).
```

## 🌺 EXERCICE 2 — CRÉATION INVALIDE

```abap
TRY.

    DATA(lo_invalid) =
      NEW zcl_<tri>_product(
        iv_name  = `Erreur`
        iv_price = '-1'
      ).

  CATCH zcx_<tri>_invalid_amount INTO DATA(lx_amount).

    WRITE / lx_amount->get_text( ).

ENDTRY.
```

## 🌺 EXERCICE 3 — CLASS_CONSTRUCTOR

Ajouter un attribut statique :

```text
GV_DEFAULT_CURRENCY TYPE WAERS
```

Initialiser une seule fois :

```abap
METHOD class_constructor.

  gv_default_currency = 'EUR'.

ENDMETHOD.
```

## 🌺 EXERCICE 4 — COMPARAISON

| Constructeur        | Déclenchement | Paramètres |
| ------------------- | ------------- | ---------- |
| `CONSTRUCTOR`       |               |            |
| `CLASS_CONSTRUCTOR` |               |            |

## 🌺 RECTIFICATIONS

- `CONSTRUCTOR` est exécuté pour chaque objet.
- `CLASS_CONSTRUCTOR` est exécuté automatiquement avant le premier accès pertinent à la classe.
- Le constructeur statique ne doit pas dépendre d’un ordre d’appel fragile.
- Un constructeur doit initialiser l’objet, pas effectuer un traitement métier long ou committer.
- Dans une sous-classe possédant un constructeur, le constructeur de la superclasse doit être appelé explicitement avec `super->constructor( ... )` lorsque nécessaire.

## 🌺 DIAGNOSTIC

Un constructeur écrit en base puis effectue `COMMIT WORK`.

Expliquer :

- effet de bord ;
- objet impossible à tester isolément ;
- transaction imposée ;
- correction par méthode métier ou repository séparé.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le constructeur possède deux imports.
- [ ] L’objet invalide n’est pas créé.
- [ ] L’exception est traitée.
- [ ] Le compteur est incrémenté.
- [ ] Le constructeur statique initialise la devise.
- [ ] Les deux constructeurs sont distingués.
- [ ] Aucun commit n’existe.

<details>
<summary>🍧 Afficher la solution</summary>

| Constructeur        | Déclenchement                                                       |
| ------------------- | ------------------------------------------------------------------- |
| `CONSTRUCTOR`       | À chaque création d’objet                                           |
| `CLASS_CONSTRUCTOR` | Une fois avant le premier accès à la classe dans la session interne |

Le constructeur garantit que tout objet obtenu respecte les règles initiales.

</details>
