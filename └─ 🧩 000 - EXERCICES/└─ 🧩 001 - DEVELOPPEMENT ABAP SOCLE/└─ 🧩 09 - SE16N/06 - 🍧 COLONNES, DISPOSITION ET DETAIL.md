# 🌸 EXERCICES — SÉLECTIONS MULTIPLES

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [TRANSACTION SE16N](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 09 - SE16N/01 - 🍧 SE16N.md>)

## 🌺 OBJECTIFS

- afficher uniquement les colonnes utiles ;
- modifier la disposition ;
- trier les résultats ;
- filtrer localement ;
- masquer les colonnes vides ;
- ouvrir le détail ;
- distinguer sélection serveur et traitement de la grille.

## 🌺 DURÉE INDICATIVE

40 à 55 minutes.

## 🌺 EXERCICE 1 — COLONNES MINIMALES

Avant l’exécution, sélectionner uniquement :

```text
ORDER_ID
CUSTOMER_NAME
STATUS
AMOUNT
CURRENCY
```

Exécuter sans autre champ.

Répondre :

1. les données non affichées sont-elles supprimées de la table ?
2. la réduction des colonnes améliore-t-elle la lisibilité ?
3. limite-t-elle les données exposées à l’utilisateur ?
4. remplace-t-elle un filtre de lignes ?

## 🌺 EXERCICE 2 — DISPOSITION

Dans la grille :

1. placer `ORDER_ID` en première colonne ;
2. placer `CUSTOMER_NAME` en deuxième ;
3. placer `AMOUNT` et `CURRENCY` côte à côte ;
4. masquer `MANDT`;
5. enregistrer une disposition personnelle si cette fonction est autorisée.

Nom recommandé :

```text
ZREV_<TRI>
```

Ne pas définir la disposition comme globale sans autorisation.

## 🌺 EXERCICE 3 — TRI

Trier :

1. par `CURRENCY` croissante ;
2. puis par `AMOUNT` décroissant.

Relever l’ordre obtenu.

Répondre :

1. le tri modifie-t-il la table en base ?
2. l’ordre reste-t-il garanti lors d’une nouvelle exécution sans disposition ou tri ?
3. le tri réduit-il le nombre de lignes lues ?
4. pourquoi faut-il filtrer avant d’exécuter lorsque la table est volumineuse ?

## 🌺 EXERCICE 4 — FILTRE LOCAL

Après avoir affiché toutes les commandes, appliquer dans la grille :

```text
CUSTOMER_NAME contient Martin
```

Résultat attendu :

```text
Alice Martin
Claire Martin
```

Comparer avec une sélection initiale équivalente.

## 🌺 EXERCICE 5 — DÉTAIL

Ouvrir le détail de `0000000001`.

Relever :

- valeur interne de l’identifiant ;
- statut ;
- priorité ;
- montant ;
- devise ;
- auteur ;
- date.

## 🌺 EXERCICE 6 — COLONNES VIDES

Si aucune colonne n’est vide dans la table, créer une situation de test uniquement dans une table `Z` autorisée ou utiliser une colonne facultative réellement vide.

Tester la fonction de masquage des colonnes vides.

Ne pas modifier les données uniquement pour obtenir une colonne vide.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Les colonnes utiles sont sélectionnées.
- [ ] La disposition reste personnelle.
- [ ] Le tri ne modifie pas la base.
- [ ] Le tri n’est pas confondu avec une sélection.
- [ ] Le filtre local est comparé au filtre initial.
- [ ] Le détail est utilisé pour vérifier les valeurs.
- [ ] Aucune donnée n’est créée uniquement pour tester l’affichage.

<details>
<summary>🍧 Afficher la solution</summary>

La sélection initiale réduit les lignes lues selon les critères envoyés.

Le filtre local masque des lignes déjà retournées dans la grille.

Le tri et la disposition affectent l’affichage, pas le contenu physique de la table.

</details>
