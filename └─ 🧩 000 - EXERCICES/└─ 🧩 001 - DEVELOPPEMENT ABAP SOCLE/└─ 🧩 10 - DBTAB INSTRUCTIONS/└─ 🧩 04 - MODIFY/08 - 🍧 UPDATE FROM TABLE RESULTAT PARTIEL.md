# 🌸 EXERCICES — UPDATE FROM TABLE : RÉSULTAT PARTIEL

## 🌺 OBJECTIFS

- préparer un lot contenant une clé absente ;
- constater que les autres lignes sont modifiées ;
- interpréter `sy-subrc = 4`;
- utiliser `sy-dbcnt`;
- appliquer une règle « tout ou rien » ;
- vérifier l’effet du rollback.

## 🌺 DURÉE INDICATIVE

55 à 70 minutes.

## 🌺 PRÉPARATION EN BASE

Créer uniquement :

```text
9100000040
9100000041
```

## 🌺 TABLE INTERNE DE MISE À JOUR

Préparer trois lignes complètes :

```text
9100000040 → existe
9100000041 → existe
9100000049 → n’existe pas
```

## 🌺 EXERCICE 1 — EXÉCUTION

Exécuter :

```abap
UPDATE zt_<tri>_ord
  FROM TABLE @lt_orders.
```

Résultat attendu :

```text
sy-subrc = 4
sy-dbcnt = 2
```

## 🌺 EXERCICE 2 — RELECTURE AVANT ROLLBACK

Vérifier :

```text
9100000040 modifiée
9100000041 modifiée
9100000049 absente
```

## 🌺 EXERCICE 3 — ANALYSE

Répondre :

1. `sy-subrc = 4` signifie-t-il qu’aucune ligne n’a changé ?
2. quelle valeur prouve les deux mises à jour ?
3. l’instruction crée-t-elle la troisième ligne ?
4. le lot est-il atomique par défaut ?
5. que se passerait-il au prochain commit sans rollback ?

## 🌺 EXERCICE 4 — RÈGLE TOUT OU RIEN

Appliquer :

```abap
IF sy-subrc <> 0
   OR sy-dbcnt <> lines( lt_orders ).

  ROLLBACK WORK.

ENDIF.
```

Vérifier que les deux lignes de préparation disparaissent.

## 🌺 EXERCICE 5 — RÈGLE PARTIELLE

Analyser sans commit :

```text
Le métier accepte la modification des lignes existantes
et souhaite un rapport des clés absentes.
```

Décrire la stratégie :

1. identifier les clés existantes avant l’écriture ;
2. séparer les lignes modifiables ;
3. tracer les absentes ;
4. mettre à jour le sous-ensemble ;
5. valider explicitement le résultat partiel.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Deux lignes existent en base.
- [ ] Trois lignes existent dans la source.
- [ ] `sy-subrc` vaut `4`.
- [ ] `sy-dbcnt` vaut `2`.
- [ ] Les deux lignes sont modifiées avant rollback.
- [ ] La clé absente n’est pas créée.
- [ ] Le lot est reconnu comme partiel.
- [ ] Le rollback annule l’ensemble du test.
- [ ] Une stratégie partielle est décrite sans ambiguïté.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
UPDATE zt_<tri>_ord
  FROM TABLE @lt_orders.

DATA(lv_update_subrc) = sy-subrc.
DATA(lv_update_count) = sy-dbcnt.
DATA(lv_expected_count) = lines( lt_orders ).

WRITE: / |Lignes attendues : { lv_expected_count }|,
       / |Lignes modifiées : { lv_update_count }|,
       / |sy-subrc         : { lv_update_subrc }|.

IF lv_update_subrc <> 0
   OR lv_update_count <> lv_expected_count.

  WRITE / 'Lot incomplet : annulation de la transaction'.
  ROLLBACK WORK.

ELSE.

  WRITE / 'Lot complet'.

ENDIF.
```

</details>
