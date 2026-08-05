# 🌸 EXERCICES — CRITÈRES SIMPLES

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [TRANSACTION SE16N](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 09 - SE16N/01 - 🍧 SE16N.md>)

## 🌺 OBJECTIFS

- sélectionner une valeur exacte ;
- utiliser les opérateurs de comparaison ;
- filtrer une date ;
- filtrer un montant ;
- distinguer format de saisie et valeur interne ;
- combiner plusieurs critères avec une logique `AND`.

## 🌺 DURÉE INDICATIVE

40 à 50 minutes.

## 🌺 EXERCICE 1 — CLÉ EXACTE

Sélectionner :

```text
ORDER_ID = 0000000002
```

Résultat attendu :

```text
Une commande
Bruno Bernard
Statut P
Montant 75,00 EUR
```

## 🌺 EXERCICE 2 — STATUT

Sélectionner :

```text
STATUS = N
```

Résultat attendu avec les données de référence :

```text
0000000001
```

## 🌺 EXERCICE 3 — MONTANT

Sélectionner :

```text
AMOUNT >= 75,00
```

Relever les commandes retournées.

Le format de saisie du séparateur décimal dépend des paramètres utilisateur et de l’aide de saisie.

## 🌺 EXERCICE 4 — PLUSIEURS CRITÈRES

Sélectionner :

```text
CURRENCY = EUR
STATUS <> C
AMOUNT >= 75,00
```

Résultat attendu :

```text
0000000001
0000000002
```

## 🌺 EXERCICE 5 — DATE

Sélectionner :

```text
CREATED_ON = date de création réelle
```

Ne pas saisir une date supposée.

Relever la date affichée et la valeur attendue dans le système.

## 🌺 EXERCICE 6 — LOGIQUE DES CRITÈRES

Répondre :

1. plusieurs critères placés sur des champs différents sont-ils combinés par `AND` ?
2. comment représenter plusieurs valeurs possibles pour un même champ ?
3. `STATUS = N` et `STATUS = P` peuvent-ils être saisis simultanément comme deux égalités obligatoires ?
4. quelle fonction faut-il ouvrir pour une sélection multiple ?

## 🌺 DIAGNOSTIC

Saisir :

```text
ORDER_ID = 2
```

alors que la valeur interne attendue contient dix positions.

Relever le résultat réel.

Répondre :

1. le système applique-t-il une conversion automatique dans ce champ personnalisé ?
2. la valeur `2` est-elle identique à `0000000002` pour une comparaison textuelle NUMC10 ?
3. pourquoi le domaine n’utilise-t-il pas de routine `ALPHA` dans le modèle de formation ?
4. quelle valeur faut-il saisir ?

## 🌺 CRITÈRES DE VALIDATION

- [ ] La lecture exacte retourne une seule ligne.
- [ ] Le filtre de statut est correct.
- [ ] Le filtre numérique est contrôlé.
- [ ] Les trois critères combinés retournent les lignes attendues.
- [ ] La date réelle est utilisée.
- [ ] La logique `AND` est expliquée.
- [ ] Le format interne de l’identifiant est contrôlé.

<details>
<summary>🍧 Afficher la solution</summary>

Critères combinés :

```text
CURRENCY = EUR
AND STATUS <> C
AND AMOUNT >= 75,00
```

Résultat attendu :

```text
0000000001
0000000002
```

Pour plusieurs statuts, utiliser la sélection multiple du champ `STATUS`.

L’identifiant doit être saisi sous sa forme interne :

```text
0000000002
```

</details>
