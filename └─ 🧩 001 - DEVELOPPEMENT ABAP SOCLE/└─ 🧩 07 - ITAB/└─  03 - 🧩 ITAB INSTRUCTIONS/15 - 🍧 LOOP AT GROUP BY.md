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

## 🌺 EXERCICE

Regrouper une liste de livres par catégorie et calculer le nombre ainsi que le prix moyen de chaque catégorie.

## 🌺 SOURCE

- SAP ABAP Keyword Documentation — `LOOP AT ... GROUP BY`: https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/abenloop_at_itab_group_by.htm
