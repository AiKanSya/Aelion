# 🌸 EXERCICES — WHILE ENDWHILE - CONTROLE DES BOUCLES CONDITIONNELLES

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [WHILE ENDWHILE - CONTROLE DES BOUCLES CONDITIONNELLES](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 06 - BOUCLES/02 - 🍧 WHILE.md>)

## 🌺 CONSIGNES

- Réaliser les exercices sans consulter le cours lors du premier essai.
- Produire une preuve vérifiable : code, résultat, capture ou explication structurée.
- Consulter le cours uniquement après avoir identifié précisément le blocage.
- Ne pas utiliser la solution de l'évaluation finale comme exemple.

## 🌺 EXERCICE 1 — RESTITUTION

Sans consulter le cours, définir **WHILE ENDWHILE - CONTROLE DES BOUCLES CONDITIONNELLES**, expliquer son utilité et citer une erreur d'utilisation possible.

## 🌺 EXERCICE 2 — MISE EN PRATIQUE

- [ ] Comprendre le fonctionnement de `WHILE ... ENDWHILE` dans un exemple différent de celui du cours.
- [ ] Savoir structurer une condition logique pour éviter les boucles infinies dans un exemple différent de celui du cours.
- [ ] Différencier `WHILE` et `DO ... ENDDO` dans un exemple différent de celui du cours.
- [ ] Utiliser `CHECK`, `EXIT`, `CONTINUE` à l’intérieur d’une boucle `WHILE` dans un exemple différent de celui du cours.
- [ ] Concevoir des boucles conditionnelles avec gestion dynamique du flux dans un exemple différent de celui du cours.
- [ ] Identifier les erreurs fréquentes et leurs causes dans un exemple différent de celui du cours.

### Exercice repris du cours

### 🍧 1 – BOUCLE SIMPLE

> [!IMPORTANT]
> Afficher les nombres de 1 à 10 avec une boucle `WHILE`.

<details>
  <summary>SOLUTION</summary>

    DATA lv_index TYPE i VALUE 1.

    WHILE lv_index <= 10.
      WRITE:/ lv_index.
      lv_index = lv_index + 1.
    ENDWHILE.

</details>

---

### 🍧 2 – BOUCLE AVEC CONTINUE

> [!IMPORTANT]
> Afficher les nombres de 1 à 10 en sautant les multiples de 3.

<details>
  <summary>SOLUTION</summary>

    DATA lv_index TYPE i VALUE 0.

    WHILE lv_index < 10.
      lv_index = lv_index + 1.
      IF lv_index MOD 3 = 0.
        CONTINUE.
      ENDIF.
      WRITE:/ lv_index.
    ENDWHILE.

</details>

---

### 🍧 3 – BOUCLE AVEC CHECK

> [!IMPORTANT]
> Afficher uniquement les nombres supérieurs ou égaux à 5.

<details>
  <summary>SOLUTION</summary>

    DATA lv_index TYPE i VALUE 0.

    WHILE lv_index < 10.
      lv_index = lv_index + 1.
      CHECK lv_index >= 5.
      WRITE:/ lv_index.
    ENDWHILE.

</details>

---

### 🍧 4 – BOUCLE AVEC EXIT

> [!IMPORTANT]
> Afficher les nombres de 1 à 20 et arrêter la boucle dès que `lv_index` atteint 8.

<details>
  <summary>SOLUTION</summary>

    DATA lv_index TYPE i VALUE 1.

    WHILE lv_index <= 20.
      IF lv_index > 8.
        EXIT.
      ENDIF.
      WRITE:/ lv_index.
      lv_index = lv_index + 1.
    ENDWHILE.

</details>

---

### 🍧 5 – BOUCLE COMPLETE (CHECK + CONTINUE + EXIT)

> [!IMPORTANT]
> Afficher les nombres impairs à partir de 3, mais arrêter après 11.

<details>
  <summary>SOLUTION</summary>

    DATA lv_index TYPE i VALUE 0.

    WHILE lv_index < 20.
      lv_index = lv_index + 1.
      CHECK lv_index >= 3.
      IF lv_index MOD 2 = 0.
        CONTINUE.
      ENDIF.
      IF lv_index > 11.
        EXIT.
      ENDIF.
      WRITE:/ lv_index.
    ENDWHILE.

</details>

---

## 🌺 EXERCICE 3 — DIAGNOSTIC

1. Construire volontairement un cas incorrect lié à **WHILE ENDWHILE - CONTROLE DES BOUCLES CONDITIONNELLES**.
2. Décrire le symptôme observable.
3. Identifier la cause technique ou fonctionnelle.
4. Corriger le cas et prouver la non-régression avec un cas nominal et un cas limite.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le résultat peut être expliqué sans relire le cours.
- [ ] L'exemple est exécutable ou vérifiable.
- [ ] Le cas d'erreur est distingué du cas nominal.
- [ ] Aucun élément propre à la solution de l'évaluation finale n'est utilisé.
