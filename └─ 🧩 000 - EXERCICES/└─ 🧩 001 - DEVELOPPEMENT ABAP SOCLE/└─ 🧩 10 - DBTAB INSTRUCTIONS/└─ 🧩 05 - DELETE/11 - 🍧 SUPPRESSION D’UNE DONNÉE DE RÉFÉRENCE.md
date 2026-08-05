# 🌸 EXERCICES — SUPPRESSION D’UNE DONNÉE DE RÉFÉRENCE

## 🌺 OBJECTIFS

- vérifier les dépendances métier ;
- empêcher la création d’orphelins ;
- distinguer relation DDIC et contrainte physique ;
- supprimer uniquement une référence inutilisée ;
- appliquer une transaction cohérente.

## 🌺 DURÉE INDICATIVE

50 à 65 minutes.

## 🌺 CONTEXTE

La table :

```text
ZT_<TRI>_STAT
```

contient les statuts.

La table :

```text
ZT_<TRI>_ORD
```

les utilise.

## 🌺 EXERCICE 1 — STATUT UTILISÉ

Vérifier le nombre de commandes utilisant :

```text
N
```

```abap
SELECT COUNT( * )
  FROM zt_<tri>_ord
  WHERE status = 'N'
  INTO @DATA(lv_usage_count).
```

Ne pas supprimer le statut s’il est utilisé.

Message :

```text
Suppression refusée : le statut N est utilisé par <n> commande(s)
```

## 🌺 EXERCICE 2 — STATUT DE TEST

Dans une transaction isolée :

1. vérifier que le statut `T` n’existe pas ;
2. insérer le statut `T` sans commit ;
3. vérifier qu’aucune commande ne l’utilise ;
4. supprimer `T`;
5. vérifier l’absence ;
6. exécuter un rollback ;
7. vérifier que `T` reste absent, conformément à l’état initial.

## 🌺 EXERCICE 3 — DDIC

Répondre :

1. une clé étrangère DDIC décrit-elle une relation ?
2. garantit-elle nécessairement une contrainte physique sur toutes les écritures ?
3. le programme doit-il préserver la cohérence ?
4. quelle opération effectuer avant de supprimer une référence ?
5. que faire si des lignes dépendantes existent ?

## 🌺 EXERCICE 4 — CASCADE

Analyser :

```text
Supprimer automatiquement toutes les commandes
lorsque leur statut est supprimé.
```

Répondre :

1. cette cascade est-elle demandée par le modèle ?
2. quelle perte fonctionnelle peut survenir ?
3. faut-il l’implémenter sans validation métier ?
4. quel ordre transactionnel serait nécessaire si elle était approuvée ?
5. comment garantir l’atomicité ?

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le nombre d’utilisations est lu.
- [ ] Un statut utilisé n’est pas supprimé.
- [ ] Un statut de test inutilisé est supprimé.
- [ ] Le rollback restaure l’état initial de la transaction : le statut de test reste absent.
- [ ] La relation DDIC est comprise.
- [ ] Aucune cascade implicite n’est inventée.
- [ ] L’atomicité d’une cascade théorique est expliquée.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
DATA lv_status TYPE zde_<tri>_stat VALUE 'N'.

SELECT COUNT( * )
  FROM zt_<tri>_ord
  WHERE status = @lv_status
  INTO @DATA(lv_usage_count).

IF lv_usage_count > 0.
  WRITE / |Suppression refusée : le statut { lv_status } est utilisé par { lv_usage_count } commande(s)|.
  RETURN.
ENDIF.

DELETE FROM zt_<tri>_stat
  WHERE status = @lv_status.
```

</details>
