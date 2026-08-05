# 🌸 EXERCICES — JOIN – COMBINER DES TABLES SAP

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [JOIN – COMBINER DES TABLES SAP](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 10 - DBTAB INSTRUCTIONS/└─ 🧩 01 - SELECT/07 - 🍧 JOIN.md>)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- combiner deux sources ;
- utiliser une condition `ON`;
- inclure le mandant dans la relation ;
- distinguer jointure interne et externe ;
- comprendre la multiplication des lignes ;
- qualifier les champs ;
- éviter qu’un filtre `WHERE` annule l’effet d’une jointure externe ;
- comparer une jointure à deux lectures séparées.

## 🌺 DURÉE INDICATIVE

80 à 100 minutes.

## 🌺 EXERCICE 1 — INNER JOIN

Lire les commandes et le texte du statut :

```abap
SELECT ord~order_id,
       ord~customer_name,
       ord~status,
       stat~status_text,
       ord~amount,
       ord~currency
  FROM zt_<tri>_ord AS ord
  INNER JOIN zt_<tri>_stat AS stat
    ON  stat~mandt  = ord~mandt
    AND stat~status = ord~status
  ORDER BY ord~order_id
  INTO TABLE @DATA(lt_orders).
```

Résultat attendu :

```text
0000000001 Alice Martin N Nouvelle 125,50 EUR
0000000002 Bruno Bernard P En préparation 75,00 EUR
0000000003 Claire Martin C Clôturée 50,00 USD
```

## 🌺 EXERCICE 2 — CONDITION DE JOINTURE

Compléter :

| Condition                  | Rôle |
| -------------------------- | ---- |
| `stat~mandt = ord~mandt`   |      |
| `stat~status = ord~status` |      |

Répondre :

1. pourquoi les deux comparaisons sont-elles nécessaires ?
2. que se passe-t-il si seule la comparaison du mandant est conservée ?
3. combien de combinaisons obtient-on théoriquement avec trois commandes et trois statuts dans le même mandant ?
4. ce résultat constitue-t-il un produit de combinaisons non souhaitées ?

## 🌺 EXERCICE 3 — LEFT OUTER JOIN DEPUIS LES COMMANDES

Exécuter :

```abap
SELECT ord~order_id,
       ord~status,
       stat~status_text
  FROM zt_<tri>_ord AS ord
  LEFT OUTER JOIN zt_<tri>_stat AS stat
    ON  stat~mandt  = ord~mandt
    AND stat~status = ord~status
  ORDER BY ord~order_id
  INTO TABLE @DATA(lt_left_orders).
```

Avec des données cohérentes, le résultat est identique pour ces colonnes.

Analyser le cas théorique :

```text
Commande STATUS = X
Aucun statut X
```

Répondre :

1. la commande est-elle conservée ?
2. quelle valeur ABAP reçoit `STATUS_TEXT` sans gestion explicite du null ?
3. quel intérêt possède cette jointure pour détecter des références absentes ?
4. quelle condition peut signaler l’anomalie dans le résultat ?

## 🌺 EXERCICE 4 — TOUS LES STATUTS

Inverser les sources :

```abap
SELECT stat~status,
       stat~status_text,
       ord~order_id
  FROM zt_<tri>_stat AS stat
  LEFT OUTER JOIN zt_<tri>_ord AS ord
    ON  ord~mandt  = stat~mandt
    AND ord~status = stat~status
  ORDER BY stat~status,
           ord~order_id
  INTO TABLE @DATA(lt_status_orders).
```

Répondre :

1. tous les statuts sont-ils conservés ?
2. un statut sans commande produit-il une ligne ?
3. quelle valeur reçoit `ORDER_ID` dans ce cas ?
4. plusieurs commandes du même statut produisent-elles plusieurs lignes ?

## 🌺 EXERCICE 5 — RIGHT OUTER JOIN

Sur une version compatible, la requête précédente peut être exprimée avec une jointure droite en conservant les statuts à droite.

