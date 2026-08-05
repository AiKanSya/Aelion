# 🌸 EXERCICES — DELETE ADJACENT DUPLICATES

## 🌺 OBJECTIFS

- comprendre que seuls les doublons adjacents sont supprimés ;
- trier selon les composants comparés ;
- utiliser `COMPARING`;
- conserver volontairement la première ligne d’un groupe ;
- sélectionner la ligne la plus récente grâce à l’ordre de tri ;
- contrôler `sy-subrc`.

## 🌺 DURÉE INDICATIVE

50 à 65 minutes.

## 🌺 EXERCICE 1 — DOUBLONS NON ADJACENTS

Créer :

```text
FR - Paris
DE - Berlin
FR - Paris
FR - Lyon
DE - Berlin
```

Exécuter sans tri :

```abap
DELETE ADJACENT DUPLICATES FROM lt_cities
  COMPARING country city.
```

Répondre :

1. tous les doublons sont-ils supprimés ?
2. pourquoi ?
3. quel prérequis manque ?
4. quelle correction faut-il appliquer ?

## 🌺 EXERCICE 2 — TRI CORRECT

Exécuter :

```abap
SORT lt_cities BY country city.

DELETE ADJACENT DUPLICATES FROM lt_cities
  COMPARING country city.
```

Résultat attendu :

```text
DE - Berlin
FR - Lyon
FR - Paris
```

## 🌺 EXERCICE 3 — COMPARAISON PARTIELLE

Trier par pays puis ville et exécuter :

```abap
DELETE ADJACENT DUPLICATES FROM lt_cities
  COMPARING country.
```

Combien de lignes restent ?

Quelle ville est conservée pour chaque pays ?

## 🌺 EXERCICE 4 — CONSERVER LA LIGNE LA PLUS RÉCENTE

Une table contient :

| Client | Date     | Montant |
| ------ | -------- | ------: |
| C10001 | 20260101 |     100 |
| C10001 | 20260301 |     120 |
| C10002 | 20260201 |      80 |
| C10002 | 20260115 |      70 |

Objectif : conserver la date la plus récente de chaque client.

Définir le tri correct puis supprimer les doublons en comparant uniquement le client.

## 🌺 EXERCICE 5 — `sy-subrc`

Contrôler :

- `0` lorsqu’au moins une ligne est supprimée ;
- `4` lorsqu’aucune ligne n’est supprimée.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le caractère adjacent est compris.
- [ ] Le tri correspond aux composants comparés.
- [ ] La comparaison partielle est maîtrisée.
- [ ] La première ligne de chaque groupe trié est conservée.
- [ ] La ligne la plus récente est obtenue par un tri décroissant sur la date.
- [ ] `sy-subrc` est contrôlé.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
SORT lt_cities BY country city.

DELETE ADJACENT DUPLICATES FROM lt_cities
  COMPARING country city.
```

Pour conserver la ligne la plus récente :

```abap
SORT lt_history
  BY customer_id ASCENDING
     change_date DESCENDING.

DELETE ADJACENT DUPLICATES FROM lt_history
  COMPARING customer_id.
```

La première ligne de chaque client après le tri est la plus récente.

</details>
