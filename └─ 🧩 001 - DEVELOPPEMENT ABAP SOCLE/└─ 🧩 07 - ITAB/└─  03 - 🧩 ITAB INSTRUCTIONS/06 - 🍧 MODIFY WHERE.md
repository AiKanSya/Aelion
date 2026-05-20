# 🌸 MODIFY WHERE

## 🌺 OBJECTIFS

- [ ] Comprendre le fonctionnement de `MODIFY ... WHERE`
- [ ] Savoir modifier des lignes spécifiques d’une table interne en utilisant une condition
- [ ] Identifier la différence avec `MODIFY INDEX` et `MODIFY TABLE`
- [ ] Utiliser TRANSPORTING pour limiter les champs modifiés

## 🌺 DEFINITION

    MODIFY itab FROM ls
                TRANSPORTING comp1 comp2 ...
                WHERE cond.

> `MODIFY ... WHERE` met à jour une table interne (`itab`) en utilisant une condition pour sélectionner les lignes à modifier.  
> La structure `ls` fournit les nouvelles valeurs et `TRANSPORTING` permet de modifier uniquement certains champs.

> [!TIP]
> Imaginez un classeur
>
> - Vous cherchez les fiches correspondant à un critère précis (WHERE)
> - Vous modifiez uniquement les informations nécessaires
> - Les autres fiches restent inchangées

> [!NOTE]
>
> - Fonctionne pour `STANDARD`, `SORTED` et `HASHED TABLE`
> - Utile lorsque la clé n’est pas connue ou lorsqu’une condition complexe doit être appliquée
> - Comparable à un WHERE dans SQL

## 🌺 DECLARATION ET EXEMPLE

    TYPES: BEGIN OF ty_country,
             land TYPE char3,
             age  TYPE i,
           END OF ty_country.

    DATA: lt_country TYPE HASHED TABLE OF ty_country WITH UNIQUE KEY land,
          ls_country TYPE ty_country.

    " Remplissage initial
    ls_country-land = 'FR'.
    ls_country-age  = 23.
    COLLECT ls_country INTO lt_country.

    ls_country-land = 'IT'.
    ls_country-age  = 20.
    COLLECT ls_country INTO lt_country.

    ls_country-land = 'IT'.
    ls_country-age  = 55.
    COLLECT ls_country INTO lt_country.

    ls_country-land = 'FR'.
    ls_country-age  = 5.
    COLLECT ls_country INTO lt_country.

    " CLEAR de la clé pour modification conditionnelle
    CLEAR ls_country-land.
    ls_country-age  = 10.

    " Modification avec WHERE
    MODIFY lt_country FROM ls_country TRANSPORTING age
                      WHERE land = 'IT'.

> [!IMPORTANT]
>
> - La clause `WHERE` sélectionne la ou les lignes à modifier
> - `TRANSPORTING` restreint la modification aux champs listés
> - Contrairement à `MODIFY TABLE`, la recherche ne se fait pas via la clé mais via la condition
> - Idéal pour des modifications conditionnelles complexes

## 🌺 ETAT DE LA TABLE

Avant le `MODIFY` :

| LAND | AGE |
| ---- | --- |
| FR   | 28  |
| IT   | 75  |

Après le `MODIFY` :

| LAND | AGE |
| ---- | --- |
| FR   | 28  |
| IT   | 10  |

## 🌺 BONNES PRATIQUES

| 🍧 Bonne pratique                        | 🍧 Explication                                    |
| ---------------------------------------- | ------------------------------------------------- |
| Vérifier la clause WHERE                 | Assure que seule la ligne souhaitée sera modifiée |
| Utiliser TRANSPORTING pour champs ciblés | Limite la modification aux champs nécessaires     |
| Initialiser correctement la structure    | Évite de réécrire des valeurs indésirables        |
| Comparer avec MODIFY TABLE               | Savoir quand utiliser la clé ou une condition     |
| Tester sur un sous-ensemble de la table  | Prévenir les modifications accidentelles          |

## 🌺 EXERCICES

### 🔹 1 – MODIFIER PAR CONDITION SIMPLE

> [!IMPORTANT]  
> Modifier l’âge des pays `'FR'` à 35.

<details>
  <summary>SOLUTION</summary>

    CLEAR ls_country-land.
    ls_country-age = 35.
    MODIFY lt_country FROM ls_country TRANSPORTING age
                      WHERE land = 'FR'.

</details>

---

### 🔹 2 – MODIFIER PLUSIEURS LIGNES AVEC CONDITION

> [!IMPORTANT]
> Ajouter 5 ans à tous les pays dont l’âge est inférieur à 30.

<details>
  <summary>SOLUTION</summary>

    LOOP AT lt_country INTO ls_country.
      IF ls_country-age < 30.
        ls_country-age = ls_country-age + 5.
        MODIFY lt_country FROM ls_country TRANSPORTING age
                          WHERE land = ls_country-land.
      ENDIF.
    ENDLOOP.

</details>

---

### 🔹 3 – COMPARAISON AVEC MODIFY TABLE

> [!IMPORTANT]
> Expliquer la différence pratique entre `MODIFY TABLE` et `MODIFY WHERE`.

<details>
  <summary>Explication</summary>

- `MODIFY TABLE` : modifie une ligne via la clé
- `MODIFY WHERE` : modifie une ou plusieurs lignes via une condition
- WHERE est nécessaire lorsque la clé n’est pas connue ou plusieurs lignes doivent être mises à jour
- TRANSPORTING reste utile pour modifier uniquement certains champs

</details>

## 🌺 RESUME

> - `MODIFY ... WHERE` met à jour des lignes d’une table interne selon une condition
> - Permet de modifier tous les champs ou seulement certains via TRANSPORTING
> - Différence avec `MODIFY INDEX` : sélection par condition au lieu d’un index
> - Différence avec `MODIFY TABLE` : sélection par condition au lieu de la clé
>
> [!TIP]
> modifier certaines fiches dans un classeur en fonction d’un critère précis
>
> [!IMPORTANT]
> vérifier la clause `WHERE`, initialiser la structure et utiliser `TRANSPORTING`
