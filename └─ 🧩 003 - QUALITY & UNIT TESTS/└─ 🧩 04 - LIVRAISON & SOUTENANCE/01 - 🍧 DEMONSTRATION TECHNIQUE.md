# 🌸 PRÉPARATION D'UNE DÉMONSTRATION TECHNIQUE

## 🌺 OBJECTIFS

- [ ] Construire une démonstration reproductible.
- [ ] Choisir des scénarios qui prouvent les règles importantes.
- [ ] Préparer les données, écrans et résultats attendus.
- [ ] Continuer la présentation si un incident survient.

## 🌺 PRINCIPES

Une démonstration n'est pas une séance de test improvisée. Les scénarios ont déjà été exécutés et leurs résultats sont connus.

Chaque scénario doit répondre à quatre questions :

1. quelle règle est démontrée ?
2. quelles données sont utilisées ?
3. quel résultat précis est attendu ?
4. où ce résultat est-il visible ?

## 🌺 TROIS SCÉNARIOS MINIMAUX

| Scénario | Preuve attendue |
| --- | --- |
| commande multi-postes | regroupement unique et numérotation des postes |
| commande valide mono-poste | traitement nominal et messages SAP restitués |
| commande rejetée | erreur explicite, absence d'appel métier, poursuite des autres commandes |

## 🌺 SCRIPT DE DÉMONSTRATION

Pour chaque scénario, préparer une fiche :

```text
Objectif :
Données utilisées :
Action utilisateur :
Résultat attendu :
Écran ou table à montrer :
Phrase de conclusion :
Durée maximale :
```

## 🌺 PRÉPARATION DU SYSTÈME

- ouvrir la session et les transactions avant le début ;
- placer le fichier dans un chemin stable ;
- vérifier les autorisations et données de référence ;
- nettoyer uniquement les données de démonstration dont la suppression est autorisée ;
- régler les filtres utiles de l'ALV ou de la consultation de table ;
- conserver le `RUN_ID` produit pendant la démonstration ;
- désactiver les breakpoints non nécessaires.

## 🌺 PREUVE DE SIMULATION

La présentation doit montrer les éléments observables permettant de conclure qu'aucun document réel n'est créé. Une simple affirmation orale ne suffit pas. La preuve dépend de l'API et du système : paramètre de simulation visible dans le code, résultat retourné et contrôle convenu avec le jury.

## 🌺 PLAN DE SECOURS

Préparer :

- captures datées d'une exécution réussie ;
- valeurs attendues de chaque scénario ;
- extrait de code limité aux points essentiels ;
- répartition des explications si la session SAP devient indisponible.

Le plan de secours documente une exécution antérieure ; il ne doit pas masquer une solution qui n'a jamais fonctionné.

## 🌺 RÉPÉTITION

Exécuter la démonstration complète avec chronomètre. Un membre manipule, un autre explique, un troisième vérifie le déroulé. Inverser ensuite les rôles pour garantir la maîtrise collective.

## 🌺 CHECKLIST

- [ ] trois scénarios préparés et déjà réussis ;
- [ ] résultats attendus écrits ;
- [ ] temps total inférieur au créneau réservé ;
- [ ] aucun mot de passe ou donnée sensible visible ;
- [ ] aucune création réelle non autorisée ;
- [ ] plan de secours disponible ;
- [ ] phrase de conclusion prévue pour chaque scénario.

## 🌺 RÉSUMÉ

> - Une démonstration prouve des règles précises avec des données maîtrisées.
> - Les manipulations sont répétées et chronométrées.
> - Le plan de secours complète la démonstration sans remplacer une exécution réelle préalable.
