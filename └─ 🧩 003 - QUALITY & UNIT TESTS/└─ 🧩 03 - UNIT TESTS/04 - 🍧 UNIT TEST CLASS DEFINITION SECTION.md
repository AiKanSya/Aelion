# 🌸 UNIT TEST CLASS DEFINITION SECTION

- [ ] Comprendre la logique de la `DEFINITION SECTION`

## 🧩 STRUCTURE DE BASE

```abap
*"* use this source file for your ABAP unit test classes

CLASS ltc_Customer_Orders DEFINITION FOR TESTING
  DURATION SHORT
  RISK LEVEL HARMLESS.

*?﻿<asx:abap xmlns:asx="http://www.sap.com/abapxml" version="1.0">
*?<asx:values>
*?<TESTCLASS_OPTIONS>
*?<TEST_CLASS>ltc_Customer_Orders
*?</TEST_CLASS>
*?<TEST_MEMBER>f_Cut
*?</TEST_MEMBER>
*?<OBJECT_UNDER_TEST>ZCL_CUSTOMER_ORDERS
*?</OBJECT_UNDER_TEST>
*?<OBJECT_IS_LOCAL/>
*?<GENERATE_FIXTURE>X
*?</GENERATE_FIXTURE>
*?<GENERATE_CLASS_FIXTURE>X
*?</GENERATE_CLASS_FIXTURE>
*?<GENERATE_INVOCATION>X
*?</GENERATE_INVOCATION>
*?<GENERATE_ASSERT_EQUAL>X
*?</GENERATE_ASSERT_EQUAL>
*?</TESTCLASS_OPTIONS>
*?</asx:values>
*?</asx:abap>

  PRIVATE SECTION.
    DATA:
      f_Cut TYPE REF TO zcl_Customer_Orders.  "class under test

    CLASS-METHODS: class_Setup.
    CLASS-METHODS: class_Teardown.

    METHODS: setup.
    METHODS: teardown.
    METHODS: get_Order_Count FOR TESTING.

ENDCLASS.       "ltc_Customer_Orders



CLASS ltc_Customer_Orders IMPLEMENTATION.

  METHOD class_Setup.
  ENDMETHOD.

  METHOD class_Teardown.
  ENDMETHOD.

  METHOD setup.
    CREATE OBJECT f_Cut.
  ENDMETHOD.

  METHOD teardown.
  ENDMETHOD.

  METHOD get_Order_Count.

    DATA iv_Customer TYPE kunnr.
    DATA rv_Count TYPE i.

    rv_Count = f_Cut->get_Order_Count( iv_Customer ).

    cl_Abap_Unit_Assert=>assert_Equals(
      act = rv_Count
      exp = rv_Count          "<--- please adapt expected value
    " msg = 'Testing value rv_Count'
*     level =
    ).

  ENDMETHOD.

ENDCLASS.
```

### 🍧 CLASS DEFINITION

```abap
CLASS ltc_customer_orders DEFINITION
 FOR TESTING
 DURATION SHORT
 RISK LEVEL HARMLESS.
```

> [!IMPORTANT] >
> Le paramètre `FOR TESTING` : la classe est déclarée comme une classe de test ABAP Unit, exécutée par le framework de test.
> `FOR TESTING` peut être utilisé à de multiples fins :
>
> - Création d'une classe de test contenant des méthodes de test
> - Création d'un double de test
> - Création de méthodes auxiliaires pour les tests unitaires ABAP

> [!IMPORTANT]
> Le paramètre `DURATION SHORT` : indique que les tests sont rapides, pas de préparation longue nécessaire.
> `DURATION` (Optional addition)
>
> - `SHORT`: On s'attend à un temps d'exécution de quelques secondes seulement.
> - `MEDIUM`: Un temps d'exécution d'environ une minute est prévu.
> - `LONG`: Un temps d'exécution supérieur à une minute est prévu.

> [!IMPORTANT]
> Le paramètre `RISK LEVEL HARMLESS` : précise que le test n’a pas d’impact sur la base de données (lecture seule ou rollback automatique).
> `RISK LEVEL HARMLESS` (Optional addition)
>
> - `CRITICAL`: le test modifie les paramètres système ou les données de personnalisation (par défaut)
> - `DANGEROUS`: le test modifie les données persistantes
> - `HARMLESS`: le test ne modifie ni les paramètres système ni les données persistantes

> [!NOTE]
> Pour info, il existe des options de syntaxe possibles avant `FOR TESTING`. les syntaxes possibles sont les suivantes :

```abap
... [PUBLIC]
    [INHERITING FROM superclass]
    [ABSTRACT]
    [FINAL]
    [CREATE {PUBLIC|PROTECTED|PRIVATE}]
    [FOR TESTING]
    [FOR BEHAVIOR OF]
    [[GLOBAL] FRIENDS class1 class2 ...
                      intf1  intf2  ...] ...
```

### 🍧 PRIVATE SECTION

```abap
  PRIVATE SECTION.
    DATA:
      f_Cut TYPE REF TO zcl_Customer_Orders.  "class under test

    CLASS-METHODS: class_Setup.
    CLASS-METHODS: class_Teardown.

    METHODS: setup.
    METHODS: teardown.
    METHODS: get_Order_Count FOR TESTING.
```

> [!IMPORTANT]
> L'instruction `PRIVATE SECTION` : déclaration des objets et variables utilisés uniquement par la classe de test

> [!IMPORTANT]
> L'instruction `METHODS` : déclaration des méthodes de test et éventuellement de setup/teardown

> [!NOTE]
> Variable `f_cut`: variable de type référence vers la classe à tester (CUT = `Class Under Test`). Ici `zcl_customer_orders`.

> [!IMPORTANT]
> Méthode `SETUP` :
>
> Méthode d'instance appelée avant chaque test de la classe. Utilisée pour préparer les données de test et créer les objets nécessaires.
>
> - Exécutée avant chaque test → initialise les objets nécessaires

> [!IMPORTANT]
> Méthode `CLASS_SETUP` :
>
> Méthode statique exécutée une fois avant le premier test de la classe

> [!IMPORTANT]
> Méthode `TEARDOWN` :
>
> Méthode d'instance appelée après chaque test. Utilisée pour nettoyer les données et libérer les ressources
>
> - Exécutée après chaque test → nettoyage si nécessaire

> [!IMPORTANT]
> Méthode `CLASS_TEARDOWN` :
>
> Méthode statique exécutée une fois après le dernier test de la classe

### 🍧 TEST METHODS

> [!IMPORTANT]
> La structure d'une méthode de test doit être définie avec l'addition du paramètre `FOR TESTING` et ne peut avoir aucun paramètre

> [!NOTE]
> Conventions de nommage : Préfixer avec `test_` suivi du nom de la méthode testée

> [!WARNING]
> Lors de la génération de la classe de test, le `Workbench` va créer une (ou plusieurs) méthode(s) en fonction du nombre de méthode sélectionnée de la classe à tester durant la phase de création. Ces méthodes porteront le même intitulé et devront être changé pour respecter les conventions.
