# 🌸 VARIABLES

## 🌺 OBJECTIFS

- [ ] Comprendre ce qu’est une `VARIABLE` en ABAP
- [ ] Savoir déclarer et nommer correctement une `VARIABLE`
- [ ] Identifier les TYPES DE DONNEES disponibles
- [ ] Distinguer les syntaxes TYPE et LIKE

## 🌺 DEFINITION

> Une `VARIABLE` est un espace mémoire associé à un nom permettant de stocker une valeur temporaire.  
> Cette valeur peut changer durant l’exécution du programme.

> [!TIP]
> Une `VARIABLE` fonctionne comme une boîte étiquetée, un contenant nommé : tu peux y placer une donnée, la modifier ou la remplacer.

## 🌺 DECLARATION AVEC DATA

### DECLARATION SIMPLE

    DATA lv_variable TYPE string.

- `DATA` déclare une `VARIABLE`.
- `lv_variable` est son nom.
- `TYPE string` indique qu’elle stocke une chaîne de caractères.

> [!NOTE]
> WRITE:/ ' - DECLARATION SIMPLE...'.
>
>     DATA lv_variable TYPE string.

### DECLARATIONS SUCCESSIVES

    DATA: lv_variable1 TYPE string,
          lv_variable2 TYPE i,
          lv_variable3 TYPE c LENGTH 10.

- `DATA:` déclare une succession de `VARIABLES`.
- `lv_variable1` → texte (chaîne de caractères)
- `lv_variable2` → entier (nombre)
- `lv_variable3` → caractère fixe de 10 caractères

> [!NOTE]
> WRITE:/ ' - DECLARATION SUCCESSIVE...'.
>
>     DATA: lv_variable1 TYPE string,
>           lv_variable2 TYPE i,
>           lv_variable3 TYPE c1.

> [!TIP]
> Grouper les déclarations rend le [!NOTE] plus lisible et facilite la maintenance.

## 🌺 CONVENTIONS DE NOMMAGE

| 🍧 Règle                                | 🍧 Exemple                | 🍧 Objectif                                |
| --------------------------------------- | ------------------------- | ------------------------------------------ |
| Noms clairs et descriptifs              | `lv_age`, `lv_total`      | Faciliter la compréhension                 |
| Préfixe `lv_` pour `VARIABLES` locales  | `lv_name`                 | Indique qu’elle est locale                 |
| Préfixe `gv_` pour `VARIABLES` globales | `gv_company`              | Accessible dans tout le programme          |
| Pas de mots-clés réservés               | ✅ `lv_count` / ❌ `DATA` | Éviter les erreurs de compilation          |
| Déclarer en début de programme          | —                         | Simplifie la relecture et les maintenances |

> [!TIP]
> Nommer une `VARIABLE`, c’est comme nommer un dossier sur ton ordinateur : un nom précis permet de retrouver facilement ce qu’il contient.

## 🌺 TYPE VS LIKE

Deux syntaxes existent pour déclarer une `VARIABLE`.

### TYPE

    DATA lv_variable TYPE string.

Définit explicitement le type de données.

### LIKE

    DATA lv_other_variable LIKE lv_variable.

Reprend le même type et la même longueur qu’une autre `VARIABLE`.

> [!IMPORTANT]
> TYPE → référence à un type de données.  
> LIKE → référence à une autre `VARIABLE`.

> [!NOTE]
> WRITE:/ ' - DECLARATION... LIKE...'.
>
>     DATA: lv_variable4 TYPE string,
>           lv_variable5 LIKE lv_variable4,
>           lv_variable6 LIKE lv_variable5.

## 🌺 TYPES DE DONNEES DE BASE

### TYPE C (CHARACTER)

    DATA: lv_firstname   TYPE char255,
          lv_lastname(9) TYPE c.

    lv_firstname = 'John'.
    lv_lastname  = 'Wick'.

Stocke des chaînes de texte fixes (noms, [!NOTE]s, libellés, etc.).

> [!NOTE]
> WRITE:/ ' - TYPE CHAR...'.
>
>     DATA: lv_firstname   TYPE char255,
>           lv_lastname(9) TYPE c.
>
>     lv_firstname = 'John'.
>     lv_lastname  = 'Wick'.

### TYPE I / N / NUMC (NUMERIQUE)

| 🍧 Type | 🍧 Description                         | 🍧 Exemple d’usage                  |
| ------- | -------------------------------------- | ----------------------------------- |
| `I`     | Nombre entier (arithmétique)           | Calculs, boucles                    |
| `N`     | Nombre stocké comme texte (sans signe) | Manipulation de chiffres en texte   |
| `NUMC`  | Caractères numériques                  | [!NOTE]s postaux, numéros de compte |

    DATA: lv_integer        TYPE i,
          lv_year           TYPE n,
          lv_numeric_string TYPE numc2.

    lv_integer = 10.
    lv_year = 2025.
    lv_numeric_string = 31000.

> [!WARNING]
> `I` = valeur numérique réelle, utilisée pour le calcul.  
> `N` / `NUMC` = texte contenant uniquement des chiffres.

> [!NOTE]
> WRITE:/ ' - TYPE INTEGER...'.
>
>     DATA: lv_integer        TYPE i,
>           lv_year           TYPE n,
>           lv_numeric_string TYPE numc2.
>
>     lv_integer = 10.
>     lv_year = 2025.
>     lv_numeric_string = 31000.

