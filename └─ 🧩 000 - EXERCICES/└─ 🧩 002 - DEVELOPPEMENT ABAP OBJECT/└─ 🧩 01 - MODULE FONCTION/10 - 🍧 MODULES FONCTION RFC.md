# 🌸 EXERCICES — MODULES FONCTION RFC

## 🌺 OBJECTIFS

- créer un module remote-enabled ;
- utiliser une interface compatible RFC ;
- appeler avec `DESTINATION` ;
- traiter les erreurs techniques ;
- distinguer les variantes RFC.

## 🌺 DURÉE INDICATIVE

70 à 90 minutes.

## 🌺 MODULE

```text
Z_<TRI>_ADD_RFC
```

Interface par valeur :

```text
IV_VALUE_1 TYPE I
IV_VALUE_2 TYPE I
EV_RESULT  TYPE I
```

Type :

```text
Remote-Enabled Module
```

## 🌺 EXERCICE 1 — APPEL LOCAL

```abap
CALL FUNCTION 'Z_<TRI>_ADD_RFC'
  EXPORTING
    iv_value_1 = 2
    iv_value_2 = 3
  IMPORTING
    ev_result  = DATA(lv_result).
```

## 🌺 EXERCICE 2 — APPEL DISTANT AUTORISÉ

Selon la configuration du système :

```abap
CALL FUNCTION 'Z_<TRI>_ADD_RFC'
  DESTINATION lv_destination
  EXPORTING
    iv_value_1 = 2
    iv_value_2 = 3
  IMPORTING
    ev_result  = lv_result
  EXCEPTIONS
    system_failure        = 1 MESSAGE lv_message
    communication_failure = 2 MESSAGE lv_message
    OTHERS                = 3.
```

## 🌺 EXERCICE 3 — ERREURS

| `sy-subrc` | Cas                     |
| ---------: | ----------------------- |
|        `0` | succès                  |
|        `1` | erreur du système cible |
|        `2` | communication           |
|        `3` | autre erreur mappée     |

## 🌺 EXERCICE 4 — INTERFACE

Expliquer pourquoi éviter :

- références d’objet ;
- types locaux privés ;
- dialogue SAP GUI ;
- popup ;
- état global ;
- dépendance à la session appelante.

## 🌺 EXERCICE 5 — VARIANTES

| Forme | Principe                                   |
| ----- | ------------------------------------------ |
| sRFC  | appel synchrone                            |
| aRFC  | appel asynchrone avec retour               |
| tRFC  | exécution transactionnelle enregistrée     |
| qRFC  | tRFC ordonnée par file                     |
| bgRFC | traitement distant moderne en arrière-plan |

## 🌺 DIAGNOSTIC

Un module RFC utilise :

```abap
CALL SCREEN 100.
```

Expliquer pourquoi l’appel distant n’est pas fiable.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le module est remote-enabled.
- [ ] Les paramètres sont par valeur.
- [ ] L’appel local fonctionne.
- [ ] La destination est gérée.
- [ ] Les deux erreurs spéciales sont mappées.
- [ ] Aucun dialogue n’est utilisé.
- [ ] Les variantes sont distinguées.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
CALL FUNCTION 'Z_<TRI>_ADD_RFC'
  DESTINATION lv_destination
  EXPORTING
    iv_value_1 = 10
    iv_value_2 = 20
  IMPORTING
    ev_result  = DATA(lv_result)
  EXCEPTIONS
    system_failure        = 1 MESSAGE DATA(lv_message)
    communication_failure = 2 MESSAGE lv_message
    OTHERS                = 3.

CASE sy-subrc.
  WHEN 0.
    WRITE / lv_result.
  WHEN 1.
    WRITE / |Erreur du système cible : { lv_message }|.
  WHEN 2.
    WRITE / |Communication impossible : { lv_message }|.
  WHEN OTHERS.
    WRITE / 'Erreur RFC non classée'.
ENDCASE.
```

</details>
