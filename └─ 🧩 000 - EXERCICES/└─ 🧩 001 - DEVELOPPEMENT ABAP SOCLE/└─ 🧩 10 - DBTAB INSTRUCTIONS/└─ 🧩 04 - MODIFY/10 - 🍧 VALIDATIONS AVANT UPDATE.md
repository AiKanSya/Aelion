# 🌸 EXERCICES — TABLE INTERNE VIDE

## 🌺 OBJECTIFS

- vérifier les données avant modification ;
- contrôler un statut de référence ;
- appliquer une règle croisée ;
- préserver les champs techniques ;
- cumuler les erreurs ;
- refuser une mise à jour invalide.

## 🌺 DURÉE INDICATIVE

60 à 75 minutes.

## 🌺 RÈGLES

Une commande peut être modifiée uniquement si :

- la clé existe ;
- le nom reste renseigné ;
- la priorité vaut `1`, `2` ou `3`;
- le statut existe dans `ZT_<TRI>_STAT`;
- la devise est renseignée ;
- le montant est supérieur ou égal à zéro ;
- si le montant est supérieur ou égal à `1000`, la priorité vaut `3`;
- `CREATED_BY` et `CREATED_ON` ne sont pas effacés.

## 🌺 EXERCICE 1 — CAS NOMINAL

Préparer :

```text
9100000050
Priorité 2
Statut N
Montant 500,00 EUR
```

Modification :

```text
Priorité 3
Statut P
Montant 1500,00 EUR
```

Résultat :

```text
Validation réussie
```

## 🌺 EXERCICE 2 — CAS INVALIDES

Tester séparément :

| Modification                 | Erreur attendue                |
| ---------------------------- | ------------------------------ |
| Nom vidé                     | Nom obligatoire                |
| Priorité `4`                 | Priorité invalide              |
| Statut `X`                   | Statut inconnu                 |
| Devise vidée                 | Devise obligatoire             |
| Montant `-1`                 | Montant négatif                |
| Montant `1500`, priorité `2` | Priorité 3 obligatoire         |
| Auteur vidé                  | Auteur de création à préserver |
| Date vidée                   | Date de création à préserver   |

## 🌺 EXERCICE 3 — TABLE D’ERREURS

Déclarer :

```abap
DATA lt_errors TYPE STANDARD TABLE OF string
  WITH EMPTY KEY.
```

Cumuler les erreurs avant l’update.

## 🌺 EXERCICE 4 — CONTRÔLE DU STATUT

Lire les statuts une seule fois si plusieurs commandes sont traitées.

Ne pas exécuter un `SELECT SINGLE` dans chaque itération d’un grand lot.

## 🌺 EXERCICE 5 — ÉCRITURE

Exécuter uniquement lorsque :

```abap
lt_errors IS INITIAL
```

Relire et rollback.

## 🌺 EXERCICE 6 — VALIDATION TECHNIQUE FINALE

Même après les contrôles :

1. exécuter l’update ;
2. contrôler `sy-subrc`;
3. contrôler `sy-dbcnt`;
4. rollback si la ligne n’a pas été traitée ;
5. gérer le cas où elle a été supprimée ou modifiée entre la lecture et l’écriture.

## 🌺 CRITÈRES DE VALIDATION

- [ ] La ligne existe avant modification.
- [ ] Tous les champs obligatoires sont contrôlés.
- [ ] Le statut est vérifié.
- [ ] La règle croisée est appliquée.
- [ ] Les champs de création sont préservés.
- [ ] Les erreurs sont cumulées.
- [ ] L’update n’est exécuté qu’après validation.
- [ ] Le résultat technique final est contrôlé.
- [ ] Le test est annulé.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
DATA lt_errors TYPE STANDARD TABLE OF string
  WITH EMPTY KEY.

IF ls_order-customer_name IS INITIAL.
  APPEND `Nom obligatoire` TO lt_errors.
ENDIF.

IF ls_order-priority NOT BETWEEN '1' AND '3'.
  APPEND `Priorité invalide` TO lt_errors.
ENDIF.

IF ls_order-currency IS INITIAL.
  APPEND `Devise obligatoire` TO lt_errors.
ENDIF.

IF ls_order-amount < 0.
  APPEND `Montant négatif` TO lt_errors.
ENDIF.

IF ls_order-amount >= '1000.00'
   AND ls_order-priority <> '3'.
  APPEND `Priorité 3 obligatoire à partir de 1000,00`
    TO lt_errors.
ENDIF.

IF ls_order-created_by IS INITIAL.
  APPEND `Auteur de création à préserver` TO lt_errors.
ENDIF.

IF ls_order-created_on IS INITIAL.
  APPEND `Date de création à préserver` TO lt_errors.
ENDIF.

SELECT SINGLE status
  FROM zt_<tri>_stat
  WHERE status = @ls_order-status
  INTO @DATA(lv_status).

IF sy-subrc <> 0.
  APPEND `Statut inconnu` TO lt_errors.
ENDIF.

IF lt_errors IS NOT INITIAL.

  LOOP AT lt_errors INTO DATA(lv_error).
    WRITE / lv_error.
  ENDLOOP.

  ROLLBACK WORK.
  RETURN.

ENDIF.

UPDATE zt_<tri>_ord
  FROM @ls_order.

IF sy-subrc <> 0 OR sy-dbcnt <> 1.
  WRITE / 'La commande n’a pas été mise à jour'.
  ROLLBACK WORK.
  RETURN.
ENDIF.
```

</details>
