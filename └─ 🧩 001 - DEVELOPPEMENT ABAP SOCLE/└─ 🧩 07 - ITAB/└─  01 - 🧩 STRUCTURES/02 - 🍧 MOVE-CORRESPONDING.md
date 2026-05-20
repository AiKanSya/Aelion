# 🌸 MOVE CORRESPONDING (STRUCTURES)

## 🌺 OBJECTIFS

- [ ] Copier uniquement les champs correspondants entre deux structures
- [ ] Comprendre comment fonctionne la correspondance par nom de champ
- [ ] Savoir ignorer les champs non communs
- [ ] Comprendre la différence entre `MOVE` et `MOVE-CORRESPONDING`
- [ ] Utiliser `MOVE-CORRESPONDING` avec des structures dynamiques

## 🌺 DEFINITION

    MOVE-CORRESPONDING struc_source TO struc_target.

> L’instruction `MOVE-CORRESPONDING` permet de copier uniquement les champs de même nom entre deux structures.

> [!IMPORTANT]
>
> - Les champs doivent avoir le même nom (la casse n’a pas d’importance).
> - Les champs non présents dans la destination sont ignorés.
> - Les champs non présents dans la source restent inchangés dans la destination.

> [!TIP]
> Imaginez deux fiches administratives
>
> - La première contient _Nom, Prénom, Pays, Âge_
> - La seconde contient _Nom, Pays, Code postal_  
>   → `MOVE-CORRESPONDING` ne copiera que Nom et Pays.

## 🌺 EXEMPLE 1 – STRUCTURES AVEC CHAMPS COMMUNS

    TYPES: BEGIN OF ty_person_src,
             name    TYPE char20,
             country TYPE char3,
             age     TYPE i,
           END OF ty_person_src.

    TYPES: BEGIN OF ty_person_dest,
             country TYPE char3,
             name    TYPE char20,
             zipcode TYPE char5,
           END OF ty_person_dest.

    DATA: ls_person_src  TYPE ty_person_src,
          ls_person_dest TYPE ty_person_dest.

    " --- INITIALISATION DE LA STRUCTURE SOURCE ---
    ls_person_src-name    = 'Luis'.
    ls_person_src-country = 'ES'.
    ls_person_src-age     = 32.

    " --- INITIALISATION DE LA STRUCTURE DESTINATION ---
    ls_person_dest-zipcode = '75000'.

    " --- COPIE DES CHAMPS CORRESPONDANTS ---
    MOVE-CORRESPONDING ls_person_src TO ls_person_dest.

    " --- AFFICHAGE DU RESULTAT ---
    WRITE:/ 'Nom     :', ls_person_dest-name.
    WRITE:/ 'Pays    :', ls_person_dest-country.
    WRITE:/ 'CodeZip :', ls_person_dest-zipcode.

> [!IMPORTANT]
>
> - `name` et `country` sont copiés car ils existent dans les deux structures.
> - `zipcode` reste inchangé, car il n’existe pas dans la source.
> - `age` n’est pas transféré car il n’existe pas dans la destination.

> [!NOTE]
> Le `MOVE-CORRESPONDING` n’émet pas d’erreur même si les structures ne sont pas identiques — il copie uniquement ce qu’il peut.

## 🌺 EXEMPLE 2 – DIFFERENCE ENTRE MOVE ET MOVE-CORRESPONDING

    TYPES: BEGIN OF ty_employee_src,
             id       TYPE i,
             name     TYPE char20,
             position TYPE char10,
           END OF ty_employee_src.

    TYPES: BEGIN OF ty_employee_dest,
             name TYPE char20,
             id   TYPE i,
           END OF ty_employee_dest.

    DATA: ls_emp_src  TYPE ty_employee_src,
          ls_emp_dest TYPE ty_employee_dest.

    ls_emp_src-id       = 100.
    ls_emp_src-name     = 'Claire'.
    ls_emp_src-position = 'DEV'.

    " --- COPIE SIMPLE ---
    MOVE ls_emp_src TO ls_emp_dest.

    WRITE:/ 'MOVE simple -> Nom:', ls_emp_dest-name,
             'ID:', ls_emp_dest-id.

    " --- REMISE A ZERO ---
    CLEAR ls_emp_dest.

    " --- COPIE AVEC MOVE-CORRESPONDING ---
    MOVE-CORRESPONDING ls_emp_src TO ls_emp_dest.

    WRITE:/ 'MOVE-CORRESPONDING -> Nom:', ls_emp_dest-name,
             'ID:', ls_emp_dest-id.

