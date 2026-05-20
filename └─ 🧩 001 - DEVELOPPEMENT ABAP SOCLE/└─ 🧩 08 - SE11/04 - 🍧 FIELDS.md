# 🌸 CHAMPS / ZONES / FIELDS

## 🌺 OBJECTIFS

- [ ] Comprendre ce qu’est un `CHAMP` dans SAP
- [ ] Identifier la relation entre `CHAMP`, `ELEMENT DE DONNEE` et `DOMAINE`
- [ ] Savoir créer et modifier des `CHAMPS` dans SE11
- [ ] Différencier l’affichage des `CHAMPS` dans les tables et les structures

## 🌺 DEFINITION

> [!TIP]
> Imaginez une feuille Excel
>
> - chaque colonne (ex : Nom, Prénom, Date de naissance) est un `CHAMP` ;
> - le type de la colonne (texte, nombre, date) est défini par le `DOMAINE` ;
> - l’étiquette affichée (Nom du client, Âge, etc.) est définie par l’`ELEMENT DE DONNEE`.

> - Un `CHAMP` est une zone de stockage d’information dans une table ou une structure.
> - Chaque `CHAMP` est lié à un `ELEMENT DE DONNEE`, qui lui-même est lié à un `DOMAINE`.
> - Le `CHAMP` définit le contenu exact, la longueur, le type et l’affichage de la donnée.
>
> Un `CHAMP` (ou zone) dans SAP correspond à une colonne spécifique d’une table ou d’une structure.  
> Chaque `CHAMP` contient une information précise et est lié à un `ELEMENT DE DONNEE` et à un `DOMAINE` qui définissent son type et ses caractéristiques.

> [!NOTE]
> Dans la table `MARA` (données de matériaux)
>
> - Le `CHAMP` `MATNR` correspond à l’identifiant du matériau.
> - Le `DOMAINE` définit sa longueur (CHAR 18).
> - L’`ELEMENT DE DONNEE` définit son étiquette d’affichage (“Numéro de matériel”).

> [!IMPORTANT]
> Le `CHAMP` est la colonne physique dans la base de données.  
> L’`ELEMENT DE DONNEE` est la description fonctionnelle du `CHAMP`.  
> Le `DOMAINE` définit la nature technique de la valeur autorisée.

> [!NOTE]
> Un même `DOMAINE` peut être partagé entre plusieurs `CHAMPS` (ex : ID client, ID fournisseur),  
> mais chaque `CHAMP` a sa propre signification via son `ELEMENT DE DONNEE`.

## 🌺 CHAMPS DANS SE11 (STRUCTURES)

> Dans la transaction SE11, lorsqu’on ouvre une structure, chaque ligne du tableau de définition correspond à un `CHAMP`.
>
> On y retrouve les colonnes
>
> - Nom du `CHAMP`
> - `ELEMENT DE DONNEE` associé
> - Description du `CHAMP`
> - `DOMAINE` sous-jacent

> [!TIP]
> Une structure est comme un formulaire papier
> chaque case à remplir (`CHAMP`) possède des règles précises (`DOMAINE`) et un libellé clair (`ELEMENT DE DONNEE`).

> [!IMPORTANT]
> Les structures permettent de définir des ensembles de `CHAMPS` utilisés dans plusieurs tables ou programmes.  
> Ainsi, si un même groupe de `CHAMPS` doit être réutilisé ailleurs, on peut référencer la structure au lieu de tout redéfinir.

> [!TIP]
>
> - Pour visualiser les détails d’un `CHAMP` dans SE11, double-cliquez sur le nom de l’`ELEMENT DE DONNEE`.
> - Pour connaître son type exact, double-cliquez sur le `DOMAINE` associé.

## 🌺 CHAMPS DANS SE16N (TABLES DE DONNÉES)

> Dans SE16N, chaque `CHAMP` correspond à une colonne de la table.  
> Vous pouvez visualiser, filtrer ou saisir des valeurs dans ces `CHAMPS` pour interroger ou mettre à jour les données.

> [!TIP]
> Chaque colonne dans SE16N est comparable à une colonne Excel.  
> Vous pouvez y trier, filtrer ou saisir des valeurs, mais la forme des données (longueur, type, unité) reste contrôlée par le `DOMAINE` et l’`ELEMENT DE DONNEE`.

> [!CAUTION]
>
> - Les modifications dans SE16N affectent les données réelles de la base SAP.
> - Il faut éviter d’éditer directement dans SE16N sans autorisation, car une mauvaise valeur peut provoquer des incohérences.

> [!IMPORTANT]
> SE16N est un outil d’analyse de données, pas un outil de conception.  
> Les `CHAMPS` y apparaissent avec leurs libellés issus des éléments de données, ce qui rend la lecture plus intuitive.

## 🌺 LIEN ENTRE CHAMP, ELEMENT DE DONNEES ET DOMAINE

| 🍧 Niveau           | 🍧 Rôle                                           | 🍧 Exemple           |
| ------------------- | ------------------------------------------------- | -------------------- |
| `DOMAINE`           | Définit le type technique (CHAR, NUMC, etc.)      | CHAR(10)             |
| `ELEMENT DE DONNEE` | Définit la signification fonctionnelle du `CHAMP` | “Identifiant client” |
| `CHAMP`             | Colonne concrète dans une table SAP               | `KUNNR` dans `KNA1`  |

> [!IMPORTANT]
> Ce lien hiérarchique assure la cohérence et la réutilisation des définitions.  
> Ainsi, si un `DOMAINE` change (par exemple la longueur d’un identifiant),  
> tous les `CHAMPS` utilisant ce `DOMAINE` bénéficieront de la même mise à jour technique.

## 🌺 UTILISATION CONSEILLÉE

> Utilisation conseillée
>
> - Nommer les `CHAMPS` avec des préfixes explicites (ex : `ZCLIENT_ID`, `ZCITY_NAME`)
> - Réutiliser les éléments de données existants pour garder la cohérence du dictionnaire
> - Ne jamais créer un `CHAMP` sans `DOMAINE` ni `ELEMENT DE DONNEE` (évite les incohérences)
> - Documenter systématiquement chaque `CHAMP` dans SE11 (onglet “Documentation”)

> [!TIP]
> En cas de doute sur la signification d’un `CHAMP`, consultez
>
> - SE11 → double-cliquez sur l’`ELEMENT DE DONNEE`
> - Cas d’emploi (`Ctrl` + `Shift` + `F3`) pour savoir où il est utilisé dans le système

## 🌺 RESUME

> - Chaque `CHAMP` = 1 colonne physique dans une table ou structure
> - Chaque `CHAMP` est défini par un `ELEMENT DE DONNEE`
> - Chaque `ELEMENT DE DONNEE` s’appuie sur un `DOMAINE`
> - Dans SE11, les `CHAMPS` sont visibles dans les structures
> - Dans SE16N, ils apparaissent comme colonnes manipulables

> [!NOTE]
> Cette hiérarchie (`CHAMP` → `ELEMENT DE DONNEE` → `DOMAINE`) est fondamentale pour comprendre la logique du Data Dictionary SAP.  
> Elle assure que toutes les données du système parlent le même langage, aussi bien pour les développeurs que pour les utilisateurs métier.
