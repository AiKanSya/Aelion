# 🌸 EXERCICES — ORDRE DE TRANSPORT (OT) ET CREATION – SE10

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- distinguer une requête de transport, une tâche utilisateur et un objet transporté ;
- créer une requête de type `Workbench` ;
- retrouver l’identifiant de la requête et celui de sa tâche ;
- expliquer pourquoi un développement ABAP doit être placé dans une requête `Workbench` ;
- identifier une requête qui ne doit pas encore être libérée.

## 🌺 DURÉE INDICATIVE

20 à 30 minutes.

## 🌺 PRÉREQUIS

- Accès à SAP GUI.
- Autorisation d’utiliser `SE10`.
- Trigramme attribué.

## 🌺 CONTEXTE

Les objets créés pendant la révision doivent être regroupés dans un même ordre de transport afin de conserver une traçabilité cohérente.

## 🌺 EXERCICE 1 — RESTITUTION

Sans consulter le cours, compléter le tableau suivant :

| Élément              | Définition | Contenu attendu |
| -------------------- | ---------- | --------------- |
| Requête de transport |            |                 |
| Tâche utilisateur    |            |                 |
| Objet transporté     |            |                 |

Répondre ensuite aux questions suivantes :

1. Quel type de requête doit contenir un programme ABAP ?
2. Quelle différence existe entre l’identifiant de la requête et sa description ?
3. Pourquoi la requête ne doit-elle pas être libérée pendant les exercices ?

## 🌺 EXERCICE 2 — CRÉATION DE LA REQUÊTE

Créer une requête de transport avec les caractéristiques suivantes :

| Propriété    | Valeur attendue                |
| ------------ | ------------------------------ |
| Transaction  | `SE10`                         |
| Type         | `Workbench Request`            |
| Description  | `ZAELION_<TRI>_REVISION_BASIC` |
| Statut final | Modifiable                     |

### Étapes demandées

1. Ouvrir la transaction `SE10`.
2. Créer une requête de type `Workbench`.
3. Saisir la description demandée.
4. Enregistrer la requête.
5. Développer son arborescence.
6. Relever :
   - l’identifiant de la requête ;
   - l’identifiant de la tâche utilisateur ;
   - le propriétaire de la tâche ;
   - le statut de la requête.
7. Vérifier que la tâche est rattachée à la bonne requête.
8. Ne libérer ni la tâche ni la requête.

> [!NOTE]
> SAP génère l’identifiant technique de la requête. Le stagiaire renseigne sa description.

## 🌺 EXERCICE 3 — DIAGNOSTIC

Pour chaque situation, indiquer si elle est correcte. Justifier la réponse et indiquer l’action à effectuer.

| Situation                                                                   | Correct / Incorrect | Justification | Action |
| --------------------------------------------------------------------------- | ------------------- | ------------- | ------ |
| Un programme ABAP est enregistré dans une requête `Workbench`.              |                     |               |        |
| Un programme ABAP est enregistré dans une requête `Customizing`.            |                     |               |        |
| La tâche est libérée alors que les exercices suivants ne sont pas terminés. |                     |               |        |
| Deux projets sans lien sont regroupés dans la même requête.                 |                     |               |        |
| La description permet d’identifier le stagiaire et le périmètre `BASIC`.    |                     |               |        |

## 🌺 LIVRABLES

- Identifiant de la requête.
- Identifiant de la tâche.
- Capture ou relevé textuel de l’arborescence.
- Tableau de diagnostic complété.

## 🌺 CRITÈRES DE VALIDATION

- [ ] La requête est de type `Workbench`.
- [ ] La description respecte la convention demandée.
- [ ] La tâche appartient au bon utilisateur.
- [ ] La requête et la tâche sont encore modifiables.
- [ ] La différence entre requête, tâche et objet est expliquée correctement.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — exercice 1

| Élément              | Définition                                                             | Contenu attendu                                        |
| -------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------ |
| Requête de transport | Conteneur principal du transport.                                      | Une ou plusieurs tâches utilisateur.                   |
| Tâche utilisateur    | Sous-élément attribué à un utilisateur.                                | Les objets créés ou modifiés par cet utilisateur.      |
| Objet transporté     | Élément de développement ou de configuration enregistré dans la tâche. | Programme, include, package, table ou autre objet SAP. |

1. Un programme ABAP doit être enregistré dans une requête `Workbench`.
2. L’identifiant technique est généré par SAP. La description est saisie par l’utilisateur pour identifier le contenu fonctionnel ou technique.
3. Une tâche libérée n’est plus modifiable. La libération doit donc intervenir uniquement après la fin des développements et des contrôles.

### Solution — exercice 2

Résultat attendu dans `SE10` :

```text
Requête Workbench : <ID_REQUÊTE> — ZAELION_<TRI>_REVISION_BASIC
└── Tâche utilisateur : <ID_TÂCHE> — <UTILISATEUR>
```

Les identifiants dépendent du système SAP. Ils ne peuvent pas être prédéterminés dans la correction.

### Solution — exercice 3

| Situation                                   | Réponse   | Justification                                                                      | Action                                       |
| ------------------------------------------- | --------- | ---------------------------------------------------------------------------------- | -------------------------------------------- |
| Programme dans une requête `Workbench`      | Correct   | Les objets de développement ABAP relèvent du Workbench.                            | Conserver l’affectation.                     |
| Programme dans une requête `Customizing`    | Incorrect | Une requête `Customizing` concerne le paramétrage, pas les objets Repository ABAP. | Utiliser une requête `Workbench`.            |
| Tâche libérée avant la fin                  | Incorrect | Elle ne peut plus recevoir de nouvelles modifications.                             | Ne libérer qu’après validation.              |
| Deux projets sans lien dans la même requête | Incorrect | Le contenu devient difficile à suivre et à transporter séparément.                 | Utiliser une requête par périmètre cohérent. |
| Description explicite                       | Correct   | Elle facilite l’identification et la maintenance.                                  | Conserver la convention.                     |

</details>
