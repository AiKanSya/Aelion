# 🌸 EXERCICE 12 — VERROUILLAGE ET FIN DE TRANSACTION

## 🌺 OBJECTIFS

- relier transaction et verrou ;
- distinguer verrou de base et verrou SAP ;
- comprendre `_SCOPE`;
- libérer les verrous au bon moment ;
- éviter un verrou prolongé.

## 🌺 DURÉE INDICATIVE

45 à 60 minutes.

## 🌺 EXERCICE 1 — VERROU DE BASE

Répondre :

1. une écriture Open SQL acquiert-elle des verrous de base ?
2. jusqu’à quelle opération sont-ils conservés ?
3. un traitement sans commit ni rollback peut-il bloquer d’autres sessions ?
4. faut-il committer immédiatement après chaque écriture ?
5. quelle unité guide la durée ?

## 🌺 EXERCICE 2 — VERROU SAP

Un objet de verrouillage protège une donnée pendant la SAP LUW.

Le comportement à la fin dépend notamment du paramètre :

```text
_SCOPE
```

Ne pas supposer une libération identique pour tous les appels de verrouillage.

## 🌺 EXERCICE 3 — SCÉNARIO

```text
ENQUEUE
Lecture
Validation
Écriture
COMMIT
DEQUEUE selon contrat
```

Comparer avec :

```text
ENQUEUE
Écran laissé ouvert trente minutes
```

## 🌺 EXERCICE 4 — ROLLBACK

Après une erreur :

```text
ROLLBACK WORK
libération ou traitement des verrous selon leur portée
nettoyage de l’état applicatif
```

## 🌺 EXERCICE 5 — ERREUR DE CONCURRENCE

Si le verrou ne peut pas être acquis :

```text
Ne pas continuer l’écriture.
Informer l’utilisateur.
Relire plus tard.
```

## 🌺 CRITÈRES DE VALIDATION

- [ ] Les verrous de base sont reliés à la DB LUW.
- [ ] Les verrous SAP sont reliés à la SAP LUW.
- [ ] `_SCOPE` est identifié.
- [ ] La durée du verrou est limitée.
- [ ] Le commit n’est pas ajouté à chaque ligne.
- [ ] Un échec d’enqueue bloque la modification.
- [ ] Le rollback nettoie la transaction.

<details>
<summary>🍧 Afficher la solution</summary>

Règle :

```text
Acquérir le verrou le plus tard possible.
Effectuer la modification dans une durée courte.
Terminer par commit ou rollback.
Libérer selon le contrat de l’objet de verrouillage.
```

</details>
