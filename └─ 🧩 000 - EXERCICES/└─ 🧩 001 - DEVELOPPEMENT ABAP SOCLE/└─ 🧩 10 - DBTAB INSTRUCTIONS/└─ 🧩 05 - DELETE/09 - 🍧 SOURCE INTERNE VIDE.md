# 🌸 EXERCICES — SOURCE INTERNE VIDE

## 🌺 OBJECTIFS

- observer `0/0`;
- distinguer succès technique et absence fonctionnelle ;
- ajouter un contrôle préalable ;
- éviter un faux message ;
- décider selon le contexte.

## 🌺 DURÉE INDICATIVE

25 à 35 minutes.

## 🌺 EXERCICE 1 — TABLE VIDE

```abap
DATA lt_orders_to_delete TYPE STANDARD TABLE OF zt_<tri>_ord
  WITH EMPTY KEY.

DELETE zt_<tri>_ord
  FROM TABLE @lt_orders_to_delete.
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
  WRITE / 'Toutes les commandes ont été supprimées'.
ENDIF.
```

Répondre :

1. combien de commandes ont été supprimées ?
2. le message est-il exact ?
3. faut-il vérifier `sy-dbcnt` ?
4. faut-il vérifier la source avant l’instruction ?
5. l’absence de demande est-elle toujours une erreur ?

## 🌺 EXERCICE 3 — CORRECTION

```abap
IF lt_orders_to_delete IS INITIAL.
  WRITE / 'Aucune commande à supprimer'.
  RETURN.
ENDIF.
```

## 🌺 EXERCICE 4 — CONTEXTE

| Situation                                 | Source vide acceptable |
| ----------------------------------------- | ---------------------- |
| Nettoyage facultatif sans donnée obsolète |                        |
| Demande explicite portant sur dix clés    |                        |
| Traitement quotidien sans ligne éligible  |                        |
| Suppression obligatoire d’un dossier      |                        |

Justifier chaque réponse.

## 🌺 CRITÈRES DE VALIDATION

- [ ] La source est vide.
- [ ] `sy-subrc` vaut `0`.
- [ ] `sy-dbcnt` vaut `0`.
- [ ] Le faux message est corrigé.
- [ ] La source est contrôlée.
- [ ] Le contexte métier guide le résultat.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
IF lt_orders_to_delete IS INITIAL.
  WRITE / 'Aucune commande à supprimer'.
  RETURN.
ENDIF.

DELETE zt_<tri>_ord
  FROM TABLE @lt_orders_to_delete.

IF sy-subrc = 0
   AND sy-dbcnt = lines( lt_orders_to_delete ).

  WRITE / |{ sy-dbcnt } commande(s) supprimée(s)|.

ELSE.

  WRITE / 'Suppression incomplète'.

ENDIF.
```

</details>
