# 🌸 EXERCICES — TABLE DE SÉLECTION VIDE

## 🌺 OBJECTIFS

- utiliser une table de sélection ;
- observer le danger d’un filtre initial ;
- ajouter un contrôle obligatoire ;
- distinguer critère facultatif et critère obligatoire ;
- éviter une suppression générale.

## 🌺 DURÉE INDICATIVE

45 à 60 minutes.

## 🌺 DÉCLARATION

```abap
DATA lr_order_id TYPE RANGE OF zde_<tri>_oid.
```

## 🌺 EXERCICE 1 — TABLE ALIMENTÉE

```abap
lr_order_id = VALUE #(
  ( sign = 'I'
    option = 'EQ'
    low = '9300000020' )

  ( sign = 'I'
    option = 'EQ'
    low = '9300000021' )
).
```

Prévisualiser puis supprimer les deux lignes de test.

## 🌺 EXERCICE 2 — TABLE VIDE

Analyser sans exécuter la suppression :

```abap
CLEAR lr_order_id.

DELETE FROM zt_<tri>_ord
  WHERE order_id IN @lr_order_id.
```

Répondre :

1. la condition restreint-elle les lignes ?
2. quelle portée peut avoir la suppression ?
3. pourquoi ce comportement est-il adapté aux filtres facultatifs d’un `SELECT` mais dangereux pour un `DELETE` ?
4. quel contrôle faut-il ajouter ?
5. faut-il uniquement tester `sy-subrc` après l’opération ?

## 🌺 EXERCICE 3 — CORRECTION

```abap
IF lr_order_id IS INITIAL.
  WRITE / 'Aucun identifiant fourni : suppression refusée'.
  RETURN.
ENDIF.
```

Ajouter également une plage de sécurité :

```abap
AND order_id BETWEEN '9300000000'
                 AND '9300000099'
```

## 🌺 EXERCICE 4 — EXCLUSIONS

Construire :

```text
Inclure 9300000020 à 9300000029
Exclure 9300000025
```

Prévisualiser les clés.

Ne supprimer que si le résultat correspond au cas de test préparé.

## 🌺 EXERCICE 5 — CONDITION DYNAMIQUE

Expliquer pourquoi une condition dynamique n’est pas retenue dans ce chapitre de base.

Risques :

- chaîne vide ;
- syntaxe générée incorrecte ;
- périmètre non visible ;
- difficulté d’audit ;
- injection logique si la construction est mal maîtrisée.

## 🌺 CRITÈRES DE VALIDATION

- [ ] La table de sélection alimentée est utilisée.
- [ ] Le comportement d’une table vide est compris.
- [ ] La suppression dangereuse n’est pas exécutée.
- [ ] Le contrôle non vide est ajouté.
- [ ] La plage de sécurité est indépendante du filtre utilisateur.
- [ ] Une exclusion est testée.
- [ ] La condition dynamique est écartée avec justification.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
IF lr_order_id IS INITIAL.
  WRITE / 'Aucun identifiant fourni : suppression refusée'.
  RETURN.
ENDIF.

SELECT order_id
  FROM zt_<tri>_ord
  WHERE order_id IN @lr_order_id
    AND order_id BETWEEN '9300000000'
                     AND '9300000099'
  INTO TABLE @DATA(lt_preview).

IF lt_preview IS INITIAL.
  WRITE / 'Aucune commande de test correspondante'.
  RETURN.
ENDIF.

DELETE FROM zt_<tri>_ord
  WHERE order_id IN @lr_order_id
    AND order_id BETWEEN '9300000000'
                     AND '9300000099'.
```

</details>
