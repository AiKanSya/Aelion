# 🌸 CONVERSION EXITS

## 🌺 OBJECTIFS

- [ ] Distinguer format externe et format interne SAP.
- [ ] Utiliser `ALPHA_INPUT` et `MATN1_INPUT`.
- [ ] Identifier la routine associée à un champ DDIC.

Une conversion exit est une routine associée à un domaine DDIC. La variante `INPUT` convertit une saisie externe vers le format interne ; `OUTPUT` effectue l'opération inverse.

```abap
DATA lv_partner_external TYPE string VALUE '4711'.
DATA lv_partner_internal TYPE kunnr.

CALL FUNCTION 'CONVERSION_EXIT_ALPHA_INPUT'
  EXPORTING
    input  = lv_partner_external
  IMPORTING
    output = lv_partner_internal.
```

```abap
DATA lv_material_external TYPE string VALUE 'DEMO-100'.
DATA lv_material_internal TYPE matnr.

CALL FUNCTION 'CONVERSION_EXIT_MATN1_INPUT'
  EXPORTING
    input  = lv_material_external
  IMPORTING
    output = lv_material_internal.
```

Ne pas appliquer `ALPHA` ou `MATN1` en fonction du seul nom d'une variable. Vérifier le composant DDIC avec `F1`, son élément de données et son domaine dans `SE11`.

## 🌺 AUTRES CONVERSIONS

La routine d'un domaine permet de déduire les modules `CONVERSION_EXIT_<ROUTINE>_INPUT` et `..._OUTPUT`. Leur disponibilité, leur interface et leur comportement se vérifient dans `SE37`.

## 🌺 EXERCICE

Rechercher la conversion exit de trois champs DDIC de votre choix, puis comparer leur valeur externe et leur valeur interne.
