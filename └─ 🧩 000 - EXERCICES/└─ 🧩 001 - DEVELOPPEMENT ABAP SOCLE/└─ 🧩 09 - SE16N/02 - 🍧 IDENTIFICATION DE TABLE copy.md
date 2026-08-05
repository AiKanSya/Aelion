# 🌸 EXERCICES — IDENTIFICATION DE TABLE

## 🌺 OBJECTIFS

- identifier la table correcte avant `SE16N` ;
- utiliser `SE11` pour vérifier sa définition ;
- distinguer table, structure et vue ;
- relever les champs clés ;
- identifier la dépendance au mandant ;
- contrôler les types et les références.

## 🌺 DURÉE INDICATIVE

35 à 45 minutes.

## 🌺 EXERCICE 1 — FICHE TECHNIQUE

Dans `SE11`, analyser :

```text
ZT_<TRI>_ORD
```

Relever :

| Information            | Valeur |
| ---------------------- | ------ |
| Type d’objet           |        |
| Description            |        |
| Premier champ clé      |        |
| Deuxième champ clé     |        |
| Champ mandant          |        |
| Champ montant          |        |
| Champ devise           |        |
| Référence du montant   |        |
| Champ statut           |        |
| Table de contrôle      |        |
| Nombre total de champs |        |

## 🌺 EXERCICE 2 — TABLE OU STRUCTURE

Comparer :

```text
ZS_<TRI>_ORDER
ZT_<TRI>_ORD
ZV_<TRI>_ORD
```

Compléter :

| Objet            | Type | Consultable dans `SE16N` | Contient ses propres lignes |
| ---------------- | ---- | ------------------------ | --------------------------- |
| `ZS_<TRI>_ORDER` |      |                          |                             |
| `ZT_<TRI>_ORD`   |      |                          |                             |
| `ZV_<TRI>_ORD`   |      |                          |                             |

## 🌺 EXERCICE 3 — CHAMPS CLÉS

Avant d’ouvrir `SE16N`, écrire la clé logique complète d’une commande :

```text
MANDT + ORDER_ID
```

Répondre :

1. pourquoi `ORDER_ID` seul suffit-il généralement dans une consultation du mandant courant ?
2. le champ `MANDT` existe-t-il malgré son absence éventuelle dans l’écran de sélection simplifié ?
3. une même valeur `ORDER_ID` peut-elle exister dans plusieurs mandants ?
4. pourquoi faut-il relever le mandant du cas de test ?

## 🌺 EXERCICE 4 — MAUVAISE SOURCE

Un développeur recherche le texte du statut dans :

```text
ZT_<TRI>_ORD
```

Le champ `STATUS_TEXT` n’existe pas.

Répondre :

1. la table de commandes stocke-t-elle le libellé ?
2. où se trouve le texte ?
3. quelle vue expose le code et le texte ensemble ?
4. quelle table utiliser pour consulter uniquement les libellés ?
5. pourquoi faut-il comprendre le modèle avant la sélection ?

## 🌺 EXERCICE 5 — DIAGNOSTIC D’OBJET INCONNU

Saisir volontairement :

```text
ZT_<TRI>_ORDER
```

alors que l’objet réel est :

```text
ZT_<TRI>_ORD
```

Relever le message.

Décrire :

- symptôme ;
- cause ;
- correction ;
- contrôle préalable dans `SE11`.

## 🌺 CRITÈRES DE VALIDATION

- [ ] L’objet est vérifié dans `SE11`.
- [ ] Table, structure et vue sont distinguées.
- [ ] Les champs clés sont identifiés.
- [ ] Le mandant est pris en compte.
- [ ] Le texte du statut est recherché dans la bonne source.
- [ ] Un nom technique incorrect est diagnostiqué avant toute conclusion métier.

<details>
<summary>🍧 Afficher la solution</summary>

| Objet            | Type               | `SE16N`                    | Lignes propres           |
| ---------------- | ------------------ | -------------------------- | ------------------------ |
| `ZS_<TRI>_ORDER` | Structure DDIC     | Non comme table de données | Non                      |
| `ZT_<TRI>_ORD`   | Table transparente | Oui                        | Oui                      |
| `ZV_<TRI>_ORD`   | Vue                | Oui                        | Non ; résultat de la vue |

Le texte du statut est stocké dans :

```text
ZT_<TRI>_STAT-STATUS_TEXT
```

La vue suivante expose la jointure :

```text
ZV_<TRI>_ORD
```

</details>
