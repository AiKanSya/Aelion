# 🌸 NO PATTERN (NP)

## 🌺 OBJECTIFS

- [ ] Comprendre l'opérateur `NP` (No Pattern) et son rôle
- [ ] Vérifier si une CHAINE ne correspond pas à un `PATTERN` avec jokers (\* et +)
- [ ] Utiliser `IF` ... `NP` ... `ENDIF` pour des comparaisons inverses
- [ ] Identifier les applications pratiques : exclure des fichiers, formats ou motifs textuels
- [ ] Reconnaître la sensibilité à la casse et les types de VARIABLES compatibles (C ou STRING)

## 🌺 DEFINITION

> l'opérateur `NP` (No Pattern) est l’inverse de `CP` (Covers Pattern).  
> Il permet de vérifier si une CHAINE (oper1) ne correspond pas au `PATTERN` (oper2) contenant des caractères génériques (\* et +).

> [!TIP]
> Si `CP` est comme un filtre qui sélectionne les fichiers correspondants (ex : "\*.png" pour ne garder que les images),  
> alors `NP` est son opposé — il exclut tout ce qui correspond à ce modèle.  
> C’est comme dire : “je veux tout sauf les fichiers .png”.

> [!CAUTION]
> Le `NP` est sensible à la casse. "Hello" et "hello" seront considérés différents.

## 🌺 SYNTAXE

    IF oper1 NP oper2.
      [statement_block]
    ENDIF.

- oper1 → CHAINE à tester
- oper2 → PATTERN à ne pas respecter (avec \* et + comme jokers)

> [!IMPORTANT]
> Exclure certains fichiers ou formats non désirés, valider que des entrées ne correspondent pas à un motif interdit.

## 🌺 EXEMPLES

    WRITE:/ '     - IF NO PATTERN...'.

    CONSTANTS: lc_oper1 TYPE CHAR9 VALUE 'texte.txt',
               lc_oper2 TYPE CHAR5 VALUE '*.png'.

    IF lc_oper1 NP lc_oper2.
      WRITE:/ 'Le fichier lu n''est pas au format PNG'.
    ELSE.
      WRITE:/ 'Le fichier lu est au format PNG'.
    ENDIF.

Explication :

- lc_oper1 = "texte.txt"
- lc_oper2 = "\*.png"
- Le programme teste si "texte.txt" NE correspond PAS au modèle "\*.png".
- Résultat : "Le fichier lu n'est pas au format PNG"

### AUTRES EXEMPLES

- 'photo.jpg' NP '\*.png' → VRAI (ne correspond pas au modèle)
- 'photo.png' NP '\*.png' → FAUX (correspond au modèle)
- 'hello' NP 'h+\*' → FAUX (commence bien par "h")
- 'data123' NP '_abc_' → VRAI (ne contient pas "abc")

> [!NOTE]
> Le motif (oper2) doit être une chaîne de type `C` ou `STRING`.

## 🌺 RESUME

> - `NP` = `NO PATTERN` → teste qu’une chaîne ne correspond pas à un `PATTERN` donné.
> - Opposé de `CP` (Covers Pattern).
> - Caractères génériques : \* pour plusieurs caractères, + pour un seul.
> - Sensible à la casse.
> - Très utile pour exclure des fichiers, formats ou motifs textuels indésirables.
>
> [!TIP]
> Comme dire “je veux tout sauf ce type de fichier ou ce motif précis”.
