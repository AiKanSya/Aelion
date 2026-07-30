# 🌸 GATEWAY SERVICE EXPOSITION

## 🧩 OBJECTIVES

- [ ] Exposer un `SAP Gateway Service _SRV`

## 🧩 EXPOSE THE SAP GATEWAY SERVICE

> [!IMPORTANT]
> Actuellement, le Gateway Service existe, a été généré mais n'est toujours pas exposé. Il est nécessaire d'exposer le service afin de tester les implémentations futurs (méthodes CRUD).

### 🍧 TRANSACTION /N/IWFND/MAINT_SERVICE

![](./assets/Capture%20d’écran%202026-01-16%20133829.png)

### 🍧 ADD THE SERVICE

![](./assets/Capture%20d’écran%202026-01-16%20133916.png)

![](./assets/Capture%20d’écran%202026-01-16%20133956.png)

> [!NOTE]
> Cocher [X] `Dépl. int.` (Integrated Deployment) pour améliorer la performance du traitement de service si ce service est enregistré et publié dans un système avec déploiement intégré uniquement. C'est notre cas.

![](./assets/Capture%20d’écran%202026-01-16%20134231.png)

> [!NOTE]
> Lorsque nous avions généré le projet, nous avions créé plusieurs objets :
>
> ![](./assets/Capture%20d’écran%202026-01-16%20131127.png)
>
> Le `Technical Service Name` se trouve indiqué ici. En général et si aucune modification n'a été faite lors de la première génération du service, le `Technical Service Name` aura comme valeur `<PROJECTNAME>_SRV`.

![](./assets/Capture%20d’écran%202026-01-16%20134912.png)

> [!NOTE]
> L'`External Service Name` aura (en général) le même intitulé que le `Technical Service Name`.

![](./assets/Capture%20d’écran%202026-01-16%20135053.png)

> [!IMPORTANT]
> Une fois ces informations renseignées, appuyer sur [Entrée] afin que la transaction recherche le service. S'il le trouve, il apparaîtra alors dans la liste des services backend.

![](./assets/Capture%20d’écran%202026-01-16%20135253.png)

> [!IMPORTANT]
> Cliquer sur le Nom du Service technique dans la liste.

![](./assets/Capture%20d’écran%202026-01-16%20135426.png)

![](./assets/Capture%20d’écran%202026-01-16%20135524.png)

> [!NOTE]
> Enregistrement du `<PROJECTNAME>_MDL_0001_BE`

![](./assets/Capture%20d’écran%202026-01-16%20140945.png)

> [!NOTE]
> Enregistrement de l'`ICF Node`

![](./assets/Capture%20d’écran%202026-01-16%20141032.png)

![](./assets/Capture%20d’écran%202026-01-16%20141250.png)

![](./assets/Capture%20d’écran%202026-01-16%20141621.png)

![](./assets/Capture%20d’écran%202026-01-16%20141727.png)
