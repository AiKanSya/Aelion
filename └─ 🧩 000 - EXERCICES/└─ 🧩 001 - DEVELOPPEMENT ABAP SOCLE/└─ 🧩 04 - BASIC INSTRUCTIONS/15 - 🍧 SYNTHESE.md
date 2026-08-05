# 🌸 EXERCICES — SYNTHESE

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [INSTRUCTION WRITE](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 04 - BASIC INSTRUCTIONS/01 - 🍧 WRITE.md>)

> Cours associé : [MESSAGES](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 04 - BASIC INSTRUCTIONS/02 - 🍧 MESSAGE.md>)

> Cours associé : [INSTRUCTION DE CALCUL](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 04 - BASIC INSTRUCTIONS/03 - 🍧 CALCULS.md>)

> Cours associé : [CONCATENATE](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 04 - BASIC INSTRUCTIONS/04 - 🍧 CONCATENATE.md>)

> Cours associé : [CONDENSE](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 04 - BASIC INSTRUCTIONS/05 - 🍧 CONDENSE.md>)

> Cours associé : [SPLIT](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 04 - BASIC INSTRUCTIONS/06 - 🍧 SPLIT.md>)

> Cours associé : [FIND](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 04 - BASIC INSTRUCTIONS/07 - 🍧 FIND.md>)

> Cours associé : [REPLACE](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 04 - BASIC INSTRUCTIONS/08 - 🍧 REPLACE.md>)

> Cours associé : [TRANSLATE](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 04 - BASIC INSTRUCTIONS/09 - 🍧 TRANSLATE.md>)

> Cours associé : [CLEAR](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 04 - BASIC INSTRUCTIONS/10 - 🍧 CLEAR.md>)

> Cours associé : [ACCÈS PAR OFFSET ET LONGUEUR](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 04 - BASIC INSTRUCTIONS/11 - 🍧 OFFSET.md>)

> Cours associé : [CONVERSION SÉCURISÉE D'UN TEXTE EN NOMBRE](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 04 - BASIC INSTRUCTIONS/14 - 🍧 CONVERSION TEXTE VERS NOMBRE.md>)

## 🌺 OBJECTIF

Transformer une ligne textuelle en résultat exploitable en combinant les instructions du dossier.

## 🌺 CONTEXTE

La source reçue est :

```text
 fr ; 75001 ; paris ; 4 ; 12.50
```

Les segments représentent :

1. pays ;
2. code postal ;
3. ville ;
4. quantité ;
5. prix unitaire.

## 🌺 CONSIGNES

1. conserver la valeur source ;
2. découper la ligne avec `SPLIT` ;
3. nettoyer chaque segment avec `CONDENSE` ;
4. mettre le pays et la ville en majuscules avec `TRANSLATE` ;
5. vérifier avec `FIND` que le code postal ne contient pas le texte `ABC` ;
6. convertir la quantité en type `i` ;
7. convertir le prix en type `p LENGTH 8 DECIMALS 2` ;
8. intercepter les erreurs de conversion ;
9. calculer le montant ;
10. construire une ligne de résultat avec `CONCATENATE` ;
11. remplacer les points par des virgules uniquement dans une copie textuelle du montant ;
12. afficher la source et le résultat avec `WRITE` ;
13. réinitialiser les variables de travail avec `CLEAR`.

## 🌺 RÉSULTAT MÉTIER ATTENDU

```text
Pays        : FR
Code postal : 75001
Ville       : PARIS
Quantité    : 4
Prix        : 12,50
Montant     : 50,00
```

## 🌺 CRITÈRES DE VALIDATION

- [ ] La source est conservée.
- [ ] Les cinq segments sont extraits.
- [ ] Les espaces superflus sont supprimés.
- [ ] Le pays et la ville sont en majuscules.
- [ ] Les conversions sont protégées.
- [ ] Le montant vaut `50,00`.
- [ ] Le résultat final est construit dans une variable.
- [ ] Les variables de travail sont réinitialisées à la fin.

<details>
<summary>🍧 Afficher la solution complète</summary>

```abap
REPORT zaelion_<tri>_instructions.

DATA lv_source TYPE string
  VALUE ` fr ; 75001 ; paris ; 4 ; 12.50 `.

DATA lv_country_text TYPE string.
DATA lv_zip_text     TYPE string.
DATA lv_city_text    TYPE string.
DATA lv_quantity_text TYPE string.
DATA lv_price_text    TYPE string.

DATA lv_quantity TYPE i.
DATA lv_price    TYPE p LENGTH 8 DECIMALS 2.
DATA lv_amount   TYPE p LENGTH 10 DECIMALS 2.

DATA lv_price_output  TYPE string.
DATA lv_amount_output TYPE string.
DATA lv_result        TYPE string.
DATA lv_error         TYPE string.

START-OF-SELECTION.

  SPLIT lv_source AT ';'
    INTO lv_country_text
         lv_zip_text
         lv_city_text
         lv_quantity_text
         lv_price_text.

  CONDENSE: lv_country_text,
            lv_zip_text,
            lv_city_text,
            lv_quantity_text,
            lv_price_text.

  TRANSLATE lv_country_text TO UPPER CASE.
  TRANSLATE lv_city_text TO UPPER CASE.

  FIND FIRST OCCURRENCE OF 'ABC'
    IN lv_zip_text
    IGNORING CASE.

  IF sy-subrc = 0.
    lv_error = `Code postal invalide`.
  ENDIF.

  IF lv_error IS INITIAL.

    TRY.
        lv_quantity = CONV i( lv_quantity_text ).
        lv_price    = CONV #( lv_price_text ).

      CATCH cx_sy_conversion_no_number.
        lv_error = `Valeur non numérique`.

      CATCH cx_sy_conversion_overflow.
        lv_error = `Dépassement numérique`.
    ENDTRY.

  ENDIF.

  IF lv_error IS INITIAL.

    lv_amount = lv_quantity * lv_price.

    lv_price_output  = |{ lv_price DECIMALS = 2 }|.
    lv_amount_output = |{ lv_amount DECIMALS = 2 }|.

    REPLACE ALL OCCURRENCES OF '.'
      IN lv_price_output
      WITH ','.

    REPLACE ALL OCCURRENCES OF '.'
      IN lv_amount_output
      WITH ','.

    CONCATENATE
      'Pays :' lv_country_text
      '| Code postal :' lv_zip_text
      '| Ville :' lv_city_text
      '| Quantité :' lv_quantity_text
      '| Prix :' lv_price_output
      '| Montant :' lv_amount_output
      INTO lv_result
      SEPARATED BY space.

    WRITE: / 'Source  :', lv_source,
           / 'Résultat:', lv_result,
           /,
           / 'Pays        :', lv_country_text,
           / 'Code postal :', lv_zip_text,
           / 'Ville       :', lv_city_text,
           / 'Quantité    :', lv_quantity,
           / 'Prix        :', lv_price,
           / 'Montant     :', lv_amount.

  ELSE.

    MESSAGE lv_error TYPE 'S' DISPLAY LIKE 'E'.

  ENDIF.

  CLEAR: lv_country_text,
         lv_zip_text,
         lv_city_text,
         lv_quantity_text,
         lv_price_text,
         lv_quantity,
         lv_price,
         lv_amount,
         lv_price_output,
         lv_amount_output,
         lv_result,
         lv_error.
```

> [!NOTE]
> La représentation des séparateurs décimaux dépend des paramètres utilisateur SAP. Les valeurs numériques doivent rester numériques pour les calculs. Le remplacement du point par une virgule est effectué uniquement sur une copie destinée à l’affichage.

</details>
