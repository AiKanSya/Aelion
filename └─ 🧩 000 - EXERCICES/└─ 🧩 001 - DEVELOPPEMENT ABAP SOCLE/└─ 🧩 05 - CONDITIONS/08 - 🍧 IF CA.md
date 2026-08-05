# 🌸 EXERCICES — CONTAINS ANY (CA)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- vérifier la présence d’au moins un caractère d’un ensemble ;
- récupérer l’offset du premier caractère trouvé ;
- distinguer `CA` de `CS` ;
- appliquer plusieurs contrôles à une même chaîne ;
- reconnaître la sensibilité à la casse.

## 🌺 DURÉE INDICATIVE

25 à 35 minutes.

## 🌺 CONTEXTE

Un mot de passe pédagogique doit contenir :

- au moins un chiffre ;
- au moins une lettre majuscule.

La vérification ne constitue pas une politique de sécurité complète.

## 🌺 EXERCICE 1 — PRÉSENCE D’UN CHIFFRE

Déclarer :

```abap
CONSTANTS lc_digits TYPE string VALUE `0123456789`.
DATA lv_password TYPE string VALUE `Abap2026`.
```

Utiliser `CA` pour détecter au moins un chiffre.

Sauvegarder l’offset du premier chiffre.

## 🌺 EXERCICE 2 — PRÉSENCE D’UNE MAJUSCULE

Déclarer :

```abap
CONSTANTS lc_uppercase TYPE string
  VALUE `ABCDEFGHIJKLMNOPQRSTUVWXYZ`.
```

Vérifier qu’au moins une majuscule est présente.

## 🌺 EXERCICE 3 — CAS DE TEST

| Mot de passe | Chiffre | Majuscule | Résultat |
| ------------ | ------- | --------- | -------- |
| `Abap2026`   | Oui     | Oui       | Valide   |
| `abap2026`   | Oui     | Non       | Invalide |
| `Abap`       | Non     | Oui       | Invalide |
| `ABAP1`      | Oui     | Oui       | Valide   |
| vide         | Non     | Non       | Invalide |

## 🌺 EXERCICE 4 — CA OU CS

Pour la chaîne :

```text
FORMATION
```

Comparer :

```abap
lv_text CA 'MAT'
```

et :

```abap
lv_text CS 'MAT'
```

Expliquer :

- `CA` recherche au moins un caractère commun ;
- `CS` recherche la séquence complète.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le premier chiffre de `Abap2026` est trouvé à l’offset `4`.
- [ ] La majuscule `A` est trouvée.
- [ ] Les deux conditions sont nécessaires.
- [ ] La chaîne vide est refusée.
- [ ] `CA` est distingué de `CS`.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
CONSTANTS:
  lc_digits    TYPE string VALUE `0123456789`,
  lc_uppercase TYPE string VALUE `ABCDEFGHIJKLMNOPQRSTUVWXYZ`.

DATA lv_password TYPE string VALUE `Abap2026`.
DATA lv_has_digit TYPE abap_bool.
DATA lv_has_upper TYPE abap_bool.

CLEAR: lv_has_digit,
       lv_has_upper.

IF lv_password CA lc_digits.
  lv_has_digit = abap_true.
  DATA(lv_digit_offset) = sy-fdpos.
ENDIF.

IF lv_password CA lc_uppercase.
  lv_has_upper = abap_true.
  DATA(lv_upper_offset) = sy-fdpos.
ENDIF.

IF lv_password IS NOT INITIAL
   AND lv_has_digit EQ abap_true
   AND lv_has_upper EQ abap_true.

  WRITE: / 'Mot de passe valide',
         / |Premier chiffre à l'offset { lv_digit_offset }|,
         / |Première majuscule à l'offset { lv_upper_offset }|.
ELSE.
  WRITE / 'Mot de passe invalide'.
ENDIF.
```

Pour `FORMATION` :

- `CA 'MAT'` est vrai dès qu’un caractère commun est trouvé ;
- `CS 'MAT'` est vrai uniquement si la séquence `MAT` existe dans cet ordre et sans interruption.

</details>
