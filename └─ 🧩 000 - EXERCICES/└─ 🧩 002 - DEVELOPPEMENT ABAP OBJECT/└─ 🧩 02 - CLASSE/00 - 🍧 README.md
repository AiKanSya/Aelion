# 🌸 SOMMAIRE — └─ 🧩 02 - CLASSE

## 🌺 OBJECTIF DU PARCOURS

1. `CLASSES ET OBJETS`
2. `DEFINITION ET IMPLEMENTATION`
3. `VISIBILITE`
4. `ATTRIBUTS`
5. `METHODES ET PARAMETRES`
6. `REFERENCES ET INSTANCIATION`
7. `CONSTRUCTEURS`
8. `TYPES ET CONSTANTES`
9. `ENCAPSULATION`
10. `COMPOSANTS STATIQUES`
11. `SINGLETON`
12. `HERITAGE ET POLYMORPHISME`
13. `INTERFACES`
14. `EXCEPTIONS DE CLASSE`
15. `CLASSE DE MESSAGES DANS UNE CLASSE ABAP`
16. `METHODES STATIQUES STANDARD`
17. `ARCHITECTURE OBJET D'UN IMPORT`

Le stagiaire doit être capable de :

- expliquer les notions de classe, objet et référence ;
- créer une classe globale avec `SE24` ;
- distinguer définition et implémentation ;
- appliquer les visibilités `PUBLIC`, `PROTECTED` et `PRIVATE` ;
- créer des attributs d’instance et statiques ;
- créer des méthodes et leurs paramètres ;
- instancier une classe avec `NEW` ;
- utiliser les constructeurs d’instance et statiques ;
- créer des types et constantes de classe ;
- protéger l’état interne par encapsulation ;
- utiliser les composants statiques avec `=>` ;
- implémenter un Singleton et en expliquer les limites ;
- créer une hiérarchie avec héritage simple ;
- utiliser le polymorphisme ;
- créer et implémenter une interface globale ;
- créer et traiter une exception de classe ;
- construire un message `SE91` sans imposer son affichage ;
- appeler une méthode statique d’une classe standard ;
- concevoir l’architecture objet d’un traitement d’import.

## 🌺 SOURCE DISPONIBLE

Le dossier d’exercices contient les dix-sept fichiers du sommaire ci-dessus.

Les corrections techniques reposent sur :

- les énoncés fournis ;
- la documentation officielle SAP ;
- les règles ABAP Objects applicables aux classes globales.

## 🌺 OBJETS PRINCIPAUX

Remplacer `<TRI>` par le trigramme attribué.

### Programmes de test

```text
ZAELION_<TRI>_CLASS_TEST
ZAELION_<TRI>_IMPORT_TEST
```

### Classes créées progressivement

```text
ZCL_<TRI>_PERSON
ZCL_<TRI>_CALCULATOR
ZCL_<TRI>_ACCOUNT
ZCL_<TRI>_PRODUCT
ZCL_<TRI>_COUNTER
ZCL_<TRI>_ORDER
ZCL_<TRI>_STOCK
ZCL_<TRI>_TEXT_UTIL
ZCL_<TRI>_SETTINGS
ZCL_<TRI>_SHAPE
ZCL_<TRI>_RECTANGLE
ZCL_<TRI>_CIRCLE
ZCL_<TRI>_TEXT_EXPORTER
ZCL_<TRI>_CSV_EXPORTER
ZCL_<TRI>_PARTICIPANT_IMPORT
```

### Interface

```text
ZIF_<TRI>_EXPORTER
```

### Exception

```text
ZCX_<TRI>_DIVISION_BY_ZERO
ZCX_<TRI>_INVALID_AMOUNT
ZCX_<TRI>_IMPORT
```

### Classe de messages

```text
Z<TRI>_MSG
```

## 🌺 CONVENTION DE NOMMAGE

| Élément             | Préfixe                    | Exemple            |
| ------------------- | -------------------------- | ------------------ |
| Attribut d’instance | `MV_`, `MS_`, `MT_`, `MO_` | `MV_BALANCE`       |
| Attribut statique   | `GV_`, `GS_`, `GT_`, `GO_` | `GV_PRODUCT_COUNT` |
| Paramètre importing | `IV_`, `IS_`, `IT_`, `IO_` | `IV_AMOUNT`        |
| Paramètre exporting | `EV_`, `ES_`, `ET_`, `EO_` | `EV_RESULT`        |
| Paramètre changing  | `CV_`, `CS_`, `CT_`, `CO_` | `CV_TEXT`          |
| Paramètre returning | `RV_`, `RS_`, `RT_`, `RO_` | `RV_AREA`          |
| Variable locale     | `LV_`, `LS_`, `LT_`, `LO_` | `LV_RESULT`        |
| Référence de classe | `LO_` ou `RO_`             | `LO_PRODUCT`       |

