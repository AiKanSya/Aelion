# 🌸 GATEWAY SERVICE CREATION

## 🧩 OBJECTIVES

- [ ] Créer un `Gateway Service` en `SEGW`

## 🧩 SERVICE/PROJECT CREATION

> [!IMPORTANT]
> La première étape du développement consiste à créer un `SAP Gateway project` dans le `SAP Gateway Service Builder`. Vous ouvrez le `SAP Gateway Service Builder` à l'aide du code de transaction `SEGW`.

![](./assets/Capture%20d’écran%202026-01-16%20102148.png)

> [!CAUTION]
> Lors de la création d'un `Project`, vous devez définir un nom, une description et son type (automatiquement sur 1 - Standard). Le `Project type` le plus récent et le seul valide (accessible) à ce jour est `Service with SAP Annotations` (❗son apparition dépendra de la politique de l'environnement aussi, il se peut qu'il n'apparaisse pas car non configuré ou pour d'autres raisons). Tous les autres types sont obsolètes.

> [!WARNING]
> Le nom du `Project` ne doit pas dépasser `18 caractères` !
>
> Le nom du `Project` est inclus dans le nom des `Runtime Artefacts` (artefacts d'exécution) générés. Les noms plus longs seront donc tronqués, les caractères manquants étant remplacés par un chiffre. Si le nom du `Project` est parfaitement lisible dans les `Runtime Artefacts`, il est plus facile d'associer ces `Artefacts` au `Project`.

> [!CAUTION]
> En tant que `Repository Object`, un `Project` doit être associé à un `Package` et à une `Transport Request`. Le responsable du `Project` est automatiquement désigné, mais peut être modifié ultérieurement.

![](./assets/Capture%20d’écran%202026-01-16%20102353.png)

> [!CAUTION]
> Pour modifier un `Gateway Service`, vous devez au préalable avoir sélectionner soit le `Service` dans l'arborescence de gauche, soit un élément qui le concerne avant de cliquer sur `Afficher <-> Modifier`.
