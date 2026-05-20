# 🌸 INSTRUCTION WRITE

## 🌺 OBJECTIFS

- [ ] Comprendre l’utilisation de la commande `WRITE` en ABAP
- [ ] Afficher du texte et des valeurs de variables dans la fenêtre de sortie
- [ ] Combiner texte fixe, variables et champs systèmes
- [ ] Organiser l’affichage sur plusieurs lignes
- [ ] Utiliser des options de mise en forme simples (longueur, justification)

## 🌺 DEFINITION

> La commande `WRITE` permet d’afficher des informations dans la fenêtre de sortie ou les rapports SAP.  
> On peut afficher du texte, des valeurs de variables ou des champs systèmes.

> [!TIP] > `WRITE` agit comme un haut-parleur ou un tableau blansc : il prend ce que vous lui donnez et le montre à l’utilisateur.  
> Les messages et variables sont les contenus que le haut-parleur diffuse.

## 🌺 EXEMPLE DE BASE

    WRITE:/ '     - WRITE...'.

    DATA: lv_message1 TYPE string,
          lv_message2 TYPE string,
          lv_message3 TYPE string.

    START-OF-SELECTION.

      " Définition du message
      lv_message1 = 'Bienvenue dans mon rapport SAP !'.
      lv_message2 = 'Tout va bien !'.
      lv_message3 = 'Merci pour votre attention'.

      " Affichage des messages
      WRITE:/ lv_message1.
      WRITE:/ lv_message2,
            / lv_message3.

- `/` : indique une nouvelle ligne
- Plusieurs variables peuvent être affichées sur la même ligne ou sur plusieurs lignes

> [!TIP]
> Chaque `/` = retour à la ligne sur une feuille de papier.

## 🌺 AFFICHAGE DE VARIABLES SYSTEM

    WRITE:/ '     - SYSTEM VARIABLES...'.

    WRITE:/ 'Informations système ABAP',
          / 'Mandant :     ', sy-mandt,
          / 'Utilisateur : ', sy-uname,
          / 'Date :        ', sy-datum,
          / 'Heure :       ', sy-uzeit.

- `sy-mandt` : mandant actuel
- `sy-uname` : utilisateur connecté
- `sy-datum` : date système (AAAAMMJJ)
- `sy-uzeit` : heure système (HHMMSS)

> [!TIP]
> Visualiser ces champs comme l’en-tête d’un rapport officiel. Ils sont générés automatiquement par SAP.

## 🌺 OPTIONS DE MISE EN FORME

- Justification : `WRITE lv_var LEFT` ou `WRITE lv_var RIGHT`
- Longueur : `WRITE lv_var LENGTH 10`
- Combiner texte et variable : `WRITE: / 'Nom :', lv_name, 'Age :', lv_age.`

> [!TIP]
> Pensez à `WRITE` comme un tableau blanc où vous placez le texte et les valeurs exactement là où vous voulez qu’elles apparaissent.

## BONNES PRATIQUES

| 🍧 Bonne pratique                      | 🍧 Explication                                  |
| -------------------------------------- | ----------------------------------------------- |
| Utiliser `/` pour séparer les lignes   | Facilite la lecture du rapport                  |
| Ajouter des messages explicites        | L’utilisateur comprend mieux le contexte        |
| Combiner texte et variables clairement | Evite la confusion dans les rapports            |
| Afficher les champs systèmes si utile  | Fournit un contexte automatique pour le rapport |

## RESUME

> - `WRITE` = afficher du texte ou des valeurs dans la sortie SAP
> - `/` = nouvelle ligne
> - Peut afficher variables, texte fixe et champs systèmes
> - Options : justification, longueur, combinaison multiple
>
> [!TIP]
> haut-parleur ou tableau blanc, chaque `WRITE` montre directement les informations à l’utilisateur.
