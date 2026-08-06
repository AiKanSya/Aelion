# 🌸 EXERCICES — INTERFACE DU MODULE FONCTION

## 🌺 OBJECTIFS

- choisir la direction des données ;
- concevoir une interface de calcul ;
- utiliser un type de table global ;
- comprendre `TABLES` ;
- documenter le contrat.

## 🌺 DURÉE INDICATIVE

60 à 75 minutes.

## 🌺 EXERCICE 1 — MOYENNE

Créer :

```text
Z_<TRI>_AVERAGE
```

Interface :

| Paramètre    | Direction | Type         |
| ------------ | --------- | ------------ |
| `IV_VALUE_1` | Importing | `DECFLOAT34` |
| `IV_VALUE_2` | Importing | `DECFLOAT34` |
| `EV_AVERAGE` | Exporting | `DECFLOAT34` |

## 🌺 EXERCICE 2 — NORMALISATION

Interface de `Z_<TRI>_TEXT_NORMALIZE` :

| Paramètre      | Direction | Propriété           |
| -------------- | --------- | ------------------- |
| `IV_TEXT`      | Importing | obligatoire         |
| `IV_PREFIX`    | Importing | facultatif          |
| `IV_UPPERCASE` | Importing | défaut `ABAP_FALSE` |
| `EV_TEXT`      | Exporting | résultat            |

Exception :

```text
EMPTY_TEXT
```

## 🌺 EXERCICE 3 — CHANGING

Créer une variante avec :

```text
CV_TEXT
```

Répondre :

1. la variable de l’appelant est-elle modifiée ?
2. l’effet de bord est-il explicite ?
3. un export séparé est-il plus simple à tester ?
4. quand `CHANGING` est-il réellement pertinent ?

## 🌺 EXERCICE 4 — TABLE

Créer dans le DDIC un type de table :

```text
ZTT_<TRI>_TEXT
```

Puis concevoir :

```text
IMPORTING IT_TEXTS TYPE ZTT_<TRI>_TEXT
EXPORTING ET_TEXTS TYPE ZTT_<TRI>_TEXT
```

## 🌺 EXERCICE 5 — TABLES HISTORIQUE

Expliquer :

- transmission par référence ;
- modification possible de la table appelante ;
- compatibilité avec les anciens modules ;
- raison de préférer `IT_`, `ET_` ou `CT_`.

## 🌺 DIAGNOSTIC

Une table de sortie a été déclarée dans `IMPORTING`.

Décrire le défaut de contrat et corriger la direction.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Chaque donnée possède une direction cohérente.
- [ ] Les paramètres facultatifs sont documentés.
- [ ] `CHANGING` est justifié.
- [ ] Un type de table global est utilisé.
- [ ] `TABLES` n’est pas privilégié.

<details>
<summary>🍧 Afficher la solution</summary>

Interface recommandée :

```text
IMPORTING
  VALUE(IV_TEXT)      TYPE STRING
  VALUE(IV_PREFIX)    TYPE STRING OPTIONAL
  VALUE(IV_UPPERCASE) TYPE ABAP_BOOL DEFAULT ABAP_FALSE

EXPORTING
  VALUE(EV_TEXT)      TYPE STRING

EXCEPTIONS
  EMPTY_TEXT
```

</details>
