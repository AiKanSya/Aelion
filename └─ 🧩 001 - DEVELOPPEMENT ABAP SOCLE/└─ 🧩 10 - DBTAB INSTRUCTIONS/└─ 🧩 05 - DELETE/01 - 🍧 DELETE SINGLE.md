# 🌸 DELETE SINGLE

## 🌺 OBJECTIFS

- [ ] SUPPRIMER UN ENREGISTREMENT SPECIFIQUE DANS UNE TABLE DE BASE DE DONNEES
- [ ] UTILISER LA CLAUSE WHERE POUR CIBLER L’ENREGISTREMENT
- [ ] VERIFIER LE SUCCES DE L’OPERATION VIA SY-SUBRC ET SY-DBCNT

## 🌺 DEFINITION

> DELETE FROM dbtab WHERE condition  
> Supprime les lignes de la table `dbtab` correspondant à la condition.

> Variables système :
>
> - SY-SUBRC = 0 → au moins un enregistrement supprimé
> - SY-SUBRC = 4 → aucun enregistrement trouvé
> - SY-DBCNT → nombre de lignes supprimées

> [!TIP]
> Comme effacer une ligne spécifique dans un classeur Excel en fonction d’un ID.

> [!CAUTION]
> Toujours s’assurer que la condition WHERE cible bien la ligne voulue pour éviter de supprimer par erreur d’autres enregistrements.

## 🌺 EXEMPLE

### Suppression d'un enregistrement

    CONSTANTS: lc_user_id TYPE zpassenger_id VALUE 'P0005'.

    DELETE FROM zpassenger
      WHERE id_passenger = @lc_user_id.

    IF sy-subrc = 0.
      WRITE 'L''enregistrement a été supprimé avec succès'.
    ELSE.
      WRITE 'Erreur lors de la suppression d''un enregistrement'.
    ENDIF.

> [!IMPORTANT]
>
> 1. La constante `lc_user_id` contient l’ID du passager à supprimer.
> 2. `DELETE FROM` supprime uniquement la ligne correspondant à cet ID.
> 3. Vérification du succès avec SY-SUBRC et affichage d’un message.

### ENREGISTREMENTS AVANT DELETE

| 🍧 ID_PASS | 🍧 SURNAME | 🍧 NAME |
| ---------- | ---------- | ------- |
| P0005      | THIERRY    | ROMAIN  |
| P0004      | DUPONT     | MARIE   |

### ENREGISTREMENTS APRES DELETE

| 🍧 ID_PASS | 🍧 SURNAME | 🍧 NAME |
| ---------- | ---------- | ------- |
| P0004      | DUPONT     | MARIE   |
