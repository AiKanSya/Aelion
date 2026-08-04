# 🌸 EXERCICES — EXCEPTIONS CLASSIQUES

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [EXCEPTIONS CLASSIQUES](<../../../└─ 🧩 002 - DEVELOPPEMENT ABAP OBJECT/└─ 🧩 01 - MODULE FONCTION/07 - 🍧 EXCEPTIONS.md>)

## 🌺 CONSIGNES

- Réaliser les exercices sans consulter le cours lors du premier essai.
- Produire une preuve vérifiable : code, résultat, capture ou explication structurée.
- Consulter le cours uniquement après avoir identifié précisément le blocage.
- Ne pas utiliser la solution de l'évaluation finale comme exemple.

## 🌺 EXERCICE 1 — RESTITUTION

Sans consulter le cours, définir **EXCEPTIONS CLASSIQUES**, expliquer son utilité et citer une erreur d'utilisation possible.

## 🌺 EXERCICE 2 — MISE EN PRATIQUE

- [ ] Déclarer une exception classique dans `SE37` dans un exemple différent de celui du cours.
- [ ] Lever une exception avec `RAISE` dans un exemple différent de celui du cours.
- [ ] Mapper les exceptions dans `CALL FUNCTION` dans un exemple différent de celui du cours.
- [ ] Interpréter `SY-SUBRC` dans un exemple différent de celui du cours.
- [ ] Comprendre la différence avec une exception de classe dans un exemple différent de celui du cours.

### Exercice repris du cours

1. Déclarer `DIVISION_BY_ZERO`.
2. Lever l’exception lorsque le diviseur vaut zéro.
3. Mapper l’exception sur `SY-SUBRC = 1`.
4. Ajouter `OTHERS = 2`.
5. Afficher un message différent pour chaque résultat.

## 🌺 EXERCICE 3 — DIAGNOSTIC

1. Construire volontairement un cas incorrect lié à **EXCEPTIONS CLASSIQUES**.
2. Décrire le symptôme observable.
3. Identifier la cause technique ou fonctionnelle.
4. Corriger le cas et prouver la non-régression avec un cas nominal et un cas limite.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le résultat peut être expliqué sans relire le cours.
- [ ] L'exemple est exécutable ou vérifiable.
- [ ] Le cas d'erreur est distingué du cas nominal.
- [ ] Aucun élément propre à la solution de l'évaluation finale n'est utilisé.
