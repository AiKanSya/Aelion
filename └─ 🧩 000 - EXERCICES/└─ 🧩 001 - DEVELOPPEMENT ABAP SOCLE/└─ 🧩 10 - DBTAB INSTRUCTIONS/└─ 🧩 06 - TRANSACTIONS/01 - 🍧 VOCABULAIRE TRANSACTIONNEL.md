# 🌸 EXERCICES — VOCABULAIRE TRANSACTIONNEL

# 🌸 EXERCICE 01 — VOCABULAIRE TRANSACTIONNEL

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- définir une transaction métier ;
- définir une Database LUW ;
- définir une SAP LUW ;
- distinguer commit et rollback ;
- expliquer l’atomicité ;
- identifier le propriétaire de la transaction.

## 🌺 DURÉE INDICATIVE

35 à 45 minutes.

## 🌺 EXERCICE 1 — RESTITUTION

Compléter :

| Notion                         | Définition |
| ------------------------------ | ---------- |
| Transaction métier             |            |
| État cohérent                  |            |
| Atomicité                      |            |
| Database LUW                   |            |
| SAP LUW                        |            |
| Database commit                |            |
| Database rollback              |            |
| `COMMIT WORK`                  |            |
| `ROLLBACK WORK`                |            |
| Propriétaire de la transaction |            |
| Update Task                    |            |

## 🌺 EXERCICE 2 — TOUT OU RIEN

Scénario :

```text
Créer un statut T.
Créer la commande 9400000001.
Créer la commande 9400000002.
```

Classer :

| État final                  | Cohérent |
| --------------------------- | -------- |
| Trois lignes créées         |          |
| Aucune ligne créée          |          |
| Statut seul                 |          |
| Statut et première commande |          |
| Commandes sans statut       |          |

## 🌺 EXERCICE 3 — DB LUW OU SAP LUW

Associer :

| Description                                     | Notion |
| ----------------------------------------------- | ------ |
| Unité indivisible gérée par la base             |        |
| Unité fonctionnelle gérée par l’application SAP |        |
| Peut utiliser l’Update Task                     |        |
| Se termine par un database commit ou rollback   |        |
| Peut couvrir plusieurs étapes de dialogue       |        |
| Doit respecter le tout ou rien métier           |        |

## 🌺 EXERCICE 4 — PROPRIÉTAIRE

Classer :

| Niveau                                            | Doit décider du commit |
| ------------------------------------------------- | ---------------------- |
| Méthode `CHECK_STATUS`                            |                        |
| Méthode `INSERT_ORDER` réutilisable               |                        |
| Rapport autonome de création complète             |                        |
| Méthode de formatage                              |                        |
| Orchestrateur connaissant toutes les écritures    |                        |
| BAPI d’écriture standard appelée par un programme |                        |

## 🌺 CRITÈRES DE VALIDATION

- [ ] Les trois notions principales sont distinguées.
- [ ] L’atomicité est expliquée.
- [ ] Les états incohérents sont identifiés.
- [ ] La base et l’application sont distinguées.
- [ ] Le propriétaire est le niveau fonctionnel complet.
- [ ] Une méthode basse ne décide pas du commit.

<details>
<summary>🍧 Afficher la solution</summary>

| Notion             | Définition                                                         |
| ------------------ | ------------------------------------------------------------------ |
| Transaction métier | Ensemble cohérent d’actions fonctionnelles.                        |
| État cohérent      | État respectant toutes les règles métier et techniques.            |
| Atomicité          | Toutes les opérations réussissent ou aucune n’est conservée.       |
| Database LUW       | Unité indivisible gérée par la base.                               |
| SAP LUW            | Unité fonctionnelle transactionnelle gérée par l’application ABAP. |
| Commit             | Validation définitive de la LUW de base.                           |
| Rollback           | Annulation de la LUW non validée.                                  |
| `COMMIT WORK`      | Termine la SAP LUW et déclenche les traitements de commit.         |
| `ROLLBACK WORK`    | Termine la SAP LUW et annule les changements non validés.          |
| Propriétaire       | Niveau qui connaît toutes les opérations de l’unité métier.        |
| Update Task        | Technique de regroupement différé des mises à jour SAP.            |

États cohérents :

```text
Toutes les lignes créées
Aucune ligne créée
```

</details>
