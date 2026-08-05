# 🌸 EXERCICES — LIGNE ABSENTE

## 🌺 OBJECTIFS

- supprimer une clé inexistante ;
- interpréter `4/0`;
- produire un message précis ;
- ne pas confondre absence et erreur technique générale ;
- ne pas exécuter de commit inutile.

## 🌺 DURÉE INDICATIVE

25 à 35 minutes.

## 🌺 CONSIGNE

Utiliser :

```text
9300000099
```

sans préparer cette ligne.

## 🌺 EXERCICE 1 — WHERE

```abap
DELETE FROM zt_<tri>_ord
  WHERE order_id = '9300000099'.
```

Résultat attendu :

```text
sy-subrc = 4
sy-dbcnt = 0
```

## 🌺 EXERCICE 2 — STRUCTURE

Construire une structure contenant uniquement une clé complète puis utiliser :

```abap
DELETE zt_<tri>_ord
  FROM @ls_order.
```

Comparer le résultat.

## 🌺 MESSAGE ATTENDU

```text
Suppression impossible : la commande 9300000099 n’existe pas
```

## 🌺 QUESTIONS

1. une ligne est-elle créée ou modifiée ?
2. faut-il considérer le résultat comme un dump ?
3. faut-il exécuter un rollback ?
4. le programme peut-il continuer selon la règle métier ?
5. faut-il distinguer « déjà supprimée » de « identifiant incorrect » ?

## 🌺 CRITÈRES DE VALIDATION

- [ ] Aucune ligne n’est préparée.
- [ ] Les deux variantes retournent `4/0`.
- [ ] Aucune donnée n’est supprimée.
- [ ] Le message contient la clé.
- [ ] L’absence est distinguée d’un dump.
- [ ] La suite du traitement dépend de la règle métier.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
CONSTANTS lc_missing_id TYPE zde_<tri>_oid
  VALUE '9300000099'.

DELETE FROM zt_<tri>_ord
  WHERE order_id = @lc_missing_id.

IF sy-subrc = 4.
  WRITE / |Suppression impossible : la commande { lc_missing_id } n'existe pas|.
ENDIF.
```

</details>
