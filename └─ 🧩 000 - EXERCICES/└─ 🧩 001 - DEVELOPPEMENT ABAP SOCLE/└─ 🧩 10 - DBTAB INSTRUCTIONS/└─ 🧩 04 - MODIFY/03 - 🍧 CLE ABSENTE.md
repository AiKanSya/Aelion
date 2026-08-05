# 🌸 EXERCICES — UPDATE FROM STRUCTURE : CAS NOMINAL

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [MODIFY](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 10 - DBTAB INSTRUCTIONS/└─ 🧩 04 - MODIFY/01 - 🍧 MODIFY.md>)

## 🌺 OBJECTIFS

- mettre à jour une clé inexistante ;
- interpréter le résultat ;
- prouver qu’aucune ligne n’est créée ;
- distinguer `UPDATE` d’`INSERT`;
- produire un message fonctionnel.

## 🌺 DURÉE INDICATIVE

30 à 40 minutes.

## 🌺 CONSIGNES

Construire une structure complète avec :

```text
ORDER_ID      : 9100000099
CUSTOMER_NAME : Commande inexistante
PRIORITY      : 1
STATUS        : N
AMOUNT        : 99,00 EUR
```

Ne pas insérer cette structure.

Exécuter directement :

```abap
UPDATE zt_<tri>_ord
  FROM @ls_order.
```

## 🌺 RÉSULTAT ATTENDU

```text
sy-subrc = 4
sy-dbcnt = 0
```

Relecture :

```text
Commande 9100000099 absente
```

## 🌺 QUESTIONS

1. pourquoi la structure complète ne suffit-elle pas à créer la ligne ?
2. quelle instruction faudrait-il utiliser pour une création ?
3. `UPDATE` est-il un upsert ?
4. faut-il exécuter un commit après une mise à jour absente ?
5. quel message métier produire ?

## 🌺 MESSAGE ATTENDU

```text
Mise à jour impossible : la commande 9100000099 n’existe pas
```

## 🌺 CRITÈRES DE VALIDATION

- [ ] Aucune préparation n’est insérée.
- [ ] `sy-subrc` vaut `4`.
- [ ] `sy-dbcnt` vaut `0`.
- [ ] Aucune ligne n’apparaît.
- [ ] `UPDATE` est distingué d’une création.
- [ ] Le message indique la cause.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
DATA(ls_order) = VALUE zt_<tri>_ord(
  mandt         = sy-mandt
  order_id      = '9100000099'
  customer_name = 'Commande inexistante'
  priority      = '1'
  status        = 'N'
  currency      = 'EUR'
  amount        = '99.00'
  created_by    = sy-uname
  created_on    = sy-datum
).

UPDATE zt_<tri>_ord
  FROM @ls_order.

DATA(lv_update_subrc) = sy-subrc.
DATA(lv_update_count) = sy-dbcnt.

IF lv_update_subrc = 4.
  WRITE: / |Mise à jour impossible : la commande { ls_order-order_id } n'existe pas|,
         / |sy-dbcnt : { lv_update_count }|.
ENDIF.

SELECT SINGLE order_id
  FROM zt_<tri>_ord
  WHERE order_id = @ls_order-order_id
  INTO @DATA(lv_order_id).

IF sy-subrc <> 0.
  WRITE / |Commande { ls_order-order_id } absente|.
ENDIF.
```

</details>
