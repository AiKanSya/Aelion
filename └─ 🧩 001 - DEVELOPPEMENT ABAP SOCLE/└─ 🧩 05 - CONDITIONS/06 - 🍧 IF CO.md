# 🌸 CONTAINS ONLY (CO)

## 🌺 OBJECTIFS

- [ ] Comprendre l'opérateur `CO` (Contains Only) et son utilité
- [ ] Vérifier qu’une chaîne ne contient que des caractères autorisés
- [ ] Savoir utiliser `IF ... CO ... ENDIF` pour des contrôles simples
- [ ] Connaître la sensibilité à la casse de `CO`
- [ ] Utiliser `SY-FDPOS` pour connaître la position du dernier caractère vérifié
- [ ] Appliquer `CO` pour valider ou filtrer des entrées utilisateur

## 🌺 DEFINITION

> L’opérateur `CO` (Contains Only) permet de vérifier qu’une chaîne de caractères ne contient que certains caractères définis dans une autre chaîne.

> [!TIP]
> C’est comme vérifier que les lettres d’un mot appartiennent toutes à un alphabet donné.

> [!NOTE]  
> "HELLO" ne contient que des lettres de A à Z → vrai.  
> "HELLO1" contient un chiffre → faux.

> [!IMPORTANT]
> idéal pour contrôler des saisies utilisateur ou valider que des codes ne contiennent que des caractères autorisés

## 🌺 SYNTAXE

    IF oper1 CO oper2.
      [statement_block]
    ENDIF.

- `oper1` → la chaîne à analyser.
- `oper2` → les caractères autorisés dans `oper1`.
- Si `oper1` contient uniquement des caractères présents dans `oper2`, la condition est vraie.

> [!IMPORTANT]
> L’opérateur `CO` vérifie chaque caractère de `oper1` et renvoie TRUE uniquement si tous sont présents dans `oper2`.  
> La position du dernier caractère vérifié est stockée dans `SY-FDPOS`.

## 🌺 EXEMPLE BASIQUE

    WRITE:/ '     - IF CONTAINS ONLY...'.

    CONSTANTS: lc_oper1 TYPE CHAR5 VALUE 'Hello',
               lc_oper2 TYPE CHAR5 VALUE 'Hello'.

    IF lc_oper1 CO lc_oper2.
      WRITE:/ 'lc_oper1 contient uniquement les caractères de ', lc_oper2,
              ' à la position ', SY-FDPOS.
    ELSE.
      WRITE:/ 'lc_oper1 ne contient pas uniquement les caractères de ', lc_oper2.
    ENDIF.

### EXPLICATION :

- `lc_oper1` et `lc_oper2` contiennent `'Hello'`.
- `IF lc_oper1 CO lc_oper2.` vérifie que tous les caractères de `lc_oper1` sont dans `lc_oper2`.
- Ici la condition est vraie, et `SY-FDPOS = 5` indique la position du dernier caractère.
- Si `lc_oper2` valait `'Hell'`, la condition serait fausse.

> [!TIP]
>
> - `CO` est sensible à la casse : `'HELLO'` ≠ `'Hello'`.
> - Très utile pour valider que les codes ou chaînes saisies respectent un alphabet ou un ensemble de caractères autorisés.

## 🌺 RESUME

> - `CO` = Contains Only → teste si tous les caractères d’une chaîne appartiennent à un ensemble autorisé.
> - Retourne TRUE si la chaîne respecte l’ensemble, FALSE sinon.
> - La position du dernier caractère vérifié est disponible dans `SY-FDPOS`.
> - Idéal pour valider ou filtrer des saisies utilisateur.
>
> [!TIP]  
> vérifier que tous les ingrédients d’un plat proviennent d’une seule liste autorisée, sans intrus.
