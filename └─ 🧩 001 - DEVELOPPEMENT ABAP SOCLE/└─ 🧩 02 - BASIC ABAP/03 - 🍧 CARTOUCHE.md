# 🌸 CARTOUCHE (ENTETE DE PROGRAMME ABAP)

## 🌺 OBJECTIFS

- [ ] Comprendre le rôle de la `CARTOUCHE` dans un programme ABAP
- [ ] Identifier les informations essentielles qu’elle contient
- [ ] Savoir structurer et rédiger une `CARTOUCHE` correctement

## 🌺 DEFINITION

> Une `CARTOUCHE` est un bloc de texte placé au tout début d’un `REPORT` ABAP, d'une `METHOD` de `CLASS`, d'un `MODULE FUNCTION` etc.  
> Elle décrit le contexte : son nom, son auteur, sa fonction, et son historique.

> [!TIP]
> La `CARTOUCHE`, c’est la carte d’identité du programme.  
> Elle indique qui l’a créé, quand, pour quoi faire, et où en est la version.
>
> Elle [!TIP] les développeurs, les administrateurs et les équipes de maintenance à comprendre rapidement l’origine et le but du programme.

## 🌺 POURQUOI UTILISER UNE CARTOUCHE ?

> Sans `CARTOUCHE`, il devient difficile de savoir à quoi sert un programme ou qui l’a développé.  
> Dans un environnement où plusieurs personnes travaillent sur le même système, la `CARTOUCHE` est un repère indispensable.

Elle permet de :

- Identifier le propriétaire du code.
- Comprendre le rôle du programme sans lire tout le code.
- Suivre les modifications au fil du temps (historique).
- Garantir une traçabilité entre le besoin, le ticket et le développement.

> [!TIP]
> Une `CARTOUCHE` bien remplie évite de perdre du temps en analyse technique inutile.

## 🌺 STRUCTURE STANDARD D’UNE CARTOUCHE

| 🍧 Élément                    | 🍧 Description                                                    |
| ----------------------------- | ----------------------------------------------------------------- |
| Nom du programme              | Identifiant technique du programme ABAP (ex : `ZFGI_HELLO_WORLD`) |
| Type de programme             | Catégorie : `REPORT`, `INCLUDE`, `FUNCTION MODULE`, etc.          |
| Auteur                        | Nom ou trigramme du développeur                                   |
| Date de création/modification | Historique des changements                                        |
| Description                   | Résumé du rôle du programme                                       |
| Version / Ticket              | Lien avec le suivi du projet ou du correctif                      |
| Organisation / Département    | Service responsable du développement                              |

> [!TIP]
> SAP GUI ne valide pas automatiquement le contenu de la `CARTOUCHE`.  
> C’est à toi (ou à ton équipe) de respecter la convention commune.

## 🌺 EXEMPLE TYPE DE CARTOUCHE STANDARD

    *&---------------------------------------------------------------------*
    *& NOM DU PROGRAMME                                                    *
    *& ------------------------------------------------------------------- *
    *& Objet  : Nom de l'objet                                             *
    *& Ticket : Numéro du ticket                                           *
    *& Titre  : Intitulé du ticket                                         *
    *& ------------------------------------------------------------------- *
    *& Commentaire :                                                       *
    *& Description courte du programme                                     *
    *& ------------------------------------------------------------------- *
    *& Historique des modifications                                        *
    *& Date      | Nom (Trigramme)   | Ticket - Objet                      *
    *& 00.00.2025| P.NOM (PNO)       | Création du programme               *
    *&---------------------------------------------------------------------*

> [!TIP]
> Imagine une fiche projet collée sur ton code : chaque développeur peut voir d’un coup d’œil ce qu’il fait, pourquoi, et par qui.

