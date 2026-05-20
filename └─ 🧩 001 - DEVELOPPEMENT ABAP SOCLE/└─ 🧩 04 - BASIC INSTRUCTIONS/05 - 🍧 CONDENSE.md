# 🌸 CONDENSE

## 🌺 OBJECTIFS

- [ ] Comprendre l'utilisation de l'instruction `CONDENSE` en ABAP
- [ ] Supprimer les espaces superflus dans une chaîne de caractères
- [ ] Utiliser l'option `NO-GAPS` pour enlever tous les espaces

## 🌺 DEFINITION

> `CONDENSE` sert à réduire les espaces inutiles dans une chaîne de caractères.

> [!TIP]
> Pousser tous les mots ensemble pour éviter les espaces vides, ou plier une feuille pour que tout le texte tienne sans espace inutile.

## 🌺 SYNTAXE

    CONDENSE text [NO-GAPS].

- text : variable contenant la chaîne à traiter
- `NO-GAPS` : supprime tous les espaces, y compris ceux entre les mots

> [!TIP]
>
> - Sans `NO-GAPS` = garder un espace simple entre chaque mot
> - Avec `NO-GAPS` = coller tous les mots ensemble

## 🌺 EXEMPLE

    WRITE:/ '     - CONDENSE...'.

    CONSTANTS: lc_text1(20) TYPE C VALUE 'Hello    ',
               lc_text2(20) TYPE C VALUE '    World    ',
               lc_text3(20) TYPE C VALUE '    Bienvenue    ',
               lc_text4(20) TYPE C VALUE '    sur    ',
               lc_text5(20) TYPE C VALUE '    SAP    '.

    DATA: lv_result(50) TYPE C.

    " CONCATENATION initiale
    CONCATENATE lc_text1 lc_text2 lc_text3 lc_text4 lc_text5
      INTO lv_result.

    WRITE:/ 'Sans CONDENSE :         ', lv_result.

    " CONDENSE pour supprimer les espaces superflus
    CONDENSE lv_result.
    WRITE:/ 'Avec CONDENSE :         ', lv_result.

    " CONDENSE NO-GAPS pour supprimer tous les espaces
    CONDENSE lv_result NO-GAPS.
    WRITE:/ 'Avec CONDENSE NO GAPS : ', lv_result.

> [!TIP]
>
> - Premier affichage : texte avec tous les espaces ajoutés
> - `CONDENSE` : supprimer les espaces superflus mais garder un espace simple entre les mots
> - `CONDENSE NO-GAPS` : coller tous les mots ensemble sans aucun espace

> [!TIP]
>
> - Visualiser la chaîne comme une ligne de mots avec trop d’espaces
> - `CONDENSE` = réorganiser la ligne pour ne garder qu’un espace minimal
> - `NO-GAPS` = éliminer complètement tous les espaces
> - Très utile après un `CONCATENATE` pour nettoyer le texte avant affichage ou traitement

## 🌺 RESUME

> - `CONDENSE` = supprimer les espaces inutiles dans une variable
> - `NO-GAPS` = supprimer tous les espaces

> [!TIP]
> plier le texte pour qu’il soit compact et lisible
