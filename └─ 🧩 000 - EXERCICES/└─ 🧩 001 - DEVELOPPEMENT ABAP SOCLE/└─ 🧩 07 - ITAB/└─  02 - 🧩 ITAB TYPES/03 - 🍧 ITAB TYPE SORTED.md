# 🌸 EXERCICES — ITAB TYPE SORTED TABLE OF

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [ITAB TYPE SORTED TABLE OF](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  02 - 🧩 ITAB TYPES/03 - 🍧 ITAB TYPE SORTED.md>)

## 🌺 CONSIGNES

- Réaliser les exercices sans consulter le cours lors du premier essai.
- Produire une preuve vérifiable : code, résultat, capture ou explication structurée.
- Consulter le cours uniquement après avoir identifié précisément le blocage.
- Ne pas utiliser la solution de l'évaluation finale comme exemple.

## 🌺 EXERCICE 1 — RESTITUTION

Sans consulter le cours, définir **ITAB TYPE SORTED TABLE OF**, expliquer son utilité et citer une erreur d'utilisation possible.

## 🌺 EXERCICE 2 — MISE EN PRATIQUE

- [ ] Comprendre la structure et le comportement d’une table triée (`TYPE SORTED TABLE OF`) dans un exemple différent de celui du cours.
- [ ] Savoir déclarer une clé obligatoire avec `WITH UNIQUE KEY` dans un exemple différent de celui du cours.
- [ ] Identifier les avantages et contraintes de performance dans un exemple différent de celui du cours.
- [ ] Maîtriser l’insertion, la lecture et le tri automatique dans un exemple différent de celui du cours.
- [ ] Appliquer les bonnes pratiques d’utilisation dans un exemple différent de celui du cours.

### Exercice repris du cours

### 🍧 1 – CREER UNE TABLE DE CLIENTS TRIÉE PAR ID

> [!IMPORTANT]
> Déclarer une table `lt_clients` triée par `id` et y insérer trois lignes désordonnées.

<details>
  <summary>SOLUTION</summary>

    TYPES: BEGIN OF ty_client,
             id     TYPE char10,
             nom    TYPE char20,
             prenom TYPE char20,
           END OF ty_client.

    DATA: lt_clients TYPE SORTED TABLE OF ty_client
                         WITH UNIQUE KEY id,
          ls_client  TYPE ty_client.

    ls_client-id = '003'.
    ls_client-nom = 'Durand'.
    ls_client-prenom = 'Alice'.
    INSERT ls_client INTO TABLE lt_clients.

    ls_client-id = '001'.
    ls_client-nom = 'Martin'.
    ls_client-prenom = 'Paul'.
    INSERT ls_client INTO TABLE lt_clients.

    ls_client-id = '002'.
    ls_client-nom = 'Bernard'.
    ls_client-prenom = 'Luc'.
    INSERT ls_client INTO TABLE lt_clients.

    LOOP AT lt_clients INTO ls_client.
      WRITE: / ls_client-id, ls_client-nom.
    ENDLOOP.

</details>

---

### 🍧 2 – TESTER UNE CLÉ DUPLIQUÉE

> [!IMPORTANT]
> Essayer d’insérer une ligne avec un `id` déjà existant et observer le `sy-subrc`.

<details>
  <summary>SOLUTION</summary>

    ls_client-id = '002'.
    ls_client-nom = 'Dupont'.
    ls_client-prenom = 'Jean'.
    INSERT ls_client INTO TABLE lt_clients.

    IF sy-subrc <> 0.
      WRITE: / 'Erreur : clé déjà existante.'.
    ENDIF.

</details>

---

## 🌺 EXERCICE 3 — DIAGNOSTIC

1. Construire volontairement un cas incorrect lié à **ITAB TYPE SORTED TABLE OF**.
2. Décrire le symptôme observable.
3. Identifier la cause technique ou fonctionnelle.
4. Corriger le cas et prouver la non-régression avec un cas nominal et un cas limite.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le résultat peut être expliqué sans relire le cours.
- [ ] L'exemple est exécutable ou vérifiable.
- [ ] Le cas d'erreur est distingué du cas nominal.
- [ ] Aucun élément propre à la solution de l'évaluation finale n'est utilisé.
