# 🌸 UTILISER UNE CLASSE DE MESSAGES DANS UNE CLASSE ABAP

## 🌺 OBJECTIFS

- [ ] Référencer une classe de messages `SE91` depuis une classe ABAP.
- [ ] Construire un message sans interrompre le traitement.
- [ ] Récupérer identifiant, numéro, type, variables et texte.
- [ ] Ajouter le message à un journal interne.

## 🌺 DÉCLARATION

Une classe globale peut déclarer une classe de messages par défaut :

```abap
CLASS zcl_demo_import DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC
  MESSAGE-ID z_demo_import.
```

Cette déclaration permet d'omettre le nom de la classe dans certaines instructions `MESSAGE`. Une référence explicite reste possible et rend parfois le code plus lisible.

## 🌺 AFFICHER OU CONSTRUIRE

Dans une classe de traitement, afficher immédiatement `MESSAGE ... TYPE 'E'` peut interrompre ou modifier le flux selon le contexte d'exécution. Pour un import collectif, il faut souvent construire le texte et le stocker.

```abap
MESSAGE e004(z_demo_import)
  WITH iv_field iv_line_no
  INTO DATA(lv_message).
```

Avec `INTO`, le texte est construit dans `lv_message`. Les variables système de message sont alimentées :

| Variable | Contenu |
| --- | --- |
| `sy-msgid` | classe de messages |
| `sy-msgno` | numéro |
| `sy-msgty` | type |
| `sy-msgv1` à `sy-msgv4` | variables de substitution |

## 🌺 AJOUT AU JOURNAL

```abap
MESSAGE e004(z_demo_import)
  WITH iv_field iv_line_no
  INTO DATA(lv_message).

add_log(
  iv_line_no = iv_line_no
  iv_msgty   = sy-msgty
  iv_msgid   = sy-msgid
  iv_msgno   = sy-msgno
  iv_message = lv_message ).
```

Copier les variables système immédiatement après `MESSAGE`. Une autre instruction de message peut les remplacer.

## 🌺 SIGNATURE CONSEILLÉE

```abap
METHODS add_log
  IMPORTING
    iv_line_no TYPE i OPTIONAL
    iv_msgty   TYPE bapi_mtype
    iv_msgid   TYPE symsgid OPTIONAL
    iv_msgno   TYPE symsgno OPTIONAL
    iv_message TYPE bapi_msg.
```

Le journal peut contenir à la fois :

- un message applicatif provenant de `SE91` ;
- un message SAP déjà fourni sous forme de `BAPIRET2` ;
- un texte technique produit par une exception.

## 🌺 MESSAGE PROVENANT D'UNE EXCEPTION

```abap
TRY.
    " Traitement
  CATCH cx_root INTO DATA(lx_error).
    add_log(
      iv_msgty   = 'E'
      iv_message = CONV bapi_msg( lx_error->get_text( ) ) ).
ENDTRY.
```

Capturer `CX_ROOT` uniquement à une frontière technique où l'erreur doit être journalisée. Dans le code métier, préférer les classes d'exception précises.

## 🌺 ERREURS FRÉQUENTES

- afficher un message bloquant dans une boucle d'import ;
- stocker uniquement le texte et perdre `MSGID`/`MSGNO` lorsqu'ils existent ;
- lire `sy-msg*` après une autre instruction qui les a modifiés ;
- dupliquer le même texte en dur dans plusieurs méthodes ;
- remplacer un message SAP précis par un message générique.

## 🌺 EXERCICE

Créer un message `004` contenant le nom du champ et le numéro de ligne, le construire avec `INTO`, puis ajouter ses informations dans une table interne de journal sans afficher de popup.

## 🌺 RÉSUMÉ

> - `MESSAGE ... INTO` construit un texte sans imposer un affichage immédiat.
> - `sy-msgid`, `sy-msgno`, `sy-msgty` et `sy-msgv1` à `sy-msgv4` portent le contexte technique.
> - Le journal centralise les messages applicatifs, SAP et techniques.
