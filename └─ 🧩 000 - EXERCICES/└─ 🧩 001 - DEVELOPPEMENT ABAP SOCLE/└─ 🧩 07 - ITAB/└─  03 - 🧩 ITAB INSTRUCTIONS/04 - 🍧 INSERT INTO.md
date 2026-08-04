# 🌸 EXERCICES — INSERT INTO ITAB

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [INSERT INTO ITAB](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  03 - 🧩 ITAB INSTRUCTIONS/04 - 🍧 INSERT INTO.md>)

## 🌺 CONSIGNES

- Réaliser les exercices sans consulter le cours lors du premier essai.
- Produire une preuve vérifiable : code, résultat, capture ou explication structurée.
- Consulter le cours uniquement après avoir identifié précisément le blocage.
- Ne pas utiliser la solution de l'évaluation finale comme exemple.

## 🌺 EXERCICE 1 — RESTITUTION

Sans consulter le cours, définir **INSERT INTO ITAB**, expliquer son utilité et citer une erreur d'utilisation possible.

## 🌺 EXERCICE 2 — MISE EN PRATIQUE

- [ ] Comprendre le fonctionnement de l’instruction `INSERT` pour les tables internes dans un exemple différent de celui du cours.
- [ ] Savoir insérer une structure, une ligne vide ou des lignes d’une autre table dans un exemple différent de celui du cours.
- [ ] Maîtriser l’insertion à un index précis dans la table cible dans un exemple différent de celui du cours.
- [ ] Simplifier le code en évitant des boucles manuelles pour ajouter plusieurs lignes dans un exemple différent de celui du cours.

### Exercice repris du cours

### 🍧 1 – CREER ET INSERER DES ENREGISTREMENTS

> [!IMPORTANT]
> Déclarer une table interne `lt_employees` avec une structure `ty_employee`
>
> - id (CHAR5)
> - nom (CHAR20)
> - departement (CHAR10)
>   Insérer deux employés et afficher les données.

<details>
  <summary>SOLUTION</summary>

    TYPES: BEGIN OF ty_employee,
             id         TYPE char5,
             nom        TYPE char20,
             departement TYPE char10,
           END OF ty_employee.

    DATA: lt_employees TYPE TABLE OF ty_employee,
          ls_employee  TYPE ty_employee.

    ls_employee-id         = 'E001'.
    ls_employee-nom        = 'Dupont'.
    ls_employee-departement = 'RH'.
    INSERT ls_employee INTO TABLE lt_employees.

    ls_employee-id         = 'E002'.
    ls_employee-nom        = 'Martin'.
    ls_employee-departement = 'IT'.
    INSERT ls_employee INTO TABLE lt_employees.

    LOOP AT lt_employees INTO ls_employee.
      WRITE: / ls_employee-id, ls_employee-nom, ls_employee-departement.
    ENDLOOP.

</details>

---

### 🍧 2 – INSERER UNE LIGNE VIDE

> [!IMPORTANT]
> Ajouter une ligne vide à l’index 2 et afficher la table.

<details>
  <summary>SOLUTION</summary>

    INSERT INITIAL LINE INTO lt_employees INDEX 2.

    LOOP AT lt_employees INTO ls_employee.
      WRITE: / ls_employee-id, ls_employee-nom, ls_employee-departement.
    ENDLOOP.

</details>

---

### 🍧 3 – COPIER DES LIGNES D’UNE AUTRE TABLE

> [!IMPORTANT]
> Créer `lt_new_employees` avec deux lignes et les insérer dans `lt_employees` à l’index 1.

<details>
  <summary>SOLUTION</summary>

    DATA: lt_new_employees TYPE TABLE OF ty_employee.

    ls_employee-id         = 'E003'.
    ls_employee-nom        = 'Renata'.
    ls_employee-departement = 'FIN'.
    INSERT ls_employee INTO TABLE lt_new_employees.

    ls_employee-id         = 'E004'.
    ls_employee-nom        = 'Luis'.
    ls_employee-departement = 'LOG'.
    INSERT ls_employee INTO TABLE lt_new_employees.

    INSERT LINES OF lt_new_employees INTO lt_employees INDEX 1.

    LOOP AT lt_employees INTO ls_employee.
      WRITE: / ls_employee-id, ls_employee-nom, ls_employee-departement.
    ENDLOOP.

</details>

## 🌺 EXERCICE 3 — DIAGNOSTIC

1. Construire volontairement un cas incorrect lié à **INSERT INTO ITAB**.
2. Décrire le symptôme observable.
3. Identifier la cause technique ou fonctionnelle.
4. Corriger le cas et prouver la non-régression avec un cas nominal et un cas limite.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le résultat peut être expliqué sans relire le cours.
- [ ] L'exemple est exécutable ou vérifiable.
- [ ] Le cas d'erreur est distingué du cas nominal.
- [ ] Aucun élément propre à la solution de l'évaluation finale n'est utilisé.
