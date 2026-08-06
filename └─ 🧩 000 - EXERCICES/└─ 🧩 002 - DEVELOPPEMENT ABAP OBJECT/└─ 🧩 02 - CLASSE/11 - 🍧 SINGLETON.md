# 🌸 EXERCICES — SINGLETON DANS SE24

## 🌺 OBJECTIFS

- configurer l’instanciation privée ;
- créer `GET_INSTANCE` ;
- stocker la référence unique ;
- vérifier l’identité ;
- expliquer les limites ;
- éviter un état global caché.

## 🌺 DURÉE INDICATIVE

70 à 90 minutes.

## 🌺 CLASSE

```text
ZCL_<TRI>_SETTINGS
```

Propriété d’instanciation :

```text
CREATE PRIVATE
```

## 🌺 ATTRIBUT STATIQUE PRIVÉ

```text
GO_INSTANCE TYPE REF TO ZCL_<TRI>_SETTINGS
```

## 🌺 MÉTHODE STATIQUE PUBLIQUE

```text
GET_INSTANCE
```

Returning :

```text
RO_INSTANCE TYPE REF TO ZCL_<TRI>_SETTINGS
```

## 🌺 IMPLÉMENTATION

```abap
METHOD get_instance.

  IF go_instance IS NOT BOUND.

    go_instance =
      NEW zcl_<tri>_settings( ).

  ENDIF.

  ro_instance =
    go_instance.

ENDMETHOD.
```

## 🌺 EXERCICE 1 — TEST

```abap
DATA(lo_settings_1) =
  zcl_<tri>_settings=>get_instance( ).

DATA(lo_settings_2) =
  zcl_<tri>_settings=>get_instance( ).

IF lo_settings_1 = lo_settings_2.
  WRITE / 'Même référence'.
ENDIF.
```

## 🌺 EXERCICE 2 — INSTANCIATION DIRECTE

Tenter :

```abap
NEW zcl_<tri>_settings( ).
```

depuis le report.

Le contrôle syntaxique doit refuser l’accès au constructeur privé.

## 🌺 EXERCICE 3 — ÉTAT

Ajouter une propriété de test et vérifier qu’elle est visible via les deux références.

## 🌺 EXERCICE 4 — LIMITES

Répondre :

1. l’unicité couvre-t-elle tous les utilisateurs ?
2. couvre-t-elle plusieurs sessions internes ?
3. couvre-t-elle un appel RFC distinct ?
4. le Singleton facilite-t-il les tests unitaires ?
5. peut-il masquer des dépendances ?

## 🌺 RECTIFICATION

Le Singleton est un pattern, pas une obligation pour les services.

Une factory ou l’injection d’une instance peut être préférable.

## 🌺 CRITÈRES DE VALIDATION

- [ ] L’instanciation est privée.
- [ ] La référence statique est privée.
- [ ] `GET_INSTANCE` est statique.
- [ ] Deux appels retournent la même référence.
- [ ] L’instanciation directe est refusée.
- [ ] La portée réelle de l’unicité est expliquée.
- [ ] Les limites de testabilité sont comprises.

<details>
<summary>🍧 Afficher la solution</summary>

Le Singleton garantit ici :

```text
une référence mémorisée par la classe
dans la session interne courante
```

Il ne constitue pas une instance unique distribuée à l’échelle du système SAP.

</details>
