# 🌸 EXTENDED CHECK

- [ ] Accéder et exécuter l'`Extended Check`
- [ ] Localiser l'origine de l'erreur, la mauvaise pratique etc

## 🧩 EXTENDED CHECK (SLIN)

### 🍧 DÉFINITION

> [!IMPORTANT]
> détecte au niveau du Code :
>
> - erreurs potentielles
> - mauvaises pratiques
> - risques techniques

### 🍧 SE80

> [!NOTE]
> En `SE80`, sélectionner et entrer dans l'objet. Le premier bouton en haut à gauche de l'écran portera alors le nom du type de cet objet.
> Le chemin pour lancer l'`Extended Check` sera alors le même : `<Objet>`/`Check`/`Extended Check`.
> Exemple :

![](../assets/Capture%20d’écran%202026-01-14%20111503.png)

![](../assets/Capture%20d’écran%202026-01-14%20111947.png)

![](../assets/Capture%20d’écran%202026-01-14%20112042.png)

### 🍧 SE24 - CLASS

![](../assets/Capture%20d’écran%202026-01-14%20112204.png)

### 🍧 SE37 - FUNCTION MODULE

![](../assets/Capture%20d’écran%202026-01-14%20112257.png)

### INTERFACE EXTENDED CHECK

> [!IMPORTANT]
> Au niveau de l'interface, `Extended Check` permet de sélectionner les critères de vérification.

> [!NOTE]
> Par défaut, il est préférable de tout cocher au niveau de 'Checks'

![](../assets/Capture%20d’écran%202026-01-14%20112531.png)

![](../assets/Capture%20d’écran%202026-01-14%20112607.png)

![](../assets/Capture%20d’écran%202026-01-14%20112632.png)

### CHECK

> [!IMPORTANT]
> Pour accéder aux informations, double-cliquer sur la ligne ciblée.

![](../assets/Capture%20d’écran%202026-01-14%20112737.png)

![](../assets/Capture%20d’écran%202026-01-14%20112830.png)

> [!IMPORTANT]
> Nous pouvons ici lire et comprendre le message.
>
>         This warning is only displayed in SLIN
>         In the case of JOINs, the addition SINGLE can only be executed as UP TO 1 ROWS, so use the addition UP
>         TO 1 ROWS instead of SINGLE.

> [!IMPORTANT]
> En double-cliquant sur le message, vous accéderez directement à la partie du code concernée

![](../assets/Capture%20d’écran%202026-01-14%20113236.png)

![](../assets/Capture%20d’écran%202026-01-14%20113302.png)

> [!NOTE]
> Le code problématique est le suivant :

```abap
     SELECT SINGLE makt~maktx, afpo~meins
          FROM afpo
          INNER JOIN makt ON afpo~matnr = makt~matnr
          INTO ( @ev_maktx, @ev_meins )
          WHERE afpo~aufnr = @iv_aufnr
            AND afpo~matnr = @iv_matnr.
```

> [!NOTE]
> Avec un peu de recherche, nous avons déterminé qu'avec les montée en version, les SELECT SINGLE devront être remplacé par une version contenant UP TO 1 ROWS.

Ce SELECT SINGLE sera remplacé par :

```abap
     SELECT makt~maktx, afpo~meins
          FROM afpo
          INNER JOIN makt ON afpo~matnr = makt~matnr
          INTO ( @ev_maktx, @ev_meins )
          UP TO 1 ROWS
          WHERE afpo~aufnr = @iv_aufnr
            AND afpo~matnr = @iv_matnr.
     ENDSELECT.
```

> [!NOTE]
> Une fois les corrections implémentées, relancer un `Extended Check` pour vérifier que les correctifs sont valides et n'ont pas généré d'autres erreurs.
>
> Dans notre exemple, les correctifs sont valides et ont disparu de la liste :

![](../assets/Capture%20d’écran%202026-01-14%20113814.png)

> [!NOTE]
> Une fois toutes les corrections effectuées, vous devriez avoir une liste vide :

![](../assets/Capture%20d’écran%202026-01-14%20114225.png)
