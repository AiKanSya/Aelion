# 🌸 LOOP AT

## 🌺 OBJECTIFS

- [ ] Parcourir une table interne ligne par ligne avec `LOOP AT`
- [ ] Utiliser les options `INTO`, `ASSIGNING <fs>` et `TRANSPORTING NO FIELDS`
- [ ] Filtrer avec `WHERE`, `FROM` et `TO`
- [ ] Déclarer dynamiquement les structures et FIELD-SYMBOLS pour plus de flexibilité
- [ ] Modifier directement les lignes via FIELD-SYMBOLS
- [ ] Comprendre les variables système `SY-SUBRC` et `SY-TABIX`
- [ ] Utiliser les ruptures `AT FIRST`, `AT NEW`, `AT END OF`, `AT LAST`
- [ ] Utiliser des filtres complexes avec `WHERE` sur un ou plusieurs champs

## 🌺 DEFINITION

    LOOP AT itab
      { INTO ls | ASSIGNING <lfs_> | TRANSPORTING NO FIELDS }
      [FROM idx1] [TO idx2]
      [WHERE condition]
      ...
      AT ...
        ...
      ENDAT.
      ...
    ENDLOOP.

> L’instruction `LOOP AT` permet de parcourir une table interne (`itab`) ligne par ligne.  
> Les données peuvent être copiées (`INTO`), référencées en mémoire (`ASSIGNING <fs>`) ou simplement vérifiées (`TRANSPORTING NO FIELDS`).

> [!TIP]
> Parcourir un classeur ligne par ligne
>
> - `INTO` = photocopier la fiche
> - `ASSIGNING <lfs\_>` = pointer directement sur la fiche pour modifier
> - `TRANSPORTING NO FIELDS` = juste vérifier si la fiche existe

## 🌺 EXEMPLES SIMPLES

### LOOP AVEC INTO

    DATA: ls_citizen TYPE ty_citizen.

    LOOP AT lt_citizen INTO ls_citizen WHERE country = 'FR'.
      WRITE:/ 'Pays:', ls_citizen-country, 'Nom:', ls_citizen-name, 'Âge:', ls_citizen-age.
    ENDLOOP.

> [!IMPORTANT]
> Copie de la ligne dans `ls_citizen`. Modification de `ls_citizen` n’affectera pas `lt_citizen`.

### LOOP AVEC ASSIGNING FIELD-SYMBOL

    FIELD-SYMBOLS: <lfs_citizen> TYPE ty_citizen.

    LOOP AT lt_citizen ASSIGNING <lfs_citizen> WHERE country = 'ES'.
      <lfs_citizen>-age = <lfs_citizen>-age + 1.
      WRITE:/ 'Pays:', <lfs_citizen>-country, 'Nom:', <lfs_citizen>-name, 'Nouvel âge:', <lfs_citizen>-age.
    ENDLOOP.

> [!NOTE]
> Modification directe dans la table sans utiliser `MODIFY`.

### LOOP AVEC TRANSPORTING NO FIELDS

    LOOP AT lt_citizen TRANSPORTING NO FIELDS WHERE name = 'Renata'.
      IF sy-subrc = 0.
        WRITE:/ 'Renata est présente dans la table.'.
      ENDIF.
    ENDLOOP.

> [!TIP]
> Vérifier simplement l’existence sans copier ni modifier la ligne.

### LOOP AVEC FROM / TO

    LOOP AT lt_citizen INTO ls_citizen FROM 2 TO 3.
      WRITE:/ 'Pays:', ls_citizen-country, 'Nom:', ls_citizen-name.
    ENDLOOP.

> [!IMPORTANT]
> Limite la boucle aux lignes 2 et 3 pour traiter une plage précise.

### LOOP AVEC DECLARATION DYNAMIQUE

    DATA: lt_dyn TYPE STANDARD TABLE OF ty_citizen.

    LOOP AT lt_dyn INTO DATA(ls_dyn).
      ls_dyn-country = 'IT'.
      WRITE:/ 'Pays mis à jour:', ls_dyn-country, 'Nom:', ls_dyn-name.
    ENDLOOP.

    LOOP AT lt_dyn ASSIGNING FIELD-SYMBOLS(<lfs_dyn_row>).
      <lfs_dyn_row>-country = 'IT'.
      WRITE:/ 'Pays mis à jour:', <lfs_dyn_row>-country, 'Nom:', <lfs_dyn_row>-name.
    ENDLOOP.

