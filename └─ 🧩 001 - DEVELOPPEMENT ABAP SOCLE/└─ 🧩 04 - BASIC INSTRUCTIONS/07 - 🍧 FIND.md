# 🌸 FIND

## 🌺 OBJECTIFS

- [ ] Comprendre l'utilisation de l'instruction FIND en ABAP
- [ ] Rechercher une chaîne de caractères `pattern` dans une chaîne source `dobj`
- [ ] Identifier la première occurrence ou toutes les occurrences
- [ ] Utiliser les options `MATCH COUNT`, `MATCH OFFSET`, `MATCH LENGTH`, et `RESULTS`

## 🌺 DEFINITION

> FIND sert à localiser des mots ou motifs dans une phrase.

> [!TIP]
> Chercher un mot spécifique dans un texte pour savoir où il se trouve ou combien de fois il apparaît.

## 🌺 SYNTAXE

    FIND [ {FIRST OCCURRENCE} | {ALL OCCURRENCES} OF ] pattern
        IN [SECTION OFFSET i1 LENGTH i2 OF] dobj
        [IN {BYTE|CHARACTER} MODE]
        [ {RESPECTING | IGNORING} CASE]
        [MATCH COUNT mcnt]
        { { [MATCH OFFSET moff] [MATCH LENGTH mlen] } | [RESULTS lt_tab|ls_structure] }.

- FIRST OCCURRENCE : rechercher la première occurrence
- ALL OCCURRENCES : rechercher toutes les occurrences
- IN SECTION OFFSET i1 LENGTH i2 OF dobj : rechercher dans une partie spécifique de la chaîne
- IN BYTE|CHARACTER MODE : mode de lecture des caractères (peu utilisé)
- RESPECTING|IGNORING CASE : tenir compte ou non de la casse
- MATCH COUNT mcnt : nombre de fois que le pattern a été trouvé
- MATCH OFFSET moff : position du motif dans la chaîne
- MATCH LENGTH mlen : longueur du motif trouvé
- RESULTS lt_tab|ls_structure : stocke le résultat dans une table ou structure

> [!TIP]
> Cadrer la recherche dans un passage précis d’un texte et noter à quelle position apparaît le mot recherché.

## 🌺 EXEMPLE - OFFSET ET LENGTH

    WRITE:/ '     - FIND OFFSET ET LENGTH...'.

    DATA lv_text TYPE STRING.

    lv_text = 'ABADAFAX'.

    FIND FIRST OCCURRENCE OF 'A'
        IN SECTION OFFSET 2 LENGTH 4 OF lv_text
        RESULTS DATA(ls_result).

    WRITE: /'OFFSET = ', ls_result-OFFSET,
           /'LENGTH = ', ls_result-LENGTH.

> [!TIP]
> Chercher un mot dans un paragraphe limité à quelques lignes.

## 🌺 EXEMPLE - MATCH COUNT

    WRITE:/ '     - FIND COUNT...'.

    DATA: lv_count TYPE I,
          lv_text  TYPE STRING.

    lv_text = 'ABADAFAX'.
    FIND ALL OCCURRENCES OF 'A' IN lv_text MATCH COUNT lv_count.

    WRITE: 'lv_count = ', lv_count.

> [!TIP]
> Compter combien de fois un mot apparaît dans une phrase.

## 🌺 EXEMPLE - MATCH OFFSET

    WRITE:/ '     - FIND OFFSET...'.

    DATA: lv_offset1 TYPE I,
          lv_offset2 TYPE I,
          lv_text    TYPE STRING.

    lv_text = 'ABADAFAX'.

    FIND ALL OCCURRENCES OF 'A' IN lv_text MATCH OFFSET lv_offset1.
    FIND FIRST OCCURRENCE OF 'A' IN lv_text MATCH OFFSET lv_offset2.

    WRITE:  'lv_offset1 = ', lv_offset1,
          / 'lv_offset2 = ', lv_offset2.

> [!TIP]
> Noter la position du mot dans la phrase pour savoir où il commence ou finit.

## 🌺 EXEMPLE - COMBINAISON

    WRITE:/ '     - FIND COMBINAISON...'.

    DATA: lv_text TYPE STRING.

    lv_text = 'ABADAFAX'.

    FIND ALL OCCURRENCES OF 'A' IN lv_text
        MATCH COUNT DATA(lv_count).

    FIND ALL OCCURRENCES OF 'A' IN lv_text
        MATCH OFFSET DATA(lv_offset1).

    FIND FIRST OCCURRENCE OF 'A' IN lv_text
        MATCH OFFSET DATA(lv_offset2).

    WRITE: /'lv_count   = ', lv_count,
           /'lv_offset1 = ', lv_offset1,
           /'lv_offset2 = ', lv_offset2.

> [!TIP]
> Savoir combien de fois le mot apparaît et à quelle position exacte.

> [!TIP]
>
> - Visualiser la chaîne comme une phrase à scanner à la recherche d’un mot
> - `FIRST OCCURRENCE` = le premier mot trouvé
> - `ALL OCCURRENCES` = tous les mots trouvés
> - `MATCH COUNT` = combien de mots
> - `MATCH OFFSET` = position du mot dans la phrase

## 🌺 RESUME

> - `FIND` = rechercher un motif dans une chaîne
> - Peut retourner position, longueur, nombre d’occurrences, ou résultats dans structure/table
>
> [!TIP]
> scanner un texte pour identifier et localiser les mots précis
