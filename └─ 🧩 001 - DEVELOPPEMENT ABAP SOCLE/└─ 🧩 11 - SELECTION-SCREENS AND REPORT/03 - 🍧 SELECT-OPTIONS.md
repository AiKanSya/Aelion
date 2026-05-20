# 🌸 SELECT-OPTIONS

## 🌺 OBJECTIFS

- [ ] CREER UN CHAMP DE SAISIE PERMETTANT DE RECUPERER UNE PLAGE DE VALEURS
- [ ] RECUPERER ET UTILISER LES VALEURS SAISIES DANS LE PROGRAMME ABAP
- [ ] PERMETTRE A L’UTILISATEUR DE FILTRER SUR DES PLAGES DE DONNEES

## 🌺 DEFINITION

> Les `SELECT-OPTIONS` créent des champs de saisie doubles pour l’utilisateur afin de récupérer une plage de valeurs.  
> Contrairement aux `PARAMETERS`, un `SELECT-OPTIONS` peut contenir plusieurs lignes correspondant à une plage ou à plusieurs entrées distinctes.

> [!TIP]
> Imaginez une feuille Excel où l’on peut saisir plusieurs intervalles de valeurs ou une liste de numéros : `SELECT-OPTIONS` permet cette flexibilité alors qu’un `PARAMETERS` ne permet qu’une seule cellule.

> [!TIP]
> Chaque `SELECT-OPTIONS` est typé automatiquement à partir d’une table DDIC, ce qui permet de générer un match-code et de valider les valeurs saisies.

## 🌺 DECLARATION DES TABLES AFFECTEES

_Exemple de déclaration_

    TABLES: vbak, vbap.

> [!CAUTION]
>
> - Obligatoire pour indiquer quelles tables seront utilisées avec les `SELECT-OPTIONS`.
> - Généralement placé au début du programme avec les variables et constantes.
> - Permet de lier le type du champ et d’activer automatiquement le match-code.

## 🌺 DECLARATION DES SELECT-OPTIONS

_Exemple de déclaration_

    SELECT-OPTIONS: s_vbeln FOR vbak-vbeln,
                    s_posnr FOR vbap-posnr.

> [!IMPORTANT]
>
> - `SELECT-OPTIONS:` obligatoire pour déclarer un ou plusieurs champs.
> - `s_vbeln` : nom du champ, convention `s_` pour SELECT-OPTIONS, ici pour le numéro de document commercial.
> - `FOR` : indique la table et le champ pour définir le type et générer le match-code.
> - `s_posnr` : second champ pour saisir les numéros de poste.
> - Chaque `SELECT-OPTIONS` peut contenir plusieurs lignes, permettant de saisir des plages ou plusieurs valeurs séparées.

## 🌺 COMPORTEMENTS SPECIFIQUES

### UNE SEULE ENTREE

- Si une seule valeur est saisie, le `SELECT-OPTIONS` se comporte comme un `PARAMETERS`.

### ABSENCE D'ENTREE

- Si aucun champ n’est rempli, le programme considérera toutes les valeurs possibles du champ indiqué dans `FOR`.

> [!CAUTION]
> Ne pas oublier de vérifier la table affectée si vous utilisez `SELECT-OPTIONS` pour filtrer les données, sinon des valeurs inattendues peuvent être considérées comme valides.

## 🌺 PARAMETRES D'INSTRUCTION

### CHAMP TYPE OBLIGATOIRE

> [!IMPORTANT]
>
> Le paramètre `OBLIGATORY` de l'instruction `PARAMETERS` rend obligatoire le champ.

    SELECT-OPTIONS: s_vbeln FOR vbak-vbeln OBLIGATORY,
                    s_posnr FOR vbap-posnr.

### CHAMP AVEC VALEUR PAR DEFAUT

> [!IMPORTANT]
>
> Le paramètre `DEFAULT` suivie de la valeur applique une valeur par défaut sur le champ au niveau de la valeur Low.

    SELECT-OPTIONS: s_vbeln FOR vbak-vbeln OBLIGATORY,
                    s_posnr FOR vbap-posnr DEFAULT '00015'.

## 🌺 TEXTES D'INPUTS

- Les textes d’interface peuvent être personnalisés comme pour les `PARAMETERS`.
- Permet de rendre l’interface plus lisible et accessible

## 🌺 BONNES PRATIQUES

- Toujours utiliser la convention `s_` pour nommer vos SELECT-OPTIONS.
- Déclarer les tables affectées avant les options de sélection.
- Prévoir des textes d’input clairs pour chaque champ.
- Tester les différentes saisies possibles : plage, valeur unique, aucune valeur.

## 🌺 RESUME

> - `SELECT-OPTIONS` crée des champs de saisie pour des plages ou plusieurs valeurs.
> - Chaque entrée peut contenir une ou plusieurs lignes.
> - Tables affectées doivent être déclarées avec `TABLES`.
> - Noms commencent par `s_` par convention.
> - Permet un filtrage flexible et puissant dans un programme ABAP.
