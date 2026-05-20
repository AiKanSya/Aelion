# 🌸 COPY TABLE

## 🌺 OBJECTIFS

- [ ] Copier toutes les lignes d’une table interne vers une autre
- [ ] Comprendre l’usage des crochets `[]` pour copier le contenu complet
- [ ] Savoir que cette opération duplique toutes les données et non la référence
- [ ] Connaître les précautions à prendre avant une copie
- [ ] Être capable de vérifier la réussite d’une copie

## 🌺 DEFINITION

    itab_dest[] = itab_src[]

> L’instruction `COPY TABLE` (écrite en ABAP sous la forme `itab_dest[] = itab_src[]`) permet de copier toutes les lignes d’une table interne vers une autre.

> [!TIP]
> Imaginez deux classeurs
>
> - `itab_src` = classeur d’origine rempli de fiches
> - `itab_dest` = classeur vide  
>   Copier `itab_src[]` vers `itab_dest[]` revient à photocopier toutes les fiches du premier pour les ranger dans le second.

## 🌺 EXEMPLES

### 1 – COPIE COMPLETE D’UNE TABLE INTERNE

    TYPES: BEGIN OF ty_citizen,
             country TYPE char3,
             name    TYPE char20,
             age     TYPE numc2,
           END OF ty_citizen.

    DATA: lt_citizen_src  TYPE STANDARD TABLE OF ty_citizen,
          lt_citizen_dest TYPE STANDARD TABLE OF ty_citizen,
          ls_citizen      TYPE ty_citizen.

    " REMPLISSAGE DE LA TABLE SOURCE
    ls_citizen-country = 'FR'.
    ls_citizen-name    = 'Thierry'.
    ls_citizen-age     = '24'.
    APPEND ls_citizen TO lt_citizen_src.

    ls_citizen-country = 'ES'.
    ls_citizen-name    = 'Luis'.
    ls_citizen-age     = '32'.
    APPEND ls_citizen TO lt_citizen_src.

    " COPIE DE TOUTES LES LIGNES
    lt_citizen_dest[] = lt_citizen_src[].

    " AFFICHAGE DE LA TABLE DESTINATION
    LOOP AT lt_citizen_dest ASSIGNING FIELD-SYMBOLS(<lfs_citizen>).
      WRITE:/ <lfs_citizen>-country, <lfs_citizen>-name, <lfs_citizen>-age.
    ENDLOOP.

> [!IMPORTANT]
> La table `lt_citizen_dest` contient maintenant exactement les mêmes lignes que `lt_citizen_src`.

> [!CAUTION]
> Si `lt_citizen_dest` contenait déjà des données, elles seront remplacées (pas ajoutées).

### 2 – COPIE AVEC STRUCTURE IDENTIQUE MAIS VIDE

    DATA: lt_empty_src TYPE STANDARD TABLE OF ty_citizen,
          lt_copy     TYPE STANDARD TABLE OF ty_citizen.

    lt_copy[] = lt_empty_src[].

> [!TIP]
> Si la table source est vide, la table de destination sera vide aussi.  
> Cela peut être utile pour réinitialiser une table sans utiliser `CLEAR`.

### 3 – COPIE AVEC DECLARATION DYNAMIQUE

    FIELD-SYMBOLS: <lfs_src>  TYPE STANDARD TABLE,
                   <lfs_dest> TYPE STANDARD TABLE.

    DATA: lt_people TYPE STANDARD TABLE OF ty_citizen.

    ASSIGN lt_people TO <lfs_src>.
    ASSIGN lt_citizen_dest TO <lfs_dest>.

    IF <lfs_src> IS ASSIGNED AND <lfs_dest> IS ASSIGNED.
      <lfs_dest>[] = <lfs_src>[].
    ENDIF.

> [!IMPORTANT]
> Cette méthode est utilisée dans les programmes où les noms de tables varient selon les contextes.  
> Elle permet de copier dynamiquement sans connaître le nom exact des tables.

> [!IMPORTANT]
> Utile dans les modules génériques, les fonctions réutilisables, ou les boucles traitant plusieurs tables internes différentes.

## 🌺 BONNES PRATIQUES

| 🍧 Bonne pratique                            | 🍧 Explication                                                               |
| -------------------------------------------- | ---------------------------------------------------------------------------- |
| Toujours vérifier le contenu avec LINES( )   | Permet de confirmer que la copie a bien été effectuée                        |
| Utiliser [] pour indiquer le contenu complet | Sans crochets, seule la référence de la table serait copiée, pas ses données |
| Préparer la table destination                | Si elle contient déjà des données, elles seront remplacées                   |
| Eviter les copies inutiles                   | Pour des grandes tables, cela peut ralentir le programme                     |
| Favoriser les FIELD-SYMBOLS pour modifier    | Si le but est de manipuler directement, pas besoin de dupliquer les données  |

## 🌺 RESUME

> `itab_dest[] = itab_src[]` est la méthode la plus simple pour copier intégralement une table interne.
>
> - Les crochets `[]` signifient “copie de tout le contenu”
> - Les données sont dupliquées, pas seulement la référence
> - Les anciennes lignes sont remplacées
> - Possibilité d’utiliser des FIELD-SYMBOLS pour un traitement dynamique
>
> [!TIP]
> Copier une table, c’est comme scanner un classeur entier pour en faire une copie fidèle, sans toucher à l’original.
