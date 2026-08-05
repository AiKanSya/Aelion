# 🌸 EXERCICES — COMMIT, ROLLBACK ET NETTOYAGE

## 🌺 OBJECTIFS

- vérifier l’effet du rollback ;
- rendre une suppression permanente ;
- restaurer une donnée de test ;
- placer le commit à la bonne frontière ;
- éviter un commit prématuré ;
- limiter la durée des verrous.

## 🌺 DURÉE INDICATIVE

50 à 65 minutes.

## 🌺 EXERCICE 1 — ROLLBACK

1. préparer `9300000060`;
2. supprimer la ligne ;
3. vérifier l’absence ;
4. rollback ;
5. vérifier le retour.

## 🌺 EXERCICE 2 — COMMIT

1. préparer `9300000061`;
2. exécuter `COMMIT WORK AND WAIT` pour rendre la préparation persistante ;
3. supprimer la ligne ;
4. exécuter `COMMIT WORK AND WAIT`;
5. vérifier l’absence dans une nouvelle exécution.

## 🌺 EXERCICE 3 — RESTAURATION

Réinsérer exactement la ligne de test `9300000061` si l’exercice doit être rejoué, ou confirmer qu’elle appartient uniquement au jeu temporaire.

Ne jamais restaurer une donnée productive en reconstruisant arbitrairement ses valeurs.

## 🌺 EXERCICE 4 — COMMIT PRÉMATURÉ

Scénario :

```text
Suppression commande
COMMIT
Suppression détail
Échec
ROLLBACK
```

Répondre :

1. la commande revient-elle ?
2. le processus reste-t-il atomique ?
3. où placer le commit ?
4. que faire si la suppression du détail échoue ?
5. pourquoi la transaction complète doit-elle être connue ?

## 🌺 EXERCICE 5 — VERROUS ET VOLUMÉTRIE

Répondre :

1. `DELETE` pose-t-il des verrous de base ?
2. jusqu’à quand ?
3. une suppression massive peut-elle saturer les verrous ou la zone de rollback ?
4. faut-il découper arbitrairement une opération atomique ?
5. quelle décision doit associer métier, volume et exploitation ?

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le rollback restaure la ligne.
- [ ] Le commit rend la suppression permanente.
- [ ] Aucune donnée productive n’est reconstruite.
- [ ] Le commit prématuré est identifié.
- [ ] La transaction reste atomique.
- [ ] Les verrous sont pris en compte.
- [ ] La volumétrie est analysée.
- [ ] Le propriétaire de la transaction est identifié.

<details>
<summary>🍧 Afficher la solution</summary>

```text
Préparer toutes les suppressions liées
Vérifier les résultats
Si tout est correct → COMMIT
Sinon → ROLLBACK
```

Un rollback ne peut pas annuler une suppression déjà validée par un commit antérieur.

</details>
