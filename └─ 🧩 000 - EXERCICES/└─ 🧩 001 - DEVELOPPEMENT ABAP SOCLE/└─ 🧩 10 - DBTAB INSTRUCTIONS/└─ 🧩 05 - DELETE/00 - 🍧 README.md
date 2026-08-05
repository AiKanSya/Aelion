# 🌸 SOMMAIRE — └─ 🧩 05 - DELETE

## 🌺 OBJECTIF DU PARCOURS

Ces exercices renforcent la suppression de lignes dans une table de base de données avec ABAP SQL.

Le parcours reprend les deux chapitres présents dans le cours :

1. suppression ciblée d’une ligne ;
2. suppression de plusieurs lignes.

Il ajoute les notions indispensables à une utilisation sûre :

- suppression par condition `WHERE` ;
- suppression par clé primaire depuis une structure ;
- suppression de plusieurs clés depuis une table interne ;
- interprétation de `sy-subrc` et `sy-dbcnt` ;
- résultat partiel d’une suppression par table interne ;
- danger d’une condition absente ou vide ;
- prévisualisation avant suppression ;
- limitation à une plage de données autorisée ;
- contrôle des dépendances métier ;
- `COMMIT WORK` et `ROLLBACK WORK` ;
- concurrence et verrouillage ;
- choix entre suppression unitaire, suppression par lot et suppression conditionnelle ;
- relecture et preuve de non-régression.

Le stagiaire doit être capable de supprimer uniquement les lignes prévues, de prouver le résultat et d’annuler les tests sans altérer les données des chapitres précédents.

## 🌺 COURS ASSOCIÉS

- `10 - DBTAB INSTRUCTIONS/05 - DELETE/01 - 🍧 DELETE SINGLE.md`
- `10 - DBTAB INSTRUCTIONS/05 - DELETE/03 - 🍧 DELETE MULTIPLE.md`

## 🌺 PROGRAMME UTILISÉ

Créer le programme exécutable suivant :

```text
ZAELION_<TRI>_DELETE
```

Remplacer `<TRI>` par le trigramme attribué.

Enregistrer le programme dans le package et l’ordre de transport utilisés pour les exercices précédents.

## 🌺 TABLES UTILISÉES

Les exercices réutilisent les tables personnalisées créées dans `08 - SE11`.

### Table des commandes

```text
ZT_<TRI>_ORD
```

Champs :

```text
MANDT
ORDER_ID
CUSTOMER_NAME
PRIORITY
STATUS
CURRENCY
AMOUNT
CREATED_BY
CREATED_ON
```

Clé primaire :

```text
MANDT + ORDER_ID
```

### Table des statuts

```text
ZT_<TRI>_STAT
```

Champs :

```text
MANDT
STATUS
STATUS_TEXT
```

## 🌺 PLAGE D’IDENTIFIANTS RÉSERVÉE

Les exercices utilisent exclusivement :

```text
9300000000 à 9300000099
```

Cette plage est réservée au chapitre `DELETE`.

> [!CAUTION]
> Ne jamais supprimer les commandes fonctionnelles :
>
> ```text
> 0000000001
> 0000000002
> 0000000003
> ```
>
> Les données des chapitres précédents doivent rester intactes.

## 🌺 PRINCIPE D’ISOLATION DES TESTS

Sauf exercice explicitement consacré au commit, chaque test suit ce cycle :

```text
1. Vérifier que l’identifiant de test n’existe pas.
2. Insérer une ligne de préparation sans commit.
3. Exécuter DELETE.
4. Vérifier l’absence.
5. Exécuter ROLLBACK WORK.
6. Vérifier le retour à l’état initial : la ligne de test reste absente.
7. Terminer sans commit.
```

La suppression et l’insertion de préparation appartiennent à la même LUW de base de données.

> [!IMPORTANT]
> L’état initial est l’absence de la ligne de test.
>
> L’insertion de préparation et la suppression sont réalisées dans la même LUW. Le rollback annule les deux opérations et restaure donc l’état initial : la ligne reste absente.
>
> Pour démontrer qu’un rollback restaure une ligne supprimée, il faut d’abord valider la ligne de préparation par un commit. Ce cas est traité séparément dans l’exercice consacré aux transactions.

