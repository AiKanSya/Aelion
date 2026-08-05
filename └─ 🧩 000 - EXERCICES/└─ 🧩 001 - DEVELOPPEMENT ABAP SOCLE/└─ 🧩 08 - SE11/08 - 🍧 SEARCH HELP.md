# 🌸 EXERCICES — AIDE A LA RECHERCHE (F4 HELP)

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [AIDE A LA RECHERCHE (F4 HELP)](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 08 - SE11/08 - 🍧 SEARCH HELP.md>)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- définir une aide à la recherche ;
- distinguer aide élémentaire et collective ;
- choisir une méthode de sélection ;
- définir les paramètres d’import et d’export ;
- définir l’ordre de la liste et de la sélection ;
- choisir un type de dialogue ;
- affecter l’aide à un élément de données ;
- tester la propagation dans un programme.

## 🌺 DURÉE INDICATIVE

75 à 90 minutes.

## 🌺 EXERCICE 1 — TYPES

Compléter :

| Type                  | Définition |
| --------------------- | ---------- |
| Aide élémentaire      |            |
| Aide collective       |            |
| Méthode de sélection  |            |
| Paramètre d’import    |            |
| Paramètre d’export    |            |
| Position de liste     |            |
| Position de sélection |            |

## 🌺 EXERCICE 2 — CRÉATION

Créer :

```text
ZSH_<TRI>_OID
```

Type :

```text
Aide à la recherche élémentaire
```

Description :

```text
Recherche des commandes de formation
```

Méthode de sélection :

```text
ZV_<TRI>_ORD
```

Type de dialogue :

```text
Dialogue dépendant du jeu de valeurs
```

## 🌺 EXERCICE 3 — PARAMÈTRES

Définir :

| Paramètre       | IMP | EXP | Position liste | Position sélection |
| --------------- | --- | --- | -------------: | -----------------: |
| `ORDER_ID`      | X   | X   |              1 |                  1 |
| `CUSTOMER_NAME` |     |     |              2 |                  2 |
| `STATUS`        | X   |     |              3 |                  3 |
| `STATUS_TEXT`   |     |     |              4 |                  0 |
| `CREATED_ON`    |     |     |              5 |                  4 |

Répondre :

1. quel champ est renvoyé dans le champ d’écran ?
2. quels champs peuvent restreindre la recherche ?
3. pourquoi `STATUS_TEXT` ne possède-t-il pas de position de sélection ?
4. pourquoi `ORDER_ID` est-il import et export ?
5. une aide élémentaire peut-elle utiliser une table ou une vue comme méthode de sélection ?

## 🌺 EXERCICE 4 — TEST DIRECT

Sauvegarder, contrôler et activer.

Utiliser le bouton de test.

Cas :

```text
Sans filtre
Filtre STATUS = N
Filtre CUSTOMER_NAME contenant Martin
Filtre CREATED_ON = date du jour
```

Relever :

- nombre de résultats ;
- ordre des colonnes ;
- valeur retournée ;
- comportement du dialogue.

## 🌺 EXERCICE 5 — AFFECTATION À L’ÉLÉMENT DE DONNÉES

Affecter `ZSH_<TRI>_OID` à :

```text
ZDE_<TRI>_OID
```

Contrôler et activer l’élément.

Répondre :

1. quels champs utilisant l’élément peuvent hériter de l’aide ?
2. faut-il redéfinir l’aide dans chaque programme ?
3. pourquoi cette affectation augmente-t-elle la cohérence ?
4. quel risque existe si l’aide retourne une donnée différente de l’identifiant ?

## 🌺 EXERCICE 6 — TEST DANS LE PROGRAMME

Ajouter :

```abap
PARAMETERS p_order TYPE zde_<tri>_oid.
```

Exécuter le programme et appeler `F4`.

Résultat attendu :

- affichage des commandes ;
- sélection d’une ligne ;
- retour de `ORDER_ID` dans `p_order`.

## 🌺 EXERCICE 7 — PRÉFILTRAGE

Ajouter :

```abap
PARAMETERS p_stat TYPE zde_<tri>_stat.
PARAMETERS p_order TYPE zde_<tri>_oid.
```

