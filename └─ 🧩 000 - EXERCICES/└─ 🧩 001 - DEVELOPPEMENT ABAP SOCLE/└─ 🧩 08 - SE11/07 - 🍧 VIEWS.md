# 🌸 EXERCICES — VIEWS SAP

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [VIEWS SAP](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 08 - SE11/07 - 🍧 VIEWS.md>)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- définir une vue ;
- distinguer vue de base de données, vue de projection, vue de maintenance et vue d’aide ;
- créer une projection ;
- créer une jointure ;
- définir les conditions de jointure ;
- sélectionner uniquement les champs nécessaires ;
- tester une vue ;
- expliquer les limites des vues classiques.

## 🌺 DURÉE INDICATIVE

75 à 95 minutes.

## 🌺 RECTIFICATION

Une vue n’est pas systématiquement en lecture seule.

Le comportement dépend du type de vue, de sa définition et de son statut de maintenance.  
Dans ces exercices, les vues sont utilisées uniquement en lecture.

## 🌺 EXERCICE 1 — TYPES DE VUES

Compléter :

| Type             | Source | Jointure | Objet de base de données propre | Usage |
| ---------------- | ------ | -------- | ------------------------------- | ----- |
| Database View    |        |          |                                 |       |
| Projection View  |        |          |                                 |       |
| Maintenance View |        |          |                                 |       |
| Help View        |        |          |                                 |       |

## 🌺 EXERCICE 2 — VUE DE PROJECTION

Créer :

```text
ZP_<TRI>_ORD
```

Type :

```text
Projection View
```

Table source :

```text
ZT_<TRI>_ORD
```

Champs :

```text
MANDT
ORDER_ID
CUSTOMER_NAME
STATUS
CREATED_ON
```

Statut de maintenance :

```text
Lecture seule
```

Tester le contenu.

Répondre :

1. combien de tables sources sont utilisées ?
2. les champs `AMOUNT` et `CURRENCY` sont-ils stockés une deuxième fois ?
3. la vue possède-t-elle un objet de base de données propre ?
4. la vue masque-t-elle les champs non sélectionnés ?
5. les données originales sont-elles modifiées par une lecture ?

## 🌺 EXERCICE 3 — VUE DE BASE DE DONNÉES

Créer :

```text
ZV_<TRI>_ORD
```

Type :

```text
Database View
```

Tables :

```text
ZT_<TRI>_ORD
ZT_<TRI>_STAT
```

Conditions de jointure :

```text
ZT_<TRI>_ORD-MANDT
=
ZT_<TRI>_STAT-MANDT
```

```text
ZT_<TRI>_ORD-STATUS
=
ZT_<TRI>_STAT-STATUS
```

Champs de vue :

```text
MANDT
ORDER_ID
CUSTOMER_NAME
PRIORITY
STATUS
STATUS_TEXT
AMOUNT
CURRENCY
CREATED_ON
```

## 🌺 EXERCICE 4 — TEST ABAP

Ajouter dans le programme :

```abap
SELECT *
  FROM zv_<tri>_ord
  ORDER BY order_id
  INTO TABLE @DATA(lt_view).

LOOP AT lt_view INTO DATA(ls_view).
  WRITE: / ls_view-order_id,
           ls_view-customer_name,
           ls_view-status,
           ls_view-status_text,
           ls_view-amount,
           ls_view-currency.
ENDLOOP.
```

Résultat attendu :

```text
0000000001 Alice Martin N Nouvelle 125,50 EUR
0000000002 Bruno Bernard P En préparation 75,00 EUR
0000000003 Claire Martin C Clôturée 50,00 USD
```

## 🌺 EXERCICE 5 — JOINTURE INCOMPLÈTE

Supprimer temporairement la condition sur `MANDT`.

Lancer le contrôle.

Répondre :

1. pourquoi le mandant doit-il participer à la jointure ?
2. quel risque existe avec des tables dépendantes du mandant ?
3. faut-il ignorer l’avertissement ?
4. quelle correction appliquer ?

Restaurer la condition.

## 🌺 EXERCICE 6 — CHAMP AMBIGU

Les deux tables possèdent :

```text
MANDT
STATUS
```

Répondre :

1. faut-il identifier la table d’origine lors de la sélection des champs ?
2. quel champ `STATUS` doit être exposé ?
3. la valeur est-elle identique lorsque la jointure est correcte ?
4. pourquoi conserver une origine explicite améliore-t-il la maintenance ?

## 🌺 EXERCICE 7 — LIGNE SANS RÉFÉRENCE

Hypothèse :

```text
Une commande possède STATUS = X
Aucune ligne X dans ZT_<TRI>_STAT
```

Répondre :

1. la jointure classique de la Database View est-elle externe ou interne ?
2. la commande apparaît-elle dans la vue ?
3. pourquoi ce cas démontre-t-il l’importance de la cohérence des données ?
4. quelle logique moderne utiliserait-on si l’on devait conserver les commandes sans texte ?
5. cet exercice demande-t-il de créer cette variante ?

## 🌺 EXERCICE 8 — DDIC OU CDS

Classer :

| Besoin                                                        | Choix pédagogique ou moderne |
| ------------------------------------------------------------- | ---------------------------- |
| Comprendre une vue classique existante dans `SE11`            | DDIC View                    |
| Maintenir un ancien programme dépendant d’une Database View   | DDIC View                    |
| Nouveau modèle sémantique réutilisable sur plateforme moderne | CDS View Entity              |
| Projection simple de formation SAP GUI                        | Projection View              |
| Modèle RAP/Fiori moderne                                      | CDS View Entity              |

## 🌺 EXERCICE 9 — DIAGNOSTIC DE PERFORMANCE

La vue sélectionne :

```text
tous les champs
plusieurs tables
aucun besoin consommateur identifié
```

Décrire :

- symptôme ;
- coût potentiel ;
- correction ;
- preuve attendue.

## 🌺 LIVRABLES

- tableau des types ;
- projection active ;
- Database View active ;
- conditions de jointure ;
- résultat ABAP ;
- diagnostic mandant ;
- diagnostic de référence absente ;
- tableau DDIC/CDS ;
- diagnostic de performance.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Les types de vues sont distingués.
- [ ] La projection utilise une seule table.
- [ ] La vue de base de données joint les deux tables.
- [ ] Le mandant participe à la jointure.
- [ ] Seuls les champs nécessaires sont exposés.
- [ ] Le texte du statut est retourné.
- [ ] Une ligne sans correspondance est analysée.
- [ ] Les vues classiques sont replacées dans leur contexte.
- [ ] CDS View Entity est identifié pour le développement moderne.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — types

| Type             | Source                  | Jointure              | Objet DB | Usage                        |
| ---------------- | ----------------------- | --------------------- | -------- | ---------------------------- |
| Database View    | une ou plusieurs tables | Oui                   | Oui      | lecture logique par jointure |
| Projection View  | une table               | Non                   | Non      | masquer des champs           |
| Maintenance View | tables reliées          | Oui selon règles DDIC | Non      | maintenance logique          |
| Help View        | tables reliées          | Oui selon règles DDIC | Non      | méthode de sélection F4      |

### Solution — jointure

```text
ORD.MANDT = STAT.MANDT
ORD.STATUS = STAT.STATUS
```

La Database View classique réalise une jointure interne. Une commande sans statut de référence n’apparaît pas.

### Solution — contexte moderne

Pour un nouveau modèle moderne :

```text
CDS View Entity
```

La création des vues classiques reste utile pour la compréhension et la maintenance du patrimoine SAP GUI.

</details>
