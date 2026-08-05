# 🌸 EXERCICES — COMPARAISON AVEC OPEN SQL

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [TRANSACTION SE16N](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 09 - SE16N/01 - 🍧 SE16N.md>)

## 🌺 OBJECTIFS

- reproduire une sélection `SE16N` en Open SQL ;
- comparer les filtres ;
- comparer les colonnes ;
- vérifier le nombre de lignes ;
- distinguer ordre explicite et ordre indéfini ;
- diagnostiquer une divergence.

## 🌺 DURÉE INDICATIVE

50 à 65 minutes.

## 🌺 PROGRAMME

Créer ou compléter :

```text
ZAELION_<TRI>_SE16N
```

Code :

```abap
REPORT zaelion_<tri>_se16n.

PARAMETERS:
  p_stat TYPE zde_<tri>_stat DEFAULT 'N',
  p_curr TYPE waers DEFAULT 'EUR'.

START-OF-SELECTION.

  SELECT order_id,
         customer_name,
         status,
         amount,
         currency
    FROM zt_<tri>_ord
    WHERE status   = @p_stat
      AND currency = @p_curr
    ORDER BY order_id
    INTO TABLE @DATA(lt_orders).

  WRITE / |Nombre de lignes : { lines( lt_orders ) }|.

  LOOP AT lt_orders INTO DATA(ls_order).
    WRITE: / ls_order-order_id,
             ls_order-customer_name,
             ls_order-status,
             ls_order-amount,
             ls_order-currency.
  ENDLOOP.
```

## 🌺 EXERCICE 1 — SÉLECTION ÉQUIVALENTE

Dans `SE16N`, utiliser :

```text
STATUS = N
CURRENCY = EUR
```

Afficher uniquement les cinq colonnes du `SELECT`.

Comparer :

| Contrôle         | Programme | `SE16N` |
| ---------------- | --------- | ------- |
| Nombre de lignes |           |         |
| Identifiant      |           |         |
| Client           |           |         |
| Statut           |           |         |
| Montant          |           |         |
| Devise           |           |         |

## 🌺 EXERCICE 2 — ORDRE

Le programme contient :

```abap
ORDER BY order_id
```

Répondre :

1. `SE16N` utilise-t-il nécessairement le même ordre initial ?
2. faut-il trier la grille pour comparer ligne à ligne ?
3. l’absence de même ordre signifie-t-elle que les ensembles diffèrent ?
4. quel critère doit être comparé en priorité ?

## 🌺 EXERCICE 3 — DIVERGENCE DE MANDANT

Le programme et `SE16N` sont exécutés dans des mandants différents.

Décrire :

- symptôme ;
- cause ;
- vérification ;
- correction.

## 🌺 EXERCICE 4 — DIVERGENCE DE FORMAT

Le programme affiche :

```text
0000000001
```

Le stagiaire recherche :

```text
1
```

dans `SE16N`.

Décrire :

- symptôme ;
- cause ;
- correction ;
- rôle du format interne.

## 🌺 EXERCICE 5 — DIVERGENCE DE COLONNES

Le programme ne sélectionne pas `PRIORITY`.

`SE16N` l’affiche.

Répondre :

1. les deux sélections retournent-elles nécessairement des lignes différentes ?
2. pourquoi le programme limite-t-il les colonnes ?
3. faut-il comparer uniquement les colonnes communes ?
4. l’ajout d’une colonne change-t-il le filtre ?

## 🌺 EXERCICE 6 — DIVERGENCE RÉELLE

Modifier temporairement le programme :

```abap
AND amount > 100
```

Ne pas modifier la sélection `SE16N`.

Relever la divergence.

Corriger les critères pour obtenir l’équivalence.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Les critères sont identiques.
- [ ] Les colonnes communes sont comparées.
- [ ] L’ordre est rendu explicite.
- [ ] Le mandant est vérifié.
- [ ] Le format interne est vérifié.
- [ ] Une divergence de filtre est reproduite et corrigée.
- [ ] `SE16N` sert de preuve complémentaire, pas de test automatisé.

<details>
<summary>🍧 Afficher la solution</summary>

Une comparaison valide exige :

```text
même système
même mandant
même source
mêmes critères
mêmes formats internes
mêmes colonnes comparées
ordre rendu comparable
```

`SE16N` est utile pour un contrôle ponctuel. Un test reproductible doit être automatisé dans un programme ou un framework de test adapté.

</details>
