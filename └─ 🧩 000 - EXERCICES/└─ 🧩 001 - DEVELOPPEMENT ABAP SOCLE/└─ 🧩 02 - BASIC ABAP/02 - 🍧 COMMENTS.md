# 🌸 EXERCICES — COMMENTAIRES IN ABAP

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- identifier les formes usuelles de commentaires ABAP ;
- distinguer commentaire de ligne, commentaire de fin de ligne et bloc visuel ;
- commenter l’intention d’un traitement sans décrire chaque instruction ;
- détecter un commentaire obsolète ou contradictoire ;
- vérifier qu’un commentaire n’altère pas l’exécution du programme.

## 🌺 DURÉE INDICATIVE

30 à 40 minutes.

## 🌺 PRÉREQUIS

- Exercice 01 terminé.
- Programme actif et exécutable.

## 🌺 EXERCICE 1 — IDENTIFICATION

Compléter le tableau :

| Forme                                | Usage attendu | Exécutée par ABAP |
| ------------------------------------ | ------------- | ----------------- |
| `* Texte` placé au début de la ligne |               |                   |
| `" Texte` après une instruction      |               |                   |
| Lignes commençant par `*&`           |               |                   |

Répondre ensuite aux questions :

1. Un commentaire peut-il modifier directement la valeur d’une variable ?
2. Un commentaire doit-il expliquer systématiquement chaque instruction ?
3. Quelle information est généralement plus utile : ce que fait une instruction évidente ou la raison métier de son existence ?
4. Quel risque présente un commentaire qui n’est plus cohérent avec le code ?

> [!NOTE]
> `*&` est une convention visuelle construite à partir d’une ligne de commentaire commençant par `*`.  
> Il ne s’agit pas d’un traitement exécuté par ABAP.

## 🌺 EXERCICE 2 — COMMENTER UN TRAITEMENT

Remplacer la sous-routine `build_message` par la version suivante :

```abap
FORM build_message.

  IF p_name IS INITIAL.
    gv_message = 'Bonjour'.
  ELSE.
    CONCATENATE 'Bonjour'
                p_name
           INTO gv_message
      SEPARATED BY space.
  ENDIF.

ENDFORM.
```

Ajouter des commentaires respectant les règles suivantes :

1. un bloc visuel avant la sous-routine ;
2. un commentaire de ligne expliquant le cas où aucun nom n’est saisi ;
3. un commentaire de ligne expliquant la personnalisation du message ;
4. aucun commentaire décrivant simplement la syntaxe de `IF`, `ELSE` ou `CONCATENATE` ;
5. aucune ligne de code mise en commentaire dans la version finale.

Tester ensuite :

- avec `p_name = AELION` ;
- avec `p_name` vide.

## 🌺 EXERCICE 3 — NETTOYAGE DE COMMENTAIRES INUTILES

Analyser le code suivant :

```abap
DATA lv_counter TYPE i VALUE 0.

* Ajouter 1 à lv_counter
lv_counter = lv_counter + 1.

* Afficher lv_counter
WRITE lv_counter.
```

Réécrire les commentaires en respectant les principes suivants :

- supprimer les commentaires qui répètent exactement le code ;
- conserver uniquement une information utile à la compréhension ;
- ne pas modifier le résultat du programme.

Expliquer pourquoi une version sans commentaire peut être préférable lorsque le code est immédiatement compréhensible.

## 🌺 EXERCICE 4 — COMMENTAIRE OBSOLÈTE

Analyser le code suivant :

```abap
DATA lv_total TYPE i VALUE 100.

* Appliquer une remise de 10 points
lv_total = lv_total - 5.

WRITE lv_total.
```

Contexte fonctionnel réel :

```text
Une remise fixe de 5 points doit être appliquée.
```

Effectuer les actions suivantes :

1. exécuter mentalement ou techniquement le code ;
2. indiquer la valeur affichée ;
3. identifier l’incohérence ;
4. corriger uniquement le commentaire ;
5. expliquer pourquoi le programme ne produit pas de dump malgré l’erreur documentaire.

## 🌺 RÉSULTATS ATTENDUS

Avec un nom :

```text
Révision BASIC ABAP
Bonjour AELION
Programme : ZAELION_<TRI>_HELLOWORLD
```

Avec un nom vide :

```text
Révision BASIC ABAP
Bonjour
Programme : ZAELION_<TRI>_HELLOWORLD
```

## 🌺 LIVRABLES

- sous-routine `build_message` commentée ;
- résultat des deux tests ;
- version nettoyée de l’exercice 3 ;
- correction du commentaire obsolète ;
- explication de la différence entre erreur documentaire et erreur d’exécution.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Les commentaires sont ignorés lors de l’exécution.
- [ ] Les trois formes demandées sont identifiées.
- [ ] Les commentaires expliquent une intention ou une règle.
- [ ] Aucun commentaire ne répète inutilement une instruction évidente.
- [ ] Le commentaire obsolète est corrigé.
- [ ] Le résultat du programme reste conforme.
- [ ] Aucune ligne nécessaire n’est laissée en commentaire.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — exercice 1

| Forme                                | Usage attendu                              | Exécutée par ABAP |
| ------------------------------------ | ------------------------------------------ | ----------------- |
| `* Texte` placé au début de la ligne | Commenter une ligne entière                | Non               |
| `" Texte` après une instruction      | Ajouter une précision en fin de ligne      | Non               |
| Lignes commençant par `*&`           | Construire un bloc visuel ou une cartouche | Non               |

1. Non. Le contenu d’un commentaire n’est pas exécuté.
2. Non. Le sur-commentaire réduit la lisibilité.
3. La raison métier ou technique est généralement plus utile.
4. Il peut induire le lecteur en erreur et provoquer une mauvaise modification ultérieure.

### Solution — exercice 2

```abap
*&---------------------------------------------------------------------*
*& Construction du message affiché à l'utilisateur
*&---------------------------------------------------------------------*
FORM build_message.

* Conserver un message générique lorsqu'aucun nom n'est renseigné
  IF p_name IS INITIAL.
    gv_message = 'Bonjour'.
  ELSE.
* Personnaliser le message avec la valeur validée à l'écran
    CONCATENATE 'Bonjour'
                p_name
           INTO gv_message
      SEPARATED BY space.
  ENDIF.

ENDFORM.
```

Les commentaires décrivent le comportement attendu, pas la syntaxe ABAP.

### Solution — exercice 3

Version minimale :

```abap
DATA lv_counter TYPE i VALUE 0.

lv_counter = lv_counter + 1.
WRITE lv_counter.
```

Les deux commentaires initiaux répétaient exactement les instructions.  
Le code reste compréhensible sans eux.

Une autre version acceptable consiste à ajouter un commentaire uniquement si une raison métier existe réellement :

```abap
DATA lv_counter TYPE i VALUE 0.

* Comptabiliser le traitement courant dans le total du lot
lv_counter = lv_counter + 1.

WRITE lv_counter.
```

### Solution — exercice 4

Valeur affichée :

```text
95
```

Le code applique bien la règle fonctionnelle réelle : retirer `5`.  
Le commentaire est obsolète.

Correction :

```abap
DATA lv_total TYPE i VALUE 100.

* Appliquer la remise fixe de 5 points
lv_total = lv_total - 5.

WRITE lv_total.
```

Le programme ne produit pas de dump, car le commentaire est ignoré.  
L’erreur concerne la documentation du code, pas son exécution.

</details>
