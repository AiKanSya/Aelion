# 🌸 EXERCICES — MODIDFY WITH INDEX

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [MODIDFY WITH INDEX](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  03 - 🧩 ITAB INSTRUCTIONS/07 - 🍧 MODIFY INDEX.md>)

## 🌺 OBJECTIFS

- modifier une ligne par index ;
- transporter uniquement certains composants ;
- contrôler un index absent ;
- distinguer index primaire et clé ;
- identifier l’incompatibilité avec une table hachée sans index secondaire trié.

## 🌺 DURÉE INDICATIVE

35 à 50 minutes.

## 🌺 EXERCICE 1 — MODIFICATION DE LA DEUXIÈME LIGNE

À partir des données communes, modifier uniquement :

```text
amount = 200,00
priority = 8
```

sur la ligne d’index `2`.

Utiliser :

```abap
MODIFY lt_orders
  FROM VALUE #(
    amount = '200.00'
    priority = 8
  )
  INDEX 2
  TRANSPORTING amount priority.
```

## 🌺 EXERCICE 2 — INDEX ABSENT

Tester l’index `10`.

Contrôler `sy-subrc`.

Résultat attendu :

```text
Index 10 absent
```

## 🌺 EXERCICE 3 — INDEX NUL

Analyser sans exécuter :

```abap
MODIFY lt_orders INDEX 0 FROM ls_order.
```

Répondre :

1. un index commence-t-il à zéro ?
2. quelle valeur minimale est valide ?
3. pourquoi ce cas ne doit-il pas être exécuté volontairement ?
4. quel contrôle faut-il effectuer sur un index dynamique ?

## 🌺 EXERCICE 4 — TABLE TRIÉE

Une table triée est une table d’index.

Répondre :

1. peut-on modifier un composant non clé par index ?
2. peut-on modifier librement la clé primaire ?
3. pourquoi `TRANSPORTING` réduit-il le risque ?
4. quel index est utilisé sans `USING KEY` ?

## 🌺 EXERCICE 5 — TABLE HACHÉE

Analyser :

```abap
MODIFY lt_orders_hashed
  INDEX 1
  FROM ls_order.
```

Répondre :

1. la table possède-t-elle un index primaire ?
2. quelle sélection faut-il privilégier ?
3. quelle instruction convient à une modification identifiée par clé ?
4. un accès via index secondaire trié appartient-il au périmètre de base de cet exercice ?

## 🌺 CRITÈRES DE VALIDATION

- [ ] La deuxième ligne est modifiée.
- [ ] Les autres composants sont conservés.
- [ ] L’index absent est traité.
- [ ] L’index zéro n’est pas exécuté.
- [ ] Les composants de clé sont protégés.
- [ ] Une table hachée n’est pas traitée par index primaire.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
MODIFY lt_orders
  FROM VALUE #(
    amount = '200.00'
    priority = 8
  )
  INDEX 2
  TRANSPORTING amount priority.

IF sy-subrc <> 0.
  WRITE / 'Index 2 absent'.
ENDIF.

MODIFY lt_orders
  FROM VALUE #( amount = '1.00' )
  INDEX 10
  TRANSPORTING amount.

IF sy-subrc <> 0.
  WRITE / 'Index 10 absent'.
ENDIF.
```

Validation d’un index dynamique :

```abap
IF lv_index BETWEEN 1 AND lines( lt_orders ).
  MODIFY lt_orders
    FROM ls_order
    INDEX lv_index.
ELSE.
  WRITE / 'Index invalide'.
ENDIF.
```

</details>
