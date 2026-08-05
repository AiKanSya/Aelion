# 🌸 SOMMAIRE — └─ 🧩 09 - SE16N

## 🌺 OBJECTIF DU PARCOURS

Ces exercices renforcent l’utilisation de la transaction `SE16N` pour consulter et analyser le contenu des tables et vues SAP.

Le stagiaire doit être capable de :

- distinguer la définition d’un objet DDIC de son contenu ;
- identifier la bonne table avant toute consultation ;
- limiter une sélection avant son exécution ;
- utiliser les critères simples et les sélections multiples ;
- distinguer valeur interne et valeur affichée ;
- sélectionner uniquement les colonnes utiles ;
- analyser le résultat dans la grille ALV ;
- exporter uniquement des données autorisées et nécessaires ;
- rapprocher un résultat `SE16N` d’une lecture Open SQL ;
- diagnostiquer un résultat vide, incomplet ou incohérent ;
- identifier un défaut d’autorisation sans chercher à le contourner ;
- expliquer les risques de performance et de confidentialité ;
- utiliser `SE16N` comme outil de diagnostic, et non comme substitut à une application métier.

## 🌺 COURS ASSOCIÉ

- `09 - SE16N/01 - 🍧 SE16N.md`

## 🌺 OBJETS UTILISÉS

Les exercices utilisent principalement les objets personnalisés créés dans le dossier `08 - SE11` :

```text
ZT_<TRI>_STAT
ZT_<TRI>_ORD
ZP_<TRI>_ORD
ZV_<TRI>_ORD
```

Remplacer `<TRI>` par le trigramme attribué.

Programme de comparaison :

```text
ZAELION_<TRI>_SE16N
```

## 🌺 DONNÉES DE RÉFÉRENCE

La table `ZT_<TRI>_STAT` doit contenir :

| Statut | Libellé        |
| ------ | -------------- |
| `N`    | Nouvelle       |
| `P`    | En préparation |
| `C`    | Clôturée       |

La table `ZT_<TRI>_ORD` doit contenir au minimum :

| Commande     | Client        | Priorité | Statut |  Montant | Devise |
| ------------ | ------------- | -------: | ------ | -------: | ------ |
| `0000000001` | Alice Martin  |      `2` | `N`    | `125,50` | `EUR`  |
| `0000000002` | Bruno Bernard |      `3` | `P`    |  `75,00` | `EUR`  |
| `0000000003` | Claire Martin |      `1` | `C`    |  `50,00` | `USD`  |

Les noms, dates et montants peuvent différer si les données ont été adaptées pendant le dossier `08 - SE11`. Dans ce cas, relever les valeurs réellement présentes avant de poursuivre.

## 🌺 RÈGLES DE SÉCURITÉ

> [!CAUTION]
> Tous les exercices sont réalisés en **lecture seule**.
>
> Ne pas utiliser de fonction de modification directe de table, de mode caché, de débogage ou de contournement d’autorisation.

- Consulter uniquement les tables autorisées par le formateur.
- Ne jamais modifier une table standard SAP.
- Ne jamais exporter des données personnelles, financières ou confidentielles sans autorisation.
- Ne jamais élargir soi-même ses autorisations.
- Utiliser les tables `Z` de formation pour les exports.
- Fixer une limite de résultats avant toute consultation large.
- Utiliser des critères de sélection aussi précis que possible.
- Ne pas lancer une sélection non filtrée sur une table volumineuse.
- Ne pas conclure à une incohérence fonctionnelle avant d’avoir vérifié :
  - le mandant ;
  - la table ;
  - les critères ;
  - le format interne ;
  - les autorisations ;
  - la date de mise à jour des données.

> [!IMPORTANT]
> SAP décrit le Data Browser comme un outil de développement et non comme un outil universel de requête destiné à tous les utilisateurs. L’accès direct aux tables doit rester limité, autorisé et justifié.

## 🌺 RECTIFICATIONS TECHNIQUES APPLIQUÉES

### Consultation et maintenance

`SE16N` sert principalement à afficher et analyser le contenu d’une table ou d’une vue.

La maintenance fonctionnelle de données doit passer par :

- une transaction métier ;
- une application dédiée ;
- un dialogue de maintenance autorisé ;
- un programme contrôlé.

L’existence technique d’une possibilité de modification ne rend pas son usage légitime.

### Autorisations

L’accès générique aux tables peut notamment être contrôlé par :

```text
S_TABU_DIS
S_TABU_NAM
```

Pour certaines opérations sur des tables indépendantes du mandant, des contrôles supplémentaires peuvent intervenir, notamment :

```text
S_TABU_CLI
```

Le résultat exact dépend des rôles, du paramétrage de sécurité et de la version du système.

### Affichage et export

Le tri, le filtrage local, le total et le changement de disposition agissent sur le résultat affiché.

Ils ne compensent pas une sélection initiale trop large.

L’export doit être précédé d’un contrôle :

```text
table correcte
colonnes minimales
lignes minimales
absence de données interdites
destination autorisée
```

### Raccourcis

Les raccourcis clavier et les libellés de menus peuvent varier selon :

- la version SAP GUI ;
- la langue ;
- la personnalisation ;
- le thème ;
- les autorisations.

Les exercices indiquent les actions fonctionnelles, sans imposer un raccourci autre que l’exécution standard `F8`.
