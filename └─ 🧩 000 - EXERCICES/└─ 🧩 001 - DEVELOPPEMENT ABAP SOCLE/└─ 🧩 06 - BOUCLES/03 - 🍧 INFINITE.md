# 🌸 EXERCICES — BOUCLE INFINIE - SM50

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- définir une boucle infinie ;
- identifier les causes les plus fréquentes ;
- démontrer qu’une boucle se termine ;
- ajouter un garde-fou ;
- distinguer correction du code et interruption d’une exécution ;
- identifier un programme dans `SM50` ;
- connaître les limites d’autorisation et les risques d’une interruption ;
- analyser un arrêt dans `ST22`.

## 🌺 DURÉE INDICATIVE

40 à 55 minutes.

## 🌺 RÈGLE DE SÉCURITÉ

> [!CAUTION]
> Aucun exercice de ce chapitre ne demande d’exécuter une boucle réellement infinie.
>
> Une boucle infinie peut monopoliser un processus de travail, dégrader le système et finir par un arrêt d’exécution.  
> Les exemples dangereux doivent être analysés sans exécution.

## 🌺 EXERCICE 1 — RESTITUTION

Compléter :

| Notion                   | Définition |
| ------------------------ | ---------- |
| Boucle infinie           |            |
| Condition de terminaison |            |
| Variable de progression  |            |
| Garde-fou                |            |
| `TIME_OUT`               |            |
| `SM50`                   |            |
| `ST22`                   |            |

Répondre :

1. Une boucle infinie est-elle toujours écrite avec `DO.` ?
2. Une boucle `WHILE` peut-elle devenir infinie ?
3. Un `EXIT` présent dans le code garantit-il à lui seul la terminaison ?
4. Quelle propriété doit posséder le chemin menant à `EXIT` ?
5. L’interruption dans `SM50` corrige-t-elle le code ?

## 🌺 EXERCICE 2 — REVUE STATIQUE

Analyser les quatre extraits sans les exécuter.

### Cas A

```abap
DO.
  WRITE / sy-index.
ENDDO.
```

### Cas B

```abap
DATA lv_index TYPE i VALUE 1.

WHILE lv_index <= 10.
  WRITE / lv_index.
ENDWHILE.
```

### Cas C

```abap
DO.

  IF sy-index < 0.
    EXIT.
  ENDIF.

  WRITE / sy-index.

ENDDO.
```

### Cas D

```abap
DATA lv_index TYPE i VALUE 1.

WHILE lv_index <= 10.

  WRITE / lv_index.

  lv_index = lv_index + 1.

ENDWHILE.
```

Compléter :

| Cas | Risque de boucle infinie | Cause | Correction |
| --- | ------------------------ | ----- | ---------- |
| A   |                          |       |            |
| B   |                          |       |            |
| C   |                          |       |            |
| D   |                          |       |            |

## 🌺 EXERCICE 3 — PREUVE DE TERMINAISON

Pour chaque boucle correcte, documenter quatre éléments :

1. état initial ;
2. condition de poursuite ;
3. progression ;
4. état rendant la condition fausse.

Appliquer cette méthode au code :

```abap
DATA lv_index TYPE i VALUE 1.

WHILE lv_index <= 10.
  WRITE / lv_index.
  lv_index = lv_index + 1.
ENDWHILE.
```

Résultat attendu :

| Élément       | Analyse |
| ------------- | ------- |
| État initial  |         |
| Condition     |         |
| Progression   |         |
| État terminal |         |

## 🌺 EXERCICE 4 — SIMULATION SÉCURISÉE D’UN DÉFAUT

Le besoin métier impose de faire progresser `lv_business_index`.  
Le code volontairement défectueux oublie cette progression.

Utiliser un compteur de sécurité pour détecter le problème sans bloquer le système :

```abap
DATA lv_business_index TYPE i VALUE 1.
DATA lv_safety_counter TYPE i VALUE 0.
DATA lv_safety_limit   TYPE i VALUE 5.

WHILE lv_business_index <= 3.

  lv_safety_counter = lv_safety_counter + 1.

  IF lv_safety_counter > lv_safety_limit.
    WRITE / 'Arrêt de sécurité : aucune progression métier'.
    EXIT.
  ENDIF.

  WRITE: / 'Passage de sécurité', lv_safety_counter,
           '- Index métier', lv_business_index.

  " Progression métier volontairement absente

ENDWHILE.
```

Effectuer les actions suivantes :

1. tracer les passages ;
2. relever le message final ;
3. expliquer pourquoi le garde-fou fonctionne ;
4. corriger le défaut ;
5. conserver le garde-fou dans la version corrigée ;
6. vérifier que la sortie naturelle intervient avant le garde-fou.

## 🌺 EXERCICE 5 — RISQUE AVEC CONTINUE

Analyser sans exécution :

