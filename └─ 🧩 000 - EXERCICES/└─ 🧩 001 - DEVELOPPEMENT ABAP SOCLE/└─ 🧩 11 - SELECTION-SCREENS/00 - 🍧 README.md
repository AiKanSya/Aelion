# 🌸 SOMMAIRE — └─ 🧩 11 - SELECTION-SCREENS AND REPORT

## 🌺 OBJECTIF DU PARCOURS

Ces exercices renforcent la création de rapports exécutables ABAP avec écran de sélection et restitution ALV.

Le parcours conserve les cinq chapitres du dossier d’origine :

1. `SELECTION-SCREEN` ;
2. `PARAMETERS` ;
3. `SELECT-OPTIONS` ;
4. `MATCHCODE` ;
5. `REPORT`.

Le stagiaire doit être capable de :

- expliquer le rôle d’un programme exécutable ;
- structurer le cycle d’un report ;
- créer un écran de sélection lisible ;
- utiliser `PARAMETERS` pour une valeur unique ;
- utiliser `SELECT-OPTIONS` pour des valeurs multiples, inclusions, exclusions et intervalles ;
- comprendre la structure `SIGN`, `OPTION`, `LOW`, `HIGH` ;
- valider les saisies au bon événement ;
- distinguer `INITIALIZATION`, `AT SELECTION-SCREEN OUTPUT`, `AT SELECTION-SCREEN` et `START-OF-SELECTION` ;
- rendre des champs obligatoires, masqués, visibles ou modifiables ;
- créer des cases à cocher et boutons radio ;
- utiliser les textes de sélection et symboles de texte ;
- exploiter une aide F4 automatique ;
- créer une aide F4 personnalisée ;
- distinguer l’ancien terme « matchcode » de l’aide à la recherche DDIC ;
- filtrer des données avec les critères de l’écran ;
- limiter le volume lu ;
- afficher un résultat avec `CL_SALV_TABLE` ;
- traiter une table résultat vide ;
- gérer `CX_SALV_MSG` ;
- utiliser les fonctions ALV de façon contrôlée ;
- préparer un report compatible avec les variantes et l’exécution en arrière-plan ;
- éviter les dépendances SAP GUI dans un traitement de fond ;
- diagnostiquer les principales erreurs d’un report classique.

## 🌺 COURS ASSOCIÉS

- `11 - SELECTION-SCREENS AND REPORT/01 - 🍧 SELECTION-SCREEN.md`
- `11 - SELECTION-SCREENS AND REPORT/02 - 🍧 PARAMETERS.md`
- `11 - SELECTION-SCREENS AND REPORT/03 - 🍧 SELECT-OPTIONS.md`
- `11 - SELECTION-SCREENS AND REPORT/04 - 🍧 MATCHCODE.md`
- `11 - SELECTION-SCREENS AND REPORT/05 - 🍧 REPORT.md`

## 🌺 PROGRAMME UTILISÉ

Créer le programme exécutable suivant :

```text
ZAELION_<TRI>_REPORT
```

Remplacer `<TRI>` par le trigramme attribué.

Le programme utilise les tables personnalisées créées dans les dossiers précédents.

## 🌺 TABLES UTILISÉES

### Table des commandes

```text
ZT_<TRI>_ORD
```

Champs principaux :

```text
MANDT
ORDER_ID
CUSTOMER_NAME
PRIORITY
STATUS
CURRENCY
AMOUNT
CREATED_BY
CREATED_ON
```

### Table des statuts

```text
ZT_<TRI>_STAT
```

Champs :

```text
MANDT
STATUS
STATUS_TEXT
```

## 🌺 DONNÉES DE RÉFÉRENCE

| Commande     | Client        | Priorité | Statut |  Montant | Devise |
| ------------ | ------------- | -------: | ------ | -------: | ------ |
| `0000000001` | Alice Martin  |      `2` | `N`    | `125,50` | `EUR`  |
| `0000000002` | Bruno Bernard |      `3` | `P`    |  `75,00` | `EUR`  |
| `0000000003` | Claire Martin |      `1` | `C`    |  `50,00` | `USD`  |

Statuts :

| Statut | Libellé        |
| ------ | -------------- |
| `N`    | Nouvelle       |
| `P`    | En préparation |
| `C`    | Clôturée       |

Les dates et utilisateurs de création peuvent différer selon les exercices précédents.

## 🌺 RÈGLES COMMUNES

