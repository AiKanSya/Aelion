# 🌸 EXERCICES — STRUCTURES DE TABLE

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [STRUCTURES DE TABLE](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 08 - SE11/05 - 🍧 STRUCTURES.md>)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- créer une structure globale ;
- utiliser ses composants dans un programme ;
- inclure une structure ;
- créer une structure append ;
- distinguer include et append ;
- définir une catégorie d’extension ;
- comprendre l’impact d’une évolution.

## 🌺 DURÉE INDICATIVE

65 à 80 minutes.

## 🌺 EXERCICE 1 — STRUCTURE D’AUDIT

Créer :

```text
ZS_<TRI>_AUDIT
```

Composants :

| Composant    | Élément de données |
| ------------ | ------------------ |
| `CREATED_BY` | `ERNAM`            |
| `CREATED_ON` | `ERDAT`            |

Description :

```text
Données d’audit de création
```

Catégorie d’extension :

```text
Extensible avec composants de type caractère ou numérique
```

## 🌺 EXERCICE 2 — STRUCTURE DE COMMANDE

Créer :

```text
ZS_<TRI>_ORDER
```

Composants directs :

| Composant       | Élément de données |
| --------------- | ------------------ |
| `ORDER_ID`      | `ZDE_<TRI>_OID`    |
| `CUSTOMER_NAME` | `ZDE_<TRI>_NAME`   |
| `PRIORITY`      | `ZDE_<TRI>_PRIO`   |
| `STATUS`        | `ZDE_<TRI>_STAT`   |

Ajouter ensuite un include :

```text
ZS_<TRI>_AUDIT
```

Contrôler que les composants inclus apparaissent dans la structure finale.

## 🌺 EXERCICE 3 — UTILISATION ABAP

Dans le programme de test :

```abap
DATA ls_order TYPE zs_<tri>_order.

ls_order-order_id     = '0000000001'.
ls_order-customer_name = 'Alice Martin'.
ls_order-priority     = '2'.
ls_order-status       = 'N'.
ls_order-created_by   = sy-uname.
ls_order-created_on   = sy-datum.

WRITE: / ls_order-order_id,
       / ls_order-customer_name,
       / ls_order-priority,
       / ls_order-status,
       / ls_order-created_by,
       / ls_order-created_on.
```

## 🌺 EXERCICE 4 — INCLUDE

Répondre :

1. les composants inclus forment-ils une sous-structure imbriquée ?
2. comment accède-t-on à `CREATED_BY` ?
3. une modification de `ZS_<TRI>_AUDIT` peut-elle affecter les structures qui l’incluent ?
4. le même include peut-il être réutilisé dans plusieurs structures ou tables ?
5. pourquoi faut-il analyser les cas d’emploi avant de modifier l’include ?

## 🌺 EXERCICE 5 — APPEND

Créer la structure append :

```text
ZA_<TRI>_ORD
```

L’associer à :

```text
ZS_<TRI>_ORDER
```

Ajouter :

| Composant       | Type     |
| --------------- | -------- |
| `TRAINING_NOTE` | `CHAR40` |

Activer l’append puis la structure si nécessaire.

Adapter le programme :

```abap
ls_order-training_note = 'Objet créé pendant la révision'.
```

## 🌺 EXERCICE 6 — INCLUDE OU APPEND

Compléter :

| Critère                                     | Include | Append |
| ------------------------------------------- | ------- | ------ |
| Réutilisable dans plusieurs objets          |         |        |
| Étend un objet précis                       |         |        |
| Modification visible dans l’objet englobant |         |        |
| Usage principal                             |         |        |
| Appartient à un seul objet cible            |         |        |

## 🌺 EXERCICE 7 — DIAGNOSTIC D’INCLUDE

Ajouter temporairement dans `ZS_<TRI>_AUDIT` :

```text
CREATED_BY
```

une deuxième fois sous le même nom.

Lancer le contrôle.

Répondre :

1. pourquoi le nom est-il en conflit ?
2. l’objet englobant peut-il posséder deux composants de même nom ?
3. quelle correction appliquer ?
4. pourquoi l’erreur peut-elle se propager aux objets dépendants ?

## 🌺 EXERCICE 8 — DIAGNOSTIC D’APPEND

Analyser :

```text
L’append ZA_<TRI>_ORD doit être réutilisé dans une deuxième structure.
```

Répondre :

1. est-ce le rôle d’un append ?
2. quel objet faut-il créer pour une réutilisation multiple ?
3. faut-il déplacer `TRAINING_NOTE` dans un include si le besoin devient commun ?
4. quel impact de migration faut-il analyser ?

## 🌺 LIVRABLES

- structure d’audit active ;
- structure de commande active ;
- preuve de l’include ;
- programme ABAP ;
- append actif ;
- tableau include/append ;
- diagnostics.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Les deux structures sont actives.
- [ ] L’include est correctement intégré.
- [ ] Les composants inclus sont accessibles directement.
- [ ] Le programme utilise le type global.
- [ ] L’append étend uniquement la structure cible.
- [ ] Include et append sont distingués.
- [ ] La catégorie d’extension est définie.
- [ ] Les conflits de noms sont diagnostiqués.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — include

Les composants inclus sont intégrés à plat :

```abap
ls_order-created_by
ls_order-created_on
```

Il n’existe pas de composant intermédiaire `audit` dans cette définition.

### Solution — comparaison

| Critère          | Include       | Append           |
| ---------------- | ------------- | ---------------- |
| Plusieurs objets | Oui           | Non              |
| Objet précis     | Non           | Oui              |
| Propagation      | Oui           | Oui sur la cible |
| Usage            | Réutilisation | Extension        |
| Une seule cible  | Non           | Oui              |

</details>
