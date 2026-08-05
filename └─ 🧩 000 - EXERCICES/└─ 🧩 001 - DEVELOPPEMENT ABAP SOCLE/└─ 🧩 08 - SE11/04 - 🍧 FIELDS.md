# 🌸 EXERCICES — CHAMPS / ZONES / FIELDS

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- définir un champ DDIC ;
- identifier son nom, son type et sa sémantique ;
- distinguer champ de table et composant de structure ;
- utiliser un élément de données ;
- utiliser exceptionnellement un type intégré ;
- naviguer vers le domaine ;
- expliquer clé, valeur initiale, référence de devise et contrôle de saisie.

## 🌺 DURÉE INDICATIVE

45 à 60 minutes.

## 🌺 EXERCICE 1 — VOCABULAIRE

Compléter :

| Notion                 | Définition |
| ---------------------- | ---------- |
| Champ de table         |            |
| Composant de structure |            |
| Élément de données     |            |
| Domaine                |            |
| Champ clé              |            |
| Champ de référence     |            |
| Table de contrôle      |            |

## 🌺 EXERCICE 2 — MATRICE DE CONCEPTION

Pour la future table de commandes, compléter :

| Champ           | Élément de données | Clé | Valeur initiale autorisée | Rôle        |
| --------------- | ------------------ | --- | ------------------------- | ----------- |
| `MANDT`         | `MANDT`            | Oui | Non                       | Mandant     |
| `ORDER_ID`      | `ZDE_<TRI>_OID`    | Oui | Non                       | Identifiant |
| `CUSTOMER_NAME` | `ZDE_<TRI>_NAME`   | Non | Selon règle               | Nom         |
| `PRIORITY`      | `ZDE_<TRI>_PRIO`   | Non | Selon règle               | Priorité    |
| `STATUS`        | `ZDE_<TRI>_STAT`   | Non | Non                       | Statut      |
| `CURRENCY`      | `WAERS`            | Non | Non                       | Devise      |
| `AMOUNT`        | `WRBTR`            | Non | Oui                       | Montant     |
| `CREATED_BY`    | `ERNAM`            | Non | Non                       | Auteur      |
| `CREATED_ON`    | `ERDAT`            | Non | Non                       | Date        |

## 🌺 EXERCICE 3 — CHAÎNE TECHNIQUE

Pour chaque champ personnalisé, produire :

```text
Nom du champ
→ Élément de données
→ Domaine
→ Type technique
```

Exemple :

```text
ORDER_ID
→ ZDE_<TRI>_OID
→ ZD_<TRI>_OID
→ NUMC 10
```

## 🌺 EXERCICE 4 — TYPE INTÉGRÉ OU ÉLÉMENT DE DONNÉES

Dans une structure temporaire, créer :

```text
COMMENT_A avec élément de données CHAR40
COMMENT_B avec type intégré CHAR 40
```

Comparer :

| Critère                 | Élément de données | Type intégré |
| ----------------------- | ------------------ | ------------ |
| Sémantique réutilisable |                    |              |
| Libellés                |                    |              |
| Domaine                 |                    |              |
| Usage local rapide      |                    |              |
| Cohérence globale       |                    |              |

Répondre :

1. un type intégré est-il interdit ?
2. quand est-il acceptable ?
3. pourquoi l’élément de données est-il préférable pour un champ métier réutilisé ?
4. quel risque existe si chaque table redéfinit directement sa longueur ?

## 🌺 EXERCICE 5 — CHAMP DEVISE

Analyser :

```text
AMOUNT type CURR
CURRENCY type CUKY
```

Répondre :

1. pourquoi `AMOUNT` ne suffit-il pas ?
2. où définir la relation ?
3. la devise peut-elle se trouver dans la même table ?
4. quel champ est le champ de référence ?
5. que se passe-t-il si la relation manque lors de l’activation ?

## 🌺 EXERCICE 6 — CHAMP DE CONTRÔLE

Le champ `STATUS` doit être contrôlé par `ZT_<TRI>_STAT`.

Préparer le mapping :

```text
ZT_<TRI>_ORD-MANDT
→ ZT_<TRI>_STAT-MANDT

ZT_<TRI>_ORD-STATUS
→ ZT_<TRI>_STAT-STATUS
```

Expliquer :

- table étrangère ;
- table de contrôle ;
- champs étrangers ;
- champs de clé de la table de contrôle ;
- cardinalité attendue `1:CN`.

## 🌺 EXERCICE 7 — DIAGNOSTICS

### Cas A

```text
ORDER_ID non clé
```

### Cas B

```text
AMOUNT sans CURRENCY
```

### Cas C

```text
STATUS type CHAR40 direct
```

### Cas D

```text
CREATED_ON type CHAR8 au lieu de ERDAT
```

Pour chaque cas :

- symptôme ;
- cause ;
- correction ;
- test.

## 🌺 LIVRABLES

- vocabulaire ;
- matrice de conception ;
- chaînes techniques ;
- comparaison type intégré/élément ;
- analyse du champ devise ;
- mapping de clé étrangère ;
- diagnostics des quatre cas.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Champ et composant sont distingués.
- [ ] Les champs clés sont identifiés.
- [ ] Les types globaux sont réutilisés.
- [ ] Le champ `CURR` possède son champ `CUKY`.
- [ ] Le mapping de clé étrangère inclut le mandant.
- [ ] La cardinalité est expliquée.
- [ ] Les quatre défauts sont corrigés.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — type intégré

Un type intégré convient à un composant strictement local sans sémantique réutilisable.

Un élément de données est préférable lorsqu’un champ métier doit conserver :

- le même sens ;
- les mêmes libellés ;
- les mêmes propriétés techniques ;
- les mêmes usages dans plusieurs objets.

### Solution — devise

```text
AMOUNT
→ référence : ZT_<TRI>_ORD-CURRENCY
```

`CURRENCY` est typé avec un type de devise `CUKY`, ici l’élément standard `WAERS`.

### Solution — relation

```text
Table de contrôle : ZT_<TRI>_STAT
Table étrangère   : ZT_<TRI>_ORD
Cardinalité       : 1:CN
```

Chaque commande possède exactement un statut de référence. Un statut peut être utilisé par zéro à plusieurs commandes.

</details>
