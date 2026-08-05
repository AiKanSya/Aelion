# 🌸 SOMMAIRE — └─ 01 - 🧩 STRUCTURES

## 🌺 OBJECTIF DU PARCOURS

Ces exercices renforcent deux notions nécessaires avant l’étude des tables internes :

1. les structures locales ;
2. le transfert de composants avec `MOVE-CORRESPONDING`.

Le stagiaire doit être capable de :

- distinguer un type structuré d’un objet de données ;
- déclarer une structure locale avec `TYPES`;
- créer plusieurs structures à partir du même type ;
- alimenter, lire, modifier, copier et réinitialiser une structure ;
- comprendre qu’une structure regroupe des composants de types différents ;
- transférer des composants de même nom entre deux structures différentes ;
- prévoir le comportement des composants communs et non communs ;
- identifier les risques de conversion implicite ;
- distinguer une affectation complète de structure d’un transfert par correspondance.

## 🌺 COURS ASSOCIÉS

- `07 - ITAB/01 - STRUCTURES/01 - 🍧 STRUCTURES.md`
- `07 - ITAB/01 - STRUCTURES/02 - 🍧 MOVE-CORRESPONDING.md`

## 🌺 PROGRAMME UTILISÉ

Créer le programme exécutable suivant :

```text
ZAELION_<TRI>_STRUCTURES
```

Remplacer `<TRI>` par le trigramme attribué.

Enregistrer le programme dans le package et l’ordre de transport utilisés pour les exercices précédents.

## 🌺 RÈGLES COMMUNES

- Réaliser un premier essai avant d’ouvrir la solution.
- Contrôler la syntaxe avant chaque activation.
- Exécuter chaque cas demandé.
- Comparer le résultat obtenu au résultat attendu.
- Conserver une preuve vérifiable : code, résultat ou explication structurée.
- Restaurer une version correcte après chaque erreur volontaire.
- Ne pas conserver de code provoquant une erreur de syntaxe ou d’exécution.
- Utiliser les conventions suivantes :
  - `ty_` pour un type local ;
  - `ls_` pour une structure ;
  - `lv_` pour une variable élémentaire ;
  - `<lfs_...>` pour un field-symbol local.

> [!IMPORTANT]
> `TYPES` définit un type.  
> `DATA` crée un objet de données utilisant ce type.

> [!IMPORTANT]
> Les exercices utilisent des structures locales et plates.  
> ABAP permet également de manipuler des structures globales, imbriquées ou profondes, mais ces variantes ne sont pas nécessaires ici.

# 🌸 RECTIFICATIONS TECHNIQUES APPLIQUÉES

Les formulations suivantes remplacent certaines affirmations imprécises des cours d’origine.

## 🌺 AFFECTATION COMPLÈTE

Une affectation simple entre deux structures du même type copie l’ensemble de la valeur :

```abap
ls_target = ls_source.
```

Cette affectation ne constitue pas une recherche de composants par nom.

## 🌺 MOVE-CORRESPONDING

L’instruction suivante transfère les composants portant le même nom :

```abap
MOVE-CORRESPONDING ls_source TO ls_target.
```

Règles essentielles :

- l’ordre de déclaration des composants n’a pas d’importance ;
- un composant commun est transféré, même si sa valeur source est initiale ;
- un composant présent uniquement dans la source est ignoré ;
- un composant présent uniquement dans la cible reste inchangé ;
- des conversions implicites peuvent être appliquées entre les composants correspondants ;
- la correspondance par nom ne garantit donc pas l’absence de troncature ou de conversion indésirable.

> [!CAUTION]
> `MOVE-CORRESPONDING` n’est pas automatiquement « sans risque ».  
> Les noms et les types des composants doivent être contrôlés.

## 🌺 EXERCICES

- [STRUCTURES](<./01 - 🍧 STRUCTURES.md>)
- [MOVE-CORRESPONDING](<./02 - 🍧 MOVE-CORRESPONDING.md>)
