# 🌸 CONTAINS STRING (CS)

## 🌺 OBJECTIFS

- [ ] Comprendre l'opérateur `CS` (Contains String) et son fonctionnement
- [ ] Vérifier si une chaîne contient une sous-chaîne complète
- [ ] Différencier `CS` (sous-chaîne) de `CA` (caractère individuel)
- [ ] Apprendre à utiliser `IF ... CS ... ENDIF` pour des contrôles simples
- [ ] Identifier quand utiliser `FIND` pour obtenir la position exacte ou faire des recherches avancées

## 🌺 DEFINITION

> L’opérateur `CS` (Contains String) permet de vérifier si une chaîne de caractères (`oper1`) contient une sous-chaîne complète (`oper2`).  
> Contrairement à `CA` (Contains Any), qui ne recherche qu’un caractère, `CS` recherche une séquence entière de caractères dans une autre chaîne.

> [!TIP]
> Imagine `oper1` comme un livre et `oper2` comme une phrase précise que tu veux retrouver.  
> Si la phrase exacte est présente, la condition `CS` est vraie.

> [!NOTE]
>
> - "HELLO WORLD" CS "WORLD" → vrai
> - "HELLO WORLD" CS "WOR" → vrai
> - "HELLO WORLD" CS "WORD" → faux (lettres hors séquence)
> - "HELLO WORLD" CS "hello" → faux (sensible à la casse)

> [!TIP]
> Le `CS` est utile pour vérifier si un texte contient une séquence précise sans parcourir chaque caractère individuellement.

## 🌺 SYNTAXE

    IF oper1 CS oper2.
      [statement_block]
    ENDIF.

- `oper1` → chaîne principale
- `oper2` → sous-chaîne recherchée
- Condition vraie si `oper2` est présente dans `oper1`

## 🌺 EXEMPLE

    WRITE:/ '     - IF CONTAINS STRING...'.

    CONSTANTS: lc_oper1 TYPE CHAR11 VALUE 'Hello World',
               lc_oper2 TYPE CHAR5  VALUE 'World'.

    IF lc_oper1 CS lc_oper2.
      WRITE:/ 'lc_oper1 contient la chaîne de caractères ', lc_oper2.
    ELSE.
      WRITE:/ 'lc_oper1 ne contient pas la chaîne de caractères ', lc_oper2.
    ENDIF.

- `lc_oper1` = "Hello World"
- `lc_oper2` = "World"
- Condition vraie car "World" est une sous-chaîne de "Hello World"
- Résultat affiché : `lc_oper1 contient la chaîne de caractères World`

> [!TIP]
> Pour obtenir la position exacte de la sous-chaîne ou effectuer des recherches plus complexes (insensible à la casse, mot complet…), utiliser plutôt `FIND`.

## 🌺 RESUME

> - `CS` = Contains String → vérifie si `oper1` contient la sous-chaîne exacte `oper2`.
> - Sensible à la casse.
> - Condition vraie si la séquence complète est présente.
> - Pour des recherches plus détaillées, utiliser `FIND`.
>
> [!TIP]
> c’est comme chercher une phrase exacte dans un livre plutôt que vérifier lettre par lettre
