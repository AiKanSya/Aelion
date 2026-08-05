# 🌸 SOMMAIRE — └─ 02 - 🧩 ITAB TYPES

## 🌺 OBJECTIF DU PARCOURS

Ces exercices renforcent les catégories fondamentales de tables internes ABAP :

1. `TABLE OF` ;
2. `STANDARD TABLE` ;
3. `SORTED TABLE` ;
4. `RANGE OF` ;
5. `HASHED TABLE`.

Le stagiaire doit être capable de :

- distinguer type de ligne, ligne de travail et table interne ;
- comprendre qu’une table interne est temporaire et stockée en mémoire ;
- déclarer explicitement une catégorie de table ;
- identifier le rôle de la clé primaire ;
- distinguer ordre d’insertion, ordre trié et absence d’ordre garanti ;
- choisir une table standard, triée ou hachée selon le besoin ;
- construire et utiliser une table de sélection ;
- anticiper les doublons, les recherches par index et les recherches par clé ;
- contrôler systématiquement le résultat d’une insertion ou d’une lecture.

## 🌺 COURS ASSOCIÉS

- `07 - ITAB/02 - ITAB TYPES/01 - 🍧 ITAB.md`
- `07 - ITAB/02 - ITAB TYPES/02 - 🍧 ITAB TYPE STANDARD.md`
- `07 - ITAB/02 - ITAB TYPES/03 - 🍧 ITAB TYPE SORTED.md`
- `07 - ITAB/02 - ITAB TYPES/04 - 🍧 ITAB TYPE RANGE.md`
- `07 - ITAB/02 - ITAB TYPES/05 - 🍧 ITAB TYPE HASHED.md`

## 🌺 PROGRAMME UTILISÉ

Créer le programme exécutable suivant :

```text
ZAELION_<TRI>_ITAB_TYPES
```

Remplacer `<TRI>` par le trigramme attribué.

Enregistrer le programme dans le package et l’ordre de transport utilisés pour les exercices précédents.

## 🌺 RÈGLES COMMUNES

- Réaliser un premier essai avant d’ouvrir la solution.
- Contrôler la syntaxe avant chaque activation.
- Exécuter chaque cas demandé.
- Vérifier `sy-subrc` immédiatement après une instruction qui le renseigne.
- Conserver une preuve vérifiable : code, résultat ou explication structurée.
- Restaurer une version correcte après chaque erreur volontaire.
- Ne pas conserver de code provoquant une erreur de syntaxe ou d’exécution.
- Utiliser les conventions suivantes :
  - `ty_` pour un type local ;
  - `lt_` pour une table interne ;
  - `ls_` pour une structure ;
  - `lv_` pour une variable élémentaire ;
  - `lr_` pour une table de sélection ;
  - `lrs_` pour une ligne de table de sélection.

> [!IMPORTANT]
> Une table interne n’est pas une table de base de données.  
> Son contenu existe dans la mémoire du programme pendant l’exécution.

> [!IMPORTANT]
> Le type de ligne décrit une ligne.  
> La catégorie de table décrit l’organisation et les modes d’accès de l’ensemble des lignes.

---

# 🌸 RECTIFICATIONS TECHNIQUES APPLIQUÉES

## 🌺 `TYPE TABLE OF`

Dans une déclaration concrète telle que :

```abap
DATA lt_items TYPE TABLE OF ty_item.
```

le mot-clé `STANDARD` est omis. La table créée est une table standard.

Sans clé explicitement déclarée, ABAP utilise la clé standard. Pour une liste dont la clé primaire ne doit jouer aucun rôle, une déclaration explicite est plus claire :

```abap
DATA lt_items TYPE STANDARD TABLE OF ty_item
  WITH EMPTY KEY.
```

> [!CAUTION]
> La clé standard implicite dépend du type de ligne et peut être différente de ce que le développeur imagine.  
> Déclarer la clé explicitement évite cette ambiguïté.

## 🌺 TABLE STANDARD

Une table standard :

- possède un index primaire ;
- conserve l’ordre courant des lignes ;
- accepte les doublons de clé primaire ;
- n’est pas automatiquement triée ;
- convient aux parcours séquentiels et aux ajouts en fin de table.

## 🌺 TABLE TRIÉE

Une table triée :

- possède un index primaire ;
- reste triée selon sa clé primaire ;
- accepte une clé `UNIQUE` ou `NON-UNIQUE` ;
- doit être alimentée normalement avec `INSERT ... INTO TABLE`.

`APPEND` n’est pas la bonne instruction générale pour une table triée. Il ne peut réussir que si la ligne peut être placée à la fin sans violer l’ordre ni l’unicité. Utiliser `INSERT` évite cette dépendance.

## 🌺 TABLE HACHÉE

Une table hachée :

- possède obligatoirement une clé primaire unique ;
- ne possède pas d’index primaire ;
- ne garantit aucun ordre de parcours ;
- est adaptée aux accès fréquents par clé complète.

## 🌺 TABLE DE SÉLECTION

Une déclaration `RANGE OF` crée une table interne spéciale dont la ligne contient :

```text
SIGN
OPTION
LOW
HIGH
```

Elle peut être utilisée avec l’opérateur `IN` et dans les conditions compatibles d’ABAP SQL.
