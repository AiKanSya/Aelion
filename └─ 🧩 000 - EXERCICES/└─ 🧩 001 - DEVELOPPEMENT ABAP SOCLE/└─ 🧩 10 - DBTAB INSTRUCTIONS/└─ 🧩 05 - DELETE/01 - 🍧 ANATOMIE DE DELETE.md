# 🌸 EXERCICES — ANATOMIE DE DELETE

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- définir `DELETE`;
- identifier la table cible ;
- distinguer condition, structure et table interne ;
- expliquer la clé primaire ;
- interpréter `sy-subrc` et `sy-dbcnt`;
- distinguer suppression et validation transactionnelle.

## 🌺 DURÉE INDICATIVE

30 à 40 minutes.

## 🌺 EXERCICE 1 — RESTITUTION

Compléter :

| Élément                         | Rôle |
| ------------------------------- | ---- |
| `DELETE`                        |      |
| `DELETE FROM`                   |      |
| `WHERE`                         |      |
| `DELETE dbtab FROM @wa`         |      |
| `DELETE dbtab FROM TABLE @itab` |      |
| Clé primaire                    |      |
| `sy-subrc`                      |      |
| `sy-dbcnt`                      |      |
| `COMMIT WORK`                   |      |
| `ROLLBACK WORK`                 |      |

## 🌺 EXERCICE 2 — CLASSIFICATION

| Forme                           | Sélection des lignes | Nombre possible |
| ------------------------------- | -------------------- | --------------: |
| `DELETE FROM ... WHERE ...`     |                      |                 |
| `DELETE dbtab FROM @wa`         |                      |                 |
| `DELETE dbtab FROM TABLE @itab` |                      |                 |

## 🌺 EXERCICE 3 — SINGLE OU MULTIPLE

Classer :

| Condition                                        | Suppression attendue |
| ------------------------------------------------ | -------------------- |
| `order_id = '9300000001'`                        |                      |
| `status = 'N'`                                   |                      |
| `currency = 'EUR' AND amount < 100`              |                      |
| `order_id BETWEEN '9300000010' AND '9300000019'` |                      |

Répondre :

1. le mot `WHERE` garantit-il une seule ligne ?
2. une condition sur une clé unique garantit-elle au plus une ligne ?
3. faut-il appeler `DELETE SINGLE` une syntaxe ABAP différente ?
4. quelle information prouve le nombre réellement supprimé ?

## 🌺 EXERCICE 4 — CHAMPS SYSTÈME

Compléter :

| Cas                                 | `sy-subrc` | `sy-dbcnt` |
| ----------------------------------- | ---------: | ---------: |
| Une ligne supprimée                 |            |            |
| Trois lignes supprimées             |            |            |
| Aucune ligne supprimée avec `WHERE` |            |            |
| Trois clés demandées, deux trouvées |            |            |
| Source interne vide                 |            |            |

## 🌺 EXERCICE 5 — TRANSACTION

| État                         | Ligne visible dans la session | Suppression permanente | Annulable |
| ---------------------------- | ----------------------------- | ---------------------- | --------- |
| Après `DELETE`, avant commit |                               |                        |           |
| Après `COMMIT WORK`          |                               |                        |           |
| Après `ROLLBACK WORK`        |                               |                        |           |

## 🌺 CRITÈRES DE VALIDATION

- [ ] `DELETE` est défini comme une suppression en base.
- [ ] Les trois formes sont distinguées.
- [ ] `WHERE` n’est pas assimilé à une suppression unitaire.
- [ ] La clé primaire est comprise.
- [ ] Les champs système sont correctement interprétés.
- [ ] La suppression est distinguée du commit.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — restitution

| Élément            | Rôle                                                            |
| ------------------ | --------------------------------------------------------------- |
| `DELETE`           | Supprime des lignes existantes.                                 |
| `DELETE FROM`      | Supprime selon une condition SQL.                               |
| `WHERE`            | Définit le périmètre de suppression.                            |
| `FROM @wa`         | Supprime la ligne correspondant à la clé de la structure.       |
| `FROM TABLE @itab` | Supprime les lignes correspondant aux clés de la table interne. |
| Clé primaire       | Identifie une ligne de manière unique.                          |
| `sy-subrc`         | Indique si la suppression attendue a été réalisée.              |
| `sy-dbcnt`         | Nombre de lignes réellement supprimées.                         |
| `COMMIT WORK`      | Rend la suppression permanente.                                 |
| `ROLLBACK WORK`    | Annule les suppressions non validées.                           |

### Solution — classification

| Forme         | Sélection     |        Nombre |
| ------------- | ------------- | ------------: |
| `WHERE`       | Condition SQL | 0 à plusieurs |
| Structure     | Clé primaire  |        0 ou 1 |
| Table interne | Liste de clés | 0 à plusieurs |

### Solution — champs système

| Cas          | `sy-subrc` | `sy-dbcnt` |
| ------------ | ---------: | ---------: |
| Une ligne    |        `0` |        `1` |
| Trois lignes |        `0` |        `3` |
| Aucune ligne |        `4` |        `0` |
| Lot partiel  |        `4` |        `2` |
| Source vide  |        `0` |        `0` |

</details>
