# 🌸 EXERCICES — DIAGNOSTIC D’UN RÉSULTAT VIDE

## 🌺 OBJECTIFS

- appliquer une checklist ordonnée ;
- distinguer absence de données, mauvais filtre et défaut d’autorisation ;
- vérifier le format interne ;
- vérifier le mandant ;
- vérifier la table ou la vue ;
- éviter les conclusions prématurées.

## 🌺 DURÉE INDICATIVE

50 à 65 minutes.

## 🌺 CHECKLIST

Lorsqu’aucune ligne n’est retournée, vérifier dans cet ordre :

1. système ;
2. mandant ;
3. nom technique ;
4. table ou vue ;
5. critères actifs ;
6. inclusions et exclusions ;
7. valeur interne ;
8. casse ;
9. dates et heures ;
10. limite de résultats ;
11. autorisation ;
12. existence réelle des données ;
13. effet d’une jointure ;
14. date d’insertion ou de transport.

## 🌺 CAS A — MAUVAISE VALEUR INTERNE

Recherche :

```text
ORDER_ID = 2
```

Donnée :

```text
0000000002
```

Correction :

```text
ORDER_ID = 0000000002
```

## 🌺 CAS B — MAUVAIS MANDANT

La donnée a été chargée dans le mandant de développement.

Le stagiaire consulte un autre mandant.

Décrire :

- symptôme ;
- vérification ;
- correction ;
- limite d’accès.

## 🌺 CAS C — EXCLUSION ACTIVE

Le champ `STATUS` contient une ancienne exclusion :

```text
Exclure P
```

Le stagiaire saisit ensuite :

```text
Inclure P
```

Résultat :

```text
Aucune ligne
```

Expliquer le diagnostic.

## 🌺 CAS D — VUE À JOINTURE

La table contient trois lignes.  
La vue n’en contient que deux.

Décrire la vérification des statuts et de la table de contrôle.

## 🌺 CAS E — DATE

La date est saisie au format externe incorrect pour le paramétrage de l’utilisateur.

Utiliser l’aide de saisie ou le format affiché par le champ.

## 🌺 CAS F — NOM TECHNIQUE

Le stagiaire ouvre la table de statuts au lieu de la table de commandes.

Pourquoi le filtre `ORDER_ID` n’est-il pas disponible ?

## 🌺 CAS G — DONNÉE NON COMMITÉE

Un programme a effectué une écriture sans validation de transaction.

Répondre :

1. la ligne est-elle forcément visible dans une autre session ?
2. quel rôle joue `COMMIT WORK` ?
3. faut-il ajouter un `COMMIT` arbitrairement dans tout programme ?
4. où doit se trouver la responsabilité transactionnelle ?

## 🌺 TABLEAU DE DIAGNOSTIC

Compléter :

| Symptôme                                           | Cause probable | Vérification |
| -------------------------------------------------- | -------------- | ------------ |
| Champ absent                                       |                |              |
| Aucune ligne sur clé connue                        |                |              |
| Moins de lignes dans la vue                        |                |              |
| Valeur numérique différente                        |                |              |
| Date non trouvée                                   |                |              |
| Accès refusé                                       |                |              |
| Donnée visible dans une session mais pas une autre |                |              |

## 🌺 CRITÈRES DE VALIDATION

- [ ] La checklist est appliquée dans l’ordre.
- [ ] Le mandant est vérifié.
- [ ] Les exclusions masquées sont contrôlées.
- [ ] Le format interne est analysé.
- [ ] La jointure est analysée.
- [ ] L’absence de commit est envisagée sans modification arbitraire.
- [ ] Un accès refusé n’est pas assimilé à une table vide.

<details>
<summary>🍧 Afficher la solution</summary>

| Symptôme              | Cause possible                                    |
| --------------------- | ------------------------------------------------- |
| Champ absent          | Mauvaise table ou mauvaise vue                    |
| Clé connue absente    | Format interne, mandant, filtre ou absence réelle |
| Vue incomplète        | Jointure sans correspondance                      |
| Montant différent     | Format, décimales, devise ou mauvaise ligne       |
| Date absente          | Format utilisateur ou date incorrecte             |
| Accès refusé          | Autorisation insuffisante                         |
| Visibilité différente | Transaction non validée ou session différente     |

</details>
