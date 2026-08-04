# 🌸 EXERCICES — APPEND TO ITAB

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [APPEND TO ITAB](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  03 - 🧩 ITAB INSTRUCTIONS/05 - 🍧 APPEND TO.md>)

## 🌺 CONSIGNES

- Réaliser les exercices sans consulter le cours lors du premier essai.
- Produire une preuve vérifiable : code, résultat, capture ou explication structurée.
- Consulter le cours uniquement après avoir identifié précisément le blocage.
- Ne pas utiliser la solution de l'évaluation finale comme exemple.

## 🌺 EXERCICE 1 — RESTITUTION

Sans consulter le cours, définir **APPEND TO ITAB**, expliquer son utilité et citer une erreur d'utilisation possible.

## 🌺 EXERCICE 2 — MISE EN PRATIQUE

- [ ] Comprendre le fonctionnement de l’instruction `APPEND` pour les tables internes dans un exemple différent de celui du cours.
- [ ] Savoir ajouter une structure, une ligne vide, ou des lignes d’une autre table à la fin d’une table dans un exemple différent de celui du cours.
- [ ] Identifier les limitations selon le type de table interne dans un exemple différent de celui du cours.
- [ ] Comparer `APPEND` et `INSERT` selon le type de table dans un exemple différent de celui du cours.

### Exercice repris du cours

### 🍧 1 – AJOUTER DES EMPLOYES A UNE STANDARD TABLE

> [!IMPORTANT]
> Déclarer `lt_employees` avec la structure `ty_employee` :
>
> - id (CHAR5)
> - nom (CHAR20)
> - departement (CHAR10)
>   Ajouter deux employés avec APPEND et afficher la table.

<details>
  <summary>SOLUTION</summary>

    DATA: lt_employees TYPE TABLE OF ty_employee,
          ls_employee  TYPE ty_employee.

    ls_employee-id         = 'E001'.
    ls_employee-nom        = 'Dupont'.
    ls_employee-departement = 'RH'.
    APPEND ls_employee TO lt_employees.

    ls_employee-id         = 'E002'.
    ls_employee-nom        = 'Martin'.
    ls_employee-departement = 'IT'.
    APPEND ls_employee TO lt_employees.

    LOOP AT lt_employees INTO ls_employee.
      WRITE: / ls_employee-id, ls_employee-nom, ls_employee-departement.
    ENDLOOP.

</details>

---

### 🍧 2 – AJOUTER UNE LIGNE VIDE

> [!IMPORTANT]
> Ajouter une ligne vide à la fin de `lt_employees` et afficher la table.

<details>
  <summary>SOLUTION</summary>

    APPEND INITIAL LINE TO lt_employees.

    LOOP AT lt_employees INTO ls_employee.
      WRITE: / ls_employee-id, ls_employee-nom, ls_employee-departement.
    ENDLOOP.

</details>

---

### 🍧 3 – COPIER DES LIGNES D’UNE AUTRE TABLE

> [!IMPORTANT]
> Copier toutes les lignes de `lt_new_employees` à la fin de `lt_employees`.

<details>
  <summary>SOLUTION</summary>

    INSERT LINES OF lt_new_employees INTO TABLE lt_employees.  " ou APPEND si STANDARD

</details>

## 🌺 EXERCICE 3 — DIAGNOSTIC

1. Construire volontairement un cas incorrect lié à **APPEND TO ITAB**.
2. Décrire le symptôme observable.
3. Identifier la cause technique ou fonctionnelle.
4. Corriger le cas et prouver la non-régression avec un cas nominal et un cas limite.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le résultat peut être expliqué sans relire le cours.
- [ ] L'exemple est exécutable ou vérifiable.
- [ ] Le cas d'erreur est distingué du cas nominal.
- [ ] Aucun élément propre à la solution de l'évaluation finale n'est utilisé.
