# 🌸 EXERCICES — CASE ... ENDCASE

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [CASE ... ENDCASE](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 05 - CONDITIONS/02 - 🍧 CASE ENDCASE.md>)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- sélectionner un traitement selon la valeur d’une variable ;
- utiliser `WHEN` ;
- regrouper plusieurs valeurs avec `OR` ;
- traiter les valeurs inconnues avec `WHEN OTHERS` ;
- choisir entre `CASE` et `IF` ;
- reconnaître une utilisation invalide de `CASE`.

## 🌺 DURÉE INDICATIVE

30 à 40 minutes.

## 🌺 CONTEXTE

Un statut de commande possède les valeurs suivantes :

| Code  | Signification  |
| ----- | -------------- |
| `N`   | Nouvelle       |
| `P`   | En préparation |
| `S`   | Expédiée       |
| `C`   | Clôturée       |
| autre | Statut inconnu |

## 🌺 EXERCICE 1 — CLASSIFICATION

Déclarer :

```abap
DATA lv_status TYPE c LENGTH 1 VALUE 'P'.
DATA lv_message TYPE string.
```

Construire un `CASE` respectant les règles suivantes :

- `N` et `P` produisent le message `Commande en cours` ;
- `S` produit `Commande expédiée` ;
- `C` produit `Commande clôturée` ;
- toute autre valeur produit `Statut inconnu`.

Afficher le message après `ENDCASE`.

## 🌺 EXERCICE 2 — CAS DE TEST

Tester :

```text
N
P
S
C
X
valeur initiale
```

Compléter :

| Valeur | Message |
| ------ | ------- |
| `N`    |         |
| `P`    |         |
| `S`    |         |
| `C`    |         |
| `X`    |         |
| espace |         |

## 🌺 EXERCICE 3 — CASE OU IF

Choisir la structure la plus adaptée :

| Besoin                                          | `CASE` ou `IF` |
| ----------------------------------------------- | -------------- |
| Tester plusieurs codes exacts d’un même statut  |                |
| Tester si un montant est supérieur à une limite |                |
| Tester plusieurs intervalles de prix            |                |
| Traiter les valeurs `N`, `P`, `S`, `C`          |                |
| Combiner statut, montant et pays                |                |

Justifier chaque réponse.

## 🌺 EXERCICE 4 — ABSENCE DE `WHEN OTHERS`

Supprimer temporairement `WHEN OTHERS`.

Tester la valeur `X`.

Répondre :

1. Le programme produit-il une erreur de syntaxe ?
2. Le programme produit-il un dump ?
3. `lv_message` reçoit-elle obligatoirement une nouvelle valeur ?
4. Quel risque fonctionnel existe si elle contenait une ancienne valeur ?

Restaurer ensuite un traitement explicite.

## 🌺 EXERCICE 5 — DIAGNOSTIC DE SYNTAXE

Analyser les deux blocs suivants :

```abap
CASE lv_status.
  WHEN IS INITIAL.
    WRITE / 'Statut vide'.
ENDCASE.
```

```abap
DATA lv_amount TYPE i VALUE 50.

CASE lv_amount.
  WHEN BETWEEN 1 AND 100.
    WRITE / 'Montant compris entre 1 et 100'.
ENDCASE.
```

La syntaxe procédurale de `CASE` attend des valeurs d’opérandes après `WHEN`.

Réécrire les deux contrôles avec `IF`.

## 🌺 LIVRABLES

- code du `CASE` ;
- tableau des six cas ;
- choix entre `CASE` et `IF` ;
- analyse de l’absence de `WHEN OTHERS` ;
- correction des deux syntaxes invalides.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Une seule variable est testée par le `CASE`.
- [ ] `N` et `P` sont regroupés avec `OR`.
- [ ] `WHEN OTHERS` traite les valeurs inconnues.
- [ ] `CASE` n’est pas utilisé pour une condition complexe.
- [ ] `IS INITIAL` et `BETWEEN` sont traités avec `IF`.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — statut

```abap
DATA lv_status  TYPE c LENGTH 1 VALUE 'P'.
DATA lv_message TYPE string.

CLEAR lv_message.

CASE lv_status.
  WHEN 'N' OR 'P'.
    lv_message = `Commande en cours`.
  WHEN 'S'.
    lv_message = `Commande expédiée`.
  WHEN 'C'.
    lv_message = `Commande clôturée`.
  WHEN OTHERS.
    lv_message = `Statut inconnu`.
ENDCASE.

WRITE / lv_message.
```

### Solution — cas

| Valeur | Message           |
| ------ | ----------------- |
| `N`    | Commande en cours |
| `P`    | Commande en cours |
| `S`    | Commande expédiée |
| `C`    | Commande clôturée |
| `X`    | Statut inconnu    |
| espace | Statut inconnu    |

### Solution — choix

| Besoin                           | Structure       |
| -------------------------------- | --------------- |
| Codes exacts d’un même statut    | `CASE`          |
| Montant supérieur à une limite   | `IF`            |
| Intervalles de prix              | `IF` / `ELSEIF` |
| Valeurs `N`, `P`, `S`, `C`       | `CASE`          |
| Statut, montant et pays combinés | `IF`            |

### Solution — syntaxes invalides

```abap
IF lv_status IS INITIAL.
  WRITE / 'Statut vide'.
ENDIF.
```

```abap
IF lv_amount BETWEEN 1 AND 100.
  WRITE / 'Montant compris entre 1 et 100'.
ENDIF.
```

Sans `WHEN OTHERS`, une valeur non couverte n’exécute aucun bloc. Le programme peut rester syntaxiquement valide, mais une variable cible non réinitialisée peut conserver une ancienne valeur.

</details>
