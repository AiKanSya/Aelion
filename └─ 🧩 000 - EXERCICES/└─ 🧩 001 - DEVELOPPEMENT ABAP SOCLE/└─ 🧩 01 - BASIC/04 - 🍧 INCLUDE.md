# 🌸 EXERCICES — CREATION D’UN INCLUDE – SE38 / SE80

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [CREATION D’UN INCLUDE – SE38 / SE80](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 01 - BASIC/04 - 🍧 INCLUDE.md>)

## 🌺 CONSIGNES

- Réaliser les exercices sans consulter le cours lors du premier essai.
- Produire une preuve vérifiable : code, résultat, capture ou explication structurée.
- Consulter le cours uniquement après avoir identifié précisément le blocage.
- Ne pas utiliser la solution de l'évaluation finale comme exemple.

## 🌺 EXERCICE 1 — RESTITUTION

Sans consulter le cours, définir **CREATION D’UN INCLUDE – SE38 / SE80**, expliquer son utilité et citer une erreur d'utilisation possible.

## 🌺 EXERCICE 2 — MISE EN PRATIQUE

- [ ] Comprendre le rôle d’un `INCLUDE` dans un programme ABAP dans un exemple différent de celui du cours.
- [ ] Créer un `INCLUDE` via `SE38` ou `SE80` dans un exemple différent de celui du cours.
- [ ] Savoir l’intégrer dans un programme principal dans un exemple différent de celui du cours.
- [ ] Organiser son code ABAP pour plus de clarté et de réutilisation dans un exemple différent de celui du cours.

### Exercice repris du cours

1.  Modifier le WRITE (ajout de `/` après le `WRITE:`)

         WRITE:/ 'Bonjour le monde !'.

1.  Créer l’`INCLUDE` ZAELION_TRI_HELLOWORLD_TOP

         INCLUDE ZAELION_TRI_HELLOWORLD_TOP.

1.  Ajouter le WRITE dans l'`INCLUDE`:

         WRITE:/ 'Bonjour le monde depuis l''INCLUDE TOP !'.

1.  Sauvegarder, Activer les objets
1.  Exécuter le programme principal et vérifier l’affichage
1.  Faite de même avec les `INCLUDES` `ZAELION_TRI_HELLOWORLD_SCR` et `ZAELION_TRI_HELLOWORLD_F01`

<details>
  <summary>SOLUTION</summary>

---

`REPORT ZAELION_TRI_HELLOWORLD`

      *&---------------------------------------------------------------------*
      *& Report ZAELION_TRI_HELLOWORLD
      *&---------------------------------------------------------------------*
      *&
      *&---------------------------------------------------------------------*
      REPORT ZAELION_TRI_HELLOWORLD.

      WRITE:/ 'Bonjour le monde !'.

      INCLUDE ZAELION_TRI_HELLOWORLD_TOP.
      INCLUDE ZAELION_TRI_HELLOWORLD_SCR.
      INCLUDE ZAELION_TRI_HELLOWORLD_F01.

`INCLUDE ZAELION_TRI_HELLOWORLD_TOP`

      *&---------------------------------------------------------------------*
      *& Include          ZAELION_FGI_HELLOWORLD_TOP
      *&---------------------------------------------------------------------*

      WRITE:/ 'Bonjour le monde depuis l''INCLUDE TOP !'.

`INCLUDE ZAELION_TRI_HELLOWORLD_SCR`

      *&---------------------------------------------------------------------*
      *& Include          ZAELION_TRI_HELLOWORLD_SCR
      *&---------------------------------------------------------------------*

      WRITE:/ 'Bonjour le monde depuis l''INCLUDE SCR !'.

`INCLUDE ZAELION_TRI_HELLOWORLD_F01`

      *&---------------------------------------------------------------------*
      *& Include          ZAELION_TRI_HELLOWORLD_F01
      *&---------------------------------------------------------------------*

      WRITE:/ 'Bonjour le monde depuis l''INCLUDE F01 !'.

Exécution :

![](./assets/images/Capture%20d’écran%202025-10-30%20193647.png)

</details>

## 🌺 EXERCICE 3 — DIAGNOSTIC

1. Construire volontairement un cas incorrect lié à **CREATION D’UN INCLUDE – SE38 / SE80**.
2. Décrire le symptôme observable.
3. Identifier la cause technique ou fonctionnelle.
4. Corriger le cas et prouver la non-régression avec un cas nominal et un cas limite.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le résultat peut être expliqué sans relire le cours.
- [ ] L'exemple est exécutable ou vérifiable.
- [ ] Le cas d'erreur est distingué du cas nominal.
- [ ] Aucun élément propre à la solution de l'évaluation finale n'est utilisé.
