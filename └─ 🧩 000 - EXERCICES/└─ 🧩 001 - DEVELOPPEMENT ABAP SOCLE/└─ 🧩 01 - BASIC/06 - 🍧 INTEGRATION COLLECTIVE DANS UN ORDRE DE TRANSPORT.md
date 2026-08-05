# 🌸 EXERCICES — INTÉGRATION COLLECTIVE DANS UN ORDRE DE TRANSPORT

## 🌺 OBJECTIFS

À la fin de l’exercice, le groupe doit être capable de :

- utiliser une requête commune avec une tâche par contributeur ;
- attribuer un propriétaire à chaque objet ;
- éviter la modification simultanée d’un même objet ;
- assembler un programme composé de plusieurs includes ;
- contrôler le package, l’activation et le contenu de la requête ;
- réaliser un test croisé avant la remise.

## 🌺 DURÉE INDICATIVE

60 à 90 minutes.

## 🌺 ORGANISATION

Exercice prévu pour un groupe de trois à quatre personnes.

| Rôle                   | Responsabilité principale                             |
| ---------------------- | ----------------------------------------------------- |
| Membre A — intégrateur | Requête, package, programme principal, contrôle final |
| Membre B               | Include `_TOP`                                        |
| Membre C               | Include `_SCR`                                        |
| Membre D               | Include `_F01` et jeu de tests                        |

Si le groupe comporte moins de quatre membres, répartir plusieurs rôles à une même personne sans autoriser deux personnes à modifier simultanément le même objet.

## 🌺 CONVENTIONS

Remplacer `<GROUPE>` par le code attribué au groupe, par exemple `G01`.

| Objet                     | Nom                                  |
| ------------------------- | ------------------------------------ |
| Description de la requête | `ZAELION_<GROUPE>_INTEGRATION_BASIC` |
| Package                   | `ZAELION_<GROUPE>_PACKAGE`           |
| Programme                 | `ZAELION_<GROUPE>_COLLECTIF`         |
| Include TOP               | `ZAELION_<GROUPE>_COLLECTIF_TOP`     |
| Include SCR               | `ZAELION_<GROUPE>_COLLECTIF_SCR`     |
| Include F01               | `ZAELION_<GROUPE>_COLLECTIF_F01`     |

## 🌺 EXERCICE 1 — PRÉPARATION DE L’INTÉGRATION

Avant toute création :

1. Désigner l’intégrateur.
2. Compléter la matrice suivante :

| Objet               | Propriétaire | Dépendances         | Validateur |
| ------------------- | ------------ | ------------------- | ---------- |
| Requête             |              | Aucune              |            |
| Package             |              | Requête             |            |
| Programme principal |              | Package et includes |            |
| Include `_TOP`      |              | Package             |            |
| Include `_SCR`      |              | Package             |            |
| Include `_F01`      |              | `_TOP` et `_SCR`    |            |

3. Définir la règle suivante par écrit :

```text
Un seul propriétaire modifie un objet à un instant donné.
Toute modification d’un objet appartenant à un autre membre doit être validée par son propriétaire et annoncée à l’intégrateur.
```

4. Définir l’ordre d’activation prévu.
5. Définir les trois cas de test avant le développement.

## 🌺 EXERCICE 2 — CRÉATION DES OBJETS COMMUNS

### Travail du membre A — intégrateur

1. Créer la requête `Workbench` commune.
2. Vérifier qu’une tâche existe pour chaque contributeur selon les règles et autorisations du système.
3. Créer le package commun.
4. Créer le programme principal avec le code suivant :

```abap
REPORT zaelion_<groupe>_collectif.

INCLUDE zaelion_<groupe>_collectif_top.
INCLUDE zaelion_<groupe>_collectif_scr.

START-OF-SELECTION.
  PERFORM display_result.

INCLUDE zaelion_<groupe>_collectif_f01.
```

### Travail du membre B — include `_TOP`

```abap
CONSTANTS gc_title TYPE c LENGTH 30
  VALUE 'Intégration collective'.
```

### Travail du membre C — include `_SCR`

```abap
PARAMETERS p_value TYPE i DEFAULT 10.
```

### Travail du membre D — include `_F01`

```abap
FORM display_result.
  DATA lv_result TYPE i.

  lv_result = p_value * 2.

  WRITE: / gc_title,
         / 'Valeur saisie :', p_value,
         / 'Valeur doublée :', lv_result.
ENDFORM.
```

### Règles d’intégration

1. Chaque membre crée uniquement l’objet dont il est propriétaire.
2. Tous les objets sont enregistrés dans le package commun.
3. Tous les objets sont affectés à la requête commune, dans la tâche du contributeur concerné.
4. Les noms et signatures ne sont plus modifiés après validation du squelette.
5. L’intégrateur vérifie les dépendances avant l’activation finale.
6. Aucun membre ne libère sa tâche pendant l’exercice.

## 🌺 EXERCICE 3 — ACTIVATION ET TEST CROISÉ

1. Vérifier que les trois includes existent.
2. Contrôler la syntaxe du programme principal.
3. Activer l’ensemble des objets.
4. Exécuter les cas suivants :

| Cas     | `p_value` | Résultat attendu |
| ------- | --------: | ---------------: |
| Nominal |      `10` |             `20` |
| Zéro    |       `0` |              `0` |
| Négatif |      `-3` |             `-6` |

5. Faire exécuter le programme par un membre qui n’a pas créé le programme principal.
6. Relever les résultats.
7. Corriger toute anomalie sans modifier directement un objet appartenant à un autre membre.

