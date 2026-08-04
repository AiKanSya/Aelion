# 🌸 EXERCICES — BAPI ET GESTION DE TRANSACTION

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [BAPI ET GESTION DE TRANSACTION](<../../../└─ 🧩 002 - DEVELOPPEMENT ABAP OBJECT/└─ 🧩 01 - MODULE FONCTION/12 - 🍧 BAPI & GESTION DE TRANSACTION.md>)

## 🌺 CONSIGNES

- Réaliser les exercices sans consulter le cours lors du premier essai.
- Produire une preuve vérifiable : code, résultat, capture ou explication structurée.
- Consulter le cours uniquement après avoir identifié précisément le blocage.
- Ne pas utiliser la solution de l'évaluation finale comme exemple.

## 🌺 EXERCICE 1 — RESTITUTION

Sans consulter le cours, définir **BAPI ET GESTION DE TRANSACTION**, expliquer son utilité et citer une erreur d'utilisation possible.

## 🌺 EXERCICE 2 — MISE EN PRATIQUE

- [ ] Définir une BAPI dans un exemple différent de celui du cours.
- [ ] Distinguer BAPI et module fonction quelconque dans un exemple différent de celui du cours.
- [ ] Lire un paramètre `RETURN` dans un exemple différent de celui du cours.
- [ ] Comprendre le contrôle du commit par l’appelant dans un exemple différent de celui du cours.
- [ ] Utiliser `BAPI_TRANSACTION_COMMIT` et `BAPI_TRANSACTION_ROLLBACK` dans un exemple différent de celui du cours.

### Exercice repris du cours

1. Préparer une table interne de type `BAPIRET2`.
2. Ajouter une erreur, un avertissement et un succès.
3. Détecter les types bloquants `AEX`.
4. Appeler le commit seulement en absence d’erreur.
5. Expliquer pourquoi tout module RFC n’est pas une BAPI.
6. Construire deux structures génériques `DATA` et `DATAX`, puis montrer la différence entre valeur initiale non sélectionnée et valeur initiale explicitement sélectionnée.

## 🌺 EXERCICE 3 — DIAGNOSTIC

1. Construire volontairement un cas incorrect lié à **BAPI ET GESTION DE TRANSACTION**.
2. Décrire le symptôme observable.
3. Identifier la cause technique ou fonctionnelle.
4. Corriger le cas et prouver la non-régression avec un cas nominal et un cas limite.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le résultat peut être expliqué sans relire le cours.
- [ ] L'exemple est exécutable ou vérifiable.
- [ ] Le cas d'erreur est distingué du cas nominal.
- [ ] Aucun élément propre à la solution de l'évaluation finale n'est utilisé.
