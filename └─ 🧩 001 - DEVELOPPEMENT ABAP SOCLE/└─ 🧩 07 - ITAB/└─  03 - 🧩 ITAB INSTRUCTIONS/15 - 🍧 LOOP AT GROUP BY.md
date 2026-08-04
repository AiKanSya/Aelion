# 🌸 REGROUPER UNE TABLE AVEC `LOOP AT ... GROUP BY`

## 🌺 OBJECTIFS

- [ ] Former des groupes selon une clé explicite.
- [ ] Parcourir les membres d'un groupe.
- [ ] Réinitialiser les compteurs au bon niveau.

```abap
LOOP AT lt_participants INTO DATA(ls_participant)
  GROUP BY ( city = ls_participant-city )
  ASSIGNING FIELD-SYMBOL(<city_group>).

  DATA(lv_rank) = 0.

  LOOP AT GROUP <city_group> ASSIGNING FIELD-SYMBOL(<participant>).
    lv_rank += 1.
    WRITE: / <city_group>-city, lv_rank, <participant>-name.
  ENDLOOP.
ENDLOOP.
```

La clé du groupe doit venir de la règle fonctionnelle. Un tri préalable n'est pas une condition de `GROUP BY`, contrairement aux traitements de rupture fondés sur l'ordre des lignes.

## 🌺 INVALIDER UN GROUPE ENTIER

Supposons un import de participants regroupés par session. Une ligne incorrecte rend toute la session inexploitable, mais ne doit pas bloquer les autres sessions.

La première passe recense les clés invalides :

```abap
TYPES ty_invalid_sessions TYPE HASHED TABLE OF char10
  WITH UNIQUE KEY table_line.

DATA lt_invalid_sessions TYPE ty_invalid_sessions.

LOOP AT lt_participants ASSIGNING FIELD-SYMBOL(<participant>).
  IF <participant>-name IS INITIAL
     OR <participant>-level <= 0.
    INSERT <participant>-session_id INTO TABLE lt_invalid_sessions.
  ENDIF.
ENDLOOP.
```

La seconde passe traite les groupes :

```abap
LOOP AT lt_participants INTO DATA(ls_participant)
  GROUP BY ( session_id = ls_participant-session_id )
  ASSIGNING FIELD-SYMBOL(<session_group>).

  IF line_exists( lt_invalid_sessions[ table_line = <session_group>-session_id ] ).
    " Rejeter ce groupe puis continuer avec le suivant.
    CONTINUE.
  ENDIF.

  " Traitement exécuté une seule fois pour le groupe valide.
  LOOP AT GROUP <session_group> ASSIGNING FIELD-SYMBOL(<member>).
    " Préparer les données de chaque membre.
  ENDLOOP.
ENDLOOP.
```

Séparer la détection des erreurs et le traitement des groupes évite de commencer un traitement avant de savoir si tous ses membres sont valides.

## 🌺 STRATÉGIES POSSIBLES

| Stratégie | Usage |
| --- | --- |
| table hachée de clés invalides | recherche rapide et absence de doublons |
| indicateur recopié sur chaque membre | état directement visible dans la table principale |
| analyse complète à l'intérieur du groupe | utile lorsque la validation dépend de plusieurs membres |

Dans tous les cas, définir explicitement la portée de l'erreur : ligne, groupe ou traitement complet.

## 🌺 EXERCICE

Regrouper une liste de livres par catégorie et calculer le nombre ainsi que le prix moyen de chaque catégorie. Ajouter ensuite une règle invalidant seulement les catégories contenant un prix négatif.

## 🌺 SOURCE

- SAP ABAP Keyword Documentation — `LOOP AT ... GROUP BY`: https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/abenloop_at_itab_group_by.htm
