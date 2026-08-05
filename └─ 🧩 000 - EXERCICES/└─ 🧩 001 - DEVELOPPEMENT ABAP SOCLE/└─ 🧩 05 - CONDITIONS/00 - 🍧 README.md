# 🌸 SOMMAIRE — └─ 🧩 05 - CONDITIONS

## 🌺 OBJECTIF DU PARCOURS

Ces exercices renforcent les mécanismes conditionnels fondamentaux d’ABAP :

1. opérateurs de comparaison ;
2. structures `CASE` et `IF` ;
3. contrôle des valeurs initiales ;
4. contrôle d’intervalles ;
5. opérateurs de comparaison de chaînes :
   - `CO` / `CN` ;
   - `CA` ;
   - `CS` / `NS` ;
   - `CP` / `NP`.

Le stagiaire doit être capable de choisir la structure adaptée, traiter les cas limites et expliquer précisément pourquoi une condition est vraie ou fausse.

## 🌺 COURS ASSOCIÉS

- `05 - CONDITIONS/01 - 🍧 OPERATORS.md`
- `05 - CONDITIONS/02 - 🍧 CASE ENDCASE.md`
- `05 - CONDITIONS/03 - 🍧 IF ELSE ENDIF.md`
- `05 - CONDITIONS/04 - 🍧 IS INITIAL.md`
- `05 - CONDITIONS/05 - 🍧 IF BETWEEN.md`
- `05 - CONDITIONS/06 - 🍧 IF CO.md`
- `05 - CONDITIONS/07 - 🍧 IF CN.md`
- `05 - CONDITIONS/08 - 🍧 IF CA.md`
- `05 - CONDITIONS/09 - 🍧 IF CS.md`
- `05 - CONDITIONS/10 - 🍧 IF NS.md`
- `05 - CONDITIONS/11 - 🍧 IF CP.md`
- `05 - CONDITIONS/12 - 🍧 IF NP.md`

## 🌺 PROGRAMME UTILISÉ

Créer le programme exécutable suivant :

```text
ZAELION_<TRI>_CONDITIONS
```

Remplacer `<TRI>` par le trigramme attribué.

Enregistrer le programme dans le package et l’ordre de transport utilisés pour les exercices précédents.

## 🌺 RÈGLES COMMUNES

- Réaliser un premier essai sans ouvrir la solution.
- Contrôler la syntaxe avant chaque activation.
- Tester les cas nominaux, les cas invalides et les valeurs limites.
- Restaurer une version correcte après chaque erreur volontaire.
- Conserver une preuve vérifiable : code, résultat ou explication structurée.
- Contrôler `sy-subrc` ou `sy-fdpos` immédiatement après l’instruction qui les renseigne.
- Ne pas conserver de code provoquant une erreur de syntaxe ou un dump.
- Utiliser des parenthèses dès qu’une expression combine plusieurs conditions.

## 🌺 RECTIFICATIONS TECHNIQUES APPLIQUÉES

Les exercices corrigent plusieurs formulations présentes dans les cours d’origine :

1. Le `CASE` procédural compare un opérande à des valeurs indiquées après `WHEN`.  
   Pour tester un intervalle avec `BETWEEN` ou une valeur initiale avec `IS INITIAL`, utiliser `IF` / `ELSEIF`.

2. `CS` et `NS` effectuent une recherche de sous-chaîne sans tenir compte de la casse.

3. `CP` et `NP` comparent également sans tenir compte de la casse par défaut.  
   Le caractère `#` sert de caractère d’échappement.

4. Pour `CO`, `CN` et `CA`, `sy-fdpos` représente un offset commençant à zéro.  
   Dans un cas invalide détecté par `CN`, il pointe sur le premier caractère non autorisé.

> [!IMPORTANT]
> Un offset commence à `0`.  
> Le premier caractère d’une chaîne se trouve donc à la position `0`.

## 🌺 EXERCICES

- [OPERATORS](<./01 - 🍧 OPERATORS.md>)
- [CASE ENDCASE](<./02 - 🍧 CASE ENDCASE.md>)
- [IF ELSE ENDIF](<./03 - 🍧 IF ELSE ENDIF.md>)
- [IS INITIAL](<./04 - 🍧 IS INITIAL.md>)
- [IF BETWEEN](<./05 - 🍧 IF BETWEEN.md>)
- [IF CO](<./06 - 🍧 IF CO.md>)
- [IF CN](<./07 - 🍧 IF CN.md>)
- [IF CA](<./08 - 🍧 IF CA.md>)
- [IF CS](<./09 - 🍧 IF CS.md>)
- [IF NS](<./10 - 🍧 IF NS.md>)
- [IF CP](<./11 - 🍧 IF CP.md>)
- [IF NP](<./12 - 🍧 IF NP.md>)
