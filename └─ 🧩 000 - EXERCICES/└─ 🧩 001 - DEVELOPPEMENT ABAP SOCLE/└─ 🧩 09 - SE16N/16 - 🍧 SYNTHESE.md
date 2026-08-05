# 🌸 EXERCICES — SYNTHESE

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [TRANSACTION SE16N](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 09 - SE16N/01 - 🍧 SE16N.md>)

## 🌺 OBJECTIF

Réaliser un diagnostic complet, reproductible et sécurisé.

## 🌺 DEMANDE

```text
Vérifier que toutes les commandes EUR non clôturées,
d’un montant supérieur ou égal à 75,00,
possèdent un statut de référence avec un libellé.
Produire une preuve minimale et comparer le résultat à Open SQL.
```

## 🌺 ÉTAPE 1 — PRÉPARATION

Relever :

```text
Système
Mandant
Utilisateur
Date
Table source
Table de référence
Vue de jointure
Champs clés
Volume attendu
```

## 🌺 ÉTAPE 2 — TABLE DE COMMANDES

Dans :

```text
ZT_<TRI>_ORD
```

Critères :

```text
CURRENCY = EUR
STATUS <> C
AMOUNT >= 75,00
```

Colonnes :

```text
ORDER_ID
STATUS
AMOUNT
CURRENCY
```

Résultat attendu :

```text
0000000001 N 125,50 EUR
0000000002 P 75,00 EUR
```

## 🌺 ÉTAPE 3 — TABLE DE STATUTS

Dans :

```text
ZT_<TRI>_STAT
```

Sélection multiple :

```text
STATUS = N
STATUS = P
```

Résultat attendu :

```text
N Nouvelle
P En préparation
```

## 🌺 ÉTAPE 4 — VUE

Dans :

```text
ZV_<TRI>_ORD
```

Reprendre les critères métier.

Colonnes :

```text
ORDER_ID
STATUS
STATUS_TEXT
AMOUNT
CURRENCY
```

Résultat attendu :

```text
0000000001 N Nouvelle 125,50 EUR
0000000002 P En préparation 75,00 EUR
```

## 🌺 ÉTAPE 5 — CONTRÔLE DE COHÉRENCE

Compléter :

| Commande     | Statut commande | Statut référencé | Libellé présent | Conforme |
| ------------ | --------------- | ---------------- | --------------- | -------- |
| `0000000001` | `N`             |                  |                 |          |
| `0000000002` | `P`             |                  |                 |          |

## 🌺 ÉTAPE 6 — PROGRAMME OPEN SQL

Créer ou compléter :

```abap
REPORT zaelion_<tri>_se16n.

START-OF-SELECTION.

  SELECT order_id,
         status,
         status_text,
         amount,
         currency
    FROM zv_<tri>_ord
    WHERE currency = 'EUR'
      AND status   <> 'C'
      AND amount   >= '75.00'
    ORDER BY order_id
    INTO TABLE @DATA(lt_result).

  WRITE / |Nombre de lignes : { lines( lt_result ) }|.

  LOOP AT lt_result INTO DATA(ls_result).
    WRITE: / ls_result-order_id,
             ls_result-status,
             ls_result-status_text,
             ls_result-amount,
             ls_result-currency.
  ENDLOOP.
```

## 🌺 ÉTAPE 7 — RAPPROCHEMENT

Comparer :

| Contrôle         | `SE16N` | Open SQL |
| ---------------- | ------- | -------- |
| Nombre de lignes |         |          |
| Commande 1       |         |          |
| Commande 2       |         |          |
| Statuts          |         |          |
| Libellés         |         |          |
| Montants         |         |          |
| Devises          |         |          |

## 🌺 ÉTAPE 8 — PREUVE MINIMALE

Conserver uniquement :

```text
Système et mandant
Nom de la vue
Critères
Cinq colonnes
Deux lignes
Résultat du programme
```

Ne pas inclure :

```text
Nom complet du client
Utilisateur de création
Colonnes non nécessaires
Autres commandes
```

## 🌺 ÉTAPE 9 — CAS LIMITES

### Cas A — aucune commande

Utiliser un montant minimal :

```text
10000,00
```

Résultat attendu :

```text
Aucune ligne
```

### Cas B — statut sans référence

Analyser le comportement théorique de la vue.

### Cas C — devise USD

Résultat attendu avec les données de référence :

```text
Aucune ligne non clôturée
```

### Cas D — maximum égal à `1`

Vérifier que le résultat est incomplet et ne permet pas de valider l’ensemble.

### Cas E — autorisation refusée sur la vue

Appliquer la procédure de diagnostic et ne pas conclure sur les données.

## 🌺 RAPPORT DE TEST

```text
Objet contrôlé :
Système :
Mandant :
Date :
Critères :
Lignes attendues :
Lignes obtenues :
Références trouvées :
Résultat Open SQL :
Conformité :
Limites :
```

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le système et le mandant sont relevés.
- [ ] Les critères sont appliqués avant l’exécution.
- [ ] Le maximum est supérieur ou égal au volume attendu.
- [ ] Seules les colonnes nécessaires sont affichées.
- [ ] Les deux statuts existent dans la table de référence.
- [ ] Les deux libellés sont présents dans la vue.
- [ ] Le programme retourne le même ensemble.
- [ ] L’ordre est rendu comparable.
- [ ] La preuve est minimale.
- [ ] Les cas limites sont traités.
- [ ] Aucune donnée n’est modifiée.
- [ ] Aucun export excessif n’est produit.

<details>
<summary>🍧 Afficher la solution</summary>

### Résultat nominal

| Commande     | Statut | Libellé        |  Montant | Devise |
| ------------ | ------ | -------------- | -------: | ------ |
| `0000000001` | `N`    | Nouvelle       | `125,50` | EUR    |
| `0000000002` | `P`    | En préparation |  `75,00` | EUR    |

### Contrôle de cohérence

| Commande     | Statut | Référence | Libellé | Conforme |
| ------------ | ------ | --------- | ------- | -------- |
| `0000000001` | `N`    | Oui       | Oui     | Oui      |
| `0000000002` | `P`    | Oui       | Oui     | Oui      |

### Conclusion attendue

```text
Les deux commandes EUR non clôturées d’un montant supérieur
ou égal à 75,00 possèdent un statut de référence et un libellé.
Le résultat SE16N correspond au résultat Open SQL.
```

</details>
