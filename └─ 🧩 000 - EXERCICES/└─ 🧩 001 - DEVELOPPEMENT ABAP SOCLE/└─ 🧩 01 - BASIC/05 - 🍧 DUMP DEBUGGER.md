# 🌸 EXERCICES — GESTION DES DUMPS ET DU DEBUGUEUR – `ST22`

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [GESTION DES DUMPS ET DU DEBUGUEUR – `ST22`](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 01 - BASIC/05 - 🍧 DUMP DEBUGGER.md>)

## 🌺 CONSIGNES

- Réaliser les exercices sans consulter le cours lors du premier essai.
- Produire une preuve vérifiable : code, résultat, capture ou explication structurée.
- Consulter le cours uniquement après avoir identifié précisément le blocage.
- Ne pas utiliser la solution de l'évaluation finale comme exemple.

## 🌺 EXERCICE 1 — RESTITUTION

Sans consulter le cours, définir **GESTION DES DUMPS ET DU DEBUGUEUR – `ST22`**, expliquer son utilité et citer une erreur d'utilisation possible.

## 🌺 EXERCICE 2 — MISE EN PRATIQUE

- [ ] Comprendre ce qu’est un `DUMP` dans SAP dans un exemple différent de celui du cours.
- [ ] Savoir analyser un `DUMP` via la transaction `ST22` dans un exemple différent de celui du cours.
- [ ] Découvrir le débogueur ABAP et apprendre à l’utiliser dans un exemple différent de celui du cours.
- [ ] Identifier la différence entre débogage via `/H` et `POINTS D'ARRET` dans un exemple différent de celui du cours.

### Exercice repris du cours

1.  Générer volontairement un `DUMP` simple (ex. DIVISION BY ZERO)

          *&---------------------------------------------------------------------*
          *& Report ZAELION_FGI_HELLOWORLD
          *&---------------------------------------------------------------------*
          *&
          *&---------------------------------------------------------------------*
          REPORT zaelion_fgi_helloworld.

          WRITE:/ 'Bonjour le monde !'.

          INCLUDE zaelion_fgi_helloworld_top.
          INCLUDE zaelion_fgi_helloworld_scr.
          INCLUDE zaelion_fgi_helloworld_f01.

          *&---------------------------------------------------------------------*
          *& DUMP
          *&---------------------------------------------------------------------*

          DATA: lv_num TYPE i,
               lv_den TYPE i,
               lv_res TYPE i.

          lv_num = 10.
          lv_den = 0.

          lv_res = lv_num / lv_den.

          WRITE: / 'Résultat :', lv_res.

2.  Exécuter
3.  Analyser le `DUMP` dans `ST22`
4.  Ajouter un point d’arrêt dans ton programme, exécuter et observer les variables

## 🌺 EXERCICE 3 — DIAGNOSTIC

1. Construire volontairement un cas incorrect lié à **GESTION DES DUMPS ET DU DEBUGUEUR – `ST22`**.
2. Décrire le symptôme observable.
3. Identifier la cause technique ou fonctionnelle.
4. Corriger le cas et prouver la non-régression avec un cas nominal et un cas limite.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le résultat peut être expliqué sans relire le cours.
- [ ] L'exemple est exécutable ou vérifiable.
- [ ] Le cas d'erreur est distingué du cas nominal.
- [ ] Aucun élément propre à la solution de l'évaluation finale n'est utilisé.
