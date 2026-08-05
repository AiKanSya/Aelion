# 🌸 EXERCICES — NO STRING (NS)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- vérifier l’absence d’une sous-chaîne ;
- expliquer que `NS` est l’inverse logique de `CS` ;
- connaître le comportement sur la casse ;
- valider qu’un texte ne contient pas une séquence interdite ;
- éviter une condition négative difficile à lire.

## 🌺 DURÉE INDICATIVE

20 à 30 minutes.

## 🌺 CONTEXTE

Une description ne doit pas contenir le mot :

```text
TEST
```

## 🌺 EXERCICE 1 — ABSENCE

Tester :

```abap
DATA lv_description TYPE string
  VALUE `Commande productive`.
```

Utiliser `NS`.

## 🌺 EXERCICE 2 — CAS DE TEST

| Description           | `NS 'TEST'`                                                     |
| --------------------- | --------------------------------------------------------------- |
| `Commande productive` | Vrai                                                            |
| `Commande TEST`       | Faux                                                            |
| `Commande test`       | Faux                                                            |
| `test de commande`    | Faux                                                            |
| vide                  | Vrai techniquement, mais à contrôler séparément selon le besoin |

## 🌺 EXERCICE 3 — LOGIQUE POSITIVE OU NÉGATIVE

Comparer :

```abap
IF lv_description NS 'TEST'.
  WRITE / 'Description autorisée'.
ELSE.
  WRITE / 'Description interdite'.
ENDIF.
```

et :

```abap
IF lv_description CS 'TEST'.
  WRITE / 'Description interdite'.
ELSE.
  WRITE / 'Description autorisée'.
ENDIF.
```

Indiquer quelle version est la plus lisible lorsque le besoin principal consiste à détecter l’interdiction.

## 🌺 CRITÈRES DE VALIDATION

- [ ] `NS` est identifié comme l’inverse de `CS`.
- [ ] `test` est détecté comme `TEST`.
- [ ] Une chaîne vide est traitée selon la règle métier.
- [ ] La condition la plus lisible est privilégiée.
- [ ] Aucune confusion avec `NP` ne subsiste.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
DATA lv_description TYPE string
  VALUE `Commande productive`.

IF lv_description IS INITIAL.
  WRITE / 'Description non renseignée'.
ELSEIF lv_description NS 'TEST'.
  WRITE / 'Description autorisée'.
ELSE.
  WRITE / 'Description interdite'.
ENDIF.
```

Lorsque le besoin principal est de détecter un texte interdit, la formulation positive suivante peut être plus directe :

```abap
IF lv_description CS 'TEST'.
  WRITE / 'Description interdite'.
ELSE.
  WRITE / 'Description autorisée'.
ENDIF.
```

</details>
