# 🌸 STRUCTURE

## 🌺 OBJECTIFS

- [ ] Comprendre ce qu’est une `STRUCTURE` et à quoi elle sert
- [ ] Savoir déclarer une `STRUCTURE` avec `TYPES` et `DATA`
- [ ] Savoir remplir les champs d’une `STRUCTURE`
- [ ] Accéder aux valeurs des champs pour lecture ou affichage
- [ ] Appliquer des structures pour organiser des données hétérogènes

## 🌺 DEFINITION

> Une `STRUCTURE` est un regroupement de plusieurs `VARIABLES` de types différents sous un même nom.  
> Elle peut être vue comme une ligne de table où chaque champ correspond à une colonne.  
> Cela permet de manipuler des ensembles de données logiquement liés, sans avoir à gérer chaque variable individuellement.

> [!TIP]
> Pensez à une `STRUCTURE` comme une fiche d’identité d’une personne
>
> - nom
> - prénom
> - date de naissance
> - adresse
>
> Chaque information est un champ, et l’ensemble constitue une `STRUCTURE` unique représentant la personne.

> [!NOTE]
> Les champs d’une `STRUCTURE` peuvent être de types différents : caractères, entiers, dates, etc.

## 🌺 DECLARATION

Pour créer une `STRUCTURE`, on utilise `TYPES` :

    TYPES: BEGIN OF ty_person,
             nom      TYPE char20,
             prenom   TYPE char20,
             age      TYPE i,
             ville    TYPE char20,
          END OF ty_person.

Puis on déclare une variable de structure avec `DATA` :

    DATA: ls_person TYPE ty_person.

> [!TIP]
> Ici, `ls_person` est une fiche vide prête à être remplie avec les informations d’une personne.

> [!TIP]
> Le `BEGIN OF ... END OF` encadre la définition des champs. Chaque champ a un nom et un `TYPE`.

## 🌺 ALIMENTATION DES CHAMPS

Chaque champ de la STRUCTURE est accessible avec le séparateur `-` :

    ls_person-nom    = 'Dupont'.
    ls_person-prenom = 'Jean'.
    ls_person-age    = 35.
    ls_person-ville  = 'Paris'.

Pour afficher les valeurs :

    WRITE: / ls_person-nom, ls_person-prenom, ls_person-age, ls_person-ville.

> [!IMPORTANT]
>
> Résultat : Dupont Jean 35 Paris

> [!TIP]
> On remplit la fiche d’identité avec les informations correspondantes.  
> Chaque champ est indépendant mais appartient à la même `STRUCTURE`.

## 🌺 EXERCICES

### 🔹 1 – CREER UNE STRUCTURE POUR UN LIVRE

> [!IMPORTANT]
> Définir une `STRUCTURE ty_livre` avec les champs
>
> - titre (CHAR30)
> - auteur (CHAR30)
> - annee (I)
> - genre (CHAR20)
>
> Déclarer une `VARIABLE ls_livre` et remplir les champs avec vos informations.

<details>
  <summary>SOLUTION</summary>

    TYPES: BEGIN OF ty_livre,
             titre  TYPE char30,
             auteur TYPE char30,
             annee  TYPE i,
             genre  TYPE char20,
           END OF ty_livre.

    DATA: ls_livre TYPE ty_livre.

    ls_livre-titre  = '1984'.
    ls_livre-auteur = 'George Orwell'.
    ls_livre-annee  = 1949.
    ls_livre-genre  = 'Dystopie'.

    WRITE: / ls_livre-titre, ls_livre-auteur, ls_livre-annee, ls_livre-genre.

</details>

---

### 🔹 2 – ACCEDER A UN CHAMP

> [!IMPORTANT]
> Afficher uniquement l’auteur du livre précédemment déclaré.

<details>
  <summary>SOLUTION</summary>

    WRITE: / ls_livre-auteur.

> [!IMPORTANT]
>
> Résultat : George Orwell

</details>

---

### 🔹 3 – MODIFIER UN CHAMP

> [!IMPORTANT]
> Modifier l’année de publication à 1950 et afficher la nouvelle valeur.

<details>
  <summary>SOLUTION</summary>

    ls_livre-annee = 1950.
    WRITE: / ls_livre-annee.

> [!IMPORTANT]
>
> Résultat : 1950

</details>

## 🌺 RESUME

> - Une `STRUCTURE` regroupe plusieurs champs hétérogènes sous un même nom.
> - Chaque champ est accessible avec `structure-champ`.
> - Permet d’organiser les données de manière logique et claire.
>
> [!TIP]
> fiche d’identité pour une structure, carnet d’adresses pour une table de structures.
>
> [!TIP]
> pour manipuler des données liées, éviter de déclarer des variables individuelles pour chaque information.
