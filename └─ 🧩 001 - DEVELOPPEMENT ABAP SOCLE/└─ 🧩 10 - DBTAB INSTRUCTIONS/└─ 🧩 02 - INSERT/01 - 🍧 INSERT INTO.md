# 🌸 INSERT INTO DBTAB VIA STRUCTURE

## 🌺 OBJECTIFS

- [ ] Ajouter une ou plusieurs lignes dans une table de base de données SAP
- [ ] Utiliser une structure ou une table interne comme source
- [ ] Vérifier l’état de l’insertion via les variables système `SY-SUBRC` et `SY-DBCNT`
- [ ] Comprendre l’impact des clés primaires sur l’insertion

## 🌺 DEFINITION

> `INSERT INTO dbtab VALUES struct`  
> Insère l’enregistrement contenu dans `struct` dans la table de base de données `dbtab`.  
> Le système vérifie la clé primaire :
>
> - Si elle existe déjà → l’insertion échoue (`SY-SUBRC = 4`)
> - Si elle n’existe pas → l’insertion réussit (`SY-SUBRC = 0`)  
>   `SY-DBCNT` indique le nombre de lignes insérées.

> [!TIP]
> Imaginez un classeur Excel avec une colonne "ID" unique.  
> Vous voulez ajouter une nouvelle ligne :
>
> - Si l’ID existe déjà → Excel refuse d’ajouter la ligne
> - Si l’ID est nouveau → la ligne est ajoutée, et vous savez combien ont été ajoutées.

> [!NOTE]
> Le `INSERT` fonctionne pour une structure unique ou une table interne complète avec `INSERT INTO dbtab FROM TABLE itab`.

## 🌺 EXEMPLE

### Insérer un nouveau passager

    DATA: ls_passager TYPE zpassenger.

    ls_passager-id_passenger = 'P0005'.
    ls_passager-surname      = 'THIERRY'.
    ls_passager-name         = 'ROMAIN'.
    ls_passager-date_birth   = '19930324'.
    ls_passager-city         = 'MONTPELLIER'.
    ls_passager-country      = 'FR'.
    ls_passager-lang         = 'F'.

    INSERT INTO zpassenger VALUES ls_passager.

    IF sy-subrc = 0.
      WRITE 'Nouvel enregistrement créé avec succès'.
    ELSE.
      WRITE 'Echec lors de la création d''un nouvel enregistrement'.
    ENDIF.

_Résultat de l’insertion_

| 🍧 ID_PASS | 🍧 SURNAME | 🍧 NAME | 🍧 DATE_BIRTH | 🍧 CITY     | 🍧 COUNTRY | 🍧 LANG |
| ---------- | ---------- | ------- | ------------- | ----------- | ---------- | ------- |
| P0005      | THIERRY    | ROMAIN  | 19930324      | MONTPELLIER | FR         | F       |

### Insérer plusieurs enregistrements via table interne

    DATA: lt_passager TYPE TABLE OF zpassenger,
          ls_passager TYPE zpassenger.

    ls_passager-id_passenger = 'P0006'.
    ls_passager-surname      = 'MARTIN'.
    ls_passager-name         = 'LOUIS'.
    APPEND ls_passager TO lt_passager.

    ls_passager-id_passenger = 'P0007'.
    ls_passager-surname      = 'DUPONT'.
    ls_passager-name         = 'SOPHIE'.
    APPEND ls_passager TO lt_passager.

    INSERT INTO zpassenger FROM TABLE @lt_passager.

    WRITE: / 'Nombre de lignes insérées :', sy-dbcnt.

> [!IMPORTANT]
> le `INSERT ... FROM TABLE` permet d’insérer tous les enregistrements de la table interne en une seule instruction.  
> Le `SY-DBCNT` indique combien de lignes ont été insérées avec succès.

## 🌺 BONNES PRATIQUES

1. Toujours initialiser la structure avant l’insertion.
2. Vérifier `SY-SUBRC` pour s’assurer que l’insertion a réussi.
3. Vérifier `SY-DBCNT` si plusieurs enregistrements sont insérés.
4. Éviter d’insérer des doublons sur la clé primaire pour ne pas générer d’erreurs.
5. Utiliser `INSERT ... FROM TABLE` pour optimiser les performances lors de l’insertion multiple.
