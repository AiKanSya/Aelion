# 🌸 SOMMAIRE — └─ 🧩 01 - SELECT

## 🌺 OBJECTIF DU PARCOURS

Ces exercices renforcent la lecture de données avec ABAP SQL :

1. `SELECT` ;
2. `SELECT SINGLE` ;
3. sélection de plusieurs lignes et `SELECT *` ;
4. `DISTINCT` ;
5. alias de colonnes avec `AS` ;
6. source de données et alias après `FROM` ;
7. jointures ;
8. cibles `INTO` et `APPENDING` ;
9. filtrage avec `WHERE` ;
10. `FOR ALL ENTRIES` ;
11. tri avec `ORDER BY`.

Le stagiaire doit être capable de construire une lecture correcte, déterministe, limitée au besoin et compatible avec le type de la cible ABAP.

## 🌺 COURS ASSOCIÉS

- `10 - DBTAB INSTRUCTIONS/01 - SELECT/01 - 🍧 SELECT.md`
- `10 - DBTAB INSTRUCTIONS/01 - SELECT/02 - 🍧 SELECT SINGLE.md`
- `10 - DBTAB INSTRUCTIONS/01 - SELECT/03 - 🍧 SELECT ALL.md`
- `10 - DBTAB INSTRUCTIONS/01 - SELECT/04 - 🍧 SELECT DISTINCT.md`
- `10 - DBTAB INSTRUCTIONS/01 - SELECT/05 - 🍧 SELECT AS.md`
- `10 - DBTAB INSTRUCTIONS/01 - SELECT/06 - 🍧 FROM.md`
- `10 - DBTAB INSTRUCTIONS/01 - SELECT/07 - 🍧 JOIN.md`
- `10 - DBTAB INSTRUCTIONS/01 - SELECT/08 - 🍧 INTO.md`
- `10 - DBTAB INSTRUCTIONS/01 - SELECT/09 - 🍧 WHERE.md`
- `10 - DBTAB INSTRUCTIONS/01 - SELECT/10 - 🍧 FOR ALL ENTRIES.md`
- `10 - DBTAB INSTRUCTIONS/01 - SELECT/11 - 🍧 ORDER BY.md`

## 🌺 PROGRAMME UTILISÉ

Créer le programme exécutable suivant :

```text
ZAELION_<TRI>_SELECT
```

Remplacer `<TRI>` par le trigramme attribué.

Enregistrer le programme dans le package et l’ordre de transport utilisés pour les exercices précédents.

## 🌺 TABLES UTILISÉES

Les exercices réutilisent les tables créées dans `08 - SE11`.

### Table des commandes

```text
ZT_<TRI>_ORD
```

Champs principaux :

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

## 🌺 DONNÉES DE RÉFÉRENCE

### Statuts

| Statut | Libellé        |
| ------ | -------------- |
| `N`    | Nouvelle       |
| `P`    | En préparation |
| `C`    | Clôturée       |

### Commandes

| Commande     | Client        | Priorité | Statut |  Montant | Devise |
| ------------ | ------------- | -------: | ------ | -------: | ------ |
| `0000000001` | Alice Martin  |      `2` | `N`    | `125,50` | `EUR`  |
| `0000000002` | Bruno Bernard |      `3` | `P`    |  `75,00` | `EUR`  |
| `0000000003` | Claire Martin |      `1` | `C`    |  `50,00` | `USD`  |

Les dates et utilisateurs de création dépendent de l’exécution réalisée dans le dossier `08 - SE11`.

> [!IMPORTANT]
> Relever les valeurs réellement présentes dans le système avant les exercices.  
> Adapter uniquement les résultats attendus concernés si le jeu de données a été modifié.

## 🌺 RÈGLES COMMUNES

- Utiliser uniquement les tables `Z` attribuées.
- Ne jamais modifier une table standard SAP.
- Ne réaliser aucune écriture dans ce dossier.
- Sélectionner uniquement les colonnes nécessaires.
- Ajouter un filtre lorsque le besoin ne porte pas réellement sur toutes les lignes.
- Utiliser la syntaxe moderne avec :
  - virgules dans la liste de sélection ;
  - `@` devant les variables hôtes ;
  - clause `INTO` placée à la fin.
