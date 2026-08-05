# 🌸 EXERCICES — SYNTHESE

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [VARIABLES ABAP](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 03 - BASIC DECLARATIONS/01 - 🍧 VARIABLES.md>)

> Cours associé : [CONSTANTES](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 03 - BASIC DECLARATIONS/02 - 🍧 CONSTANTS.md>)

> Cours associé : [FIELD-SYMBOLS](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 03 - BASIC DECLARATIONS/03 - 🍧 FIELD-SYMBOLS.md>)

## 🌺 OBJECTIF

Construire un programme unique utilisant correctement les trois catégories de déclarations.

## 🌺 CONTEXTE

Le programme calcule le montant d’une commande.

Règles :

- le montant initial est égal à la quantité multipliée par le prix unitaire ;
- la livraison est gratuite à partir de `50,00 EUR` ;
- en dessous de ce seuil, `5,90 EUR` sont ajoutés ;
- l’ajout des frais doit être réalisé par l’intermédiaire d’un field-symbol assigné au total.

## 🌺 CONSIGNES

1. Déclarer les règles fixes avec `CONSTANTS`.
2. Déclarer la quantité et le prix avec `DATA`.
3. Calculer le total avec une déclaration inline.
4. Déclarer un field-symbol ayant le même type que le total.
5. Assigner le total au field-symbol.
6. Vérifier l’assignation.
7. Ajouter les frais par le field-symbol lorsque le total est inférieur au seuil.
8. Afficher :
   - la quantité ;
   - le prix unitaire ;
   - le total initial ;
   - le statut de livraison ;
   - le total final ;
   - la devise.
9. Tester les trois cas du chapitre des constantes.
10. Retirer l’assignation à la fin du traitement.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Les valeurs fixes ne sont pas déclarées avec `DATA`.
- [ ] Les valeurs variables ne sont pas déclarées avec `CONSTANTS`.
- [ ] Le total est calculé avec une déclaration inline.
- [ ] Les frais sont ajoutés par le field-symbol.
- [ ] Le field-symbol est contrôlé avant utilisation.
- [ ] La variable total contient bien la modification.
- [ ] Les trois cas de test sont conformes.
- [ ] Le programme final ne contient aucune valeur métier répétée sans nom.

<details>
<summary>🍧 Afficher la solution complète</summary>

```abap
REPORT zaelion_<tri>_declarations.

CONSTANTS lc_free_shipping_threshold TYPE p LENGTH 8 DECIMALS 2
  VALUE '50.00'.

CONSTANTS lc_shipping_cost TYPE p LENGTH 8 DECIMALS 2
  VALUE '5.90'.

CONSTANTS lc_currency TYPE c LENGTH 3
  VALUE 'EUR'.

DATA lv_quantity   TYPE i VALUE 3.
DATA lv_unit_price TYPE p LENGTH 8 DECIMALS 2
  VALUE '19.90'.

START-OF-SELECTION.

  DATA(lv_total) = lv_quantity * lv_unit_price.
  DATA(lv_initial_total) = lv_total.

  FIELD-SYMBOLS <lfs_total> LIKE lv_total.

  ASSIGN lv_total TO <lfs_total>.

  WRITE: / 'Quantité      :', lv_quantity,
         / 'Prix unitaire :', lv_unit_price, lc_currency,
         / 'Total initial :', lv_initial_total, lc_currency.

  IF <lfs_total> IS ASSIGNED.

    IF <lfs_total> >= lc_free_shipping_threshold.
      WRITE: / 'Livraison     : gratuite'.
    ELSE.
      <lfs_total> = <lfs_total> + lc_shipping_cost.

      WRITE: / 'Livraison     :', lc_shipping_cost, lc_currency.
    ENDIF.

    WRITE: / 'Total final   :', lv_total, lc_currency.

  ENDIF.

  UNASSIGN <lfs_total>.
```

### Cas 1

```abap
DATA lv_quantity TYPE i VALUE 3.
```

Résultat métier :

```text
Total initial : 59,70 EUR
Livraison     : gratuite
Total final   : 59,70 EUR
```

### Cas 2

```abap
DATA lv_quantity TYPE i VALUE 2.
```

Résultat métier :

```text
Total initial : 39,80 EUR
Livraison     : 5,90 EUR
Total final   : 45,70 EUR
```

### Cas 3

```abap
DATA lv_quantity   TYPE i VALUE 5.
DATA lv_unit_price TYPE p LENGTH 8 DECIMALS 2
  VALUE '10.00'.
```

Résultat métier :

```text
Total initial : 50,00 EUR
Livraison     : gratuite
Total final   : 50,00 EUR
```

</details>
