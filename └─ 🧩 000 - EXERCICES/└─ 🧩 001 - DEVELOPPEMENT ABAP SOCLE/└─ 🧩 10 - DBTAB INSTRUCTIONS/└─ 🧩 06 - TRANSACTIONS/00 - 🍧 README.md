# 🌸 SOMMAIRE — └─ 🧩 06 - TRANSACTIONS

## 🌺 OBJECTIF DU PARCOURS

Ces exercices renforcent la gestion transactionnelle en ABAP classique.

Le dossier d’origine contient un seul exercice générique sur :

```text
COMMIT WORK
ROLLBACK WORK
```

La version corrigée construit un parcours complet autour des notions suivantes :

1. transaction métier ;
2. Database LUW ;
3. SAP LUW ;
4. principe « tout ou rien » ;
5. écritures directes avec Open SQL ;
6. `COMMIT WORK` ;
7. `COMMIT WORK AND WAIT` ;
8. `ROLLBACK WORK` ;
9. propriétaire de la transaction ;
10. Update Task ;
11. mises à jour synchrones et asynchrones ;
12. commits implicites ;
13. BAPI et contrat transactionnel ;
14. verrouillage ;
15. traitement atomique d’un lot ;
16. diagnostic des incohérences transactionnelles.

Le stagiaire doit être capable de regrouper plusieurs écritures dans une unité cohérente, de valider uniquement un résultat complet et d’annuler l’ensemble dès qu’une étape échoue.

## 🌺 COURS ASSOCIÉ

- `10 - DBTAB INSTRUCTIONS/06 - TRANSACTIONS/01 - 🍧 COMMIT ET ROLLBACK.md`

## 🌺 PROGRAMME UTILISÉ

Créer le programme exécutable suivant :

```text
ZAELION_<TRI>_TRANSACTIONS
```

Remplacer `<TRI>` par le trigramme attribué.

Enregistrer le programme dans le package et l’ordre de transport utilisés pour les exercices précédents.

## 🌺 TABLES UTILISÉES

Les exercices réutilisent les tables personnalisées créées dans `08 - SE11`.

### Table des statuts

```text
ZT_<TRI>_STAT
```

Champs :

```text
MANDT
STATUS
STATUS_TEXT
```

Clé primaire :

```text
MANDT + STATUS
```

### Table des commandes

```text
ZT_<TRI>_ORD
```

Champs :

```text
MANDT
ORDER_ID
CUSTOMER_NAME
PRIORITY
STATUS
CURRENCY
AMOUNT
CREATED_BY
CREATED_ON
```

Clé primaire :

```text
MANDT + ORDER_ID
```

## 🌺 DONNÉES RÉSERVÉES AUX TESTS

### Statut de test

```text
T
```

Libellé :

```text
Transaction de test
```

### Plage de commandes

```text
9400000000 à 9400000099
```

> [!CAUTION]
> Ne jamais utiliser les commandes fonctionnelles :
>
> ```text
> 0000000001
> 0000000002
> 0000000003
> ```
>
> Les données des chapitres précédents doivent rester intactes.

## 🌺 RÈGLES COMMUNES

- Travailler uniquement dans un système et un mandant de développement autorisés.
- Utiliser exclusivement les tables `Z` attribuées.
- Ne jamais modifier une table standard SAP.
- Utiliser uniquement le statut `T` et les identifiants `94000000xx`.
- Vérifier que les données de test n’existent pas avant chaque scénario.
- Utiliser `ROLLBACK WORK` par défaut.
- Exécuter un commit uniquement dans l’exercice explicitement prévu.
- Nettoyer immédiatement toute donnée rendue persistante.
- Vérifier `sy-subrc` après chaque écriture Open SQL.
- Sauvegarder `sy-dbcnt` immédiatement si sa valeur doit être utilisée.
- Ne pas continuer une transaction après une erreur sans avoir décidé :
  - d’annuler ;
  - ou de traiter explicitement un résultat partiel.
- Ne pas utiliser un message de succès avant la fin effective de la transaction.
- Ne pas placer un `COMMIT WORK` :
  - dans une boucle ;
  - dans une méthode basse ;
  - dans une fonction utilitaire ;
  - au milieu d’un processus atomique ;
  - dans une Update Task ;
  - dans un traitement dont le framework possède déjà la transaction.
- Ne pas utiliser `ROLLBACK WORK` comme simple mécanisme de nettoyage d’une seule ligne si d’autres écritures valides appartiennent à la même SAP LUW.
- Lire la documentation de toute API appelée avant d’ajouter un commit.
- Ne pas supposer que `COMMIT WORK AND WAIT` attend tous les traitements différés possibles.
- Ne pas tester volontairement un dump ou une mise à jour Update Task défaillante sur un système partagé.
- Conserver une preuve vérifiable :
  - état initial ;
  - écritures demandées ;
  - résultat de chaque étape ;
  - décision transactionnelle ;
  - état avant commit ou rollback ;
  - état final.

