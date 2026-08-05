# 🌸 EXERCICE 09 — AIDE F4 PERSONNALISÉE

## 🌺 OBJECTIFS

- utiliser `ON VALUE-REQUEST`;
- préparer une liste interne ;
- appeler `F4IF_INT_TABLE_VALUE_REQUEST`;
- retourner la bonne valeur ;
- gérer une liste vide ;
- distinguer paramètres et select-options.

## 🌺 DURÉE INDICATIVE

65 à 80 minutes.

## 🌺 PARAMÈTRE

```abap
PARAMETERS p_status TYPE zt_<tri>_ord-status.
```

## 🌺 TYPE D’AIDE

```abap
TYPES: BEGIN OF ty_status_help,
         status      TYPE zt_<tri>_stat-status,
         status_text TYPE zt_<tri>_stat-status_text,
       END OF ty_status_help.
```

## 🌺 ÉVÉNEMENT

```abap
AT SELECTION-SCREEN ON VALUE-REQUEST FOR p_status.

  PERFORM request_status_value.
```

## 🌺 EXERCICE 1 — LECTURE

Lire :

```abap
SELECT status,
       status_text
  FROM zt_<tri>_stat
  ORDER BY status
  INTO TABLE @DATA(lt_status_help).
```

## 🌺 EXERCICE 2 — APPEL F4

```abap
CALL FUNCTION 'F4IF_INT_TABLE_VALUE_REQUEST'
  EXPORTING
    retfield        = 'STATUS'
    dynpprog        = sy-repid
    dynpnr          = sy-dynnr
    dynprofield     = 'P_STATUS'
    value_org       = 'S'
  TABLES
    value_tab       = lt_status_help
  EXCEPTIONS
    parameter_error = 1
    no_values_found = 2
    OTHERS          = 3.
```

## 🌺 EXERCICE 3 — RETOUR

Vérifier :

- affichage du code ;
- affichage du texte ;
- retour du code dans `P_STATUS`;
- fermeture sans sélection ;
- absence de dump.

## 🌺 EXERCICE 4 — LISTE VIDE

Si `lt_status_help` est vide :

```text
ne pas appeler l’aide ;
afficher un message informatif autorisé ;
laisser l’écran utilisable.
```

## 🌺 EXERCICE 5 — SELECT-OPTIONS

Pour :

```abap
SELECT-OPTIONS s_stat FOR gv_status.
```

Les événements sont distincts :

```abap
AT SELECTION-SCREEN ON VALUE-REQUEST FOR s_stat-low.
AT SELECTION-SCREEN ON VALUE-REQUEST FOR s_stat-high.
```

Créer une aide sur `LOW`.

Ne pas supposer qu’elle s’applique automatiquement à `HIGH`.

## 🌺 EXERCICE 6 — SEARCH HELP OU CODE

Comparer :

| Besoin                                     | Solution                             |
| ------------------------------------------ | ------------------------------------ |
| Aide réutilisable par plusieurs programmes | Search help DDIC                     |
| Liste locale propre à un report            | F4 personnalisée                     |
| Valeurs fixes simples                      | Domaine DDIC                         |
| Aide avec autorisations complexes          | Service ou search help contrôlée     |
| Données très volumineuses                  | Aide filtrée, pas chargement complet |

## 🌺 EXERCICE 7 — CAS INCORRECT

Analyser :

```abap
AT SELECTION-SCREEN ON VALUE-REQUEST FOR p_status.

  SELECT *
    FROM zt_<tri>_ord
    INTO TABLE @DATA(lt_all_orders).
```

Diagnostiquer :

- source incorrecte ;
- données excessives ;
- colonnes inutiles ;
- risque de performance ;
- risque de confidentialité.

## 🌺 CRITÈRES DE VALIDATION

- [ ] L’événement est déclenché par F4.
- [ ] Deux colonnes sont lues.
- [ ] Le code est retourné.
- [ ] La liste vide est gérée.
- [ ] `LOW` et `HIGH` sont distingués.
- [ ] Search help et aide locale sont comparées.
- [ ] Aucune lecture excessive n’est réalisée.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
FORM request_status_value.

  TYPES: BEGIN OF ty_status_help,
           status      TYPE zt_<tri>_stat-status,
           status_text TYPE zt_<tri>_stat-status_text,
         END OF ty_status_help.

  DATA lt_status_help TYPE STANDARD TABLE OF ty_status_help
    WITH EMPTY KEY.

  SELECT status,
         status_text
    FROM zt_<tri>_stat
    ORDER BY status
    INTO TABLE @lt_status_help.

  IF lt_status_help IS INITIAL.
    MESSAGE 'Aucun statut disponible'
      TYPE 'S'.
    RETURN.
  ENDIF.

  CALL FUNCTION 'F4IF_INT_TABLE_VALUE_REQUEST'
    EXPORTING
      retfield        = 'STATUS'
      dynpprog        = sy-repid
      dynpnr          = sy-dynnr
      dynprofield     = 'P_STATUS'
      value_org       = 'S'
    TABLES
      value_tab       = lt_status_help
    EXCEPTIONS
      parameter_error = 1
      no_values_found = 2
      OTHERS          = 3.

  IF sy-subrc <> 0.
    MESSAGE 'Aide à la recherche indisponible'
      TYPE 'S'.
  ENDIF.

ENDFORM.
```

</details>
