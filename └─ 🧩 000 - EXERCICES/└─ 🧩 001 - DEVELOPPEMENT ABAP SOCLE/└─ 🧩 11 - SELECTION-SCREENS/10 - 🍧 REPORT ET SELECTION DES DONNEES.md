# 🌸 EXERCICE — REPORT ET SÉLECTION DES DONNÉES

## 🌺 OBJECTIFS

- déclarer un report ;
- séparer sélection et affichage ;
- construire un type de sortie ;
- utiliser les critères ;
- limiter le volume ;
- traiter un résultat vide ;
- éviter `SELECT *`.

## 🌺 DURÉE INDICATIVE

65 à 80 minutes.

## 🌺 DÉCLARATION

```abap
REPORT zaelion_<tri>_report.
```

## 🌺 TYPE DE SORTIE

```abap
TYPES: BEGIN OF ty_output,
         order_id     TYPE zt_<tri>_ord-order_id,
         customer_name TYPE zt_<tri>_ord-customer_name,
         priority     TYPE zt_<tri>_ord-priority,
         status       TYPE zt_<tri>_ord-status,
         status_text  TYPE zt_<tri>_stat-status_text,
         amount       TYPE zt_<tri>_ord-amount,
         currency     TYPE zt_<tri>_ord-currency,
         created_by   TYPE zt_<tri>_ord-created_by,
         created_on   TYPE zt_<tri>_ord-created_on,
       END OF ty_output.

DATA gt_output TYPE STANDARD TABLE OF ty_output
  WITH EMPTY KEY.
```

## 🌺 EXERCICE 1 — NOM FACULTATIF

Construire :

```abap
DATA lv_name_pattern TYPE string.

IF p_name IS NOT INITIAL.
  lv_name_pattern = |%{ p_name }%|.
ENDIF.
```

Utiliser deux branches statiques :

```text
nom vide
→ requête sans LIKE

nom renseigné
→ requête avec LIKE
```

## 🌺 EXERCICE 2 — JOINTURE

Lire les commandes et le texte du statut.

Inclure la relation :

```abap
stat~mandt  = ord~mandt
stat~status = ord~status
```

## 🌺 EXERCICE 3 — CRITÈRES

Appliquer :

```text
s_order
s_stat
s_curr
s_date
p_name
```

## 🌺 EXERCICE 4 — LIMITE

Utiliser :

```text
p_max
```

La syntaxe exacte de `UP TO` dépend de la version ABAP.

## 🌺 EXERCICE 5 — TRI

```text
Montant décroissant
Commande croissante
```

## 🌺 EXERCICE 6 — RÉSULTAT VIDE

```abap
IF gt_output IS INITIAL.
  MESSAGE 'Aucune donnée trouvée'
    TYPE 'S'.
  RETURN.
ENDIF.
```

## 🌺 EXERCICE 7 — MODE DÉTAIL

Si `p_detail` est initial :

- ne pas exposer `CREATED_BY`;
- ne pas afficher les colonnes techniques.

Deux stratégies :

1. type de sortie distinct ;
2. masquer les colonnes ALV.

Pour l’exercice, conserver les données dans la table puis masquer les colonnes dans l’ALV.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le report est exécutable.
- [ ] Le type de sortie est explicite.
- [ ] La jointure est correcte.
- [ ] Les cinq critères sont utilisés.
- [ ] La limite est appliquée.
- [ ] Le tri est déterministe.
- [ ] Le cas vide est traité.
- [ ] Aucun `SELECT *` n’est utilisé.
- [ ] Aucun `SELECT` n’est dans une boucle.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
FORM select_data.

  DATA lv_name_pattern TYPE string.

  IF p_name IS INITIAL.

    SELECT ord~order_id,
           ord~customer_name,
           ord~priority,
           ord~status,
           stat~status_text,
           ord~amount,
           ord~currency,
           ord~created_by,
           ord~created_on
      FROM zt_<tri>_ord AS ord
      INNER JOIN zt_<tri>_stat AS stat
        ON  stat~mandt  = ord~mandt
        AND stat~status = ord~status
      WHERE ord~order_id  IN @s_order
        AND ord~status    IN @s_stat
        AND ord~currency  IN @s_curr
        AND ord~created_on IN @s_date
      ORDER BY ord~amount DESCENDING,
               ord~order_id ASCENDING
      INTO TABLE @gt_output
      UP TO @p_max ROWS.

  ELSE.

    lv_name_pattern = |%{ p_name }%|.

    SELECT ord~order_id,
           ord~customer_name,
           ord~priority,
           ord~status,
           stat~status_text,
           ord~amount,
           ord~currency,
           ord~created_by,
           ord~created_on
      FROM zt_<tri>_ord AS ord
      INNER JOIN zt_<tri>_stat AS stat
        ON  stat~mandt  = ord~mandt
        AND stat~status = ord~status
      WHERE ord~order_id   IN @s_order
        AND ord~status     IN @s_stat
        AND ord~currency   IN @s_curr
        AND ord~created_on IN @s_date
        AND ord~customer_name LIKE @lv_name_pattern
      ORDER BY ord~amount DESCENDING,
               ord~order_id ASCENDING
      INTO TABLE @gt_output
      UP TO @p_max ROWS.

  ENDIF.

ENDFORM.
```

</details>
