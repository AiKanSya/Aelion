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

## 🌺 DÉCOUPAGE À PLUSIEURS NIVEAUX

Un champ peut lui-même contenir plusieurs informations. Exemple neutre :

```text
NAME;LOCATION;LEVEL
Alice;FR|Lyon;2
Bruno;FR|Lille;1
```

```abap
DATA lv_name          TYPE string.
DATA lv_location      TYPE string.
DATA lv_level_text    TYPE string.
DATA lv_country       TYPE string.
DATA lv_city          TYPE string.

SPLIT lv_line AT ';' INTO
  lv_name
  lv_location
  lv_level_text.

SPLIT lv_location AT '|' INTO
  lv_country
  lv_city.
```

Le premier `SPLIT` sépare les colonnes principales. Le second ne concerne que la colonne composite `LOCATION`.

## 🌺 CONTRÔLER LA STRUCTURE

Lorsque le nombre de composants n'est pas garanti, découper d'abord dans une table :

```abap
DATA lt_columns TYPE STANDARD TABLE OF string WITH EMPTY KEY.

SPLIT lv_line AT ';' INTO TABLE lt_columns.

IF lines( lt_columns ) <> 3.
  " Ligne structurellement invalide.
  RETURN.
ENDIF.
```

Conserver `LV_LINE` jusqu'à la fin des contrôles permet de restituer la ligne d'origine dans un diagnostic. Après chaque découpage, vérifier les composants obligatoires avant de les convertir.

## 🌺 EXERCICE

Lire un fichier `CODE;SUPPLIER;PRICE` où `SUPPLIER` contient `COUNTRY|NAME`. Contrôler les trois colonnes principales, décomposer le fournisseur, convertir le prix et conserver la ligne source en cas d'erreur.

## 🌺 SOURCE

- SAP ABAP Keyword Documentation — `SPLIT`: https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/abapsplit.htm
