# 🌸 CONCATENATE

## 🌺 OBJECTIFS

- [ ] Comprendre l’utilisation de `CONCATENATE` en ABAP
- [ ] Concaténer plusieurs chaînes de caractères
- [ ] Utiliser les options `SEPARATED BY` et `RESPECTING BLANKS`
- [ ] Stocker le résultat dans une variable

## 🌺 DEFINITION

> `CONCATENATE` permet de fusionner plusieurs chaînes de caractères ou lignes d’une table interne et de stocker le résultat dans une variable cible.

> [!TIP]
> Coller plusieurs bouts de texte sur une feuille pour former une phrase complète.

## 🌺 SYNTAXE

    CONCATENATE [ {dobj1 dobj2 ...} | {LINES OF itab} ]
        INTO result
        [IN {BYTE|CHARACTER} MODE]
        [SEPARATED BY sep]
        [RESPECTING BLANKS].

- dobj1, dobj2... : chaînes ou variables à concaténer
- LINES OF itab : concatène toutes les lignes d’une table interne
- INTO result : variable où stocker le résultat
- IN BYTE|CHARACTER MODE : mode de traitement des caractères (peu utilisé)
- SEPARATED BY sep : caractère de séparation entre les éléments
- RESPECTING BLANKS : conserve les espaces de chaque chaîne

> [!TIP]
>
> - `IN BYTE MODE` = travailler en mode "octet pur", comme manipuler les lettres en binaire
> - `SEPARATED BY` = ajouter un petit séparateur entre chaque mot, comme un tiret ou une virgule
> - `RESPECTING BLANKS` = conserver exactement l’espace prévu pour chaque mot, utile pour les fichiers plats ou formats bancaires

## 🌺 EXEMPLE

    WRITE:/ '     - CONCATENATE...'.

    CONSTANTS: lc_text1(20) TYPE C VALUE 'Hello',
               lc_text2(20) TYPE C VALUE 'World',
               lc_text3(20) TYPE C VALUE 'Bienvenue',
               lc_text4(20) TYPE C VALUE 'sur',
               lc_text5(20) TYPE C VALUE 'SAP'.

    DATA: lv_resul1(50) TYPE C,
          lv_resul2(50) TYPE C,
          lv_resul3(100) TYPE C.

    " CONCATENATE simple
    CONCATENATE lc_text1 lc_text2 lc_text3 lc_text4 lc_text5
      INTO lv_resul1.

    " CONCATENATE avec séparateur
    CONCATENATE lc_text1 lc_text2 lc_text3 lc_text4 lc_text5
      INTO lv_resul2
      SEPARATED BY '-'.

    " CONCATENATE en respectant les espaces
    CONCATENATE lc_text1 lc_text2 lc_text3 lc_text4 lc_text5
      INTO lv_resul3
      RESPECTING BLANKS.

    WRITE:/ 'Sans option :     ', lv_resul1,
          / 'SEPARATED BY:     ', lv_resul2,
          / 'RESPECTING BLANKS:', lv_resul3.

> [!IMPORTANT]
>
> - Premier `CONCATENATE` : coller les mots bout à bout sans espace supplémentaire
> - Deuxième : coller les mots avec un tiret entre chaque mot
> - Troisième : coller les mots en conservant tous les espaces définis, comme des cases fixes sur une feuille

> [!TIP]
> Visualiser chaque mot comme une carte à coller sur une feuille
>
> - `SEPARATED BY` = ajouter un espace ou un séparateur visible
> - `RESPECTING BLANKS` = respecter exactement la largeur de chaque mot
> - Les tables internes peuvent être fusionnées automatiquement ligne par ligne avec LINES OF itab

## 🌺 RESUME

> - `CONCATENATE` = fusionner plusieurs chaînes dans une variable
> - Options importantes : `SEPARATED BY`, `RESPECTING BLANKS`
>
> [!TIP]
> coller des cartes ou des mots sur une feuille pour former un texte complet
