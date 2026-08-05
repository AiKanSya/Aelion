# 🌸 EXERCICES — ANATOMIE DE INSERT

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- identifier la cible ;
- identifier la source ;
- distinguer une ligne d’une table interne ;
- expliquer la clé primaire ;
- expliquer le rôle de `sy-subrc` et `sy-dbcnt` ;
- distinguer insertion et validation transactionnelle.

## 🌺 DURÉE INDICATIVE

30 à 40 minutes.

## 🌺 EXERCICE 1 — RESTITUTION

Compléter :

| Élément         | Rôle |
| --------------- | ---- |
| `INSERT`        |      |
| `zt_<tri>_ord`  |      |
| `ls_order`      |      |
| `lt_orders`     |      |
| `FROM`          |      |
| `FROM TABLE`    |      |
| `VALUES`        |      |
| `sy-subrc`      |      |
| `sy-dbcnt`      |      |
| `COMMIT WORK`   |      |
| `ROLLBACK WORK` |      |

## 🌺 EXERCICE 2 — CLASSIFICATION

Classer :

| Instruction                        | Une ligne | Plusieurs lignes | Remplace une clé existante |
| ---------------------------------- | --------- | ---------------- | -------------------------- |
| `INSERT ... FROM @ls_order`        |           |                  |                            |
| `INSERT INTO ... VALUES @ls_order` |           |                  |                            |
| `INSERT ... FROM TABLE @lt_orders` |           |                  |                            |

## 🌺 EXERCICE 3 — CLÉ

Pour la table :

```text
ZT_<TRI>_ORD
```

répondre :

1. quels champs composent la clé primaire ?
2. pourquoi deux commandes identiques peuvent-elles théoriquement exister dans deux mandants différents ?
3. une deuxième ligne avec le même `ORDER_ID` peut-elle être créée dans le mandant courant ?
4. l’insertion remplace-t-elle automatiquement la première ligne ?
5. quelle valeur de `sy-subrc` est attendue pour une insertion individuelle dupliquée ?

## 🌺 EXERCICE 4 — PERMANENCE

Classer les états suivants :

```text
Après INSERT, avant COMMIT
Après COMMIT
Après ROLLBACK
```

| État                  | Visible dans la transaction courante | Permanent | Annulable par rollback |
| --------------------- | ------------------------------------ | --------- | ---------------------- |
| Après `INSERT`        |                                      |           |                        |
| Après `COMMIT WORK`   |                                      |           |                        |
| Après `ROLLBACK WORK` |                                      |           |                        |

## 🌺 EXERCICE 5 — DIAGNOSTIC DE SYNTAXE

Analyser :

```abap
INSERT INTO zt_<tri>_ord
  FROM @ls_order.
```

Répondre :

1. la syntaxe mélange-t-elle deux variantes ?
2. quelle forme utiliser avec `FROM` ?
3. quelle forme utiliser avec `VALUES` ?
4. corriger les deux versions.

## 🌺 CRITÈRES DE VALIDATION

- [ ] La table cible est identifiée.
- [ ] Structure et table interne sont distinguées.
- [ ] Les deux syntaxes individuelles sont connues.
- [ ] La clé inclut le mandant.
- [ ] Une clé dupliquée n’est pas remplacée.
- [ ] Le commit est distingué de l’insertion.
- [ ] La syntaxe mixte est corrigée.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — restitution

| Élément         | Rôle                                                |
| --------------- | --------------------------------------------------- |
| `INSERT`        | Crée une ou plusieurs nouvelles lignes en base.     |
| `zt_<tri>_ord`  | Table cible.                                        |
| `ls_order`      | Source contenant une ligne.                         |
| `lt_orders`     | Source contenant plusieurs lignes.                  |
| `FROM`          | Introduit une structure ou expression source.       |
| `FROM TABLE`    | Introduit une table interne source.                 |
| `VALUES`        | Introduit une ligne avec la variante `INSERT INTO`. |
| `sy-subrc`      | Indique le résultat technique de l’instruction.     |
| `sy-dbcnt`      | Indique le nombre de lignes insérées.               |
| `COMMIT WORK`   | Valide la LUW de base de données.                   |
| `ROLLBACK WORK` | Annule les écritures non validées de la LUW.        |

### Solution — classification

| Instruction             | Une ligne | Plusieurs lignes | Remplacement |
| ----------------------- | --------- | ---------------- | ------------ |
| `FROM @ls_order`        | Oui       | Non              | Non          |
| `VALUES @ls_order`      | Oui       | Non              | Non          |
| `FROM TABLE @lt_orders` | Non       | Oui              | Non          |

### Solution — syntaxe

```abap
INSERT zt_<tri>_ord
  FROM @ls_order.
```

```abap
INSERT INTO zt_<tri>_ord
  VALUES @ls_order.
```

</details>
