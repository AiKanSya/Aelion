# 🌸 EXERCICE — CONSTRUCTION D’UN SELECTION-SCREEN

## 🌺 OBJECTIFS

- créer des blocs ;
- utiliser des titres ;
- structurer les critères ;
- utiliser un commentaire et une ligne ;
- distinguer structure visuelle et logique métier ;
- maintenir les textes.

## 🌺 DURÉE INDICATIVE

45 à 60 minutes.

## 🌺 EXERCICE 1 — BLOCS

Créer :

```abap
SELECTION-SCREEN BEGIN OF BLOCK b01
  WITH FRAME TITLE text-b01.

  " Critères

SELECTION-SCREEN END OF BLOCK b01.

SELECTION-SCREEN BEGIN OF BLOCK b02
  WITH FRAME TITLE text-b02.

  " Options

SELECTION-SCREEN END OF BLOCK b02.
```

Symboles de texte :

```text
TEXT-B01 = Critères de sélection
TEXT-B02 = Options d’affichage
```

## 🌺 EXERCICE 2 — CONTENU

Bloc `b01` :

```text
Commandes
Statuts
Devises
Dates de création
Nom du client
```

Bloc `b02` :

```text
Nombre maximal
Mode ALV ou liste
Afficher les détails techniques
```

## 🌺 EXERCICE 3 — COMMENTAIRE

Ajouter :

```abap
SELECTION-SCREEN COMMENT /1(70) text-i01.
```

Texte :

```text
Au moins un critère doit être renseigné.
```

## 🌺 EXERCICE 4 — LIGNE

Créer une ligne contenant deux éléments courts :

```abap
SELECTION-SCREEN BEGIN OF LINE.

  SELECTION-SCREEN COMMENT 1(15) text-l01
    FOR FIELD p_max.

  PARAMETERS p_max TYPE i DEFAULT 100.

SELECTION-SCREEN END OF LINE.
```

Vérifier le rendu dans le thème SAP GUI utilisé.

## 🌺 EXERCICE 5 — TEXTES

Maintenir :

- titre du report ;
- textes de sélection ;
- symboles de texte ;
- message utilisateur.

Répondre :

1. pourquoi ne pas afficher `P_MAX` à l’utilisateur ?
2. quel avantage possède le texte DDIC ?
3. faut-il traduire les textes personnalisés ?
4. un commentaire codé en dur est-il adapté à une application multilingue ?
5. où maintenir les textes du programme ?

## 🌺 EXERCICE 6 — DIAGNOSTIC DE LARGEUR

Créer volontairement un commentaire trop court.

Observer :

- texte tronqué ;
- alignement ;
- chevauchement éventuel.

Corriger la longueur.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Deux blocs sont créés.
- [ ] Les titres sont maintenus.
- [ ] Les critères et options sont séparés.
- [ ] Un commentaire est affiché.
- [ ] Une ligne personnalisée est créée.
- [ ] Les textes techniques ne sont pas exposés.
- [ ] Le cas tronqué est corrigé.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
SELECTION-SCREEN BEGIN OF BLOCK b01
  WITH FRAME TITLE text-b01.

  SELECTION-SCREEN COMMENT /1(70) text-i01.

SELECTION-SCREEN END OF BLOCK b01.

SELECTION-SCREEN BEGIN OF BLOCK b02
  WITH FRAME TITLE text-b02.

  SELECTION-SCREEN BEGIN OF LINE.

    SELECTION-SCREEN COMMENT 1(20) text-l01
      FOR FIELD p_max.

    PARAMETERS p_max TYPE i DEFAULT 100.

  SELECTION-SCREEN END OF LINE.

SELECTION-SCREEN END OF BLOCK b02.
```

</details>
