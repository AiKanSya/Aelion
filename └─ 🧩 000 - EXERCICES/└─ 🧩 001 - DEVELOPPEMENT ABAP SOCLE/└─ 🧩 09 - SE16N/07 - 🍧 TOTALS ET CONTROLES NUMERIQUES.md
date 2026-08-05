# 🌸 EXERCICES — TOTALS ET CONTRÔLES NUMÉRIQUES

## 🌺 OBJECTIFS

- totaliser une colonne numérique ;
- vérifier l’unité ou la devise ;
- éviter un total mélangeant plusieurs devises ;
- calculer un sous-ensemble cohérent ;
- rapprocher le résultat d’un calcul ABAP.

## 🌺 DURÉE INDICATIVE

35 à 45 minutes.

## 🌺 EXERCICE 1 — TOTAL ERRONÉ

Afficher les trois commandes et totaliser `AMOUNT`.

Valeurs :

```text
125,50 EUR
75,00 EUR
50,00 USD
```

Répondre :

1. le total arithmétique brut peut-il être calculé ?
2. possède-t-il une signification monétaire correcte ?
3. pourquoi la colonne `CURRENCY` doit-elle être analysée ?
4. faut-il additionner directement des devises différentes ?

## 🌺 EXERCICE 2 — TOTAL EUR

Sélectionner :

```text
CURRENCY = EUR
```

Totaliser `AMOUNT`.

Résultat attendu :

```text
200,50 EUR
```

## 🌺 EXERCICE 3 — TOTAL USD

Sélectionner :

```text
CURRENCY = USD
```

Résultat attendu :

```text
50,00 USD
```

## 🌺 EXERCICE 4 — RAPPROCHEMENT MANUEL

Compléter :

| Devise | Commandes | Calcul           | Total |
| ------ | --------- | ---------------- | ----: |
| EUR    | 1 et 2    | `125,50 + 75,00` |       |
| USD    | 3         | `50,00`          |       |

## 🌺 EXERCICE 5 — LIMITE DU TOTAL ALV

Répondre :

1. la fonction de total effectue-t-elle une conversion de devise ?
2. utilise-t-elle un taux de change ?
3. remplace-t-elle un rapport financier ?
4. quelle condition minimale doit être respectée avant un total de montant ?
5. comment traiter plusieurs devises dans un rapport professionnel ?

## 🌺 CRITÈRES DE VALIDATION

- [ ] Les devises sont contrôlées avant le total.
- [ ] Le total EUR vaut `200,50`.
- [ ] Le total USD vaut `50,00`.
- [ ] Aucun total interdevises n’est présenté comme valide.
- [ ] Le total ALV n’est pas assimilé à une conversion financière.

<details>
<summary>🍧 Afficher la solution</summary>

| Devise |    Total |
| ------ | -------: |
| EUR    | `200,50` |
| USD    |  `50,00` |

Un rapport multi-devises doit :

- regrouper par devise ;
- ou convertir les montants selon une règle, une date et un taux définis ;
- afficher clairement la devise de référence.

</details>
