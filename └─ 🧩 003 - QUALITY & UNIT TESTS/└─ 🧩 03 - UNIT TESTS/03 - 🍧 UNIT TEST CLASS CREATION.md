# 🌸 UNIT TEST CLASS CREATION

- [ ] Créer une classe de test unitaire ABAP pour une méthode d'une classe métier

## 🧩 PROCEDURE

> [!NOTE]
> Une méthode doit au moins exister dans la class à tester.
>
> Pour la démo, nous allons créé la classe `ZCL_CUSTOMER_ORDERS` en `SE24`.

```abap
CLASS zcl_customer_orders DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.
    METHODS: get_order_count
      IMPORTING iv_customer     TYPE kunnr
      RETURNING VALUE(rv_count) TYPE i.
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.

CLASS zcl_customer_orders IMPLEMENTATION.

  METHOD get_order_count.
    SELECT COUNT(*) FROM vbak
      INTO rv_count
      WHERE kunnr = iv_customer.
  ENDMETHOD.

ENDCLASS.
```

### 🍧 ABAP UNIT TEST CLASS CREATION

![](../assets/Capture%20d’écran%202026-01-14%20144443.png)

![](../assets/Capture%20d’écran%202026-01-14%20144522.png)

![](../assets/Capture%20d’écran%202026-01-14%20144808.png)

![](../assets/Capture%20d’écran%202026-01-14%20144840.png)

> [!CAUTION]
> Nommer la classe de test :
>
> - Classe : convention `ltc_<nom_classe>` (ltc = local test class)

![](../assets/Capture%20d’écran%202026-01-14%20144949.png)

![](../assets/Capture%20d’écran%202026-01-14%20145113.png)

![](../assets/Capture%20d’écran%202026-01-14%20145149.png)

![](../assets/Capture%20d’écran%202026-01-14%20145221.png)

![](../assets/Capture%20d’écran%202026-01-14%20145249.png)

![](../assets/Capture%20d’écran%202026-01-14%20145326.png)

> [!IMPORTANT]
> La `Unit Test Class` est accessible depuis l'interface `SE24` via le bouton 'Classes de test locales'.

![](../assets/Capture%20d’écran%202026-01-14%20145359.png)