## 🌺 EXEMPLE COMPLET DANS UN PROGRAMME

    *&---------------------------------------------------------------------*
    *& Report  ZAELION_FGI_UNIT02_01
    *&---------------------------------------------------------------------*
    *&
    *&---------------------------------------------------------------------*

    *&---------------------------------------------------------------------*
    *& ZAELION_FGI_UNIT02_01                                               *
    *& ------------------------------------------------------------------- *
    *& Objet  : Démonstration - Structure programme                        *
    *& Ticket : DEV-0001                                                   *
    *& Titre  : Premier programme ABAP                                     *
    *& ------------------------------------------------------------------- *
    *& Commentaire : Programme d'exemple pour introduction ABAP            *
    *& ------------------------------------------------------------------- *
    *& Historique des modifications                                        *
    *& Date      | Nom (Trigramme)   | Ticket - Objet                      *
    *& 01.01.2025| F.GIUSTINI (FGI)  | Création du programme               *
    *&---------------------------------------------------------------------*

    REPORT zaelion_fgi_unit02_01.

    WRITE:/ '01 - REPORT...',
        / '     WARNING: Ne jamais implémenter de code ici !',
        / '-------------------------------------------------'.

    INCLUDE zaelion_fgi_unit02_01_top.
    INCLUDE zaelion_fgi_unit02_01_scr.
    INCLUDE zaelion_fgi_unit02_01_f01.

    INITIALIZATION.
    WRITE:/ '00 - INITIALIZATION du programme...',
            / '     TYPE: Bloc d''événement',
            / '     WARNING: Activation unique au lancement',
            / '-------------------------------------------------'.

    PERFORM report_initialization.

    START-OF-SELECTION.
    WRITE:/ '05 - START-OF-SELECTION du programme...',
            / '     TYPE: Bloc d''événement',
            / '     INFO: Traitement principal du REPORT',
            / '-------------------------------------------------'.

    PERFORM report_subprocess_01.
    PERFORM report_subprocess_02.

    END-OF-SELECTION.
    WRITE:/ '99 - END-OF-SELECTION du programme...',
            / '     TYPE: Bloc d''événement',
            / '     INFO: Traitement de fin du REPORT',
            / '-------------------------------------------------'.

> [!IMPORTANT]
>
> - Le bloc supérieur (`CARTOUCHE`) présente le programme.
> - Les blocs suivants (SELECTION-SCREEN, START-OF-SELECTION, etc.) structurent le code.
> - Chaque section est visuellement délimitée pour une lecture fluide et rapide.

## 🌺 BONNES PRATIQUES

| 🍧 Bonne pratique                              | 🍧 Explication                                 |
| ---------------------------------------------- | ---------------------------------------------- |
| Renseigner chaque champ de la `CARTOUCHE`      | Garantit clarté et traçabilité                 |
| Utiliser les séparateurs `*&`                  | Uniformise la présentation dans toute l’équipe |
| Mettre à jour l’historique à chaque changement | Suivi fiable de l’évolution du code            |
| Ajouter date et trigramme du développeur       | Identification claire des contributeurs        |
| Adopter une structure commune                  | Facilite la relecture et les audits techniques |
| Garder un ton clair et concis                  | Lecture rapide, sans surcharge d’information   |

> [!WARNING]
> Un champ vide dans une `cartouche` peut compliquer la recherche d’un incident ou la gestion d’un correctif.

## 🌺 [!TIP] MÉMOIRE VISUEL

Une `cartouche`, c’est :

- En haut du programme
- Délimitée par `*&---*`
- Toujours à jour
- Identifiable par tous
- Unique à chaque programme

> [!TIP]
> Lors de la création d’un nouveau programme dans `SE38` ou `SE80`, copie toujours une `cartouche` type fournie par ton équipe avant de commencer ton code.

## 🌺 RESUME

> - La `CARTOUCHE` est l’en-tête descriptive de chaque programme ABAP.
> - Elle sert à identifier rapidement le quoi, qui, quand, et pourquoi du code.
> - Toujours placée au début du programme, elle garantit la traçabilité et la cohérence.
> - Elle doit être complète, à jour, et homogène dans tout le système SAP.
> - Un programme sans `cartouche` est comme un document sans titre : difficile à comprendre et à maintenir.