---

# 🌸 RECTIFICATIONS TECHNIQUES APPLIQUÉES

## 🌺 TRANSACTION MÉTIER

Une transaction métier représente un ensemble d’actions qui conduit les données d’un état cohérent vers un autre état cohérent.

Exemple :

```text
Créer un statut de test
Créer deux commandes utilisant ce statut
```

Résultats autorisés :

```text
Toutes les lignes sont créées
OU
Aucune ligne n’est créée
```

Résultat interdit :

```text
Statut créé
Première commande créée
Deuxième commande absente
```

## 🌺 DATABASE LUW

Une Database LUW est une unité indivisible gérée par la base de données.

Elle se termine par :

```text
database commit
OU
database rollback
```

Toutes les écritures de cette Database LUW sont alors :

```text
validées ensemble
OU
annulées ensemble
```

## 🌺 SAP LUW

La SAP LUW est l’unité fonctionnelle gérée par l’application ABAP.

Elle peut regrouper un traitement métier qui s’étend au-delà d’une seule étape de dialogue ou qui utilise des techniques SAP telles que :

```text
Update Task
SAP locks
bgRFC ou tRFC selon le contexte
PERFORM ON COMMIT dans les programmes historiques
```

L’objectif reste :

```text
une seule validation finale
ou
une annulation cohérente
```

## 🌺 RELATION ENTRE SAP LUW ET DATABASE LUW

Dans un rapport simple utilisant uniquement des écritures Open SQL directes et aucun commit implicite, la SAP LUW étudiée peut correspondre à une seule Database LUW.

Dans une application classique à plusieurs étapes de dialogue, plusieurs Database LUWs peuvent être nécessaires. La SAP LUW permet alors de préserver la cohérence fonctionnelle en différant les écritures définitives, notamment au moyen de l’Update Task.

## 🌺 COMMIT WORK

Syntaxe :

```abap
COMMIT WORK.
```

Effets principaux :

- termine la SAP LUW courante ;
- ouvre une nouvelle SAP LUW ;
- exécute les traitements enregistrés pour le commit ;
- déclenche les modules enregistrés avec `CALL FUNCTION ... IN UPDATE TASK`;
- traite les verrous SAP selon leur paramètre `_SCOPE`;
- provoque un commit de base sur les connexions ouvertes ;
- termine la Database LUW courante ;
- ferme les curseurs de base ouverts.

Sans `AND WAIT` :

```text
sy-subrc = 0
```

Ce retour ne prouve pas qu’une mise à jour asynchrone ultérieure s’est correctement terminée.

## 🌺 COMMIT WORK AND WAIT

Syntaxe :

```abap
COMMIT WORK AND WAIT.
```

Le programme attend la fin des modules de mise à jour de haute priorité, appelés historiquement mises à jour V1.

Résultat :

```text
sy-subrc = 0
→ modules de mise à jour de haute priorité exécutés avec succès

sy-subrc = 4
→ échec de cette mise à jour synchrone
```

> [!IMPORTANT]
> `AND WAIT` ne signifie pas :
>
> ```text
> attendre toutes les mises à jour V2 ;
> attendre toutes les interfaces ;
> attendre tous les traitements de fond ;
> attendre un système externe ;
> garantir tous les traitements applicatifs futurs.
> ```

Avec uniquement des écritures Open SQL directes, `AND WAIT` n’ajoute pas une validation métier supplémentaire. Il concerne surtout les traitements enregistrés dans l’Update Task.

## 🌺 ROLLBACK WORK

Syntaxe :

```abap
ROLLBACK WORK.
```

Effets principaux :

- termine la SAP LUW courante ;
- ouvre une nouvelle SAP LUW ;
- déclenche un rollback de base sur les connexions ouvertes ;
- annule les écritures non validées ;
- supprime les modules de mise à jour enregistrés pour la SAP LUW ;
- annule les enregistrements transactionnels concernés ;
- traite les verrous SAP selon leur portée ;
- exécute les traitements historiques enregistrés pour le rollback, le cas échéant.

`ROLLBACK WORK` ne peut pas annuler une écriture déjà validée par un commit antérieur.

## 🌺 COMMIT OU ROLLBACK OUVRE UNE NOUVELLE SAP LUW

Après :

```abap
COMMIT WORK.
```

ou :

```abap
ROLLBACK WORK.
```

le traitement qui continue appartient à une nouvelle SAP LUW.

Une erreur après le commit ne permet donc plus d’annuler les opérations précédentes.

