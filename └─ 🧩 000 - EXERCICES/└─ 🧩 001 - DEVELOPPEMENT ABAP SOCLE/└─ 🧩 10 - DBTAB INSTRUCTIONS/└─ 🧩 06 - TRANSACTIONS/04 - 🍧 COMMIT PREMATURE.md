# 🌸 EXERCICE 04 — COMMIT PRÉMATURÉ

## 🌺 OBJECTIFS

- reproduire une incohérence transactionnelle ;
- comprendre qu’un rollback ne traverse pas un commit ;
- corriger la frontière ;
- prouver la non-régression.

## 🌺 DURÉE INDICATIVE

45 à 55 minutes.

## 🌺 CAS INCORRECT

Analyser sans conserver les données :

```abap
INSERT zt_<tri>_stat FROM @ls_status.
COMMIT WORK.

INSERT zt_<tri>_ord FROM @ls_order_1.

IF sy-subrc <> 0.
  ROLLBACK WORK.
ENDIF.
```

## 🌺 QUESTIONS

1. le statut est-il déjà permanent ?
2. le rollback final annule-t-il le statut ?
3. quel état incohérent peut rester ?
4. où doit être placé le commit ?
5. faut-il committer après chaque instruction réussie ?
6. quelle règle détermine la frontière ?

## 🌺 EXERCICE 1 — REPRODUCTION SÛRE

Utiliser uniquement le statut `T`.

1. insérer `T`;
2. committer ;
3. simuler une erreur avant les commandes ;
4. rollback ;
5. vérifier que `T` reste présent ;
6. nettoyer `T` dans une nouvelle transaction.

## 🌺 EXERCICE 2 — CORRECTION

Version attendue :

```text
Insertion statut
Insertion commandes
Contrôles
COMMIT unique
```

ou :

```text
Erreur
ROLLBACK unique
```

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le statut reste après le rollback postérieur.
- [ ] La limite du rollback est comprise.
- [ ] L’état incohérent est identifié.
- [ ] Le statut de test est nettoyé.
- [ ] Le commit final est unique.
- [ ] La frontière repose sur l’unité métier.

<details>
<summary>🍧 Afficher la solution</summary>

```text
COMMIT
→ ferme la SAP LUW 1

Erreur
ROLLBACK
→ annule uniquement la SAP LUW 2

Les données de la SAP LUW 1 restent persistantes.
```

Correction :

```abap
INSERT zt_<tri>_stat FROM @ls_status.

IF sy-subrc = 0.
  INSERT zt_<tri>_ord FROM TABLE @lt_orders.
ENDIF.

IF sy-subrc = 0
   AND sy-dbcnt = lines( lt_orders ).

  COMMIT WORK AND WAIT.

ELSE.

  ROLLBACK WORK.

ENDIF.
```

</details>
