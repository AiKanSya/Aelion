# 🌸 EXERCICES — TEST ET DEBOGAGE

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [TEST ET DEBOGAGE](<../../../└─ 🧩 002 - DEVELOPPEMENT ABAP OBJECT/└─ 🧩 01 - MODULE FONCTION/13 - 🍧 TEST & DEBOGAGE.md>)

## 🌺 CONSIGNES

- Réaliser les exercices sans consulter le cours lors du premier essai.
- Produire une preuve vérifiable : code, résultat, capture ou explication structurée.
- Consulter le cours uniquement après avoir identifié précisément le blocage.
- Ne pas utiliser la solution de l'évaluation finale comme exemple.

## 🌺 EXERCICE 1 — RESTITUTION

Sans consulter le cours, définir **TEST ET DEBOGAGE**, expliquer son utilité et citer une erreur d'utilisation possible.

## 🌺 EXERCICE 2 — MISE EN PRATIQUE

- [ ] Tester un module dans `SE37` dans un exemple différent de celui du cours.
- [ ] Sauvegarder et réutiliser des données de test dans un exemple différent de celui du cours.
- [ ] Poser un point d’arrêt dans un exemple différent de celui du cours.
- [ ] Déboguer un appel local, RFC ou Update Task dans un exemple différent de celui du cours.
- [ ] Contrôler les résultats et exceptions dans un exemple différent de celui du cours.

### Exercice repris du cours

1. Définir cinq cas de test pour un calcul de remise.
2. Exécuter chaque cas dans `SE37`.
3. Placer un point d’arrêt sur le premier contrôle.
4. Observer `SY-SUBRC` dans le programme appelant.
5. Tester deux appels successifs pour vérifier l’absence d’état global résiduel.

## 🌺 EXERCICE 3 — DIAGNOSTIC

1. Construire volontairement un cas incorrect lié à **TEST ET DEBOGAGE**.
2. Décrire le symptôme observable.
3. Identifier la cause technique ou fonctionnelle.
4. Corriger le cas et prouver la non-régression avec un cas nominal et un cas limite.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le résultat peut être expliqué sans relire le cours.
- [ ] L'exemple est exécutable ou vérifiable.
- [ ] Le cas d'erreur est distingué du cas nominal.
- [ ] Aucun élément propre à la solution de l'évaluation finale n'est utilisé.
