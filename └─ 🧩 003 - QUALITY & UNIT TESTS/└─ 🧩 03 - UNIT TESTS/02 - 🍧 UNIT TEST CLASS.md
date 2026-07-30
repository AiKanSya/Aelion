# 🌸 ABAP UNIT TEST CLASS

- [ ] Comprendre comment créer une `ABAP Unit Test Class`
- [ ] Connaître les éléments obligatoires et facultatifs
- [ ] Savoir nommer correctement la classe pour rester organisé

## 🧩 DÉFINITION

> [!IMPORTANT]
> Les `ABAP UNIT TESTS` sont un `framework` intégré au langage ABAP qui permet de tester automatiquement les plus petites unités de code (méthodes, classes, modules fonctionnels).
>
> `ABAP Unit` vous aide à vérifier le comportement correct de votre code et à détecter les erreurs de programmation rapidement.

![](../assets/Capture%20d’écran%202026-01-14%20123942.png)

> [!IMPORTANT]
> L'importance des tests dans le développement SAP est cruciale car ils permettent de :
>
> - Détecter les erreurs tôt dans le cycle de développement
> - Faciliter la maintenance et les évolutions du code
> - Assurer la qualité et la fiabilité des applications
> - Réduire les coûts de correction d'erreurs

## 🧩 UNIT TEST CLASS VS BUSINESS CLASS

> [!IMPORTANT]
> Classe métier :
>
> - contient la logique réelle du programme (ex : `ZCL_CUSTOMER_ORDERS`)

> [!IMPORTANT]
> Classe de test :
>
> - contient les tests pour vérifier la classe métier

> [!IMPORTANT]
> Règle clé :
>
> - ne pas mélanger logique métier et tests

### 🍧 FONCTIONNALITÉ - ÉCRITURE

L'écriture de tests `ABAP Unit` est le moyen de fournir un logiciel de haute qualité, qui peut facilement évoluer au fil du temps sans introduire de régressions. Dans les méthodologies, comme la programmation extrême et le développement piloté par les tests, le rôle du test unitaire est encore plus important.

> [!IMPORTANT]
> Les fonctionnalités les plus importantes pour écrire des tests `ABAP Unit` sont les suivantes :
>
> - Les tests `ABAP Unit` sont écrits en ABAP. Vous n'avez pas besoin d'apprendre un langage de script supplémentaire à des fins de test.
> - Vous écrivez des tests avec les outils de développement ABAP (`ABAP Workbench`) standard. Vous n'avez pas besoin d'utiliser d'outils supplémentaires pour développer des tests.
> - Les tests `ABAP Unit` sont transportés avec les objets de l'ABAP Repository qu'ils testent. Elles sont donc disponibles dans tous les systèmes de votre infrastructure de développement et de test.

### 🍧 FONCTIONNALITÉ - EXÉCUTION

> [!IMPORTANT]
> Les fonctionnalités les plus importantes de l'`ABAP Unit` pour l'exécution et l'évaluation des `tests unitaires` sont les suivantes :
>
> - Vous pouvez exécuter des tests `ABAP Unit` au fur et à mesure que vous développez du code. Vous pouvez lancer des tests, par exemple, directement à partir de l'éditeur ABAP dans l'`ABAP Workbench`.
> - La mesure de la couverture du code est intégrée au test `ABAP Unit`, ce qui vous permet de vérifier la rigueur de vos tests unitaires et de trouver facilement le code non testé.
> - Les tests `ABAP Unit` peuvent être automatisés et font partie des tests de qualité de masse.
> - Les résultats des tests sont affichés dans la vue `ABAP Unit` pour faciliter l'évaluation et l'analyse.
> - Les méthodes de test unitaire ABAP n'ont pas de paramètres. Aucune connaissance particulière ou structure de test n'est requise pour exécuter des tests ABAP ; ils peuvent être exécutés par n'importe qui, et pas seulement par le développeur.
> - Les tests `ABAP Unit` ne peuvent pas être exécutés dans des systèmes ABAP utilisés en mode productif.
