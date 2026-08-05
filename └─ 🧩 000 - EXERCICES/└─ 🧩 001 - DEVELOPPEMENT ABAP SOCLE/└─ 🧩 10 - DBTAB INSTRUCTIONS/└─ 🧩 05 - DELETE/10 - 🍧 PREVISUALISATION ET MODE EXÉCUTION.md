# 🌸 EXERCICES — PRÉVISUALISATION ET MODE EXÉCUTION

## 🌺 OBJECTIFS

- séparer analyse et écriture ;
- utiliser un mode simulation ;
- afficher le périmètre ;
- demander une action explicite ;
- limiter le nombre maximal ;
- empêcher une suppression inattendue.

## 🌺 DURÉE INDICATIVE

50 à 65 minutes.

## 🌺 ÉCRAN

```abap
PARAMETERS:
  p_from TYPE zde_<tri>_oid DEFAULT '9300000050',
  p_to   TYPE zde_<tri>_oid DEFAULT '9300000059',
  p_exec AS CHECKBOX DEFAULT abap_false.
```

## 🌺 RÈGLES

- les deux bornes sont obligatoires ;
- `p_from <= p_to`;
- les bornes doivent appartenir à la plage `9300000000` à `9300000099`;
- le nombre maximal autorisé est `10`;
- le mode par défaut est la simulation ;
- aucune suppression en mode simulation.

## 🌺 EXERCICE 1 — PRÉVISUALISATION

Lire les lignes comprises entre les bornes.

Afficher :

```text
Identifiant
Client
Statut
Montant
Devise
```

## 🌺 EXERCICE 2 — CONTRÔLES

Refuser si :

```text
borne vide
ordre invalide
borne hors plage
plus de 10 lignes
aucune ligne
```

## 🌺 EXERCICE 3 — SIMULATION

Lorsque :

```text
p_exec = espace
```

afficher :

```text
SIMULATION : aucune ligne supprimée
```

## 🌺 EXERCICE 4 — EXÉCUTION

Lorsque :

```text
p_exec = X
```

supprimer uniquement les lignes prévisualisées à l’aide de la table interne lue.

Comparer :

```abap
sy-dbcnt
```

à :

```abap
lines( lt_preview )
```

## 🌺 EXERCICE 5 — TRANSACTION

Exécuter un rollback par défaut dans l’exercice.

Ne pas rendre la suppression permanente.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Les bornes sont contrôlées.
- [ ] La plage de sécurité est imposée.
- [ ] Le nombre maximal est imposé.
- [ ] Le résultat est affiché avant l’écriture.
- [ ] Le mode par défaut ne supprime rien.
- [ ] Le mode exécution utilise exactement la prévisualisation.
- [ ] Le nombre supprimé est vérifié.
- [ ] Le rollback protège le test.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
IF p_from IS INITIAL
   OR p_to IS INITIAL
   OR p_from > p_to
   OR p_from NOT BETWEEN '9300000000' AND '9300000099'
   OR p_to   NOT BETWEEN '9300000000' AND '9300000099'.

  WRITE / 'Bornes invalides'.
  RETURN.

ENDIF.

SELECT *
  FROM zt_<tri>_ord
  WHERE order_id BETWEEN @p_from AND @p_to
  ORDER BY order_id
  INTO TABLE @DATA(lt_preview).

IF lt_preview IS INITIAL.
  WRITE / 'Aucune ligne correspondante'.
  RETURN.
ENDIF.

IF lines( lt_preview ) > 10.
  WRITE / 'Plus de 10 lignes : suppression refusée'.
  RETURN.
ENDIF.

LOOP AT lt_preview INTO DATA(ls_preview).
  WRITE: / ls_preview-order_id,
           ls_preview-customer_name,
           ls_preview-status,
           ls_preview-amount,
           ls_preview-currency.
ENDLOOP.

IF p_exec = abap_false.
  WRITE / 'SIMULATION : aucune ligne supprimée'.
  RETURN.
ENDIF.

DELETE zt_<tri>_ord
  FROM TABLE @lt_preview.

IF sy-subrc <> 0
   OR sy-dbcnt <> lines( lt_preview ).

  WRITE / 'Suppression incomplète'.
  ROLLBACK WORK.
  RETURN.

ENDIF.

WRITE / |{ sy-dbcnt } ligne(s) supprimée(s) en mode test|.

ROLLBACK WORK.
```

</details>
