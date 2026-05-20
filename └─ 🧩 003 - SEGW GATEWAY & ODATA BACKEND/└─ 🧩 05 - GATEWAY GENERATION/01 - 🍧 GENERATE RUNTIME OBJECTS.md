# 🌸 GENERATE RUNTIME ARTEFACTS

## 🧩 OBJECTIVES

- [ ] Générer les `Runtime Artefacts`

## 🧩 PREREQUISITES

> [!TIP]
> Enregistrer le `Project` avant tout.

> [!IMPORTANT]
> A ce niveau, le `Project`/`Service` n'est pas généré en totalité
> Autrement dit, tout ce qui a été réalisé jusqu'à présent dans le `SAP Gateway Project` ne sera pas encore interprété et généré sous forme de code source et de personnalisation technique.

Etat actuel du `SAP GAteway Project` :

![](./assets/Capture%20d’écran%202026-01-16%20130839.png)

## 🧩 GENERATE RUNTIME OBJECTS

![](./assets/Capture%20d’écran%202026-01-16%20130921.png)

![](./assets/Capture%20d’écran%202026-01-16%20131011.png)

> [!IMPORTANT]
> Lors de la première utilisation de `Generate Runtime Objects` pour un `SAP Gateway Project`, la fenêtre contextuelle `Model and Service Definition` s'affiche. Vous pouvez y définir les `Runtime Artefacts Names` bien qu'ils soient renseignés par défaut. Les noms proposés sont basés sur le nom du `Project`.
>
> - Model Provider Class :
>
>   - ZCL\_<Project_name>\_MPC_EXT
>   - ZCL\_<Project_name>\_MPC
>
> - Data Provider Class
>
>   - ZCL\_<Project_name>\_DPC_EXT
>   - ZCL\_<Project_name>\_DPC
>
> - Service Registration
>   - <Project_name>\_MDL
>   - <Project_name>\_SRV

> [!WARNING]
> Les noms de `Project`, susceptibles de générer des `Runtime Artefacts Names` trop longs, seront tronqués, les caractères manquants étant remplacés par un chiffre. Il est recommandé de limiter la longueur des noms de `Project` à `18 caractères`. Cela facilite l'`Association` des `Artefacts` à un `Project`.

![](./assets/Capture%20d’écran%202026-01-16%20131127.png)

![](./assets/Capture%20d’écran%202026-01-16%20131222.png)

![](./assets/Capture%20d’écran%202026-01-16%20131300.png)

![](./assets/Capture%20d’écran%202026-01-16%20131352.png)

> [!TIP]
> Le `Generate Runtime Objects` devra être lancé à chaque fois qu'une modification est effectué sur le `Service` concerné.

> [!IMPORTANT]
> Le `Generate Runtime Objects` va également générer le `Service implementation`.
