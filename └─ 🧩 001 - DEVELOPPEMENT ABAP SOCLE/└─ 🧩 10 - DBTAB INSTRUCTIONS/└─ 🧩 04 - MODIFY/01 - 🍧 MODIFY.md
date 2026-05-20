# 🌸 MODIFY

## 🌺 OBJECTIFS

- [ ] MODIFIER OU INSERER UNE OU PLUSIEURS LIGNES DANS UNE TABLE DE BASE DE DONNEES
- [ ] COMPRENDRE LA LOGIQUE "UPDATE SI EXISTE, INSERT SINON"
- [ ] VERIFIER LE SUCCES VIA SY-SUBRC ET SY-DBCNT
- [ ] UTILISER MODIFY AVEC UNE STRUCTURE OU UNE TABLE INTERNE

## 🌺 DEFINITION

> MODIFY dbtab FROM struct  
> MODIFY dbtab FROM TABLE itab
>
> Permet de mettre à jour ou d’insérer des enregistrements dans la table `dbtab` depuis :
>
> - Une structure ABAP (`struct`)
> - Une table interne (`itab`)

> [!IMPORTANT]
>
> - Si la clé primaire existe → mise à jour de la ligne
> - Sinon → insertion de la ligne
>
> [!NOTE]
>
> - SY-SUBRC = 0 → opération réussie
> - SY-DBCNT → nombre de lignes insérées ou modifiées

> [!TIP]
> Imaginez un classeur Excel :
>
> - Si l’ID existe déjà → vous remplacez la ligne (update)
> - Sinon → vous ajoutez une nouvelle ligne (insert)

## 🌺 EXEMPLE

### Modification ou Insertion via structure

    DATA: ls_passager TYPE zpassenger.

    ls_passager-id_passenger = 'P0006'.
    ls_passager-surname      = 'MARTIN'.
    ls_passager-name         = 'SOPHIE'.
    ls_passager-date_birth   = '19950612'.
    ls_passager-city         = 'LYON'.
    ls_passager-country      = 'FR'.
    ls_passager-lang         = 'F'.

    " Modification ou insertion dans la table ZPASSENGER
    MODIFY zpassenger FROM ls_passager.

    IF sy-subrc = 0.
      WRITE 'Enregistrement modifié ou inséré avec succès'.
    ELSE.
      WRITE 'Echec de l''opération'.
    ENDIF.

> [!IMPORTANT]
> La commande `MODIFY FROM` vérifie la présence de la clé primaire.
>
> - Si la clé existe → mise à jour des champs
> - Sinon → insertion d’une nouvelle ligne

> [!NOTE]
> Toujours vérifier SY-SUBRC et SY-DBCNT pour contrôler l’opération

### ENREGISTREMENTS AVANT MODIFY

| 🍧 ID_PASS | 🍧 SURNAME | 🍧 NAME | 🍧 CITY | 🍧 COUNTRY |
| ---------- | ---------- | ------- | ------- | ---------- |
| P0006      | DUPUIS     | LUC     | LYON    | FR         |
| P0007      | DUPONT     | PAUL    | PARIS   | FR         |

### ENREGISTREMENTS APRES MODIFY

| 🍧 ID_PASS | 🍧 SURNAME | 🍧 NAME | 🍧 CITY   | 🍧 COUNTRY |
| ---------- | ---------- | ------- | --------- | ---------- |
| P0006      | MARTIN     | SOPHIE  | LYON      | FR         |
| P0007      | DUPONT     | PAUL    | PARIS     | FR         |
| P0008      | BERTRAND   | ANNE    | MARSEILLE | FR         |

## 🌺 EXEMPLE

### Modification ou Insertion via table interne

    DATA: lt_passager TYPE TABLE OF zpassenger.
    DATA: ls_passager TYPE zpassenger.

    " Premier passager
    ls_passager-id_passenger = 'P0007'.
    ls_passager-surname      = 'DUPONT'.
    ls_passager-name         = 'PAUL'.
    ls_passager-city         = 'PARIS'.
    ls_passager-country      = 'FR'.
    ls_passager-lang         = 'F'.
    APPEND ls_passager TO lt_passager.

    " Deuxième passager
    CLEAR ls_passager.
    ls_passager-id_passenger = 'P0008'.
    ls_passager-surname      = 'BERTRAND'.
    ls_passager-name         = 'ANNE'.
    ls_passager-city         = 'MARSEILLE'.
    ls_passager-country      = 'FR'.
    ls_passager-lang         = 'F'.
    APPEND ls_passager TO lt_passager.

    " Modification ou insertion en masse
    MODIFY zpassenger FROM TABLE lt_passager.

    IF sy-subrc = 0.
      WRITE 'Tous les enregistrements ont été modifiés ou insérés avec succès'.
    ELSE.
      WRITE 'Echec de l''opération'.
    ENDIF.

> [!IMPORTANT]
> La commande `MODIFY FROM TABLE` traite toutes les lignes de la table interne :
>
> - Mise à jour si clé primaire existante
> - Insertion sinon

> [!CAUTION]
> Vérifier SY-SUBRC après le MODIFY pour confirmer que toutes les lignes ont été traitées correctement.

## 🌺 UTILISATION CONSEILLEE

- Préférer MODIFY pour simplifier la gestion des enregistrements existants et nouveaux
- Utiliser avec des structures ou tables internes bien initialisées
- Vérifier systématiquement SY-SUBRC et SY-DBCNT
- Eviter d’envoyer des tables internes trop volumineuses sans filtrage
