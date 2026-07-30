# 🌸 RUNTIME ARTEFACTS

## 🧩 OBJECTIVES

- [ ] Identifier les classes générées
- [ ] Comprendre leurs spécificités

![](./assets/Capture%20d’écran%202026-01-16%20132958.png)

## 🧩 RUNTIME ARTEFACTS

> [!IMPORTANT]  
> La branche `Runtime Artifacts` fournit la liste des `ABAP classes` et des entrées de personnalisation technique générées à partir du `Data Model` et du `Service Implementation`.

> [!IMPORTANT]  
> Les méthodes CRUDs sont contenus dans ces Classes !

> [!IMPORTANT]  
> Un `SAP Gateway Service` repose sur deux types de `ABAP classes` :
>
> - `Model Provider Class (MPC)`
> - `Data Provider Class (DPC)`

> [!IMPORTANT]
>
> - Le type de classe `MPC` définit le `Model` et les `metadata` du `SAP Gateway Service`.
> - Le type de classe `DPC` fournit l'implémentation et les fonctionnalités.

> [!IMPORTANT]
> Chaque type de classe (`MPC` et `DPC`) est implémenté dans deux `ABAP classes` :
>
> - Une `classe de base` (`MPC` et `DPC`) générée automatiquement à partir des paramètres définis dans le générateur de services `SAP Gateway`.
> - Une `classe d'extension` (`MPC_EXT` et `DPC_EXT`) héritant de la `classe de base`, permettant d'étendre le code généré manuellement.

La `MPC` et la `DPC` sont toutes deux enregistrées comme `Technical Model and Service` dans la personnalisation lors de la génération du `Project`. En résumé, chaque `SAP Gateway project` comprend au minimum les `Runtime Artefacts` suivants :

- **DPC : Data Provider Base Class** (`ZCL_<<PROJECTNAME>>_DPC`)
- **DPC_EXT : Data Provider Extension Class** (`ZCL_<PROJECTNAME>_DPC_EXT`)
- **MPC Model : Provider Base Class** (`ZCL_<PROJECTNAME>_MPC`)
- **MPC_EXT : Model Provider Extension Class** (`ZCL_<PROJECTNAME>_MPC_EXT`)
- **Technical (Registered) Model** (`<PROJECTNAME>_MDL`)
- **Technical (Registered) Service** (`<PROJECTNAME>_SRV`)

![](./assets/Capture%20d’écran%202026-01-16%20132958.png)

D'autres `Runtime Artefacts`, tels que des `ABAP interfaces` ou des classes générées par certains `wizards`, peuvent être présents, mais leur nombre est toujours limité.

> [!IMPORTANT]
> Les `classe de base` (`MPC` et `DPC`) contiennent la logique métier générée, qui est `overwritten` à chaque régénération du `Project`. Par conséquent, il est déconseillé de modifier le code de ces classes, car la génération à l'exécution écrase leur contenu !

Une `classe d'extension` est une `subclass` de la `classe de base` créée une seule fois, lors de la première génération du `Project`. Initialement, une `classe d'extension` ne contient aucune logique. `SAP Gateway Service Builder` fournit la `classe d'extension` pour vous permettre d'écrire votre propre code. La régénération du `Project` n'écrase pas votre code dans les `classes d'extension`. L'implémentation du service a donc lieu dans la `data provider extension class`.

Le modèle technique représente les `MPC` et le `technical service` des `DPC` dans la personnalisation. Le model et le service relient les classes `MPC` et `DPC`, et le `Project` les encapsule.
