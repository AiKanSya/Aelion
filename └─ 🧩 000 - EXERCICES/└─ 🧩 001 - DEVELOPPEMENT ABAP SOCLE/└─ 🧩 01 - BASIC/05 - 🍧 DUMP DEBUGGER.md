# 🌸 EXERCICES — GESTION DES DUMPS ET DU DEBUGUEUR – `ST22`

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [GESTION DES DUMPS ET DU DEBUGUEUR – `ST22`](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 01 - BASIC/05 - 🍧 DUMP DEBUGGER.md>)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- provoquer un dump dans un environnement de formation ;
- retrouver le dump dans `ST22` ;
- relever les informations nécessaires à son diagnostic ;
- utiliser un point d’arrêt ;
- inspecter et modifier temporairement une variable dans le débogueur ;
- corriger définitivement le code et exécuter des tests de non-régression.

## 🌺 DURÉE INDICATIVE

45 à 60 minutes.

## 🌺 PRÉREQUIS

- Exercices précédents terminés.
- Accès à `ST22`.
- Utilisation limitée au système de formation.

> [!CAUTION]
> Le dump doit être provoqué uniquement avec le programme de formation et sur le système autorisé.

## 🌺 EXERCICE 1 — RESTITUTION

Compléter le tableau :

| Élément                | Utilité |
| ---------------------- | ------- |
| `ST22`                 |         |
| Point d’arrêt          |         |
| `/H`                   |         |
| `F5` dans le débogueur |         |
| `F6` dans le débogueur |         |
| `F8` dans le débogueur |         |

Expliquer la différence entre :

- analyser un dump dans `ST22` ;
- suivre une exécution dans le débogueur.

## 🌺 EXERCICE 2 — GÉNÉRATION ET ANALYSE DU DUMP

Créer un nouveau programme exécutable :

| Propriété | Valeur attendue                  |
| --------- | -------------------------------- |
| Nom       | `ZAELION_<TRI>_DEBUG`            |
| Package   | `ZAELION_<TRI>_PACKAGE`          |
| Requête   | Requête créée dans l’exercice 01 |

Saisir le code suivant :

```abap
REPORT zaelion_<tri>_debug.

PARAMETERS p_den TYPE i DEFAULT 0.

DATA: lv_num TYPE i VALUE 10,
      lv_res TYPE p LENGTH 8 DECIMALS 2.

START-OF-SELECTION.
  lv_res = lv_num / p_den.
  WRITE: / 'Résultat :', lv_res.
```

### Étapes demandées

1. Enregistrer, contrôler et activer le programme.
2. Exécuter avec `p_den = 0`.
3. Constater l’interruption du programme.
4. Ouvrir `ST22`.
5. Rechercher le dump du jour correspondant à votre utilisateur et au programme.
6. Relever les informations suivantes :
   - date et heure ;
   - utilisateur ;
   - programme ;
   - erreur d’exécution affichée par le système ;
   - texte court ;
   - ligne de code concernée ;
   - valeur de `p_den` ;
   - valeur de `lv_num` ;
   - premier élément utile de la pile d’appels.
7. Expliquer en une phrase la cause du dump.

> [!NOTE]
> Le nom exact de l’erreur d’exécution peut dépendre du type numérique et de la version du système. Il doit être relevé directement dans `ST22`.

## 🌺 EXERCICE 3 — ANALYSE AVEC LE DÉBOGUEUR

1. Placer un point d’arrêt sur l’instruction :

   ```abap
   lv_res = lv_num / p_den.
   ```

2. Exécuter avec `p_den = 0`.
3. Vérifier les valeurs de `lv_num` et `p_den`.
4. Modifier temporairement `p_den` en `2` dans le débogueur.
5. Continuer avec `F8`.
6. Vérifier que le résultat affiché est `5` ou `5,00` selon les paramètres utilisateur.
7. Relancer normalement le programme avec `p_den = 0`.
8. Constater que la modification faite dans le débogueur n’a pas modifié le code source ni la valeur saisie lors d’une nouvelle exécution.

