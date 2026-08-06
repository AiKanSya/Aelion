# 🌸 SOMMAIRE — └─ 🧩 01 - MODULE FONCTION

## 🌺 OBJECTIF DU PARCOURS

1. `MODULE FONCTION & GROUPE FONCTION`
2. `CREATION SE37`
3. `INTERFACE`
4. `PASSAGE DE PARAMETRES`
5. `IMPLEMENTATION & DONNEES LOCALES`
6. `APPEL AVEC CALL FUNCTION`
7. `EXCEPTIONS`
8. `MESSAGES & RETOURS D'ERREURS`
9. `DONNEES GLOBALES DU GROUPE`
10. `MODULES FONCTION RFC`
11. `MODULE FONCTION DE MISE A JOUR`
12. `BAPI & GESTION DE TRANSACTION`
13. `TEST & DEBOGAGE`
14. `BONNES PRATIQUES & LIMITES`
15. `CONVERSION EXITS`
16. `EXCEPTIONS DES CONVERSION EXITS`
17. `VALIDATION DATE PAR MODULE FONCTION`

Le stagiaire doit être capable de :

- expliquer le rôle d’un groupe de fonctions et d’un module fonction ;
- créer et activer ces objets dans `SE37` et `SE80` ;
- concevoir une interface lisible ;
- choisir entre `IMPORTING`, `EXPORTING`, `CHANGING` et `TABLES` ;
- distinguer passage par référence et passage par valeur ;
- implémenter un traitement avec des données locales ;
- appeler un module avec `CALL FUNCTION` ;
- traiter des exceptions classiques ;
- retourner des messages structurés ;
- limiter les données globales du groupe ;
- créer et appeler un module RFC ;
- comprendre les modules de mise à jour et `IN UPDATE TASK` ;
- respecter le contrat transactionnel d’une BAPI ;
- tester et déboguer les différents types de modules ;
- appliquer les bonnes pratiques de conception ;
- utiliser une conversion exit adaptée au domaine DDIC ;
- traiter les exceptions réellement déclarées par une conversion exit ;
- contrôler le format et la plausibilité d’une date.

## 🌺 SOURCE DISPONIBLE

Le dossier d’exercices contient les dix-sept fichiers listés ci-dessus.

L’archive de cours `002 - DEVELOPPEMENT ABAP OBJECT` n’est pas présente parmi les archives disponibles dans l’espace de travail. L’ordre a donc été repris du **sommaire source des exercices**, qui référence directement les fichiers de cours correspondants.

Les corrections techniques s’appuient sur :

- les énoncés fournis ;
- la documentation officielle SAP ;
- les règles ABAP classiques applicables aux modules fonction.

## 🌺 OBJETS UTILISÉS

Remplacer `<TRI>` par le trigramme attribué.

### Groupe de fonctions

```text
ZFG_<TRI>_TOOLS
```

### Programme de test

```text
ZAELION_<TRI>_FM_TEST
```

### Modules créés progressivement

```text
Z_<TRI>_TEXT_NORMALIZE
Z_<TRI>_AVERAGE
Z_<TRI>_CALC_NET_AMOUNT
Z_<TRI>_ADD
Z_<TRI>_DIVIDE
Z_<TRI>_STATUS_GET
Z_<TRI>_ADD_RFC
Z_<TRI>_LOG_WRITE_UPD
Z_<TRI>_DATE_VALIDATE
```

## 🌺 CONVENTION DES PARAMÈTRES

| Préfixe | Direction                     | Exemple      |
| ------- | ----------------------------- | ------------ |
| `IV_`   | Importing, valeur élémentaire | `IV_TEXT`    |
| `IS_`   | Importing, structure          | `IS_LOG`     |
| `IT_`   | Importing, table              | `IT_TEXTS`   |
| `EV_`   | Exporting, valeur élémentaire | `EV_TEXT`    |
| `ES_`   | Exporting, structure          | `ES_RETURN`  |
| `ET_`   | Exporting, table              | `ET_RESULTS` |
| `CV_`   | Changing, valeur              | `CV_TEXT`    |
| `CS_`   | Changing, structure           | `CS_ORDER`   |
| `CT_`   | Changing, table               | `CT_TEXTS`   |

