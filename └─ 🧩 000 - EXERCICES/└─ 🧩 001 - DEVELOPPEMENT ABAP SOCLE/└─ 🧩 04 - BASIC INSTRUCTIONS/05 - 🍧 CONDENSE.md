# 🌸 EXERCICES — CONDENSE

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [CONDENSE](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 04 - BASIC INSTRUCTIONS/05 - 🍧 CONDENSE.md>)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- supprimer les espaces de début et de fin ;
- réduire plusieurs espaces internes à un seul ;
- supprimer tous les espaces avec `NO-GAPS` ;
- préserver la valeur originale avant transformation ;
- choisir la variante adaptée au besoin.

## 🌺 DURÉE INDICATIVE

20 à 30 minutes.

## 🌺 EXERCICE 1 — NETTOYAGE STANDARD

Déclarer :

```abap
DATA lv_source TYPE string
  VALUE `   SAP     ABAP    Formation   `.
```

Copier la valeur dans `lv_condensed`, puis appliquer :

```abap
CONDENSE lv_condensed.
```

Résultat attendu :

```text
SAP ABAP Formation
```

## 🌺 EXERCICE 2 — NO-GAPS

Copier à nouveau la source dans `lv_no_gaps`, puis appliquer :

```abap
CONDENSE lv_no_gaps NO-GAPS.
```

Résultat attendu :

```text
SAPABAPFormation
```

## 🌺 EXERCICE 3 — CHOIX DE LA VARIANTE

Indiquer la variante correcte :

| Besoin                                                           | Variante |
| ---------------------------------------------------------------- | -------- |
| Nettoyer un nom saisi avec plusieurs espaces                     |          |
| Construire une clé sans aucun espace                             |          |
| Conserver exactement les espacements d’un fichier à largeur fixe |          |

## 🌺 EXERCICE 4 — DIAGNOSTIC

Analyser :

```abap
CONDENSE lv_source NO-GAPS.
WRITE / lv_source.
```

Pourquoi est-il impossible d’afficher ensuite la valeur originale avec les espaces initiaux ?

Corriger en conservant la source.

## 🌺 CRITÈRES DE VALIDATION

- [ ] La source est conservée.
- [ ] `CONDENSE` garde un espace entre les mots.
- [ ] `NO-GAPS` retire tous les espaces.
- [ ] La variante est choisie selon le besoin.
- [ ] La transformation en place est comprise.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
DATA lv_source TYPE string
  VALUE `   SAP     ABAP    Formation   `.

DATA(lv_condensed) = lv_source.
DATA(lv_no_gaps)   = lv_source.

CONDENSE lv_condensed.
CONDENSE lv_no_gaps NO-GAPS.

WRITE: / 'Source      :', lv_source,
       / 'CONDENSE    :', lv_condensed,
       / 'NO-GAPS     :', lv_no_gaps.
```

| Besoin                         | Variante                    |
| ------------------------------ | --------------------------- |
| Nettoyer un nom                | `CONDENSE`                  |
| Construire une clé sans espace | `CONDENSE ... NO-GAPS`      |
| Conserver un format fixe       | Ne pas appliquer `CONDENSE` |

`CONDENSE` modifie directement la variable fournie. Une copie préalable est nécessaire lorsque la source doit être conservée.

</details>
