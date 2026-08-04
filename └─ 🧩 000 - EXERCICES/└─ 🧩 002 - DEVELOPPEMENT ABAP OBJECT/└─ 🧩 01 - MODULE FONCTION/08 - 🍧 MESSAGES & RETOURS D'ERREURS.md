# 🌸 EXERCICES — MESSAGES ET RETOURS D'ERREUR

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [MESSAGES ET RETOURS D'ERREUR](<../../../└─ 🧩 002 - DEVELOPPEMENT ABAP OBJECT/└─ 🧩 01 - MODULE FONCTION/08 - 🍧 MESSAGES & RETOURS D'ERREURS.md>)

## 🌺 CONSIGNES

- Réaliser les exercices sans consulter le cours lors du premier essai.
- Produire une preuve vérifiable : code, résultat, capture ou explication structurée.
- Consulter le cours uniquement après avoir identifié précisément le blocage.
- Ne pas utiliser la solution de l'évaluation finale comme exemple.

## 🌺 EXERCICE 1 — RESTITUTION

Sans consulter le cours, définir **MESSAGES ET RETOURS D'ERREUR**, expliquer son utilité et citer une erreur d'utilisation possible.

## 🌺 EXERCICE 2 — MISE EN PRATIQUE

- [ ] Distinguer exception technique et message fonctionnel dans un exemple différent de celui du cours.
- [ ] Retourner un message structuré dans un exemple différent de celui du cours.
- [ ] Utiliser une structure de type `BAPIRET2` dans un exemple différent de celui du cours.
- [ ] Éviter les sorties écran dans une API réutilisable dans un exemple différent de celui du cours.
- [ ] Définir un contrat d’erreur cohérent dans un exemple différent de celui du cours.

### Exercice repris du cours

1. Ajouter un export `ES_RETURN TYPE BAPIRET2`.
2. Retourner une erreur lorsque le texte d’entrée est vide.
3. Retourner un succès lorsque le texte a été normalisé.
4. Tester l’appel sans produire de `MESSAGE E` direct.
5. Ajouter le nom du champ en erreur dans le message.

## 🌺 EXERCICE 3 — DIAGNOSTIC

1. Construire volontairement un cas incorrect lié à **MESSAGES ET RETOURS D'ERREUR**.
2. Décrire le symptôme observable.
3. Identifier la cause technique ou fonctionnelle.
4. Corriger le cas et prouver la non-régression avec un cas nominal et un cas limite.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le résultat peut être expliqué sans relire le cours.
- [ ] L'exemple est exécutable ou vérifiable.
- [ ] Le cas d'erreur est distingué du cas nominal.
- [ ] Aucun élément propre à la solution de l'évaluation finale n'est utilisé.
