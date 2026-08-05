# 🌸 EXERCICES — CARTOUCHE (ENTETE DE PROGRAMME ABAP)

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [CARTOUCHE (ENTETE DE PROGRAMME ABAP)](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 02 - BASIC ABAP/03 - 🍧 CARTOUCHE.md>)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- expliquer le rôle d’une cartouche ;
- distinguer information technique, information fonctionnelle et historique ;
- rédiger une cartouche à partir d’un contexte fourni ;
- placer la cartouche au bon emplacement ;
- mettre à jour l’historique sans supprimer les entrées précédentes ;
- détecter une cartouche incomplète ou incohérente.

## 🌺 DURÉE INDICATIVE

30 à 45 minutes.

## 🌺 PRÉREQUIS

- Exercices 01 et 02 terminés.
- Programme final actif.
- Nom, trigramme et date de réalisation disponibles.

## 🌺 CONTEXTE

Le programme possède les caractéristiques suivantes :

| Information         | Valeur                                                 |
| ------------------- | ------------------------------------------------------ |
| Programme           | `ZAELION_<TRI>_HELLOWORLD`                             |
| Objet               | Révision BASIC ABAP                                    |
| Ticket de formation | `FORM-REV-02`                                          |
| Description         | Initialiser un nom et afficher un message personnalisé |
| Auteur              | `<NOM> (<TRI>)`                                        |
| Date de création    | `<JJ.MM.AAAA>`                                         |

## 🌺 EXERCICE 1 — RESTITUTION

Associer chaque information à sa finalité :

| Information   | Finalité |
| ------------- | -------- |
| Nom technique |          |
| Description   |          |
| Auteur        |          |
| Ticket        |          |
| Date          |          |
| Historique    |          |

Répondre ensuite aux questions :

1. La cartouche est-elle exécutée par le programme ?
2. SAP contrôle-t-il automatiquement l’exactitude fonctionnelle de son contenu ?
3. Pourquoi le ticket doit-il correspondre au développement réellement livré ?
4. Pourquoi une ancienne ligne d’historique ne doit-elle pas être remplacée ?

## 🌺 EXERCICE 2 — RÉDACTION DE LA CARTOUCHE

Ajouter la cartouche suivante au début du programme principal, avant l’instruction `REPORT`.

Remplacer les valeurs entre chevrons.

```abap
*&---------------------------------------------------------------------*
*& Report  ZAELION_<TRI>_HELLOWORLD
*&---------------------------------------------------------------------*
*& Objet   : Révision BASIC ABAP
*& Ticket  : FORM-REV-02
*& Objet   : Initialiser et afficher un message personnalisé
*& Auteur  : <NOM> (<TRI>)
*& Date    : <JJ.MM.AAAA>
*&---------------------------------------------------------------------*
*& Historique des modifications
*& Date       | Auteur       | Ticket      | Modification
*& <DATE>     | <NOM> (<TRI>)| FORM-REV-02 | Création
*&---------------------------------------------------------------------*
```

> [!CAUTION]
> La cartouche proposée contient volontairement un défaut de libellé.  
> Identifier et corriger ce défaut avant de l’intégrer.

## 🌺 EXERCICE 3 — CONTRÔLE DE COHÉRENCE

Pour chaque situation, indiquer si la cartouche est conforme et préciser la correction nécessaire.

| Situation                                                             | Conforme | Correction |
| --------------------------------------------------------------------- | -------- | ---------- |
| Le nom de programme correspond à l’instruction `REPORT`.              |          |            |
| Le champ `Ticket` contient un numéro sans lien avec le développement. |          |            |
| La description annonce une lecture de la table `MARA`.                |          |            |
| L’auteur et la date de création sont renseignés.                      |          |            |
| Une évolution remplace la ligne `Création` dans l’historique.         |          |            |
| Une évolution ajoute une nouvelle ligne sous la ligne `Création`.     |          |            |

## 🌺 EXERCICE 4 — MISE À JOUR DE L’HISTORIQUE

Une évolution est réalisée avec les informations suivantes :

| Information  | Valeur              |
| ------------ | ------------------- |
| Date         | `<JJ.MM.AAAA>`      |
| Auteur       | `<NOM> (<TRI>)`     |
| Ticket       | `FORM-REV-02B`      |
| Modification | Gestion du nom vide |

Mettre à jour uniquement la section historique.

La ligne de création doit rester présente.

## 🌺 EXERCICE 5 — INTÉGRATION FINALE

Vérifier la structure finale du programme :

1. cartouche ;
2. instruction `REPORT` ;
3. includes de déclarations et d’écran ;
4. blocs d’événements ;
5. include des sous-routines.

Contrôler ensuite :

- la syntaxe ;
- l’activation ;
- l’exécution avec un nom ;
- l’exécution sans nom ;
- la cohérence entre cartouche et comportement réel.

## 🌺 LIVRABLES

- cartouche corrigée ;
- tableau de cohérence complété ;
- historique contenant deux lignes ;
- code final du programme principal ;
- preuve des deux exécutions.

