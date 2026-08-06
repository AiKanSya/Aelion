# 🌸 EXERCICES — CLASSES GLOBALES ET OBJETS

## 🌺 OBJECTIFS

- définir classe, objet et référence ;
- créer une classe globale ;
- ajouter une méthode publique ;
- instancier la classe ;
- distinguer identité et contenu.

## 🌺 DURÉE INDICATIVE

45 à 60 minutes.

## 🌺 EXERCICE 1 — RESTITUTION

Compléter :

| Notion          | Définition |
| --------------- | ---------- |
| Classe          |            |
| Objet           |            |
| Référence objet |            |
| Instance        |            |
| État            |            |
| Comportement    |            |

## 🌺 EXERCICE 2 — CRÉATION

Créer dans `SE24` :

```text
ZCL_<TRI>_PERSON
```

Description :

```text
Représentation simple d’une personne
```

Créer la méthode publique :

```text
SAY_HELLO
```

Returning :

```text
RV_TEXT TYPE STRING
```

## 🌺 EXERCICE 3 — IMPLÉMENTATION

```abap
METHOD say_hello.

  rv_text = `Bonjour`.

ENDMETHOD.
```

## 🌺 EXERCICE 4 — INSTANCIATION

```abap
DATA(lo_person) =
  NEW zcl_<tri>_person( ).

DATA(lv_text) =
  lo_person->say_hello( ).

WRITE / lv_text.
```

## 🌺 EXERCICE 5 — DEUX OBJETS

Créer deux instances :

```abap
DATA(lo_person_1) = NEW zcl_<tri>_person( ).
DATA(lo_person_2) = NEW zcl_<tri>_person( ).
```

Répondre :

1. les deux références sont-elles initiales ?
2. désignent-elles le même objet ?
3. les deux objets peuvent-ils produire le même texte ?
4. l’égalité du résultat implique-t-elle l’identité de l’objet ?

## 🌺 DIAGNOSTIC

Cas incorrect :

```abap
DATA lo_person TYPE REF TO zcl_<tri>_person.

DATA(lv_text) =
  lo_person->say_hello( ).
```

Symptôme attendu :

```text
Accès à une référence initiale
```

Corriger en instanciant la classe.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Les trois notions sont distinguées.
- [ ] La classe globale existe.
- [ ] La méthode est publique.
- [ ] Le report crée un objet.
- [ ] Le texte est retourné.
- [ ] Deux objets distincts sont compris.
- [ ] La référence initiale est corrigée.

<details>
<summary>🍧 Afficher la solution</summary>

| Notion       | Définition                                         |
| ------------ | -------------------------------------------------- |
| Classe       | Modèle définissant des composants et comportements |
| Objet        | Instance concrète d’une classe                     |
| Référence    | Variable contenant une référence vers un objet     |
| Instance     | Objet créé à partir de la classe                   |
| État         | Valeurs des attributs d’un objet                   |
| Comportement | Méthodes proposées par la classe                   |

Programme :

```abap
REPORT zaelion_<tri>_class_test.

DATA(lo_person) =
  NEW zcl_<tri>_person( ).

WRITE / lo_person->say_hello( ).
```

</details>