> [!TIP]
> Utile pour créer ou manipuler des structures au fur et à mesure, et pour éviter les conflits de `FIELD-SYMBOLS`.

### LOOP AVEC AT FIRST / AT NEW / AT END OF / AT LAST

    SORT lt_citizen BY country.

    LOOP AT lt_citizen ASSIGNING <lfs_citizen>.
      AT FIRST.
        WRITE: 'Début de la liste'.
        ULINE.
      ENDAT.

      AT NEW country.
        WRITE:/ 'Début pays : ', <lfs_citizen>-country.
      ENDAT.

      WRITE:/ 'Nom : ', <lfs_citizen>-name, 'Age : ', <lfs_citizen>-age.

      AT END OF country.
        WRITE:/ 'Fin pays : ', <lfs_citizen>-country.
        ULINE.
      ENDAT.

      AT LAST.
        WRITE: 'Fin de la liste'.
      ENDAT.
    ENDLOOP.

> [!IMPORTANT]
> Permet de gérer des ruptures pour grouper ou démarquer des sections dans la table.

## 🌺 EXEMPLES AVANCES – WHERE

### 1 – WHERE SUR UN CHAMP

    LOOP AT lt_citizen INTO ls_citizen WHERE country = 'FR'.
      WRITE:/ 'Pays:', ls_citizen-country, 'Nom:', ls_citizen-name.
    ENDLOOP.

> [!TIP]
> Vérifie toutes les lignes dont le champ `country` = 'FR'.

### 2 – WHERE SUR DEUX CHAMPS (clé et non-clé)

    LOOP AT lt_citizen ASSIGNING <lfs_citizen> WHERE country = 'ES' AND age > '30'.
      WRITE:/ 'Pays:', <lfs_citizen>-country, 'Nom:', <lfs_citizen>-name, 'Âge:', <lfs_citizen>-age.
    ENDLOOP.

> [!IMPORTANT]
> On peut combiner plusieurs champs avec `AND`.

> [!CAUTION]
> les champs non-clés peuvent être utilisés pour filtrer.

### 3 – WHERE AVEC COMPARAISONS MULTIPLES

    LOOP AT lt_citizen INTO ls_citizen WHERE age >= '25' AND age <= '32'.
      WRITE:/ 'Nom:', ls_citizen-name, 'Âge:', ls_citizen-age.
    ENDLOOP.

> [!NOTE]
> Permet de sélectionner des plages de valeurs.

> [!TIP]
> chercher toutes les fiches entre 25 et 32 ans.

### 4 – WHERE SUR PLUSIEURS CHAMPS CLÉS ET NON-CLÉS

    LOOP AT lt_citizen ASSIGNING <lfs_citizen> WHERE country = 'FR' AND age = '24' AND name = 'Thierry'.
      WRITE:/ 'Citoyen trouvé:', <lfs_citizen>-name, 'Pays:', <lfs_citizen>-country.
    ENDLOOP.

> [!CAUTION]
> Si la table n’est pas triée correctement pour les clés, l’utilisation d’`AT NEW` avec ce filtre pourrait ne pas fonctionner comme attendu.

### 5 – WHERE AVEC CONDITIONS COMPLEXES

    LOOP AT lt_citizen INTO ls_citizen WHERE (country = 'BR' OR country = 'IT') AND age < '30'.
      WRITE:/ 'Nom:', ls_citizen-name, 'Pays:', ls_citizen-country, 'Âge:', ls_citizen-age.
    ENDLOOP.

> [!IMPORTANT]
> On peut combiner `AND` et `OR` en respectant la priorité des parenthèses.

### 6 – WHERE DYNAMIQUE (avec FIELD-SYMBOL)

    DATA: lv_country TYPE char3 VALUE 'ES'.

    LOOP AT lt_citizen ASSIGNING FIELD-SYMBOLS(<dyn_citizen>) WHERE country = lv_country AND age > '30'.
      WRITE:/ 'Nom:', <dyn_citizen>-name, 'Pays:', <dyn_citizen>-country, 'Âge:', <dyn_citizen>-age.
    ENDLOOP.

> [!IMPORTANT]
> Permet d’utiliser des variables dynamiques dans les conditions.

## 🌺 BONNES PRATIQUES

