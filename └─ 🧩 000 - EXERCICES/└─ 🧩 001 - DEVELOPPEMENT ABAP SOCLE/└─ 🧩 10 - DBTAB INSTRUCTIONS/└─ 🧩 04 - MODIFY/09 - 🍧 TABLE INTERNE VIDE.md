# 🌸 EXERCICES — TABLE INTERNE VIDE

## 🌺 OBJECTIFS

- exécuter une mise à jour avec une source vide ;
- interpréter `0/0`;
- distinguer succès technique et absence fonctionnelle ;
- ajouter un contrôle préalable ;
- éviter un faux message de réussite.

## 🌺 DURÉE INDICATIVE

30 à 40 minutes.

## 🌺 EXERCICE 1 — SOURCE VIDE

Déclarer :

```abap
DATA lt_orders TYPE STANDARD TABLE OF zt_<tri>_ord
  WITH EMPTY KEY.
```

Exécuter :

```abap
UPDATE zt_<tri>_ord
  FROM TABLE @lt_orders.
```

Résultat attendu :

```text
sy-subrc = 0
sy-dbcnt = 0
```

## 🌺 EXERCICE 2 — MAUVAIS MESSAGE

Analyser :

```abap
IF sy-subrc = 0.
  WRITE / 'Toutes les commandes ont été mises à jour'.
ENDIF.
```

Répondre :

1. combien de commandes ont été mises à jour ?
2. le message est-il exact ?
3. quelle information manque ?
4. faut-il comparer `sy-dbcnt` au volume attendu ?
5. faut-il vérifier la table avant l’écriture ?

## 🌺 EXERCICE 3 — CORRECTION

Écrire :

```abap
IF lt_orders IS INITIAL.
  WRITE / 'Aucune commande à mettre à jour'.
  RETURN.
ENDIF.
```

Puis contrôler le résultat de l’update.

## 🌺 EXERCICE 4 — CAS FONCTIONNEL

Classer :

| Contexte                                       | Table vide acceptable |
| ---------------------------------------------- | --------------------- |
| Aucun résultat après filtre facultatif         |                       |
| Import annoncé de cent commandes               |                       |
| Traitement nocturne sans donnée du jour        |                       |
| Correction demandée pour une liste obligatoire |                       |

La réponse dépend de la règle métier. Justifier.

## 🌺 CRITÈRES DE VALIDATION

- [ ] La source est réellement vide.
- [ ] Le résultat `0/0` est observé.
- [ ] Le faux message est corrigé.
- [ ] Le contrôle préalable est ajouté.
- [ ] Le succès technique est distingué du résultat métier.
- [ ] Le contexte guide la décision.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
IF lt_orders IS INITIAL.
  WRITE / 'Aucune commande à mettre à jour'.
  RETURN.
ENDIF.

UPDATE zt_<tri>_ord
  FROM TABLE @lt_orders.

DATA(lv_update_count) = sy-dbcnt.

IF sy-subrc = 0
   AND lv_update_count = lines( lt_orders ).

  WRITE / |{ lv_update_count } commande(s) mise(s) à jour|.

ELSE.

  WRITE / 'La mise à jour est incomplète'.

ENDIF.
```

</details>
