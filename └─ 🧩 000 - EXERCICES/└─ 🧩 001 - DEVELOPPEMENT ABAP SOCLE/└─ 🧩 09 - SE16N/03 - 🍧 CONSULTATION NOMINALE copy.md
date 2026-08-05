# 🌸 EXERCICES — CONSULTATATION NOMINALE

## 🌺 OBJECTIFS

- ouvrir une table ;
- limiter le nombre de lignes ;
- exécuter une sélection ;
- identifier le nombre de lignes retournées ;
- afficher le détail d’un enregistrement ;
- conserver une preuve du cas nominal.

## 🌺 DURÉE INDICATIVE

30 à 40 minutes.

## 🌺 CONSIGNES

1. Ouvrir `SE16N`.
2. Saisir :

```text
ZT_<TRI>_ORD
```

3. Fixer le nombre maximal de résultats à :

```text
20
```

4. Ne saisir aucun autre critère.
5. Exécuter avec `F8`.
6. Relever :
   - nombre de lignes ;
   - première commande ;
   - dernière commande ;
   - colonnes affichées ;
   - ordre initial constaté.
7. Ouvrir le détail de la commande `0000000002`.
8. Relever toutes ses valeurs.

## 🌺 QUESTIONS

1. Le nombre maximal de résultats garantit-il que la table ne contient pas davantage de lignes ?
2. L’ordre initial constitue-t-il un ordre métier garanti ?
3. La grille affiche-t-elle nécessairement tous les champs de la table ?
4. Une colonne masquée signifie-t-elle que le champ n’existe pas ?
5. Le détail modifie-t-il l’enregistrement ?

## 🌺 CAS LIMITE

Fixer le maximum à :

```text
1
```

Exécuter.

Répondre :

1. combien de lignes sont affichées ?
2. peut-on conclure que la table ne contient qu’une ligne ?
3. quelle différence existe entre limite et nombre réel ?
4. comment obtenir un comptage fiable selon les fonctions disponibles dans le système ?

## 🌺 LIVRABLES

- capture ou relevé de la sélection ;
- nombre maximal utilisé ;
- nombre de lignes affichées ;
- détail de la deuxième commande ;
- réponses aux cinq questions ;
- analyse du maximum égal à `1`.

## 🌺 CRITÈRES DE VALIDATION

- [ ] La table correcte est ouverte.
- [ ] Une limite est définie avant l’exécution.
- [ ] La limite n’est pas confondue avec le nombre réel.
- [ ] L’ordre initial n’est pas considéré comme garanti.
- [ ] Le détail est utilisé en lecture seule.
- [ ] Les colonnes masquées sont distinguées des champs absents.

<details>
<summary>🍧 Afficher la solution</summary>

Le résultat nominal doit contenir au minimum les trois commandes de référence.

Le maximum `1` limite le résultat affiché. Il ne prouve pas que la table contient une seule ligne.

L’ordre observé ne doit pas être utilisé comme un contrat. Un tri explicite est nécessaire lorsqu’un ordre précis est attendu dans l’analyse.

</details>
