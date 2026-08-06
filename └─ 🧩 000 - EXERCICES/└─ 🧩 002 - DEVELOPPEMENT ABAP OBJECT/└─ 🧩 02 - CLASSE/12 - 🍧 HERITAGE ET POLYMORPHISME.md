# 🌸 EXERCICES — HÉRITAGE ET POLYMORPHISME

## 🌺 OBJECTIFS

- créer une superclasse abstraite ;
- créer deux sous-classes ;
- redéfinir une méthode ;
- utiliser une référence de superclasse ;
- comprendre l’upcast et le downcast ;
- utiliser l’héritage avec parcimonie.

## 🌺 DURÉE INDICATIVE

90 à 120 minutes.

## 🌺 SUPERCLASSE

```text
ZCL_<TRI>_SHAPE
```

Propriétés :

```text
ABSTRACT
CREATE PROTECTED ou PUBLIC selon la conception
```

Méthode publique abstraite :

```text
GET_AREA
RETURNING RV_AREA TYPE DECFLOAT34
```

## 🌺 SOUS-CLASSES

```text
ZCL_<TRI>_RECTANGLE
ZCL_<TRI>_CIRCLE
```

### Rectangle

Attributs :

```text
MV_WIDTH
MV_HEIGHT
```

### Cercle

Attribut :

```text
MV_RADIUS
```

Constante privée ou publique :

```text
GC_PI TYPE DECFLOAT34 VALUE '3.141592653589793'
```

## 🌺 EXERCICE 1 — CONSTRUCTEURS

Initialiser les dimensions et refuser les valeurs négatives ou nulles.

## 🌺 EXERCICE 2 — REDÉFINITION

Rectangle :

```abap
METHOD get_area.

  rv_area =
    mv_width * mv_height.

ENDMETHOD.
```

Cercle :

```abap
METHOD get_area.

  rv_area =
    gc_pi * mv_radius * mv_radius.

ENDMETHOD.
```

## 🌺 EXERCICE 3 — POLYMORPHISME

```abap
DATA lt_shapes TYPE STANDARD TABLE OF REF TO zcl_<tri>_shape
  WITH EMPTY KEY.

APPEND NEW zcl_<tri>_rectangle(
  iv_width  = 4
  iv_height = 5
) TO lt_shapes.

APPEND NEW zcl_<tri>_circle(
  iv_radius = 2
) TO lt_shapes.

LOOP AT lt_shapes INTO DATA(lo_shape).

  WRITE / lo_shape->get_area( ).

ENDLOOP.
```

## 🌺 EXERCICE 4 — UPCAST

Une référence de rectangle peut être affectée à une référence de forme.

L’opération est sûre car un rectangle est une forme.

## 🌺 EXERCICE 5 — DOWNCAST

Un cast vers rectangle n’est valide que si l’objet réel est un rectangle.

Traiter :

```text
CX_SY_MOVE_CAST_ERROR
```

ou vérifier le type avant le cast.

## 🌺 EXERCICE 6 — SUPER CONSTRUCTOR

Dans une sous-classe possédant un constructeur et une superclasse avec paramètres :

```abap
super->constructor(
  ...
).
```

L’appel doit être positionné conformément aux règles du constructeur ABAP.

## 🌺 EXERCICE 7 — FINAL

Expliquer :

- classe `FINAL` ;
- méthode `FINAL` ;
- méthode `ABSTRACT` ;
- classe abstraite non instanciable.

## 🌺 DIAGNOSTIC

Utiliser l’héritage uniquement pour partager une méthode utilitaire sans relation « est un ».

Reconcevoir avec composition ou méthode statique.

## 🌺 CRITÈRES DE VALIDATION

- [ ] La superclasse est abstraite.
- [ ] La méthode est abstraite.
- [ ] Deux sous-classes sont créées.
- [ ] La méthode est redéfinie.
- [ ] La boucle utilise une référence de superclasse.
- [ ] Le bon calcul est exécuté dynamiquement.
- [ ] Le downcast risqué est traité.
- [ ] La composition est proposée lorsque l’héritage est artificiel.

<details>
<summary>🍧 Afficher la solution</summary>

Principe :

```text
Référence statique : ZCL_<TRI>_SHAPE
Objet réel         : RECTANGLE ou CIRCLE
Méthode exécutée   : redéfinition de l’objet réel
```

ABAP Objects utilise l’héritage simple : une classe possède au plus une superclasse directe.

</details>
