# 🌸 EXERCICES — SYNTHESE

## 🌺 OBJECTIF

Transformer une structure technique source en structure d’affichage sans perdre les données propres à la cible.

## 🌺 CONTEXTE

Une commande est reçue depuis un système source.

### Structure source

| Composant          | Type                    | Valeur nominale |
| ------------------ | ----------------------- | --------------- |
| `order_id`         | `c LENGTH 10`           | `4500001234`    |
| `customer_id`      | `c LENGTH 6`            | `C10001`        |
| `country`          | `c LENGTH 3`            | `FR`            |
| `amount`           | `p LENGTH 8 DECIMALS 2` | `125,50`        |
| `currency`         | `c LENGTH 3`            | `EUR`           |
| `technical_status` | `c LENGTH 1`            | `P`             |

### Structure d’affichage

| Composant        | Origine                 |
| ---------------- | ----------------------- |
| `order_id`       | transfert automatique   |
| `customer_id`    | transfert automatique   |
| `country`        | transfert automatique   |
| `amount`         | transfert automatique   |
| `currency`       | transfert automatique   |
| `display_status` | détermination manuelle  |
| `processed_by`   | champ propre à la cible |
| `processed_on`   | champ propre à la cible |

## 🌺 CONSIGNES

1. Définir `ty_order_source`.
2. Définir `ty_order_display`.
3. Déclarer :
   - `ls_order_source` ;
   - `ls_order_backup` du même type que la source ;
   - `ls_order_display`.
4. Alimenter la source avec le cas nominal.
5. Copier la source complète dans la sauvegarde.
6. Initialiser dans la cible :
   - `processed_by = sy-uname` ;
   - `processed_on = sy-datum`.
7. Exécuter `MOVE-CORRESPONDING`.
8. Déterminer manuellement `display_status` avec `CASE` :
   - `N` → `Nouvelle` ;
   - `P` → `En préparation` ;
   - `S` → `Expédiée` ;
   - `C` → `Clôturée` ;
   - autre → `Inconnue`.
9. Afficher la structure source et la structure cible.
10. Modifier ensuite la source :
    - montant `150,00` ;
    - statut `S`.
11. Vérifier que la sauvegarde conserve les valeurs initiales.
12. Réexécuter le transfert et la détermination du statut.
13. Vérifier que `processed_by` et `processed_on` restent renseignés.
14. Réinitialiser la structure d’affichage à la fin.
15. Vérifier qu’elle est entièrement initiale.

## 🌺 DÉCLARATIONS ATTENDUES

```abap
TYPES: BEGIN OF ty_order_source,
         order_id         TYPE c LENGTH 10,
         customer_id      TYPE c LENGTH 6,
         country          TYPE c LENGTH 3,
         amount           TYPE p LENGTH 8 DECIMALS 2,
         currency         TYPE c LENGTH 3,
         technical_status TYPE c LENGTH 1,
       END OF ty_order_source.

TYPES: BEGIN OF ty_order_display,
         order_id       TYPE c LENGTH 10,
         customer_id    TYPE c LENGTH 6,
         country        TYPE c LENGTH 3,
         amount         TYPE p LENGTH 8 DECIMALS 2,
         currency       TYPE c LENGTH 3,
         display_status TYPE c LENGTH 20,
         processed_by   TYPE syuname,
         processed_on   TYPE sydatum,
       END OF ty_order_display.
```

## 🌺 CAS DE TEST

### Cas 1 — nominal

```text
Commande : 4500001234
Client   : C10001
Pays     : FR
Montant  : 125,50 EUR
Statut   : En préparation
```

### Cas 2 — source modifiée

```text
Commande : 4500001234
Montant  : 150,00 EUR
Statut   : Expédiée
```

La sauvegarde doit encore contenir :

```text
Montant technique sauvegardé : 125,50
Statut technique sauvegardé  : P
```

### Cas 3 — pays source initial

Avant transfert :

```text
Pays cible : DE
Pays source: initial
```

Après transfert :

```text
Pays cible : initial
```

Le composant est commun ; la valeur initiale source est transférée.

### Cas 4 — statut technique inconnu

```text
technical_status = X
```

Résultat :

```text
Statut : Inconnue
```

### Cas 5 — structure cible vidée

Après :

```abap
CLEAR ls_order_display.
```

Résultat attendu :

```text
Structure d'affichage initiale
```

## 🌺 QUESTIONS D’ANALYSE

1. Pourquoi `display_status` n’est-il pas alimenté automatiquement ?
2. Pourquoi `technical_status` est-il ignoré lors du transfert ?
3. Pourquoi `processed_by` et `processed_on` sont-ils conservés ?
4. Que se passerait-il si la cible était vidée avant chaque transfert ?
5. Pourquoi la sauvegarde n’est-elle pas affectée par la modification ultérieure de la source ?
6. Une correspondance de nom suffit-elle à valider la cohérence d’une devise ou d’une unité ?
7. Quelle différence existe entre la sauvegarde complète et la structure d’affichage ?

## 🌺 LIVRABLES

