# 🌸 EXERCICES — CONCATENATE

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- fusionner plusieurs champs ;
- utiliser un séparateur ;
- conserver les espaces d’un champ fixe ;
- stocker le résultat dans une cible suffisamment longue ;
- identifier une troncature de la cible.

## 🌺 DURÉE INDICATIVE

25 à 35 minutes.

## 🌺 EXERCICE 1 — CONSTRUCTION D’UNE ADRESSE

Déclarer :

```abap
DATA lv_street TYPE string VALUE `10 rue de la Paix`.
DATA lv_zip    TYPE c LENGTH 5 VALUE '75002'.
DATA lv_city   TYPE string VALUE `Paris`.
DATA lv_address TYPE string.
```

Construire :

```text
10 rue de la Paix - 75002 - Paris
```

Utiliser `CONCATENATE ... SEPARATED BY`.

## 🌺 EXERCICE 2 — SANS SÉPARATEUR

Construire le code suivant :

```text
FR75002PARIS
```

Aucun espace ni tiret ne doit être ajouté.

## 🌺 EXERCICE 3 — RESPECTING BLANKS

Déclarer :

```abap
DATA lv_part_1 TYPE c LENGTH 10 VALUE 'SAP'.
DATA lv_part_2 TYPE c LENGTH 10 VALUE 'ABAP'.
DATA lv_fixed_result TYPE c LENGTH 20.
```

Comparer :

```abap
CONCATENATE lv_part_1 lv_part_2
  INTO lv_fixed_result.
```

et :

```abap
CONCATENATE lv_part_1 lv_part_2
  INTO lv_fixed_result
  RESPECTING BLANKS.
```

Expliquer pourquoi le second résultat contient les espaces de remplissage du premier champ.

## 🌺 EXERCICE 4 — TRONCATURE

Analyser :

```abap
DATA lv_short_result TYPE c LENGTH 10.

CONCATENATE lv_street lv_zip lv_city
  INTO lv_short_result
  SEPARATED BY space.
```

1. Le code est-il syntaxiquement valide ?
2. Le résultat complet tient-il dans la cible ?
3. Quelle correction faut-il appliquer ?
4. Pourquoi `string` convient-il mieux ici ?

## 🌺 CRITÈRES DE VALIDATION

- [ ] L’adresse contient les séparateurs attendus.
- [ ] Le code compact ne contient aucun séparateur.
- [ ] `RESPECTING BLANKS` est expliqué.
- [ ] La cible ne tronque pas le résultat.
- [ ] Le résultat est stocké avant affichage.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
DATA lv_street  TYPE string VALUE `10 rue de la Paix`.
DATA lv_zip     TYPE c LENGTH 5 VALUE '75002'.
DATA lv_city    TYPE string VALUE `Paris`.
DATA lv_address TYPE string.
DATA lv_code    TYPE string.

CONCATENATE lv_street lv_zip lv_city
  INTO lv_address
  SEPARATED BY ` - `.

CONCATENATE 'FR' lv_zip lv_city
  INTO lv_code.

WRITE: / lv_address,
       / lv_code.
```

Comparaison des espaces :

```abap
DATA lv_part_1 TYPE c LENGTH 10 VALUE 'SAP'.
DATA lv_part_2 TYPE c LENGTH 10 VALUE 'ABAP'.
DATA lv_fixed_result TYPE c LENGTH 20.

CONCATENATE lv_part_1 lv_part_2
  INTO lv_fixed_result.

WRITE: / 'Sans RESPECTING BLANKS :', lv_fixed_result.

CONCATENATE lv_part_1 lv_part_2
  INTO lv_fixed_result
  RESPECTING BLANKS.

WRITE: / 'Avec RESPECTING BLANKS :', lv_fixed_result.
```

Une cible de type `c LENGTH 10` ne peut pas contenir l’adresse complète. Une cible `string` s’adapte à la longueur du résultat.

</details>
