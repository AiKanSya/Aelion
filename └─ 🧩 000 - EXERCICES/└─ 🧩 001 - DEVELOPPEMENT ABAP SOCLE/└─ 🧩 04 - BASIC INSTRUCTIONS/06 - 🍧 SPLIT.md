# 🌸 EXERCICES — SPLIT

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [SPLIT](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 04 - BASIC INSTRUCTIONS/06 - 🍧 SPLIT.md>)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- découper une chaîne selon un séparateur ;
- stocker les segments dans plusieurs variables ;
- stocker les segments dans une table interne ;
- identifier un séparateur incorrect ;
- contrôler le nombre de segments obtenus.

## 🌺 DURÉE INDICATIVE

30 à 40 minutes.

## 🌺 EXERCICE 1 — DÉCOUPAGE FIXE

À partir de :

```abap
DATA lv_record TYPE string VALUE `FR;75001;PARIS`.
```

Extraire :

- le pays ;
- le code postal ;
- la ville.

Utiliser trois variables de type `string`.

## 🌺 EXERCICE 2 — TABLE INTERNE

À partir de :

```abap
DATA lv_skills TYPE string
  VALUE `ABAP;UI5;CPI;ODATA`.
```

Découper la chaîne dans une table interne déclarée inline :

```abap
SPLIT lv_skills AT ';' INTO TABLE DATA(lt_skills).
```

Afficher chaque compétence avec une boucle.

## 🌺 EXERCICE 3 — SÉPARATEUR ABSENT

Tester :

```abap
DATA lv_invalid_record TYPE string VALUE `FR-75001-PARIS`.

SPLIT lv_invalid_record AT ';'
  INTO DATA(lv_country)
       DATA(lv_zip)
       DATA(lv_city).
```

Relever le contenu des trois variables.

Expliquer pourquoi le découpage ne produit pas les trois valeurs attendues.

## 🌺 EXERCICE 4 — CONTRÔLE DU NOMBRE DE SEGMENTS

Après le découpage dans `lt_skills`, vérifier :

```abap
lines( lt_skills )
```

Le nombre attendu est `4`.

Afficher un message explicite si le nombre est différent.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Les trois segments sont correctement extraits.
- [ ] La table contient quatre lignes.
- [ ] Chaque compétence est affichée.
- [ ] Le séparateur incorrect est diagnostiqué.
- [ ] Le nombre de segments est contrôlé.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — variables

```abap
DATA lv_record TYPE string VALUE `FR;75001;PARIS`.

SPLIT lv_record AT ';'
  INTO DATA(lv_country)
       DATA(lv_zip)
       DATA(lv_city).

WRITE: / 'Pays        :', lv_country,
       / 'Code postal :', lv_zip,
       / 'Ville       :', lv_city.
```

### Solution — table interne

```abap
DATA lv_skills TYPE string
  VALUE `ABAP;UI5;CPI;ODATA`.

SPLIT lv_skills AT ';' INTO TABLE DATA(lt_skills).

LOOP AT lt_skills INTO DATA(lv_skill).
  WRITE / lv_skill.
ENDLOOP.

IF lines( lt_skills ) <> 4.
  WRITE / 'Nombre de compétences incorrect'.
ENDIF.
```

### Solution — séparateur absent

Le séparateur `;` n’existe pas dans la source. La chaîne n’est donc pas découpée comme attendu.

Correction :

```abap
SPLIT lv_invalid_record AT '-'
  INTO lv_country
       lv_zip
       lv_city.
```

</details>
