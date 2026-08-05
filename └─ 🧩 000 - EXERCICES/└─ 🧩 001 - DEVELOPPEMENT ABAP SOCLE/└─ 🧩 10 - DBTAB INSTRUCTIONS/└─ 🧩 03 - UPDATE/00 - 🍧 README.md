# 🌸 SOMMAIRE — └─ 🧩 03 - UPDATE

## 🌺 OBJECTIF DU PARCOURS

Ces exercices renforcent la modification de lignes existantes dans une table de base de données avec ABAP SQL.

Le parcours reprend les deux chapitres présents dans le cours :

1. `UPDATE ... FROM` avec une structure ;
2. `UPDATE ... FROM TABLE` avec une table interne.

Il ajoute les contrôles indispensables à une utilisation correcte :

- préparation complète de la source ;
- contrôle de la clé primaire ;
- risque d’écrasement des champs non alimentés ;
- résultat partiel lors d’une mise à jour de masse ;
- interprétation de `sy-subrc` et `sy-dbcnt` ;
- transaction, rollback et commit ;
- validation métier ;
- concurrence et verrouillage ;
- comparaison avec `UPDATE ... SET`;
- relecture et preuve de non-régression.

Le stagiaire doit être capable de :

- mettre à jour une ligne existante ;
- mettre à jour plusieurs lignes en une instruction ;
- distinguer une mise à jour complète d’une mise à jour ciblée ;
- traiter une clé absente ;
- détecter un lot partiellement mis à jour ;
- refuser une source vide lorsqu’elle constitue une erreur métier ;
- préserver les données non concernées ;
- annuler les tests ;
- éviter une mise à jour concurrente non maîtrisée ;
- choisir entre `UPDATE`, `INSERT` et `MODIFY`.

## 🌺 COURS ASSOCIÉS

- `10 - DBTAB INSTRUCTIONS/03 - UPDATE/01 - 🍧 UPDATE FROM STRUCTURE.md`
- `10 - DBTAB INSTRUCTIONS/03 - UPDATE/02 - 🍧 UPDATE FROM ITAB.md`

## 🌺 PROGRAMME UTILISÉ

Créer le programme exécutable suivant :

```text
ZAELION_<TRI>_UPDATE
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
9100000000 à 9100000099
```

Cette plage est réservée aux tests du chapitre `UPDATE`.

> [!CAUTION]
> Ne jamais utiliser les commandes fonctionnelles :
>
> ```text
> 0000000001
> 0000000002
> 0000000003
> ```
>
> Les exercices ne doivent pas modifier les données créées dans les chapitres précédents.

## 🌺 PRINCIPE D’ISOLATION DES TESTS

Chaque exercice pratique doit suivre ce cycle :

```text
1. Vérifier que l’identifiant de test n’existe pas.
2. Insérer une ligne de préparation.
3. Exécuter l’UPDATE.
4. Relire et contrôler.
5. Exécuter ROLLBACK WORK.
6. Vérifier que la ligne de test a disparu.
```

La ligne de préparation et sa modification appartiennent ainsi à la même LUW de base de données.

## 🌺 RÈGLES COMMUNES

- Travailler uniquement dans un système et un mandant de développement autorisés.
- Utiliser exclusivement les tables `Z` attribuées.
- Ne jamais modifier une table standard SAP.
- Ne jamais modifier les commandes fonctionnelles des chapitres précédents.
- Utiliser uniquement la plage `9100000000` à `9100000099`.
- Vérifier qu’un identifiant de test n’existe pas avant sa préparation.
- Contrôler `sy-subrc` immédiatement après chaque accès SQL.
- Sauvegarder `sy-dbcnt` immédiatement si sa valeur doit être utilisée.
- Ne jamais utiliser une structure cible après un `SELECT` échoué.
- Ne jamais exécuter `UPDATE ... FROM` avec une structure partiellement alimentée sans accepter explicitement l’initialisation des autres colonnes.
- Ne jamais conclure qu’un lot complet a été traité uniquement parce qu’au moins une ligne a changé.
- Comparer `sy-dbcnt` au nombre de lignes attendu.
- Effectuer un rollback dès qu’un traitement atomique est incomplet.
- Ne pas placer un commit dans une méthode utilitaire qui ne possède pas la transaction complète.
- Ne pas considérer une prélecture comme une protection suffisante contre la concurrence.
- Utiliser un mécanisme de verrouillage métier dans un développement productif lorsque plusieurs utilisateurs peuvent modifier la même donnée.
- Relire les données après la modification.
- Annuler les exercices avec `ROLLBACK WORK`, sauf exercice explicitement consacré au commit.
- Conserver une preuve vérifiable :
  - valeurs avant ;
  - valeurs après ;
  - `sy-subrc` ;
  - `sy-dbcnt` ;
  - relecture ;
  - état après rollback.

---

# 🌸 RECTIFICATIONS TECHNIQUES APPLIQUÉES

