# 🌸 EXERCICE 03 — PARAMETERS

## 🌺 OBJECTIFS

- déclarer des valeurs uniques ;
- utiliser le typage DDIC ;
- définir une valeur par défaut ;
- rendre un champ obligatoire ;
- utiliser `LOWER CASE`;
- créer une case à cocher ;
- créer des boutons radio ;
- utiliser un paramètre dans le traitement.

## 🌺 DURÉE INDICATIVE

60 à 75 minutes.

## 🌺 EXERCICE 1 — PARAMÈTRES SIMPLES

Déclarer :

```abap
PARAMETERS:
  p_name TYPE zt_<tri>_ord-customer_name LOWER CASE,
  p_max  TYPE i DEFAULT 100 OBLIGATORY.
```

Répondre :

1. combien de valeurs chaque paramètre contient-il ?
2. pourquoi `LOWER CASE` est-il utile pour un nom ?
3. `OBLIGATORY` valide-t-il la plage `1 à 500` ?
4. pourquoi le type DDIC est-il préférable pour le nom ?
5. le paramètre existe-t-il comme donnée globale du programme ?

## 🌺 EXERCICE 2 — CASE À COCHER

```abap
PARAMETERS p_detail AS CHECKBOX
  DEFAULT abap_false.
```

Utiliser :

```abap
IF p_detail = abap_true.
  " Afficher les colonnes techniques
ENDIF.
```

## 🌺 EXERCICE 3 — BOUTONS RADIO

```abap
PARAMETERS:
  p_alv  RADIOBUTTON GROUP out DEFAULT 'X',
  p_list RADIOBUTTON GROUP out.
```

Répondre :

1. combien d’options peuvent être actives ?
2. pourquoi définir une valeur par défaut ?
3. comment savoir quel mode a été choisi ?
4. faut-il comparer à `abap_true` ou à `'X'` ?
5. que se passe-t-il si les deux paramètres n’appartiennent pas au même groupe ?

## 🌺 EXERCICE 4 — PARAMÈTRE MASQUÉ

Déclarer :

```abap
PARAMETERS p_mode TYPE c LENGTH 1
  NO-DISPLAY
  DEFAULT 'D'.
```

Répondre :

1. le paramètre existe-t-il dans le programme ?
2. un champ apparaît-il à l’écran ?
3. une variante ou un `SUBMIT` peut-il transmettre une valeur selon l’interface ?
4. faut-il utiliser un champ masqué pour contourner une autorisation ?
5. quel risque existe avec une ancienne variante ?

## 🌺 EXERCICE 5 — VALIDATION

```abap
AT SELECTION-SCREEN ON p_max.

  IF p_max NOT BETWEEN 1 AND 500.
    MESSAGE 'Le maximum doit être compris entre 1 et 500'
      TYPE 'E'.
  ENDIF.
```

Tester :

```text
0
1
100
500
501
```

## 🌺 EXERCICE 6 — UTILISATION SQL

```abap
SELECT order_id,
       customer_name
  FROM zt_<tri>_ord
  ORDER BY order_id
  INTO TABLE @DATA(lt_orders)
  UP TO @p_max ROWS.
```

Selon la version ABAP, adapter la position ou la syntaxe de la limite avec l’aide F1 du système.

## 🌺 EXERCICE 7 — PARAMÈTRE FICHIER

Déclarer conceptuellement :

```abap
PARAMETERS p_file TYPE string LOWER CASE.
```

Répondre :

1. un chemin local est-il utilisable en arrière-plan ?
2. `CL_GUI_FRONTEND_SERVICES` nécessite-t-elle un frontend SAP GUI ?
3. faut-il prévoir un répertoire applicatif pour l’arrière-plan ?
4. le paramètre doit-il être obligatoire dans tous les modes ?
5. comment désactiver le champ lorsqu’un mode sans fichier est choisi ?

## 🌺 CRITÈRES DE VALIDATION

- [ ] Les paramètres simples sont déclarés.
- [ ] Le nom accepte les minuscules.
- [ ] Le maximum est obligatoire et validé.
- [ ] La case à cocher fonctionne.
- [ ] Un seul bouton radio est actif.
- [ ] Le paramètre masqué est compris.
- [ ] La limite est utilisée dans la lecture.
- [ ] La dépendance frontend est identifiée.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
PARAMETERS:
  p_name   TYPE zt_<tri>_ord-customer_name LOWER CASE,
  p_max    TYPE i DEFAULT 100 OBLIGATORY,
  p_detail AS CHECKBOX DEFAULT abap_false,
  p_alv    RADIOBUTTON GROUP out DEFAULT 'X',
  p_list   RADIOBUTTON GROUP out.
```

Validation :

```abap
AT SELECTION-SCREEN ON p_max.

  IF p_max NOT BETWEEN 1 AND 500.
    MESSAGE 'Le maximum doit être compris entre 1 et 500'
      TYPE 'E'.
  ENDIF.
```

</details>
