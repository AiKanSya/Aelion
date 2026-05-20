# 🌸 UNIT TEST CLASS IMPLEMENTATION

- [ ] Comprendre comment créer une méthode de test `ABAP Unit`
- [ ] Savoir structurer une méthode de test simple
- [ ] Identifier le rôle de chaque méthode dans la classe de test
- [ ] Comprendre la séquence : setup → test → assertion → teardown

## 🧩 STRUCTURE DE BASE

```abap
*"* use this source file for your ``ABAP unit`` test classes

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

## 🧩 DÉCLARER UNE MÉTHODE DE TEST

> [!IMPORTANT]
> Chaque méthode qui teste une fonctionnalité doit être déclarée avec `FOR TESTING`

```abap
  METHODS test_get_order_count FOR TESTING.
```

> [!WARNING]
> La méthode doit être publique dans la classe de test ou déclarée dans la section privée avec `FOR TESTING`

## 🧩 NOMMER LES MÉTHODES

> [!IMPORTANT]
>
> - Convention : `test_<nom_fonction_métier>`
> - Objectif : savoir immédiatement quelle méthode métier est testée

```abap
  METHODS:
    test_calcul_tva FOR TESTING,
    test_valide_client FOR TESTING.
```

## 🧩 STRUCTURER LA LOGIQUE D'UNE MÉTHODE

1. Préparation des données : variables et objets nécessaires

```abap
  DATA lv_result TYPE i.
```

2. Appel de la méthode métier à tester

```abap
  lv_result = f_cut->get_order_count( iv_customer = 'USCU_S11' ).
```

3. Vérification du résultat avec `assertions`

```abap
  cl_abap_unit_assert=>assert_equals(
    act = lv_result,
    exp = 210,
    msg = 'Nombre de commandes incorrect'
  ).
```

> [!NOTE]
> Cette structure simple est suffisante pour un test unitaire clair et lisible

## 🧩 BEST PRACTICES

- Chaque méthode doit tester un seul scénario
- Éviter de combiner plusieurs méthodes métiers dans le même test
- Toujours fournir un message clair dans l’assertion
- Préparer les données dans la méthode ou via `setup` si elles sont réutilisées

## 🧩 SETUP ET TEARDOWN

> [!IMPORTANT]
> Le `setup` : initialise l’objet métier avant chaque test

```abap
  METHOD setup.
  CREATE OBJECT f_cut.
  ENDMETHOD.
```

> [!IMPORTANT]
> Le `teardown` : optionnel pour nettoyage

```abap
  METHOD teardown.
  " nettoyage si nécessaire
  ENDMETHOD.
```

> [!NOTE]
> Les méthodes de test peuvent utiliser les objets créés dans `setup` pour rester indépendantes

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

### 🍧 SECTION DEFINITION

```abap
PRIVATE SECTION.
  DATA: f_cut TYPE REF TO zcl_customer_orders.
  METHODS: setup,
           test_get_order_count FOR TESTING.
```

> [!NOTE]
> Définition de la Variable `f_cut` : variable de type référence vers la classe à tester (`CUT` = Class Under Test). Ici zcl_customer_orders.

> [!NOTE]
> Définition de la METHOD `setup `: méthode exécutée avant chaque test pour initialiser l’objet.

> [!NOTE]
> Définition de la METHOD `test_get_order_count FOR TESTING` : méthode qui contient un test unitaire, marquée pour que `ABAP Unit` la reconnaisse automatiquement.

### 🍧 SECTION IMPLEMENTATION

```abap
METHOD setup.
  CREATE OBJECT f_cut.
ENDMETHOD.
```

> [!NOTE]
> Crée une instance de la classe à tester (zcl_customer_orders) et la stocke dans `f_cut`.

> [!NOTE]
> Permet de réutiliser le même objet dans tous les tests.

```abap
METHOD test_get_order_count.
  DATA(lv_result) = f_cut->get_order_count( iv_customer = 'USCU_S11' ).
```

> [!NOTE]
> Appel de la méthode `get_order_count` sur l’objet testé (`f_cut`) avec un client spécifique ('USCU_S11').

> [!NOTE]
> Stocke le résultat dans `lv_result`.

```abap
  cl_abap_unit_assert=>assert_equals(
    act = lv_result
    exp = 210
    msg = 'Nombre de commandes incorrect'
  ).
```

> [!NOTE]
> Appel de la méthode d'Assertion `assert_equals` de la class `cl_abap_unit_assert`
> Cette méthode érifie que le résultat (`act`) correspond à la valeur attendue (`exp` = 210).

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