## 🌺 RÈGLES COMMUNES

- Travailler uniquement dans un système et un mandant de développement autorisés.
- Utiliser exclusivement les tables `Z` attribuées.
- Ne jamais supprimer de données dans une table standard SAP.
- Ne jamais supprimer une donnée hors de la plage `9300000000` à `9300000099`.
- Vérifier la table et le mandant avant l’écriture.
- Prévisualiser les lignes avant toute suppression multiple.
- Comparer le nombre attendu au nombre réellement supprimé.
- Contrôler `sy-subrc` immédiatement après `DELETE`.
- Sauvegarder `sy-dbcnt` immédiatement si sa valeur doit être réutilisée.
- Ne jamais exécuter volontairement une suppression sans `WHERE` dans les exercices.
- Ne jamais construire une condition dynamique vide.
- Ne jamais utiliser une table de sélection initiale sans avoir décidé explicitement que l’absence de filtre doit autoriser toutes les lignes.
- Ne pas considérer `sy-subrc = 0` comme une validation métier complète.
- Ne pas valider un résultat partiel lorsqu’un traitement atomique est attendu.
- Ne pas placer un `COMMIT WORK` dans une méthode utilitaire qui ne possède pas la transaction complète.
- Ne pas considérer une prélecture comme une protection suffisante contre la concurrence.
- Utiliser un objet de verrouillage ou une stratégie de version lorsque plusieurs utilisateurs peuvent agir sur la même donnée.
- Relire les données après l’opération.
- Conserver une preuve vérifiable :
  - données avant ;
  - critères ;
  - nombre attendu ;
  - `sy-subrc` ;
  - `sy-dbcnt` ;
  - données après ;
  - résultat après rollback.

---

# 🌸 RECTIFICATIONS TECHNIQUES APPLIQUÉES

## 🌺 « DELETE SINGLE » N’EST PAS UNE INSTRUCTION DISTINCTE

La syntaxe suivante peut supprimer zéro, une ou plusieurs lignes :

```abap
DELETE FROM zt_<tri>_ord
  WHERE condition.
```

Elle supprime une seule ligne uniquement lorsque la condition identifie une clé unique.

Exemple réellement unitaire dans le mandant courant :

```abap
DELETE FROM zt_<tri>_ord
  WHERE order_id = @lv_order_id.
```

`ORDER_ID` est unique dans le mandant courant du modèle pédagogique.

Une condition non unique telle que :

```abap
WHERE status = 'N'
```

peut supprimer plusieurs lignes.

## 🌺 SUPPRESSION PAR CONDITION

Syntaxe :

```abap
DELETE FROM zt_<tri>_ord
  WHERE order_id = @lv_order_id.
```

Résultats :

```text
Au moins une ligne supprimée
→ sy-subrc = 0

Aucune ligne supprimée
→ sy-subrc = 4
```

`sy-dbcnt` contient le nombre de lignes supprimées.

## 🌺 SUPPRESSION PAR CLÉ DEPUIS UNE STRUCTURE

Syntaxe :

```abap
DELETE zt_<tri>_ord
  FROM @ls_order.
```

La clé primaire contenue dans la structure identifie la ligne à supprimer.

Les colonnes non clés ne participent pas à l’identification de la ligne.

Pour la clarté et la compatibilité, les exercices utilisent une structure typée avec la table DDIC.

## 🌺 SUPPRESSION DE PLUSIEURS CLÉS

Syntaxe :

```abap
DELETE zt_<tri>_ord
  FROM TABLE @lt_orders.
```

Chaque ligne de la table interne fournit une clé primaire.

Si une clé n’existe pas, le traitement continue avec les autres lignes.

Résultats :

```text
Toutes les lignes sources ont trouvé une ligne en base
→ sy-subrc = 0

Au moins une clé source n’existe pas
→ sy-subrc = 4
```

`sy-dbcnt` contient le nombre de lignes réellement supprimées.

Exemple :

```text
3 clés demandées
2 clés présentes
1 clé absente

sy-subrc = 4
sy-dbcnt = 2
```

