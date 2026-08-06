# 🌸 EXERCICES — EXCEPTIONS DES CONVERSION EXITS

## 🌺 OBJECTIFS

- lire l’interface installée dans `SE37` ;
- ne pas inventer une exception ;
- mapper les exceptions déclarées ;
- contrôler `sy-subrc` immédiatement ;
- séparer conversion et validation métier.

## 🌺 DURÉE INDICATIVE

45 à 60 minutes.

## 🌺 EXERCICE 1 — INSPECTION

Ouvrir :

```text
CONVERSION_EXIT_ALPHA_INPUT
CONVERSION_EXIT_ALPHA_OUTPUT
CONVERSION_EXIT_MATN1_INPUT
```

Relever :

- import ;
- export ;
- exceptions ;
- documentation ;
- groupe de fonctions.

## 🌺 EXERCICE 2 — EXCEPTION ABSENTE

Si une routine ne déclare aucune exception, ne pas écrire une exception fictive dans l’appel.

## 🌺 EXERCICE 3 — APPEL GÉNÉRÉ

Pour une routine possédant des exceptions :

1. générer l’appel depuis l’éditeur ;
2. conserver les noms réels ;
3. mapper les cas utiles ;
4. ajouter `OTHERS` seulement si justifié.

## 🌺 EXERCICE 4 — SY-SUBRC

```abap
CALL FUNCTION '...'
  ...
  EXCEPTIONS
    ...
    OTHERS = 9.

DATA(lv_subrc) = sy-subrc.
```

Ne pas exécuter une autre instruction avant la sauvegarde.

## 🌺 EXERCICE 5 — CONTRÔLES SÉPARÉS

Une conversion exit ne remplace pas :

- contrôle de longueur ;
- caractères autorisés ;
- existence de la clé ;
- autorisation ;
- règle métier.

## 🌺 EXERCICE 6 — MATRICE

| Routine      | Interface réelle | Exceptions réelles | Cas limite            |
| ------------ | ---------------- | ------------------ | --------------------- |
| ALPHA INPUT  | à relever        | à relever          | valeur trop longue    |
| ALPHA OUTPUT | à relever        | à relever          | valeur alphanumérique |
| MATN1 INPUT  | à relever        | à relever          | longueur matériau     |

## 🌺 CRITÈRES DE VALIDATION

- [ ] Les interfaces sont ouvertes.
- [ ] Les exceptions réelles sont notées.
- [ ] Aucune exception fictive n’est utilisée.
- [ ] L’appel est généré.
- [ ] `sy-subrc` est contrôlé immédiatement.
- [ ] Les validations métier restent séparées.
- [ ] Les différences de version sont documentées.

<details>
<summary>🍧 Afficher la solution</summary>

Règle :

```text
L’interface active dans SE37 est la source de vérité du système installé.
```

</details>
