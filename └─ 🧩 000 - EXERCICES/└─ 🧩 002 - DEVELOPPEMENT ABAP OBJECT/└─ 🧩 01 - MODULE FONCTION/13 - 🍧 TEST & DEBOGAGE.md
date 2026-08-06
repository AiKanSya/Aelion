# 🌸 EXERCICES — TEST ET DEBOGAGE

## 🌺 OBJECTIFS

- tester dans `SE37` ;
- conserver des jeux de test ;
- poser un point d’arrêt ;
- déboguer local, RFC et Update Task ;
- détecter un état résiduel.

## 🌺 DURÉE INDICATIVE

65 à 85 minutes.

## 🌺 EXERCICE 1 — MATRICE DE TEST

Pour `Z_<TRI>_CALC_NET_AMOUNT` :

| Cas              | Quantité | Prix | Remise | Attendu   |
| ---------------- | -------: | ---: | -----: | --------- |
| Nominal          |      `2` | `10` |   `10` | net `18`  |
| Sans remise      |      `2` | `10` |    `0` | net `20`  |
| Remise totale    |      `2` | `10` |  `100` | net `0`   |
| Quantité nulle   |      `0` | `10` |   `10` | exception |
| Remise excessive |      `2` | `10` |  `101` | exception |

## 🌺 EXERCICE 2 — SE37

Pour chaque cas :

1. saisir les paramètres ;
2. exécuter ;
3. relever les exports ;
4. relever l’exception ;
5. comparer à l’attendu.

## 🌺 EXERCICE 3 — DONNÉES DE TEST

Sauvegarder un jeu si la fonction est disponible dans la version du système :

```text
NOMINAL_10_PERCENT
```

## 🌺 EXERCICE 4 — BREAKPOINT

Observer :

- paramètres formels ;
- variables locales ;
- pile d’appel ;
- retour dans l’appelant ;
- `sy-subrc`.

## 🌺 EXERCICE 5 — DEUX APPELS

Premier appel invalide, puis appel valide.

Vérifier qu’aucun message global résiduel ne subsiste.

## 🌺 EXERCICE 6 — RFC

Utiliser un breakpoint externe lorsque l’appel se déroule dans une autre session ou sous un autre utilisateur.

## 🌺 EXERCICE 7 — UPDATE TASK

Activer Update Debugging avant le commit.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Cinq cas sont exécutés.
- [ ] Les attendus sont écrits avant le test.
- [ ] Les exceptions sont vérifiées.
- [ ] Un breakpoint est utilisé.
- [ ] Deux appels successifs sont indépendants.
- [ ] Le contexte RFC est compris.
- [ ] Update Debugging est compris.

<details>
<summary>🍧 Afficher la checklist</summary>

```text
□ interface active
□ données d’entrée connues
□ résultat attendu défini
□ résultat réel enregistré
□ exception vérifiée
□ sy-subrc contrôlé
□ aucune donnée globale résiduelle
□ transaction nettoyée
```

</details>
