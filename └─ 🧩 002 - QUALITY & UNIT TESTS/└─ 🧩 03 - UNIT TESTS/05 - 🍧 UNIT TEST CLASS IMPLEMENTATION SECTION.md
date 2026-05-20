# 🌸 UNIT TEST CLASS IMPLEMENTATION SECTION

- [ ] Comprendre la logique de l'`IMPLEMENTATION SECTION`

## 🧩 STRUCTURE DE BASE

```abap
*"* use this source file for your ABAP unit test classes

CLASS ltc_Customer_Orders DEFINITION FOR TESTING
  DURATION SHORT
  RISK LEVEL HARMLESS
.
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

### 🍧 CLASS IMPLEMENTATION

```abap
METHOD class_setup.
METHOD class_teardown.
```

> [!NOTE]
> La classe `class_setup` : exécutée une seule fois avant tous les tests de la classe.

> [!NOTE]
> La classe `class_teardown` : exécutée une seule fois après tous les tests.

```abap
METHOD setup.
METHOD teardown.
METHOD get_order_count.
```

> [!NOTE]
> La méthode `setup` : exécutée avant chaque méthode de test.
> setup instancie correctement le `CUT` (`f_cut`).

> [!NOTE]
> La méthode `teardown` : exécutée après chaque méthode de test.
> teardown est vide, donc sans effet.

> [!NOTE]
> La méthode `get_order_count` est une méthode créé à partir de la méthode sélectionnée lors de la création par le `Wizard`.

## 🧩 IMPLEMENTATION DE LA METHODE DE TEST

> [!CAUTION]
> Nommer les méthodes :
>
> - Méthodes : convention `test_<fonction>`
> - Objectif : identifier facilement le test et savoir quelle méthode métier est testée

> [!IMPORTANT]
> Nous allons modifier la classe de test comme suit :

```abap
CLASS ltc_customer_orders DEFINITION
 FOR TESTING
 DURATION SHORT
 RISK LEVEL HARMLESS.

  PRIVATE SECTION.
    DATA: f_cut TYPE REF TO zcl_customer_orders.

    METHODS: setup,
      test_get_order_count FOR TESTING.

ENDCLASS.

CLASS ltc_customer_orders IMPLEMENTATION.

  METHOD setup.
    CREATE OBJECT f_cut.
  ENDMETHOD.

  METHOD test_get_order_count.
    DATA(lv_result) = f_cut->get_order_count( iv_customer = 'USCU_S11' ).

    cl_abap_unit_assert=>assert_equals(
      act = lv_result
      exp = 210
      msg = 'Nombre de commandes incorrect'
    ).
  ENDMETHOD.

ENDCLASS.
```

### 🍧 IMPLEMENTATION

```abap
METHOD setup.
  CREATE OBJECT f_cut.
ENDMETHOD.
```

> [!NOTE]
> Crée une instance de la classe à tester (`zcl_customer_orders`) et la stocke dans `f_cut`.

> [!NOTE]
> Permet de réutiliser le même objet dans tous les tests.

```abap
METHOD test_get_order_count.
  DATA(lv_result) = f_cut->get_order_count( iv_customer = 'USCU_S11' ).
```

> [!NOTE]
> Appel de la méthode get_order_count sur l’objet testé (f_cut) avec un client spécifique ('USCU_S11').

> [!NOTE]
> Stocke le résultat dans lv_result.

```abap
  cl_abap_unit_assert=>assert_equals(
    act = lv_result
    exp = 210
    msg = 'Nombre de commandes incorrect'
  ).
```

> [!NOTE]
> Vérifie que le résultat (`act`) correspond à la valeur attendue (exp = 210).

> [!NOTE]
> Si ce n’est pas le cas, `ABAP Unit` affiche le message 'Nombre de commandes incorrect' et le test échoue.

> [!IMPORTANT]
> Il s'agit de la méthode de test. Cette dernière vérifie une égalité. Il existe d'autres méthodes d'Assertion.

### 🍧 RESUME FONCTIONNEL

> [!IMPORTANT]
>
> - `ltc_customer_orders` est une classe de test `ABAP Unit`.
> - `setup` prépare l’environnement (instanciation de l’objet à tester).
> - `test_get_order_count` exécute le test fonctionnel, compare le résultat réel au résultat attendu, et signale toute divergence via l’assertion.