- Contrôler `sy-subrc` immédiatement après le `SELECT`.
- Utiliser la cible uniquement lorsque la lecture a réussi.
- Utiliser `sy-dbcnt` immédiatement si le nombre de lignes traitées est requis.
- Ne jamais supposer un ordre sans `ORDER BY`.
- Ne jamais utiliser `SELECT SINGLE` pour choisir arbitrairement une ligne parmi plusieurs.
- Ne jamais exécuter volontairement un `FOR ALL ENTRIES` avec une table pilote vide.
- Ne jamais placer un `SELECT SINGLE` ou un `SELECT` répétitif dans une boucle sans avoir analysé une lecture en masse.
- Exécuter les cas nominaux, les cas absents et les cas limites.
- Conserver une preuve vérifiable : code, résultat ou explication structurée.

> [!NOTE]
> La syntaxe disponible dépend de la version ABAP du système.  
> En cas de différence, consulter l’aide F1 synchronisée avec le système cible.

---

# 🌸 RECTIFICATIONS TECHNIQUES APPLIQUÉES

## 🌺 `SELECT` MULTI-LIGNES

Un `SELECT` qui retourne plusieurs lignes doit généralement écrire directement dans une table interne :

```abap
SELECT ...
  FROM ...
  WHERE ...
  INTO TABLE @DATA(lt_result).
```

Si la cible est une structure ou plusieurs variables et que ni `SINGLE` ni une cible table ne sont utilisés, le `SELECT` ouvre une boucle qui doit être fermée avec :

```abap
ENDSELECT.
```

Pour les lectures en masse, `INTO TABLE` est privilégié dans les exercices.

## 🌺 CHAPITRE « SELECT ALL »

Le titre historique `SELECT ALL` regroupe deux notions différentes :

```text
Plusieurs lignes
→ SELECT ... INTO TABLE

Toutes les colonnes
→ SELECT *
```

L’exercice n’emploie pas un mot-clé autonome `ALL`.

Un `SELECT *` lit toutes les colonnes de chaque ligne sélectionnée. Il n’implique pas automatiquement la lecture de toutes les lignes : la clause `WHERE` reste indépendante.

## 🌺 `SELECT SINGLE`

`SELECT SINGLE` retourne au plus une ligne.

Lorsque la condition ne couvre pas une clé unique et que plusieurs lignes correspondent, la ligne obtenue n’est pas déterminée par un ordre métier.

Pour choisir une ligne selon un ordre, utiliser :

```text
ORDER BY
+
UP TO 1 ROWS
```

avec une cible table ou une boucle `SELECT` correctement fermée.

## 🌺 `DISTINCT`

`DISTINCT` supprime les doublons du résultat selon la combinaison complète des colonnes sélectionnées.

Il ne modifie pas la table source.

## 🌺 JOINTURES

Les exercices utilisent principalement :

```text
INNER JOIN
LEFT OUTER JOIN
```

`RIGHT OUTER JOIN` est disponible sur les versions ABAP SQL compatibles. Une jointure droite peut également être réécrite en jointure gauche en inversant les sources, ce qui facilite souvent la lecture.

Dans une jointure externe, les colonnes sans ligne correspondante produisent des valeurs nulles au niveau SQL. Dans une cible ABAP classique sans indicateur de nullité, elles sont généralement représentées par la valeur initiale du type.

## 🌺 `INTO TABLE` ET `APPENDING TABLE`

```abap
INTO TABLE @lt_result
```

remplace le contenu de la table cible par le résultat.

```abap
APPENDING TABLE @lt_result
```

ajoute le résultat aux lignes déjà présentes.

## 🌺 TABLES DE SÉLECTION AVEC `IN`

Une table de sélection initiale utilisée dans :

```abap
WHERE column IN @range_table
```

ne restreint pas les lignes : l’expression est vraie.

Ce comportement permet de rendre un critère `SELECT-OPTIONS` facultatif sans construire systématiquement une requête dynamique.

## 🌺 `FOR ALL ENTRIES`

La condition est évaluée pour les lignes de la table pilote et les ensembles de résultats sont réunis.

Si la table pilote est vide, la condition `FOR ALL ENTRIES` est ignorée. La lecture peut alors retourner toutes les lignes satisfaisant les autres conditions.

Les doublons du résultat sont supprimés selon les règles de `FOR ALL ENTRIES`.

> [!CAUTION]
> Le contrôle de la table pilote est obligatoire.

## 🌺 ORDRE

Sans `ORDER BY`, l’ordre des lignes retournées par la base n’est pas garanti.

L’ordre observé pendant un test ne constitue pas un contrat fonctionnel.
