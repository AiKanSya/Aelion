# 🌸 EXERCICES — ANATOMIE DE UPDATE

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [MODIFY](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 10 - DBTAB INSTRUCTIONS/└─ 🧩 04 - MODIFY/01 - 🍧 MODIFY.md>)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- définir `UPDATE`;
- identifier la table cible ;
- identifier la source ;
- expliquer le rôle de la clé ;
- distinguer structure et table interne ;
- interpréter les champs système ;
- distinguer modification et validation transactionnelle.

## 🌺 DURÉE INDICATIVE

30 à 40 minutes.

## 🌺 EXERCICE 1 — RESTITUTION

Compléter :

| Élément         | Rôle |
| --------------- | ---- |
| `UPDATE`        |      |
| `ZT_<TRI>_ORD`  |      |
| `ls_order`      |      |
| `lt_orders`     |      |
| `FROM`          |      |
| `FROM TABLE`    |      |
| Clé primaire    |      |
| `sy-subrc`      |      |
| `sy-dbcnt`      |      |
| `COMMIT WORK`   |      |
| `ROLLBACK WORK` |      |

## 🌺 EXERCICE 2 — CLASSIFICATION

| Instruction                        | Source | Nombre maximal de lignes sources | Crée une clé absente |
| ---------------------------------- | ------ | -------------------------------: | -------------------- |
| `UPDATE ... FROM @ls_order`        |        |                                  |                      |
| `UPDATE ... FROM TABLE @lt_orders` |        |                                  |                      |
| `UPDATE ... SET ... WHERE ...`     |        |                                  |                      |

## 🌺 EXERCICE 3 — CLÉ

Pour :

```text
ZT_<TRI>_ORD
```

répondre :

1. quels champs composent la clé primaire ?
2. pourquoi le mandant fait-il partie de la clé technique ?
3. quelle valeur identifie la commande dans le mandant courant ?
4. une clé absente est-elle créée ?
5. quelle valeur de `sy-subrc` est attendue pour une structure dont la clé n’existe pas ?

## 🌺 EXERCICE 4 — CHAMPS SYSTÈME

Compléter :

| Cas                           | `sy-subrc` | `sy-dbcnt` |
| ----------------------------- | ---------: | ---------: |
| Structure, ligne trouvée      |            |            |
| Structure, ligne absente      |            |            |
| Lot, toutes les clés trouvées |            |            |
| Lot, une clé absente          |            |            |
| Table interne vide            |            |            |

## 🌺 EXERCICE 5 — TRANSACTION

Classer :

| État                         | Modification visible dans la session | Permanente | Annulable |
| ---------------------------- | ------------------------------------ | ---------- | --------- |
| Après `UPDATE`, avant commit |                                      |            |           |
| Après `COMMIT WORK`          |                                      |            |           |
| Après `ROLLBACK WORK`        |                                      |            |           |

## 🌺 CRITÈRES DE VALIDATION

- [ ] `UPDATE` est défini comme une modification.
- [ ] Une clé absente n’est pas créée.
- [ ] Les trois formes sont distinguées.
- [ ] La clé inclut le mandant.
- [ ] Les valeurs principales de `sy-subrc` sont comprises.
- [ ] `sy-dbcnt` est relié au nombre réellement modifié.
- [ ] L’update est distingué du commit.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — restitution

| Élément         | Rôle                                        |
| --------------- | ------------------------------------------- |
| `UPDATE`        | Modifie des lignes existantes.              |
| Table DDIC      | Cible de l’écriture.                        |
| Structure       | Source d’une ligne complète.                |
| Table interne   | Source de plusieurs lignes complètes.       |
| `FROM`          | Introduit une structure source.             |
| `FROM TABLE`    | Introduit une table interne source.         |
| Clé primaire    | Identifie la ligne à modifier.              |
| `sy-subrc`      | Indique si la cible attendue a été traitée. |
| `sy-dbcnt`      | Nombre de lignes réellement mises à jour.   |
| `COMMIT WORK`   | Valide la transaction.                      |
| `ROLLBACK WORK` | Annule les écritures non validées.          |

### Solution — classification

| Instruction     | Source        |   Lignes sources | Création |
| --------------- | ------------- | ---------------: | -------- |
| `FROM`          | structure     |                1 | Non      |
| `FROM TABLE`    | table interne |        plusieurs | Non      |
| `SET ... WHERE` | expressions   | dépend du filtre | Non      |

### Solution — champs système

| Cas               | `sy-subrc` |                `sy-dbcnt` |
| ----------------- | ---------: | ------------------------: |
| Structure trouvée |        `0` |                       `1` |
| Structure absente |        `4` |                       `0` |
| Lot complet       |        `0` |             nombre du lot |
| Lot partiel       |        `4` | nombre réellement modifié |
| Lot vide          |        `0` |                       `0` |

</details>