## 🌺 CRITÈRES DE VALIDATION

- [ ] La cartouche est placée avant `REPORT`.
- [ ] Le nom technique est exact.
- [ ] Le libellé en double est corrigé.
- [ ] Le ticket correspond au contexte fourni.
- [ ] La description correspond au comportement réel.
- [ ] L’auteur et la date sont renseignés.
- [ ] La ligne de création est conservée.
- [ ] La nouvelle évolution possède sa propre ligne.
- [ ] Le programme reste actif et exécutable.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — exercice 1

| Information   | Finalité                                                   |
| ------------- | ---------------------------------------------------------- |
| Nom technique | Identifier précisément l’objet ABAP                        |
| Description   | Résumer le rôle du programme                               |
| Auteur        | Identifier le responsable de la création ou de l’évolution |
| Ticket        | Relier le code à une demande suivie                        |
| Date          | Situer la création ou l’évolution                          |
| Historique    | Conserver la trace chronologique des modifications         |

1. Non. Les lignes de la cartouche sont des commentaires.
2. Non. La cohérence de son contenu dépend du développeur et des contrôles de l’équipe.
3. Le lien permet de retrouver le besoin, les décisions et la livraison concernés.
4. Son remplacement détruirait une partie de la traçabilité.

### Solution — exercice 2

Le second champ `Objet` doit être remplacé par `Description`.

```abap
*&---------------------------------------------------------------------*
*& Report  ZAELION_<TRI>_HELLOWORLD
*&---------------------------------------------------------------------*
*& Objet       : Révision BASIC ABAP
*& Ticket      : FORM-REV-02
*& Description : Initialiser et afficher un message personnalisé
*& Auteur      : <NOM> (<TRI>)
*& Date        : <JJ.MM.AAAA>
*&---------------------------------------------------------------------*
*& Historique des modifications
*& Date       | Auteur        | Ticket      | Modification
*& <DATE>     | <NOM> (<TRI>) | FORM-REV-02 | Création
*&---------------------------------------------------------------------*
```

### Solution — exercice 3

| Situation                          | Conforme | Correction                                          |
| ---------------------------------- | -------- | --------------------------------------------------- |
| Le nom correspond à `REPORT`       | Oui      | Aucune                                              |
| Ticket sans lien                   | Non      | Renseigner le ticket du développement               |
| Description annonçant `MARA`       | Non      | Décrire l’initialisation et l’affichage du message  |
| Auteur et date renseignés          | Oui      | Aucune                                              |
| La ligne de création est remplacée | Non      | Restaurer la ligne et ajouter une nouvelle entrée   |
| Une nouvelle ligne est ajoutée     | Oui      | Conserver l’ordre chronologique défini par l’équipe |

### Solution — exercice 4

```abap
*& Historique des modifications
*& Date       | Auteur        | Ticket       | Modification
*& <DATE_1>   | <NOM> (<TRI>) | FORM-REV-02  | Création
*& <DATE_2>   | <NOM> (<TRI>) | FORM-REV-02B | Gestion du nom vide
```

Les dates réelles doivent remplacer `<DATE_1>` et `<DATE_2>`.

### Solution — exercice 5

Programme principal final :

```abap
*&---------------------------------------------------------------------*
*& Report  ZAELION_<TRI>_HELLOWORLD
*&---------------------------------------------------------------------*
*& Objet       : Révision BASIC ABAP
*& Ticket      : FORM-REV-02
*& Description : Initialiser et afficher un message personnalisé
*& Auteur      : <NOM> (<TRI>)
*& Date        : <JJ.MM.AAAA>
*&---------------------------------------------------------------------*
*& Historique des modifications
*& Date       | Auteur        | Ticket       | Modification
*& <DATE_1>   | <NOM> (<TRI>) | FORM-REV-02  | Création
*& <DATE_2>   | <NOM> (<TRI>) | FORM-REV-02B | Gestion du nom vide
*&---------------------------------------------------------------------*

REPORT zaelion_<tri>_helloworld.

INCLUDE zaelion_<tri>_helloworld_top.
INCLUDE zaelion_<tri>_helloworld_scr.

INITIALIZATION.
  PERFORM initialize_screen.

START-OF-SELECTION.
  PERFORM build_message.

END-OF-SELECTION.
  PERFORM display_result.

INCLUDE zaelion_<tri>_helloworld_f01.
```

Include `_TOP` :

```abap
CONSTANTS gc_title TYPE c LENGTH 30
  VALUE 'Révision BASIC ABAP'.

DATA gv_message TYPE string.
```

Include `_SCR` :

```abap
PARAMETERS p_name TYPE c LENGTH 20
  LOWER CASE.
```

Include `_F01` :

```abap
FORM initialize_screen.
  p_name = 'AELION'.
ENDFORM.

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

FORM display_result.
  WRITE: / gc_title,
         / gv_message,
         / 'Programme :', sy-repid.
ENDFORM.
```

</details>
