# 🌸 DELETE

## 🌺 OBJECTIFS

- [ ] Comprendre le fonctionnement de l’instruction `DELETE` pour les tables internes
- [ ] Savoir supprimer des lignes en fonction de l’index, de la clé ou d’une condition `WHERE`
- [ ] Identifier les limitations selon le type de table interne
- [ ] Utiliser DELETE de manière sûre et performante

## 🌺 DEFINITION

    DELETE { TABLE itab { FROM ls }
            | { WITH TABLE KEY [keyname COMPONENTS]
                    {comp_name1|(name1)} = operand1
                    {comp_name2|(name2)} = operand2 ...}
            | itab INDEX idx
            | itab WHERE cond }.

> L’instruction `DELETE` retire des lignes d’une table interne (`itab`).  
> Trois formes principales
>
> - `DELETE itab INDEX idx` : supprime la ligne à l’index spécifié
> - `DELETE itab FROM ls` : supprime la ligne correspondant à la structure / clé
> - `DELETE itab WHERE cond` : supprime toutes les lignes respectant la condition

> [!TIP]
> Imaginez un classeur
>
> - Retirer une fiche à une position précise
> - Supprimer la fiche correspondant à un identifiant
> - Retirer toutes les fiches correspondant à un critère spécifique

> [!NOTE]
>
> - Les lignes supprimées disparaissent définitivement
> - Les index des lignes suivantes sont ajustés automatiquement pour les STANDARD TABLE
> - HASHED TABLE et SORTED TABLE gèrent la suppression via clé ou condition

## 🌺 EXEMPLES

### DELETE PAR INDEX

    " Supprimer la première ligne de lt_country (STANDARD TABLE uniquement)
    DELETE lt_country INDEX 1.

### DELETE PAR STRUCTURE / CLE

    ls_country-land = 'FR'.
    DELETE lt_country FROM ls_country.  " Supprime la ligne dont la clé LAND = 'FR'

### DELETE AVEC WHERE

    DELETE lt_country WHERE age < 30.  " Supprime toutes les lignes avec age < 30

> [!IMPORTANT]
>
> - `INDEX` : applicable uniquement aux `STANDARD TABLE`
> - `FROM` / clé : fonctionne pour `STANDARD` et `HASHED TABLE` (basé sur la clé)
> - `WHERE` : applicable à toutes les tables, permet de supprimer plusieurs lignes selon un critère
> - Les lignes supprimées sont retirées définitivement et l’index des lignes suivantes est ajusté automatiquement

## 🌺 BONNES PRATIQUES

| 🍧 Bonne pratique                     | 🍧 Explication                                      |
| ------------------------------------- | --------------------------------------------------- |
| Vérifier le type de table             | INDEX uniquement pour STANDARD                      |
| Initialiser correctement la structure | Assurer la suppression ciblée avec FROM             |
| Utiliser WHERE pour plusieurs lignes  | Supprime toutes les lignes répondant à la condition |
| Éviter DELETE en boucle inutile       | Prévenir des impacts sur les performances           |
| Confirmer les lignes à supprimer      | Limiter les suppressions accidentelles              |

## 🌺 EXERCICES

### 🔹 1 – DELETE PAR INDEX

> [!IMPORTANT]  
> supprimer la première ligne de lt_country.

<details>
  <summary>SOLUTION</summary>

    DELETE lt_country INDEX 1.

</details>

---

### 🔹 2 – DELETE PAR STRUCTURE / CLE

> [!IMPORTANT]  
> supprimer la ligne avec LAND = 'IT'.

<details>
  <summary>SOLUTION</summary>

    CLEAR ls_country-land.
    ls_country-land = 'IT'.
    DELETE lt_country FROM ls_country.

</details>

---

### 🔹 3 – DELETE AVEC WHERE

> [!IMPORTANT]  
> supprimer toutes les lignes où AGE < 25.

<details>
  <summary>SOLUTION</summary>

    DELETE lt_country WHERE age < 25.

</details>

---

### 🔹 4 – COMPARAISON DES METHODES

> [!IMPORTANT]  
> expliquer quand utiliser INDEX, FROM, WHERE.

<details>
  <summary>Explication</summary>

- `DELETE INDEX` : rapide, applicable uniquement aux STANDARD TABLE
- `DELETE FROM` : supprime la ligne correspondant à la clé ou à la structure
- `DELETE WHERE` : supprime toutes les lignes correspondant à un critère, utile pour des suppressions conditionnelles
- Utiliser WHERE pour des suppressions multiples et INDEX/FROM pour des suppressions ciblées

</details>

## 🌺 RESUME

> - `DELETE` supprime une ou plusieurs lignes d’une table interne selon l’index, la clé ou une condition WHERE
>
> [!TIP]
> retirer des fiches d’un classeur soit par position, soit par identifiant, soit par critère spécifique
>
> [!IMPORTANT]
> vérifier le type de table, initialiser la structure, utiliser WHERE pour plusieurs lignes et éviter les suppressions inutiles en boucle
