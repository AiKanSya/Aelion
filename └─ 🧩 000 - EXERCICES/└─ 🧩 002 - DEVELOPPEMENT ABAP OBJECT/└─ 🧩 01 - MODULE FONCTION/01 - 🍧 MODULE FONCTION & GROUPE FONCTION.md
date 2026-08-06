# 🌸 EXERCICES — MODULES FONCTION ET GROUPES DE FONCTIONS

## 🌺 OBJECTIFS

- définir un module fonction ;
- définir un groupe de fonctions ;
- comprendre leur relation ;
- distinguer module fonction, `FORM` et méthode ;
- expliquer l’unicité du nom.

## 🌺 DURÉE INDICATIVE

40 à 55 minutes.

## 🌺 EXERCICE 1 — RESTITUTION

Compléter :

| Objet                 | Définition | Appel |
| --------------------- | ---------- | ----- |
| Groupe de fonctions   |            |       |
| Module fonction       |            |       |
| Sous-programme `FORM` |            |       |
| Méthode de classe     |            |       |

## 🌺 EXERCICE 2 — DOMAINE FONCTIONNEL

Proposer un groupe lié aux commandes :

```text
ZFG_<TRI>_ORDER
```

Créer trois noms de modules pour :

1. lire une commande ;
2. valider une commande ;
3. calculer son montant.

## 🌺 EXERCICE 3 — UNICITÉ

Répondre :

1. le nom est-il unique seulement dans son groupe ?
2. deux groupes peuvent-ils contenir un module de même nom ?
3. le groupe apparaît-il dans `CALL FUNCTION` ?
4. pourquoi un préfixe de projet est-il utile ?
5. comment retrouver le groupe d’un module ?

## 🌺 EXERCICE 4 — COMPARAISON

| Critère                     | Module fonction | Méthode | `FORM` |
| --------------------------- | --------------- | ------- | ------ |
| Interface déclarée          |                 |         |        |
| Appel RFC possible          |                 |         |        |
| Update Task possible        |                 |         |        |
| Héritage et interfaces OO   |                 |         |        |
| Portée limitée au programme |                 |         |        |

## 🌺 DIAGNOSTIC

Cas incorrect :

```text
Deux équipes créent Z_ORDER_GET dans deux groupes différents.
```

Décrire le symptôme et corriger le nommage.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le groupe est identifié comme conteneur.
- [ ] Le module possède une interface.
- [ ] Le nom du module est globalement unique.
- [ ] Trois noms cohérents sont proposés.
- [ ] Les trois formes de modularisation sont distinguées.

<details>
<summary>🍧 Afficher la solution</summary>

| Objet               | Définition                                            |
| ------------------- | ----------------------------------------------------- |
| Groupe de fonctions | Function pool regroupant modules et données partagées |
| Module fonction     | Procédure système appelée par `CALL FUNCTION`         |
| `FORM`              | Sous-programme interne à un programme                 |
| Méthode             | Procédure d’une classe ou interface                   |

Exemple :

```text
Z_<TRI>_ORDER_GET
Z_<TRI>_ORDER_VALIDATE
Z_<TRI>_ORDER_CALCULATE
```

Deux groupes ne peuvent pas posséder deux modules de même nom, car le nom du module est unique dans le système.

</details>
