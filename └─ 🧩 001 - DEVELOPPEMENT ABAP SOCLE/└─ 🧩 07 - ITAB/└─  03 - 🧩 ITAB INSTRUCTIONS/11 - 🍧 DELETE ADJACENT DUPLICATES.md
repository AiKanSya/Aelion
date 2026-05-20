# 🌸 DELETE ADJACENT DUPLICATES

## 🌺 OBJECTIFS

- [ ] Comprendre le fonctionnement de `DELETE ADJACENT DUPLICATES`
- [ ] Savoir supprimer les doublons dans une table interne selon une clé ou des champs spécifiques
- [ ] Identifier les contraintes liées au type de table et à l’ordre des données
- [ ] Utiliser correctement `COMPARING` pour sélectionner les champs pertinents

## 🌺 DEFINITION

    DELETE ADJACENT DUPLICATES FROM itab
                              [COMPARING {comp1 comp2 ...}].

> L’instruction `DELETE ADJACENT DUPLICATES` supprime les lignes consécutives en doublon dans une table interne (`itab`).
>
> - Si aucun champ n’est précisé avec `COMPARING`, la suppression se base sur la clé primaire de la table.
> - Si des champs sont précisés via `COMPARING`, seuls ces champs sont utilisés pour détecter les doublons.

> [!TIP]
> Imaginez un classeur trié
>
> - Les fiches consécutives avec le même identifiant ou les mêmes informations sont fusionnées en une seule
> - Les fiches uniques restent intactes

> [!NOTE]
>
> - Pour STANDARD TABLE, un tri préalable est obligatoire avant suppression
> - Pour SORTED TABLE, le tri est assuré automatiquement par la clé
> - La suppression ne retire que les doublons adjacents, pas les doublons dispersés

## 🌺 DECLARATION ET EXEMPLES

### TABLE SORTED

    TYPES: BEGIN OF ty_citizen,
             country TYPE char3,
             name    TYPE char20,
             age     TYPE numc2,
           END OF ty_citizen.

    DATA: lt_citizen TYPE SORTED TABLE OF ty_citizen WITH NON-UNIQUE KEY country,
          ls_citizen TYPE ty_citizen.

    " Insertion des données
    ls_citizen-country = 'FR'.
    ls_citizen-name    = 'Thierry'.
    ls_citizen-age     = '24'.
    INSERT ls_citizen INTO TABLE lt_citizen.

    ls_citizen-country = 'ES'.
    ls_citizen-name    = 'Luis'.
    ls_citizen-age     = '32'.
    INSERT ls_citizen INTO TABLE lt_citizen.

    ls_citizen-country = 'BR'.
    ls_citizen-name    = 'Renata'.
    ls_citizen-age     = '27'.
    INSERT ls_citizen INTO TABLE lt_citizen.

    ls_citizen-country = 'FR'.
    ls_citizen-name    = 'Floriane'.
    ls_citizen-age     = '32'.
    INSERT ls_citizen INTO TABLE lt_citizen.

    " Suppression des doublons adjacents (clé primaire)
    DELETE ADJACENT DUPLICATES FROM lt_citizen.

### TABLE STANDARD

    DATA: lt_citizen_std TYPE TABLE OF ty_citizen.

    " Ajout des données
    APPEND ls_citizen TO lt_citizen_std.
    " ... (autres enregistrements)

    " Tri obligatoire avant suppression
    SORT lt_citizen_std BY country.
    DELETE ADJACENT DUPLICATES FROM lt_citizen_std COMPARING country.

> [!IMPORTANT]
>
> - `STANDARD TABLE` : tri obligatoire pour que les doublons soient adjacents
> - `SORTED TABLE` : suppression basée automatiquement sur la clé
> - `COMPARING` permet de cibler les champs précis pour détecter les doublons
> - Les champs listés dans `COMPARING` doivent correspondre à ceux utilisés pour le tri

## 🌺 BONNES PRATIQUES

| 🍧 Bonne pratique                         | 🍧 Explication                                              |
| ----------------------------------------- | ----------------------------------------------------------- |
| Toujours trier la table avant suppression | Nécessaire pour STANDARD TABLE                              |
| Utiliser COMPARING si clé non pertinente  | Cible uniquement les champs nécessaires                     |
| Vérifier les doublons avant suppression   | Prévenir la perte de données importantes                    |
| Respecter l’ordre des champs              | Aligné avec le tri pour éviter des suppressions incorrectes |
| Appliquer sur tables conséquentes         | Eviter la suppression incomplète si doublons non adjacents  |

## 🌺 EXERCICES

### 🔹 1 – SUPPRIMER LES DOUBLONS SUR SORTED TABLE

> [!IMPORTANT]
> supprimer les doublons consécutifs sur la clé country.

<details>
  <summary>SOLUTION</summary>

    DELETE ADJACENT DUPLICATES FROM lt_citizen.

</details>

### 🔹 2 – SUPPRIMER LES DOUBLONS SUR STANDARD TABLE

> [!IMPORTANT]
> supprimer les doublons consécutifs sur le champ country.

<details>
  <summary>SOLUTION</summary>

    SORT lt_citizen_std BY country.
    DELETE ADJACENT DUPLICATES FROM lt_citizen_std COMPARING country.

</details>

### 🔹 3 – SUPPRIMER LES DOUBLONS SUR PLUSIEURS CHAMPS

> [!IMPORTANT]
> supprimer les doublons où country et age sont identiques.

<details>
  <summary>SOLUTION</summary>

    SORT lt_citizen_std BY country age.
    DELETE ADJACENT DUPLICATES FROM lt_citizen_std COMPARING country age.

</details>

## 🌺 RESUME

> - `DELETE ADJACENT DUPLICATES` supprime les lignes consécutives en doublon dans une table interne
> - Sans `COMPARING` : suppression basée sur la clé primaire
> - Avec `COMPARING` : suppression basée sur les champs spécifiés
> - `STANDARD TABLE` : trier avant suppression
> - `SORTED TABLE` : suppression basée sur la clé primaire automatiquement
>
> [!TIP]
> retirer les fiches identiques consécutives dans un classeur trié
