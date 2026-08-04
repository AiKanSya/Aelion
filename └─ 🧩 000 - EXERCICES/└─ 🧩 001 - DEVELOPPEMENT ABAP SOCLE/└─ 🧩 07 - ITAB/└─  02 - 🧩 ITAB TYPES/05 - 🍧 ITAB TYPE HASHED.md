# 🌸 EXERCICES — TYPE HASHED TABLE

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [TYPE HASHED TABLE](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  02 - 🧩 ITAB TYPES/05 - 🍧 ITAB TYPE HASHED.md>)

## 🌺 CONSIGNES

- Réaliser les exercices sans consulter le cours lors du premier essai.
- Produire une preuve vérifiable : code, résultat, capture ou explication structurée.
- Consulter le cours uniquement après avoir identifié précisément le blocage.
- Ne pas utiliser la solution de l'évaluation finale comme exemple.

## 🌺 EXERCICE 1 — RESTITUTION

Sans consulter le cours, définir **TYPE HASHED TABLE**, expliquer son utilité et citer une erreur d'utilisation possible.

## 🌺 EXERCICE 2 — MISE EN PRATIQUE

- [ ] Comprendre le fonctionnement d’une `HASHED TABLE` dans un exemple différent de celui du cours.
- [ ] Identifier les différences avec une `SORTED TABLE` dans un exemple différent de celui du cours.
- [ ] Savoir déclarer correctement la clé unique obligatoire (`WITH UNIQUE KEY`) dans un exemple différent de celui du cours.
- [ ] Savoir insérer et lire directement des lignes via la clé dans un exemple différent de celui du cours.

### Exercice repris du cours

### 🍧 1 – CREER UNE HASHED TABLE DE CLIENTS

> [!IMPORTANT]
> Déclarer une table interne `lt_clients` avec une structure `ty_client` contenant
>
> - id (CHAR10) → clé unique
> - nom (CHAR20)
> - ville (CHAR20)
>   Ajouter au moins deux clients.

<details>
  <summary>SOLUTION</summary>

    TYPES: BEGIN OF ty_client,
             id   TYPE char10,
             nom  TYPE char20,
             ville TYPE char20,
           END OF ty_client.

    DATA: lt_clients TYPE HASHED TABLE OF ty_client
                          WITH UNIQUE KEY id,
          ls_client TYPE ty_client.

    ls_client-id    = 'C002'.
    ls_client-nom   = 'Martin'.
    ls_client-ville = 'Paris'.
    INSERT ls_client INTO TABLE lt_clients.

    ls_client-id    = 'C001'.
    ls_client-nom   = 'Dupont'.
    ls_client-ville = 'Lyon'.
    INSERT ls_client INTO TABLE lt_clients.

</details>

---

## 🌺 EXERCICE 3 — DIAGNOSTIC

1. Construire volontairement un cas incorrect lié à **TYPE HASHED TABLE**.
2. Décrire le symptôme observable.
3. Identifier la cause technique ou fonctionnelle.
4. Corriger le cas et prouver la non-régression avec un cas nominal et un cas limite.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le résultat peut être expliqué sans relire le cours.
- [ ] L'exemple est exécutable ou vérifiable.
- [ ] Le cas d'erreur est distingué du cas nominal.
- [ ] Aucun élément propre à la solution de l'évaluation finale n'est utilisé.
