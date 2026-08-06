# 🌸 EXERCICES — COMPOSANTS STATIQUES

## 🌺 OBJECTIFS

- créer une méthode statique ;
- créer un attribut statique ;
- utiliser `=>` ;
- comprendre l’état partagé ;
- choisir entre statique et instance.

## 🌺 DURÉE INDICATIVE

55 à 70 minutes.

## 🌺 CLASSE

```text
ZCL_<TRI>_TEXT_UTIL
```

Instanciation :

```text
CREATE PRIVATE ou CREATE PUBLIC selon le système,
mais aucune instance n’est nécessaire pour les méthodes statiques.
```

## 🌺 MÉTHODE STATIQUE

```text
TO_UPPER
```

Signature :

```text
IV_TEXT TYPE STRING
RV_TEXT TYPE STRING
```

## 🌺 IMPLÉMENTATION

```abap
METHOD to_upper.

  rv_text = iv_text.
  TRANSLATE rv_text TO UPPER CASE.

ENDMETHOD.
```

## 🌺 EXERCICE 1 — APPEL

```abap
DATA(lv_text) =
  zcl_<tri>_text_util=>to_upper(
    iv_text = `Bonjour`
  ).
```

## 🌺 EXERCICE 2 — COMPTEUR STATIQUE

Ajouter temporairement :

```text
GV_CALL_COUNT
```

Incrémenter à chaque appel.

Observer l’état partagé.

## 🌺 EXERCICE 3 — LIMITE

Une méthode statique ne peut pas accéder directement à un attribut d’instance sans disposer d’une référence vers un objet.

## 🌺 EXERCICE 4 — CHOIX

| Besoin                               | Méthode           |
| ------------------------------------ | ----------------- |
| Transformation pure sans état        | Statique possible |
| Calcul utilisant le stock d’un objet | Instance          |
| Création contrôlée d’objets          | Factory statique  |
| Service avec dépendances injectées   | Instance          |
| État global mutable                  | À éviter          |

## 🌺 DIAGNOSTIC

Transformer toutes les méthodes d’une classe métier en statiques.

Identifier la perte :

- d’encapsulation par objet ;
- d’injection de dépendances ;
- de polymorphisme d’instance ;
- de testabilité.

## 🌺 CRITÈRES DE VALIDATION

- [ ] `TO_UPPER` est statique.
- [ ] L’appel utilise `=>`.
- [ ] Aucune instance n’est créée.
- [ ] Le compteur partagé est observé.
- [ ] La limite d’accès aux attributs d’instance est comprise.
- [ ] Le choix statique/instance est justifié.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
WRITE /
  zcl_<tri>_text_util=>to_upper(
    iv_text = `abap objects`
  ).
```

Une méthode statique est pertinente lorsque le comportement dépend uniquement de ses paramètres et d’un état statique explicitement maîtrisé.

</details>