### TYPE D (DATE) ET SY-DATUM

    DATA: lv_date TYPE d,
          lv_date2 TYPE datum.

    lv_date  = sy-datum.
    lv_date2 = 19861102.

Format : AAAAMMJJ  
Exemple : 20251029 → 29 octobre 2025.

> [!NOTE]
> WRITE:/ ' - TYPE DATE...'.
>
>     DATA: lv_date  TYPE d,
>           lv_date2 TYPE datum.
>
>     lv_date  = sy-datum.
>     lv_date2 = 19861102.

### TYPE T (TIME) ET SY-UZEIT

    DATA: lv_time TYPE t,
          lv_time2 type uzeit.

    lv_time = sy-uzeit.
    lv_time = 183045.

Format : HHMMSS  
Exemple : 183045 → 18h30min45s.

> [!NOTE]
> WRITE:/ ' - TYPE TIME...'.
>
>     DATA: lv_time  TYPE t,
>           lv_time2 TYPE uzeit.
>
>     lv_time  = sy-uzeit.
>     lv_time2 = 183045.

### TYPE F (VIRGULE FLOTTANTE FIXE) / FLOAT (PRECISION VARIABLE) /

    DATA: lv_decimal TYPE f,
          lv_float TYPE float.

Le TYPE F gère des valeurs décimales avec précision définie quant au type FLOAT, c'est une valeurs réelles de précision variable, utiles pour calculs scientifiques.

> [!NOTE]
> WRITE:/ ' - TYPE FLOAT...'.
>
>     DATA: lv_f TYPE f,
>           lv_float TYPE float.
>
>     lv_f = '123455.12'.
>     lv_float = '123455.12'.

### TYPE DECFLOAT

    DATA: lv_decfloat TYPE decfloat34.

    lv_decfloat = '12345.67890123456789012345678901234'.

Précision jusqu’à 34 chiffres significatifs - utilisé pour les calculs financiers.

> [!NOTE]
> WRITE:/ ' - TYPE DECFLOAT...'.
>
>     DATA: lv_decfloat TYPE decfloat34.
>
>     lv_decfloat = '12345.67890123456789012345678901234'.

### TYPE P (PACKED DECIMAL)

    DATA: lv_pack TYPE p DECIMALS 2.

    lv_pack = '1234.56'.

Type numérique compact, idéal pour montants financiers.

> [!NOTE]
> WRITE:/ ' - TYPE PACKED DECIMAL...'.
>
>     DATA: lv_pack TYPE p DECIMALS 2.
>
>     lv_pack = '1234.56'.

### TYPE STRING

    DATA: lv_string TYPE string.

    lv_string = 'Hello World'.

Longueur variable, utile pour textes dynamiques.

> [!NOTE]
> WRITE:/ ' - TYPE STRING...'.
>
>     DATA: lv_string TYPE string.
>
>     lv_string = 'Hello World'.

### TYPE BOOLEAN / ABAP_BOOL

    DATA: lv_bool    TYPE boolean,
          lv_boolean TYPE abap_bool.

    lv_bool    = abap_true.
    lv_boolean = abap_false.

Valeurs possibles : `abap_true` (vrai) / `abap_false` (faux)

Toujours initialiser explicitement :

    DATA lv_flag TYPE boolean VALUE abap_true.

> [!NOTE]
> WRITE:/ ' - TYPE BOOLEAN...'.
>
>     DATA: lv_bool    TYPE boolean,
>           lv_boolean TYPE abap_bool.
>
>     lv_bool    = abap_true.
>     lv_boolean = abap_false.

### TYPE XFELD

    DATA: lv_xfeld TYPE xfeld VALUE 'X'.

    lv_xfeld = 'X'. "Cocher
    lv_xfeld = ' '. "Décocher

Représente les cases à cocher SAP :  
'X' = cochée, ' ' = décochée.

> [!IMPORTANT]
> Préférer XFELD pour représenter visuellement des états binaires dans les écrans SAP.

> [!NOTE]
> WRITE:/ ' - TYPE XFELD...'.
>
>     DATA: lv_xfeld TYPE xfeld VALUE 'X'.
>
>     lv_xfeld = 'X'. "Cocher
>     lv_xfeld = ' '. "Décocher

## 🌺 BONNES PRATIQUES

| 🍧 Bonne pratique                         | 🍧 [!IMPORTANT]                                    |
| ----------------------------------------- | -------------------------------------------------- |
| Déclarer toutes les `VARIABLES` au début  | Lisibilité et cohérence                            |
| Utiliser des noms explicites              | Facilite la compréhension du rôle de chaque donnée |
| Grouper les déclarations par thème        | Structure et clarté                                |
| Toujours initialiser les `VARIABLES`      | Évite les comportements imprévus                   |
| Ne pas mélanger les types (ex: texte/num) | Prévient les erreurs de conversion                 |

> [!TIP]
> Les noms clairs et la rigueur dans la déclaration permettent d’éviter 80% des erreurs de logique en ABAP.

## 🌺 RESUME

> - Une VARIABLE stocke une valeur modifiable pendant le programme.
> - On la déclare avec DATA et on suit des conventions strictes (lv*, gv*).
> - TYPE et LIKE servent à définir ou copier une structure de type.
> - Les types les plus utilisés : C, I, N, NUMC, D, T, F, STRING, BOOLEAN, XFELD.
> - Toujours initialiser, documenter et nommer clairement les `VARIABLES`.
