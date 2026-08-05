# 🌸 EXERCICES — ROLLBACK WORK : ERREUR AVANT VALIDATION

## 🌺 OBJECTIFS

- produire une erreur fonctionnelle contrôlée ;
- annuler toutes les écritures ;
- vérifier l’absence complète ;
- ne pas effectuer de commit partiel ;
- distinguer erreur métier et erreur d’exécution.

## 🌺 DURÉE INDICATIVE

45 à 60 minutes.

## 🌺 SCÉNARIO

1. créer le statut `T`;
2. créer la commande `9400000010`;
3. détecter une erreur sur une deuxième demande ;
4. annuler l’ensemble.

L’erreur est simulée sans dump :

```text
Montant négatif
```

## 🌺 EXERCICE 1 — ÉCRITURES VALIDES PROVISOIRES

Insérer :

```text
Statut T
Commande 9400000010
```

Ne pas committer.

## 🌺 EXERCICE 2 — ERREUR FONCTIONNELLE

Préparer une deuxième commande :

```text
9400000011
Montant -10,00
```

Le contrôle doit refuser l’écriture.

## 🌺 EXERCICE 3 — ROLLBACK

Exécuter :

```abap
ROLLBACK WORK.
```

## 🌺 EXERCICE 4 — RELECTURE

Résultat attendu :

```text
Statut T absent
Commande 9400000010 absente
Commande 9400000011 absente
```

## 🌺 QUESTIONS

1. la première commande était-elle visible dans la session avant le rollback ?
2. était-elle permanente ?
3. pourquoi le statut est-il également annulé ?
4. faut-il tenter de supprimer manuellement chaque ligne après le rollback ?
5. le programme doit-il afficher « commande créée » avant la décision finale ?

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le statut et la première commande sont provisoirement écrits.
- [ ] La deuxième demande est refusée avant écriture.
- [ ] Un rollback unique est exécuté.
- [ ] Aucune donnée ne subsiste.
- [ ] Aucun message de succès prématuré n’est affiché.
- [ ] L’erreur reste contrôlée et ne provoque pas de dump.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
DATA(lv_has_error) = abap_false.

INSERT zt_<tri>_stat
  FROM @ls_status.

IF sy-subrc <> 0.
  lv_has_error = abap_true.
ENDIF.

IF lv_has_error = abap_false.

  INSERT zt_<tri>_ord
    FROM @ls_first_order.

  IF sy-subrc <> 0.
    lv_has_error = abap_true.
  ENDIF.

ENDIF.

IF ls_second_order-amount < 0.
  lv_has_error = abap_true.
  WRITE / 'Montant négatif : transaction refusée'.
ENDIF.

IF lv_has_error = abap_true.

  ROLLBACK WORK.
  WRITE / 'Toutes les écritures ont été annulées'.

ELSE.

  INSERT zt_<tri>_ord
    FROM @ls_second_order.

  IF sy-subrc = 0.
    COMMIT WORK AND WAIT.
  ELSE.
    ROLLBACK WORK.
  ENDIF.

ENDIF.
```

</details>
