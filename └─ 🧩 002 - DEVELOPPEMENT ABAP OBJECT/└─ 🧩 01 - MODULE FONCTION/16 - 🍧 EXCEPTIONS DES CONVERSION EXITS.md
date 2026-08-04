# 🌸 EXCEPTIONS DES CONVERSION EXITS

## 🌺 OBJECTIFS

- [ ] Lire les exceptions déclarées dans `SE37`.
- [ ] Mapper chaque exception utile dans `CALL FUNCTION`.
- [ ] Interpréter `SY-SUBRC` immédiatement après l'appel.

```abap
CALL FUNCTION 'CONVERSION_EXIT_CUNIT_INPUT'
  EXPORTING
    input          = lv_unit_external
    language       = sy-langu
  IMPORTING
    output         = lv_unit_internal
  EXCEPTIONS
    unit_not_found = 1
    OTHERS         = 2.

CASE sy-subrc.
  WHEN 0.
    " Conversion réussie.
  WHEN 1.
    " Unité non reconnue.
  WHEN OTHERS.
    " Autre erreur déclarée.
ENDCASE.
```

La liste d'exceptions n'est pas universelle : elle dépend du module. Certaines conversion exits ne déclarent aucune exception classique. `OTHERS` ne remplace pas la lecture de l'interface.

## 🌺 LISTE DE CONTRÔLE

1. ouvrir le module dans `SE37` ;
2. consulter l'onglet Exceptions ;
3. mapper les exceptions nécessaires ;
4. tester chaque code retour accessible ;
5. conserver la valeur externe pour produire un message compréhensible.