Répondre :

1. pourquoi la variante `LEFT OUTER JOIN` inversée est-elle souvent plus facile à lire ?
2. les deux formes doivent-elles produire le même ensemble logique ?
3. faut-il utiliser `RIGHT OUTER JOIN` si la version cible ne le prend pas en charge ?
4. comment vérifier la syntaxe disponible ?

## 🌺 EXERCICE 6 — FILTRE SUR LA SOURCE EXTERNE

Analyser :

```abap
SELECT ord~order_id,
       stat~status_text
  FROM zt_<tri>_ord AS ord
  LEFT OUTER JOIN zt_<tri>_stat AS stat
    ON  stat~mandt  = ord~mandt
    AND stat~status = ord~status
  WHERE stat~status_text = 'Nouvelle'
  INTO TABLE @DATA(lt_result).
```

Répondre :

1. une ligne sans statut possède-t-elle le texte `Nouvelle` ?
2. est-elle conservée par le `WHERE` ?
3. l’effet de conservation de la jointure externe est-il réduit ?
4. où placer une condition portant sur la correspondance droite lorsqu’il faut conserver toutes les commandes ?
5. quelle solution utiliser si le filtre est réellement fonctionnel et doit exclure les autres lignes ?

## 🌺 EXERCICE 7 — COALESCE

Si la version ABAP le prend en charge, utiliser :

```abap
coalesce( stat~status_text, 'Sans libellé' )
  AS status_text
```

Analyser la différence entre :

- valeur SQL nulle ;
- valeur initiale ABAP ;
- texte de remplacement.

Ne pas rendre cet exercice obligatoire si la syntaxe n’est pas disponible sur le système.

## 🌺 EXERCICE 8 — JOIN OU SELECT DANS UNE BOUCLE

Comparer :

### Variante A

```text
Lire toutes les commandes
Pour chaque commande, lire le statut
```

### Variante B

```text
Une jointure commandes/statuts
```

Répondre :

1. combien d’accès SQL produit la variante A pour cent commandes ?
2. combien de requêtes principales produit la variante B ?
3. la jointure est-elle adaptée à une relation simple disponible en base ?
4. existe-t-il des cas où deux lectures séparées restent justifiées ?
5. faut-il mesurer le résultat et la volumétrie ?

## 🌺 CRITÈRES DE VALIDATION

- [ ] La jointure interne retourne trois lignes.
- [ ] Les deux champs de relation sont utilisés.
- [ ] Le produit non souhaité est expliqué.
- [ ] La jointure gauche conserve la source de gauche.
- [ ] Une absence de référence est détectable.
- [ ] La variante inversée conserve tous les statuts.
- [ ] La jointure droite est traitée selon la version.
- [ ] Le filtre `WHERE` d’une jointure externe est analysé.
- [ ] La jointure remplace un accès répétitif pertinent.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — jointure interne

```abap
SELECT ord~order_id,
       ord~customer_name,
       ord~status,
       stat~status_text,
       ord~amount,
       ord~currency
  FROM zt_<tri>_ord AS ord
  INNER JOIN zt_<tri>_stat AS stat
    ON  stat~mandt  = ord~mandt
    AND stat~status = ord~status
  ORDER BY ord~order_id
  INTO TABLE @DATA(lt_orders).
```

### Solution — relation incomplète

Avec uniquement :

```abap
stat~mandt = ord~mandt
```

chaque commande peut être combinée à chaque statut du mandant.

Avec trois commandes et trois statuts :

```text
3 × 3 = 9 lignes
```

### Solution — absence de référence

Une commande sans statut correspondant reste présente avec `LEFT OUTER JOIN`. Le texte de statut est initial dans une cible ABAP classique.

Contrôle après lecture :

```abap
IF ls_order-status_text IS INITIAL.
  WRITE / 'Référence de statut absente'.
ENDIF.
```

</details>
