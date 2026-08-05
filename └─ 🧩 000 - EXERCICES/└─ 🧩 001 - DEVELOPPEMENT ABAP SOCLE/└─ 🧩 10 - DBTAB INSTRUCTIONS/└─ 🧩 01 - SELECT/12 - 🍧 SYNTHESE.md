# 🌸 EXERCICES — SYNTHESE

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [SELECT – LECTURE DE DONNEES](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 10 - DBTAB INSTRUCTIONS/└─ 🧩 01 - SELECT/01 - 🍧 SELECT.md>)

> Cours associé : [SELECT SINGLE – EXTRACTION D’UN ENREGISTREMENT UNIQUE](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 10 - DBTAB INSTRUCTIONS/└─ 🧩 01 - SELECT/02 - 🍧 SELECT SINGLE.md>)

> Cours associé : [SELECT ALL – EXTRACTION DE PLUSIEURS ENREGISTREMENTS](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 10 - DBTAB INSTRUCTIONS/└─ 🧩 01 - SELECT/03 - 🍧 SELECT ALL.md>)

> Cours associé : [SELECT DISTINCT – EXTRACTION DE VALEURS UNIQUES](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 10 - DBTAB INSTRUCTIONS/└─ 🧩 01 - SELECT/04 - 🍧 SELECT DISTINCT.md>)

> Cours associé : [COL AS ALIAS – RENOMMER LES CHAMPS](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 10 - DBTAB INSTRUCTIONS/└─ 🧩 01 - SELECT/05 - 🍧 SELECT AS.md>)

> Cours associé : [FROM (AS ALIAS) – TABLE SOURCE ET ALIAS](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 10 - DBTAB INSTRUCTIONS/└─ 🧩 01 - SELECT/06 - 🍧 FROM.md>)

> Cours associé : [JOIN – COMBINER DES TABLES SAP](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 10 - DBTAB INSTRUCTIONS/└─ 🧩 01 - SELECT/07 - 🍧 JOIN.md>)