- Utiliser uniquement les tables `Z` attribuées.
- Ne jamais sélectionner une table volumineuse sans filtre ni limite.
- Ne jamais modifier les données dans ce dossier.
- Utiliser des noms techniques courts, lisibles et conformes à la limite ABAP des éléments d’écran.
- Maintenir les textes de sélection et symboles de texte.
- Ne pas utiliser les noms techniques comme libellés destinés à l’utilisateur.
- Valider les saisies avant `START-OF-SELECTION`.
- Ne pas effectuer la sélection principale dans `AT SELECTION-SCREEN OUTPUT`.
- Ne pas afficher un message de succès si aucun résultat n’a été obtenu.
- Ne pas considérer `OBLIGATORY` comme une validation métier complète.
- Ne pas considérer une table `SELECT-OPTIONS` vide comme une erreur automatique.
- Ne pas utiliser un filtre vide dans un traitement où au moins un critère est obligatoire.
- Ne pas écrire de code dépendant du poste SAP GUI dans un report destiné à l’arrière-plan.
- Ne pas appeler `CL_GUI_FRONTEND_SERVICES` en traitement de fond.
- Ne pas utiliser `SELECT *` dans le report final.
- Ne pas placer un `SELECT` dans une boucle.
- Gérer les exceptions ALV.
- Ne pas supposer que toutes les fonctions ALV sont disponibles pour tous les utilisateurs.
- Conserver une preuve vérifiable :
  - écran ;
  - valeurs saisies ;
  - code ;
  - résultats ;
  - cas nominal ;
  - cas vide ;
  - cas invalide.

---

# 🌸 RECTIFICATIONS TECHNIQUES APPLIQUÉES

## 🌺 ÉCRAN DE SÉLECTION STANDARD

Dans un programme exécutable classique, les déclarations :

```abap
PARAMETERS
SELECT-OPTIONS
SELECTION-SCREEN
```

participent à la génération de l’écran de sélection standard, généralement identifié par le numéro :

```text
1000
```

Cet écran n’est pas dessiné dans Screen Painter comme un dynpro classique. Il est généré à partir des instructions ABAP.

## 🌺 CYCLE PRINCIPAL D’UN REPORT

Cycle simplifié :

```text
LOAD-OF-PROGRAM
INITIALIZATION
Affichage de l’écran
AT SELECTION-SCREEN OUTPUT
Interactions et validations AT SELECTION-SCREEN
START-OF-SELECTION
END-OF-SELECTION
```

Points essentiels :

- `INITIALIZATION` prépare les valeurs initiales avant le premier affichage ;
- `AT SELECTION-SCREEN OUTPUT` modifie les propriétés visuelles avant l’affichage ;
- `AT SELECTION-SCREEN` et ses variantes valident les entrées ;
- `START-OF-SELECTION` lance le traitement principal après validation ;
- `END-OF-SELECTION` peut contenir la restitution finale.

## 🌺 INITIALIZATION

Exemple :

```abap
INITIALIZATION.

  p_max = 100.

  s_date[] = VALUE #(
    ( sign   = 'I'
      option = 'BT'
      low    = sy-datum - 30
      high   = sy-datum )
  ).
```

Cet événement est destiné à initialiser l’écran avant son premier affichage.

Il ne doit pas lancer le traitement principal.

## 🌺 AT SELECTION-SCREEN OUTPUT

Cet événement joue un rôle comparable à un traitement PBO de l’écran de sélection.

Il permet notamment de modifier la table système :

```abap
SCREEN
```

Exemple :

```abap
AT SELECTION-SCREEN OUTPUT.

  LOOP AT SCREEN.

    IF screen-group1 = 'DET'.
      screen-active = xsdbool( p_detail = abap_true ).
      MODIFY SCREEN.
    ENDIF.

  ENDLOOP.
```

Il ne doit pas être utilisé pour exécuter la sélection métier principale à chaque rafraîchissement de l’écran.

## 🌺 AT SELECTION-SCREEN

Cet événement est déclenché pendant le traitement des actions utilisateur sur l’écran.

Une erreur de type `E` renvoie l’utilisateur sur l’écran :

```abap
AT SELECTION-SCREEN ON p_max.

  IF p_max NOT BETWEEN 1 AND 500.
    MESSAGE 'Le maximum doit être compris entre 1 et 500'
      TYPE 'E'.
  ENDIF.
```

Variantes utiles :

```text
AT SELECTION-SCREEN ON <field>
AT SELECTION-SCREEN ON BLOCK <block>
AT SELECTION-SCREEN ON RADIOBUTTON GROUP <group>
AT SELECTION-SCREEN ON VALUE-REQUEST FOR <field>
AT SELECTION-SCREEN ON HELP-REQUEST FOR <field>
AT SELECTION-SCREEN OUTPUT
```

## 🌺 START-OF-SELECTION

Cet événement constitue le point d’entrée du traitement principal d’un report exécutable classique.

```abap
START-OF-SELECTION.

  PERFORM select_data.
```

Il intervient après le traitement réussi de l’écran de sélection.

## 🌺 PARAMETERS

