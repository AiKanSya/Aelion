# 🌸 COMMENTAIRES IN ABAP

## 🌺 OBJECTIFS

- [ ] Comprendre le rôle des `COMMENTAIRES` dans le code ABAP
- [ ] Identifier les différents types de `COMMENTAIRES`
- [ ] Savoir appliquer les conventions de bonne pratique

## 🌺 RACCOURCIS

- `[ CTRL ]` + `[ ? ]` commente automatiquement la ligne sélectionnée
- `[ CTRL ]` + `[ ; ]` décommente automatiquement la ligne sélectionnée

## 🌺 DEFINITION

> Un `COMMENTAIRE` en ABAP est une ligne ou un bloc de texte ignoré par le système d’exécution.  
> Son seul rôle est d’expliquer le code pour les humains.  
> Un bon `COMMENTAIRE` [!TIP] à comprendre pourquoi un code existe, pas seulement ce qu’il fait.

> [!TIP]
> Un `COMMENTAIRE`, c’est une [!NOTE] dans la marge d’un plan d’ingénieur.  
> Le plan construit la machine (le code), la [!NOTE] explique la raison de chaque pièce.

## 🌺 EXPLICATION

Les `COMMENTAIRES` sont essentiels pour :

- faciliter la lecture du code par un autre développeur,
- [!TIP]r à la maintenance dans le temps,
- documenter les choix techniques,
- rendre visible la structure logique d’un programme.

> [!TIP]
> En entreprise, le code ABAP est rarement lu par son auteur après quelques semaines.  
> Les ``COMMENTAIRES` garantissent la continuité de compréhension collective.

## 🌺 TYPES DE COMMENTAIRES

### 1. COMMENTAIRE SUR LIGNE UNIQUE

Utiliser le symbole `*` en première colonne (en début de ligne).  
Tout ce qui suit sur la ligne est ignoré par le système.

    * Déclaration d’une variable
    DATA: lv_age TYPE i.

> [!NOTE]
> Le `*` doit être placé dans la première colonne (en début de ligne), sinon SAP peut interpréter la ligne comme du code.

### 2. COMMENTAIRE DE FIN DE LIGNE

Utiliser le symbole `"` (guillemet double) pour commenter après une instruction.

    DATA: lv_variable TYPE string.          "Variable pour stocker le prénom
    CONSTANTS: lc_age TYPE i VALUE 30.      "Âge fixe pour test

> [!IMPORTANT]
> Les `COMMENTAIRES` de fin de ligne expliquent le rôle exact d’une variable ou d’une instruction sans casser la lecture du code.

### 3. COMMENTAIRE MULTILIGNE STRUCTURÉ

Utiliser `*&` pour construire des blocs visuels de `COMMENTAIRE`.  
Cette méthode est utilisée pour les cartouches, les sections ou les explications longues.

    *&---------------------------------------------------------------------*
    *& Déclaration des constantes globales
    *&---------------------------------------------------------------------*

    CONSTANTS: lc_limit TYPE i VALUE 100.

> [!TIP]
> Penser à une pancarte sur un chantier : le bloc `*&---*` signale une zone importante du code.

## 🌺 LONGUEUR MAXIMALE

SAP limite techniquement la lecture à 72–76 caractères par ligne.  
Les `COMMENTAIRES` trop longs peuvent être tronqués.

> [!WARNING]
> Un texte coupé peut rendre le `COMMENTAIRE` incohérent.  
> Mieux vaut plusieurs lignes brèves et alignées qu’une phrase trop longue.

## 🌺 BONNES PRATIQUES

| 🍧 Bonne pratique                                         | 🍧 Explication                                             |
| --------------------------------------------------------- | ---------------------------------------------------------- |
| Commencer les `COMMENTAIRES` par une majuscule            | Améliore la lisibilité                                     |
| Limiter à une seule idée par ligne                        | Évite les surcharges visuelles                             |
| Mettre à jour les `COMMENTAIRES` après toute modification | Empêche les incohérences code/documentation                |
| Aligner les `COMMENTAIRES` dans les blocs                 | Améliore la structure visuelle du code                     |
| Ne pas sur-commenter le code évident                      | Favorise la clarté : commenter l’intention, pas la syntaxe |

> [!CAUTION]
> Trop de `COMMENTAIRES` "inutiles" peuvent polluer la lecture du code.  
> Un bon `COMMENTAIRE` répond à la question : _Pourquoi ce code existe-t-il ?_

## 🌺 EXEMPLE

    * Déclaration d'une variable pour stocker le prénom
    DATA: lv_firstname TYPE string VALUE 'Alice'.     "Variable prénom

    * Afficher le message à l’écran
    WRITE: / 'Bonjour', lv_firstname, '!'.            "Affiche Bonjour Alice

## 🌺 RESUME

> - Les `COMMENTAIRES` documentent le code sans être exécutés.
> - Utiliser `*` pour une ligne entière, `"` pour la fin de ligne, `*&` pour un bloc.
> - Respecter la limite de longueur et mettre à jour les `COMMENTAIRES` lors de chaque évolution.
> - La cartouche standard doit être présente dans tout programme.
> - Le bon `COMMENTAIRE` explique l’intention, pas la syntaxe.
