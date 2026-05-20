# 🌸 SORT

## 🌺 OBJECTIFS

- [ ] Comprendre le fonctionnement de l’instruction `SORT` pour les tables internes
- [ ] Savoir trier selon la clé primaire ou des champs spécifiques
- [ ] Identifier les options `ASCENDING`, `DESCENDING`, `AS TEXT` et `STABLE`
- [ ] Savoir quand trier avant certaines opérations comme `DELETE ADJACENT DUPLICATES`

## 🌺 DEFINITION

    SORT itab [ASCENDING|DESCENDING] [AS TEXT] [STABLE]
                BY c1 [ASCENDING|DESCENDING] [AS TEXT]
                  ...
                    cn [ASCENDING|DESCENDING] [AS TEXT].

> L’instruction `SORT` organise une table interne (`itab`) de type `STANDARD` ou `HASHED` selon
>
> - sa clé primaire si définie
> - ou une liste de champs `c1` à `cn`
>
> [!NOTE]
>
> - `ASCENDING` / `DESCENDING` : tri croissant ou décroissant
> - `AS TEXT` : tri des chaînes de caractères selon la langue locale définie par `SET LOCALE LANGUAGE`
> - `STABLE` : maintien de l’ordre relatif pour les valeurs égales

> [!TIP]
> Imaginez un classeur de fiches
>
> - Vous pouvez trier par identifiant, nom ou plusieurs critères combinés (ex. nom puis âge)
> - L’option `STABLE` garantit que les fiches ayant le même critère restent dans le même ordre relatif

> [!NOTE]
>
> - Les tables `SORTED` ne peuvent pas être triées avec `SORT`, car leur ordre est fixe
> - Le tri est obligatoire avant certaines opérations comme `DELETE ADJACENT DUPLICATES` pour STANDARD TABLE

## 🌺 EXEMPLES

### TRI SIMPLE

    TYPES: BEGIN OF ty_citizen,
             country TYPE char3,
             name    TYPE char20,
             age     TYPE numc2,
           END OF ty_citizen.

    DATA: lt_citizen TYPE STANDARD TABLE OF ty_citizen,
          ls_citizen TYPE ty_citizen.

    " Ajout des données
    ls_citizen-country = 'FR'.
    ls_citizen-name    = 'Thierry'.
    ls_citizen-age     = '24'.
    APPEND ls_citizen TO lt_citizen.

    ls_citizen-country = 'ES'.
    ls_citizen-name    = 'Luis'.
    ls_citizen-age     = '32'.
    APPEND ls_citizen TO lt_citizen.

    ls_citizen-country = 'BR'.
    ls_citizen-name    = 'Renata'.
    ls_citizen-age     = '27'.
    APPEND ls_citizen TO lt_citizen.

    ls_citizen-country = 'FR'.
    ls_citizen-name    = 'Floriane'.
    ls_citizen-age     = '32'.
    APPEND ls_citizen TO lt_citizen.

### TRI DESCENDANT SUR TOUTE LA TABLE

    SORT lt_citizen DESCENDING.

### TRI PAR CHAMPS SPECIFIQUES

    SORT lt_citizen BY country ASCENDING age DESCENDING.

> [!IMPORTANT]
>
> - Si aucun `BY` n’est spécifié et qu’il n’existe pas de clé primaire, le tri peut être instable et aléatoire
> - `STABLE` garantit un résultat identique lors de tris multiples
> - Obligatoire avant `DELETE ADJACENT DUPLICATES` pour `STANDARD TABLE`

## 🌺 BONNES PRATIQUES

| 🍧 Bonne pratique                      | 🍧 Explication                               |
| -------------------------------------- | -------------------------------------------- |
| Toujours préciser les champs pour BY   | Évite un tri aléatoire sur STANDARD TABLE    |
| Utiliser ASCENDING ou DESCENDING       | Contrôle le sens du tri                      |
| Utiliser AS TEXT pour chaînes locales  | Respecte l’ordre linguistique                |
| STABLE pour tris répétitifs            | Maintient l’ordre relatif des valeurs égales |
| Trier avant DELETE ADJACENT DUPLICATES | Assure la suppression correcte des doublons  |

## 🌺 RESUME

> `SORT` organise les lignes d’une table interne selon une clé primaire ou des champs spécifiques.
>
> [!NOTE]
> Le `ASCENDING`, `DESCENDING`, `AS TEXT`, `STABLE`
>
> [!TIP]
> trier un classeur selon un ou plusieurs critères tout en gardant l’ordre relatif des doublons si nécessaire
