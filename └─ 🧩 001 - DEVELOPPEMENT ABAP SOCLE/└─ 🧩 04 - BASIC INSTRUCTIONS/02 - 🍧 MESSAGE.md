# 🌸 MESSAGES

## 🌺 OBJECTIFS

- [ ] Comprendre l’utilisation des `MESSAGES` SAP en ABAP
- [ ] Identifier les différents types de `MESSAGES` : Informative, Warning, Error, Success
- [ ] Savoir utiliser l’option DISPLAY LIKE pour changer l’apparence
- [ ] Créer et référencer des `ELEMENTS DE TEXTE` pour les `MESSAGES`
- [ ] Créer et utiliser des `MESSAGES` via la transaction SE91

## 🌺 DEFINITION

> Un `MESSAGE` est une instruction ABAP permettant d’afficher une information à l’utilisateur pendant l’exécution d’un programme.  
> Les `MESSAGES` peuvent être informative, avertissement, erreur ou succès, chacun avec un impact différent sur le programme.

> [!TIP]
> Un MESSAGE est comme un panneau lumineux : selon sa couleur et sa position, il attire plus ou moins l’attention et peut bloquer ou non l’action de l’utilisateur.

## 🌺 TYPES DE MESSAGES

### MESSAGE INFORMATIF (I)

    WRITE:/ '     - MESSAGE TYPE I...'.

    MESSAGE 'Ceci est un MESSAGE informatif.' TYPE 'I'.

- Affiche une fenêtre popup simple ou un `MESSAGE` en bas à gauche.

> [!TIP]
> post-it sur le tableau indiquant une information non urgente.

### MESSAGE WARNING (W)

    WRITE:/ '     - MESSAGE TYPE W...'.

    MESSAGE 'Attention : Opération risquée !' TYPE 'W'.

- `MESSAGE` jaune ou rouge, mais non bloquant.

> [!TIP]
> signal lumineux clignotant pour attirer l’attention.

### MESSAGE ERROR (E)

    WRITE:/ '     - MESSAGE TYPE E...'.

    MESSAGE 'Erreur : Opération impossible.' TYPE 'E'.

- `MESSAGE` rouge bloquant la suite du programme.

> [!TIP]
> feu rouge ; l’utilisateur doit corriger avant de continuer.

### MESSAGE SUCCESS (S)

    WRITE:/ '     - MESSAGE TYPE I...'.

    MESSAGE 'Succès.' TYPE 'S'.

- `MESSAGE` vert indiquant réussite.

> [!TIP]
> feu vert ou badge de validation.

## 🌺 UTILISATION DE DISPLAY LIKE

Permet d’afficher un `MESSAGE` d’un type différent de son type réel :

    WRITE:/ '     - MESSAGE DISPLAY LIKE...'.

    MESSAGE 'Ceci est un MESSAGE informatif.' TYPE 'I' DISPLAY LIKE 'S'.

> [!TIP]
> changer la couleur du panneau lumineux sans changer le contenu du MESSAGE/comportement.

## 🌺 ELEMENTS DE TEXTE POUR MESSAGES

![](./assets/images/Capture%20d’écran%202025-10-31%20150238.png)

- Utiliser les `ELEMENTS DE TEXTE` rend les `MESSAGES` dynamiques et modifiables sans toucher au code.
- Étapes :

1.  Ouvrir l’option Saut → `ELEMENTS DE TEXTE` dans un programme modifiable.
2.  Aller dans l’onglet Symboles de texte.
3.  Renseigner le numéro du `MESSAGE` (001) et son contenu.
4.  Valider avec Entrée, enregistrer et activer.
5.  Dans le programme :

        WRITE:/ '     - MESSAGE FROM TEXT-ELEMENTS...'.

        MESSAGE TEXT-001 TYPE 'I'.

> [!TIP]
> les `ELEMENTS DE TEXTE` sont comme des panneaux configurables : le texte peut être changé facilement sans modifier le programme principal.

> [!NOTE]
> A défaut, il est préférable de créer les `MESSAGES` dans les `ELEMENTS DE TEXTE` car il sera possible de renseigner leur traduction.

## 🌺 CRÉER DES MESSAGES VIA SE91

1.  Ouvrir la transaction `SE91`.
2.  Saisir le nom de la classe de `MESSAGES` (ex : `ZMSG_DEMO`) et cliquer sur Créer si elle n’existe pas.
3.  Ajouter un numéro de `MESSAGE` (ex : 001, 002, …) et définir :
    - Le texte du `MESSAGE`
    - Le type (I, W, E, S)
    - Éventuellement la longueur et les paramètres dynamiques
4.  Enregistrer et activer le `MESSAGE`.
5.  Dans votre programme ABAP :

        WRITE:/ '     - MESSAGE FROM SE91 CLASS MSG...'.

        MESSAGE e001(ZMSG_DEMO).

> [!TIP]
> la `SE91`, c’est comme un atelier de fabrication de panneaux lumineux : tu crées ton panneau avec son texte et sa couleur, et tu peux le réutiliser dans tous tes programmes.

> [!NOTE]
> C'est l'idéal de créer dans une classe de `MESSAGE` si le programme/class/module function présentent de multiples textes. Ici aussi, il sera possible de renseigner les traductions.

## BONNES PRATIQUES

| 🍧 Bonne pratique                             | 🍧 Explication                                              |
| --------------------------------------------- | ----------------------------------------------------------- |
| Toujours préciser le type de `MESSAGE`        | Facilite la lecture et le contrôle de l’utilisateur         |
| Utiliser `DISPLAY LIKE` à bon escient         | Adapter l’attention sans modifier la logique                |
| Préférer les `ELEMENTS DE TEXTE`              | Pour rendre le `MESSAGE` dynamique et facilement modifiable |
| Créer des `MESSAGES` réutilisables via S``E91 | Permet cohérence et centralisation des `MESSAGES`           |
| Éviter les `MESSAGES` bloquants inutilement   | Prévenir les interruptions inutiles pour l’utilisateur      |

## RESUME

> - `MESSAGE` = afficher un MESSAGE SAP pour l’utilisateur
> - Types : I, W, E, S
> - `DISPLAY LIKE` permet de modifier l’apparence sans changer le type
> - Les `ELEMENTS DE TEXTE` rendent les `MESSAGES` dynamiques et faciles à maintenir
> - La SE91 permet de créer des `MESSAGES` réutilisables dans plusieurs programmes
>
> [!TIP]
> panneaux lumineux ou post-it, chaque couleur et type indique un niveau d’importance
