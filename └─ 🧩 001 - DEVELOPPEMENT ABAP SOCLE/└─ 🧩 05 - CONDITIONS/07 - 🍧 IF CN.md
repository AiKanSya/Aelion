# 🌸 CONTAINS NOT ONLY (CN)

## 🌺 OBJECTIFS

- [ ] Comprendre l'opérateur `CN` (Contains Not Only) et son utilité
- [ ] Vérifier qu’une chaîne contient au moins un caractère non autorisé
- [ ] Savoir utiliser `IF ... CN ... ENDIF` pour des contrôles simples
- [ ] Connaître la sensibilité à la casse de `CN`
- [ ] Utiliser `SY-FDPOS` pour localiser le dernier caractère valide
- [ ] Appliquer `CN` pour détecter des caractères indésirables dans une entrée utilisateur

## 🌺 DEFINITION

> L’opérateur `CN` (Contains Not Only) est l’opposé de `CO`.  
> Il permet de vérifier qu’une chaîne de caractères contient autre chose que les caractères d’une autre chaîne.  
> La condition est vraie si `oper1` contient au moins un caractère absent de `oper2`.

> [!TIP]
> Imaginez `oper2` comme une "liste de caractères autorisés".  
> Si `oper1` contient un caractère hors de cette liste, la condition `CN` est vraie.

> [!NOTE]
>
> - "HELLO" `CN` "HELL" → vrai (il y a un "O" supplémentaire)
> - "HELLO" `CN` "HELLO" → faux (tous les caractères sont autorisés)

> Utilisation conseillée
> idéal pour détecter des caractères indésirables ou filtrer les saisies utilisateur

## 🌺 SYNTAXE

    IF oper1 CN oper2.
      [statement_block]
    ENDIF.

- `oper1` → la chaîne testée.
- `oper2` → la chaîne servant de référence.
- La condition est vraie si `oper1` contient au moins un caractère non présent dans `oper2`.

> [!NOTE]
> L’opérateur `CN` parcourt `oper1` et détecte le premier caractère qui n’est pas dans `oper2`.  
> La position du dernier caractère valide trouvé est stockée dans `SY-FDPOS`.

## 🌺 EXEMPLE BASIQUE

    WRITE:/ '     - IF CONTAINS NOT ONLY...'.

    CONSTANTS: lc_oper1 TYPE CHAR5 VALUE 'Hello',
               lc_oper2 TYPE CHAR5 VALUE 'Hell'.

    IF lc_oper1 CN lc_oper2.
      WRITE:/ 'lc_oper1 contient au moins un caractère non autorisé par ', lc_oper2,
              ', position du dernier caractère autorisé : ', SY-FDPOS.
    ELSE.
      WRITE:/ 'lc_oper1 contient uniquement les caractères de ', lc_oper2.
    ENDIF.

### EXPLICATION :

- `lc_oper1 = 'Hello'` et `lc_oper2 = 'Hell'`
- `IF lc_oper1 CN lc_oper2.` détecte le caractère supplémentaire "o"
- `SY-FDPOS = 4` correspond à la position du dernier caractère trouvé dans `lc_oper2`
- La condition retourne TRUE car `lc_oper1` contient un caractère non autorisé

> [!TIP]
>
> - `CN` est sensible à la casse : `'HELLO'` ≠ `'Hello'`.
> - Utile pour valider que des codes ou champs texte ne contiennent aucun caractère interdit.

## 🌺 RESUME

> - `CN` = Contains Not Only → teste si une chaîne contient au moins un caractère non autorisé.
> - Retourne TRUE si `oper1` contient autre chose que les caractères de `oper2`.
> - `SY-FDPOS` indique la position du dernier caractère conforme à `oper2`.
> - Idéal pour filtrer ou contrôler les saisies utilisateur.
>
> [!TIP]  
> vérifier qu’une liste contient au moins un ingrédient non autorisé dans une recette, pour détecter les erreurs ou intrus.
