# 🌸 SÉLECTION D'UN FICHIER LOCAL

## 🌺 OBJECTIFS

- [ ] Déclencher une aide à la saisie pour un chemin local.
- [ ] Lire la table de fichiers retournée.
- [ ] Distinguer annulation et erreur technique.

```abap
PARAMETERS p_file TYPE string LOWER CASE.

AT SELECTION-SCREEN ON VALUE-REQUEST FOR p_file.
  DATA lt_files TYPE filetable.
  DATA lv_rc    TYPE i.

  cl_gui_frontend_services=>file_open_dialog(
    CHANGING
      file_table = lt_files
      rc         = lv_rc
    EXCEPTIONS
      OTHERS     = 1 ).

  IF sy-subrc = 0 AND lv_rc > 0.
    p_file = lt_files[ 1 ]-filename.
  ENDIF.
```

`RC = 0` signifie qu'aucun fichier n'a été retenu. Les exceptions exactes doivent être consultées dans `SE24` sur le système utilisé.

## 🌺 EXERCICE

Créer un report permettant de sélectionner un fichier texte, puis afficher uniquement le chemin choisi.

## 🌺 SOURCE

- Documentation de `CL_GUI_FRONTEND_SERVICES=>FILE_OPEN_DIALOG` dans `SE24` sur le système SAP utilisé.
