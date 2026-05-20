# 🌸 CONSTANTES

## 🌺 OBJECTIFS

- [ ] Comprendre ce qu’est une CONSTANTE en ABAP
- [ ] Savoir déclarer une CONSTANTE avec `CONSTANTS`
- [ ] Appliquer les conventions de nommage
- [ ] Identifier les types de données possibles
- [ ] Différencier CONSTANTES et VARIABLES

## 🌺 DEFINITION

> Une `CONSTANTE` est une valeur fixe associée à un nom.  
> Contrairement à une variable, sa valeur ne change jamais pendant l’exécution du programme.

> [!TIP]
> Une `CONSTANTE`, c’est comme un repère fixé sur une carte : il ne bouge pas.  
> Une variable, elle, peut se déplacer.

> [!TIP]
> Imagine une montre dont la pile est KO : la valeur reste figée.  
> Une variable serait un thermomètre normal, qui change avec la température.

## 🌺 DECLARATION AVEC CONSTANTS

### SYNTAXE SIMPLE

    WRITE:/ '     - DECLARATION SIMPLE...'.

    CONSTANTS: lc_valeur_const TYPE i VALUE 10.

- `CONSTANTS` : mot-clé pour déclarer une `CONSTANTE`
- `lc_valeur_CONSTANTE` : nom de la `CONSTANTE`
- `TYPE i` : type de données entier
- `VALUE 10` : valeur fixe attribuée à la `CONSTANTE`

> [!TIP]
> C’est comme fixer plusieurs repères sur une même carte.

> [!NOTE]
> le mot-clé `CONSTANTS` accepte la liste séparée par `:` pour déclarer plusieurs `CONSTANTES` consécutives.

### DECLARATIONS SUCCESSIVES

    WRITE:/ '     - DECLARATION SUCCESSIVE...'.

    CONSTANTS: lc_max_users TYPE i VALUE 100,
               lc_timeout   TYPE i VALUE 30,
               lc_flag      TYPE abap_bool VALUE abap_false.

- Utiliser la syntaxe `CONSTANTS:` suivie d’une liste séparée par des virgules pour déclarer plusieurs `CONSTANTES` en une seule instruction.
- Chaque CONSTANTE doit préciser `TYPE` et `VALUE` ou utiliser `LIKE` + `VALUE`.

> [!TIP]
> Regrouper les `CONSTANTES` par thème (paramètres, codes, formats) aide à la maintenance.

## 🌺 CONVENTIONS DE NOMMAGE

| 🍧 Règle                       | 🍧 Exemple                     | 🍧 Objectif                                   |
| ------------------------------ | ------------------------------ | --------------------------------------------- |
| Noms descriptifs               | `lc_max_value`                 | Comprendre rapidement le rôle de la CONSTANTE |
| Préfixe `lc_` pour locales     | `lc_discount`                  | Indique qu’elle est locale au programme       |
| Préfixe `gc_` pour globales    | `gc_company`                   | Accessible depuis tout le programme           |
| Pas de mots-clés réservés      | ✅ `lc_count` / ❌ `CONSTANTS` | Éviter les erreurs de compilation             |
| Déclarer en début de programme | —                              | Facilite la lecture et la maintenance         |

> [!TIP]
> Une `CONSTANTE`, c’est un panneau fixe : son étiquette doit être claire car elle ne changera jamais.

## 🌺 TYPE VS LIKE

### TYPE

    CONSTANTS: lc_valeur_const TYPE i VALUE 10.

- Définit le type explicitement.

### LIKE

    DATA: lv_variable TYPE i VALUE 5.
    CONSTANTS: lc_valeur_const LIKE lv_variable VALUE 20.

- Copie le type d’une autre variable, mais reste immuable.

> [!TIP]
> TYPE → tu choisis la forme de ta boîte.  
> LIKE → tu copies la boîte d’un autre, mais tu ne peux plus l’ouvrir.

## 🌺 TYPES DE DONNÉES POUR CONSTANTES

