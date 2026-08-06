# 🌸 EXERCICES — RÉFÉRENCES ET INSTANCIATION

## 🌺 OBJECTIFS

- déclarer une référence ;
- créer un objet avec `NEW` ;
- distinguer référence initiale et objet ;
- affecter une référence ;
- observer l’aliasing ;
- utiliser `IS BOUND`.

## 🌺 DURÉE INDICATIVE

60 à 75 minutes.

## 🌺 CLASSE

```text
ZCL_<TRI>_COUNTER
```

Attribut privé :

```text
MV_COUNT TYPE I
```

Méthodes :

```text
INCREMENT
GET_COUNT
```

## 🌺 EXERCICE 1 — TROIS RÉFÉRENCES

```abap
DATA(lo_counter_1) =
  NEW zcl_<tri>_counter( ).

DATA(lo_counter_2) =
  NEW zcl_<tri>_counter( ).

DATA(lo_alias) =
  lo_counter_1.
```

## 🌺 EXERCICE 2 — APPELS

```abap
lo_counter_1->increment( ).
lo_alias->increment( ).
lo_counter_2->increment( ).
```

Attendu :

```text
counter_1 = 2
alias     = 2
counter_2 = 1
```

## 🌺 EXERCICE 3 — IS INITIAL ET IS BOUND

Tester :

```abap
DATA lo_empty TYPE REF TO zcl_<tri>_counter.

IF lo_empty IS INITIAL.
  " Aucun objet référencé
ENDIF.

IF lo_counter_1 IS BOUND.
  " Référence utilisable
ENDIF.
```

## 🌺 EXERCICE 4 — CLEAR

```abap
CLEAR lo_alias.
```

Répondre :

1. l’objet est-il détruit immédiatement si `LO_COUNTER_1` le référence encore ?
2. le compteur reste-t-il accessible ?
3. quand un objet peut-il être récupéré par le garbage collector ?
4. une référence initiale est-elle bound ?

## 🌺 EXERCICE 5 — CREATE OBJECT

Comparer :

```abap
CREATE OBJECT lo_counter_1.
```

et :

```abap
lo_counter_1 =
  NEW zcl_<tri>_counter( ).
```

## 🌺 DIAGNOSTIC

Appeler une méthode via une référence initiale.

Corriger avec un contrôle ou une construction garantie.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Trois références sont déclarées.
- [ ] Deux objets sont créés.
- [ ] Deux références désignent le premier objet.
- [ ] Les compteurs attendus sont obtenus.
- [ ] `IS BOUND` est utilisé.
- [ ] `CLEAR` d’une référence est compris.
- [ ] La référence initiale est sécurisée.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
METHOD increment.

  mv_count = mv_count + 1.

ENDMETHOD.

METHOD get_count.

  rv_count = mv_count.

ENDMETHOD.
```

L’affectation :

```abap
lo_alias = lo_counter_1.
```

copie la référence, pas l’objet.

</details>
