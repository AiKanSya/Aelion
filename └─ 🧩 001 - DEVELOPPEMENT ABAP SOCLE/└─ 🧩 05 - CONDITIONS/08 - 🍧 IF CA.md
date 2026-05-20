# 🌸 CONTAINS ANY (CA)

## 🌺 OBJECTIFS

- [ ] Comprendre l'opérateur `CA` (Contains Any) et son fonctionnement
- [ ] Vérifier si une chaîne contient au moins un caractère d’une autre chaîne
- [ ] Savoir utiliser `IF ... CA ... ENDIF` pour des contrôles simples
- [ ] Utiliser `SY-FDPOS` pour obtenir la position du premier caractère trouvé
- [ ] Appliquer `CA` pour détecter la présence de caractères spécifiques dans une entrée utilisateur

## 🌺 DEFINITION

> L’opérateur `CA` (Contains Any) permet de vérifier si une chaîne de caractères (`oper1`) contient au moins un caractère présent dans une autre chaîne (`oper2`).  
> La condition est vraie dès qu’un seul caractère de `oper2` est trouvé dans `oper1`.

> [!TIP]
> Imagine `oper2` comme une "boîte de lettres à rechercher".  
> Si tu ouvres `oper1` et que tu y trouves au moins une de ces lettres, la condition `CA` est validée.

> [!NOTE]
>
> - "HELLO" CA "XYZ" → faux (aucune lettre commune)
> - "HELLO" CA "AEIOU" → vrai (il y a "E" et "O")
> - "HELLO" CA "LLO" → vrai (le "L" apparaît très vite)

> [!IMPORTANT]
> pratique pour détecter la présence de caractères spécifiques dans des saisies utilisateur (lettres, chiffres, symboles)

## 🌺 SYNTAXE

    IF oper1 CA oper2.
      [statement_block]
    ENDIF.

- `oper1` → la chaîne testée
- `oper2` → la chaîne contenant les caractères recherchés
- Condition vraie si au moins un caractère de `oper2` est présent dans `oper1`

> [!IMPORTANT]
> L’opérateur `CA` parcourt `oper1` et retourne TRUE dès qu’il trouve un caractère présent dans `oper2`.  
> La variable système `SY-FDPOS` indique la position du premier caractère trouvé.

## 🌺 EXEMPLE

    WRITE:/ '     - IF CONTAINS ANY...'.

    CONSTANTS: lc_oper1 TYPE CHAR5 VALUE 'Hello',
               lc_oper2 TYPE CHAR3 VALUE 'llo'.

    IF lc_oper1 CA lc_oper2.
      WRITE:/ 'lc_oper1 contient au moins un caractère de ', lc_oper2,
              ' à la position ', SY-FDPOS.
    ELSE.
      WRITE:/ 'lc_oper1 ne contient aucun caractère de ', lc_oper2.
    ENDIF.

- `lc_oper1 = 'Hello'`, `lc_oper2 = 'llo'`
- La condition est vraie car `l` et `o` sont présents dans `lc_oper1`
- `SY-FDPOS = 2` → position du premier caractère trouvé

> [!TIP]
>
> - `CA` est sensible à la casse : `'HELLO'` ≠ `'Hello'`
> - Très utile pour vérifier la présence de chiffres, lettres ou symboles dans un champ texte

## 🌺 RESUME

> - `CA` = Contains Any → vérifie si `oper1` contient au moins un caractère de `oper2`.
> - Condition TRUE dès qu’un seul caractère correspond
> - `SY-FDPOS` retourne la position du premier caractère trouvé
> - Idéal pour vérifier la présence de caractères spécifiques dans une chaîne
>
> [!TIP]
> c’est comme chercher une lettre précise dans une boîte pour savoir si elle s’y trouve