## 🌺 RÈGLES COMMUNES

- Créer les objets dans le namespace client `Z` ou `Y`.
- Utiliser le package et l’ordre de transport attribués.
- Donner une description fonctionnelle à chaque objet.
- Documenter les paramètres et les exceptions.
- Utiliser des types DDIC ou globaux stables pour les interfaces publiques.
- Ne pas modifier un paramètre d’import.
- Utiliser `CHANGING` seulement lorsque l’effet de bord est attendu.
- Éviter `TABLES` dans un nouveau développement.
- Ne pas afficher de popup ou de message interactif dans une API réutilisable.
- Ne pas placer de `COMMIT WORK` dans un module métier réutilisable.
- Ne jamais placer de commit ou rollback dans un module de mise à jour.
- Contrôler `sy-subrc` immédiatement après un appel à exceptions classiques.
- Ne pas utiliser une donnée globale du groupe comme persistance métier.
- Ne pas rendre un module RFC sans besoin d’appel distant.
- Vérifier le contrat de toute BAPI avant la décision transactionnelle.
- Vérifier l’interface réelle d’une conversion exit dans `SE37`.
- Rechercher les appelants avant de modifier une interface existante.

---

# 🌸 RECTIFICATIONS TECHNIQUES GÉNÉRALES

## 🌺 GROUPE ET MODULE

Un groupe de fonctions est un programme ABAP de type **function pool**. Il contient :

- les modules fonction ;
- les déclarations globales partagées ;
- des sous-programmes ou includes techniques communs.

Un module fonction est appelé par un nom unique dans le système :

```abap
CALL FUNCTION 'Z_<TRI>_TEXT_NORMALIZE'.
```

Le nom du groupe n’apparaît pas dans l’appel.

## 🌺 INTERFACE ET APPEL

Interface du module :

```text
IMPORTING IV_TEXT
EXPORTING EV_TEXT
```

Appelant :

```abap
CALL FUNCTION 'Z_<TRI>_TEXT_NORMALIZE'
  EXPORTING
    iv_text = lv_input
  IMPORTING
    ev_text = lv_output.
```

L’appelant **exporte** vers les paramètres d’import du module et **importe** les paramètres d’export du module.

## 🌺 TABLES

L’onglet `TABLES` correspond à une forme historique. Les paramètres de table sont transmis par référence.

Pour un nouveau développement, préférer un type de table global :

```text
IMPORTING IT_TEXTS
EXPORTING ET_TEXTS
CHANGING CT_TEXTS
```

## 🌺 EXCEPTIONS

Une exception classique est déclarée dans l’onglet `Exceptions`, levée avec :

```abap
RAISE division_by_zero.
```

et mappée par l’appelant :

```abap
EXCEPTIONS
  division_by_zero = 1
  OTHERS           = 2.
```

Les valeurs `1` et `2` sont choisies par l’appelant.

## 🌺 RFC

Un module RFC doit :

- être marqué **Remote-Enabled Module** ;
- utiliser une interface compatible RFC ;
- transmettre ses paramètres par valeur ;
- ne pas dépendre du SAP GUI ;
- gérer `SYSTEM_FAILURE` et `COMMUNICATION_FAILURE` ;
- contrôler les autorisations et la destination.

## 🌺 UPDATE TASK

Un module de mise à jour est enregistré avec :

```abap
CALL FUNCTION 'Z_<TRI>_LOG_WRITE_UPD'
  IN UPDATE TASK
  EXPORTING
    is_log = ls_log.
```

Il est exécuté au prochain :

```abap
COMMIT WORK.
```

Il est abandonné avant exécution par :

```abap
ROLLBACK WORK.
```

## 🌺 CONVERSION EXIT

Une conversion exit est généralement constituée de deux modules :

```text
CONVERSION_EXIT_<ROUTINE>_INPUT
CONVERSION_EXIT_<ROUTINE>_OUTPUT
```

La routine correcte est celle du domaine DDIC concerné. `ALPHA` ou `MATN1` ne doivent pas être appliquées arbitrairement.
