# 🌸 EXERCICES — ARCHITECTURE OBJET D'UN TRAITEMENT D'IMPORT

## 🌺 OBJECTIFS

- séparer les responsabilités ;
- distinguer erreur globale et rejet local ;
- faire évoluer une table centrale ;
- centraliser les messages ;
- injecter les dépendances ;
- définir la transaction ;
- rendre le traitement testable.

## 🌺 DURÉE INDICATIVE

100 à 140 minutes.

## 🌺 CONTEXTE

Importer un fichier contenant :

```text
NAME;CITY;LEVEL
```

Exemple :

```text
Alice;Paris;2
Bruno;Lyon;X
Claire;Toulouse;3
```

## 🌺 ERREURS À CLASSER

### Erreur globale 1

```text
Fichier illisible
```

Conséquence :

```text
arrêt complet
```

### Erreur globale 2

```text
En-tête différent de NAME;CITY;LEVEL
```

Conséquence :

```text
arrêt complet
```

### Rejet local

```text
LEVEL invalide sur une ligne
```

Conséquence possible :

```text
ligne rejetée
autres lignes poursuivies
```

La règle atomique ou partielle doit être explicitement définie.

## 🌺 ARCHITECTURE PROPOSÉE

```text
ZCL_<TRI>_PARTICIPANT_IMPORT
    |
    +-- ZIF_<TRI>_IMPORT_READER
    |
    +-- ZCL_<TRI>_PARTICIPANT_PARSER
    |
    +-- ZCL_<TRI>_PARTICIPANT_VALIDATOR
    |
    +-- ZIF_<TRI>_PARTICIPANT_REPOSITORY
    |
    +-- journal interne de messages
```

## 🌺 ORCHESTRATEUR

Classe :

```text
ZCL_<TRI>_PARTICIPANT_IMPORT
```

Méthode publique :

```text
EXECUTE
```

## 🌺 ATTRIBUTS PRIVÉS

```text
MO_READER
MO_REPOSITORY
MT_RAW_LINES
MT_ROWS
MT_VALID_ROWS
MT_REJECTED_ROWS
MT_MESSAGES
MV_HAS_GLOBAL_ERROR
```

## 🌺 TYPES

Ligne importée :

```abap
TYPES:
  BEGIN OF ty_row,
    line_number TYPE i,
    name        TYPE string,
    city        TYPE string,
    level       TYPE i,
    is_valid    TYPE abap_bool,
  END OF ty_row.

TYPES tt_rows TYPE STANDARD TABLE OF ty_row
  WITH EMPTY KEY.
```

Message :

```abap
TYPES tt_messages TYPE STANDARD TABLE OF bapiret2
  WITH EMPTY KEY.
```

## 🌺 RESPONSABILITÉS

### Reader

```text
Lit la source.
Ne valide pas le métier.
Ne sauvegarde pas.
```

### Parser

```text
Découpe les lignes.
Contrôle la structure minimale.
Produit une représentation typée.
```

### Validator

```text
Contrôle NAME, CITY et LEVEL.
Ajoute les rejets locaux.
Ne décide pas de l’affichage.
```

### Repository

```text
Sauvegarde les lignes validées.
Ne lit pas le fichier.
Ne construit pas l’ALV.
Ne committe pas si l’orchestrateur possède la transaction.
```

### Orchestrateur

```text
Enchaîne les étapes.
Décide arrêt global ou poursuite.
Décide atomique ou partiel.
Décide commit ou rollback au niveau approprié.
Expose le bilan.
```

## 🌺 SÉQUENCE

```text
1. READ_SOURCE
2. VALIDATE_HEADER
3. PARSE_LINES
4. VALIDATE_ROWS
5. DECIDE_SCOPE
6. SAVE_VALID_ROWS
7. FINALIZE_TRANSACTION
8. RETURN_RESULT
```

## 🌺 EXERCICE 1 — TABLE CENTRALE

Faire évoluer `MT_ROWS` :

```text
après parsing
→ lignes typées

après validation
→ indicateur IS_VALID et messages

avant sauvegarde
→ extraction des lignes valides
```

Ne pas recréer des copies sans raison à chaque méthode.

## 🌺 EXERCICE 2 — MESSAGES

Toutes les méthodes techniques ne doivent pas afficher directement.

Elles retournent :

- exception globale ;
- résultat structuré ;
- messages ajoutés au journal.

## 🌺 EXERCICE 3 — INTERFACES DE DÉPENDANCE

Créer :

