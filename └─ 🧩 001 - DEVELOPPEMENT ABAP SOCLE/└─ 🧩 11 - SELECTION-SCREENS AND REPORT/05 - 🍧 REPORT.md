# 🌸 ALV (ABAP LIST VIEWER)

## 🌺 OBJECTIFS

- [ ] AFFICHER DES DONNEES DE FACON STRUCTUREE ET INTERACTIVE
- [ ] UTILISER LA CLASSE `CL_SALV_TABLE` POUR CREER UN TABLEAU DYNAMIQUE
- [ ] OFFRIR A L’UTILISATEUR DES FONCTIONNALITES DE TRI, FILTRAGE ET EXPORTATION

## 🌺 DEFINITION

> Un `ALV` (ABAP List Viewer) est un outil SAP qui permet d’afficher des listes et tables de données de manière claire, structurée et interactive.  
> Il offre des fonctions intégrées telles que :
>
> - le tri automatique des colonnes,
> - le filtrage,
> - les totaux et sous-totaux,
> - l’exportation vers Excel,
> - et des options de personnalisation (largeur de colonne, tri multiple, etc.).

> [!TIP]
> Imaginez un tableau Excel directement intégré dans SAP, mais généré automatiquement à partir de votre code.  
> C’est exactement ce que fait l’ALV : il transforme une table interne en tableau dynamique interactif.

## 🌺 EXEMPLE D’IMPLEMENTATION SIMPLE

    DATA: r_salv_table TYPE REF TO cl_salv_table,
          lt_mara      TYPE TABLE OF mara.

    " Remplir la table interne avec des données
    SELECT * FROM mara INTO TABLE @lt_mara UP TO 20 ROWS.

    " Création de l’ALV à partir de la table interne
    TRY.
         CALL METHOD cl_salv_table=>factory
              IMPORTING
                   r_salv_table = r_salv_table
              CHANGING
                   t_table      = lt_mara.
         CATCH cx_salv_msg INTO DATA(lx_msg).
              WRITE: / 'Erreur ALV :', lx_msg->get_text( ).
    ENDTRY.

    " Affichage de la table ALV
    r_salv_table->display( ).

## 🌺 EXPLICATION

1. Déclaration

   - On déclare une référence objet `r_salv_table` de type `CL_SALV_TABLE`.
   - Une table interne `lt_mara` contient les données à afficher.

2. Chargement des données

   - On remplit la table interne avec un `SELECT`.

3. Création de l’objet ALV

   - La méthode `FACTORY` crée automatiquement la structure ALV à partir de la table interne.

4. Affichage

   - `r_salv_table->display( )` ouvre la fenêtre ALV avec toutes les fonctions interactives.

5. Gestion des erreurs
   - `CATCH cx_salv_msg` capture les erreurs éventuelles liées à la création ou l’affichage de l’ALV.

## 🌺 AIDE

- L’ALV est compatible avec la plupart des types de données standards.
- Si les noms de colonnes ne sont pas explicites, vous pouvez les renommer via `cl_salv_columns_table`.
- Le `CL_SALV_TABLE` est une version simplifiée et moderne du module ALV GRID.

> [!IMPORTANT]
> Utilisez `CL_SALV_TABLE` pour les rapports internes ou les outils de contrôle qualité : c’est rapide, lisible et sans interface complexe à coder.

## 🌺 BONNES PRATIQUES

- Toujours alimenter la table interne avant d’appeler `FACTORY`.
- Utiliser une limitation de lignes (`UP TO n ROWS`) pour éviter les temps d’exécution longs.
- Tester le rendu ALV avant de le livrer (largeur, intitulés, formats).
- Penser à ajouter des totaux ou des tris par défaut selon le besoin utilisateur.

> [!CAUTION]
> Si votre table interne est vide, l’ALV s’affichera sans colonnes visibles.  
> Toujours vérifier le contenu avant d’appeler `display( )`.

## 🌺 RESUME

> - L’ALV (ABAP List Viewer) permet d’afficher des données de manière claire, rapide et interactive.
> - La classe `CL_SALV_TABLE` facilite la création d’un tableau dynamique.
> - Il s’agit d’un outil essentiel pour la visualisation, le contrôle et la validation des données.
> - Les fonctionnalités intégrées (tri, filtre, export) rendent l’ALV très puissant et convivial.
