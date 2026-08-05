# 🌸 EXERCICES — SELECT SINGLE – EXTRACTION D’UN ENREGISTREMENT UNIQUE

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [SELECT SINGLE – EXTRACTION D’UN ENREGISTREMENT UNIQUE](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 10 - DBTAB INSTRUCTIONS/└─ 🧩 01 - SELECT/02 - 🍧 SELECT SINGLE.md>)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- lire au plus une ligne ;
- utiliser une clé unique ;
- contrôler un résultat absent ;
- ne pas utiliser une ancienne valeur après un échec ;
- distinguer `SELECT SINGLE` de `UP TO 1 ROWS`;
- choisir une ligne déterministe selon un ordre ;
- éviter un critère non unique lorsque l’identité de la ligne compte.

## 🌺 DURÉE INDICATIVE

55 à 70 minutes.

## 🌺 EXERCICE 1 — LECTURE PAR CLÉ

Déclarer :

```abap
PARAMETERS p_order TYPE zde_<tri>_oid
  DEFAULT '0000000002'.
```

Lire :

```abap
SELECT SINGLE order_id,
              customer_name,
              priority,
              status,
              amount,
              currency
  FROM zt_<tri>_ord
  WHERE order_id = @p_order
  INTO @DATA(ls_order).
```

Résultat attendu :

```text
0000000002 - Bruno Bernard - Priorité 3 - P - 75,00 EUR
```

## 🌺 EXERCICE 2 — CLÉ ET MANDANT

La clé DDIC est :

```text
MANDT + ORDER_ID
```

Répondre :

1. pourquoi le programme ne saisit-il pas explicitement `MANDT` ?
2. la lecture standard d’une table dépendante du mandant traite-t-elle le mandant courant ?
3. `ORDER_ID` est-il unique dans le mandant courant ?
4. peut-on conclure à une unicité globale entre tous les mandants ?
5. faut-il utiliser les additions de gestion intermandant dans cet exercice ?

## 🌺 EXERCICE 3 — LIGNE ABSENTE

Saisir :

```text
9999999999
```

Résultat attendu :

```text
Commande absente
```

Analyser le risque suivant :

```abap
WRITE / ls_order-customer_name.
```

après une lecture échouée.

Pourquoi le contenu de la cible ne doit-il pas être utilisé sans succès vérifié ?

## 🌺 EXERCICE 4 — CONDITION NON UNIQUE

Analyser :

```abap
SELECT SINGLE order_id,
              customer_name,
              amount
  FROM zt_<tri>_ord
  WHERE currency = 'EUR'
  INTO @DATA(ls_eur_order).
```

Répondre :

1. combien de commandes correspondent ?
2. laquelle est retournée ?
3. existe-t-il un ordre métier garanti ?
4. le mot `SINGLE` garantit-il que la condition est unique ?
5. quelle correction appliquer si toutes les commandes EUR sont nécessaires ?

## 🌺 EXERCICE 5 — LIGNE EUR LA PLUS ÉLEVÉE

Le besoin devient :

```text
Récupérer la commande EUR au montant le plus élevé.
```

Utiliser une cible table limitée à une ligne :

```abap
SELECT order_id,
       customer_name,
       amount,
       currency
  FROM zt_<tri>_ord
  WHERE currency = 'EUR'
  ORDER BY amount DESCENDING,
           order_id ASCENDING
  INTO TABLE @DATA(lt_top_order)
  UP TO 1 ROWS.
```

Lire ensuite l’index `1`.

Résultat attendu :

```text
0000000001 - Alice Martin - 125,50 EUR
```

Répondre :

1. pourquoi `ORDER BY` rend-il le choix explicite ?
2. pourquoi `order_id` est-il ajouté comme second critère ?
3. `SELECT SINGLE` accepterait-il ce besoin d’ordre ?
4. quel résultat produire si aucune ligne n’existe ?

## 🌺 EXERCICE 6 — EXISTENCE SEULE

Le besoin est uniquement :

```text
La commande 0000000002 existe-t-elle ?
```

Comparer :

```abap
SELECT SINGLE *
```

et :

```abap
SELECT SINGLE @abap_true
```

La seconde forme peut dépendre de la version ABAP. Si elle n’est pas disponible dans le système, sélectionner uniquement le champ clé.

Version compatible avec tous les exercices :

```abap
SELECT SINGLE order_id
  FROM zt_<tri>_ord
  WHERE order_id = @p_order
  INTO @DATA(lv_order_id).
```

## 🌺 EXERCICE 7 — DIAGNOSTIC DE CIBLE RÉSIDUELLE

Exécuter :

1. une lecture réussie dans une structure préexistante ;
2. une lecture absente dans la même structure ;
3. afficher la structure sans contrôler `sy-subrc`.

Décrire :

- symptôme ;
- cause ;
- correction ;
- test de non-régression.

## 🌺 CRITÈRES DE VALIDATION

- [ ] La lecture par clé retourne la bonne commande.
- [ ] Le mandant courant est expliqué.
- [ ] Le cas absent est traité.
- [ ] Une condition non unique est identifiée.
- [ ] `SINGLE` n’est pas confondu avec unicité.
- [ ] Le maximum est choisi avec `ORDER BY`.
- [ ] Un critère de départage est ajouté.
- [ ] La cible n’est jamais utilisée après un échec.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
PARAMETERS p_order TYPE zde_<tri>_oid
  DEFAULT '0000000002'.

SELECT SINGLE order_id,
              customer_name,
              priority,
              status,
              amount,
              currency
  FROM zt_<tri>_ord
  WHERE order_id = @p_order
  INTO @DATA(ls_order).

IF sy-subrc = 0.
  WRITE: / ls_order-order_id,
           '-',
           ls_order-customer_name,
           '- Priorité',
           ls_order-priority,
           '-',
           ls_order-status,
           '-',
           ls_order-amount,
           ls_order-currency.
ELSE.
  WRITE / 'Commande absente'.
ENDIF.
```

Sélection ordonnée :

```abap
SELECT order_id,
       customer_name,
       amount,
       currency
  FROM zt_<tri>_ord
  WHERE currency = 'EUR'
  ORDER BY amount DESCENDING,
           order_id ASCENDING
  INTO TABLE @DATA(lt_top_order)
  UP TO 1 ROWS.

READ TABLE lt_top_order INDEX 1
  INTO DATA(ls_top_order).

IF sy-subrc = 0.
  WRITE: / ls_top_order-order_id,
           ls_top_order-customer_name,
           ls_top_order-amount,
           ls_top_order-currency.
ELSE.
  WRITE / 'Aucune commande EUR'.
ENDIF.
```

</details>
