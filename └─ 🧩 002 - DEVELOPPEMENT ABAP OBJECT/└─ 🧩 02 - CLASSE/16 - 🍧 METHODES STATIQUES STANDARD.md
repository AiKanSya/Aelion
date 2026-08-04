# 🌸 MÉTHODES STATIQUES DE CLASSES STANDARD

## 🌺 OBJECTIFS

- [ ] Appeler une méthode statique avec `=>`.
- [ ] Distinguer méthode statique et méthode d'instance.
- [ ] Traiter une exception déclarée.

```abap
TRY.
    DATA(lv_uuid) = cl_system_uuid=>create_uuid_c32_static( ).
  CATCH cx_uuid_error INTO DATA(lx_uuid).
    MESSAGE lx_uuid->get_text( ) TYPE 'E'.
ENDTRY.
```

`CL_SYSTEM_UUID` est une classe standard. `CREATE_UUID_C32_STATIC` s'appelle sans créer d'objet et renvoie une représentation sur 32 caractères. La documentation de `SE24` indique les paramètres et exceptions applicables dans le système.

## 🌺 EXEMPLE COMPARATIF

```abap
DATA(lo_random) = cl_abap_random_int=>create( seed = 123 min = 1 max = 100 ).
DATA(lv_value) = lo_random->get_next( ).
```

`CREATE` est ici statique (`=>`) et retourne une instance ; `GET_NEXT` est appelée sur cette instance (`->`).

## 🌺 EXERCICE

Générer cinq UUID, vérifier qu'ils ont la longueur attendue, puis expliquer pourquoi aucune instanciation de `CL_SYSTEM_UUID` n'est nécessaire.
