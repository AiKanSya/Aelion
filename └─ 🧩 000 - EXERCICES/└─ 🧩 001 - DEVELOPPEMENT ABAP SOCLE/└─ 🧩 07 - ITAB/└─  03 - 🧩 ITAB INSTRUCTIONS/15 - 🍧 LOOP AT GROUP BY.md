# 🌸 EXERCICES — REGROUPER UNE TABLE AVEC `LOOP AT ... GROUP BY`

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [REGROUPER UNE TABLE AVEC `LOOP AT ... GROUP BY`](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  03 - 🧩 ITAB INSTRUCTIONS/15 - 🍧 LOOP AT GROUP BY.md>)

## 🌺 OBJECTIFS

- former des groupes selon une clé fonctionnelle ;
- parcourir les membres d’un groupe ;
- calculer un nombre, une somme et une moyenne ;
- réinitialiser les agrégats au niveau du groupe ;
- comprendre qu’aucun tri préalable n’est requis ;
- invalider uniquement le groupe contenant une donnée incorrecte.

## 🌺 DURÉE INDICATIVE

70 à 90 minutes.

## 🌺 CONTEXTE

Une table contient des ventes :

```abap
TYPES: BEGIN OF ty_sale,
         country TYPE c LENGTH 2,
         product TYPE c LENGTH 10,
         amount  TYPE p LENGTH 8 DECIMALS 2,
       END OF ty_sale.
```

Données :

| Pays | Produit | Montant |
| ---- | ------- | ------: |
| FR   | P001    |     100 |
| DE   | P002    |      80 |
| FR   | P003    |      50 |
| ES   | P004    |     120 |
| DE   | P005    |      20 |
| FR   | P006    |     150 |

## 🌺 EXERCICE 1 — GROUPES PAR PAYS

Utiliser :

```abap
LOOP AT lt_sales INTO DATA(ls_sale)
  GROUP BY ( country = ls_sale-country )
  ASSIGNING FIELD-SYMBOL(<country_group>).
```

Afficher une ligne par groupe.

## 🌺 EXERCICE 2 — MEMBRES

À l’intérieur du groupe :

```abap
LOOP AT GROUP <country_group>
  ASSIGNING FIELD-SYMBOL(<sale>).
```

Afficher tous les produits du pays courant.

## 🌺 EXERCICE 3 — AGRÉGATS

Calculer pour chaque pays :

- nombre de ventes ;
- somme ;
- moyenne.

Résultats attendus :

```text
DE : 2 ventes - total 100 - moyenne 50
ES : 1 vente  - total 120 - moyenne 120
FR : 3 ventes - total 300 - moyenne 100
```

L’ordre des groupes dépend de la variante choisie. Utiliser `ASCENDING` pour obtenir l’ordre alphabétique.

## 🌺 EXERCICE 4 — RÉINITIALISATION INCORRECTE

Analyser :

```abap
DATA lv_total TYPE p LENGTH 10 DECIMALS 2.

LOOP AT lt_sales INTO ls_sale
  GROUP BY ( country = ls_sale-country )
  ASSIGNING <country_group>.

  LOOP AT GROUP <country_group> ASSIGNING <sale>.
    lv_total = lv_total + <sale>-amount.
  ENDLOOP.

  WRITE / lv_total.

ENDLOOP.
```

Répondre :

1. le total est-il réinitialisé pour chaque pays ?
2. quel symptôme apparaît ?
3. où faut-il placer `CLEAR lv_total` ?
4. faut-il également réinitialiser le compteur ?

## 🌺 EXERCICE 5 — GROUPE INVALIDE

Ajouter :

```text
ES - P999 - -10
```

Règle :

```text
Un montant négatif invalide uniquement le groupe du pays concerné.
```

Pour chaque groupe :

1. parcourir les membres ;
2. détecter un montant négatif ;
3. calculer les agrégats ;
4. ne pas afficher les résultats normaux du groupe invalide ;
5. poursuivre avec les autres groupes.

Résultat attendu :

```text
ES : groupe invalide
```

Les groupes `DE` et `FR` restent traités.

## 🌺 EXERCICE 6 — GROUP BY OU RUPTURE

Comparer :

| Besoin                                                        | Solution |
| ------------------------------------------------------------- | -------- |
| Grouper sans dépendre de l’ordre initial                      |          |
| Traiter une table déjà triée avec en-têtes de rupture simples |          |
| Parcourir explicitement les membres d’un groupe               |          |
| Calculer des agrégats par clé fonctionnelle                   |          |

## 🌺 CRITÈRES DE VALIDATION

- [ ] Les groupes sont formés par pays.
- [ ] Les membres sont parcourus avec `LOOP AT GROUP`.
- [ ] Les agrégats sont réinitialisés dans la boucle externe.
- [ ] La moyenne évite une division par zéro.
- [ ] Aucun tri préalable n’est présenté comme obligatoire.
- [ ] Le groupe invalide n’empêche pas les autres groupes.
- [ ] La portée de l’erreur est limitée au groupe.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
TYPES: BEGIN OF ty_sale,
         country TYPE c LENGTH 2,
         product TYPE c LENGTH 10,
         amount  TYPE p LENGTH 8 DECIMALS 2,
       END OF ty_sale.

DATA lt_sales TYPE STANDARD TABLE OF ty_sale
  WITH EMPTY KEY.

lt_sales = VALUE #(
  ( country = 'FR' product = 'P001' amount = '100.00' )
  ( country = 'DE' product = 'P002' amount = '80.00' )
  ( country = 'FR' product = 'P003' amount = '50.00' )
  ( country = 'ES' product = 'P004' amount = '120.00' )
  ( country = 'DE' product = 'P005' amount = '20.00' )
  ( country = 'FR' product = 'P006' amount = '150.00' )
).

LOOP AT lt_sales INTO DATA(ls_sale)
  GROUP BY ( country = ls_sale-country )
  ASCENDING
  ASSIGNING FIELD-SYMBOL(<country_group>).

  DATA lv_count   TYPE i.
  DATA lv_total   TYPE p LENGTH 10 DECIMALS 2.
  DATA lv_average TYPE p LENGTH 10 DECIMALS 2.
  DATA lv_invalid TYPE abap_bool.

  CLEAR:
    lv_count,
    lv_total,
    lv_average,
    lv_invalid.

  LOOP AT GROUP <country_group>
    ASSIGNING FIELD-SYMBOL(<sale>).

    IF <sale>-amount < 0.
      lv_invalid = abap_true.
    ENDIF.

    lv_count = lv_count + 1.
    lv_total = lv_total + <sale>-amount.

  ENDLOOP.

  IF lv_invalid = abap_true.
    WRITE / |{ <country_group>-country } : groupe invalide|.
    CONTINUE.
  ENDIF.

  IF lv_count > 0.
    lv_average = lv_total / lv_count.
  ENDIF.

  WRITE: / <country_group>-country,
           ':',
           lv_count,
           'ventes - total',
           lv_total,
           '- moyenne',
           lv_average.

ENDLOOP.
```

| Besoin                            | Solution               |
| --------------------------------- | ---------------------- |
| Groupement indépendant de l’ordre | `GROUP BY`             |
| Ruptures sur table triée          | `AT NEW` / `AT END OF` |
| Membres explicites                | `LOOP AT GROUP`        |
| Agrégats par clé                  | `GROUP BY`             |

</details>
