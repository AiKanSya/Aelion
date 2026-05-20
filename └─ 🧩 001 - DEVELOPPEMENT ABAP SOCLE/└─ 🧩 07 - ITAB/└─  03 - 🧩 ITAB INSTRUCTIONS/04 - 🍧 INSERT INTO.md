# 🌸 INSERT INTO ITAB

## 🌺 OBJECTIFS

- [ ] Comprendre le fonctionnement de l’instruction `INSERT` pour les tables internes
- [ ] Savoir insérer une structure, une ligne vide ou des lignes d’une autre table
- [ ] Maîtriser l’insertion à un index précis dans la table cible
- [ ] Simplifier le code en évitant des boucles manuelles pour ajouter plusieurs lignes

## 🌺 DEFINITION

> L’instruction `INSERT` permet d’ajouter des lignes dans une table interne (`itab`).  
> Elle peut provenir de différentes sources
>
> - Une structure (`ls`)
> - Une ligne vide (`INITIAL LINE`)
> - Une autre table interne (`LINES OF jtab`) avec possibilité de spécifier un intervalle (`FROM idx1 TO idx2`)

> [!TIP]
> Imaginez un classeur de fiches
>
> - Ajouter une fiche complète (structure)
> - Glisser une page blanche (`INITIAL LINE`)
> - Copier certaines pages d’un autre classeur (`LINES OF`) à une position précise

> [!NOTE]
>
> - L’option `INDEX` permet de contrôler l’ordre final des lignes.
> - Si aucun `INDEX` n’est spécifié, la ligne est ajoutée en fin de table.
> - Très pratique pour insérer plusieurs lignes d’un coup, sans boucle.

## 🌺 DECLARATION ET EXEMPLE

    TYPES: BEGIN OF ty_citizen,
             country TYPE char3,
             name    TYPE char20,
             age     TYPE numc2,
           END OF ty_citizen.

    DATA: lt_citizen1 TYPE TABLE OF ty_citizen,
          lt_citizen2 TYPE TABLE OF ty_citizen,
          ls_citizen  TYPE ty_citizen.

### 1️⃣ INSERTION D'UNE STRUCTURE DANS LA TABLE

    ls_citizen-country = 'FR'.
    ls_citizen-name    = 'Thierry'.
    ls_citizen-age     = '24'.
    INSERT ls_citizen INTO TABLE lt_citizen1.

### 2️⃣ CREATION DE PLUSIEURS ENREGISTREMENT DANS UNE AUTRE TABLE

    ls_citizen-country = 'ES'.
    ls_citizen-name    = 'Luis'.
    ls_citizen-age     = '32'.
    INSERT ls_citizen INTO TABLE lt_citizen2.

    ls_citizen-country = 'BR'.
    ls_citizen-name    = 'Renata'.
    ls_citizen-age     = '27'.
    INSERT ls_citizen INTO TABLE lt_citizen2.

    ls_citizen-country = 'FR'.
    ls_citizen-name    = 'Floriane'.
    ls_citizen-age     = '32'.
    INSERT ls_citizen INTO TABLE lt_citizen2.

### 3️⃣ INSERTION D'UNE LIGNE VIDE A UN INDEX PRECIS

    INSERT INITIAL LINE INTO lt_citizen1 INDEX 1.

### 4️⃣ INSERTION DE PLUSIEURS LIGNES D'UNE AUTRE TABLE

    INSERT LINES OF lt_citizen2 FROM 2 TO 3 INTO lt_citizen1 INDEX 1.

> [!IMPORTANT]
>
> - Une structure sert de modèle de ligne pour la table interne.
> - On peut insérer une ligne unique, une ligne vide ou plusieurs lignes d’une autre table.
> - L’ordre des lignes est contrôlé par `INDEX`.

## 🌺 RESULTAT FINAL DE LT_CITIZEN1

| 🍧 COUNTRY | 🍧 NAME  | 🍧 AGE |
| :--------: | -------- | :----: |
|     BR     | Renata   |   27   |
|     FR     | Floriane |   32   |
|            |          |        |
|     FR     | Thierry  |   24   |

> [!NOTE]
> L’ordre final reflète la position des insertions et l’usage des `INDEX`.

## 🌺 BONNES PRATIQUES

| 🍧 Bonne pratique                          | 🍧 Explication                                   |
| ------------------------------------------ | ------------------------------------------------ |
| Définir clairement les structures          | Facilite la lecture et la maintenance            |
| Préciser l’index si nécessaire             | Contrôle l’ordre final des enregistrements       |
| Utiliser `LINES OF` pour copier des plages | Évite les boucles manuelles et simplifie le code |
| Vérifier la présence de la table cible     | Prévenir les erreurs d’insertion                 |

## 🌺 EXERCICES

### 🔹 1 – CREER ET INSERER DES ENREGISTREMENTS

> [!IMPORTANT]
> Déclarer une table interne `lt_employees` avec une structure `ty_employee`
>
> - id (CHAR5)
> - nom (CHAR20)
> - departement (CHAR10)
>
> Insérer deux employés et afficher les données.

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

### 🔹 2 – INSERER UNE LIGNE VIDE

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

### 🔹 3 – COPIER DES LIGNES D’UNE AUTRE TABLE

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

## 🌺 RESUME

> - `INSERT` → ajouter une ligne, une ligne vide ou plusieurs lignes d’une autre table.
> - `INDEX` → contrôle la position de la ou des lignes.
>
> [!TIP]
> glisser des fiches dans un classeur à l’emplacement désiré, en copiant ou créant de nouvelles fiches.
>
> [!IMPORTANT]
> définir clairement la structure, vérifier la table cible et éviter les boucles pour insérer plusieurs lignes.
