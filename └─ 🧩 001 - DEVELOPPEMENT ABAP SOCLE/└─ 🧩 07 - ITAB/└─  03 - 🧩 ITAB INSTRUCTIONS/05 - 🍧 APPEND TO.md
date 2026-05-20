# 🌸 APPEND TO ITAB

## 🌺 OBJECTIFS

- [ ] Comprendre le fonctionnement de l’instruction `APPEND` pour les tables internes
- [ ] Savoir ajouter une structure, une ligne vide, ou des lignes d’une autre table à la fin d’une table
- [ ] Identifier les limitations selon le type de table interne
- [ ] Comparer `APPEND` et `INSERT` selon le type de table

## 🌺 DEFINITION

       APPEND { ls | {INITIAL LINE} | {LINES OF jtab [FROM idx1] [TO idx2]} }
              TO itab.

> L’instruction `APPEND` ajoute des données toujours à la fin d’une table interne (`itab`).  
> Elle fonctionne comme `INSERT`, mais le paramètre de destination est toujours `TO itab`.

> [!TIP]
> Imaginez un classeur :
>
> - Vous collez toujours les nouvelles fiches à la fin.
> - Vous pouvez :
>   - Ajouter une fiche complète (`STRUCTURE`)
>   - Glisser une page blanche (`INITIAL LINE`)
>   - Copier des pages d’une autre table interne (`LINES OF itab`)

> [!TIP]
>
> - `APPEND` est simple et rapide pour `STANDARD` et `RANGE TABLE`.
> - Pour `HASHED` ou `SORTED TABLE`, il faut utiliser `INSERT INTO TABLE` pour respecter les contraintes.

## 🌺 EXEMPLE STANDARD TABLE

    ls_citizen-country = 'ES'.
    ls_citizen-name    = 'Luiza'.
    ls_citizen-age     = '31'.
    APPEND ls_citizen TO lt_citizen1.

    ls_citizen-country = 'BR'.
    ls_citizen-name    = 'Felipe'.
    ls_citizen-age     = '25'.
    APPEND ls_citizen TO lt_citizen1.

> Contenu final de `lt_citizen1` :

| 🍧 COUNTRY | 🍧 NAME  | 🍧 AGE |
| :--------: | -------- | :----: |
|     BR     | Renata   |   27   |
|     FR     | Floriane |   32   |
|            |          |        |
|     FR     | Thierry  |   24   |
|     ES     | Luiza    |   31   |
|     BR     | Felipe   |   25   |

## 🌺 LIMITATIONS POUR SORTED ET HASHED TABLE

> [!CAUTION]
>
> - `APPEND` fonctionne uniquement pour `STANDARD` et `RANGE TABLE`.
> - Pour `HASHED` ou `SORTED TABLE`, il faut `INSERT INTO TABLE`.
> - Sur une `SORTED TABLE`, ajouter en fin peut violé l’ordre défini par la clé → `DUMP`.

### EXEMPLE SORTED TABLE – DUMP

    TYPES: BEGIN OF ty_country,
             land TYPE char3,
           END OF ty_country.

    DATA: lt_country TYPE SORTED TABLE OF ty_country WITH NON-UNIQUE KEY land,
          ls_country TYPE ty_country.

    ls_country-land = 'ES'.
    APPEND ls_country TO lt_country.

    ls_country-land = 'BR'.
    APPEND ls_country TO lt_country.  " DUMP : ordre non respecté

### EXEMPLE SORTED TABLE – PAS DE DUMP

    ls_country-land = 'BR'.
    APPEND ls_country TO lt_country.

    ls_country-land = 'ES'.
    APPEND ls_country TO lt_country.  " Ordre respecté, pas de DUMP

> [!IMPORTANT]
>
> - APPEND ne contrôle pas l’ordre sur SORTED TABLE.
> - L’usage correct dépend de la clé et de l’ordre défini.
> - HASHED TABLE ne peut jamais utiliser APPEND car il n’y a pas d’ordre séquentiel.

## 🌺 BONNES PRATIQUES

| 🍧 Bonne pratique                              | 🍧 Explication                                  |
| ---------------------------------------------- | ----------------------------------------------- |
| Vérifier le type de table avant APPEND         | Évite DUMP sur SORTED ou HASHED TABLE           |
| Utiliser APPEND uniquement pour STANDARD/RANGE | Garantit insertion en fin sans violation de clé |
| Pour SORTED/HASHED TABLE, privilégier INSERT   | Maintient l’ordre ou l’unicité des clés         |
| Vérifier l’ordre des clés avant insertion      | Prévenir erreurs et DUMP                        |

## 🌺 EXERCICES

### 🔹 1 – AJOUTER DES EMPLOYES A UNE STANDARD TABLE

> [!IMPORTANT]
> Déclarer `lt_employees` avec la structure `ty_employee` :
>
> - id (CHAR5)
> - nom (CHAR20)
> - departement (CHAR10)
>
> Ajouter deux employés avec APPEND et afficher la table.

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

### 🔹 2 – AJOUTER UNE LIGNE VIDE

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

### 🔹 3 – COPIER DES LIGNES D’UNE AUTRE TABLE

> [!IMPORTANT]  
> Copier toutes les lignes de `lt_new_employees` à la fin de `lt_employees`.

<details>
  <summary>SOLUTION</summary>

    INSERT LINES OF lt_new_employees INTO TABLE lt_employees.  " ou APPEND si STANDARD

</details>

## 🌺 RESUME

> - `APPEND` → ajoute toujours à la fin d’une table interne.
> - Compatible avec `STANDARD` et `RANGE`, interdit sur `SORTED`/`HASHED` sauf précaution.
>
> [!CAUTION]
> DUMP si l’ordre est violé sur `SORTED TABLE`.
>
> [!TIP]
> coller de nouvelles fiches à la fin d’un classeur, en respectant l’ordre si nécessaire.
>
> [!IMPORTANT]
> vérifier le type de table et utiliser `INSERT` pour `SORTED`/`HASHED`.
