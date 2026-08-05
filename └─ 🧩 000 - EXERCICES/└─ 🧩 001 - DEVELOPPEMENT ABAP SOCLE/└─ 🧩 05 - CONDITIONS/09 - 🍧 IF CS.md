# 🌸 EXERCICES — CONTAINS STRING (CS)

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [CONTAINS STRING (CS)](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 05 - CONDITIONS/09 - 🍧 IF CS.md>)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- rechercher une sous-chaîne complète ;
- distinguer sous-chaîne et ensemble de caractères ;
- connaître le comportement sur la casse ;
- distinguer `CS` de `FIND` ;
- utiliser `CS` pour un contrôle booléen simple.

## 🌺 DURÉE INDICATIVE

25 à 35 minutes.

## 🌺 EXERCICE 1 — RECHERCHE SIMPLE

Déclarer :

```abap
DATA lv_log TYPE string
  VALUE `Traitement terminé avec ERROR technique`.
```

Vérifier si le texte contient :

```text
error
```

Résultat attendu : vrai.

## 🌺 EXERCICE 2 — SÉQUENCE COMPLÈTE

Tester :

| Texte recherché | Résultat |
| --------------- | -------- |
| `terminé`       | Vrai     |
| `ERROR`         | Vrai     |
| `error`         | Vrai     |
| `tech`          | Vrai     |
| `erreur`        | Faux     |
| `EOR`           | Faux     |

Expliquer pourquoi `EOR` est faux même si les lettres existent séparément dans le texte.

## 🌺 EXERCICE 3 — CS OU FIND

Choisir :

| Besoin                                      | Instruction |
| ------------------------------------------- | ----------- |
| Savoir uniquement si une sous-chaîne existe |             |
| Obtenir l’offset exact                      |             |
| Compter toutes les occurrences              |             |
| Effectuer une recherche avancée             |             |

## 🌺 EXERCICE 4 — CONTRÔLE TROP LARGE

Analyser :

```abap
IF lv_log CA 'ERROR'.
  WRITE / 'Erreur détectée'.
ENDIF.
```

Pourquoi `CA` peut-il retourner vrai alors que le mot complet `ERROR` n’est pas présent ?

Corriger avec `CS`.

## 🌺 CRITÈRES DE VALIDATION

- [ ] `error` retrouve `ERROR`.
- [ ] La recherche porte sur une séquence complète.
- [ ] `CS` est distingué de `CA`.
- [ ] `FIND` est choisi pour une position ou un comptage.
- [ ] Le contrôle ne dépend pas incorrectement de la casse.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
DATA lv_log TYPE string
  VALUE `Traitement terminé avec ERROR technique`.

IF lv_log CS 'error'.
  WRITE / 'Erreur détectée'.
ELSE.
  WRITE / 'Aucune erreur détectée'.
ENDIF.
```

| Besoin                    | Choix                  |
| ------------------------- | ---------------------- |
| Présence booléenne simple | `CS`                   |
| Offset exact              | `FIND`                 |
| Nombre d’occurrences      | `FIND ALL OCCURRENCES` |
| Recherche avancée         | `FIND`                 |

`CA 'ERROR'` est vrai dès qu’un seul caractère parmi `E`, `R` ou `O` est trouvé. Il ne garantit pas la présence du mot complet.

</details>
