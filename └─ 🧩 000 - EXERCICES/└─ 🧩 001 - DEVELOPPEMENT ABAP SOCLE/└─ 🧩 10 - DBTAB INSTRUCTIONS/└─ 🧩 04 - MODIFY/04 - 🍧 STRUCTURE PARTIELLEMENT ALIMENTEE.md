# 🌸 EXERCICES — STRUCTURE PARTIELLEMENT ALIMENTÉE

## 🌺 OBJECTIFS

- reproduire un écrasement involontaire ;
- comprendre que la ligne complète est réécrite ;
- identifier les valeurs initialisées ;
- restaurer les données avec rollback ;
- choisir une stratégie plus sûre.

## 🌺 DURÉE INDICATIVE

50 à 65 minutes.

## 🌺 DONNÉE INITIALE

```text
ORDER_ID      : 9100000010
CUSTOMER_NAME : Valeurs à préserver
PRIORITY      : 1
STATUS        : N
CURRENCY      : EUR
AMOUNT        : 250,00
CREATED_BY    : utilisateur courant
CREATED_ON    : date courante
```

## 🌺 EXERCICE 1 — PRÉPARATION

Insérer la ligne dans la même LUW.

## 🌺 EXERCICE 2 — STRUCTURE INCOMPLÈTE

Construire une nouvelle structure sans lire la ligne :

```abap
DATA(ls_partial_order) = VALUE zt_<tri>_ord(
  mandt    = sy-mandt
  order_id = '9100000010'
  status   = 'P'
).
```

Prévoir la valeur après l’update :

| Champ           | Avant       | Structure source | Après attendu |
| --------------- | ----------- | ---------------- | ------------- |
| `CUSTOMER_NAME` | texte       | initial          |               |
| `PRIORITY`      | `1`         | initial          |               |
| `STATUS`        | `N`         | `P`              |               |
| `CURRENCY`      | `EUR`       | initial          |               |
| `AMOUNT`        | `250,00`    | initial          |               |
| `CREATED_BY`    | utilisateur | initial          |               |
| `CREATED_ON`    | date        | initial          |               |

## 🌺 EXERCICE 3 — EXÉCUTION CONTRÔLÉE

Exécuter l’update uniquement sur la ligne réservée.

Relire la ligne.

## 🌺 EXERCICE 4 — DIAGNOSTIC

Décrire :

1. le symptôme ;
2. la cause ;
3. les champs perdus ;
4. la correction avec lecture complète ;
5. la correction avec `UPDATE ... SET`;
6. le test de non-régression.

## 🌺 EXERCICE 5 — CORRECTION AVEC STRUCTURE COMPLÈTE

Après rollback et nouvelle préparation :

1. lire la ligne ;
2. modifier uniquement `STATUS`;
3. exécuter `UPDATE ... FROM`;
4. vérifier que les autres colonnes sont conservées.

## 🌺 EXERCICE 6 — CORRECTION AVEC SET

Après rollback et nouvelle préparation :

```abap
UPDATE zt_<tri>_ord
  SET status = 'P'
  WHERE order_id = '9100000010'.
```

Vérifier que seul le statut change.

## 🌺 CRITÈRES DE VALIDATION

- [ ] L’écrasement est prévu avant exécution.
- [ ] Le cas est limité à une ligne de test.
- [ ] Les champs initiaux remplacent les anciennes valeurs.
- [ ] Le rollback restaure l’état.
- [ ] La lecture complète corrige le défaut.
- [ ] `UPDATE SET` modifie uniquement le champ demandé.
- [ ] Une structure partielle n’est plus utilisée avec `FROM`.

<details>
<summary>🍧 Afficher la solution</summary>

Après l’update partiel :

| Champ           | Valeur   |
| --------------- | -------- |
| `CUSTOMER_NAME` | initiale |
| `PRIORITY`      | initiale |
| `STATUS`        | `P`      |
| `CURRENCY`      | initiale |
| `AMOUNT`        | `0`      |
| `CREATED_BY`    | initiale |
| `CREATED_ON`    | initiale |

Correction ciblée :

```abap
UPDATE zt_<tri>_ord
  SET status = 'P'
  WHERE order_id = '9100000010'.

IF sy-subrc = 0.
  WRITE / 'Statut modifié sans réécriture des autres colonnes'.
ENDIF.
```

Correction par structure :

```abap
SELECT SINGLE *
  FROM zt_<tri>_ord
  WHERE order_id = '9100000010'
  INTO @DATA(ls_full_order).

IF sy-subrc = 0.

  ls_full_order-status = 'P'.

  UPDATE zt_<tri>_ord
    FROM @ls_full_order.

ENDIF.
```

</details>
