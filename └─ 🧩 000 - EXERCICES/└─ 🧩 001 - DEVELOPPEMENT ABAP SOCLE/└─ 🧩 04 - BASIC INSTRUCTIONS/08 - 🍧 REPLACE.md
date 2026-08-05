# 🌸 EXERCICES — REPLACE

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- remplacer la première occurrence ;
- remplacer toutes les occurrences ;
- récupérer le nombre de remplacements ;
- contrôler la casse ;
- vérifier qu’une source a réellement été modifiée.

## 🌺 DURÉE INDICATIVE

25 à 35 minutes.

## 🌺 EXERCICE 1 — PREMIÈRE OCCURRENCE

Déclarer :

```abap
DATA lv_text_first TYPE string
  VALUE `ABAP - ABAP - abap`.
```

Remplacer uniquement le premier `ABAP` par `SAP`.

Résultat attendu :

```text
SAP - ABAP - abap
```

## 🌺 EXERCICE 2 — TOUTES LES OCCURRENCES

Copier la source dans une autre variable.

Remplacer toutes les occurrences de `ABAP` par `SAP` en respectant la casse.

Résultat attendu :

```text
SAP - SAP - abap
```

Récupérer le nombre de remplacements.

## 🌺 EXERCICE 3 — IGNORING CASE

Remplacer toutes les variantes de casse par `SAP`.

Résultat attendu :

```text
SAP - SAP - SAP
```

## 🌺 EXERCICE 4 — MOTIF ABSENT

Rechercher et remplacer `JAVA`.

Afficher le nombre de remplacements.

Expliquer pourquoi le texte reste inchangé.

## 🌺 CRITÈRES DE VALIDATION

- [ ] La première occurrence seule est remplacée.
- [ ] Toutes les occurrences exactes sont remplacées.
- [ ] La variante en minuscules est conservée avec `RESPECTING CASE`.
- [ ] La variante en minuscules est remplacée avec `IGNORING CASE`.
- [ ] Le nombre de remplacements est contrôlé.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
DATA lv_source TYPE string
  VALUE `ABAP - ABAP - abap`.

DATA(lv_text_first) = lv_source.
DATA(lv_text_all)   = lv_source.
DATA(lv_text_case)  = lv_source.

REPLACE FIRST OCCURRENCE OF 'ABAP'
  IN lv_text_first
  WITH 'SAP'.

REPLACE ALL OCCURRENCES OF 'ABAP'
  IN lv_text_all
  WITH 'SAP'
  RESPECTING CASE
  REPLACEMENT COUNT DATA(lv_count_exact).

REPLACE ALL OCCURRENCES OF 'ABAP'
  IN lv_text_case
  WITH 'SAP'
  IGNORING CASE
  REPLACEMENT COUNT DATA(lv_count_all).

WRITE: / 'Première occurrence :', lv_text_first,
       / 'Toutes, même casse  :', lv_text_all,
       / 'Toutes, casse libre :', lv_text_case,
       / 'Nombre exact        :', lv_count_exact,
       / 'Nombre casse libre  :', lv_count_all.

REPLACE ALL OCCURRENCES OF 'JAVA'
  IN lv_text_case
  WITH 'SAP'
  REPLACEMENT COUNT DATA(lv_count_missing).

WRITE / |Remplacements JAVA : { lv_count_missing }|.
```

Résultats attendus :

```text
Nombre exact       : 2
Nombre casse libre : 3
Remplacements JAVA : 0
```

</details>
