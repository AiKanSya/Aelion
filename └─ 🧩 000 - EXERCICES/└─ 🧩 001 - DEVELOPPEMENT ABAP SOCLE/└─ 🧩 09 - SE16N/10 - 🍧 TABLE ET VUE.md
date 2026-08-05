# 🌸 EXERCICES — COMPARAISON AVEC OPEN SQL

## 🌺 OBJECTIFS

- consulter une table et une vue ;
- comparer leurs champs ;
- expliquer une jointure ;
- identifier une ligne perdue par jointure interne ;
- distinguer stockage et résultat logique.

## 🌺 DURÉE INDICATIVE

40 à 55 minutes.

## 🌺 EXERCICE 1 — TABLE

Consulter :

```text
ZT_<TRI>_ORD
```

Relever :

- nombre de lignes ;
- champs `STATUS` ;
- absence du champ `STATUS_TEXT`.

## 🌺 EXERCICE 2 — VUE

Consulter :

```text
ZV_<TRI>_ORD
```

Relever :

- nombre de lignes ;
- champ `STATUS`;
- champ `STATUS_TEXT`;
- montant et devise.

## 🌺 EXERCICE 3 — COMPARAISON

Compléter :

| Critère                                 | Table | Vue |
| --------------------------------------- | ----- | --- |
| Stocke les commandes                    |       |     |
| Expose le texte du statut               |       |     |
| Dépend d’une jointure                   |       |     |
| Possède ses propres lignes persistantes |       |     |
| Peut masquer certains champs            |       |     |

## 🌺 EXERCICE 4 — STATUT SANS RÉFÉRENCE

Ne pas créer volontairement l’incohérence si le système ne l’autorise pas.

Analyser le cas théorique :

```text
ZT_<TRI>_ORD-STATUS = X
Aucune ligne X dans ZT_<TRI>_STAT
```

Répondre :

1. la commande existe-t-elle dans la table ?
2. apparaît-elle dans une vue à jointure interne ?
3. pourquoi le nombre de lignes peut-il différer ?
4. quelle source faut-il consulter pour prouver l’existence physique de la commande ?
5. quelle source faut-il consulter pour vérifier le libellé ?

## 🌺 EXERCICE 5 — FILTRE SUR LE TEXTE

Dans la vue, sélectionner :

```text
STATUS_TEXT contient préparation
```

Relever le résultat.

Comparer avec :

```text
STATUS = P
```

## 🌺 CRITÈRES DE VALIDATION

- [ ] Table et vue sont distinguées.
- [ ] Le texte est identifié comme provenant de la table de référence.
- [ ] La vue n’est pas décrite comme un stockage autonome.
- [ ] La jointure interne est comprise.
- [ ] Une différence de nombre de lignes est diagnostiquée.
- [ ] La source adaptée est choisie selon la question.

<details>
<summary>🍧 Afficher la solution</summary>

| Critère              | Table               | Vue |
| -------------------- | ------------------- | --- |
| Stockage             | Oui                 | Non |
| Texte du statut      | Non                 | Oui |
| Jointure             | Non                 | Oui |
| Lignes propres       | Oui                 | Non |
| Projection de champs | Définition complète | Oui |

Une commande sans statut de référence reste visible dans la table, mais peut disparaître d’une vue à jointure interne.

</details>
