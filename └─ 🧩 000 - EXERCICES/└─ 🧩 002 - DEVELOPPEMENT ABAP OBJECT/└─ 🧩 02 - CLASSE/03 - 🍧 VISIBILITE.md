# 🌸 EXERCICES — VISIBILITÉ DES COMPOSANTS

## 🌺 OBJECTIFS

- distinguer les trois visibilités ;
- concevoir une interface publique minimale ;
- protéger une règle métier ;
- comprendre l’accès depuis une sous-classe ;
- éviter l’exposition des données internes.

## 🌺 DURÉE INDICATIVE

60 à 75 minutes.

## 🌺 CLASSE

```text
ZCL_<TRI>_ACCOUNT
```

## 🌺 COMPOSANTS

### Private

```text
MV_BALANCE TYPE DECFLOAT34
VALIDATE_AMOUNT
```

### Public

```text
DEPOSIT
GET_BALANCE
```

### Protected

Créer pour l’exercice :

```text
MV_ACCOUNT_TYPE TYPE STRING
```

Il sera étudié avec l’héritage.

## 🌺 EXERCICE 1 — VALIDATION PRIVÉE

Méthode privée :

```text
VALIDATE_AMOUNT
```

Importing :

```text
IV_AMOUNT TYPE DECFLOAT34
```

Raising :

```text
ZCX_<TRI>_INVALID_AMOUNT
```

## 🌺 EXERCICE 2 — DÉPÔT

```abap
METHOD deposit.

  validate_amount(
    iv_amount = iv_amount
  ).

  mv_balance =
    mv_balance + iv_amount.

ENDMETHOD.
```

## 🌺 EXERCICE 3 — ACCÈS EXTERNE

Le report peut appeler :

```text
DEPOSIT
GET_BALANCE
```

Il ne peut pas appeler :

```text
VALIDATE_AMOUNT
```

ni modifier directement :

```text
MV_BALANCE
```

## 🌺 EXERCICE 4 — MATRICE

| Appelant             | Public            | Protected         | Private           |
| -------------------- | ----------------- | ----------------- | ----------------- |
| Méthode de la classe |                   |                   |                   |
| Programme externe    |                   |                   |                   |
| Sous-classe          |                   |                   |                   |
| Classe amie          | selon déclaration | selon déclaration | selon déclaration |

## 🌺 DIAGNOSTIC

Rendre `MV_BALANCE` public et écrire :

```abap
lo_account->mv_balance = -100.
```

Décrire l’invariant cassé, puis remettre l’attribut en privé.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Les trois visibilités sont distinguées.
- [ ] Le solde est privé.
- [ ] La validation est privée.
- [ ] Le dépôt est public.
- [ ] Le programme externe ne contourne pas la règle.
- [ ] Le cas négatif est refusé.

<details>
<summary>🍧 Afficher la solution</summary>

| Appelant          | Public | Protected | Private |
| ----------------- | ------ | --------- | ------- |
| Classe elle-même  | Oui    | Oui       | Oui     |
| Programme externe | Oui    | Non       | Non     |
| Sous-classe       | Oui    | Oui       | Non     |

Une classe amie peut obtenir des accès supplémentaires explicitement déclarés. Cette possibilité doit rester exceptionnelle.

</details>