## 🌺 UPDATE MODIFIE UNIQUEMENT DES LIGNES EXISTANTES

`UPDATE` ne crée pas de ligne.

```text
Clé présente
→ ligne modifiée

Clé absente
→ aucune ligne créée
```

Pour créer une ligne, utiliser `INSERT`.

Pour créer ou modifier selon l’existence, `MODIFY` possède un autre comportement qui doit être choisi explicitement.

## 🌺 UPDATE DEPUIS UNE STRUCTURE

Syntaxe :

```abap
UPDATE zt_<tri>_ord
  FROM @ls_order.
```

La clé primaire contenue dans la structure identifie la ligne cible.

Lorsque la ligne existe, les valeurs de la structure sont écrites dans la ligne.

> [!CAUTION]
> La structure représente la ligne complète.
>
> Les champs non alimentés ne sont pas « ignorés ».  
> Ils peuvent écraser les valeurs existantes avec leur valeur initiale.

Cette méthode est sûre lorsque la structure a été :

- lue depuis la table ;
- complètement construite ;
- validée avant l’écriture.

## 🌺 UPDATE DEPUIS UNE TABLE INTERNE

Syntaxe :

```abap
UPDATE zt_<tri>_ord
  FROM TABLE @lt_orders.
```

Pour chaque ligne de la table interne :

1. la clé primaire est recherchée ;
2. la ligne existante est réécrite ;
3. une clé absente ne crée aucune ligne.

Résultats utilisés dans les exercices :

```text
sy-subrc = 0
→ toutes les lignes sources ont pu être utilisées

sy-subrc = 4
→ au moins une ligne source n’a pas été mise à jour
```

`sy-dbcnt` contient le nombre de lignes effectivement mises à jour.

Exemple :

```text
3 lignes dans la table interne
2 clés trouvées
1 clé absente

sy-subrc = 4
sy-dbcnt = 2
```

Les deux lignes trouvées sont tout de même modifiées.

> [!IMPORTANT]
> Une mise à jour de masse partielle n’est donc pas automatiquement annulée.  
> Le programme doit exécuter un rollback lorsque la règle exige un traitement « tout ou rien ».

## 🌺 TABLE INTERNE VIDE

Avec une table interne vide :

```abap
UPDATE zt_<tri>_ord
  FROM TABLE @lt_orders.
```

le résultat technique est :

```text
sy-subrc = 0
sy-dbcnt = 0
```

L’instruction n’est pas en erreur, mais l’absence de données peut constituer une anomalie fonctionnelle.

## 🌺 UPDATE FROM ET UPDATE SET

### Ligne complète

```abap
UPDATE zt_<tri>_ord
  FROM @ls_order.
```

### Colonnes ciblées

```abap
UPDATE zt_<tri>_ord
  SET status   = @lv_status,
      priority = @lv_priority
  WHERE order_id = @lv_order_id.
```

`UPDATE ... SET` est préférable lorsque le besoin porte uniquement sur quelques colonnes et que la ligne complète ne doit pas être réécrite.

## 🌺 CLÉ PRIMAIRE

Avec `UPDATE ... FROM`, les valeurs de clé de la structure servent à rechercher la ligne.

Modifier `ORDER_ID` dans la structure avant l’`UPDATE` ne renomme pas l’ancienne commande :

```text
ancienne clé non recherchée
nouvelle clé absente
→ sy-subrc = 4
```

Pour changer une clé, une stratégie fonctionnelle explicite est nécessaire. Cette opération est généralement évitée.

## 🌺 TRANSACTION

Les modifications sont validées lors du prochain commit de base de données.

Avant le commit :

```abap
ROLLBACK WORK.
```

peut annuler la modification.

`UPDATE` acquiert également des verrous de base de données jusqu’au commit ou au rollback.

## 🌺 CONCURRENCE

Le scénario suivant n’est pas automatiquement sécurisé :

```text
Utilisateur A lit la commande.
Utilisateur B modifie la commande.
Utilisateur A réécrit toute sa structure ancienne.
```

Le dernier `UPDATE ... FROM` peut écraser les changements de l’autre utilisateur.

Une application productive doit utiliser une stratégie adaptée :

- objet de verrouillage ;
- contrôle de version ;
- horodatage de modification ;
- condition supplémentaire dans `UPDATE ... SET ... WHERE`;
- gestion explicite du conflit.

---

# 🌸 BLOC DE PRÉPARATION COMMUN

Le bloc suivant prépare une ligne dans la même transaction que le test.

```abap
CONSTANTS lc_order_id TYPE zde_<tri>_oid
  VALUE '9100000001'.

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
  customer_name = 'Commande avant UPDATE'
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
  WRITE / 'Préparation de la donnée impossible'.
  ROLLBACK WORK.
  RETURN.
ENDIF.
```

À la fin du test :

```abap
ROLLBACK WORK.
```
