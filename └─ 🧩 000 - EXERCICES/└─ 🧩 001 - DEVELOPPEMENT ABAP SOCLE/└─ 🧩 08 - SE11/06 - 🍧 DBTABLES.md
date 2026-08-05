# 🌸 EXERCICES — TABLES

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- créer une table transparente ;
- définir une clé primaire ;
- définir les paramètres techniques ;
- utiliser un champ mandant ;
- définir une référence de devise ;
- créer une clé étrangère ;
- créer un index secondaire justifié ;
- insérer et lire des données avec Open SQL ;
- distinguer définition, contenu et table de contrôle.

## 🌺 DURÉE INDICATIVE

120 à 150 minutes.

## 🌺 PRÉREQUIS

Les domaines et éléments de données précédents doivent être actifs.

## 🌺 EXERCICE 1 — TABLE DES STATUTS

Créer :

```text
ZT_<TRI>_STAT
```

Description :

```text
Statuts des commandes de formation
```

Classe de livraison :

```text
A
```

Champs :

| Champ         | Clé | Élément de données |
| ------------- | --- | ------------------ |
| `MANDT`       | Oui | `MANDT`            |
| `STATUS`      | Oui | `ZDE_<TRI>_STAT`   |
| `STATUS_TEXT` | Non | `ZDE_<TRI>_STTXT`  |

Options techniques :

```text
Classe de données : APPL0
Catégorie taille  : 0
Buffering          : non autorisé pour l’exercice
```

Justification :

- table de référence de faible volume ;
- exercice simplifié ;
- aucun buffering n’est activé sans stratégie de cohérence.

## 🌺 EXERCICE 2 — TABLE DES COMMANDES

Créer :

```text
ZT_<TRI>_ORD
```

Description :

```text
Commandes de formation
```

Classe de livraison :

```text
A
```

Champs :

| Champ           | Clé | Élément de données |
| --------------- | --- | ------------------ |
| `MANDT`         | Oui | `MANDT`            |
| `ORDER_ID`      | Oui | `ZDE_<TRI>_OID`    |
| `CUSTOMER_NAME` | Non | `ZDE_<TRI>_NAME`   |
| `PRIORITY`      | Non | `ZDE_<TRI>_PRIO`   |
| `STATUS`        | Non | `ZDE_<TRI>_STAT`   |
| `CURRENCY`      | Non | `WAERS`            |
| `AMOUNT`        | Non | `WRBTR`            |
| `CREATED_BY`    | Non | `ERNAM`            |
| `CREATED_ON`    | Non | `ERDAT`            |

Options techniques :

```text
Classe de données : APPL1
Catégorie taille  : 0
Buffering          : non autorisé
```

Justification :

- les commandes représentent des données transactionnelles ;
- elles peuvent être modifiées fréquemment ;
- aucun buffering n’est nécessaire pour le besoin pédagogique.

## 🌺 EXERCICE 3 — CHAMP DE RÉFÉRENCE

Pour `AMOUNT`, définir :

```text
Table de référence : ZT_<TRI>_ORD
Champ de référence : CURRENCY
```

Répondre :

1. quel type possède `AMOUNT` ?
2. quel type possède `CURRENCY` ?
3. pourquoi la devise est-elle nécessaire ?
4. le montant `100` possède-t-il un sens monétaire complet sans devise ?
5. une référence de devise constitue-t-elle une conversion de devise ?

## 🌺 EXERCICE 4 — CLÉ ÉTRANGÈRE

Sur `ZT_<TRI>_ORD-STATUS`, créer la clé étrangère vers :

```text
ZT_<TRI>_STAT
```

Mapping :

```text
MANDT → MANDT
STATUS → STATUS
```

Cardinalité :

```text
1:CN
```

Texte court :

```text
Statut de commande autorisé
```

Répondre :

1. quelle table est la table de contrôle ?
2. quelle table est la table étrangère ?
3. pourquoi le mandant participe-t-il à la relation ?
4. un statut peut-il être utilisé par plusieurs commandes ?
5. une commande doit-elle pointer vers un statut existant ?
6. Open SQL dispense-t-il le programme de contrôler ses écritures ?

## 🌺 EXERCICE 5 — CATÉGORIE D’EXTENSION

Définir une catégorie d’extension cohérente pour les deux tables.

Justifier le choix.

Ne pas laisser l’objet « non classifié ».

## 🌺 EXERCICE 6 — INDEX SECONDAIRE

Besoin :

```text
Recherche fréquente des commandes par statut et date de création.
```

Créer sur `ZT_<TRI>_ORD` un index secondaire non unique :

```text
Z01
```

Champs :

```text
MANDT
STATUS
CREATED_ON
```

Répondre :

1. pourquoi `ORDER_ID` n’est-il pas nécessaire dans cet index ?
2. pourquoi l’index est-il non unique ?
3. pourquoi ne faut-il pas créer un index pour chaque champ ?
4. quel coût possède un index lors des écritures ?
5. faut-il conserver cet index si aucun accès ne l’utilise ?

## 🌺 EXERCICE 7 — PROGRAMME DE CHARGEMENT

Compléter le programme `ZAELION_<TRI>_SE11`.

> [!CAUTION]
> Le code supprime uniquement les données des tables personnalisées du stagiaire dans le mandant courant.