```text
ZIF_<TRI>_IMPORT_READER
ZIF_<TRI>_PARTICIPANT_REPOSITORY
```

Le constructeur de l’orchestrateur reçoit :

```text
IO_READER
IO_REPOSITORY
```

Cela permet des doubles de test.

## 🌺 EXERCICE 4 — CONSTRUCTEUR

```abap
METHOD constructor.

  IF io_reader IS NOT BOUND
     OR io_repository IS NOT BOUND.

    RAISE EXCEPTION TYPE zcx_<tri>_import.

  ENDIF.

  mo_reader     = io_reader.
  mo_repository = io_repository.

ENDMETHOD.
```

## 🌺 EXERCICE 5 — TRANSACTION

### Mode atomique

Un rejet local entraîne :

```text
aucune sauvegarde
```

### Mode partiel

Les lignes valides sont sauvegardées et les rejets sont tracés.

Le mode doit être un paramètre explicite.

## 🌺 EXERCICE 6 — PSEUDO-CODE EXECUTE

```abap
METHOD execute.

  clear_state( ).

  TRY.

      mt_raw_lines =
        mo_reader->read( ).

      validate_header( ).
      parse_lines( ).
      validate_rows( ).

      IF iv_atomic = abap_true
         AND line_exists(
           mt_rows[ is_valid = abap_false ]
         ).

        RAISE EXCEPTION TYPE zcx_<tri>_import.

      ENDIF.

      mt_valid_rows =
        VALUE #(
          FOR ls_row IN mt_rows
          WHERE ( is_valid = abap_true )
          ( ls_row )
        ).

      mo_repository->save(
        it_rows = mt_valid_rows
      ).

    CATCH zcx_<tri>_import INTO DATA(lx_import).

      RAISE EXCEPTION lx_import.

  ENDTRY.

ENDMETHOD.
```

Adapter la syntaxe à la version ABAP du système.

## 🌺 EXERCICE 7 — TESTS

| Cas                                 | Résultat                                |
| ----------------------------------- | --------------------------------------- |
| Fichier illisible                   | exception globale                       |
| En-tête invalide                    | exception globale                       |
| Trois lignes valides                | trois sauvegardes                       |
| Une ligne niveau `X`, mode atomique | aucune sauvegarde                       |
| Une ligne niveau `X`, mode partiel  | deux sauvegardes, un rejet              |
| Source vide                         | règle explicite : erreur ou succès vide |
| Repository en erreur                | rollback et exception globale           |

## 🌺 EXERCICE 8 — MAUVAISE ARCHITECTURE

Une seule méthode :

```text
ouvre le fichier
parse
valide
affiche des popups
écrit en base
commit
construit l’ALV
```

Diagnostiquer :

- responsabilités mélangées ;
- tests difficiles ;
- transaction cachée ;
- dépendance au frontend ;
- réutilisation impossible ;
- gestion d’erreur incohérente.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Les responsabilités sont séparées.
- [ ] Deux erreurs globales sont identifiées.
- [ ] Un rejet local est identifié.
- [ ] La table centrale évolue au fil du traitement.
- [ ] Les messages sont centralisés.
- [ ] Les dépendances sont injectées.
- [ ] Le repository ne committe pas arbitrairement.
- [ ] Les modes atomique et partiel sont explicites.
- [ ] Les sept cas de test sont définis.
- [ ] La méthode monolithique est décomposée.

<details>
<summary>🍧 Afficher une solution d’architecture</summary>

```text
Report ou job
    |
    v
Orchestrateur d’import
    |
    +--> Reader
    +--> Parser
    +--> Validator
    +--> Repository
    +--> Journal de messages
```

### Interface du reader

```abap
INTERFACE zif_<tri>_import_reader PUBLIC.

  METHODS read
    RETURNING
      VALUE(rt_lines) TYPE string_table
    RAISING
      zcx_<tri>_import.

ENDINTERFACE.
```

### Interface du repository

```abap
INTERFACE zif_<tri>_participant_repository PUBLIC.

  METHODS save
    IMPORTING
      it_rows TYPE zcl_<tri>_participant_import=>tt_rows
    RAISING
      zcx_<tri>_import.

ENDINTERFACE.
```

### Règle transactionnelle

```text
L’orchestrateur connaît l’unité complète.
Le repository exécute l’écriture.
Le niveau applicatif propriétaire décide commit ou rollback.
```

### Bilan exposé

```text
Nombre de lignes lues
Nombre de lignes valides
Nombre de lignes rejetées
Nombre de lignes sauvegardées
Messages
Statut global
```

</details>
