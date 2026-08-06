# 🌸 EXERCICES — UTILISER UNE CLASSE DE MESSAGES DANS UNE CLASSE ABAP

## 🌺 OBJECTIFS

- créer une classe de messages `SE91` ;
- construire un message avec `INTO` ;
- récupérer les informations techniques ;
- ajouter le message à un journal ;
- ne pas imposer de popup ;
- distinguer message class et ABAP class.

## 🌺 DURÉE INDICATIVE

75 à 95 minutes.

## 🌺 CLASSE DE MESSAGES

Créer dans `SE91` :

```text
Z<TRI>_MSG
```

Message :

```text
004  Champ &1 invalide à la ligne &2
```

## 🌺 TYPE DE JOURNAL

Dans une classe de validation, créer :

```abap
TYPES tt_messages TYPE STANDARD TABLE OF bapiret2
  WITH EMPTY KEY.
```

Attribut privé :

```text
MT_MESSAGES TYPE TT_MESSAGES
```

## 🌺 MÉTHODE PRIVÉE

```text
ADD_FIELD_ERROR
```

Importing :

```text
IV_FIELD TYPE STRING
IV_LINE  TYPE I
```

## 🌺 CONSTRUCTION DU MESSAGE

```abap
MESSAGE ID 'Z<TRI>_MSG'
  TYPE 'E'
  NUMBER '004'
  WITH iv_field iv_line
  INTO DATA(lv_text).
```

Après cette instruction, récupérer les champs système du message immédiatement.

## 🌺 AJOUT AU JOURNAL

```abap
APPEND VALUE #(
  type       = sy-msgty
  id         = sy-msgid
  number     = sy-msgno
  message    = lv_text
  message_v1 = sy-msgv1
  message_v2 = sy-msgv2
  parameter  = iv_field
  row        = iv_line
  field      = iv_field
) TO mt_messages.
```

Vérifier le type exact de `BAPIRET2-ROW` sur le système et convertir si nécessaire.

## 🌺 EXERCICE 1 — DEUX ERREURS

Ajouter :

```text
CITY invalide à la ligne 2
LEVEL invalide à la ligne 5
```

## 🌺 EXERCICE 2 — RESTITUTION

Créer une méthode :

```text
GET_MESSAGES
RETURNING RT_MESSAGES TYPE TT_MESSAGES
```

Le report décide d’afficher, exporter ou journaliser.

## 🌺 EXERCICE 3 — CLASSE D’EXCEPTION T100

Comparer avec une classe d’exception implémentant :

```text
IF_T100_MESSAGE
```

Une exception T100 est adaptée à une erreur propagée. Une table `BAPIRET2` est adaptée à un journal cumulatif.

## 🌺 RECTIFICATION

Une « classe de messages » créée dans `SE91` n’est pas une classe ABAP Objects. C’est un objet Repository regroupant des messages numérotés.

## 🌺 DIAGNOSTIC

Code incorrect :

```abap
MESSAGE e004(z<tri>_msg)
  WITH iv_field iv_line.
```

dans une classe de validation.

Symptôme :

- interruption ou dépendance au contexte ;
- impossibilité de cumuler plusieurs erreurs ;
- comportement inadapté en job ou service.

Corriger avec `INTO`.

## 🌺 CRITÈRES DE VALIDATION

- [ ] La classe de messages existe.
- [ ] Le message `004` possède deux variables.
- [ ] `MESSAGE ... INTO` est utilisé.
- [ ] Les champs `SY-MSG*` sont sauvegardés immédiatement.
- [ ] Deux erreurs sont cumulées.
- [ ] Le report récupère la table.
- [ ] Aucun popup n’est imposé.
- [ ] `SE91` et classe ABAP sont distinguées.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
METHOD add_field_error.

  MESSAGE ID 'Z<TRI>_MSG'
    TYPE 'E'
    NUMBER '004'
    WITH iv_field iv_line
    INTO DATA(lv_text).

  APPEND VALUE #(
    type       = sy-msgty
    id         = sy-msgid
    number     = sy-msgno
    message    = lv_text
    message_v1 = sy-msgv1
    message_v2 = sy-msgv2
    parameter  = iv_field
    row        = iv_line
    field      = iv_field
  ) TO mt_messages.

ENDMETHOD.
```

</details>
