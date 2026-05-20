# 🌸 PARAMETERS

## 🌺 OBJECTIFS

- [ ] CREER UN CHAMP DE SAISIE SIMPLE POUR L'UTILISATEUR FINAL
- [ ] RECUPERER ET UTILISER LA VALEUR SAISIE DANS LE PROGRAMME ABAP
- [ ] FACILITER LA NAVIGATION ET LA COMPREHENSION GRACE A DES TEXTES D'INPUT

## 🌺 DEFINITION

> Les `PARAMETERS` permettent de créer des champs de saisie simples pour l’utilisateur, comme dans un formulaire papier ou Excel.  
> Chaque `PARAMETER` ne peut contenir qu’une seule valeur.  
> Utilisation : récupérer des données saisies par l’utilisateur pour filtrer, calculer ou traiter des enregistrements.

> [!TIP]
> Imaginez un formulaire où l’utilisateur saisit uniquement un numéro de document ou une date. `PARAMETERS` correspond à chaque champ de ce formulaire.

> [!NOTE]
> Les `PARAMETERS` peuvent générer automatiquement un MATCHCODE si le type est lié à une table DDIC, facilitant la recherche.

## 🌺 INSTRUCTION PARAMETERS

_Exemple de déclaration simple_

    PARAMETERS: p_vbeln TYPE vbak-vbeln,
                p_posnr TYPE vbap-posnr.

> [!IMPORTANT]
>
> - `PARAMETERS:` obligatoire pour déclarer un ou plusieurs champs de saisie.
> - `p_vbeln` : nom du paramètre (par convention, commence par `p_`), ici pour saisir le numéro de document commercial.
> - `TYPE` : définit le type attendu et permet la génération automatique du match-code.
> - `vbak-vbeln` : référence à la table et au champ dans le dictionnaire DDIC.
> - `p_posnr` : deuxième paramètre pour saisir le numéro de poste, même principe que `p_vbeln`.

## 🌺 PARAMETRES D'INSTRUCTION

### CHAMP TYPE OBLIGATOIRE

> [!IMPORTANT]
>
> Le paramètre `OBLIGATORY` de l'instruction `PARAMETERS` rend obligatoire le champ.

    PARAMETERS: p_vbeln TYPE vbak-vbeln OBLIGATORY,
                p_posnr TYPE vbap-posnr.

### CHAMP AVEC VALEUR PAR DEFAUT

> [!IMPORTANT]
>
> Le paramètre `DEFAULT` suivie de la valeur applique une valeur par défaut sur le champ.

    PARAMETERS: p_vbeln TYPE vbak-vbeln OBLIGATORY,
                p_posnr TYPE vbap-posnr DEFAULT '00015'.

## 🌺 TEXTES D'INPUTS

- Par défaut, le texte affiché à l’exécution est le nom du paramètre (`p_vbeln`, `p_posnr`).
- Possibilités de personnalisation :
  - Saisie manuelle pour chaque paramètre (peut nécessiter des traductions).
  - Automatique via le DDIC si le type est lié à une table/zone (option recommandée pour plus de clarté).

## 🌺 BONNES PRATIQUES

- Utiliser un nom de paramètre clair et compréhensible, convention `p_`.
- Toujours typer le paramètre avec un champ DDIC pour bénéficier des validations automatiques et du match-code.
- Prévoir des valeurs par défaut si nécessaire pour guider l’utilisateur.
- Vérifier la valeur saisie dans le programme avant de l’utiliser pour éviter des erreurs.

## RESUME

> - `PARAMETERS` crée un champ de saisie unique pour l’utilisateur.
> - Le champ est typé via `TYPE` et peut générer un match-code automatiquement.
> - Les textes d’input peuvent être personnalisés pour améliorer l’expérience utilisateur.
> - Convention : noms de paramètres commençant par `p_` pour identification facile.
