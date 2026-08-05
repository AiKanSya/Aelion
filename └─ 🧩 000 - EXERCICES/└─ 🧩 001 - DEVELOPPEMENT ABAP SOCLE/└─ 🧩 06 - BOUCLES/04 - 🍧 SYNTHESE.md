# 🌸 EXERCICES — SYNTHESE

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [DO ENDDO - CONTROLE DES BOUCLES EN ABAP](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 06 - BOUCLES/01 - 🍧 DO.md>)

> Cours associé : [WHILE ENDWHILE - CONTROLE DES BOUCLES CONDITIONNELLES](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 06 - BOUCLES/02 - 🍧 WHILE.md>)

> Cours associé : [BOUCLE INFINIE - SM50](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 06 - BOUCLES/03 - 🍧 INFINITE.md>)

## 🌺 OBJECTIF

Construire un programme utilisant les deux types de boucle avec une terminaison démontrable.

## 🌺 CONTEXTE

Le programme comprend deux phases.

### Phase 1 — sélection de numéros avec DO

Parcourir les numéros `1` à `20`.

Règles :

- ignorer les valeurs inférieures à `5` ;
- quitter la boucle après `13` ;
- ignorer les nombres pairs ;
- afficher les valeurs restantes.

Résultat :

```text
5
7
9
11
13
```

### Phase 2 — réapprovisionnement avec WHILE

Données :

```text
Stock initial     : 7
Stock cible       : 25
Taille d’un colis : 4
Limite de passages: 10
```

Règles :

- ajouter un colis tant que le stock est inférieur à la cible ;
- refuser une taille de colis inférieure ou égale à zéro ;
- ajouter un garde-fou de dix passages ;
- afficher chaque nouveau stock ;
- afficher la cause de sortie.

## 🌺 CONSIGNES

1. Déclarer des constantes pour la cible, la taille de colis et la limite de sécurité.
2. Afficher un titre pour chaque phase.
3. Utiliser `DO 20 TIMES` pour la phase 1.
4. Utiliser `CHECK`, `EXIT` et `CONTINUE` dans un ordre cohérent.
5. Utiliser `WHILE` pour la phase 2.
6. Démontrer la progression de `lv_stock`.
7. Utiliser `sy-index` pour le numéro de passage de chaque boucle.
8. Attention : `sy-index` de la phase 2 recommence à `1`.
9. Afficher `Cible atteinte ou dépassée` lorsque la sortie est naturelle.
10. Afficher `Arrêt de sécurité` lorsque le garde-fou provoque la sortie.
11. Tester les cas suivants :

| Stock | Cible | Colis | Limite | Résultat            |
| ----: | ----: | ----: | -----: | ------------------- |
|     7 |    25 |     4 |     10 | cible dépassée à 27 |
|    25 |    25 |     4 |     10 | zéro passage        |
|     7 |    25 |     0 |     10 | taille invalide     |
|     7 |   100 |     4 |      3 | arrêt de sécurité   |

## 🌺 TABLEAU DE TRACE DU CAS NOMINAL

| Passage | Stock avant | Ajout | Stock après | Condition suivante |
| ------: | ----------: | ----: | ----------: | ------------------ |
|       1 |           7 |     4 |          11 | `11 < 25`          |
|       2 |          11 |     4 |          15 |                    |
|       3 |          15 |     4 |          19 |                    |
|       4 |          19 |     4 |          23 |                    |
|       5 |          23 |     4 |          27 |                    |

## 🌺 LIVRABLES

- code complet ;
- résultats des deux phases ;
- tableau de trace complété ;
- résultats des quatre cas ;
- preuve de terminaison de la phase `WHILE` ;
- explication du redémarrage de `sy-index`.

## 🌺 CRITÈRES DE VALIDATION

- [ ] La phase `DO` affiche `5, 7, 9, 11, 13`.
- [ ] La phase `WHILE` affiche cinq ajouts dans le cas nominal.
- [ ] Le stock final nominal vaut `27`.
- [ ] Le cas stock initial égal à la cible exécute zéro passage.
- [ ] Une taille de colis nulle est refusée avant la boucle.
- [ ] Le garde-fou arrête le cas non atteignable dans la limite.
- [ ] La cause de sortie est affichée.
- [ ] La terminaison est justifiée.
- [ ] Aucun traitement infini ne peut être déclenché.

<details>
<summary>🍧 Afficher la solution complète</summary>

```abap
REPORT zaelion_<tri>_boucles.

CONSTANTS:
  lc_target_stock   TYPE i VALUE 25,
  lc_package_size   TYPE i VALUE 4,
  lc_safety_limit   TYPE i VALUE 10.

DATA:
  lv_stock          TYPE i VALUE 7,
  lv_stopped_safely TYPE abap_bool.

START-OF-SELECTION.

  WRITE / 'PHASE 1 - SÉLECTION'.

  DO 20 TIMES.

    CHECK sy-index >= 5.

    IF sy-index > 13.
      EXIT.
    ENDIF.

    IF sy-index MOD 2 = 0.
      CONTINUE.
    ENDIF.

    WRITE / sy-index.

  ENDDO.

  SKIP.
  WRITE / 'PHASE 2 - RÉAPPROVISIONNEMENT'.

  IF lc_package_size <= 0.

    WRITE / 'Taille de colis invalide'.

  ELSE.

    CLEAR lv_stopped_safely.

    WHILE lv_stock < lc_target_stock.

      IF sy-index > lc_safety_limit.
        lv_stopped_safely = abap_true.
        EXIT.
      ENDIF.

      lv_stock = lv_stock + lc_package_size.

      WRITE: / 'Passage', sy-index,
               '- Stock', lv_stock.

    ENDWHILE.

    IF lv_stopped_safely EQ abap_true.
      WRITE / 'Arrêt de sécurité'.
    ELSE.
      WRITE: / 'Cible atteinte ou dépassée',
             / 'Stock final :', lv_stock.
    ENDIF.

  ENDIF.
```

### Trace nominale

| Passage | Stock avant | Ajout | Stock après | Condition suivante |
| ------: | ----------: | ----: | ----------: | ------------------ |
|       1 |           7 |     4 |          11 | vraie              |
|       2 |          11 |     4 |          15 | vraie              |
|       3 |          15 |     4 |          19 | vraie              |
|       4 |          19 |     4 |          23 | vraie              |
|       5 |          23 |     4 |          27 | fausse             |

### Preuve de terminaison

| Élément          | Analyse                                        |
| ---------------- | ---------------------------------------------- |
| État initial     | stock `7`                                      |
| Condition        | stock inférieur à `25`                         |
| Progression      | ajout de `4` par passage                       |
| Sortie naturelle | le stock atteint `27`, donc `27 < 25` est faux |
| Garde-fou        | arrêt si le numéro de passage dépasse `10`     |

### Cas stock initial égal à la cible

```text
Aucun passage WHILE
Cible atteinte ou dépassée
Stock final : 25
```

### Cas colis nul

```text
Taille de colis invalide
```

### Cas cible 100, limite 3

Pour garantir exactement trois ajouts avant l’arrêt, utiliser le contrôle suivant au début de la boucle :

```abap
IF sy-index > lv_safety_limit.
  lv_stopped_safely = abap_true.
  EXIT.
ENDIF.
```

Les stocks affichés sont :

```text
11
15
19
Arrêt de sécurité
```

</details>