> [!IMPORTANT]
>
> - `MOVE` copie les valeurs champ par champ dans l’ordre de déclaration → erreur si structures incompatibles.
> - `MOVE-CORRESPONDING` copie par nom → plus sûr et plus souple.

> [!CAUTION]
> Le `MOVE` peut produire des erreurs ou des incohérences si l’ordre ou le type des champs diffère.

## 🌺 EXEMPLE 3 – STRUCTURES DYNAMIQUES AVEC FIELD-SYMBOLS

    FIELD-SYMBOLS: <fs_src>  TYPE any,
                   <fs_dest> TYPE any.

    DATA: ls_src  TYPE ty_person_src,
          ls_dest TYPE ty_person_dest.

    ASSIGN ls_src  TO <fs_src>.
    ASSIGN ls_dest TO <fs_dest>.

    ls_src-name    = 'Renata'.
    ls_src-country = 'BR'.
    ls_src-age     = 29.

    IF <fs_src> IS ASSIGNED AND <fs_dest> IS ASSIGNED.
      MOVE-CORRESPONDING <fs_src> TO <fs_dest>.
    ENDIF.

    WRITE:/ 'Nom:', ls_dest-name, 'Pays:', ls_dest-country.

> [!TIP]
> Utile dans les programmes génériques où les structures sont connues à l’exécution seulement.

> [!IMPORTANT]
> Utile quand on manipule des structures définies dynamiquement (par exemple via un dictionnaire de données ou une sélection utilisateur).

## 🌺 BONNES PRATIQUES

| 🍧 Bonne pratique                                   | 🍧 Explication                                           |
| --------------------------------------------------- | -------------------------------------------------------- |
| Vérifier les noms de champs                         | Le transfert dépend uniquement du nom du champ           |
| Préférer MOVE-CORRESPONDING pour structures proches | Permet d’éviter les erreurs de type ou d’ordre           |
| Initialiser la destination avant transfert          | Évite les valeurs résiduelles dans les champs non copiés |
| Ne pas abuser du MOVE simple                        | `MOVE` ne gère pas les différences de structure          |
| Utiliser FIELD-SYMBOLS pour programmes génériques   | Rend le code réutilisable et plus flexible               |

## 🌺 EXERCICES

### 🔹 1 – COPIER LES CHAMPS COMMUNS ENTRE DEUX STRUCTURES

> [!IMPORTANT]
> Copier uniquement les champs `name` et `country` de `ls_person_src` vers `ls_person_dest`.

<details>
  <summary>SOLUTION</summary>

    MOVE-CORRESPONDING ls_person_src TO ls_person_dest.
    WRITE:/ 'Nom:', ls_person_dest-name, 'Pays:', ls_person_dest-country.

</details>

---

### 🔹 2 – STRUCTURES AVEC CHAMP INEXISTANT

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

### 🔹 3 – UTILISER DES FIELD-SYMBOLS DYNAMIQUES

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

## 🌺 RESUME

> `MOVE-CORRESPONDING` entre structures permet de transférer uniquement les champs portant le même nom.
>
> - Ignore les champs non communs
> - Copie sûre, sans erreur de type
> - Compatible avec structures dynamiques via FIELD-SYMBOLS
> - Alternative plus flexible à `MOVE`
>
> [!TIP]
> Copier les informations communes entre deux formulaires différents, sans toucher à ce qui ne correspond pas.
