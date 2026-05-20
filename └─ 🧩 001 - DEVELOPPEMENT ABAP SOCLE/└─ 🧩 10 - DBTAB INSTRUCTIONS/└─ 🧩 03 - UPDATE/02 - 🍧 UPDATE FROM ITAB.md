# 🌸 UPDATE DBTAB FROM ITAB

## 🌺 OBJECTIFS

- [ ] Mettre à jour plusieurs enregistrements d'une table de base de données SAP à partir d'une table interne
- [ ] Vérifier la réussite de l'opération via `SY-SUBRC`
- [ ] Comprendre l’impact de la clé primaire sur la mise à jour multiple
- [ ] Manipuler les données via field symbols pour modifier la table interne

## 🌺 DEFINITION

> `UPDATE dbtab FROM TABLE itab`  
> Met à jour la table `dbtab` avec les valeurs contenues dans la table interne `itab`.  
> Pour chaque ligne de `itab`, le système recherche un enregistrement dans `dbtab` ayant la même clé primaire.

> Variables système mises à jour :
>
> - `SY-SUBRC = 0` → toutes les lignes ont été mises à jour correctement
> - `SY-SUBRC = 4` → aucun enregistrement correspondant trouvé

> [!TIP]  
> Imaginez un classeur Excel et une feuille temporaire :
>
> - Vous modifiez plusieurs lignes sur votre feuille temporaire
> - Puis vous appliquez toutes les modifications au classeur principal en une seule fois
> - Les lignes sont mises à jour uniquement si l’ID correspond

> [!TIP]
>
> Toujours préparer la table interne avant l’instruction `UPDATE FROM TABLE`, par exemple via un `SELECT` ou en remplissant les données manuellement.

## 🌺 EXEMPLE

### Mise à jour d'une table via table interne

    DATA: lt_travel TYPE TABLE OF ztravel.
    FIELD-SYMBOLS: <lfs_travel> TYPE ztravel.
    CONSTANTS: lc_id_driver TYPE zdriver_id VALUE 'C0003'.

    " Sélection des enregistrements du conducteur C0003
    SELECT *
      FROM ztravel
      INTO TABLE @lt_travel
      WHERE id_driver = @lc_id_driver.

    IF sy-subrc = 0.

      " Modification des champs dans la table interne
      LOOP AT lt_travel ASSIGNING <lfs_travel>.
        <lfs_travel>-toll  = <lfs_travel>-toll  - 5.
        <lfs_travel>-gasol = <lfs_travel>-gasol - 10.
      ENDLOOP.

      " Application des modifications à la table de base de données
      UPDATE ztravel FROM TABLE lt_travel.

      IF sy-subrc = 0.
        WRITE 'Mise à jour réussie de la table ZTRAVEL'.
      ELSE.
        WRITE 'Echec de la mise à jour'.
      ENDIF.

    ELSE.
      WRITE 'Aucun enregistrement trouvé pour ce conducteur'.
    ENDIF.

### ENREGISTREMENTS AVANT UPDATE

| 🍧 ID_DRIVER | 🍧 TOLL | 🍧 GAZOL |
| ------------ | ------- | -------- |
| C0003        | 21.00   | 45.40    |
| C0003        | 22.00   | 50.40    |

### ENREGISTREMENTS APRES UPDATE

| 🍧 ID_DRIVER | 🍧 TOLL | 🍧 GAZOL |
| ------------ | ------- | -------- |
| C0003        | 16.00   | 35.40    |
| C0003        | 17.00   | 40.40    |

## 🌺 BONNES PRATIQUES

1. Toujours vérifier `SY-SUBRC` après le `SELECT` pour s’assurer que des enregistrements existent.
2. Utiliser un field symbol ou une table interne pour manipuler les données avant l’`UPDATE FROM TABLE`.
3. Vérifier `SY-SUBRC` après l’`UPDATE` pour confirmer la réussite.
4. Cette méthode permet de mettre à jour plusieurs enregistrements en une seule instruction.
5. Attention : la clé primaire doit être correctement remplie dans chaque ligne de la table interne pour que la mise à jour fonctionne.
