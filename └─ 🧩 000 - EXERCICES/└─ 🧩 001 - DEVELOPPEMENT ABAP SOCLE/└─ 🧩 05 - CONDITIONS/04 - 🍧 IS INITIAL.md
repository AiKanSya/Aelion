# 🌸 EXERCICES — IS INITIAL

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- reconnaître la valeur initiale d’un type ;
- utiliser `IS INITIAL` ;
- utiliser `IS NOT INITIAL` ;
- contrôler plusieurs champs obligatoires ;
- distinguer valeur initiale et valeur métier invalide ;
- éviter un test trompeur sur une donnée numérique.

## 🌺 DURÉE INDICATIVE

30 à 40 minutes.

## 🌺 EXERCICE 1 — VALEURS INITIALES

Compléter :

| Type         | Valeur initiale |
| ------------ | --------------- |
| `string`     |                 |
| `c LENGTH 3` |                 |
| `i`          |                 |
| `p`          |                 |
| `d`          |                 |
| `t`          |                 |
| `abap_bool`  |                 |

## 🌺 EXERCICE 2 — CONTRÔLE DE CHAMPS

Déclarer :

```abap
DATA lv_customer TYPE string VALUE `C1000`.
DATA lv_country  TYPE c LENGTH 2 VALUE 'FR'.
DATA lv_comment  TYPE string.
```

Règles :

- le client est obligatoire ;
- le pays est obligatoire ;
- le commentaire est facultatif.

Afficher :

```text
Données obligatoires renseignées
Commentaire non renseigné
```

## 🌺 EXERCICE 3 — CAS DE TEST

Tester :

| Client  | Pays   | Résultat                         |
| ------- | ------ | -------------------------------- |
| `C1000` | `FR`   | Données obligatoires renseignées |
| vide    | `FR`   | Client obligatoire               |
| `C1000` | espace | Pays obligatoire                 |
| vide    | espace | Client et pays obligatoires      |

## 🌺 EXERCICE 4 — VALEUR NUMÉRIQUE

Déclarer :

```abap
DATA lv_quantity TYPE i VALUE 0.
```

Répondre :

1. `lv_quantity IS INITIAL` est-il vrai ?
2. Cette condition permet-elle de savoir si l’utilisateur a explicitement saisi zéro ?
3. Une quantité nulle peut-elle être initiale et simultanément invalide selon une règle métier ?
4. Quel contrôle complémentaire faut-il appliquer si la quantité doit être strictement positive ?

## 🌺 EXERCICE 5 — DIAGNOSTIC

Analyser :

```abap
DATA lv_customer TYPE string.

CASE lv_customer.
  WHEN IS INITIAL.
    WRITE / 'Client vide'.
  WHEN OTHERS.
    WRITE / 'Client renseigné'.
ENDCASE.
```

Réécrire avec `IF`.

## 🌺 LIVRABLES

- tableau des valeurs initiales ;
- contrôle des champs ;
- résultats des quatre cas ;
- explication sur la quantité ;
- correction du `CASE`.

## 🌺 CRITÈRES DE VALIDATION

- [ ] `IS INITIAL` est distingué d’une règle métier.
- [ ] Les champs obligatoires sont contrôlés.
- [ ] `IS NOT INITIAL` est utilisé à bon escient.
- [ ] La valeur `0` est reconnue comme initiale pour un entier.
- [ ] Une quantité strictement positive est contrôlée avec `GT 0`.
- [ ] Le contrôle est écrit avec `IF`.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — valeurs

| Type         | Valeur initiale |
| ------------ | --------------- |
| `string`     | chaîne vide     |
| `c LENGTH 3` | trois espaces   |
| `i`          | `0`             |
| `p`          | `0`             |
| `d`          | `00000000`      |
| `t`          | `000000`        |
| `abap_bool`  | espace          |

### Solution — contrôle

```abap
IF lv_customer IS INITIAL AND lv_country IS INITIAL.
  WRITE / 'Client et pays obligatoires'.
ELSEIF lv_customer IS INITIAL.
  WRITE / 'Client obligatoire'.
ELSEIF lv_country IS INITIAL.
  WRITE / 'Pays obligatoire'.
ELSE.
  WRITE / 'Données obligatoires renseignées'.
ENDIF.

IF lv_comment IS INITIAL.
  WRITE / 'Commentaire non renseigné'.
ELSE.
  WRITE / 'Commentaire renseigné'.
ENDIF.
```

### Solution — quantité

```abap
IF lv_quantity IS INITIAL.
  WRITE / 'La quantité contient sa valeur initiale'.
ENDIF.

IF lv_quantity LE 0.
  WRITE / 'La quantité doit être strictement positive'.
ENDIF.
```

`IS INITIAL` décrit l’état technique de la donnée. `LE 0` applique une règle métier.

### Solution — diagnostic

```abap
IF lv_customer IS INITIAL.
  WRITE / 'Client vide'.
ELSE.
  WRITE / 'Client renseigné'.
ENDIF.
```

</details>
