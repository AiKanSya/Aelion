# 🌸 CLEAR TABLE

## 🌺 OBJECTIFS

- [ ] Supprimer toutes les lignes d’une table interne avec `CLEAR`
- [ ] Comprendre la syntaxe avec les crochets `[]`
- [ ] Savoir que `CLEAR` peut aussi être utilisé sur des variables simples
- [ ] Différencier `CLEAR itab[]` et `REFRESH itab`
- [ ] Vérifier le contenu d’une table avant et après effacement

## 🌺 DEFINITION

    CLEAR: itab[],
           var1.

> L’instruction `CLEAR` permet de supprimer toutes les données d’une table interne ou de remettre à zéro des variables.

> [!TIP]
> Imaginez un tableau blanc rempli d’informations.
>
> - `CLEAR itab[]` = effacer complètement le tableau (toutes les lignes).
> - `CLEAR var1` = effacer le contenu d’une seule cellule du tableau.

> [![!NOTE]]
> Les crochets `[]` sont essentiels : sans eux, seule la structure est effacée, pas son contenu.

## 🌺 EXEMPLES

### 1 – CLEAR SUR UNE TABLE INTERNE

    TYPES: BEGIN OF ty_citizen,
             country TYPE char3,
             name    TYPE char20,
             age     TYPE numc2,
           END OF ty_citizen.

    DATA: lt_citizen TYPE STANDARD TABLE OF ty_citizen,
          ls_citizen TYPE ty_citizen,
          gv_count   TYPE i.

    " REMPLISSAGE DE LA TABLE
    ls_citizen-country = 'FR'.
    ls_citizen-name    = 'Thierry'.
    ls_citizen-age     = '24'.
    APPEND ls_citizen TO lt_citizen.

    ls_citizen-country = 'ES'.
    ls_citizen-name    = 'Luis'.
    ls_citizen-age     = '32'.
    APPEND ls_citizen TO lt_citizen.

    gv_count = lines( lt_citizen ). " Nombre de lignes avant CLEAR

    WRITE:/ 'Lignes avant suppression :', gv_count.

    CLEAR lt_citizen[]. " Supprime toutes les lignes de la table

    gv_count = lines( lt_citizen ). " Recalcul du nombre de lignes
    WRITE:/ 'Lignes apres CLEAR :', gv_count.

> [!IMPORTANT]
>
> - Avant `CLEAR`, la table contient 2 lignes.
> - Après `CLEAR`, la table est complètement vide.

> [!CAUTION]
> Le `CLEAR lt_citizen` (sans `[]`) n’efface pas les lignes, il ne fait que remettre la variable au statut initial (structure vide).

### 2 – CLEAR SUR VARIABLE SIMPLE

    DATA: gv_total TYPE i VALUE 125.

    WRITE:/ 'Avant CLEAR :', gv_total.

    CLEAR gv_total.

    WRITE:/ 'Apres CLEAR :', gv_total.

> [!TIP]
> Le `CLEAR` sur une variable simple remet sa valeur à zéro (ou initiale).  
> Par exemple
>
> - Numérique → 0
> - Caractère → vide
> - Booléen → ‘ ‘ (faux)

### 3 – CLEAR SUR PLUSIEURS OBJETS EN UNE SEULE FOIS

    DATA: gv_counter TYPE i VALUE 10,
          gv_name    TYPE string VALUE 'Thierry',
          lt_data    TYPE STANDARD TABLE OF ty_citizen.

    CLEAR: gv_counter, gv_name, lt_data[].

> [!IMPORTANT]
> Il est possible d’effacer plusieurs éléments en une seule instruction.  
> Pratique pour remettre un environnement à zéro avant de relancer un traitement.

### 4 – DIFFERENCE ENTRE CLEAR ET REFRESH

    DATA: lt_table TYPE STANDARD TABLE OF ty_citizen.

    CLEAR lt_table[].  " Efface le contenu de la table
    REFRESH lt_table.  " Efface aussi le contenu (comportement identique depuis ABAP 7.40)

> [!IMPORTANT]
> Le `CLEAR itab[]` est préféré dans le code moderne.  
> Le `REFRESH` est conservé pour compatibilité avec les anciens programmes.

### 5 – CLEAR SUR STRUCTURE COMPLETE

    DATA: ls_person TYPE ty_citizen.

    ls_person-country = 'FR'.
    ls_person-name    = 'Thierry'.
    ls_person-age     = '24'.

    WRITE:/ 'Avant CLEAR :', ls_person-country, ls_person-name, ls_person-age.

    CLEAR ls_person.

    WRITE:/ 'Apres CLEAR :', ls_person-country, ls_person-name, ls_person-age.

> [!NOTE]
> Le `CLEAR` sur une structure remet chaque champ à sa valeur initiale (vidée ou zéro).

### 6 – CLEAR DYNAMIQUE AVEC FIELD-SYMBOL

    FIELD-SYMBOLS: <lfs_tab> TYPE STANDARD TABLE.

    ASSIGN lt_citizen TO <lfs_tab>.

    IF <lfs_tab> IS ASSIGNED.
      CLEAR <lfs_tab>[].
    ENDIF.

> [!TIP]
> Très utile pour écrire des programmes dynamiques manipulant plusieurs tables internes sans les nommer directement.

## 🌺 BONNES PRATIQUES

| 🍧 Bonne pratique                           | 🍧 Explication                                                         |
| ------------------------------------------- | ---------------------------------------------------------------------- |
| Toujours vérifier le nombre de lignes       | `LINES( itab )` avant/après `CLEAR` permet de confirmer la suppression |
| Utiliser CLEAR avec []                      | Indique explicitement que toute la table est effacée                   |
| CLEAR peut combiner plusieurs variables     | Réduit le code et garde la logique claire                              |
| Préférer CLEAR à REFRESH dans le code       | Syntaxe plus moderne, même effet                                       |
| Ne pas oublier les crochets []              | Sans crochets, seule la variable est remise à zéro, pas le contenu     |
| Eviter CLEAR sur des références non testées | Toujours vérifier `IS ASSIGNED` avant CLEAR sur FIELD-SYMBOLS          |

## 🌺 RESUME

> `CLEAR` est une instruction simple mais puissante
>
> - `CLEAR itab[]` : efface toutes les lignes d’une table interne
> - `CLEAR var` : remet une variable à sa valeur initiale
> - `CLEAR structure` : réinitialise tous les champs de la structure
> - `CLEAR` peut être combiné sur plusieurs objets
> - `CLEAR` avec `[]` est l’équivalent moderne de `REFRESH`
>
> [!TIP]
> C’est comme appuyer sur “Réinitialiser” — on remet tout à zéro avant de recommencer proprement.