> Cours associé : [INTO – STOCKER LES RESULTATS D'UN SELECT](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 10 - DBTAB INSTRUCTIONS/└─ 🧩 01 - SELECT/08 - 🍧 INTO.md>)

> Cours associé : [WHERE – FILTRER LES RESULTATS D'UN SELECT](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 10 - DBTAB INSTRUCTIONS/└─ 🧩 01 - SELECT/09 - 🍧 WHERE.md>)

> Cours associé : [FOR ALL ENTRIES IN – UTILISER UNE TABLE INTERNE COMME FILTRE](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 10 - DBTAB INSTRUCTIONS/└─ 🧩 01 - SELECT/10 - 🍧 FOR ALL ENTRIES.md>)

> Cours associé : [ORDER BY – TRI DES RESULTATS](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 10 - DBTAB INSTRUCTIONS/└─ 🧩 01 - SELECT/11 - 🍧 ORDER BY.md>)

## 🌺 OBJECTIF

Construire un rapport de consultation complet sans lire de données inutiles.

## 🌺 DEMANDE

```text
Afficher les commandes correspondant à une sélection de statuts et de devises.
Présenter le texte du statut.
Trier par montant décroissant.
Limiter le nombre de lignes.
Permettre une recherche optionnelle par nom.
Afficher un récapitulatif par devise.
```

## 🌺 ÉCRAN DE SÉLECTION

```abap
PARAMETERS:
  p_name TYPE zde_<tri>_name LOWER CASE,
  p_max  TYPE i DEFAULT 100.

DATA:
  gv_status   TYPE zde_<tri>_stat,
  gv_currency TYPE waers.

SELECT-OPTIONS:
  s_stat FOR gv_status,
  s_curr FOR gv_currency.
```

## 🌺 RÈGLES

1. `p_max` doit être compris entre `1` et `500`.
2. Les sélections de statut et de devise peuvent être vides.
3. Si `p_name` est vide, ne pas ajouter de filtre sur le nom.
4. Si `p_name` est renseigné, rechercher la sous-chaîne.
5. Lire :
   - commande ;
   - client ;
   - priorité ;
   - statut ;
   - libellé ;
   - montant ;
   - devise ;
   - date.
6. Utiliser une jointure.
7. Trier par :
   - montant décroissant ;
   - commande croissante.
8. Limiter avec `UP TO p_max ROWS`.
9. Afficher le nombre de lignes.
10. Calculer un récapitulatif par devise avec une seconde requête ou avec la table résultat.
11. Traiter le cas vide.

## 🌺 CONSTRUCTION DU MOTIF

```abap
DATA lv_name_pattern TYPE string.

IF p_name IS NOT INITIAL.
  lv_name_pattern = |%{ p_name }%|.
ENDIF.
```

## 🌺 VARIANTE SIMPLE

Pour éviter une condition SQL dynamique dans cet exercice de base, utiliser deux requêtes statiques :

```text
p_name initial
→ requête sans LIKE

p_name non initial
→ requête avec LIKE
```

Les deux requêtes doivent sélectionner les mêmes colonnes et appliquer le même ordre.

## 🌺 CAS NOMINAL

```text
Statuts : N, P
Devise  : EUR
Nom     : vide
Maximum : 100
```

Résultat attendu :

```text
0000000001 Alice Martin 2 N Nouvelle 125,50 EUR
0000000002 Bruno Bernard 3 P En préparation 75,00 EUR

Nombre de lignes : 2
EUR : 2 commandes - 200,50
```

## 🌺 CAS AVEC NOM

```text
Nom : Martin
```

Résultat attendu avec statuts et devises non restrictifs :

```text
Alice Martin
Claire Martin
```

## 🌺 CAS LIMITES

| Cas                   | Résultat                         |
| --------------------- | -------------------------------- |
| `p_max = 0`           | valeur refusée                   |
| `p_max = 501`         | valeur refusée                   |
| Statut `X`            | aucune ligne                     |
| Devise `JPY`          | aucune ligne                     |
| Nom inconnu           | aucune ligne                     |
| Maximum `1`           | une seule ligne selon le tri     |
| Sélections vides      | toutes les lignes dans la limite |
| Statut sans référence | absent avec `INNER JOIN`         |

## 🌺 QUESTIONS D’ANALYSE

1. Pourquoi un `INNER JOIN` exclut-il un statut sans référence ?
2. Quand faudrait-il utiliser un `LEFT OUTER JOIN` ?
3. Pourquoi le maximum doit-il être validé ?
4. Pourquoi l’ordre possède-t-il un critère secondaire ?
5. Pourquoi le total est-il séparé par devise ?
6. Pourquoi une table de sélection vide ne doit-elle pas être confondue avec un pilote FAE vide ?
7. Pourquoi les deux branches doivent-elles sélectionner exactement les mêmes colonnes ?
8. Quel risque existe avec une recherche `%texte%` sur un très grand volume ?
9. Quelle évolution moderne pourrait centraliser la vue de données ?
10. Quel outil permettrait d’analyser la performance réelle ?

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le maximum est validé.
- [ ] Les variables hôtes utilisent `@`.
- [ ] La jointure inclut `MANDT` et `STATUS`.
- [ ] Les sélections multiples sont appliquées.
- [ ] Le nom est facultatif.
- [ ] Le motif est construit dans le programme.
- [ ] Les colonnes sont identiques dans les deux branches.
- [ ] Le tri est déterministe.
- [ ] Le nombre de lignes est affiché.
- [ ] Les montants sont regroupés par devise.
- [ ] Le cas vide est traité.
- [ ] Aucun `SELECT *` n’est utilisé.
- [ ] Aucun `SELECT` n’est exécuté dans une boucle.

<details>
<summary>🍧 Afficher la solution complète</summary>

```abap
REPORT zaelion_<tri>_select.

PARAMETERS:
  p_name TYPE zde_<tri>_name LOWER CASE,
  p_max  TYPE i DEFAULT 100.

DATA:
  gv_status   TYPE zde_<tri>_stat,
  gv_currency TYPE waers.

SELECT-OPTIONS:
  s_stat FOR gv_status,
  s_curr FOR gv_currency.

START-OF-SELECTION.

  IF p_max NOT BETWEEN 1 AND 500.
    MESSAGE 'Le maximum doit être compris entre 1 et 500'
      TYPE 'S'
      DISPLAY LIKE 'E'.
    RETURN.
  ENDIF.

  DATA lv_name_pattern TYPE string.

  IF p_name IS NOT INITIAL.
    lv_name_pattern = |%{ p_name }%|.
  ENDIF.

  IF p_name IS INITIAL.

    SELECT ord~order_id,
           ord~customer_name,
           ord~priority,
           ord~status,
           stat~status_text,
           ord~amount,
           ord~currency,
           ord~created_on
      FROM zt_<tri>_ord AS ord
      INNER JOIN zt_<tri>_stat AS stat
        ON  stat~mandt  = ord~mandt
        AND stat~status = ord~status
      WHERE ord~status   IN @s_stat
        AND ord~currency IN @s_curr
      ORDER BY ord~amount DESCENDING,
               ord~order_id ASCENDING
      INTO TABLE @DATA(lt_orders)
      UP TO @p_max ROWS.

  ELSE.

    SELECT ord~order_id,
           ord~customer_name,
           ord~priority,
           ord~status,
           stat~status_text,
           ord~amount,
           ord~currency,
           ord~created_on
      FROM zt_<tri>_ord AS ord
      INNER JOIN zt_<tri>_stat AS stat
        ON  stat~mandt  = ord~mandt
        AND stat~status = ord~status
      WHERE ord~status        IN @s_stat
        AND ord~currency      IN @s_curr
        AND ord~customer_name LIKE @lv_name_pattern
      ORDER BY ord~amount DESCENDING,
               ord~order_id ASCENDING
      INTO TABLE @lt_orders
      UP TO @p_max ROWS.

  ENDIF.

  IF lt_orders IS INITIAL.
    WRITE / 'Aucune commande trouvée'.
    RETURN.
  ENDIF.

  LOOP AT lt_orders INTO DATA(ls_order).
    WRITE: / ls_order-order_id,
             ls_order-customer_name,
             ls_order-priority,
             ls_order-status,
             ls_order-status_text,
             ls_order-amount,
             ls_order-currency,
             ls_order-created_on.
  ENDLOOP.

  WRITE / |Nombre de lignes : { lines( lt_orders ) }|.

  LOOP AT lt_orders INTO ls_order
    GROUP BY ( currency = ls_order-currency )
    ASCENDING
    ASSIGNING FIELD-SYMBOL(<currency_group>).

    DATA lv_count TYPE i.
    DATA lv_total TYPE p LENGTH 12 DECIMALS 2.

    CLEAR:
      lv_count,
      lv_total.

    LOOP AT GROUP <currency_group>
      ASSIGNING FIELD-SYMBOL(<order>).

      lv_count = lv_count + 1.
      lv_total = lv_total + <order>-amount.

    ENDLOOP.

    WRITE: / <currency_group>-currency,
             ':',
             lv_count,
             'commande(s) -',
             lv_total.

  ENDLOOP.
```

### Point de compatibilité

Selon la version du système, la position de :

```abap
UP TO @p_max ROWS
```

et l’usage d’une variable hôte pour la limite peuvent varier.

Utiliser l’aide F1 du système et adapter uniquement la position syntaxique, sans modifier la logique.

### Point sur les sélections vides

Une table de sélection initiale utilisée avec :

```abap
column IN @selection_table
```

ne restreint pas le résultat. L’expression est vraie pour toutes les lignes.

Ainsi :

- `s_stat` vide accepte tous les statuts ;
- `s_curr` vide accepte toutes les devises ;
- une table non vide applique ses inclusions et exclusions.

</details>
