# 🌸 WHILE ENDWHILE - CONTROLE DES BOUCLES CONDITIONNELLES

## 🌺 OBJECTIFS

- [ ] Comprendre le fonctionnement de `WHILE ... ENDWHILE`
- [ ] Savoir structurer une condition logique pour éviter les boucles infinies
- [ ] Différencier `WHILE` et `DO ... ENDDO`
- [ ] Utiliser `CHECK`, `EXIT`, `CONTINUE` à l’intérieur d’une boucle `WHILE`
- [ ] Concevoir des boucles conditionnelles avec gestion dynamique du flux
- [ ] Identifier les erreurs fréquentes et leurs causes

## 🌺 DEFINITION

> L’instruction `WHILE` exécute un bloc d’instructions tant qu’une condition logique est vraie.  
> À chaque itération, la condition est réévaluée. Lorsque celle-ci devient fausse, la boucle s’arrête.

> [!TIP]
> On verse de l’eau tant que le verre n’est pas plein.  
> Dès que le verre déborde, on arrête de verser.

> [!CAUTION]
> Si la variable de condition n’est pas modifiée à l’intérieur de la boucle, celle-ci devient infinie.

## 🌺 SYNTAXE GENERALE

    WHILE log_exp.
      [bloc_instructions]
    ENDWHILE.

- `log_exp` → condition logique de poursuite
- `bloc_instructions` → instructions exécutées tant que la condition est vraie

> [!IMPORTANT]
> La vérification de la condition se fait avant chaque itération.  
> Si elle est fausse dès le départ, la boucle ne s’exécute jamais.

> [!IMPORTANT]
> Pour traiter des séquences où le nombre d’itérations dépend d’une condition dynamique.

## 🌺 DIFFERENCE AVEC DO ... ENDDO

| INSTRUCTION          | CONTROLE                      | TYPE DE SORTIE | RISQUE                                   |
| -------------------- | ----------------------------- | -------------- | ---------------------------------------- |
| `DO ... ENDDO`       | Fixe (n TIMES ou EXIT)        | interne        | boucle infinie si absence de condition   |
| `WHILE ... ENDWHILE` | Dynamique (condition logique) | externe        | boucle infinie si condition non modifiée |

> [!NOTE]
> Le `DO` compte les tours, `WHILE` observe une condition.

## 🌺 WHILE SIMPLE

    DATA lv_index TYPE i VALUE 1.

    WHILE lv_index <= 5.
      WRITE:/ 'Itération', lv_index.
      lv_index = lv_index + 1.
    ENDWHILE.

> [!IMPORTANT]
> La boucle s’exécute tant que `lv_index` est inférieur ou égal à 5.  
> Elle s’arrête naturellement quand la condition devient fausse.

> [!TIP]
> On répète une action tant qu’une contrainte n’est pas atteinte (ici, la limite de 5).

## 🌺 WHILE AVEC EXIT

> `EXIT` permet d’interrompre prématurément une boucle, indépendamment de la condition de sortie.

    DATA lv_index TYPE i VALUE 1.

    WHILE lv_index <= 10.
      IF lv_index > 5.
        EXIT.
      ENDIF.
      WRITE:/ 'Tour', lv_index.
      lv_index = lv_index + 1.
    ENDWHILE.

> [!IMPORTANT]
> Même si la condition externe (`lv_index <= 10`) reste vraie, la boucle s’arrête dès que `lv_index` dépasse 5.

> [!CAUTION]
> Utiliser `EXIT` avec modération. Il doit rester lisible et justifié.

## 🌺 WHILE AVEC CHECK

> `CHECK` vérifie une condition interne.  
> Si la condition est fausse, l’itération courante s’interrompt immédiatement.

    DATA lv_index TYPE i VALUE 0.

    WHILE lv_index < 10.
      lv_index = lv_index + 1.
      CHECK lv_index >= 3.
      WRITE:/ 'Valeur :', lv_index.
    ENDWHILE.

> [!IMPORTANT]
> Les deux premières valeurs (1 et 2) sont ignorées.  
> À partir de 3, la boucle exécute le reste du bloc.

> [!IMPORTANT]
> Simplifie la lecture lorsqu’on veut ignorer certains cas sans imbriquer de multiples conditions.

## 🌺 WHILE AVEC CONTINUE

> `CONTINUE` saute le reste du bloc courant et passe à l’itération suivante.

    DATA lv_index TYPE i VALUE 0.

    WHILE lv_index < 10.
      lv_index = lv_index + 1.
      IF lv_index MOD 2 = 0.
        CONTINUE.
      ENDIF.
      WRITE:/ 'Impair :', lv_index.
    ENDWHILE.

> [!IMPORTANT]
> Les valeurs paires sont ignorées, seules les valeurs impaires sont affichées.

> [!CAUTION] > `CONTINUE` ne sort pas de la boucle, il passe seulement à l’itération suivante.

> [!TIP]
> Comme un joueur qui saute un tour sans quitter la partie.

## 🌺 COMBINAISON COMPLETE

    DATA lv_index TYPE i VALUE 0.

    WHILE lv_index < 15.
      lv_index = lv_index + 1.
      CHECK lv_index > 3.
      IF lv_index MOD 2 = 0.
        CONTINUE.
      ENDIF.
      IF lv_index > 10.
        EXIT.
      ENDIF.
      WRITE:/ 'Nombre traité :', lv_index.
    ENDWHILE.

> [!IMPORTANT]
>
> - `CHECK` ignore les valeurs jusqu’à 3
> - `CONTINUE` saute les nombres pairs
> - `EXIT` interrompt la boucle après 10  
>   Résultat : 5, 7, 9

## 🌺 EXERCICES

### 🔹 1 – BOUCLE SIMPLE

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

### 🔹 2 – BOUCLE AVEC CONTINUE

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

### 🔹 3 – BOUCLE AVEC CHECK

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

### 🔹 4 – BOUCLE AVEC EXIT

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

### 🔹 5 – BOUCLE COMPLETE (CHECK + CONTINUE + EXIT)

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

## 🌺 RESUME

> - `WHILE ... ENDWHILE` → exécute tant que la condition reste vraie
> - `EXIT` → quitte la boucle immédiatement
> - `CHECK` → saute les itérations non conformes à une condition
> - `CONTINUE` → passe à l’itération suivante
> - La condition doit être modifiée à chaque tour pour éviter les boucles infinies
>
> [!TIP]
> Remplir un verre
>
> - `WHILE` → tant que le verre n’est pas plein
> - `EXIT` → arrêter de verser même si le verre n’est pas encore rempli
> - `CHECK` → ne pas verser si le verre est déjà trop chaud
> - `CONTINUE` → sauter un verre et passer au suivant
