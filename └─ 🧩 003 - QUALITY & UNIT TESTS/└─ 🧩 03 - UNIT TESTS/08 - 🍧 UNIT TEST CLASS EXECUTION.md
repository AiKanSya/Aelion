# 🌸 UNIT TEST CLASS EXECUTION

## 🧩 TESTS DE MODULE

> [!NOTE]
> Tests de modules
>
> - Lancer `ABAP Unit` sur la classe sélectionnée.
> - Exécuter toutes les méthodes FOR TESTING.
> - Afficher succès / échecs / messages.
> - Option standard pour exécuter les tests.

### 🍧 EXECUTE & BEHAVIOR IN CASE OF SUCCESS

![](../assets/Capture%20d’écran%202026-01-14%20162343.png)

![](../assets/Capture%20d’écran%202026-01-14%20162449.png)

### 🍧 EXECUTE & BEHAVIOR IN CASE OF FAILURE

> [!NOTE]
> Pour tester les échecs dans la cadre de la démo, nous allons ajouter volontairement des erreurs :
>
> - DEFINITION SECTION
>
>   - (+)Déclaration de `f_cut_not_created TYPE REF TO zcl_customer_orders_fgi`
>
> - IMPLEMENTATION SECTION
>   - (+)Implémentation de la méthode `assert_not_initial` sur `f_cut_not_created` (sans pour autant avoir créer cet objet)
>   - (+)Implémentation de la méthode `assert_equals` avec un résultat espérer de `10`

```abap
CLASS ltc_customer_orders DEFINITION
 FOR TESTING
 DURATION SHORT
 RISK LEVEL HARMLESS.

  PRIVATE SECTION.
    DATA: f_cut TYPE REF TO zcl_customer_orders_fgi,
          f_cut_not_created TYPE REF TO zcl_customer_orders_fgi. " (+)FGI-15/01/2026 : Déclaration de `f_cut_not_created`

    METHODS: setup,
      test_get_order_count FOR TESTING.

ENDCLASS.

CLASS ltc_customer_orders IMPLEMENTATION.

  METHOD setup.
    CREATE OBJECT f_cut.
  ENDMETHOD.

  METHOD test_get_order_count.
    DATA(lv_result) = f_cut->get_order_count( iv_customer = 'USCU_S11' ).

    "--- Vérifier qu’un objet est instancié dans `setup`
    cl_abap_unit_assert=>assert_not_initial(
      act = f_cut
      msg = 'Objet CUT non créé'
    ).

    cl_abap_unit_assert=>assert_not_initial(                    " (+)FGI-15/01/2026 : Implémentation de `assert_not_initial` sur `f_cut_not_created`
      act = f_cut_not_created
      msg = 'Objet CUT non créé'
    ).

    "--- Tester le nombre de commandes d’un client
    cl_abap_unit_assert=>assert_equals(
      act = lv_result
      exp = 210
      msg = 'Nombre de commandes incorrect'
    ).

    cl_abap_unit_assert=>assert_equals(                         " (+)FGI-15/01/2026 : Implémentation de `assert_equals` avec expectation à 10.
      act = lv_result
      exp = 10
      msg = 'Nombre de commandes incorrect'
    ).

  ENDMETHOD.

ENDCLASS.
```

![](../assets/Capture%20d’écran%202026-01-15%20095415.png)

![](../assets/Capture%20d’écran%202026-01-15%20095516.png)

## 🧩 TESTS DE MODULE AVEC → COUVERTURE

> [!NOTE]
> Tests de modules avec → `Couverture`
>
> - Identique à Tests de modules.
> - Ajoute l’analyse de `couverture` de code :
>   - quelles méthodes / lignes ont été exécutées.
> - Plus lent.
> - Utile pour audit qualité, pas pour validation fonctionnelle simple.

> [!WARNING]
> Le `Coverage Analyzer` ne supporte pas :
>
> - Classes `FINAL`
> - avec accès `DB direct`
> - exécutées via `SE24`
> - dans certaines versions SAP (`ECC` / `S-4` anciens).
>
> Lancer cette version avec une classe répondant à au un de ces critères engendrera un Dump :
>
> ![](../assets/Capture%20d’écran%202026-01-14%20163234.png)
>
> Pour info, le dump ci-dessus ne signale pas une erreur logique, mais une politique système. Ce n’est pas une erreur fonctionnelle, ni une erreur ABAP Unit, ni un cas limite.

## 🧩 DANS L'ENVIRONNEMENT DE TEST

> [!NOTE]
> Dans l’environnement de test
>
> - Exécute la classe comme un programme.
> - Ignore `ABAP Unit`.
> - Nécessite une méthode statique exécutable (`IF_OO_ADT_CLASSRUN` ou équivalent).
> - Inutile pour les tests ABAP Unit.

![](../assets/Capture%20d’écran%202026-01-14%20165533.png)

![](../assets/Capture%20d’écran%202026-01-14%20165610.png)

![](../assets/Capture%20d’écran%202026-01-14%20165727.png)

![](../assets/Capture%20d’écran%202026-01-14%20165803.png)
