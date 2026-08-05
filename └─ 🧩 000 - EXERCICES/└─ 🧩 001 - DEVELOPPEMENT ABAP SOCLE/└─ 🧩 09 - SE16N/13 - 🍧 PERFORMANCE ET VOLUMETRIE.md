# 🌸 EXERCICES — PERFORMANCE ET VOLUMÉTRIE

## 🌺 OBJECTIFS

- limiter le volume lu ;
- sélectionner par clé ;
- éviter les champs inutiles ;
- distinguer tri local et filtre initial ;
- identifier l’importance d’un index sans prétendre imposer son usage ;
- interrompre une analyse avant de dégrader le système.

## 🌺 DURÉE INDICATIVE

45 à 60 minutes.

## 🌺 EXERCICE 1 — MAUVAISE PRATIQUE

Analyser :

```text
Table volumineuse
Aucun critère
Maximum très élevé
Toutes les colonnes
Exécution en heure de pointe
```

Identifier :

- risque base de données ;
- risque serveur d’application ;
- risque réseau ;
- risque poste client ;
- risque confidentialité.

## 🌺 EXERCICE 2 — RÉÉCRITURE DE LA SÉLECTION

Besoin :

```text
Vérifier la commande 0000000002.
```

Comparer :

### Variante A

```text
Aucun filtre
100000 résultats
Recherche locale dans la grille
```

### Variante B

```text
ORDER_ID = 0000000002
Maximum = 10
Colonnes minimales
```

Choisir et justifier.

## 🌺 EXERCICE 3 — CLÉ ET INDEX

La table possède la clé :

```text
MANDT + ORDER_ID
```

Répondre :

1. rechercher par `ORDER_ID` est-il plus sélectif qu’une recherche sur une partie libre du nom client ?
2. `SE16N` garantit-il visuellement quel index de base est utilisé ?
3. faut-il affirmer qu’un index précis est utilisé sans trace SQL ou analyse adaptée ?
4. quelle information peut-on néanmoins utiliser pour construire un filtre sélectif ?
5. quel outil d’analyse avancé appartient à l’équipe technique expérimentée ?

## 🌺 EXERCICE 4 — TRI APRÈS LECTURE

Le stagiaire exécute toute la table puis trie par `ORDER_ID`.

Répondre :

1. le tri réduit-il le volume déjà lu ?
2. protège-t-il la base de données ?
3. quel traitement faut-il déplacer avant l’exécution ?
4. pourquoi un filtre local ne remplace-t-il pas un critère initial ?

## 🌺 EXERCICE 5 — ARRIÈRE-PLAN

Le traitement en arrière-plan peut être disponible selon la version.

Répondre :

1. le passage en arrière-plan rend-il une sélection massive automatiquement acceptable ?
2. supprime-t-il le coût base de données ?
3. faut-il obtenir l’accord du formateur ou de l’exploitant ?
4. un rapport récurrent doit-il être remplacé par un programme conçu pour ce besoin ?

## 🌺 EXERCICE 6 — CHECKLIST

Avant une sélection sur une table inconnue :

```text
□ Vérifier la table dans SE11
□ Relever les clés
□ Estimer le volume
□ Définir les critères
□ Définir le maximum
□ Réduire les colonnes
□ Vérifier les autorisations
□ Choisir une période appropriée
□ Prévoir l’arrêt si le résultat est excessif
```

## 🌺 CRITÈRES DE VALIDATION

- [ ] La sélection par clé est privilégiée.
- [ ] Une limite faible est utilisée.
- [ ] Les colonnes sont réduites.
- [ ] Le tri local n’est pas assimilé à une optimisation de la lecture.
- [ ] L’usage d’un index n’est pas affirmé sans preuve.
- [ ] L’arrière-plan n’est pas présenté comme une solution magique.
- [ ] Un besoin récurrent conduit à un développement dédié.

<details>
<summary>🍧 Afficher la solution</summary>

La variante correcte est :

```text
ORDER_ID = 0000000002
Maximum = 10
Colonnes nécessaires uniquement
```

Pour connaître réellement le chemin SQL, une analyse technique avec les outils de trace et les autorisations adaptées est nécessaire. `SE16N` seul ne constitue pas une preuve du plan d’accès.

</details>
