# 🌸 SOMMAIRE — └─ 🧩 08 - SE11

## 🌺 OBJECTIF DU PARCOURS

Ces exercices construisent progressivement un modèle de données complet dans l’ABAP Dictionary :

1. navigation et analyse dans `SE11` ;
2. domaines ;
3. éléments de données ;
4. champs ;
5. structures ;
6. tables transparentes ;
7. vues classiques du Dictionnaire ABAP ;
8. aide à la recherche F4.

Le stagiaire doit être capable de créer les objets dans le bon ordre, comprendre leurs dépendances, les activer, les tester et diagnostiquer les incohérences les plus fréquentes.

## 🌺 COURS ASSOCIÉS

- `08 - SE11/01 - 🍧 SE11.md`
- `08 - SE11/02 - 🍧 DOMAINS.md`
- `08 - SE11/03 - 🍧 DATA ELEMENTS.md`
- `08 - SE11/04 - 🍧 FIELDS.md`
- `08 - SE11/05 - 🍧 STRUCTURES.md`
- `08 - SE11/06 - 🍧 DBTABLES.md`
- `08 - SE11/07 - 🍧 VIEWS.md`
- `08 - SE11/08 - 🍧 SEARCH HELP.md`

## 🌺 CONTEXTE COMMUN

Le modèle représente des commandes de formation.

Deux tables sont créées :

```text
ZT_<TRI>_STAT
```

Table de référence des statuts.

```text
ZT_<TRI>_ORD
```

Table transactionnelle des commandes.

Remplacer `<TRI>` par le trigramme attribué.

## 🌺 OBJETS À CRÉER

### Domaines

```text
ZD_<TRI>_OID
ZD_<TRI>_PRIO
ZD_<TRI>_NAME
ZD_<TRI>_STAT
ZD_<TRI>_STTXT
```

### Éléments de données

```text
ZDE_<TRI>_OID
ZDE_<TRI>_PRIO
ZDE_<TRI>_NAME
ZDE_<TRI>_STAT
ZDE_<TRI>_STTXT
```

### Structures

```text
ZS_<TRI>_AUDIT
ZS_<TRI>_ORDER
ZA_<TRI>_ORD
```

`ZA_<TRI>_ORD` est une structure append associée à `ZS_<TRI>_ORDER`.

### Tables

```text
ZT_<TRI>_STAT
ZT_<TRI>_ORD
```

### Vues

```text
ZP_<TRI>_ORD
ZV_<TRI>_ORD
```

### Aide à la recherche

```text
ZSH_<TRI>_OID
```

### Programme de test

```text
ZAELION_<TRI>_SE11
```

## 🌺 ORDRE DE CRÉATION

```text
Domaines
→ Éléments de données
→ Structures
→ Tables
→ Données de test
→ Vues
→ Aide à la recherche
→ Programme de validation
```

> [!IMPORTANT]
> Respecter cet ordre évite la majorité des erreurs de dépendance et d’activation.

## 🌺 RÈGLES COMMUNES

- Travailler uniquement dans un système et un mandant de développement autorisés.
- Utiliser exclusivement le namespace client `Z` ou `Y`.
- Ne jamais modifier un objet standard SAP pendant ces exercices.
- Utiliser le package et l’ordre de transport attribués.
- Remplacer chaque valeur entre chevrons.
- Sauvegarder, contrôler et activer chaque objet.
- Vérifier le journal d’activation.
- Ne pas ignorer un avertissement sans pouvoir l’expliquer.
- Produire une preuve vérifiable :
  - nom de l’objet ;
  - version active ;
  - capture ou résultat ;
  - réponse aux questions ;
  - code du programme de test.
- Ne pas créer d’index, d’append ou de table sans besoin explicite.
- Ne pas insérer de données dans une table standard SAP.
- Ne pas utiliser `SE16N` pour modifier des données sans autorisation.

## 🌺 RECTIFICATIONS TECHNIQUES APPLIQUÉES

### ABAP Dictionary

Le Dictionnaire ABAP décrit les types globaux et les objets de base de données utilisés par les développements ABAP.

Tous les objets du Repository ne sont pas stockés dans le DDIC.  
Le DDIC concerne principalement les objets de données et leurs relations.

### Domaines

Un domaine définit notamment :

- le type technique ;
- la longueur ;
- les décimales ;
- les propriétés de sortie ;
- une routine de conversion éventuelle ;
- des valeurs fixes ou intervalles éventuels.

Une plage de valeurs de domaine n’est pas un contrôle universel appliqué automatiquement à toute affectation ABAP. Elle est notamment utilisée par les écrans et les mécanismes DDIC de contrôle et d’aide à la saisie.

### Éléments de données

L’élément de données porte la signification sémantique et les libellés.  
Il peut référencer un domaine.

### Tables pool et cluster

Les tables pool et cluster appartiennent au modèle historique du Dictionnaire ABAP. Elles ne doivent pas être créées pour les exercices. Le modèle utilise uniquement des tables transparentes.

### Clés étrangères

Une clé étrangère DDIC décrit une relation et permet notamment des contrôles de saisie dans les interfaces compatibles.

Elle ne doit pas être assimilée sans vérification à une contrainte physique automatiquement imposée par la base de données à toutes les écritures Open SQL. Le programme qui écrit les données doit préserver la cohérence.

### Montants et quantités

Un champ `CURR` doit référencer un champ de devise `CUKY`.  
Un champ `QUAN` doit référencer un champ d’unité `UNIT`.

### Vues

Les vues classiques `SE11` restent pertinentes pour comprendre et maintenir les systèmes classiques.

Pour un nouveau modèle de données moderne sur une plateforme compatible, les CDS view entities sont généralement la solution recommandée par SAP. Cet exercice reste volontairement limité aux objets classiques du Dictionnaire ABAP.