## 🌺 TABLE INTERNE VIDE

Avec une source vide :

```abap
DELETE zt_<tri>_ord
  FROM TABLE @lt_orders.
```

le résultat technique est :

```text
sy-subrc = 0
sy-dbcnt = 0
```

L’instruction n’est pas en erreur. L’absence de demande peut néanmoins constituer une anomalie fonctionnelle.

## 🌺 SUPPRESSION SANS WHERE

La syntaxe suivante supprime toutes les lignes accessibles de la table cible selon la gestion du mandant :

```abap
DELETE FROM zt_<tri>_ord.
```

Elle est interdite dans les exercices.

> [!CAUTION]
> Un commentaire, une convention de nommage ou une limite de résultats n’empêche pas cette suppression.
>
> La protection doit être intégrée à la logique :
>
> - filtre obligatoire ;
> - plage autorisée ;
> - prévisualisation ;
> - nombre maximal ;
> - confirmation ou mode exécution ;
> - transaction contrôlée.

## 🌺 TABLE DE SÉLECTION INITIALE

Une condition de type :

```abap
WHERE order_id IN @lr_order_id
```

avec une table de sélection initiale ne restreint pas les lignes.

Dans une suppression, cela peut conduire à supprimer toutes les lignes satisfaisant les autres conditions, voire toutes les lignes accessibles si aucun autre filtre n’existe.

Le contrôle suivant est obligatoire lorsque le filtre doit être fourni :

```abap
IF lr_order_id IS INITIAL.
  WRITE / 'Aucun identifiant fourni : suppression refusée'.
  RETURN.
ENDIF.
```

## 🌺 CONDITION DYNAMIQUE VIDE

Une condition dynamique construite à partir d’une table ou d’une chaîne vide peut supprimer un périmètre beaucoup plus large que prévu.

Les exercices n’utilisent pas de `WHERE` dynamique.

## 🌺 TRANSACTION

Les lignes sont supprimées définitivement lors du prochain commit de base de données.

Avant le commit :

```abap
ROLLBACK WORK.
```

peut annuler la suppression.

`DELETE` pose des verrous de base de données jusqu’au commit ou au rollback.

## 🌺 DÉPENDANCES MÉTIER

La table de statuts peut être référencée par la table des commandes.

Supprimer un statut encore utilisé peut créer une incohérence fonctionnelle si la base de données n’impose pas elle-même une contrainte physique.

Le programme doit vérifier :

```text
Le statut existe-t-il ?
Des commandes utilisent-elles ce statut ?
La règle autorise-t-elle la suppression ?
```

## 🌺 CONCURRENCE

Entre la prévisualisation et la suppression :

- une nouvelle ligne peut apparaître ;
- une ligne peut être modifiée ;
- une ligne peut déjà être supprimée ;
- le nombre final peut différer.

Lorsque le nombre exact est critique :

- verrouiller le périmètre métier ;
- ajouter des conditions sur l’état attendu ;
- contrôler `sy-dbcnt`;
- annuler si le résultat diffère ;
- relire après l’opération.

---

# 🌸 BLOC DE PRÉPARATION COMMUN

Le bloc suivant prépare une ligne de test :

```abap
CONSTANTS lc_order_id TYPE zde_<tri>_oid
  VALUE '9300000001'.

SELECT SINGLE order_id
  FROM zt_<tri>_ord
  WHERE order_id = @lc_order_id
  INTO @DATA(lv_existing_order).

IF sy-subrc = 0.
  WRITE / |Le test est interrompu : { lc_order_id } existe déjà|.
  RETURN.
ENDIF.

DATA(ls_seed_order) = VALUE zt_<tri>_ord(
  mandt         = sy-mandt
  order_id      = lc_order_id
  customer_name = 'Commande de test DELETE'
  priority      = '1'
  status        = 'N'
  currency      = 'EUR'
  amount        = '100.00'
  created_by    = sy-uname
  created_on    = sy-datum
).

INSERT zt_<tri>_ord
  FROM @ls_seed_order.

IF sy-subrc <> 0.
  WRITE / 'Préparation impossible'.
  ROLLBACK WORK.
  RETURN.
ENDIF.
```