## 🌺 ÉCRITURES DIRECTES ET UPDATE TASK

### Écritures directes

```abap
INSERT ...
UPDATE ...
MODIFY ...
DELETE ...
```

Les instructions sont exécutées directement dans la Database LUW courante.

### Update Task

```abap
CALL FUNCTION 'Z_...'
  IN UPDATE TASK
  EXPORTING
    ...
```

L’appel est enregistré pour la SAP LUW.

Il est déclenché par :

```abap
COMMIT WORK
```

Il est supprimé par :

```abap
ROLLBACK WORK
```

Les modules Update Task doivent être conçus spécifiquement et déclarés comme modules de mise à jour dans le Function Builder.

## 🌺 UPDATE TASK LOCALE

L’instruction :

```abap
SET UPDATE TASK LOCAL.
```

demande l’exécution des modules Update Task dans le processus de travail courant au moment du commit.

Le commutateur est réinitialisé après chaque :

```text
COMMIT WORK
ROLLBACK WORK
```

Son usage doit répondre à un besoin technique explicite. Il ne doit pas être ajouté mécaniquement.

## 🌺 INTERDICTIONS DANS L’UPDATE TASK

Un module exécuté dans l’Update Task ne doit pas déclencher lui-même :

```text
COMMIT WORK
ROLLBACK WORK
```

Ces instructions provoquent des erreurs d’exécution lorsqu’elles sont utilisées dans un contexte d’update interdit.

La transaction est contrôlée par le traitement appelant.

## 🌺 COMMITS IMPLICITES

Certaines opérations et certains changements de contexte peuvent provoquer un commit de base implicite.

Exemples documentés selon le contexte ABAP :

- fin d’une étape de dialogue ;
- appels RFC qui transfèrent le contrôle à un autre processus ou système ;
- certaines opérations HTTP ou changements de contexte gérés par le framework.

> [!CAUTION]
> Un commit implicite peut couper une Database LUW.
>
> Il faut donc éviter les opérations susceptibles de provoquer un commit implicite pendant la phase de sauvegarde d’une transaction métier.

La liste exacte dépend :

- de la version ABAP ;
- du type d’appel ;
- du framework ;
- du contexte d’exécution.

Toujours consulter la documentation de l’instruction ou de l’API utilisée.

## 🌺 BAPI

Une BAPI d’écriture suit un contrat transactionnel documenté.

Dans le modèle standard courant, la BAPI d’écriture ne doit généralement pas effectuer elle-même le commit. L’appelant décide ensuite :

```text
BAPI_TRANSACTION_COMMIT
OU
BAPI_TRANSACTION_ROLLBACK
```

`BAPI_TRANSACTION_COMMIT` ne doit pas être remplacée arbitrairement par un simple `COMMIT WORK`, car elle peut également synchroniser des buffers BAPI.

> [!IMPORTANT]
> Toujours lire la documentation de la BAPI.
>
> Quelques API historiques peuvent suivre un modèle particulier explicitement documenté.

## 🌺 PROPRIÉTAIRE DE LA TRANSACTION

Le propriétaire de la transaction est le niveau qui connaît l’unité fonctionnelle complète.

Exemples :

```text
Rapport autonome
→ peut décider du commit final

Méthode de validation d’une commande
→ ne doit généralement pas committer

Méthode d’accès aux données
→ ne doit pas committer

Service orchestrant en-tête, postes et mouvements
→ peut posséder la décision transactionnelle selon le framework

Framework RAP
→ possède son propre modèle transactionnel
```

## 🌺 RAP

Dans RAP, le développeur ne doit pas transposer mécaniquement le modèle classique.

La persistance est gérée par le modèle transactionnel RAP avec notamment :

```text
COMMIT ENTITIES
ROLLBACK ENTITIES
```

Les exercices de ce dossier concernent l’ABAP classique et les tables personnalisées de formation.

## 🌺 CURSEURS DE BASE

`COMMIT WORK` ferme les curseurs de base ouverts.

Cas à ne pas utiliser :

```abap
SELECT ...
  FROM ...
  INTO ...

  COMMIT WORK.

ENDSELECT.
```

Le commit au milieu de la boucle de sélection rend la poursuite de l’accès au curseur invalide.

Pour un traitement par blocs, concevoir une pagination ou une stratégie explicite, sans commit au milieu d’un curseur ouvert.

## 🌺 MESSAGES ET FIN DE PROGRAMME

Ne pas supposer qu’une fin de programme remplace toujours un commit explicite correctement placé.

Les traitements enregistrés pour la SAP LUW, notamment l’Update Task, doivent être terminés conformément au contrat prévu.

Une erreur d’exécution peut provoquer un rollback de base implicite, mais elle ne remplace pas une gestion fonctionnelle et prévisible des erreurs.
