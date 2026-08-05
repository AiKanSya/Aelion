# 🌸 EXERCICES — FOR ALL ENTRIES IN – UTILISER UNE TABLE INTERNE COMME FILTRE

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- utiliser une table interne comme pilote ;
- vérifier qu’elle n’est pas vide ;
- limiter les composants de la table pilote ;
- supprimer les doublons inutiles du pilote ;
- comprendre l’union des résultats ;
- comprendre la suppression des doublons du résultat ;
- comparer `FOR ALL ENTRIES` et `JOIN`;
- éviter une lecture complète accidentelle.

## 🌺 DURÉE INDICATIVE

75 à 95 minutes.

## 🌺 EXERCICE 1 — TABLE PILOTE

Définir :

```abap
TYPES: BEGIN OF ty_status_filter,
         status TYPE zde_<tri>_stat,
       END OF ty_status_filter.

DATA lt_status_filter TYPE SORTED TABLE OF ty_status_filter
  WITH UNIQUE KEY status.
```

Alimenter :

```text
N
P
```

Pourquoi une table triée unique convient-elle à ce petit pilote ?

## 🌺 EXERCICE 2 — LECTURE

Exécuter uniquement dans la branche non vide :

```abap
IF lt_status_filter IS NOT INITIAL.

  SELECT order_id,
         customer_name,
         status,
         amount,
         currency
    FROM zt_<tri>_ord
    FOR ALL ENTRIES IN @lt_status_filter
    WHERE status = @lt_status_filter-status
    INTO TABLE @DATA(lt_orders).

ENDIF.
```

Résultat attendu :

```text
0000000001
0000000002
```

Trier la table interne après la lecture si un ordre est nécessaire.

## 🌺 EXERCICE 3 — TABLE PILOTE VIDE

Ne pas exécuter la requête sans protection.

Répondre :

1. la condition liée au pilote reste-t-elle active ?
2. quelles lignes peuvent être lues ?
3. pourquoi ce comportement est-il dangereux sur une grande table ?
4. quelle structure de contrôle est obligatoire ?
5. quel résultat fonctionnel produire lorsque le pilote est vide ?

## 🌺 EXERCICE 4 — DOUBLONS DU PILOTE

Utiliser temporairement une table standard contenant :

```text
N
N
P
P
```

Répondre :

1. les mêmes conditions sont-elles évaluées plusieurs fois ?
2. les doublons du résultat sont-ils conservés ?
3. faut-il néanmoins dédupliquer le pilote ?
4. quel intérêt de performance et de lisibilité existe ?
5. quelle catégorie de table peut imposer l’unicité ?

## 🌺 EXERCICE 5 — DOUBLONS DU RÉSULTAT

Sélectionner uniquement :

```text
CUSTOMER_NAME
```

avec un pilote contenant plusieurs commandes d’un même client.

Analyser :

1. des lignes identiques peuvent-elles être regroupées dans le résultat FAE ?
2. faut-il inclure la clé de la table source si chaque commande doit rester identifiable ?
3. pourquoi la liste de sélection influence-t-elle la distinction des lignes ?
4. quelle correction appliquer ?

## 🌺 EXERCICE 6 — PLUSIEURS COMPOSANTS

Définir un pilote contenant :

```text
STATUS
CURRENCY
```

Valeurs :

```text
N / EUR
C / USD
```

Utiliser les deux composants dans le `WHERE`.

Résultat attendu :

```text
0000000001
0000000003
```

## 🌺 EXERCICE 7 — JOIN OU FAE

Besoin :

```text
Lire commandes et texte du statut.
```

Comparer :

### Jointure

```text
Les deux tables sont disponibles en base
La relation est directe
Le texte est requis
```

### FAE

```text
La liste des statuts provient d’un traitement ABAP préalable
Seules certaines clés dynamiques sont requises
```

Répondre :

1. faut-il déclarer la jointure toujours plus rapide sans mesure ?
2. quelle solution exprime directement une relation entre tables ?
3. quand FAE reste-t-il pertinent ?
4. quel rôle peuvent jouer le buffering, le volume et le plan d’exécution ?
5. quelle preuve faut-il utiliser pour une décision de performance ?

## 🌺 EXERCICE 8 — SELECT DANS UNE BOUCLE OU FAE

Comparer cent `SELECT SINGLE` à une lecture FAE de cent clés.

Identifier :

- nombre d’allers-retours potentiels ;
- volume du pilote ;
- nécessité d’une clé sélective ;
- nécessité de dédupliquer ;
- nécessité de mesurer.

## 🌺 EXERCICE 9 — AUTRES CONDITIONS

Ajouter :

```abap
AND amount >= '75.00'
```

Le pilote vide ferait-il également disparaître cette condition ?

Répondre précisément :

- la condition FAE est ignorée ;
- les autres conditions explicites restent applicables.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le pilote contient `N` et `P`.
- [ ] Le contrôle non vide précède la requête.
- [ ] Les deux commandes sont retournées.
- [ ] Un pilote vide n’est jamais exécuté.
- [ ] Les doublons du pilote sont supprimés.
- [ ] La clé de la source est sélectionnée lorsque nécessaire.
- [ ] Deux composants du pilote sont utilisés.
- [ ] FAE et JOIN sont comparés sans affirmation absolue.
- [ ] Le `SELECT` dans une boucle est remplacé par une lecture en masse pertinente.
- [ ] Les conditions indépendantes du FAE sont distinguées.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
TYPES: BEGIN OF ty_status_filter,
         status TYPE zde_<tri>_stat,
       END OF ty_status_filter.

DATA lt_status_filter TYPE SORTED TABLE OF ty_status_filter
  WITH UNIQUE KEY status.

lt_status_filter = VALUE #(
  ( status = 'N' )
  ( status = 'P' )
).

IF lt_status_filter IS INITIAL.
  WRITE / 'Aucun statut à rechercher'.
  RETURN.
ENDIF.

SELECT order_id,
       customer_name,
       status,
       amount,
       currency
  FROM zt_<tri>_ord
  FOR ALL ENTRIES IN @lt_status_filter
  WHERE status = @lt_status_filter-status
  INTO TABLE @DATA(lt_orders).

SORT lt_orders BY order_id.

LOOP AT lt_orders INTO DATA(ls_order).
  WRITE / ls_order-order_id.
ENDLOOP.
```

Pilote à deux composants :

```abap
TYPES: BEGIN OF ty_filter,
         status   TYPE zde_<tri>_stat,
         currency TYPE waers,
       END OF ty_filter.

DATA lt_filter TYPE SORTED TABLE OF ty_filter
  WITH UNIQUE KEY status currency.

lt_filter = VALUE #(
  ( status = 'N' currency = 'EUR' )
  ( status = 'C' currency = 'USD' )
).

IF lt_filter IS NOT INITIAL.

  SELECT order_id,
         status,
         currency
    FROM zt_<tri>_ord
    FOR ALL ENTRIES IN @lt_filter
    WHERE status   = @lt_filter-status
      AND currency = @lt_filter-currency
    INTO TABLE @DATA(lt_filtered_orders).

ENDIF.
```

</details>
