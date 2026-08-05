# 🌸 EXERCICES — FIND

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [FIND](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 04 - BASIC INSTRUCTIONS/07 - 🍧 FIND.md>)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- rechercher une occurrence ;
- ignorer ou respecter la casse ;
- récupérer la position et la longueur du premier résultat ;
- compter toutes les occurrences ;
- utiliser `sy-subrc` pour distinguer trouvé et non trouvé.

## 🌺 DURÉE INDICATIVE

30 à 40 minutes.

## 🌺 EXERCICE 1 — PREMIÈRE OCCURRENCE

Déclarer :

```abap
DATA lv_text TYPE string
  VALUE `Formation ABAP : ABAP, UI5 et CPI`.
```

Rechercher la première occurrence de `ABAP` et récupérer :

- son offset ;
- sa longueur.

## 🌺 EXERCICE 2 — NOMBRE D’OCCURRENCES

Compter toutes les occurrences de `ABAP`.

Résultat attendu :

```text
2
```

## 🌺 EXERCICE 3 — CASSE

Rechercher `abap` :

1. avec `RESPECTING CASE` ;
2. avec `IGNORING CASE`.

Comparer les résultats.

## 🌺 EXERCICE 4 — VALEUR ABSENTE

Rechercher `JAVA`.

Utiliser `sy-subrc` immédiatement après `FIND` pour afficher :

```text
Motif absent
```

> [!IMPORTANT]
> `sy-subrc` doit être contrôlé immédiatement après l’instruction concernée. Une autre instruction peut modifier sa valeur.

## 🌺 CRITÈRES DE VALIDATION

- [ ] La première position est récupérée.
- [ ] La longueur trouvée est récupérée.
- [ ] Le nombre total vaut deux.
- [ ] La différence de casse est expliquée.
- [ ] L’absence du motif est gérée.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
DATA lv_text TYPE string
  VALUE `Formation ABAP : ABAP, UI5 et CPI`.

FIND FIRST OCCURRENCE OF 'ABAP'
  IN lv_text
  MATCH OFFSET DATA(lv_offset)
  MATCH LENGTH DATA(lv_length).

IF sy-subrc = 0.
  WRITE: / 'Premier offset :', lv_offset,
         / 'Longueur       :', lv_length.
ELSE.
  WRITE / 'Motif absent'.
ENDIF.

FIND ALL OCCURRENCES OF 'ABAP'
  IN lv_text
  MATCH COUNT DATA(lv_count).

WRITE / |Nombre d'occurrences : { lv_count }|.

FIND FIRST OCCURRENCE OF 'abap'
  IN lv_text
  RESPECTING CASE.

WRITE / |RESPECTING CASE - sy-subrc : { sy-subrc }|.

FIND FIRST OCCURRENCE OF 'abap'
  IN lv_text
  IGNORING CASE.

WRITE / |IGNORING CASE - sy-subrc : { sy-subrc }|.

FIND FIRST OCCURRENCE OF 'JAVA' IN lv_text.

IF sy-subrc <> 0.
  WRITE / 'Motif absent'.
ENDIF.
```

Le premier `ABAP` commence après le texte `Formation `, soit à l’offset `10`. Sa longueur est `4`.

</details>
