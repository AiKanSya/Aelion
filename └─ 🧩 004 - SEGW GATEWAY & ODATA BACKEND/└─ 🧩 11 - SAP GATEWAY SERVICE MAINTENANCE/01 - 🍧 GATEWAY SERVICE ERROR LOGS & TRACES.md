# 🌸 GATEWAY SERVICE CHECK RESPONSE

## 🧩 ERROR LOG TRANSACTIONS

### 🍧 TRANSACTION /IWFND/GW_CLIENT

![](./assets/Capture%20d’écran%202026-01-06%20165741.png)

> [!IMPORTANT]
> Cet `Error Log` consigne les erreurs survenues lors de l'analyse d'une `OData Request`.
>
> Une partie de la requête peut ne pas respecter la définition du modèle de données du service (par exemple, un format de clé incorrect) ou même la norme `OData` elle-même (par exemple, des options de requête non prises en charge).
>
> Une erreur détectée dans ce journal signifie également que l'implémentation du service n'a pas été appelée, car la requête était incorrecte dès le départ.

![](./assets/Capture%20d’écran%202026-01-06%20170307.png)

![](./assets/Capture%20d’écran%202026-01-06%20170151.png)

### 🍧 TRANSACTION /IWBEP/ERROR_LOG

![](./assets/Capture%20d’écran%202026-01-06%20170829.png)

> [!IMPORTANT]
> Cet `Error Log` consigne les erreurs survenues lors du traitement de la requête par l'implémentation du service.
>
> La requête elle-même est correcte, mais certaines données fournies peuvent être incorrectes (par exemple, une valeur de clé inexistante dans la base de données). Bien entendu, une erreur de programmation, y compris un vidage mémoire, peut également se produire.
>
> Une erreur détectée dans ce journal signifie qu'un problème est survenu dans le code ABAP.
>
> Dans un déploiement centralisé, l'`Error Log` `/IWFND/ERROR_LOG` est utilisé par le `hub` ou le serveur d'exécution (`FES`), tandis que le journal `/IWBEP/ERROR_LOG` est utilisé par le serveur d'exécution (`BES`). Dans un déploiement intégré, les deux journaux d'erreurs résident dans le même système, mais affichent des types d'erreurs différents. Il est donc important de toujours consulter les deux journaux d'erreurs en cas de problème avec un service.

> [!CAUTION]
>
> Depuis SAP_GWFND 7.40, les deux `Error Logs` sont disponibles dans chaque `AS ABAP`. Dans un déploiement centralisé, cela signifie qu'il existe un journal d'erreurs `/IWBEP/ERROR_LOG` dans le `hub` ou `FES` et un autre `/IWFND/ERROR_LOG` dans le `BES`. Cependant, ces journaux sont vides pour les erreurs des services enregistrés dans le `FES` et implémentés dans le `BES`.

## 🧩 ERROR LOG ANALYSE

Les deux `Error Logs` vous permettent d'effectuer les opérations suivantes :

- Identifier l'heure et l'emplacement précis des erreurs dans le code source.
- Déterminer la fréquence d'apparition des erreurs.
- Analyser les causes profondes des erreurs.
- Reproduire et corriger les erreurs.

Un `Error Log` comprend les deux zones d'écran suivantes :

### 🍧 OVERVIEW

La zone `Overview` répertorie tous les ID d'erreur et leurs attributs, ainsi que la date et l'heure auxquelles chaque erreur s'est produite. Par défaut, les erreurs sont affichées par ordre chronologique, la plus récente en haut de la liste. Vous pouvez afficher les informations et les descriptions des erreurs pour obtenir des détails supplémentaires et voir leur fréquence et leur emplacement d'apparition.

### 🍧 ERROR CONTEXT

Le contexte de l'erreur affiche les détails de l'erreur sélectionnée dans la Overview. Il offre plusieurs fonctionnalités pour examiner plus en détail certains aspects de l'erreur, comme la pile d'appels ou les données complètes de la requête et de la réponse. Pour vérifier si une erreur persiste après une modification de l'implémentation ou de la personnalisation de votre service, vous pouvez la reproduire à l'aide de l'une des options de relecture suivantes proposées par le bouton Replay :

- SAP Gateway Client (/IWFND/GW_CLIENT)
- Web Browser.

## 🧩 TRACING TOOL TRANSACTIONS

### 🍧 SAP GATEWAY TRACING TOOLS (/IWFND/TRACES)

![](./assets/Capture%20d’écran%202026-01-15%20144558.png)

Ces outils permettent de suivre le traitement de la requête OData dans l'environnement d'exécution SAP Gateway. Dans un déploiement intégré, le traçage descend jusqu'à l'implémentation ABAP.

### 🍧 SAP GATEWAY BACKEND TRACING TOOLS (/IWBEP/TRACES)

![](./assets/Capture%20d’écran%202026-01-15%20144731.png)

Ces outils permettent de suivre le traitement de la requête dans l'implémentation du service. Dans un déploiement intégré, le traçage inclut la gestion de la requête OData dans l'environnement d'exécution SAP Gateway.

Ces deux outils permettent de lancer un traçage pour un service ou un utilisateur spécifique. Le traçage des performances inclut les temps d'exécution des applications jusqu'aux appels de méthode individuels. Il est même possible de tracer la charge utile de requêtes individuelles si nécessaire.

> [!NOTE]
> Vous devrez peut-être modifier les paramètres de sécurité pour activer le traçage dans un système de production.