- code complet ;
- résultat du cas nominal ;
- résultat après modification ;
- preuve de conservation de la sauvegarde ;
- résultat du pays initial ;
- résultat du statut inconnu ;
- preuve d’initialisation finale ;
- réponses aux sept questions.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Les deux types structurés sont distincts.
- [ ] La sauvegarde utilise le même type que la source.
- [ ] La copie de sauvegarde est complète.
- [ ] Les cinq composants communs sont transférés.
- [ ] `technical_status` n’est pas transféré vers `display_status`.
- [ ] Le statut d’affichage est déterminé manuellement.
- [ ] Les métadonnées propres à la cible restent renseignées.
- [ ] Une source commune initiale écrase la cible commune.
- [ ] La sauvegarde reste inchangée.
- [ ] La structure cible est initialisée à la fin.
- [ ] Aucun risque de conversion implicite n’est ignoré.

<details>
<summary>🍧 Afficher la solution complète</summary>

```abap
REPORT zaelion_<tri>_structures.

TYPES: BEGIN OF ty_order_source,
         order_id         TYPE c LENGTH 10,
         customer_id      TYPE c LENGTH 6,
         country          TYPE c LENGTH 3,
         amount           TYPE p LENGTH 8 DECIMALS 2,
         currency         TYPE c LENGTH 3,
         technical_status TYPE c LENGTH 1,
       END OF ty_order_source.

TYPES: BEGIN OF ty_order_display,
         order_id       TYPE c LENGTH 10,
         customer_id    TYPE c LENGTH 6,
         country        TYPE c LENGTH 3,
         amount         TYPE p LENGTH 8 DECIMALS 2,
         currency       TYPE c LENGTH 3,
         display_status TYPE c LENGTH 20,
         processed_by   TYPE syuname,
         processed_on   TYPE sydatum,
       END OF ty_order_display.

DATA:
  ls_order_source  TYPE ty_order_source,
  ls_order_backup  TYPE ty_order_source,
  ls_order_display TYPE ty_order_display.

START-OF-SELECTION.

  " Source nominale
  ls_order_source-order_id         = '4500001234'.
  ls_order_source-customer_id      = 'C10001'.
  ls_order_source-country          = 'FR'.
  ls_order_source-amount           = '125.50'.
  ls_order_source-currency         = 'EUR'.
  ls_order_source-technical_status = 'P'.

  " Sauvegarde complète du même type
  ls_order_backup = ls_order_source.

  " Valeurs propres à la cible
  ls_order_display-processed_by = sy-uname.
  ls_order_display-processed_on = sy-datum.

  " Transfert des composants communs
  MOVE-CORRESPONDING ls_order_source
    TO ls_order_display.

  " Mapping manuel entre deux noms différents
  CASE ls_order_source-technical_status.
    WHEN 'N'.
      ls_order_display-display_status = 'Nouvelle'.
    WHEN 'P'.
      ls_order_display-display_status = 'En préparation'.
    WHEN 'S'.
      ls_order_display-display_status = 'Expédiée'.
    WHEN 'C'.
      ls_order_display-display_status = 'Clôturée'.
    WHEN OTHERS.
      ls_order_display-display_status = 'Inconnue'.
  ENDCASE.

  WRITE: / 'CAS NOMINAL',
         / 'Commande :', ls_order_display-order_id,
         / 'Client   :', ls_order_display-customer_id,
         / 'Pays     :', ls_order_display-country,
         / 'Montant  :',
             ls_order_display-amount,
             ls_order_display-currency,
         / 'Statut   :', ls_order_display-display_status,
         / 'Traité par :', ls_order_display-processed_by,
         / 'Traité le  :', ls_order_display-processed_on.

  " Modification de la source
  ls_order_source-amount           = '150.00'.
  ls_order_source-technical_status = 'S'.

  MOVE-CORRESPONDING ls_order_source
    TO ls_order_display.

  CASE ls_order_source-technical_status.
    WHEN 'N'.
      ls_order_display-display_status = 'Nouvelle'.
    WHEN 'P'.
      ls_order_display-display_status = 'En préparation'.
    WHEN 'S'.
      ls_order_display-display_status = 'Expédiée'.
    WHEN 'C'.
      ls_order_display-display_status = 'Clôturée'.
    WHEN OTHERS.
      ls_order_display-display_status = 'Inconnue'.
  ENDCASE.

  WRITE: /,
         / 'SOURCE MODIFIÉE',
         / 'Montant :',
             ls_order_display-amount,
             ls_order_display-currency,
         / 'Statut  :',
             ls_order_display-display_status,
         /,
         / 'SAUVEGARDE',
         / 'Montant technique sauvegardé :',
             ls_order_backup-amount,
         / 'Statut technique sauvegardé  :',
             ls_order_backup-technical_status.

  CLEAR ls_order_display.

  IF ls_order_display IS INITIAL.
    WRITE: /,
           / `Structure d'affichage initiale`.
  ENDIF.
```

### Solution — pays source initial

```abap
ls_order_display-country = 'DE'.
CLEAR ls_order_source-country.

MOVE-CORRESPONDING ls_order_source
  TO ls_order_display.
```

Résultat :

```text
ls_order_display-country est initial
```

### Solution — réponses

1. Les noms `technical_status` et `display_status` diffèrent.
2. Aucun composant cible ne porte le nom `technical_status`.
3. Ils n’existent pas dans la source ; `MOVE-CORRESPONDING` ne les modifie pas.
4. Les métadonnées seraient perdues et devraient être recalculées après chaque `CLEAR`.
5. La sauvegarde est un objet distinct ayant reçu une copie complète avant la modification.
6. Non. Le nom ne valide ni la devise, ni l’unité, ni la sémantique.
7. La sauvegarde reproduit toute la source du même type ; la structure d’affichage ne reçoit que les composants communs et ajoute des données propres à la présentation.

</details>
