# 🌸 EXERCICES — SÉLECTIONS MULTIPLES

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [TRANSACTION SE16N](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 09 - SE16N/01 - 🍧 SE16N.md>)

## 🌺 OBJECTIFS

- utiliser les inclusions ;
- utiliser les exclusions ;
- définir un intervalle ;
- combiner valeurs et intervalles ;
- lire correctement la synthèse des sélections ;
- éviter une combinaison contradictoire.

## 🌺 DURÉE INDICATIVE

50 à 65 minutes.

## 🌺 EXERCICE 1 — PLUSIEURS VALEURS

Sur `STATUS`, ouvrir la sélection multiple.

Inclure :

```text
N
P
```

Résultat attendu :

```text
0000000001
0000000002
```

## 🌺 EXERCICE 2 — EXCLUSION

Inclure tous les statuts puis exclure :

```text
C
```

Comparer le résultat à l’exercice précédent.

## 🌺 EXERCICE 3 — INTERVALLE D’IDENTIFIANTS

Sur `ORDER_ID`, inclure :

```text
0000000001 à 0000000002
```

Résultat attendu :

```text
0000000001
0000000002
```

Vérifier que les deux bornes sont incluses.

## 🌺 EXERCICE 4 — INTERVALLE DE MONTANTS

Inclure :

```text
50,00 à 125,50
```

Puis exclure :

```text
75,00
```

Résultat attendu :

```text
0000000001
0000000003
```

## 🌺 EXERCICE 5 — COMBINAISON CONTRADICTOIRE

Construire temporairement :

```text
Inclure STATUS = N
Exclure STATUS = N
```

Exécuter.

Répondre :

1. quelle ligne peut satisfaire simultanément la sélection finale ?
2. un résultat vide constitue-t-il une erreur technique ?
3. comment diagnostiquer une sélection contradictoire ?
4. quelle vue de synthèse des critères faut-il vérifier avant l’exécution ?

## 🌺 EXERCICE 6 — IMPORT DE VALEURS

Si la fonction de collage multiple est disponible :

1. préparer dans un éditeur :

```text
0000000001
0000000003
```

2. coller les valeurs dans la sélection multiple ;
3. vérifier les lignes ;
4. exécuter ;
5. relever le résultat.

Ne pas importer un fichier contenant des données non autorisées.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Les statuts `N` et `P` sont inclus.
- [ ] Le statut `C` est exclu.
- [ ] Les bornes de l’intervalle sont incluses.
- [ ] L’exclusion du montant est appliquée.
- [ ] Une sélection contradictoire est diagnostiquée.
- [ ] Les valeurs collées sont vérifiées avant exécution.

<details>
<summary>🍧 Afficher la solution</summary>

| Sélection                    | Résultat         |
| ---------------------------- | ---------------- |
| Statuts `N`, `P`             | commandes 1 et 2 |
| Exclusion de `C`             | commandes 1 et 2 |
| IDs 1 à 2                    | commandes 1 et 2 |
| Montants 50 à 125,50 sauf 75 | commandes 1 et 3 |
| Inclure et exclure `N`       | aucune ligne     |

Un résultat vide peut être parfaitement cohérent avec les critères saisis.

</details>
