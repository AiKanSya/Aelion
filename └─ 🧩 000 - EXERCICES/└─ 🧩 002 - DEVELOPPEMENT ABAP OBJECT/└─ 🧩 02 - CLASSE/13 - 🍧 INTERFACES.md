# 🌸 EXERCICES — INTERFACES GLOBALES

## 🌺 OBJECTIFS

- créer une interface globale ;
- définir un contrat ;
- l’implémenter dans plusieurs classes ;
- utiliser une référence d’interface ;
- obtenir un polymorphisme sans héritage commun métier.

## 🌺 DURÉE INDICATIVE

85 à 110 minutes.

## 🌺 INTERFACE

```text
ZIF_<TRI>_EXPORTER
```

Méthode :

```text
EXPORT
```

Importing :

```text
IT_LINES TYPE STRING_TABLE
```

Returning :

```text
RV_CONTENT TYPE STRING
```

Adapter le type `STRING_TABLE` à la version du système. Créer un type DDIC si nécessaire.

## 🌺 CLASSES

```text
ZCL_<TRI>_TEXT_EXPORTER
ZCL_<TRI>_CSV_EXPORTER
```

Les deux implémentent :

```text
ZIF_<TRI>_EXPORTER
```

## 🌺 EXERCICE 1 — IMPLÉMENTATION

Le nom technique de la méthode est :

```text
ZIF_<TRI>_EXPORTER~EXPORT
```

## 🌺 EXERCICE 2 — TEXTE

Assembler les lignes avec un saut de ligne.

## 🌺 EXERCICE 3 — CSV

Assembler les lignes avec :

```text
;
```

Pour un vrai CSV, gérer séparateur, guillemets, sauts de ligne et encodage. L’exercice reste volontairement simple.

## 🌺 EXERCICE 4 — RÉFÉRENCE D’INTERFACE

```abap
DATA lo_exporter TYPE REF TO zif_<tri>_exporter.

lo_exporter =
  NEW zcl_<tri>_text_exporter( ).

WRITE /
  lo_exporter->export(
    it_lines = lt_lines
  ).

lo_exporter =
  NEW zcl_<tri>_csv_exporter( ).

WRITE /
  lo_exporter->export(
    it_lines = lt_lines
  ).
```

## 🌺 EXERCICE 5 — ALIAS

Étudier l’utilisation d’un alias dans `SE24` pour simplifier un accès si nécessaire.

Ne pas masquer un conflit de nom sans comprendre le contrat.

## 🌺 EXERCICE 6 — INTERFACE OU CLASSE ABSTRAITE

| Besoin                                      | Choix possible   |
| ------------------------------------------- | ---------------- |
| Contrat sans état ni implémentation commune | Interface        |
| Code et état communs                        | Classe abstraite |
| Plusieurs contrats indépendants             | Interfaces       |
| Une seule relation d’héritage               | Classe           |
| Injection de dépendance                     | Interface        |

## 🌺 DIAGNOSTIC

Le report dépend directement de `ZCL_<TRI>_CSV_EXPORTER`.

Il devient impossible de remplacer l’exporteur sans modifier le report.

Corriger avec une référence d’interface.

## 🌺 CRITÈRES DE VALIDATION

- [ ] L’interface existe.
- [ ] Deux classes l’implémentent.
- [ ] Les deux méthodes sont codées.
- [ ] Une référence d’interface est utilisée.
- [ ] L’implémentation peut être remplacée.
- [ ] Interface et classe abstraite sont comparées.
- [ ] La dépendance concrète est corrigée.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
METHOD zif_<tri>_exporter~export.

  LOOP AT it_lines INTO DATA(lv_line).

    IF rv_content IS INITIAL.
      rv_content = lv_line.
    ELSE.
      rv_content =
        |{ rv_content }{ cl_abap_char_utilities=>newline }{ lv_line }|.
    ENDIF.

  ENDLOOP.

ENDMETHOD.
```

Une interface ne peut pas être instanciée. Elle est implémentée par des classes concrètes.

</details>
