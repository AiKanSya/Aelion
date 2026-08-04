# 🌸 CONVERSION SÉCURISÉE D'UN TEXTE EN NOMBRE

## 🌺 OBJECTIFS

- [ ] Convertir un texte vers un type numérique sans provoquer de dump.
- [ ] Distinguer erreur de conversion, dépassement et règle métier.
- [ ] Conserver la valeur source pour produire un message précis.
- [ ] Continuer le traitement des autres lignes après une erreur locale.

## 🌺 RISQUE

Une valeur issue d'un fichier est du texte. Une affectation directe vers un nombre peut lever une exception lorsque la valeur contient des caractères interdits ou dépasse la capacité du type cible.

```abap
DATA lv_price_text TYPE string VALUE '19.95'.
DATA lv_price      TYPE p LENGTH 8 DECIMALS 2.
```

Trois contrôles sont différents :

1. le texte est-il convertible ?
2. la valeur tient-elle dans le type cible ?
3. la valeur respecte-t-elle la règle métier ?

## 🌺 CONVERSION AVEC `CONV`

```abap
TRY.
    DATA(lv_number) = CONV i( lv_text ).

  CATCH cx_sy_conversion_no_number INTO DATA(lx_no_number).
    " Texte non numérique.

  CATCH cx_sy_conversion_overflow INTO DATA(lx_overflow).
    " Valeur hors capacité du type cible.
ENDTRY.
```

Le bloc `CATCH` doit être placé au niveau où l'erreur peut être traitée utilement. Dans un import, l'erreur concerne généralement une ligne : elle est journalisée, la ligne est invalidée, puis la boucle continue.

## 🌺 CHOISIR LE TYPE CIBLE

| Type | Usage | Vigilance |
| --- | --- | --- |
| `i` | entier signé | plage limitée, aucune décimale |
| `p DECIMALS n` | valeur décimale | longueur et décimales explicites |
| `decfloat16` / `decfloat34` | calcul décimal étendu | règles d'arrondi à définir |
| Type DDIC métier | donnée SAP | préférer ce type lorsqu'il existe |

Le type doit correspondre à la donnée consommée ensuite. Pour un composant SAP, vérifier le type DDIC attendu avec `F1` ou `SE11` au lieu d'imposer un type générique.

## 🌺 RÈGLE MÉTIER APRÈS CONVERSION

```abap
TRY.
    DATA(lv_age) = CONV i( lv_age_text ).

    IF lv_age < 18.
      " Règle métier indépendante : âge minimal non atteint.
    ENDIF.

  CATCH cx_sy_conversion_no_number
        cx_sy_conversion_overflow INTO DATA(lx_conversion).
    " Erreur technique de représentation.
ENDTRY.
```

La valeur `17` est convertible : son éventuel rejet relève de la règle métier, pas du mécanisme de conversion.

## 🌺 TRAITEMENT DANS UNE BOUCLE

```abap
LOOP AT lt_candidates ASSIGNING FIELD-SYMBOL(<candidate>).
  TRY.
      <candidate>-age = CONV i( <candidate>-age_text ).

      IF <candidate>-age < 18.
        <candidate>-is_valid = abap_false.
      ENDIF.

    CATCH cx_sy_conversion_no_number
          cx_sy_conversion_overflow INTO DATA(lx_conversion).
      <candidate>-is_valid = abap_false.
  ENDTRY.
ENDLOOP.
```

## 🌺 CAS À TESTER

| Entrée | Résultat |
| --- | --- |
| `25` | conversion réussie, règle métier valide |
| `17` | conversion réussie, règle métier invalide |
| `0` | conversion réussie, puis contrôle métier |
| `ABC` | `CX_SY_CONVERSION_NO_NUMBER` |
| valeur trop grande | `CX_SY_CONVERSION_OVERFLOW` |
| chaîne vide | comportement à définir explicitement comme champ absent ou conversion invalide |

## 🌺 ERREURS FRÉQUENTES

- contrôler uniquement `CO '0123456789'` et oublier le signe ou les décimales ;
- utiliser une expression régulière comme seule preuve que la valeur tient dans le type cible ;
- capturer `CX_ROOT` et masquer la cause réelle ;
- remplacer la valeur source avant de journaliser l'erreur ;
- arrêter tout l'import pour une erreur locale.

## 🌺 EXERCICE

Écrire une méthode qui reçoit un âge sous forme de texte et retourne un entier ainsi qu'un indicateur de validité. Tester `25`, `17`, `ABC` et une valeur provoquant un dépassement.

## 🌺 SOURCES

- SAP SE, *Conversion from external to internal number format*, consultée le 4 août 2026 : https://help.sap.com/docs/btp/ABAP/3353526239.html
- SAP SE, *ABAP Keyword Documentation — Constructor Expressions*, consultée le 4 août 2026 : https://help.sap.com/doc/abapdocu_816_index_htm/8.16/en-US/ABENCONSTRUCTOR_EXPRESSIONS.html

## 🌺 RÉSUMÉ

> - Conversion technique et validation métier sont séparées.
> - `CX_SY_CONVERSION_NO_NUMBER` traite une représentation invalide.
> - `CX_SY_CONVERSION_OVERFLOW` traite une valeur hors capacité.
> - Une erreur locale doit être journalisée sans provoquer de dump.
