# 🌸 EXERCICES — MÉTHODES STATIQUES DE CLASSES STANDARD

## 🌺 OBJECTIFS

- rechercher une classe standard ;
- appeler une méthode avec `=>` ;
- traiter son exception ;
- générer plusieurs UUID ;
- vérifier format et échantillon ;
- ne pas instancier inutilement.

## 🌺 DURÉE INDICATIVE

55 à 70 minutes.

## 🌺 CLASSE STANDARD

```text
CL_SYSTEM_UUID
```

Méthode utilisée selon la version :

```text
CREATE_UUID_C32_STATIC
```

Vérifier la signature réelle dans `SE24`.

## 🌺 EXERCICE 1 — GÉNÉRATION

```abap
DATA lt_uuids TYPE STANDARD TABLE OF sysuuid_c32
  WITH EMPTY KEY.

DO 5 TIMES.

  TRY.

      APPEND
        cl_system_uuid=>create_uuid_c32_static( )
        TO lt_uuids.

    CATCH cx_uuid_error INTO DATA(lx_uuid).

      WRITE / lx_uuid->get_text( ).
      EXIT.

  ENDTRY.

ENDDO.
```

## 🌺 EXERCICE 2 — LONGUEUR

Vérifier pour chaque UUID :

```text
32 caractères
```

Le type `SYSUUID_C32` porte déjà cette représentation.

## 🌺 EXERCICE 3 — DOUBLONS DANS L’ÉCHANTILLON

Copier dans une table triée à clé unique ou trier puis rechercher les doublons.

Résultat attendu pour cinq générations :

```text
aucun doublon
```

Cette vérification ne constitue pas une preuve mathématique d’unicité globale.

## 🌺 EXERCICE 4 — PAS D’INSTANCE

Ne pas écrire :

```abap
NEW cl_system_uuid( ).
```

La méthode est statique et s’appelle avec `=>`.

## 🌺 EXERCICE 5 — AUTRES REPRÉSENTATIONS

Consulter dans `SE24` les méthodes disponibles :

```text
C22
C26
C32
X16
```

Choisir selon le type cible et le contrat de persistance.

## 🌺 DIAGNOSTIC

Stocker un UUID C32 dans un champ de longueur 16.

Décrire la troncature et corriger le type DDIC.

## 🌺 CRITÈRES DE VALIDATION

- [ ] La classe est ouverte dans `SE24`.
- [ ] La méthode statique réelle est vérifiée.
- [ ] Cinq UUID sont produits.
- [ ] `CX_UUID_ERROR` est traitée.
- [ ] Le type possède une longueur adaptée.
- [ ] Aucun objet n’est instancié.
- [ ] Le contrôle d’échantillon n’est pas présenté comme preuve absolue.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
TRY.

    DATA(lv_uuid) =
      cl_system_uuid=>create_uuid_c32_static( ).

    WRITE / lv_uuid.

  CATCH cx_uuid_error INTO DATA(lx_error).

    MESSAGE lx_error
      TYPE 'S'
      DISPLAY LIKE 'E'.

ENDTRY.
```

La disponibilité exacte des méthodes dépend de la version ABAP. La signature installée dans `SE24` reste la référence.

</details>
