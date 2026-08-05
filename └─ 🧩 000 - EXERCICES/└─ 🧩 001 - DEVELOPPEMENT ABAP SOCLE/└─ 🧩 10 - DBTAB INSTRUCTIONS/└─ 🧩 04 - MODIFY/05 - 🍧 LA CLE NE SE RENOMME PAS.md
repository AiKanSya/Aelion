# 🌸 EXERCICES — LA CLÉ NE SE RENOMME PAS

## 🌺 OBJECTIFS

- comprendre le rôle de la clé source ;
- reproduire une tentative de changement de clé ;
- prouver que l’ancienne ligne reste inchangée ;
- éviter une stratégie incorrecte ;
- identifier une solution métier explicite.

## 🌺 DURÉE INDICATIVE

35 à 50 minutes.

## 🌺 PRÉPARATION

Créer :

```text
ORDER_ID = 9100000011
```

## 🌺 TENTATIVE

Lire la ligne dans `ls_order`, puis écrire :

```abap
ls_order-order_id = '9100000012'.

UPDATE zt_<tri>_ord
  FROM @ls_order.
```

## 🌺 RÉSULTAT ATTENDU

```text
sy-subrc = 4
sy-dbcnt = 0
```

Vérifications :

```text
9100000011 existe toujours
9100000012 n’existe pas
```

## 🌺 QUESTIONS

1. quelle clé est recherchée par l’update ?
2. la structure contient-elle encore l’ancienne clé ?
3. pourquoi l’ancienne ligne n’est-elle pas trouvée ?
4. pourquoi la nouvelle ligne n’est-elle pas créée ?
5. faut-il autoriser une modification de clé dans une application métier ordinaire ?
6. quelle stratégie transactionnelle serait nécessaire si le besoin était validé ?

## 🌺 STRATÉGIE THÉORIQUE

```text
1. Verrouiller la donnée.
2. Vérifier l’absence de la nouvelle clé.
3. Créer la nouvelle ligne.
4. Mettre à jour les références dépendantes.
5. Supprimer l’ancienne ligne.
6. Valider l’ensemble en une transaction.
7. Annuler intégralement en cas d’échec.
```

Cette stratégie n’est pas exécutée dans l’exercice.

## 🌺 CRITÈRES DE VALIDATION

- [ ] L’update retourne `4`.
- [ ] L’ancienne ligne existe toujours.
- [ ] La nouvelle ligne n’est pas créée.
- [ ] La clé est reconnue comme critère de recherche.
- [ ] Aucune pseudo-modification de clé n’est conservée.
- [ ] La stratégie théorique est transactionnelle.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
SELECT SINGLE *
  FROM zt_<tri>_ord
  WHERE order_id = '9100000011'
  INTO @DATA(ls_order).

IF sy-subrc = 0.

  ls_order-order_id = '9100000012'.

  UPDATE zt_<tri>_ord
    FROM @ls_order.

  WRITE: / |sy-subrc : { sy-subrc }|,
         / |sy-dbcnt : { sy-dbcnt }|.

ENDIF.
```

La structure ne contient plus la clé `9100000011`.  
L’update cherche `9100000012`, qui n’existe pas.

</details>
