# 🌸 DÉCOUPAGE D'UN FICHIER DÉLIMITÉ

## 🌺 OBJECTIFS

- [ ] Ignorer une ligne d'en-tête.
- [ ] Découper une ligne avec `SPLIT`.
- [ ] Conserver le numéro physique de ligne.

Exemple de fichier neutre :

```text
NAME;CITY;LEVEL
Alice;Lyon;2
Bruno;Lille;1
```

```abap
LOOP AT lt_lines INTO DATA(lv_line).
  DATA(lv_line_no) = sy-tabix.

  IF lv_line_no = 1.
    CONTINUE.
  ENDIF.

  SPLIT lv_line AT ';' INTO
    DATA(lv_name)
    DATA(lv_city)
    DATA(lv_level_text).
ENDLOOP.
```

`SPLIT` n'est pas un parseur CSV universel : guillemets, séparateurs contenus dans les valeurs et retours à la ligne demandent une stratégie adaptée. Le contrat du fichier détermine les contrôles nécessaires.

## 🌺 EXERCICE

Lire un fichier `CODE;LABEL;PRICE`, convertir le prix et signaler les lignes non convertibles.

## 🌺 SOURCE

- SAP ABAP Keyword Documentation — `SPLIT`: https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/abapsplit.htm