`PARAMETERS` crée un objet de données global et un élément d’écran pour une valeur unique.

```abap
PARAMETERS p_max TYPE i DEFAULT 100 OBLIGATORY.
```

Le paramètre peut être utilisé directement dans le programme :

```abap
UP TO @p_max ROWS
```

## 🌺 SELECT-OPTIONS

`SELECT-OPTIONS` crée une table de sélection comportant les colonnes :

```text
SIGN
OPTION
LOW
HIGH
```

Exemple :

```abap
DATA gv_order_id TYPE zt_<tri>_ord-order_id.

SELECT-OPTIONS s_order FOR gv_order_id.
```

La déclaration historique :

```abap
TABLES zt_<tri>_ord.
SELECT-OPTIONS s_order FOR zt_<tri>_ord-order_id.
```

n’est pas nécessaire ici.

Une donnée correctement typée suffit.

## 🌺 TABLE DE SÉLECTION VIDE

Dans une condition Open SQL :

```abap
WHERE order_id IN @s_order
```

une table de sélection initiale ne restreint pas le résultat.

Ce comportement est utile pour un filtre facultatif.

Il devient dangereux si la règle exige au moins un critère.

Contrôle :

```abap
IF s_order[] IS INITIAL
   AND s_status[] IS INITIAL
   AND s_date[] IS INITIAL.

  MESSAGE 'Saisissez au moins un critère de sélection'
    TYPE 'E'.

ENDIF.
```

## 🌺 OBLIGATORY

`OBLIGATORY` impose la saisie du premier champ affiché.

Il ne garantit pas :

- que la valeur existe en base ;
- que l’intervalle est cohérent ;
- que les inclusions et exclusions sont compatibles ;
- que la valeur respecte une règle métier.

Une validation ABAP reste nécessaire.

## 🌺 NO INTERVALS ET NO-EXTENSION

```abap
SELECT-OPTIONS s_status
  FOR gv_status
  NO INTERVALS
  NO-EXTENSION.
```

Effets :

- `NO INTERVALS` masque le champ `HIGH` ;
- `NO-EXTENSION` empêche l’utilisation du bouton de sélection multiple.

La table de sélection existe toujours techniquement.

## 🌺 AIDE F4

L’ancien terme « matchcode » reste parfois utilisé, mais le terme actuel est :

```text
aide à la recherche
aide F4
input help
search help
```

Une aide peut être proposée automatiquement lorsque le champ DDIC ou son contexte fournit :

- une search help ;
- une aide attachée au champ ;
- des valeurs fixes de domaine ;
- une logique standard d’aide possible.

La référence directe à un champ de table n’est pas l’unique moyen d’obtenir une aide.

Un élément de données DDIC peut également porter la sémantique et l’aide nécessaires.

## 🌺 AIDE F4 PERSONNALISÉE

Événement :

```abap
AT SELECTION-SCREEN ON VALUE-REQUEST FOR p_status.
```

Fonction courante pour une table de valeurs interne :

```abap
F4IF_INT_TABLE_VALUE_REQUEST
```

La fonction personnalisée doit :

- limiter les valeurs ;
- retourner la bonne colonne ;
- gérer l’absence de données ;
- ne pas remplacer inutilement une search help DDIC réutilisable.

## 🌺 REPORT ET ALV

`REPORT` introduit un programme exécutable classique :

```abap
REPORT zaelion_<tri>_report.
```

`CL_SALV_TABLE` permet d’afficher une table interne dans un ALV en lecture seule.

```abap
cl_salv_table=>factory(
  IMPORTING
    r_salv_table = lo_alv
  CHANGING
    t_table      = gt_output
).
```

L’exception principale de création est :

```abap
CX_SALV_MSG
```

## 🌺 TABLE ALV VIDE

Une table interne statiquement typée conserve sa structure même lorsqu’elle est vide.

Un ALV peut donc techniquement connaître ses colonnes.

Dans ce parcours, le choix ergonomique est de ne pas afficher un ALV vide et de produire un message clair :

```abap
IF gt_output IS INITIAL.
  MESSAGE 'Aucune donnée trouvée' TYPE 'S'.
  RETURN.
ENDIF.
```

## 🌺 SALV NON ÉDITABLE

`CL_SALV_TABLE` est utilisé pour une restitution.

Il ne constitue pas un ALV Grid éditable destiné à modifier les données.

## 🌺 VARIANTES

Les variantes de sélection permettent d’enregistrer des valeurs de l’écran.

Elles ne remplacent pas :

- la validation ;
- l’autorisation ;
- la limite de volume ;
- l’adaptation à l’arrière-plan.

Les champs masqués ou techniques doivent être conçus avec prudence, car une variante peut conserver des valeurs anciennes.
