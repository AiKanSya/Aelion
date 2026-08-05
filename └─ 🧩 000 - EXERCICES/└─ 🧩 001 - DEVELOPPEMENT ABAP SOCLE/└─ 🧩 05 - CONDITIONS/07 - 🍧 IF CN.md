# 🌸 EXERCICES — CONTAINS NOT ONLY (CN)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- détecter au moins un caractère non autorisé ;
- expliquer que `CN` est l’inverse logique de `CO` ;
- récupérer l’offset du premier caractère invalide ;
- traiter séparément une chaîne vide ;
- éviter une interprétation incorrecte de `sy-fdpos`.

## 🌺 DURÉE INDICATIVE

25 à 35 minutes.

## 🌺 EXERCICE 1 — DÉTECTION

Réutiliser :

```abap
CONSTANTS lc_allowed_chars TYPE string
  VALUE `ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-`.
```

Écrire une condition `CN` qui affiche :

```text
Caractère non autorisé détecté
```

## 🌺 EXERCICE 2 — POSITION

Pour :

```abap
DATA lv_code TYPE string VALUE `ABAP_2026`.
```

Afficher l’offset du premier caractère absent de la liste autorisée.

## 🌺 EXERCICE 3 — CO OU CN

Compléter :

| Besoin                                       | Opérateur |
| -------------------------------------------- | --------- |
| Accepter uniquement les caractères autorisés |           |
| Détecter au moins un caractère interdit      |           |
| Traiter le cas nominal dans le bloc `IF`     |           |
| Traiter l’erreur dans le bloc `IF`           |           |

## 🌺 EXERCICE 4 — CHAÎNE VIDE

Tester une chaîne vide avec `CN`.

Expliquer pourquoi une validation métier doit commencer par `IS INITIAL` ou `IS NOT INITIAL`, indépendamment du résultat logique de `CO` ou `CN`.

## 🌺 CRITÈRES DE VALIDATION

- [ ] `CN` détecte `_`.
- [ ] L’offset vaut `4`.
- [ ] `CN` est identifié comme l’inverse de `CO`.
- [ ] `sy-fdpos` n’est pas décrit comme la position du dernier caractère valide.
- [ ] Le vide est traité explicitement.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
CONSTANTS lc_allowed_chars TYPE string
  VALUE `ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-`.

DATA lv_code TYPE string VALUE `ABAP_2026`.

IF lv_code IS INITIAL.
  WRITE / 'Code invalide : valeur vide'.
ELSEIF lv_code CN lc_allowed_chars.
  DATA(lv_invalid_offset) = sy-fdpos.

  WRITE: / 'Caractère non autorisé détecté',
         / |Offset : { lv_invalid_offset }|.
ELSE.
  WRITE / 'Code valide'.
ENDIF.
```

| Besoin                                       | Opérateur |
| -------------------------------------------- | --------- |
| Accepter uniquement les caractères autorisés | `CO`      |
| Détecter au moins un caractère interdit      | `CN`      |
| Cas nominal dans `IF`                        | `CO`      |
| Erreur dans `IF`                             | `CN`      |

</details>
