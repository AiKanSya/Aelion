# 🌸 SOMMAIRE — └─ 🧩 02 - INSERT

## 🌺 OBJECTIF DU PARCOURS

Ces exercices renforcent l’insertion de données dans une table de base de données avec ABAP SQL.

Le stagiaire doit être capable de :

- distinguer une insertion en base d’un ajout dans une table interne ;
- insérer une ligne depuis une structure ;
- utiliser les deux syntaxes d’insertion individuelle ;
- insérer plusieurs lignes depuis une table interne ;
- interpréter correctement `sy-subrc` et `sy-dbcnt` ;
- gérer une clé primaire déjà présente ;
- utiliser `ACCEPTING DUPLICATE KEYS` de manière explicite ;
- gérer l’exception `CX_SY_OPEN_SQL_DB` lors d’une insertion de masse stricte ;
- distinguer `INSERT`, `UPDATE` et `MODIFY`;
- contrôler les données métier avant l’écriture ;
- comprendre la portée de `COMMIT WORK` et `ROLLBACK WORK` ;
- vérifier une insertion par une relecture ;
- éviter les insertions répétées dans une boucle ;
- construire un traitement reproductible sans altérer les données des chapitres précédents.

## 🌺 COURS ASSOCIÉ

- `10 - DBTAB INSTRUCTIONS/02 - INSERT/01 - 🍧 INSERT INTO.md`

## 🌺 PROGRAMME UTILISÉ

Créer le programme exécutable suivant :

```text
ZAELION_<TRI>_INSERT
```

Remplacer `<TRI>` par le trigramme attribué.

Enregistrer le programme dans le package et l’ordre de transport utilisés pour les exercices précédents.

## 🌺 TABLES UTILISÉES

Les exercices réutilisent les tables créées dans `08 - SE11`.

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
9000000000 à 9000000099
```

Cette plage est réservée aux tests du chapitre `INSERT`.

> [!CAUTION]
> Ne jamais utiliser les identifiants fonctionnels `0000000001`, `0000000002` et `0000000003` pour les tests d’insertion.  
> Ils appartiennent au jeu de données créé dans les chapitres précédents.

## 🌺 PRÉREQUIS

La table des statuts doit contenir au minimum :

| Statut | Libellé        |
| ------ | -------------- |
| `N`    | Nouvelle       |
| `P`    | En préparation |
| `C`    | Clôturée       |

Vérifier les données avant les exercices :

```abap
SELECT status,
       status_text
  FROM zt_<tri>_stat
  ORDER BY status
  INTO TABLE @DATA(lt_statuses).
```

## 🌺 RÈGLES COMMUNES

- Travailler uniquement dans un système et un mandant de développement autorisés.
- Utiliser uniquement les tables `Z` attribuées.
- Ne jamais insérer de données dans une table standard SAP.
- Ne jamais modifier les commandes fonctionnelles des chapitres précédents.
- Utiliser la plage réservée `9000000000` à `9000000099`.
- Contrôler les données avant l’insertion.
- Contrôler `sy-subrc` immédiatement après `INSERT`.
- Sauvegarder `sy-dbcnt` immédiatement si sa valeur doit être utilisée.
- Ne pas considérer `sy-subrc = 0` comme une validation métier complète.
- Relire les données insérées avant de conclure.
- Utiliser `ROLLBACK WORK` après les tests, sauf exercice explicite sur le commit.
- Ne pas placer un `COMMIT WORK` dans une méthode réutilisable sans que cette méthode soit responsable de la transaction complète.
- Ne pas exécuter une insertion de masse stricte contenant volontairement un doublon sans bloc `TRY ... CATCH`.
- Ne pas utiliser `MODIFY` lorsque le besoin exige explicitement de refuser une clé existante.
- Ne pas utiliser une boucle de `INSERT` individuels lorsqu’une insertion de masse convient.
- Conserver une preuve vérifiable :
  - code ;
  - valeurs de `sy-subrc` et `sy-dbcnt` ;
  - résultat de la relecture ;
  - résultat après rollback ;
  - explication du cas nominal et du cas limite.

---

# 🌸 RECTIFICATIONS TECHNIQUES APPLIQUÉES

## 🌺 SYNTAXES D’INSERTION INDIVIDUELLE

Les deux formes suivantes insèrent une ligne et ont le même comportement :

```abap
INSERT INTO zt_<tri>_ord VALUES @ls_order.
```

```abap
INSERT zt_<tri>_ord FROM @ls_order.
```

Règle syntaxique :

```text
VALUES
→ nécessite INTO

FROM
→ ne s’écrit pas avec INTO
```

## 🌺 INSERTION DE MASSE

Pour une table interne :

```abap
INSERT zt_<tri>_ord
  FROM TABLE @lt_orders.
```

Il n’existe pas de variante :

```abap
INSERT INTO ... VALUES table_interne
```

pour insérer l’ensemble des lignes d’une table interne.

## 🌺 CLÉ DÉJÀ PRÉSENTE

### Insertion d’une seule ligne

Lorsqu’une ligne possédant la même clé primaire ou une valeur dupliquée dans un index secondaire unique existe déjà :

```text
sy-subrc = 4
sy-dbcnt = 0
```

La ligne existante n’est pas remplacée.

### Insertion de masse stricte

Sans :

```abap
ACCEPTING DUPLICATE KEYS
```

une clé dupliquée pendant l’insertion de masse peut lever l’exception récupérable :

```abap
CX_SY_OPEN_SQL_DB
```

Le traitement doit gérer l’exception et décider du rollback.

### Insertion de masse tolérante

Avec :

```abap
ACCEPTING DUPLICATE KEYS
```

les lignes insérables sont ajoutées et les doublons sont ignorés.

Résultat partiel :

```text
sy-subrc = 4
sy-dbcnt = nombre de lignes réellement insérées
```

## 🌺 TABLE INTERNE VIDE

L’instruction suivante sur une table interne vide est considérée comme réussie :

```abap
INSERT zt_<tri>_ord
  FROM TABLE @lt_orders.
```

Résultat :

```text
sy-subrc = 0
sy-dbcnt = 0
```

Il faut donc contrôler la table source avant l’écriture lorsqu’une absence de données constitue une anomalie fonctionnelle.

## 🌺 TRANSACTION

Une ligne insérée devient permanente lors du prochain commit de base de données.

Avant ce commit, elle peut encore être annulée par :

```abap
ROLLBACK WORK.
```

Les écritures acquièrent des verrous de base jusqu’au commit ou au rollback.

## 🌺 INSERT NE MET PAS À JOUR

`INSERT` signifie :

```text
Créer une nouvelle ligne.
Refuser une clé déjà présente.
```

Il ne signifie pas :

```text
Créer ou remplacer.
```

Pour une modification, utiliser une instruction adaptée dans le chapitre correspondant.

## 🌺 CLÉ ÉTRANGÈRE ET RÈGLE MÉTIER

La relation DDIC entre :

```text
ZT_<TRI>_ORD-STATUS
```

et :

```text
ZT_<TRI>_STAT-STATUS
```

ne dispense pas la logique d’écriture de contrôler le statut.

Le programme doit éviter d’insérer une commande portant un statut inconnu.
