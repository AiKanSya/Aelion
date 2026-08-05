# 🌸 EXERCICES — TOTALS ET CONTRÔLES NUMÉRIQUES

## 🌺 OBJECTIFS

- préparer un export minimal ;
- vérifier les lignes et colonnes ;
- choisir un format disponible ;
- contrôler le fichier obtenu ;
- appliquer les règles de confidentialité ;
- distinguer export ponctuel et interface automatisée.

## 🌺 DURÉE INDICATIVE

40 à 55 minutes.

## 🌺 PÉRIMÈTRE AUTORISÉ

Exporter uniquement depuis :

```text
ZT_<TRI>_ORD
```

Colonnes autorisées :

```text
ORDER_ID
STATUS
AMOUNT
CURRENCY
```

Ne pas exporter :

```text
CUSTOMER_NAME
CREATED_BY
MANDT
```

même si ces données sont pédagogiques.

## 🌺 EXERCICE 1 — PRÉPARATION

Sélectionner :

```text
CURRENCY = EUR
```

Colonnes :

```text
ORDER_ID
STATUS
AMOUNT
CURRENCY
```

Nombre attendu :

```text
2 lignes
```

## 🌺 EXERCICE 2 — CHECKLIST AVANT EXPORT

Compléter :

| Contrôle                  | Validé |
| ------------------------- | ------ |
| Table autorisée           |        |
| Filtres vérifiés          |        |
| Deux lignes attendues     |        |
| Colonnes minimales        |        |
| Absence de nom client     |        |
| Absence d’utilisateur SAP |        |
| Destination autorisée     |        |
| Format choisi             |        |

## 🌺 EXERCICE 3 — EXPORT

Utiliser la fonction d’export vers feuille de calcul disponible dans le système.

Nom du fichier :

```text
SE16N_<TRI>_ORDERS_EUR.<extension>
```

L’extension dépend du format proposé.

## 🌺 EXERCICE 4 — CONTRÔLE DU FICHIER

Ouvrir le fichier et vérifier :

- quatre colonnes ;
- deux lignes de données ;
- identifiants complets ;
- montants lisibles ;
- devise présente ;
- absence des champs interdits.

## 🌺 EXERCICE 5 — FORMAT ET ZÉROS INITIAUX

Observer le comportement de :

```text
0000000001
0000000002
```

Répondre :

1. le tableur conserve-t-il les zéros initiaux ?
2. le champ a-t-il été interprété comme un nombre ?
3. comment importer ou formater la colonne pour conserver un identifiant textuel ?
4. pourquoi le fichier exporté ne doit-il pas être considéré automatiquement comme une copie fidèle des types SAP ?

## 🌺 EXERCICE 6 — EXPORT OU INTERFACE

Choisir :

| Besoin                                       | Solution                     |
| -------------------------------------------- | ---------------------------- |
| Analyse ponctuelle de deux lignes autorisées | Export `SE16N`               |
| Extraction quotidienne automatisée           | Programme ou interface       |
| Fichier métier avec contrôles et traçabilité | Programme dédié              |
| Partage de données sensibles                 | Processus de gouvernance     |
| Correction de données depuis Excel           | Application métier autorisée |

## 🌺 EXERCICE 7 — SUPPRESSION DU FICHIER

Après validation, supprimer le fichier local si la politique de formation l’exige.

Ne pas envoyer le fichier par messagerie ou outil collaboratif sans autorisation.

## 🌺 CRITÈRES DE VALIDATION

- [ ] L’export est limité aux données autorisées.
- [ ] Les colonnes personnelles ou techniques inutiles sont absentes.
- [ ] Le nombre de lignes est vérifié.
- [ ] Les zéros initiaux sont contrôlés.
- [ ] L’export n’est pas utilisé comme interface récurrente.
- [ ] Le fichier respecte la politique de stockage.

<details>
<summary>🍧 Afficher la solution</summary>

Fichier attendu :

| ORDER_ID     | STATUS |   AMOUNT | CURRENCY |
| ------------ | ------ | -------: | -------- |
| `0000000001` | `N`    | `125,50` | `EUR`    |
| `0000000002` | `P`    |  `75,00` | `EUR`    |

Les identifiants doivent être traités comme du texte dans le tableur afin de conserver les zéros initiaux.

</details>