```abap
DATA lv_index TYPE i VALUE 1.

WHILE lv_index <= 10.

  IF lv_index MOD 2 = 1.
    CONTINUE.
  ENDIF.

  lv_index = lv_index + 1.

ENDWHILE.
```

Répondre :

1. Quelle valeur possède `lv_index` au premier passage ?
2. La condition du `IF` est-elle vraie ?
3. L’incrémentation est-elle exécutée ?
4. Quelle valeur possède `lv_index` au passage suivant ?
5. Corriger le code.

## 🌺 EXERCICE 6 — SM50 : CONNAISSANCE DE LA PROCÉDURE

Aucune interruption réelle n’est requise.

Remettre les étapes dans l’ordre :

```text
A. Vérifier l’utilisateur, le programme actif et le processus concerné.
B. Corriger ensuite le code source.
C. Ouvrir la vue des processus de travail SM50, avec les autorisations requises.
D. Sélectionner la fonction d’arrêt du programme ABAP en cours.
E. Confirmer que l’exécution concernée a disparu ou s’est arrêtée.
F. Demander l’accord du formateur ou de l’administrateur.
G. Analyser le dump éventuel dans ST22.
```

Règles :

- ne jamais sélectionner un processus sur le seul critère du nom du programme ;
- vérifier également l’utilisateur et le contexte ;
- ne jamais interrompre un traitement sans autorisation ;
- les libellés de menus peuvent varier selon la version et la langue SAP.

## 🌺 EXERCICE 7 — SM50 NE REMPLACE PAS LA CORRECTION

Classer chaque action :

| Action                                             | Diagnostic | Arrêt temporaire | Correction durable |
| -------------------------------------------------- | ---------- | ---------------- | ------------------ |
| Lire le code et identifier une progression absente |            |                  |                    |
| Arrêter le programme dans `SM50`                   |            |                  |                    |
| Ajouter une condition de sortie                    |            |                  |                    |
| Consulter le dump dans `ST22`                      |            |                  |                    |
| Ajouter une limite maximale de passages            |            |                  |                    |
| Relancer les tests nominaux et limites             |            |                  |                    |

## 🌺 EXERCICE 8 — ANALYSE D’UN TIME_OUT

Un programme a été arrêté avec un runtime error `TIME_OUT`.

Établir la checklist d’analyse :

1. relever le programme ;
2. relever l’utilisateur et l’heure ;
3. identifier la section `Error analysis` ;
4. consulter la position active du programme ;
5. rechercher la boucle concernée ;
6. vérifier la progression et les sorties ;
7. vérifier le volume de données et le coût du traitement ;
8. corriger ;
9. reproduire avec un cas maîtrisé ;
10. vérifier la non-régression.

Répondre :

1. Un `TIME_OUT` prouve-t-il systématiquement l’existence d’une boucle infinie ?
2. Un traitement fini mais excessivement long peut-il également atteindre une limite de temps ?
3. Pourquoi le volume de données doit-il être contrôlé ?
4. Pourquoi augmenter une limite de temps ne constitue-t-il pas automatiquement une correction ?

## 🌺 LIVRABLES

- définitions complétées ;
- tableau d’analyse des quatre cas ;
- preuve de terminaison ;
- résultat de la simulation sécurisée ;
- correction du défaut avec `CONTINUE` ;
- ordre de la procédure `SM50` ;
- classement diagnostic/arrêt/correction ;
- checklist `ST22`.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Aucune boucle réellement infinie n’est exécutée.
- [ ] Les causes A, B et C sont identifiées.
- [ ] Le cas D est reconnu comme terminé.
- [ ] La preuve de terminaison contient les quatre éléments.
- [ ] Le garde-fou interrompt la simulation.
- [ ] La progression métier est restaurée.
- [ ] `CONTINUE` ne court-circuite plus la progression.
- [ ] `SM50` est présenté comme un outil d’administration et d’arrêt, pas comme une correction.
- [ ] Les autorisations et la vérification de l’utilisateur sont mentionnées.
- [ ] `TIME_OUT` n’est pas assimilé automatiquement à une boucle infinie.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — définitions

| Notion                   | Définition                                                                                                 |
| ------------------------ | ---------------------------------------------------------------------------------------------------------- |
| Boucle infinie           | Boucle dont aucune évolution atteignable ne rend la condition de poursuite fausse ou n’exécute une sortie. |
| Condition de terminaison | État qui met fin à la répétition.                                                                          |
| Variable de progression  | Donnée modifiée pour rapprocher le traitement de l’état terminal.                                          |
| Garde-fou                | Limite indépendante empêchant un nombre de passages non maîtrisé.                                          |
| `TIME_OUT`               | Arrêt d’un traitement ayant dépassé la durée maximale autorisée dans son contexte.                         |
| `SM50`                   | Vue d’administration des processus de travail de l’instance SAP.                                           |
| `ST22`                   | Transaction d’analyse des erreurs d’exécution ABAP.                                                        |

