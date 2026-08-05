# 🌸 EXERCICES — CONCURRENCE ET VERROUILLAGE

## 🌺 OBJECTIFS

- comprendre une mise à jour perdue ;
- distinguer verrou de base et verrou métier ;
- ne pas présenter `SELECT` puis `UPDATE` comme atomique ;
- identifier une stratégie de protection ;
- limiter la durée des verrous.

## 🌺 DURÉE INDICATIVE

45 à 60 minutes.

## 🌺 SCÉNARIO

État initial :

```text
Montant  : 100,00
Priorité : 1
```

### Utilisateur A

```text
Lit la ligne.
Modifie la priorité à 2.
Attend avant UPDATE.
```

### Utilisateur B

```text
Lit la ligne.
Modifie le montant à 150,00.
Exécute UPDATE et COMMIT.
```

### Utilisateur A

```text
Réécrit sa structure complète,
qui contient encore le montant 100,00.
```

## 🌺 QUESTIONS

1. quel montant final peut être enregistré ?
2. la modification de B peut-elle être perdue ?
3. le `SELECT SINGLE` de A verrouille-t-il automatiquement la donnée pour toute la durée métier ?
4. le verrou de base acquis par `UPDATE` protège-t-il la phase antérieure de réflexion utilisateur ?
5. quelle stratégie SAP classique utilise un objet de verrouillage ?
6. quelle stratégie optimiste peut comparer une version ou une date de modification ?
7. pourquoi un rollback ou commit doit-il intervenir rapidement après l’écriture ?

## 🌺 EXERCICE 1 — STRATÉGIES

Associer :

| Besoin                                                         | Stratégie possible                             |
| -------------------------------------------------------------- | ---------------------------------------------- |
| Empêcher deux éditions simultanées                             | Objet de verrouillage                          |
| Détecter qu’une donnée a changé depuis la lecture              | Version ou timestamp                           |
| Modifier uniquement si l’ancienne valeur est toujours présente | `UPDATE SET ... WHERE ... AND old_value = ...` |
| Libérer les verrous de base                                    | Commit ou rollback                             |
| Informer l’utilisateur du conflit                              | Message et nouvelle lecture                    |

## 🌺 EXERCICE 2 — UPDATE CONDITIONNEL

Analyser la logique :

```abap
UPDATE zt_<tri>_ord
  SET priority = @lv_new_priority
  WHERE order_id = @lv_order_id
    AND priority = @lv_old_priority.
```

Résultat :

```text
sy-dbcnt = 1
→ aucune modification concurrente de la priorité

sy-dbcnt = 0
→ ligne absente ou priorité déjà changée
```

Cette vérification ne protège que les colonnes intégrées à la condition.

## 🌺 EXERCICE 3 — MAUVAISE PRATIQUE

Analyser :

```text
Verrou acquis
Écran laissé ouvert pendant trente minutes
Aucun commit ni rollback
```

Décrire :

- blocage potentiel ;
- impact utilisateur ;
- risque de deadlock ;
- correction fonctionnelle et technique.

## 🌺 CRITÈRES DE VALIDATION

- [ ] La mise à jour perdue est expliquée.
- [ ] La lecture simple n’est pas assimilée à un verrou métier.
- [ ] Le verrou de base est distingué de l’objet de verrouillage SAP.
- [ ] Une stratégie pessimiste est identifiée.
- [ ] Une stratégie optimiste est identifiée.
- [ ] `sy-dbcnt` est utilisé pour détecter le conflit.
- [ ] La durée des verrous est limitée.

<details>
<summary>🍧 Afficher la solution</summary>

La structure de A contient encore :

```text
Montant = 100,00
```

Son `UPDATE ... FROM` peut réécrire cette valeur et annuler la modification de B.

Une protection productive peut suivre le cycle :

```text
1. Acquérir le verrou métier.
2. Relire la donnée.
3. Vérifier les droits et règles.
4. Modifier.
5. Exécuter UPDATE.
6. Commit ou rollback.
7. Libérer le verrou.
```

Une approche optimiste peut refuser l’écriture lorsque la version lue n’est plus actuelle.

</details>