Le préfixe n’indique pas la visibilité. La visibilité est définie dans `SE24` ou dans la section de classe.

## 🌺 RÈGLES COMMUNES

- Créer les classes globales dans `SE24` ou dans ADT lorsque le système le permet.
- Utiliser le package et l’ordre de transport attribués.
- Renseigner la description de chaque classe, méthode et paramètre.
- Activer la classe après chaque étape cohérente.
- Limiter les composants publics au contrat réellement nécessaire.
- Éviter les attributs publics modifiables.
- Préférer des attributs privés et des méthodes métier.
- Ne pas utiliser une méthode statique uniquement pour éviter l’instanciation.
- Ne pas utiliser un Singleton comme variable globale universelle.
- Utiliser l’héritage uniquement pour une relation métier « est un ».
- Préférer une interface lorsqu’un comportement commun doit être implémenté par plusieurs classes indépendantes.
- Déclarer les exceptions contrôlables dans la signature des méthodes.
- Ne pas afficher directement un message dans une classe métier réutilisable.
- Ne pas utiliser `COMMIT WORK` dans une méthode basse qui ne possède pas la transaction complète.
- Ne pas modifier directement la base depuis le constructeur.
- Ne pas appeler de méthode redéfinissable depuis un constructeur sans analyser le dispatch dynamique.
- Rechercher les appelants avant de modifier une classe globale publiée.
- Conserver une preuve vérifiable :
  - capture `SE24` ;
  - signature ;
  - code ;
  - programme appelant ;
  - résultat nominal ;
  - cas limite ;
  - exception ou erreur volontaire corrigée.

---

# 🌸 RECTIFICATIONS TECHNIQUES GÉNÉRALES

## 🌺 CLASSE GLOBALE ET CLASSE LOCALE

Une classe globale :

- appartient au Repository ABAP ;
- est créée avec `SE24` ou ADT ;
- peut être utilisée par les programmes autorisés du système ;
- possède son propre class pool.

Une classe locale :

- est déclarée dans un programme ABAP ;
- n’est visible que dans ce programme ;
- utilise les blocs `CLASS ... DEFINITION` et `CLASS ... IMPLEMENTATION`.

Les exercices demandent principalement des **classes globales**.

## 🌺 COMPOSANTS D’INSTANCE ET STATIQUES

| Composant           | Déclaration     | Accès                  |
| ------------------- | --------------- | ---------------------- |
| Attribut d’instance | `DATA`          | `lo_object->attribute` |
| Méthode d’instance  | `METHODS`       | `lo_object->method( )` |
| Attribut statique   | `CLASS-DATA`    | `zcl_class=>attribute` |
| Méthode statique    | `CLASS-METHODS` | `zcl_class=>method( )` |
| Type                | `TYPES`         | `zcl_class=>ty_type`   |
| Constante           | `CONSTANTS`     | `zcl_class=>gc_value`  |

## 🌺 IDENTITÉ D’OBJET

Deux objets créés séparément possèdent une identité distincte, même si leurs attributs contiennent les mêmes valeurs.

Deux références peuvent désigner le même objet :

```abap
DATA(lo_first) = NEW zcl_<tri>_counter( ).
DATA(lo_alias) = lo_first.
```

Une modification effectuée via `LO_ALIAS` est visible via `LO_FIRST`.

## 🌺 ENCAPSULATION

L’encapsulation ne consiste pas seulement à déclarer les attributs privés.

Elle exige que :

- l’objet protège ses invariants ;
- les modifications passent par des méthodes métier ;
- l’interface publique reste minimale ;
- les données internes puissent évoluer sans casser les appelants.

## 🌺 POLYMORPHISME

Une référence de superclasse ou d’interface peut désigner des objets de classes concrètes différentes.

La méthode exécutée dépend de la classe réelle de l’objet lorsque la méthode est redéfinie ou implémentée polymorphiquement.

## 🌺 SINGLETON

Un Singleton ABAP garantit au maximum une instance gérée par la classe dans une **session interne donnée**.

Il ne garantit pas une instance unique :

- dans tout le système ;
- entre tous les utilisateurs ;
- entre plusieurs work processes ;
- entre plusieurs appels RFC indépendants.
