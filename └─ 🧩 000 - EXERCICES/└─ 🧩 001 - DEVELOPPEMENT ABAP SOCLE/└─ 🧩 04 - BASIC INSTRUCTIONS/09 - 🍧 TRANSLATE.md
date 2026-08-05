# 🌸 EXERCICES — TRANSLATE

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [TRANSLATE](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 04 - BASIC INSTRUCTIONS/09 - 🍧 TRANSLATE.md>)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- convertir un texte en majuscules ;
- convertir un texte en minuscules ;
- appliquer une table de remplacement simple avec `USING` ;
- comprendre que l’instruction modifie la variable cible.

## 🌺 DURÉE INDICATIVE

20 à 30 minutes.

## 🌺 EXERCICE 1 — MAJUSCULES

À partir de :

```abap
DATA lv_city_upper TYPE string VALUE `PaRiS`.
```

Obtenir :

```text
PARIS
```

## 🌺 EXERCICE 2 — MINUSCULES

À partir de :

```abap
DATA lv_city_lower TYPE string VALUE `PaRiS`.
```

Obtenir :

```text
paris
```

## 🌺 EXERCICE 3 — MASQUE

Déclarer :

```abap
DATA lv_masked TYPE string VALUE `ABab`.
```

Appliquer :

```abap
TRANSLATE lv_masked USING 'ABBAabba'.
```

Déterminer le résultat.

Le masque représente les couples :

```text
A → B
B → A
a → b
b → a
```

## 🌺 EXERCICE 4 — DIAGNOSTIC

Analyser :

```abap
TRANSLATE lv_city_upper TO UPPER CASE.
TRANSLATE lv_city_upper TO LOWER CASE.
```

Quelle casse reste dans la variable après les deux instructions ?

Comment conserver simultanément les deux versions ?

## 🌺 CRITÈRES DE VALIDATION

- [ ] La version en majuscules est correcte.
- [ ] La version en minuscules est correcte.
- [ ] Le masque est interprété par couples.
- [ ] La transformation en place est comprise.
- [ ] La source est copiée lorsque plusieurs variantes sont nécessaires.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
DATA lv_source TYPE string VALUE `PaRiS`.
DATA(lv_city_upper) = lv_source.
DATA(lv_city_lower) = lv_source.
DATA lv_masked TYPE string VALUE `ABab`.

TRANSLATE lv_city_upper TO UPPER CASE.
TRANSLATE lv_city_lower TO LOWER CASE.
TRANSLATE lv_masked USING 'ABBAabba'.

WRITE: / 'Majuscules :', lv_city_upper,
       / 'Minuscules :', lv_city_lower,
       / 'Masque     :', lv_masked.
```

Résultat du masque :

```text
BAba
```

Après une conversion en majuscules suivie d’une conversion en minuscules sur la même variable, seule la dernière version subsiste.

</details>
