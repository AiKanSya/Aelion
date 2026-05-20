# 🌸 SELECTION SCREEN

## 🌺 OBJECTIFS

- [ ] CREER UNE INTERFACE UTILISATEUR SIMPLE POUR SAISIE DE CRITERES
- [ ] PERMETTRE LA SELECTION DE DONNEES OU L’IMPORT DE FICHIERS VIA L’ECRAN
- [ ] UTILISER LES PARAMETRES ET SELECT-OPTIONS POUR FILTRER LES DONNEES

## 🌺 DEFINITION

> Un écran de sélection est une interface utilisateur qui permet à l’utilisateur final de :
>
> - Saisir des données
> - Définir des critères de sélection
> - Importer des fichiers ou listes de données
> - Interagir avec le programme de manière conviviale

> [!TIP]
> Imaginez un formulaire Excel où l’utilisateur peut entrer un ID, un nom ou choisir une ville dans une liste déroulante pour filtrer les lignes.

> [!TIP]
> SAP propose des programmes exemples (souvent commençant par `DEMO`) pour illustrer l’utilisation des écrans de sélection.

## 🌺 EXEMPLE

### Définition d'un écran de sélection simple

    SELECTION-SCREEN BEGIN OF BLOCK b000 WITH FRAME TITLE TEXT-000.

        " Déclaration de paramètres de sélection
        PARAMETERS: p_id   TYPE zpassenger-id_passenger,
                    p_name TYPE zpassenger-name.

        " Déclaration d'une option de sélection pour intervalles ou listes
        SELECT-OPTIONS: s_city FOR zpassenger-city.

    SELECTION-SCREEN END OF BLOCK b000.

> [!IMPORTANT]
>
> 1. `PARAMETERS` définit un champ unique pour la saisie par l’utilisateur.
> 2. `SELECT-OPTIONS` permet de créer un intervalle ou une liste de valeurs.
> 3. Les valeurs saisies sont accessibles dans le programme pour filtrer les données.
> 4. Facilite l’interaction utilisateur et la saisie de critères multiples.

> [!NOTE]
> Les `SELECT-OPTIONS` créent automatiquement des tableaux internes pour stocker les valeurs saisies par l’utilisateur.

## 🌺 BONNES PRATIQUES

- Toujours initialiser correctement les paramètres pour éviter des valeurs vides inattendues.
- Préférer `SELECT-OPTIONS` plutôt que `PARAMETERS` pour les listes ou intervalles.
- Prévoir des valeurs par défaut pour faciliter l’utilisation.
- Valider les saisies si nécessaire pour éviter des erreurs dans le traitement des données.

## RESUME

> - L’écran de sélection est l’interface principale entre le programme ABAP et l’utilisateur.
> - `PARAMETERS` est utilisé pour un champ unique, `SELECT-OPTIONS` pour des listes ou intervalles.
> - Les valeurs saisies permettent de filtrer ou sélectionner les enregistrements dans une table.
> - Les programmes SAP `DEMO*` sont utiles pour illustrer les bonnes pratiques.