1. Non. Toute boucle peut être non terminante.
2. Oui.
3. Non. La condition menant à `EXIT` peut être impossible à atteindre.
4. Il doit être atteignable après une progression finie.
5. Non. Elle arrête l’exécution concernée.

### Solution — revue statique

| Cas | Risque | Cause                                                           | Correction                                            |
| --- | ------ | --------------------------------------------------------------- | ----------------------------------------------------- |
| A   | Oui    | Aucune limite ni sortie                                         | Ajouter `TIMES` ou une condition d’`EXIT` atteignable |
| B   | Oui    | `lv_index` n’évolue jamais                                      | Incrémenter `lv_index`                                |
| C   | Oui    | `sy-index` commence à 1 et augmente ; il ne devient pas négatif | Utiliser une limite atteignable                       |
| D   | Non    | La variable progresse de 1 à chaque passage                     | Aucune correction fonctionnelle                       |

Correction A :

```abap
DO 10 TIMES.
  WRITE / sy-index.
ENDDO.
```

Correction B :

```abap
DATA lv_index TYPE i VALUE 1.

WHILE lv_index <= 10.
  WRITE / lv_index.
  lv_index = lv_index + 1.
ENDWHILE.
```

Correction C :

```abap
DO.

  IF sy-index > 10.
    EXIT.
  ENDIF.

  WRITE / sy-index.

ENDDO.
```

### Solution — preuve de terminaison

| Élément       | Analyse                                                                                 |
| ------------- | --------------------------------------------------------------------------------------- |
| État initial  | `lv_index = 1`                                                                          |
| Condition     | poursuivre tant que `lv_index <= 10`                                                    |
| Progression   | ajouter `1` à chaque passage                                                            |
| État terminal | après le passage affichant `10`, `lv_index` vaut `11`, donc la condition devient fausse |

### Solution — simulation sécurisée

Résultat du code défectueux :

```text
Passage de sécurité 1 - Index métier 1
Passage de sécurité 2 - Index métier 1
Passage de sécurité 3 - Index métier 1
Passage de sécurité 4 - Index métier 1
Passage de sécurité 5 - Index métier 1
Arrêt de sécurité : aucune progression métier
```

Correction :

```abap
DATA lv_business_index TYPE i VALUE 1.
DATA lv_safety_counter TYPE i VALUE 0.
DATA lv_safety_limit   TYPE i VALUE 5.

WHILE lv_business_index <= 3.

  lv_safety_counter = lv_safety_counter + 1.

  IF lv_safety_counter > lv_safety_limit.
    WRITE / 'Arrêt de sécurité : limite atteinte'.
    EXIT.
  ENDIF.

  WRITE: / 'Passage de sécurité', lv_safety_counter,
           '- Index métier', lv_business_index.

  lv_business_index = lv_business_index + 1.

ENDWHILE.

WRITE / 'Fin naturelle'.
```

La sortie naturelle intervient après trois passages.

### Solution — CONTINUE

Correction recommandée :

```abap
DATA lv_index TYPE i VALUE 1.

WHILE lv_index <= 10.

  DATA(lv_current_index) = lv_index.

  lv_index = lv_index + 1.

  IF lv_current_index MOD 2 = 1.
    CONTINUE.
  ENDIF.

  WRITE / lv_current_index.

ENDWHILE.
```

Variante simple :

```abap
DATA lv_index TYPE i VALUE 0.

WHILE lv_index < 10.

  lv_index = lv_index + 1.

  IF lv_index MOD 2 = 1.
    CONTINUE.
  ENDIF.

  WRITE / lv_index.

ENDWHILE.
```

### Solution — ordre SM50

Ordre :

```text
F → C → A → D → E → G → B
```

1. demander l’autorisation ;
2. ouvrir `SM50` ;
3. vérifier le processus, le programme et l’utilisateur ;
4. utiliser la fonction autorisée pour arrêter le programme ABAP ;
5. vérifier l’arrêt ;
6. analyser l’erreur d’exécution éventuelle ;
7. corriger le code.

### Solution — classement

| Action                            | Diagnostic | Arrêt temporaire | Correction durable |
| --------------------------------- | ---------- | ---------------- | ------------------ |
| Identifier la progression absente | X          |                  |                    |
| Arrêter dans `SM50`               |            | X                |                    |
| Ajouter une condition de sortie   |            |                  | X                  |
| Consulter `ST22`                  | X          |                  |                    |
| Ajouter une limite maximale       |            |                  | X                  |
| Relancer les tests                | X          |                  | X                  |

### Solution — TIME_OUT

Un `TIME_OUT` indique que le traitement a dépassé une limite de temps. Il peut résulter :

- d’une boucle non terminante ;
- d’un volume de données excessif ;
- d’un algorithme fini mais trop coûteux ;
- d’un accès répété ou inefficace ;
- d’un contexte système dégradé.

Augmenter une limite peut masquer le symptôme sans corriger la cause.

</details>