| 🍧 Bonne pratique                    | 🍧 Explications                                                     |
| ------------------------------------ | ------------------------------------------------------------------- |
| Toujours trier la table avant AT NEW | Nécessaire pour les tables STANDARD si vous utilisez des ruptures   |
| Préférer ASSIGNING pour modifier     | Évite la copie et permet de travailler directement en mémoire       |
| Utiliser WHERE pour filtrer          | Réduit le nombre de lignes parcourues                               |
| Vérifier SY-SUBRC                    | Utile si vous utilisez TRANSPORTING NO FIELDS                       |
| FIELD-SYMBOLS uniques par scope      | Évite les erreurs et conflits dans les boucles imbriquées           |
| FROM/TO pour limiter les plages      | Optimise les traitements si seules certaines lignes sont concernées |
| Parenthèses avec AND/OR              | Clarifie les conditions complexes et évite les erreurs              |

## 🌺 EXERCICES

### 🔹 1 – WHERE SUR UN SEUL CHAMP

> [!IMPORTANT]
> Parcourir `lt_citizen` et afficher les citoyens dont `country = 'FR'`.

<details>
  <summary>SOLUTION</summary>

    LOOP AT lt_citizen INTO ls_citizen WHERE country = 'FR'.
      WRITE:/ 'Pays:', ls_citizen-country, 'Nom:', ls_citizen-name.
    ENDLOOP.

</details>

---

### 🔹 2 – WHERE SUR PLUSIEURS CHAMPS

> [!IMPORTANT]
> Afficher les citoyens dont `country = 'ES'` et `age > 30`.

<details>
  <summary>SOLUTION</summary>

    LOOP AT lt_citizen ASSIGNING <lfs_citizen> WHERE country = 'ES' AND age > '30'.
      WRITE:/ 'Nom:', <lfs_citizen>-name, 'Pays:', <lfs_citizen>-country, 'Âge:', <lfs_citizen>-age.
    ENDLOOP.

</details>

---

### 🔹 3 – WHERE AVEC PLAGE D’AGE

> [!IMPORTANT]
> Afficher les citoyens âgés entre 25 et 32 ans.

<details>
  <summary>SOLUTION</summary>

    LOOP AT lt_citizen INTO ls_citizen WHERE age >= '25' AND age <= '32'.
      WRITE:/ 'Nom:', ls_citizen-name, 'Âge:', ls_citizen-age.
    ENDLOOP.

</details>

---

### 🔹 4 – WHERE DYNAMIQUE

> [!IMPORTANT]
> Afficher tous les citoyens dont `country = lv_country` et `age > 30`.

<details>
  <summary>SOLUTION</summary>

    DATA: lv_country TYPE char3 VALUE 'ES'.

    LOOP AT lt_citizen ASSIGNING FIELD-SYMBOLS(<dyn_citizen>) WHERE country = lv_country AND age > '30'.
      WRITE:/ 'Nom:', <dyn_citizen>-name, 'Pays:', <dyn_citizen>-country, 'Âge:', <dyn_citizen>-age.
    ENDLOOP.

</details>

---

### 🔹 5 – WHERE COMPLEXE AVEC OR ET AND

> [!IMPORTANT]
> Afficher tous les citoyens dont `country = 'BR'` ou `country = 'IT'` et `age < 30`.

<details>
  <summary>SOLUTION</summary>

    LOOP AT lt_citizen INTO ls_citizen WHERE (country = 'BR' OR country = 'IT') AND age < '30'.
      WRITE:/ 'Nom:', ls_citizen-name, 'Pays:', ls_citizen-country, 'Âge:', ls_citizen-age.
    ENDLOOP.

</details>

---

## 🌺 RESUME

> `LOOP AT` permet de parcourir les tables internes ligne par ligne.
>
> - `INTO` : copie de la ligne
> - `ASSIGNING` : référence directe en mémoire
> - `TRANSPORTING NO FIELDS` : vérification uniquement
> - `WHERE` : filtrage simple ou complexe (un ou plusieurs champs, AND/OR, variables dynamiques)
> - `FROM` / `TO` : filtrage par plage
> - `FIELD-SYMBOLS` : modification directe
> - `SY-SUBRC` / `SY-TABIX` : code retour et index
> - `AT FIRST` / `AT NEW` / `AT END OF` / `AT LAST` : gestion des ruptures