### INTEGER / NUMERIC / NUMC

    WRITE:/ '     - TYPE INTEGER, N, NUMC...'.

    CONSTANTS: lc_integer        TYPE I VALUE 10,
               lc_max_value      TYPE N VALUE 9999,
               lc_account_number TYPE NUMC10 VALUE 1234567890.

- I → nombres entiers pour calculs
- N / NUMC → texte numérique (ex: code postal)

### FLOAT / F

    WRITE:/ '     - TYPE F, FLOAT...'.

    CONSTANTS: lc_fixed_value TYPE F VALUE '1234.56',
               lc_float_value TYPE FLOAT VALUE '1234.567890123456789'.

- F → décimales fixes
- FLOAT → précision variable (scientifique)

### DECFLOAT

    WRITE:/ '     - TYPE F, FLOAT...'.

    CONSTANTS: lc_decfloat TYPE DECFLOAT34 VALUE '12345.67890123456789012345678901234'.

- Haute précision, utile pour calculs financiers.

### STRING

    WRITE:/ '     - TYPE STRING...'.

    CONSTANTS: lc_string TYPE STRING VALUE 'Hello, World!'.

- Texte de longueur variable, non modifiable.

### CHARACTER

    WRITE:/ '     - TYPE CHAR...'.

    CONSTANTS: lc_char TYPE C LENGTH 1 VALUE 'F'.

- Caractère fixe (ex: initiale, statut).

### BOOLEAN / ABAP_BOOL

    WRITE:/ '     - TYPE BOOLEAN...'.

    CONSTANTS: lc_bool TYPE BOOLEAN VALUE ABAP_TRUE,
               lc_boolean TYPE ABAP_BOOL VALUE ABAP_FALSE.

- Valeurs logiques : vrai ou faux.

### DATE (D) ET SY-DATUM

    WRITE:/ '     - TYPE DATE...'.

    CONSTANTS: lc_date1 TYPE D VALUE SY-DATUM,
               lc_date2 TYPE D VALUE 19861102.

- Format AAAAMMJJ.

### TIME (T) ET SY-UZEIT

    WRITE:/ '     - TYPE TIME...'.

    CONSTANTS: lc_time1 TYPE T VALUE SY-UZEIT,
               lc_time2 TYPE T VALUE 183045.

- Format HHMMSS.

### PACKED DECIMAL (P)

    WRITE:/ '     - TYPE PACKED...'.

    CONSTANTS: lc_pi TYPE P DECIMALS 2 VALUE '3.14'.

- Valeur fixe pour montants ou calculs financiers.

### XFELD

    WRITE:/ '     - TYPE XFELD...'.

    CONSTANTS: lc_xfeld TYPE XFELD VALUE 'X'.

- 'X' = cochée / ' ' = décochée.

## BONNES PRATIQUES

| 🍧 Bonne pratique                                   | 🍧 Explication                                    |
| --------------------------------------------------- | ------------------------------------------------- |
| Toujours initialiser la CONSTANTE avec VALUE        | Elle ne peut pas être modifiée ensuite            |
| Utiliser des noms explicites et lisibles            | Permet de comprendre rapidement le rôle du repère |
| Grouper les `CONSTANTES` par thème                  | Facilite la maintenance                           |
| Préférer les `CONSTANTES` aux valeurs codées en dur | Améliore la lisibilité et évite les erreurs       |
| Déclarer les `CONSTANTES` avant les variables       | Règle de bonne structure du code ABAP             |

> [!TIP]
> Remplace toujours les chiffres ou textes répétés par une `CONSTANTE` : ton code sera plus clair et plus facile à maintenir.

## 🌺 RESUME

> - Une `CONSTANTE` garde une valeur fixe pendant tout le programme.
> - Se déclare avec `CONSTANTS ... VALUE`.
> - `TYPE` et `LIKE` définissent ou copient un type existant.
> - Types principaux : I, N, NUMC, F, DECFLOAT, STRING, C, BOOLEAN, D, T, P, XFELD.
> - Toujours préférer une `CONSTANTE` à une valeur “en dur”.
> - Les `CONSTANTES` améliorent la clarté, la sécurité et la maintenabilité du code ABAP.
