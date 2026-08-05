# 🌸 EXERCICES — CHOISIR LA FORME DE DELETE

## 🌺 OBJECTIFS

- choisir une forme adaptée ;
- éviter une suppression trop large ;
- distinguer clés explicites et condition métier ;
- traiter un lot ;
- refuser une opération ambiguë.

## 🌺 DURÉE INDICATIVE

30 à 40 minutes.

## 🌺 EXERCICE 1 — MATRICE

| Besoin                                                    | Forme recommandée |
| --------------------------------------------------------- | ----------------- |
| Supprimer une commande par identifiant                    |                   |
| Supprimer la ligne correspondant à une structure déjà lue |                   |
| Supprimer une liste de clés prévalidées                   |                   |
| Supprimer toutes les lignes de test clôturées d’une plage |                   |
| Supprimer toutes les lignes d’une table productive        |                   |
| Supprimer une référence encore utilisée                   |                   |
| Supprimer des lignes avec un état attendu                 |                   |

## 🌺 EXERCICE 2 — FORMES

Choix possibles :

```text
DELETE FROM ... WHERE
DELETE dbtab FROM @wa
DELETE dbtab FROM TABLE @itab
Refus fonctionnel
Procédure exceptionnelle approuvée
```

## 🌺 EXERCICE 3 — SUPPRESSION GÉNÉRALE

Une demande indique :

```text
Nettoyer la table.
```

Répondre :

1. la demande définit-elle le périmètre ?
2. faut-il exécuter `DELETE FROM dbtab` ?
3. quelles précisions sont nécessaires ?
4. quelles protections doivent être prévues ?
5. quel environnement et quelle sauvegarde doivent être considérés ?

## 🌺 EXERCICE 4 — CRITÈRE NON UNIQUE

Besoin :

```text
Supprimer la commande 9300000070.
```

Code proposé :

```abap
DELETE FROM zt_<tri>_ord
  WHERE status = 'N'.
```

Diagnostiquer :

- symptôme ;
- cause ;
- correction ;
- test nominal ;
- test limite.

## 🌺 CRITÈRES DE VALIDATION

- [ ] La suppression par identifiant est ciblée.
- [ ] La structure est utilisée pour une clé lue.
- [ ] La table interne est utilisée pour un lot de clés.
- [ ] La condition est utilisée pour une règle multi-lignes.
- [ ] Une suppression générale est refusée sans procédure.
- [ ] Une référence utilisée n’est pas supprimée.
- [ ] Le critère non unique est corrigé.

<details>
<summary>🍧 Afficher la solution</summary>

| Besoin              | Forme                                     |
| ------------------- | ----------------------------------------- |
| Une commande par ID | `DELETE FROM ... WHERE order_id = ...`    |
| Structure lue       | `DELETE dbtab FROM @wa`                   |
| Liste de clés       | `DELETE dbtab FROM TABLE @itab`           |
| Règle multi-lignes  | `DELETE FROM ... WHERE ...`               |
| Toute une table     | Procédure exceptionnelle, pas un exercice |
| Référence utilisée  | Refus fonctionnel                         |
| État attendu        | `WHERE clé AND état`                      |

</details>
