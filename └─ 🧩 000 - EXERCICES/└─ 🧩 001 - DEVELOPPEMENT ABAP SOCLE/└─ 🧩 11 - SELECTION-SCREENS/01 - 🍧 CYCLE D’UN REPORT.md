# 🌸 EXERCICE — CYCLE D’UN REPORT

## 🌺 OBJECTIFS

- identifier les événements ;
- prévoir leur ordre ;
- placer le code dans le bon bloc ;
- distinguer affichage, validation, sélection et restitution ;
- diagnostiquer un traitement placé trop tôt.

## 🌺 DURÉE INDICATIVE

45 à 60 minutes.

## 🌺 EXERCICE 1 — ORDRE

Remettre dans l’ordre :

```text
START-OF-SELECTION
AT SELECTION-SCREEN OUTPUT
INITIALIZATION
Affichage de l’écran
AT SELECTION-SCREEN
END-OF-SELECTION
```

## 🌺 EXERCICE 2 — RÔLES

Compléter :

| Événement                      | Rôle |
| ------------------------------ | ---- |
| `INITIALIZATION`               |      |
| `AT SELECTION-SCREEN OUTPUT`   |      |
| `AT SELECTION-SCREEN ON p_max` |      |
| `AT SELECTION-SCREEN`          |      |
| `START-OF-SELECTION`           |      |
| `END-OF-SELECTION`             |      |

## 🌺 EXERCICE 3 — TRACE

Créer un programme minimal :

```abap
REPORT zaelion_<tri>_report.

PARAMETERS p_text TYPE c LENGTH 20.

INITIALIZATION.
  WRITE / 'INITIALIZATION'.

AT SELECTION-SCREEN OUTPUT.
  " Ne pas utiliser WRITE ici pour une trace utilisateur finale.

AT SELECTION-SCREEN.
  " Placer un point d’arrêt.

START-OF-SELECTION.
  WRITE / 'START-OF-SELECTION'.

END-OF-SELECTION.
  WRITE / 'END-OF-SELECTION'.
```

Utiliser des points d’arrêt pour observer les événements de l’écran.

## 🌺 EXERCICE 4 — MAUVAIS EMPLACEMENT

Analyser :

```abap
AT SELECTION-SCREEN OUTPUT.

  SELECT order_id
    FROM zt_<tri>_ord
    INTO TABLE @gt_orders.
```

Répondre :

1. combien de fois cet événement peut-il être déclenché ?
2. la sélection risque-t-elle d’être répétée à chaque rafraîchissement ?
3. quel événement doit contenir la sélection principale ?
4. que doit contenir `OUTPUT` ?
5. comment prouver la correction ?

## 🌺 EXERCICE 5 — CODE IMPLICITE

Un programme contient des instructions exécutables avant tout événement explicite.

Répondre :

1. à quel bloc sont-elles affectées dans un programme exécutable ?
2. faut-il préférer un événement explicite pour la lisibilité ?
3. quel bloc sert de traitement principal ?
4. les déclarations sont-elles exécutées comme des instructions métier ?

## 🌺 CRITÈRES DE VALIDATION

- [ ] L’ordre est correct.
- [ ] Chaque rôle est expliqué.
- [ ] Les points d’arrêt montrent le cycle.
- [ ] La sélection est retirée de `OUTPUT`.
- [ ] `START-OF-SELECTION` contient le traitement principal.
- [ ] Le code implicite est compris.

<details>
<summary>🍧 Afficher la solution</summary>

Ordre simplifié :

```text
INITIALIZATION
Affichage de l’écran
AT SELECTION-SCREEN OUTPUT
AT SELECTION-SCREEN et validations
START-OF-SELECTION
END-OF-SELECTION
```

| Événement             | Rôle                                         |
| --------------------- | -------------------------------------------- |
| `INITIALIZATION`      | Valeurs initiales avant le premier affichage |
| `OUTPUT`              | Propriétés dynamiques de l’écran             |
| `ON p_max`            | Validation du paramètre                      |
| `AT SELECTION-SCREEN` | Validation globale et commandes              |
| `START-OF-SELECTION`  | Lecture et traitement                        |
| `END-OF-SELECTION`    | Restitution finale éventuelle                |

</details>
