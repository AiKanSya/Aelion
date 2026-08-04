# 🌸 VALIDATION D'UNE DATE PAR MODULE FONCTION

## 🌺 OBJECTIFS

- [ ] Distinguer format textuel et validité calendaire.
- [ ] Lire l'interface d'un module standard dans `SE37`.
- [ ] Traiter son exception classique.

```abap
DATA lv_date_text TYPE string VALUE '20260229'.

IF strlen( lv_date_text ) <> 8 OR lv_date_text CN '0123456789'.
  " Format incorrect.
  RETURN.
ENDIF.

DATA(lv_date) = CONV d( lv_date_text ).

CALL FUNCTION 'DATE_CHECK_PLAUSIBILITY'
  EXPORTING
    date                      = lv_date
  EXCEPTIONS
    plausibility_check_failed = 1
    OTHERS                    = 2.
```

Une chaîne de huit chiffres peut représenter une date impossible. Le test de format et le contrôle calendaire répondent à deux questions différentes. Vérifier la disponibilité et la signature du module dans le système cible.

## 🌺 EXERCICE

Tester une date valide, une année non bissextile, un mois inexistant, une chaîne trop courte et une chaîne alphabétique.