## 🌺 EXERCICE 4 — CONTRÔLE DE LA REQUÊTE

Dans `SE09` ou `SE10` :

1. Afficher la requête commune.
2. Développer toutes les tâches.
3. Vérifier la présence des objets suivants :
   - package ;
   - programme principal ;
   - include `_TOP` ;
   - include `_SCR` ;
   - include `_F01`.
4. Vérifier le propriétaire de chaque tâche.
5. Vérifier que toutes les tâches sont encore modifiables.
6. Vérifier qu’aucun objet du périmètre n’a été créé dans `$TMP`.
7. Vérifier que tous les objets sont actifs.
8. Ne libérer ni les tâches ni la requête.

## 🌺 EXERCICE 5 — DIAGNOSTIC COLLECTIF

Analyser les incidents suivants :

| Incident                                                         | Cause probable | Risque | Correction |
| ---------------------------------------------------------------- | -------------- | ------ | ---------- |
| Deux membres tentent de modifier le programme principal.         |                |        |            |
| L’include `_SCR` n’apparaît pas dans la requête commune.         |                |        |            |
| Le programme principal référence `_F10` au lieu de `_F01`.       |                |        |            |
| Un membre libère sa tâche avant le test final.                   |                |        |            |
| Le programme fonctionne uniquement avec le compte de son auteur. |                |        |            |

## 🌺 LIVRABLES

- Matrice de responsabilité complétée.
- Identifiant de la requête commune.
- Liste des tâches et de leurs propriétaires.
- Code des quatre objets ABAP.
- Résultats des trois tests.
- Contrôle de la liste d’objets de la requête.
- Tableau de diagnostic complété.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Chaque objet possède un propriétaire identifié.
- [ ] Aucun objet n’est modifié simultanément par deux membres.
- [ ] Tous les objets appartiennent au package commun.
- [ ] Tous les objets sont présents dans la requête commune.
- [ ] Le programme et les includes sont actifs.
- [ ] Les trois tests produisent le résultat attendu.
- [ ] Un test croisé a été réalisé.
- [ ] Les tâches et la requête ne sont pas libérées.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — exercice 1

Exemple de répartition :

| Objet               | Propriétaire | Dépendances         | Validateur |
| ------------------- | ------------ | ------------------- | ---------- |
| Requête             | Membre A     | Aucune              | Membre B   |
| Package             | Membre A     | Requête             | Membre C   |
| Programme principal | Membre A     | Package et includes | Membre D   |
| Include `_TOP`      | Membre B     | Package             | Membre A   |
| Include `_SCR`      | Membre C     | Package             | Membre B   |
| Include `_F01`      | Membre D     | `_TOP` et `_SCR`    | Membre C   |

Ordre conseillé : création de la requête, création du package, création des includes, intégration dans le programme principal, contrôle de syntaxe, activation, tests.

### Solution — exercice 2

#### Programme principal

```abap
REPORT zaelion_<groupe>_collectif.

INCLUDE zaelion_<groupe>_collectif_top.
INCLUDE zaelion_<groupe>_collectif_scr.

START-OF-SELECTION.
  PERFORM display_result.

INCLUDE zaelion_<groupe>_collectif_f01.
```

#### Include `_TOP`

```abap
CONSTANTS gc_title TYPE c LENGTH 30
  VALUE 'Intégration collective'.
```

#### Include `_SCR`

```abap
PARAMETERS p_value TYPE i DEFAULT 10.
```

#### Include `_F01`

```abap
FORM display_result.
  DATA lv_result TYPE i.

  lv_result = p_value * 2.

  WRITE: / gc_title,
         / 'Valeur saisie :', p_value,
         / 'Valeur doublée :', lv_result.
ENDFORM.
```

### Solution — exercice 3

| `p_value` | Résultat attendu |
| --------: | ---------------: |
|      `10` |             `20` |
|       `0` |              `0` |
|      `-3` |             `-6` |

### Solution — exercice 4

Structure attendue :

```text
Requête Workbench commune
├── Tâche membre A
│   ├── Package
│   └── Programme principal
├── Tâche membre B
│   └── Include TOP
├── Tâche membre C
│   └── Include SCR
└── Tâche membre D
    └── Include F01
```

La répartition exacte des entrées techniques peut varier selon la manière dont SAP enregistre les sous-objets. Le contrôle porte sur la présence de l’ensemble du périmètre et sur sa cohérence.

### Solution — exercice 5

| Incident                                      | Cause probable                               | Risque                                      | Correction                                                                            |
| --------------------------------------------- | -------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------- |
| Deux membres modifient le programme principal | Propriétaire non respecté                    | Verrou, écrasement ou conflit d’intégration | Arrêter la modification concurrente et rendre la main au propriétaire.                |
| `_SCR` absent de la requête commune           | Mauvaise requête ou objet local              | Objet absent lors du transport              | Vérifier package et affectation de transport avant toute libération.                  |
| Référence `_F10` au lieu de `_F01`            | Erreur de nommage                            | Erreur de syntaxe ou include introuvable    | Corriger le nom puis réactiver.                                                       |
| Tâche libérée trop tôt                        | Processus de livraison non respecté          | Contribution figée avant la fin             | Centraliser la décision de libération auprès de l’intégrateur.                        |
| Fonctionne uniquement chez l’auteur           | Test croisé absent ou dépendance personnelle | Livrable non reproductible                  | Reproduire avec un autre utilisateur et supprimer les dépendances propres à l’auteur. |

</details>
