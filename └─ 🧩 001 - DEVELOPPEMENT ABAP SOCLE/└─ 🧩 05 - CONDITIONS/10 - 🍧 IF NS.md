# 🌸 NO STRING (NS)

## 🌺 OBJECTIFS

- [ ] Comprendre l'opérateur `NS` (No String) et son fonctionnement
- [ ] Vérifier si une chaîne ne contient pas une sous-chaîne spécifique
- [ ] Différencier `NS` (absence de sous-chaîne) de `CS` (présence de sous-chaîne)
- [ ] Apprendre à utiliser `IF ... NS ... ENDIF` pour contrôler l'absence d'une séquence
- [ ] Identifier les cas pratiques où la vérification de l'absence est nécessaire

## 🌺 DEFINITION

> L’opérateur `NS` (No String) est l’inverse de `CS` (Contains String).  
> Il permet de vérifier qu’une chaîne de caractères (`oper1`) ne contient pas une autre sous-chaîne (`oper2`).

> [!TIP]
> Imagine `oper1` comme un livre et `oper2` comme une phrase précise que tu cherches.  
> Si cette phrase n’existe pas dans le texte, la condition `NS` est vraie.

> [!NOTE]
>
> - "HELLO WORLD" NS "WORLD" → faux
> - "HELLO WORLD" NS "SAP" → vrai
> - "HELLO WORLD" NS "hello" → vrai (sensible à la casse)

## 🌺 SYNTAXE

    IF oper1 NS oper2.
      [statement_block]
    ENDIF.

- `oper1` → chaîne principale
- `oper2` → sous-chaîne recherchée
- Condition vraie si `oper2` n’est pas présente dans `oper1`

## 🌺 EXEMPLE

    WRITE:/ '     - IF NO STRING...'.

    CONSTANTS: lc_oper1 TYPE CHAR11 VALUE 'Hello World',
               lc_oper2 TYPE CHAR3  VALUE 'SAP'.

    IF lc_oper1 NS lc_oper2.
      WRITE:/ 'lc_oper1 ne contient pas la chaîne de caractères ', lc_oper2.
    ELSE.
      WRITE:/ 'lc_oper1 contient la chaîne de caractères ', lc_oper2.
    ENDIF.

- `lc_oper1` = "Hello World"
- `lc_oper2` = "SAP"
- Condition vraie car "SAP" n’existe pas dans "Hello World"
- Résultat affiché : `lc_oper1 ne contient pas la chaîne de caractères SAP`

## 🌺 DIFFERENCE AVEC CS

- `CS` (Contains String) → vrai si la sous-chaîne est trouvée
- `NS` (No String) → vrai si la sous-chaîne n’est pas trouvée

## 🌺 RESUME

> - `NS` = No String → vérifie que `oper1` ne contient pas `oper2`
> - Sensible à la casse
> - Inverse logique de `CS`
> - Très utile pour détecter l’absence d’un mot ou d’une séquence spécifique dans une chaîne
>
> [!TIP]
> c’est comme vérifier qu’une phrase précise n’apparaît pas dans un livre
