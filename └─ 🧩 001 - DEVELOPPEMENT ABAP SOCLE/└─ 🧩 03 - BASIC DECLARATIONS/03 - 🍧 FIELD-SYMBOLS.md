# 🌸 FIELD-SYMBOLS

## 🌺 OBJECTIFS

- [ ] Comprendre ce qu’est un `FIELD-SYMBOL` en ABAP
- [ ] Savoir déclarer un `FIELD-SYMBOL` avec `FIELD-SYMBOLS`
- [ ] Appliquer les conventions de nommage pour les `FIELD-SYMBOLS`
- [ ] Différencier `FIELD-SYMBOL`, VARIABLE et CONSTANTE
- [ ] Comprendre le principe d’assignation et pourquoi il est obligatoire

## 🌺 DEFINITION

> Un `FIELD-SYMBOL` est une variable spéciale qui agit comme un pointeur ou une référence vers une zone mémoire.  
> Modifier un `FIELD-SYMBOL` revient à modifier directement la donnée pointée, pas le `FIELD-SYMBOL` lui-même.

> Autrement dit, il ne contient pas de valeur propre, mais référence une autre variable, un champ de table ou un résultat d’expression.

> [!TIP]
> Un `FIELD-SYMBOL`, c’est comme une flèche sur une carte : la flèche ne contient pas l’objet, elle indique juste où il se trouve.
>
> Déplacer ou changer la flèche ne change pas l’objet ; mais utiliser la flèche pour modifier la zone, change directement l’objet.

## 🌺 UTILITE

- Parcourir des tables internes sans recopier les lignes.
- Travailler sur des structures dynamiques ou inconnues à l’avance.
- Gagner en performance et en flexibilité dans le code.

## 🌺 PRINCIPE

- Un `FIELD-SYMBOL` agit comme un alias temporaire.
- On le déclare avec `FIELD-SYMBOLS`, puis on le associe à une variable avec `ASSIGN`.
- Après l’association, toute modification via le `FIELD-SYMBOL` modifie directement la donnée d’origine.

## 🌺 DÉCLARATION AVEC FIELD-SYMBOLS

### SYNTAXE SIMPLE

    FIELD-SYMBOLS <lfs_> TYPE any.
    ASSIGN <variable> TO <lfs_>.

    IF <lfs_> IS ASSIGNED.
    <lfs_> = 'Nouvelle valeur'.
    ENDIF.

Exemple :

    DATA lv_text TYPE string VALUE 'Bonjour'.
    FIELD-SYMBOLS <lfs_string> TYPE string.

    ASSIGN lv_text TO <lfs_string>.
    <lfs_string> = 'Salut'.

    WRITE:/ <lfs_string>.

### DÉCLARATION MULTIPLE

    FIELD-SYMBOLS: <lfs_field1> TYPE any,
                   <lfs_field2> TYPE any,
                   <lfs_field3> TYPE any.

- `<lfs_integer>` : nom du `FIELD-SYMBOL` entre chevrons `< >`
- `TYPE` : type de données pointé (i, string, any, etc.)
- Astuce : `TYPE ANY` peut être utilisé si le `FIELD-SYMBOL` pointera sur différents types de données ou sur un objet ABAP.

> [!TIP] > `TYPE ANY` est très utile pour des `FIELD-SYMBOLS` qui pointeront sur différents types d’objets ou structures dynamiques.

## 🌺 LE PRINCIPE D’ASSIGNATION

> [!IMPORTANT]
> un `FIELD-SYMBOL` ne contient pas de valeur avant d’être assigné.  
> Toute tentative d’écriture directe sans assignation provoque une erreur `CX_SY_REF_IS_INITIAL`.

### EXEMPLE NON VALIDE

    FIELD-SYMBOLS <lfs_num> TYPE i.
    <lfs_num> = 10.  " ERREUR ! Non assigné

### EXEMPLE CORRECT

    WRITE:/ '     - DECLARATION + ASSIGNATION...'.

    DATA lv_number TYPE i.
    FIELD-SYMBOLS <lfs_num> TYPE i.

    ASSIGN lv_number TO <lfs_num>.
    <lfs_num> = 10.  " OK, modifie directement lv_number

- `ASSIGN` : lie le `FIELD-SYMBOL` à une variable existante.
- Ensuite, toute modification via le `FIELD-SYMBOL` affecte la variable cible.
- Analogie : on pointe la flèche sur le panneau correct avant de pouvoir le modifier.

### EXEMPLE PARFAIT

    DATA: lv_prenom2 TYPE string VALUE 'FRED'.
    FIELD-SYMBOLS: <lfs_prenom> TYPE string.

    ASSIGN lv_prenom2 TO <lfs_prenom>.

    IF <lfs_prenom> IS ASSIGNED.
        <lfs_prenom> = 'PIERRE'.
        WRITE:/ <lfs_prenom>,
            / lv_prenom2.
    ENDIF.

> [!IMPORTANT]
> Pour être sûr qu'un Field-Symbol est assigné, vous pouvez controller l'assignation comme dans l'exemple ci-dessus via la condition
>
>     IF <lfs_> IS ASSIGNED.
>       "Traitement ici en cas de condition true
>     ENDIF.

### FIELD-SYMBOL ET OBJET

> [!NOTE]
> Pour info pour le module sur les CLASS

Pour un objet :

    DATA lo_obj TYPE REF TO zcl_my_class.
    FIELD-SYMBOLS <lfs_obj> TYPE zcl_my_class.

    CREATE OBJECT lo_obj.
    ASSIGN lo_obj->* TO <lfs_obj>.  " Maintenant <lfs_obj> pointe sur l’objet

## 🌺 CONVENTIONS DE NOMMAGE

| 🍧 Règle                      | 🍧 Exemple            | 🍧 Objectif                                     |
| ----------------------------- | --------------------- | ----------------------------------------------- |
| Préfixe `<lfs_>` pour locaux  | `<lfs_customer>`      | Indique FIELD-SYMBOL à une portée locale        |
| Préfixe `<gfs_>` pour globaux | `<gfs_order>`         | Accessible globalement                          |
| Basé sur structure ou table   | `<lfs_customer_name>` | Clarifie la destination du pointeur             |
| Basé sur type de données      | `<lfs_string>`        | Indique le type pointé                          |
| Basé sur domaine              | `<lfs_amount>`        | Facilite lecture pour données financières       |
| Noms génériques               | `<lfs_generic>`       | Utilisé quand la destination est non spécifique |

## 🌺 UTILISATION

- Toujours assigner avant utilisation :

      ASSIGN lv_variable TO <lfs_integer>.

- Toute modification via `<lfs_integer>` affectera directement `lv_variable`.
- Ne jamais écrire sur un `FIELD-SYMBOL` non assigné.

## 🌺 RESUME

> - `FIELD-SYMBOL` = pointeur vers une zone mémoire, pas valeur directe
> - Déclarer avec `FIELD-SYMBOLS <nom> TYPE ...`
> - Toujours assigner avec `ASSIGN` avant toute utilisation
> - Préfixes `<lfs_>` (local) ou `<gfs_>` (global) pour lisibilité
> - `TYPE ANY` utile pour objets ou types variables
> - Analogie générale : flèche sur une carte, elle pointe vers la cible, la modification se fait sur la cible, pas sur la flèche.
