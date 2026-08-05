# 🌸 EXERCICES — DOMAINS

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- créer un domaine ;
- choisir un type et une longueur ;
- définir des valeurs fixes ;
- autoriser ou interdire les minuscules ;
- expliquer l’impact d’une modification ;
- distinguer domaine, élément de données et table de contrôle ;
- éviter une routine de conversion injustifiée.

## 🌺 DURÉE INDICATIVE

60 à 75 minutes.

## 🌺 EXERCICE 1 — CONCEPTION

Compléter :

| Domaine          | Type   | Longueur | Minuscules     | Valeurs fixes |
| ---------------- | ------ | -------: | -------------- | ------------- |
| `ZD_<TRI>_OID`   | `NUMC` |       10 | Non applicable | Aucune        |
| `ZD_<TRI>_PRIO`  | `NUMC` |        1 | Non applicable | `1`, `2`, `3` |
| `ZD_<TRI>_NAME`  | `CHAR` |       40 | Oui            | Aucune        |
| `ZD_<TRI>_STAT`  | `CHAR` |        1 | Non            | Aucune        |
| `ZD_<TRI>_STTXT` | `CHAR` |       30 | Oui            | Aucune        |

Justifier chaque choix.

## 🌺 EXERCICE 2 — CRÉATION DE L’IDENTIFIANT

Créer :

```text
ZD_<TRI>_OID
```

Propriétés :

```text
Description     : Identifiant de commande
Type            : NUMC
Positions       : 10
Longueur édition: 10
Routine         : aucune
```

Questions :

1. Pourquoi `NUMC` convient-il à un identifiant composé uniquement de chiffres ?
2. Pourquoi un entier ne convient-il pas ?
3. Les zéros initiaux ont-ils une signification dans un identifiant ?
4. Pourquoi aucune routine `ALPHA` n’est imposée dans cet exercice ?
5. Quelle conséquence aurait une longueur de `6` ?

## 🌺 EXERCICE 3 — DOMAINE À VALEURS FIXES

Créer :

```text
ZD_<TRI>_PRIO
```

Propriétés :

```text
Type      : NUMC
Positions : 1
```

Valeurs fixes :

| Valeur | Texte   |
| ------ | ------- |
| `1`    | Faible  |
| `2`    | Normale |
| `3`    | Haute   |

Contrôler et activer.

Répondre :

1. La valeur `4` appartient-elle à la plage ?
2. La valeur vide est-elle automatiquement interdite dans tous les contextes ?
3. Une plage de valeurs remplace-t-elle toujours une table de contrôle ?
4. Quel mécanisme peut afficher les textes associés dans une aide à la saisie compatible ?

## 🌺 EXERCICE 4 — MINUSCULES

Créer :

```text
ZD_<TRI>_NAME
ZD_<TRI>_STTXT
```

Activer l’option autorisant les minuscules.

Créer `ZD_<TRI>_STAT` sans l’option.

Expliquer le résultat attendu dans un écran classique :

```text
Nom client → casse conservée
Code statut → majuscules
```

## 🌺 EXERCICE 5 — ROUTINES DE CONVERSION

Analyser :

| Besoin                         | Routine à imposer                     |
| ------------------------------ | ------------------------------------- |
| Identifiant pédagogique NUMC10 | Aucune                                |
| Matériel standard SAP          | Réutiliser le type standard approprié |
| Devise                         | Réutiliser le type standard approprié |
| Unité de mesure                | Réutiliser le type standard approprié |

Répondre :

1. Pourquoi ne pas créer systématiquement une routine personnalisée ?
2. Pourquoi faut-il utiliser l’élément de données standard lorsqu’il existe ?
3. Une routine de conversion modifie-t-elle nécessairement la valeur affichée et stockée de la même façon ?
4. Pourquoi les comparaisons doivent-elles tenir compte du format interne ?

## 🌺 EXERCICE 6 — IMPACT D’UNE MODIFICATION

Après création des éléments de données, lancer les cas d’emploi du domaine `ZD_<TRI>_OID`.

Simuler sans activer la modification suivante :

```text
Longueur 10 → longueur 6
```

Répondre :

1. quels objets seraient concernés ?
2. des données existantes pourraient-elles devenir incompatibles ?
3. faut-il modifier un domaine partagé sans analyse d’impact ?
4. quelle transaction ou fonction fournit les cas d’emploi ?
5. quelle preuve faut-il conserver avant une évolution ?

Annuler la modification.

## 🌺 EXERCICE 7 — DIAGNOSTIC

Cas incorrect :

```text
ZD_<TRI>_PRIO
Type CHAR
Longueur 40
Minuscules autorisées
Aucune valeur fixe
```

Identifier :

- les incohérences ;
- le symptôme fonctionnel ;
- la correction ;
- les tests `1`, `3`, `4`, `a`.

## 🌺 LIVRABLES

- cinq domaines actifs ;
- tableau de conception ;
- plage de valeurs de priorité ;
- justification des minuscules ;
- analyse des routines ;
- analyse d’impact ;
- diagnostic du domaine incorrect.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Les types correspondent aux données métier.
- [ ] L’identifiant conserve dix positions.
- [ ] Les trois priorités sont définies.
- [ ] Les noms autorisent les minuscules.
- [ ] Les codes n’autorisent pas les minuscules.
- [ ] Aucune routine injustifiée n’est créée.
- [ ] Les cas d’emploi sont analysés avant une modification.
- [ ] Le domaine incorrect est corrigé.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — conception

| Domaine | Justification                                       |
| ------- | --------------------------------------------------- |
| `OID`   | Identifiant numérique textuel conservant ses zéros. |
| `PRIO`  | Code sur une position limité à trois valeurs.       |
| `NAME`  | Texte métier pouvant contenir des minuscules.       |
| `STAT`  | Code technique court en majuscules.                 |
| `STTXT` | Libellé lisible pouvant contenir des minuscules.    |

### Solution — cas priorité

| Valeur | Résultat attendu                      |
| ------ | ------------------------------------- |
| `1`    | Faible                                |
| `3`    | Haute                                 |
| `4`    | Hors plage                            |
| `a`    | Incompatible avec le format numérique |

Une valeur initiale doit être contrôlée séparément lorsqu’elle est interdite par la règle métier.

### Solution — diagnostic

Correction :

```text
Type      : NUMC
Longueur  : 1
Valeurs   : 1, 2, 3
Minuscules: non applicable
```

</details>
