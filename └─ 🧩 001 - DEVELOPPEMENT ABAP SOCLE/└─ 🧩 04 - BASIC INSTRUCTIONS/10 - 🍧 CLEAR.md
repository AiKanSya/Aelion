# 🌸 CLEAR

## 🌺 OBJECTIFS

- [ ] Comprendre le rôle de `CLEAR` pour réinitialiser des variables
- [ ] Savoir réinitialiser une ou plusieurs variables simultanément
- [ ] Appliquer `CLEAR` sur différents types de données : chaînes, numériques, dates, heures

## 🌺 DEFINITION

> `CLEAR` permet de supprimer ou réinitialiser le contenu d’une variable.

> [!TIP]
> Vider le contenu d’une boîte pour pouvoir la réutiliser.

> [!IMPORTANT]
> L'instruction `CLEAR` remet chaque variable à sa valeur par défaut selon son type
>
> - Chaîne → vide ('')
> - Numérique → 0
> - Date → 00000000
> - Heure → 000000

## 🌺 SYNTAXE

    CLEAR dobj.

- dobj : la variable ou la liste de variables à réinitialiser

> [!TIP]
> Mettre tous les objets d’une boîte à zéro ou à vide avant de recommencer un nouvel usage.

> [!CAUTION]
> Réinitialiser les variables avant un calcul ou un traitement répétitif pour éviter des valeurs résiduelles.

## 🌺 EXEMPLE

    WRITE:/ '     - CLEAR...'.

    DATA: lv_result(50) TYPE C,
          lv_int(5)     TYPE I,
          lv_date       TYPE D,
          lv_hour       TYPE T.

    lv_result = 'Hello World'.
    lv_int    = 5.
    lv_date   = SY-DATUM.
    lv_hour   = SY-UZEIT.

    WRITE:/ 'Avant le CLEAR'.
    WRITE:/ 'Résultat  : ', lv_result.
    WRITE:/ 'Entier    : ', lv_int.
    WRITE:/ 'Date      : ', lv_date.
    WRITE:/ 'Heure     : ', lv_hour.

    CLEAR: lv_result,
           lv_int,
           lv_date,
           lv_hour.

    WRITE:/.
    WRITE:/ 'Après le CLEAR'.
    WRITE:/ 'Résultat  : ', lv_result.
    WRITE:/ 'Entier    : ', lv_int.
    WRITE:/ 'Date      : ', lv_date.
    WRITE:/ 'Heure     : ', lv_hour.

> [!TIP]
> Après un `CLEAR`, toutes les boîtes sont vides et prêtes à recevoir de nouvelles informations.

> [!TIP]
>
> - `CLEAR` fonctionne sur tous les types de variables : chaînes, numériques, dates, heures...
> - On peut `CLEAR` plusieurs variables en même temps en les séparant par des virgules
> - Très utile pour réinitialiser avant un nouveau calcul ou traitement de données

> [!NOTE]
> Même si la variable est déjà vide ou à zéro, `CLEAR` est sûr et sans effet secondaire.

## 🌺 RESUME

> - `CLEAR` supprime le contenu d’une variable
> - Réinitialise toutes les variables à leurs valeurs par défaut
> - Peut traiter une ou plusieurs variables simultanément
> - Utilisation conseillée pour éviter des résidus de valeurs avant de nouveaux traitements
