# 🌸 EXERCICES — PERFORMANCE ET VOLUMÉTRIE

## 🌺 OBJECTIFS

- analyser un symptôme ;
- identifier une cause vérifiable ;
- corriger sans modifier les données ;
- prouver la non-régression ;
- distinguer défaut technique et erreur d’interprétation.

## 🌺 DURÉE INDICATIVE

60 à 75 minutes.

## 🌺 CAS 1 — COMMANDE ABSENTE

### Symptôme

```text
0000000002 n’est pas affichée.
```

### Informations

```text
Filtre STATUS = N
Commande 0000000002 = P
```

Identifier :

- cause ;
- correction ;
- cas nominal ;
- cas limite.

## 🌺 CAS 2 — TOTAL INCOHÉRENT

### Symptôme

```text
Total = 250,50
```

### Informations

```text
EUR et USD sont mélangés.
```

Identifier la correction.

## 🌺 CAS 3 — NOM NON TROUVÉ

### Symptôme

```text
Recherche ALICE MARTIN
Aucun résultat
```

### Informations

```text
Champ autorisant les minuscules
Valeur stockée : Alice Martin
Opérateur exact
```

Proposer :

- valeur exacte ;
- opérateur de motif ou sélection adaptée ;
- vérification dans le détail.

## 🌺 CAS 4 — VUE INCOMPLÈTE

### Symptôme

```text
Table : 3 lignes
Vue : 2 lignes
```

### Informations

```text
Une commande possède un statut sans texte de référence.
```

Diagnostiquer la jointure.

## 🌺 CAS 5 — EXPORT PERDANT LES ZÉROS

### Symptôme

```text
0000000001 devient 1 dans le tableur.
```

Diagnostiquer le format de colonne.

## 🌺 CAS 6 — ACCÈS REFUSÉ

### Symptôme

```text
Message d’autorisation.
```

Décrire la procédure sans contournement.

## 🌺 CAS 7 — RÉSULTAT LIMITÉ

### Symptôme

```text
100 lignes affichées.
```

### Information

```text
Maximum = 100
```

Peut-on conclure que la table contient exactement cent lignes ?

## 🌺 CAS 8 — FILTRE LOCAL

### Symptôme

```text
La sélection initiale a retourné 10 000 lignes.
Le filtre ALV n’en affiche plus que 2.
```

Le filtre local a-t-il évité la lecture initiale ?

## 🌺 CAS 9 — DONNÉE ANCIENNE

### Symptôme

```text
Le statut attendu n’est pas présent.
```

Vérifications :

```text
système
mandant
date du test
commit
rafraîchissement
cas de test
```

## 🌺 CAS 10 — MAUVAISE TABLE

### Symptôme

```text
Champ ORDER_ID absent.
```

Cause :

```text
ZT_<TRI>_STAT ouverte au lieu de ZT_<TRI>_ORD.
```

## 🌺 CRITÈRES DE VALIDATION

- [ ] Chaque cause repose sur une information vérifiée.
- [ ] Aucun cas ne conduit à une modification directe.
- [ ] Les devises sont contrôlées.
- [ ] La jointure est comprise.
- [ ] Les zéros initiaux sont protégés.
- [ ] Les autorisations ne sont pas contournées.
- [ ] La limite de résultats est interprétée correctement.
- [ ] Le filtre local n’est pas confondu avec la sélection initiale.
- [ ] Le système et le mandant sont toujours relevés.
- [ ] La bonne table est vérifiée.

<details>
<summary>🍧 Afficher la solution</summary>

| Cas | Cause principale                        |
| --- | --------------------------------------- |
| 1   | Filtre de statut incompatible           |
| 2   | Devises mélangées                       |
| 3   | Comparaison exacte et casse             |
| 4   | Jointure interne sans correspondance    |
| 5   | Interprétation numérique par le tableur |
| 6   | Autorisation insuffisante               |
| 7   | Limite atteinte, nombre réel inconnu    |
| 8   | Filtrage après lecture                  |
| 9   | Contexte ou transaction non actualisée  |
| 10  | Mauvaise source                         |

</details>
