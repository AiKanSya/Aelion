# 🌸 EXERCICES — MOVE CORRESPONDING (STRUCTURES)

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [MOVE CORRESPONDING (STRUCTURES)](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  01 - 🧩 STRUCTURES/02 - 🍧 MOVE-CORRESPONDING.md>)

## 🌺 CONSIGNES

- Réaliser les exercices sans consulter le cours lors du premier essai.
- Produire une preuve vérifiable : code, résultat, capture ou explication structurée.
- Consulter le cours uniquement après avoir identifié précisément le blocage.
- Ne pas utiliser la solution de l'évaluation finale comme exemple.

## 🌺 EXERCICE 1 — RESTITUTION

Sans consulter le cours, définir **MOVE CORRESPONDING (STRUCTURES)**, expliquer son utilité et citer une erreur d'utilisation possible.

## 🌺 EXERCICE 2 — MISE EN PRATIQUE

- [ ] Copier uniquement les champs correspondants entre deux structures dans un exemple différent de celui du cours.
- [ ] Comprendre comment fonctionne la correspondance par nom de champ dans un exemple différent de celui du cours.
- [ ] Savoir ignorer les champs non communs dans un exemple différent de celui du cours.
- [ ] Comprendre la différence entre `MOVE` et `MOVE-CORRESPONDING` dans un exemple différent de celui du cours.
- [ ] Utiliser `MOVE-CORRESPONDING` avec des structures dynamiques dans un exemple différent de celui du cours.

### Exercice repris du cours

### 🍧 1 – COPIER LES CHAMPS COMMUNS ENTRE DEUX STRUCTURES

> [!IMPORTANT]
> Copier uniquement les champs `name` et `country` de `ls_person_src` vers `ls_person_dest`.

<details>
  <summary>SOLUTION</summary>

    MOVE-CORRESPONDING ls_person_src TO ls_person_dest.
    WRITE:/ 'Nom:', ls_person_dest-name, 'Pays:', ls_person_dest-country.

</details>

---

### 🍧 2 – STRUCTURES AVEC CHAMP INEXISTANT

> [!IMPORTANT]
> Ajouter un champ `zipcode` dans la destination et observer que sa valeur reste inchangée.

<details>
  <summary>SOLUTION</summary>

    TYPES: BEGIN OF ty_person_dest_zip,
             name    TYPE char20,
             country TYPE char3,
             zipcode TYPE char5,
           END OF ty_person_dest_zip.

    DATA: ls_person_dest_zip TYPE ty_person_dest_zip.

    MOVE-CORRESPONDING ls_person_src TO ls_person_dest_zip.

    WRITE:/ 'Nom:', ls_person_dest_zip-name,
             'Pays:', ls_person_dest_zip-country,
             'ZipCode:', ls_person_dest_zip-zipcode.

</details>

---

### 🍧 3 – UTILISER DES FIELD-SYMBOLS DYNAMIQUES

> [!IMPORTANT]
> Copier le contenu d’une structure vers une autre via des FIELD-SYMBOLS.

<details>
  <summary>SOLUTION</summary>

    FIELD-SYMBOLS: <fs_src>  TYPE any,
                   <fs_dest> TYPE any.

    ASSIGN ls_person_src  TO <fs_src>.
    ASSIGN ls_person_dest TO <fs_dest>.

    IF <fs_src> IS ASSIGNED AND <fs_dest> IS ASSIGNED.
      MOVE-CORRESPONDING <fs_src> TO <fs_dest>.
    ENDIF.

</details>

---

## 🌺 EXERCICE 3 — DIAGNOSTIC

1. Construire volontairement un cas incorrect lié à **MOVE CORRESPONDING (STRUCTURES)**.
2. Décrire le symptôme observable.
3. Identifier la cause technique ou fonctionnelle.
4. Corriger le cas et prouver la non-régression avec un cas nominal et un cas limite.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le résultat peut être expliqué sans relire le cours.
- [ ] L'exemple est exécutable ou vérifiable.
- [ ] Le cas d'erreur est distingué du cas nominal.
- [ ] Aucun élément propre à la solution de l'évaluation finale n'est utilisé.
