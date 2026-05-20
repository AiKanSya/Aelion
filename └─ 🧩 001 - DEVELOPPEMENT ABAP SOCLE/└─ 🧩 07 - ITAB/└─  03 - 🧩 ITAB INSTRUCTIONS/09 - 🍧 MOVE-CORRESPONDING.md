# 🌸 MOVE CORRESPONDING

## 🌺 OBJECTIFS

- [ ] Copier uniquement les valeurs des champs correspondants entre tables internes
- [ ] Comprendre la différence entre `COPY TABLE` et `MOVE-CORRESPONDING`
- [ ] Savoir combiner plusieurs tables sources vers une même table cible
- [ ] Apprendre à manipuler des structures différentes sans erreur de type

## 🌺 DEFINITION

    MOVE-CORRESPONDING itab_src TO itab_dest.

> L’instruction `MOVE-CORRESPONDING` permet de copier seulement les champs portant le même nom entre une table interne source et une table interne destination.

> [!TIP]
> Imaginez deux formulaires avec des rubriques similaires (par exemple : _Nom_, _Pays_, _Âge_).  
> `MOVE-CORRESPONDING` copie seulement les rubriques ayant le même intitulé, sans toucher aux autres champs.

> [!IMPORTANT]
>
> - Si la source et la destination ont des champs différents, seuls les champs correspondants sont copiés.
> - Les champs qui n’existent pas dans l’autre structure sont ignorés sans erreur.
> - L’opération peut être répétée pour fusionner plusieurs tables dans la même cible.

## 🌺 EXEMPLE 1 – COPIE ENTRE TABLES DIFFERENTES

    TYPES: BEGIN OF ty_citizen_src,
             country TYPE char3,
             name    TYPE char20,
             age     TYPE numc2,
           END OF ty_citizen_src.

    TYPES: BEGIN OF ty_citizen_dest,
             name    TYPE char20,
             country TYPE char3,
           END OF ty_citizen_dest.

    DATA: lt_citizen_src  TYPE STANDARD TABLE OF ty_citizen_src,
          lt_citizen_dest TYPE STANDARD TABLE OF ty_citizen_dest,
          ls_src          TYPE ty_citizen_src.

    " --- REMPLISSAGE DE LA TABLE SOURCE ---
    ls_src-country = 'FR'.
    ls_src-name    = 'Thierry'.
    ls_src-age     = '24'.
    APPEND ls_src TO lt_citizen_src.

    ls_src-country = 'ES'.
    ls_src-name    = 'Luis'.
    ls_src-age     = '32'.
    APPEND ls_src TO lt_citizen_src.

    " --- TRANSFERT DES CHAMPS CORRESPONDANTS ---
    MOVE-CORRESPONDING lt_citizen_src TO lt_citizen_dest.

    " --- VERIFICATION ---
    LOOP AT lt_citizen_dest ASSIGNING FIELD-SYMBOLS(<llfs_dest>).
      WRITE:/ <llfs_dest>-country, <llfs_dest>-name.
    ENDLOOP.

> [!IMPORTANT]
>
> - `lt_citizen_src` contient un champ `age` absent dans `lt_citizen_dest`.
> - `MOVE-CORRESPONDING` ne copie que les champs `country` et `name`, car ils existent dans les deux structures.

> [!NOTE]  
> Le système gère automatiquement la correspondance des noms sans tenir compte de l’ordre des champs.

## 🌺 EXEMPLE 2 – FUSION DE PLUSIEURS TABLES

    DATA: lt_additional TYPE STANDARD TABLE OF ty_citizen_src.

    " Remplissage d'une autre table source
    ls_src-country = 'DE'.
    ls_src-name    = 'Klaus'.
    ls_src-age     = '28'.
    APPEND ls_src TO lt_additional.

    " Copie successive dans la table cible
    MOVE-CORRESPONDING lt_citizen_src TO lt_citizen_dest.
    MOVE-CORRESPONDING lt_additional  TO lt_citizen_dest.

> [!TIP]
> Comme remplir un registre commun à partir de plusieurs listes :  
> chaque `MOVE-CORRESPONDING` ajoute les lignes compatibles sans provoquer d’erreur.

> [!CAUTION]
> Les lignes ne sont pas fusionnées champ par champ, mais ajoutées à la table destination.  
> Cela peut créer des doublons si les données se répètent.

## 🌺 EXEMPLE 3 – AVEC DECLARATIONS DYNAMIQUES

    FIELD-SYMBOLS: <lfs_src>  TYPE STANDARD TABLE,
                   <lfs_dest> TYPE STANDARD TABLE.

    DATA: lt_source TYPE STANDARD TABLE OF ty_citizen_src,
          lt_target TYPE STANDARD TABLE OF ty_citizen_dest.

    ASSIGN lt_source TO <lfs_src>.
    ASSIGN lt_target TO <lfs_dest>.

    IF <lfs_src> IS ASSIGNED AND <lfs_dest> IS ASSIGNED.
      MOVE-CORRESPONDING <lfs_src> TO <lfs_dest>.
    ENDIF.

> [!TIP]
> Ce type d’instruction est très utile dans les programmes génériques ou les rapports qui manipulent différentes structures dynamiquement.

> [!IMPORTANT]
> Préférer cette approche quand le programme doit traiter plusieurs types de tables internes avec des champs similaires.

## DIFFERENCE AVEC COPY TABLE

| 🍧 Instruction                      | 🍧 Description                                                            | 🍧 Type de correspondance |
| ----------------------------------- | ------------------------------------------------------------------------- | ------------------------- |
| `itab1[] = itab2[]`                 | Copie tous les champs (même structure obligatoire)                        | Correspondance totale     |
| `MOVE-CORRESPONDING itab2 TO itab1` | Copie uniquement les champs de même nom, structures différentes acceptées | Correspondance partielle  |

> [!IMPORTANT]
>
> - `COPY TABLE` = copie brute (toutes les colonnes doivent exister).
> - `MOVE-CORRESPONDING` = copie intelligente (seules les colonnes communes sont transférées).

## 🌺 BONNES PRATIQUES

| 🍧 Bonne pratique                                       | 🍧 Explication                                                       |
| ------------------------------------------------------- | -------------------------------------------------------------------- |
| Toujours vérifier les noms des champs                   | La correspondance se base sur les noms, pas sur la position          |
| Utiliser MOVE-CORRESPONDING pour structures différentes | Évite les erreurs de type                                            |
| Vérifier les doublons lors de fusions                   | Plusieurs `MOVE-CORRESPONDING` peuvent ajouter des lignes identiques |
| Préférer les FIELD-SYMBOLS pour programmes génériques   | Permet de manipuler des structures inconnues à l’avance              |

## 🌺 RESUME

> `MOVE-CORRESPONDING` permet de transférer uniquement les champs communs entre deux structures ou tables internes.
>
> - Idéal pour les structures différentes mais similaires
> - Ignore les champs inexistants sans erreur
