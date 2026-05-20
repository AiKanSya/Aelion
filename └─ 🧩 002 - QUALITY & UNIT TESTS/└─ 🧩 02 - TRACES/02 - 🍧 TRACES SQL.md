# 🌸 TRACES SAP

- [ ] Savoir lancer une `trace SQL`
- [ ] Savoir utiliser une `trace` pour justifier un test

## 🧩 TRACES SQL - TRANSACTION ST05

![](../assets/Capture%20d’écran%202026-01-15%20103434.png)

> [!IMPORTANT]
> Usage principal :
>
> - Vérifier qu’un accès base a bien eu lieu
> - Montrer qu’une table est lue ou mise à jour

> [!NOTE]
> Pas de paramétrage avancé

### 🍧 PROCESS

Procédure simplifiée :

→ Aller dans ST05

→ Activer la trace SQL

→ Exécuter le programme ou le test

→ Désactiver la trace

→ Afficher les résultats

### 🍧 EXEMPLE

![](../assets/Capture%20d’écran%202026-01-15%20103805.png)

![](../assets/Capture%20d’écran%202026-01-15%20103840.png)

> [!NOTE]
> Pour la démo, nous allons exécuter la méthode GET_ORDER_COUNT de la classe ZCL_CUSTOMER_ORDERS_FGI créée pour l'occasion. La méthode consiste à :
>
> ```abap
> SELECT COUNT(*) FROM vbak
>   INTO rv_count
>   WHERE kunnr = iv_customer.
> ```

![](../assets/Capture%20d’écran%202026-01-15%20104201.png)

![](../assets/Capture%20d’écran%202026-01-15%20104341.png)

![](../assets/Capture%20d’écran%202026-01-15%20104410.png)

![](../assets/Capture%20d’écran%202026-01-15%20104036.png)

![](../assets/Capture%20d’écran%202026-01-15%20104534.png)

![](../assets/Capture%20d’écran%202026-01-15%20104609.png)

![](../assets/Capture%20d’écran%202026-01-15%20104653.png)

![](../assets/Capture%20d’écran%202026-01-15%20104734.png)

![](../assets/Capture%20d’écran%202026-01-15%20105851.png)

![](../assets/Capture%20d’écran%202026-01-15%20105946.png)

> [!IMPORTANT]
> Les éléments (en général) à capturer sont (pour cet exemple) :
>
> - La ligne SELECT
> - La table VBAK
> - L’utilisateur
> - La date / heure

> [!NOTE]
> Optionnel mais utile : Double-clic sur la ligne → détail du SQL

![](../assets/Capture%20d’écran%202026-01-15%20110221.png)

> [!IMPORTANT]
> Lien avec les tests :
>
> - Montre que le code lit bien VBAK
> - Montre que la condition client est utilisée

     Le test valide le résultat.
     La trace prouve l’exécution.

> [!WARNING]
> Erreur classique à éviter :
>
> - Montrer 20 lignes de trace
> - Chercher "la méthode" dans ST05
> - Analyser les temps d’exécution
>
> ST05 n’est pas un debugger métier.