## 🌺 EXERCICE 4 — CORRECTION DÉFINITIVE

Remplacer le bloc `START-OF-SELECTION` par :

```abap
START-OF-SELECTION.
  IF p_den = 0.
    WRITE: / 'Erreur : le dénominateur ne peut pas être nul.'.
  ELSE.
    lv_res = lv_num / p_den.
    WRITE: / 'Résultat :', lv_res.
  ENDIF.
```

Effectuer les tests suivants :

| Cas              | Valeur de `p_den` | Résultat attendu             |
| ---------------- | ----------------: | ---------------------------- |
| Erreur contrôlée |               `0` | Message d’erreur, aucun dump |
| Cas nominal      |               `2` | Résultat `5`                 |
| Cas négatif      |              `-2` | Résultat `-5`                |

Après chaque test, vérifier qu’aucun nouveau dump du programme corrigé n’a été généré.

## 🌺 LIVRABLES

- Code initial ayant provoqué le dump.
- Relevé des informations `ST22`.
- Cause du dump formulée en une phrase.
- Valeurs observées dans le débogueur.
- Code corrigé.
- Résultat des trois tests.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le dump est retrouvé dans `ST22`.
- [ ] La ligne fautive et les valeurs utiles sont identifiées.
- [ ] Le point d’arrêt est atteint.
- [ ] La modification temporaire dans le débogueur est comprise.
- [ ] Le code contrôle le dénominateur avant la division.
- [ ] Les trois cas de test sont conformes.
- [ ] Aucun dump n’est produit par la version corrigée.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — exercice 1

| Élément       | Utilité                                                                        |
| ------------- | ------------------------------------------------------------------------------ |
| `ST22`        | Consulter et analyser les erreurs d’exécution ABAP enregistrées par SAP.       |
| Point d’arrêt | Suspendre l’exécution sur une ligne déterminée du code.                        |
| `/H`          | Activer le débogage pour la prochaine action exécutée dans la session SAP GUI. |
| `F5`          | Exécuter l’étape suivante en entrant dans les appels.                          |
| `F6`          | Exécuter l’étape suivante sans entrer dans l’appel.                            |
| `F8`          | Continuer jusqu’au prochain arrêt ou jusqu’à la fin du traitement.             |

`ST22` analyse un incident déjà survenu. Le débogueur permet d’observer une exécution en cours avant ou pendant l’apparition du problème.

### Solution — exercice 2

Cause attendue : le programme tente de diviser `lv_num`, qui vaut `10`, par `p_den`, qui vaut `0`. La division par zéro provoque une erreur d’exécution.

Le nom exact du dump doit être recopié depuis le système. Il n’est pas fixé dans cette correction.

### Solution — exercice 3

Valeurs avant la division :

```text
lv_num = 10
p_den  = 0
```

Après modification temporaire :

```text
p_den  = 2
lv_res = 5,00
```

La modification du débogueur agit uniquement sur l’exécution courante. Elle ne modifie pas le code source et n’est pas conservée pour une nouvelle exécution.

### Solution — exercice 4

```abap
REPORT zaelion_<tri>_debug.

PARAMETERS p_den TYPE i DEFAULT 0.

DATA: lv_num TYPE i VALUE 10,
      lv_res TYPE p LENGTH 8 DECIMALS 2.

START-OF-SELECTION.
  IF p_den = 0.
    WRITE: / 'Erreur : le dénominateur ne peut pas être nul.'.
  ELSE.
    lv_res = lv_num / p_den.
    WRITE: / 'Résultat :', lv_res.
  ENDIF.
```

Résultats :

| `p_den` | Résultat                    |
| ------: | --------------------------- |
|     `0` | Message d’erreur, sans dump |
|     `2` | `5,00`                      |
|    `-2` | `-5,00`                     |

</details>