Saisir :

```text
p_stat = N
```

Appeler ensuite F4 sur `p_order`.

Analyser si le paramètre d’import `STATUS` reçoit effectivement la valeur du contexte.

> [!NOTE]
> La propagation dépend de l’association des champs et du contexte d’écran. Le test doit constater le comportement réel.

## 🌺 EXERCICE 8 — TYPES DE DIALOGUE

Associer :

| Volume ou usage                          | Type                        |
| ---------------------------------------- | --------------------------- |
| Très petite liste                        | Affichage immédiat          |
| Liste importante nécessitant des filtres | Dialogue avec restriction   |
| Volume variable                          | Dépendant du jeu de valeurs |

Le mode dépendant du jeu de valeurs utilise le seuil défini par le comportement standard du système.

## 🌺 EXERCICE 9 — DIAGNOSTICS

### Cas A — aucune colonne export

Symptôme :

```text
La sélection ne retourne aucune valeur utile.
```

### Cas B — mauvaise méthode de sélection

Symptôme :

```text
Les champs attendus ne sont pas disponibles.
```

### Cas C — `CUSTOMER_NAME` export au lieu de `ORDER_ID`

Symptôme :

```text
Le nom est renvoyé dans un champ identifiant.
```

### Cas D — affichage immédiat sur une très grande liste

Symptôme :

```text
Temps d’attente et ergonomie dégradée.
```

### Cas E — aide créée mais non affectée

Symptôme :

```text
F4 standard ou aucune aide spécifique dans le programme.
```

Pour chaque cas :

- cause ;
- correction ;
- test.

## 🌺 EXERCICE 10 — AIDE COLLECTIVE

Sans créer l’objet, expliquer un cas où une aide collective serait pertinente :

```text
Recherche d’une commande
- par identifiant
- par client
- par date
```

Répondre :

1. combien d’aides élémentaires pourraient être regroupées ?
2. quel avantage apporte une aide collective ?
3. faut-il créer une aide collective pour un seul mode de recherche ?
4. le présent exercice exige-t-il sa création ?

## 🌺 LIVRABLES

- aide élémentaire active ;
- paramètres ;
- résultats des quatre tests ;
- affectation à l’élément ;
- test F4 dans le programme ;
- analyse du préfiltrage ;
- tableau des dialogues ;
- diagnostics ;
- explication d’une aide collective.

## 🌺 CRITÈRES DE VALIDATION

- [ ] La méthode de sélection est la vue active.
- [ ] `ORDER_ID` est exporté.
- [ ] Les positions de liste sont cohérentes.
- [ ] Les champs de sélection sont justifiés.
- [ ] Le dialogue est adapté au volume.
- [ ] L’aide est affectée à l’élément de données.
- [ ] Le programme reçoit l’identifiant.
- [ ] Les erreurs de mapping sont diagnostiquées.
- [ ] L’aide collective est distinguée de l’aide élémentaire.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — définitions

| Type               | Définition                                              |
| ------------------ | ------------------------------------------------------- |
| Élémentaire        | Une méthode de sélection et un dialogue de recherche.   |
| Collective         | Regroupe plusieurs aides élémentaires.                  |
| Méthode            | Table ou vue fournissant les valeurs.                   |
| Import             | Valeur reçue du contexte pour restreindre la recherche. |
| Export             | Valeur retournée au champ appelant.                     |
| Position liste     | Ordre de la colonne dans la liste de résultats.         |
| Position sélection | Ordre du champ dans l’écran de restriction.             |

### Solution — paramètre principal

```text
ORDER_ID
IMP = X
EXP = X
LPos = 1
SPos = 1
```

### Solution — test ABAP

```abap
REPORT zaelion_<tri>_se11.

PARAMETERS:
  p_stat  TYPE zde_<tri>_stat,
  p_order TYPE zde_<tri>_oid.

START-OF-SELECTION.

  WRITE: / 'Statut   :', p_stat,
         / 'Commande :', p_order.
```

Le champ `p_order` doit recevoir l’identifiant exporté par l’aide.

</details>
