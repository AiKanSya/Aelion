# 🌸 EXERCICES — CONVERSION EXITS

## 🌺 OBJECTIFS

- distinguer format externe et interne ;
- identifier la routine du domaine ;
- tester `ALPHA_INPUT` et `ALPHA_OUTPUT` ;
- tester `MATN1` seulement si adapté ;
- comparer avec une syntaxe moderne.

## 🌺 DURÉE INDICATIVE

60 à 75 minutes.

## 🌺 EXERCICE 1 — RECHERCHE DDIC

Pour trois champs :

1. ouvrir le champ ;
2. ouvrir l’élément de données ;
3. ouvrir le domaine ;
4. relever la routine de conversion ;
5. relever la longueur interne.

## 🌺 EXERCICE 2 — ALPHA INPUT

```abap
CALL FUNCTION 'CONVERSION_EXIT_ALPHA_INPUT'
  EXPORTING
    input  = lv_external
  IMPORTING
    output = lv_internal.
```

Avec une cible de longueur dix :

```text
123
→ 0000000123
```

## 🌺 EXERCICE 3 — ALPHA OUTPUT

```abap
CALL FUNCTION 'CONVERSION_EXIT_ALPHA_OUTPUT'
  EXPORTING
    input  = lv_internal
  IMPORTING
    output = lv_external.
```

## 🌺 EXERCICE 4 — ALPHANUMÉRIQUE

Tester :

```text
AB12
```

Observer le comportement réel. `ALPHA` n’est pas une simple fonction universelle d’ajout de zéros.

## 🌺 EXERCICE 5 — MATN1

Utiliser :

```text
CONVERSION_EXIT_MATN1_INPUT
```

uniquement si le domaine du numéro de matériau du système utilise la routine `MATN1`.

## 🌺 EXERCICE 6 — TEMPLATE

Sur une version compatible :

```abap
DATA(lv_internal) =
  |{ lv_external ALPHA = IN }|.

DATA(lv_external_again) =
  |{ lv_internal ALPHA = OUT }|.
```

## 🌺 DIAGNOSTIC

Appliquer `ALPHA_INPUT` à un identifiant dont le domaine ne possède aucune routine.

Décrire le risque de clé incorrecte.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Trois domaines sont inspectés.
- [ ] Input et Output sont distingués.
- [ ] `ALPHA` est testé.
- [ ] Le cas alphanumérique est observé.
- [ ] `MATN1` dépend du domaine.
- [ ] La syntaxe moderne est testée si disponible.
- [ ] Aucune conversion arbitraire n’est conservée.

<details>
<summary>🍧 Afficher la solution</summary>

```text
INPUT
→ format externe vers format interne

OUTPUT
→ format interne vers format externe
```

La routine du domaine constitue la référence.

</details>
