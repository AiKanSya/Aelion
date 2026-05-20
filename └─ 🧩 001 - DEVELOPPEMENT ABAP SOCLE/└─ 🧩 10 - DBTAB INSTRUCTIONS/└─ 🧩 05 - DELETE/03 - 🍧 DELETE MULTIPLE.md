# 🌸 DELETE MULTIPLE

## 🌺 OBJECTIFS

- [ ] Supprimer un ou plusieurs enregistrements d'une table de base de données en fonction d'une condition `WHERE`.
- [ ] Vérifier la réussite de l’opération via `SY-SUBRC` et connaître le nombre de lignes supprimées avec `SY-DBCNT`.

## 🌺 DEFINITION

> `DELETE FROM dbtab WHERE condition`  
> Supprime les enregistrements de la table `dbtab` qui répondent à la `condition`.  
> Variables système mises à jour :
>
> - `SY-SUBRC = 0` si au moins un enregistrement a été supprimé
> - `SY-SUBRC = 4` si aucun enregistrement correspondant n’a été trouvé
> - `SY-DBCNT` retourne le nombre de lignes supprimées

## 🌺 EXEMPLE

### Suppression d’un passager

    CONSTANTS: lc_user_id TYPE zpassenger_id VALUE 'P0005'.

    " Suppression de l'enregistrement avec l'ID P0005
    DELETE FROM zpassenger
      WHERE id_passenger = @lc_user_id.

    IF sy-subrc = 0.
      WRITE 'L''enregistrement a été supprimé avec succès'.
    ELSE.
      WRITE 'Erreur lors de la suppression d''un enregistrement'.
    ENDIF.

> [!IMPORTANT]
>
> 1.  Déclaration de la constante `lc_user_id` contenant l'identifiant du passager à supprimer.
> 2.  La commande `DELETE FROM ... WHERE` supprime la ou les lignes correspondant à l’ID dans la table `ZPASSENGER`.
> 3.  Vérification de la réussite via `SY-SUBRC` et affichage d’un message.
> 4.  `SY-DBCNT` contient le nombre de lignes supprimées.

### ENREGISTREMENTS AVANT DELETE

| 🍧 ID_PASS | 🍧 SURNAME | 🍧 NAME |
| ---------- | ---------- | ------- |
| P0005      | THIERRY    | ROMAIN  |
| P0004      | DUPONT     | MARIE   |

### ENREGISTREMENTS APRES DELETE

| 🍧 ID_PASS | 🍧 SURNAME | 🍧 NAME |
| ---------- | ---------- | ------- |
| P0004      | DUPONT     | MARIE   |
