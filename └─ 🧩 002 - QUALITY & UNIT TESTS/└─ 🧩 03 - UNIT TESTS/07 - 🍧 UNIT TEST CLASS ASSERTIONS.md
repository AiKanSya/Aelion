# 🌸 UNIT TEST CLASS ASSERTIONS

- [ ] Comprendre le rôle des `assertions` dans les tests unitaires
- [ ] Savoir écrire des `assertions` simples et lisibles
- [ ] Appliquer des bonnes pratiques pour des tests clairs et maintenables

## 🧩 DÉFINITION

- Une `assertion` vérifie qu’une condition est vraie dans un test unitaire
- Si la condition échoue → le test est considéré comme échoué
- Exemple : vérifier qu’une méthode retourne le bon résultat

## 🧩 MOST USED ASSERTIONS

- `assert_equals` : compare une valeur réelle (`act`) à une valeur attendue (`exp`)

```abap
  cl_abap_unit_assert=>assert_equals(
    act = lv_result,
    exp = 210,
    msg = 'Nombre de commandes incorrect'
  ).
```

- `assert_not_initial` : vérifie qu’une variable n’est pas vide

```abap
  cl_abap_unit_assert=>assert_not_initial(
    act = lv_result,
    msg = 'Résultat vide inattendu'
  ).
```

- `assert_true` : vérifie qu’une condition logique est vraie

```abap
  cl_abap_unit_assert=>assert_true(
    act = lv_flag,
    msg = 'Le flag doit être vrai'
  ).
```

- `assert_false` : vérifie qu’une condition logique est fausse

```abap
  cl_abap_unit_assert=>assert_false(
    act = lv_flag,
    msg = 'Le flag doit être faux'
  ).
```

## 🧩 GOOD PRACTICES

> [!IMPORTANT]
>
> - Toujours comparer réel vs attendu (`act` vs `exp`)
> - Fournir un message clair pour comprendre l’échec
> - Éviter les assertions tautologiques (`act = act`)
> - Tester un seul résultat par assertion pour simplifier la lecture
> - Regrouper les assertions logiquement dans la méthode de test

## 🧩 EXEMPLES SIMPLES

- Tester le nombre de commandes d’un client

```abap
  DATA(lv_result) = f_cut->get_order_count( iv_customer = 'USCU_S11' ).

    cl_abap_unit_assert=>assert_equals(
    act = lv_result,
    exp = 210,
    msg = 'Nombre de commandes incorrect'
  ).
```

- Vérifier qu’un objet est instancié dans `setup`

```abap
  cl_abap_unit_assert=>assert_not_initial(
    act = f_cut
    msg = 'Objet CUT non créé'
  ).
```

Ce qui nous donnerait ceci :

```abap
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

    "--- Tester le nombre de commandes d’un client
    cl_abap_unit_assert=>assert_equals(
      act = lv_result
      exp = 200
      msg = 'Nombre de commandes incorrect'
    ).

  ENDMETHOD.

ENDCLASS.
```

## 🧩 ASSERTION LIST

> [!NOTE]
> Pour rappel, vous pouvez accéder à cette liste en allant dans la classe cl_abap_unit_assert.

| 🍧 METHOD                 | 🍧 TYPE       | 🍧 VISIBILITE | 🍧 DESCRIPTION                                              |
| ------------------------- | ------------- | ------------- | ----------------------------------------------------------- |
| ABORT                     | Static Method | Public        | DEPRECTATED - Use SKIP(): Unconditional skipping test       |
| ASSERT_BOUND              | Static Method | Public        | Assert the validity of the reference                        |
| ASSERT_CHAR_CP            | Static Method | Public        | Assert that character string fits to simple pattern         |
| ASSERT_CHAR_NP            | Static Method | Public        | Assert that character string does not fit to simple pattern |
| ASSERT_DIFFERS            | Static Method | Public        | Assert two data objects differ                              |
| ASSERT_EQUALS             | Static Method | Public        | Assert equality of two data objects                         |
| ASSERT_EQUALS_FLOAT       | Static Method | Public        | Assert approximate consistency of 2 floating point numbers  |
| ASSERT_FALSE              | Static Method | Public        | Assert that boolean equals ABAP_FALSE                       |
| ASSERT_INITIAL            | Static Method | Public        | Assert that data object value is initial                    |
| ASSERT_NOT_BOUND          | Static Method | Public        | Assert invalidity of the reference of a reference variable  |
| ASSERT_NOT_INITIAL        | Static Method | Public        | Assert value of data object is not initial                  |
| ASSERT_NUMBER_BETWEEN     | Static Method | Public        | Assert number is in given range                             |
| ASSERT_RETURN_CODE        | Static Method | Public        | Assert specific return code                                 |
| ASSERT_SUBRC              | Static Method | Public        | Assert specific value of system return code                 |
| ASSERT_TABLE_CONTAINS     | Static Method | Public        | Assert data is contained as line within internal table      |
| ASSERT_TABLE_NOT_CONTAINS | Static Method | Public        | Assert data is not contained as line in internal table      |
| ASSERT_TEXT_MATCHES       | Static Method | Public        | Assert text contains or matches regular expression          |
| ASSERT_TEXT_NOT_MATCHES   | Static Method | Public        | Assert text not contains or not matches regular expression  |
| ASSERT_THAT               | Static Method | Public        | Assert that constraint is met by data object                |
| ASSERT_TRUE               | Static Method | Public        | Assert boolean equals ABAP_TRUE                             |
| ASSUME_FALSE              | Static Method | Public        | Ensures boolean equals ABAP_FALSE, skip test else           |
| ASSUME_RETURN_CODE        | Static Method | Public        | Ensures return code, skip test else                         |
| ASSUME_THAT               | Static Method | Public        | Ensures data object statisfies constraint, skip test else   |
| ASSUME_TRUE               | Static Method | Public        | Ensures boolean equals ABAP_TRUE, skip test else            |
| FAIL                      | Static Method | Public        | Unconditional assertion                                     |
| SKIP                      | Static Method | Public        | Unconditional skipping test                                 |
