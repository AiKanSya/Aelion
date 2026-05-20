# 🌸 REPLACE

## 🌺 OBJECTIFS

- [ ] Comprendre l'utilisation de l'instruction `REPLACE` en ABAP
- [ ] Remplacer une chaîne pattern par une autre new dans une chaîne source dobj
- [ ] Utiliser les options `FIRST OCCURRENCE` ou `ALL OCCURRENCES`
- [ ] Maîtriser les paramètres `REPLACEMENT COUNT`, `REPLACEMENT OFFSET`, `REPLACEMENT LENGTH` et `RESULTS`

## 🌺 DEFINITION

> `REPLACE` sert à trouver un mot ou motif dans une chaîne et le remplacer par un autre.

> [!TIP]
> Corriger un mot dans un texte en le remplaçant par le mot correct.

> [!IMPORTANT]
> Le `REPLACE` peut agir sur la première occurrence seulement ou sur toutes les occurrences d’un motif. On peut aussi savoir combien de remplacements ont été faits et où le dernier remplacement s’est produit.

## 🌺 SYNTAXE

    REPLACE [ {FIRST OCCURRENCE} | {ALL OCCURRENCES} OF ] pattern
            IN [ section_of ] dobj
            WITH new
            [ IN { BYTE | CHARACTER } MODE ]
            [ { RESPECTING | IGNORING } CASE ]
            [ REPLACEMENT COUNT rcnt ]
            { { [ REPLACEMENT OFFSET roff ] [ REPLACEMENT LENGTH rlen ] } | [ RESULTS result_tab|result_wa ] }.

- FIRST OCCURRENCE : remplacer la première occurrence seulement
- ALL OCCURRENCES : remplacer toutes les occurrences
- IN section_of : remplacer dans une portion spécifique de la chaîne
- IN BYTE|CHARACTER MODE : mode de lecture des caractères
- RESPECTING|IGNORING CASE : tenir compte ou non de la casse
- REPLACEMENT COUNT rcnt : nombre de remplacements effectués
- REPLACEMENT OFFSET roff : position du dernier remplacement
- REPLACEMENT LENGTH rlen : longueur du motif remplacé
- RESULTS result_tab|result_wa : stocke le résultat dans une table ou structure

> [!TIP]
> Visualisez votre chaîne comme une feuille de texte où chaque mot peut être corrigé ou remplacé.  
> `FIRST OCCURRENCE` = changer le premier mot trouvé, `ALL OCCURRENCES` = tous les mots identiques.

## 🌺 EXEMPLE BASIQUE

    WRITE:/ '     - REPLACE...'.

    DATA: lv_text1 TYPE STRING,
          lv_text2 TYPE STRING.

    lv_text1 = lv_text2 = 'ABADAFAX'.

    REPLACE FIRST OCCURRENCE OF 'A' IN lv_text1 WITH 'I'.
    REPLACE ALL OCCURRENCES OF 'A' IN lv_text2 WITH 'O'.

    WRITE: / 'lv_text1 = ', lv_text1,
           / 'lv_text2 = ', lv_text2.

> [!TIP]
> Comme corriger une faute dans une phrase : le premier `REPLACE` change seulement le premier 'A', le second corrige tous les 'A'.

## 🌺 EXEMPLE - REPLACEMENT COUNT

    WRITE:/ '     - REPLACE COUNT...'.

    DATA: lv_text TYPE STRING.

    lv_text = 'ABADAFAX'.

    REPLACE ALL OCCURRENCES OF 'A' IN lv_text WITH 'I'
        REPLACEMENT COUNT DATA(lv_count).

    WRITE: / 'Nombre de remplacements = ', lv_count.

> [!NOTE]
> Le `REPLACEMENT COUNT` permet de savoir combien de modifications ont été effectuées.

## 🌺 EXEMPLE - REPLACEMENT OFFSET

    WRITE:/ '     - REPLACE OFFSET...'.

    DATA: lv_text1 TYPE STRING,
          lv_text2 TYPE STRING.

    lv_text1 = lv_text2 = 'ABADAFAX'.

    REPLACE FIRST OCCURRENCE OF 'A' IN lv_text1 WITH 'I'
        REPLACEMENT OFFSET DATA(lv_offset1).

    REPLACE ALL OCCURRENCES OF 'A' IN lv_text2 WITH 'I'
        REPLACEMENT OFFSET DATA(lv_offset2).

    WRITE: / 'Offset du premier remplacement = ', lv_offset1,
           / 'Offset du dernier remplacement = ', lv_offset2.

> [!TIP]
> Comme noter la position exacte d’une correction dans un texte pour savoir où elle se situe.

## 🌺 EXEMPLE - COMBINAISON

    WRITE:/ '     - REPLACE COMBINAISON...'.

    DATA: lv_text TYPE STRING.

    lv_text = 'ABADAFAX'.

    REPLACE ALL OCCURRENCES OF 'A' IN lv_text WITH 'I'
        REPLACEMENT COUNT DATA(lv_count)
        REPLACEMENT OFFSET DATA(lv_offset1).

    WRITE: / 'Texte après remplacement = ', lv_text,
           / 'Nombre de remplacements = ', lv_count,
           / 'Position du dernier remplacement = ', lv_offset1.

> [!IMPORTANT]
> Pour modifier une chaîne tout en suivant le nombre de remplacements et la position du dernier changement.

## 🌺 RESUME

> - `REPLACE` = rechercher et remplacer un motif dans une chaîne
> - Peut modifier la première occurrence ou toutes les occurrences
> - Paramètres utiles : `REPLACEMENT COUNT`, `REPLACEMENT OFFSET`, `LENGTH`, `RESULTS`
>
> [!TIP]
> corriger un texte et suivre les modifications effectuées