```abap
REPORT zaelion_<tri>_se11.

DATA lt_status TYPE STANDARD TABLE OF zt_<tri>_stat
  WITH EMPTY KEY.

DATA lt_orders TYPE STANDARD TABLE OF zt_<tri>_ord
  WITH EMPTY KEY.

START-OF-SELECTION.

  DELETE FROM zt_<tri>_ord.
  DELETE FROM zt_<tri>_stat.

  lt_status = VALUE #(
    ( mandt = sy-mandt
      status = 'N'
      status_text = 'Nouvelle' )
    ( mandt = sy-mandt
      status = 'P'
      status_text = 'En préparation' )
    ( mandt = sy-mandt
      status = 'C'
      status_text = 'Clôturée' )
  ).

  INSERT zt_<tri>_stat
    FROM TABLE @lt_status.

  IF sy-subrc <> 0.
    MESSAGE 'Insertion des statuts impossible'
      TYPE 'S'
      DISPLAY LIKE 'E'.
    RETURN.
  ENDIF.

  lt_orders = VALUE #(
    ( mandt = sy-mandt
      order_id = '0000000001'
      customer_name = 'Alice Martin'
      priority = '2'
      status = 'N'
      currency = 'EUR'
      amount = '125.50'
      created_by = sy-uname
      created_on = sy-datum )

    ( mandt = sy-mandt
      order_id = '0000000002'
      customer_name = 'Bruno Bernard'
      priority = '3'
      status = 'P'
      currency = 'EUR'
      amount = '75.00'
      created_by = sy-uname
      created_on = sy-datum )

    ( mandt = sy-mandt
      order_id = '0000000003'
      customer_name = 'Claire Martin'
      priority = '1'
      status = 'C'
      currency = 'USD'
      amount = '50.00'
      created_by = sy-uname
      created_on = sy-datum )
  ).

  INSERT zt_<tri>_ord
    FROM TABLE @lt_orders.

  IF sy-subrc <> 0.
    ROLLBACK WORK.

    MESSAGE 'Insertion des commandes impossible'
      TYPE 'S'
      DISPLAY LIKE 'E'.
    RETURN.
  ENDIF.

  COMMIT WORK AND WAIT.

  SELECT *
    FROM zt_<tri>_ord
    ORDER BY order_id
    INTO TABLE @DATA(lt_result).

  LOOP AT lt_result INTO DATA(ls_result).
    WRITE: / ls_result-order_id,
             ls_result-customer_name,
             ls_result-status,
             ls_result-amount,
             ls_result-currency.
  ENDLOOP.
```

## 🌺 EXERCICE 8 — CONTENU

Vérifier les deux tables avec l’outil de lecture autorisé dans le système :

```text
SE16N
ou
SE11 → Contenu
```

Relever :

- nombre de statuts ;
- nombre de commandes ;
- devise de la troisième commande ;
- nom de la deuxième commande ;
- valeur interne des identifiants.

## 🌺 EXERCICE 9 — DIAGNOSTICS

### Cas A — `MANDT` non clé

Décrire l’erreur de conception.

### Cas B — `ORDER_ID` non clé

Décrire le risque de doublon.

### Cas C — `AMOUNT` sans référence

Lancer le contrôle et relever le message.

### Cas D — `STATUS` sans clé étrangère

Expliquer la perte de contrôle et de sémantique.

### Cas E — `APPL0` sur la table de commandes

Expliquer pourquoi `APPL1` correspond mieux au besoin.

### Cas F — index sur `CUSTOMER_NAME` sans requête associée

Expliquer pourquoi l’index n’est pas justifié.

### Cas G — insertion du statut `X` par programme

Expliquer pourquoi le programme doit préserver la cohérence même si la définition DDIC existe.

## 🌺 EXERCICE 10 — TABLES HISTORIQUES

Classer :

| Type         | À créer dans l’exercice | Usage                |
| ------------ | ----------------------- | -------------------- |
| Transparente | Oui                     | Données applicatives |
| Pool         | Non                     | Héritage historique  |
| Cluster      | Non                     | Héritage historique  |

## 🌺 LIVRABLES

- deux tables actives ;
- paramètres techniques ;
- référence de devise ;
- clé étrangère ;
- index `Z01` ;
- programme de chargement ;
- résultat des trois commandes ;
- preuves de contenu ;
- diagnostics.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Les noms respectent le namespace.
- [ ] `MANDT` est le premier champ clé.
- [ ] `ORDER_ID` participe à la clé primaire.
- [ ] La table de statuts utilise `APPL0`.
- [ ] La table de commandes utilise `APPL1`.
- [ ] Le montant référence la devise.
- [ ] La clé étrangère inclut le mandant.
- [ ] La cardinalité est justifiée.
- [ ] L’index correspond à un besoin.
- [ ] Les données sont insérées dans l’ordre cohérent.
- [ ] Le programme contrôle `sy-subrc`.
- [ ] Aucune table pool ou cluster n’est créée.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — propriétés

```text
ZT_<TRI>_STAT
Delivery class : A
Data class     : APPL0
Size category  : 0
Buffering      : Not allowed
```

```text
ZT_<TRI>_ORD
Delivery class : A
Data class     : APPL1
Size category  : 0
Buffering      : Not allowed
```

### Solution — référence

```text
ZT_<TRI>_ORD-AMOUNT
→ ZT_<TRI>_ORD-CURRENCY
```

### Solution — clé étrangère

```text
Check table   : ZT_<TRI>_STAT
Foreign table : ZT_<TRI>_ORD
Cardinality   : 1:CN
```

### Solution — index

```text
Z01
MANDT
STATUS
CREATED_ON
```

L’index est non unique, car plusieurs commandes peuvent partager le même statut et la même date.

</details>
