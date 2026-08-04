# 🌸 LECTURE D'UN FICHIER LOCAL

## 🌺 OBJECTIFS

- [ ] Charger un fichier texte dans une table interne.
- [ ] Comprendre la dépendance au frontend SAP GUI.
- [ ] Traiter les exceptions sans dump.

```abap
DATA lt_lines TYPE STANDARD TABLE OF string WITH EMPTY KEY.

cl_gui_frontend_services=>gui_upload(
  EXPORTING
    filename = p_file
    filetype = 'ASC'
  CHANGING
    data_tab = lt_lines
  EXCEPTIONS
    file_open_error         = 1
    file_read_error         = 2
    no_batch                = 3
    gui_refuse_filetransfer = 4
    OTHERS                  = 5 ).

IF sy-subrc <> 0.
  MESSAGE 'Lecture impossible' TYPE 'E'.
ENDIF.
```

`GUI_UPLOAD` lit un fichier du poste utilisateur. Il n'est pas adapté à une exécution sans frontend. Vérifier la signature complète dans `SE24`.

## 🌺 EXERCICE

Charger un fichier contenant un prénom par ligne et afficher le nombre de lignes lues.

## 🌺 SOURCE

- Documentation de `CL_GUI_FRONTEND_SERVICES=>GUI_UPLOAD` dans `SE24` sur le système SAP utilisé.
