# 🌸 EXERCICES — CONTAINS ONLY (CO)

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [CONTAINS ONLY (CO)](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 05 - CONDITIONS/06 - 🍧 IF CO.md>)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- vérifier qu’une chaîne ne contient que des caractères autorisés ;
- prendre en compte la casse ;
- contrôler une chaîne vide séparément ;
- utiliser `sy-fdpos` pour localiser un caractère invalide ;
- distinguer validation d’alphabet et validation de format.

## 🌺 DURÉE INDICATIVE

30 à 40 minutes.

## 🌺 CONTEXTE

Un code métier peut contenir uniquement :

```text
A à Z
0 à 9
tiret
```

## 🌺 EXERCICE 1 — VALIDATION

Déclarer :

```abap
CONSTANTS lc_allowed_chars TYPE string
  VALUE `ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-`.

DATA lv_code TYPE string VALUE `ABAP-2026`.
```

Règles :

1. une chaîne vide est invalide ;
2. une chaîne non vide est valide uniquement si elle contient exclusivement les caractères autorisés.

## 🌺 EXERCICE 2 — CAS DE TEST

Tester :

| Valeur      | Résultat attendu |
| ----------- | ---------------- |
| `ABAP-2026` | Valide           |
| `ABAP_2026` | Invalide         |
| `abap-2026` | Invalide         |
| `2026`      | Valide           |
| vide        | Invalide         |

## 🌺 EXERCICE 3 — POSITION INVALIDE

Pour `ABAP_2026`, sauvegarder `sy-fdpos` immédiatement après le test `CO`.

Afficher :

```text
Caractère invalide à l'offset 4
```

Rappeler que `_` est le cinquième caractère mais se trouve à l’offset `4`.

## 🌺 EXERCICE 4 — LIMITE DE CO

Le code doit maintenant respecter précisément le format :

```text
ABC-1234
```

Répondre :

1. `CO` peut-il vérifier que le tiret se trouve obligatoirement à l’offset `3` ?
2. `CO` peut-il vérifier qu’il existe exactement trois lettres puis quatre chiffres ?
3. Quel opérateur du dossier convient mieux pour contrôler un motif complet ?

## 🌺 CRITÈRES DE VALIDATION

- [ ] La chaîne vide est contrôlée avant `CO`.
- [ ] Le code nominal est accepté.
- [ ] `_` est refusé.
- [ ] Les minuscules sont refusées.
- [ ] `sy-fdpos` est lu immédiatement.
- [ ] La limite de `CO` est comprise.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
CONSTANTS lc_allowed_chars TYPE string
  VALUE `ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-`.

DATA lv_code TYPE string VALUE `ABAP-2026`.

IF lv_code IS INITIAL.
  WRITE / 'Code invalide : valeur vide'.
ELSEIF lv_code CO lc_allowed_chars.
  WRITE / 'Code valide'.
ELSE.
  DATA(lv_invalid_offset) = sy-fdpos.
  WRITE / |Caractère invalide à l'offset { lv_invalid_offset }|.
ENDIF.
```

`CO` contrôle l’alphabet autorisé, pas la structure exacte de la chaîne.

Pour un format tel que `ABC-1234`, utiliser un contrôle de motif avec `CP`, éventuellement complété par des contrôles supplémentaires lorsque certaines positions doivent être exclusivement alphabétiques ou numériques.

</details>
