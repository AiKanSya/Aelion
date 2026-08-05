# 🌸 EXERCICES — READ TABLE

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [READ TABLE](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  03 - 🧩 ITAB INSTRUCTIONS/12 - 🍧 READ.md>)

## 🌺 OBJECTIFS

- lire par index ;
- lire par clé libre ;
- lire par clé de table ;
- utiliser `INTO`, `ASSIGNING` et `TRANSPORTING NO FIELDS`;
- contrôler `sy-subrc` et `sy-tabix`;
- éviter d’utiliser une structure cible après une lecture échouée ;
- distinguer copie et accès direct.

## 🌺 DURÉE INDICATIVE

65 à 80 minutes.

## 🌺 EXERCICE 1 — `INTO`

Lire la commande `4500000002` dans une structure.

Modifier ensuite la structure locale.

Répondre :

1. la ligne de table est-elle modifiée ?
2. pourquoi ?
3. quelle instruction serait nécessaire pour réécrire la ligne ?
4. quel avantage présente la copie lorsque la table ne doit pas être modifiée directement ?

## 🌺 EXERCICE 2 — `ASSIGNING`

Lire la même ligne avec :

```abap
READ TABLE lt_orders
  ASSIGNING FIELD-SYMBOL(<lfs_order>)
  WITH KEY order_id = '4500000002'.
```

Si la lecture réussit, modifier le statut par le field-symbol.

Vérifier que la table est modifiée.

## 🌺 EXERCICE 3 — EXISTENCE SEULE

Vérifier l’existence de `4500000004` sans copier ni assigner la ligne :

```abap
READ TABLE lt_orders
  WITH KEY order_id = '4500000004'
  TRANSPORTING NO FIELDS.
```

Afficher `sy-tabix` uniquement lorsque `sy-subrc = 0`.

## 🌺 EXERCICE 4 — INDEX

Lire la première ligne avec :

```abap
READ TABLE lt_orders INDEX 1 INTO DATA(ls_first).
```

Tester également un index absent.

## 🌺 EXERCICE 5 — STRUCTURE NON VIDÉE APRÈS ÉCHEC

Exécuter :

```abap
READ TABLE lt_orders
  WITH KEY order_id = '4500000001'
  INTO DATA(ls_result).

READ TABLE lt_orders
  WITH KEY order_id = 'INCONNU'
  INTO ls_result.
```

Répondre :

1. la deuxième lecture réussit-elle ?
2. `ls_result` peut-elle encore contenir la première ligne ?
3. pourquoi faut-il utiliser la structure uniquement dans la branche `sy-subrc = 0` ?
4. faut-il conclure à la présence de la ligne à partir du contenu résiduel ?

## 🌺 EXERCICE 6 — TABLE HACHÉE

Lire une table hachée avec :

```abap
READ TABLE lt_orders_hashed
  WITH TABLE KEY order_id = '4500000002'
  INTO DATA(ls_hashed).
```

Répondre :

1. `sy-tabix` représente-t-il un index primaire valide ?
2. quelle valeur est attendue pour une table hachée ?
3. quel champ système faut-il utiliser pour déterminer le succès ?
4. pourquoi la clé complète est-elle fournie ?

## 🌺 EXERCICE 7 — COMBINAISON INVALIDE

Analyser :

```abap
READ TABLE lt_orders
  ASSIGNING <lfs_order>
  WITH KEY order_id = '4500000001'
  TRANSPORTING NO FIELDS.
```

Corriger en choisissant une seule intention :

- accéder à la ligne ;
- vérifier uniquement son existence.

## 🌺 CRITÈRES DE VALIDATION

- [ ] `INTO` produit une copie.
- [ ] `ASSIGNING` permet une modification directe.
- [ ] `TRANSPORTING NO FIELDS` vérifie uniquement l’existence.
- [ ] Les formes alternatives ne sont pas combinées.
- [ ] `sy-subrc` est contrôlé avant toute utilisation.
- [ ] Une structure résiduelle n’est pas interprétée comme un résultat valide.
- [ ] `sy-tabix` n’est pas utilisé comme index d’une table hachée.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
READ TABLE lt_orders
  WITH KEY order_id = '4500000002'
  INTO DATA(ls_order).

IF sy-subrc = 0.
  ls_order-status = 'C'.
  " La table n’est pas modifiée.
ENDIF.

READ TABLE lt_orders
  ASSIGNING FIELD-SYMBOL(<lfs_order>)
  WITH KEY order_id = '4500000002'.

IF sy-subrc = 0.
  <lfs_order>-status = 'C'.
ENDIF.

READ TABLE lt_orders
  WITH KEY order_id = '4500000004'
  TRANSPORTING NO FIELDS.

IF sy-subrc = 0.
  WRITE / |Ligne trouvée à l'index { sy-tabix }|.
ELSE.
  WRITE / 'Ligne absente'.
ENDIF.
```

Pour une table hachée, contrôler `sy-subrc`. `sy-tabix` vaut `0` car aucun index primaire n’existe.

</details>
