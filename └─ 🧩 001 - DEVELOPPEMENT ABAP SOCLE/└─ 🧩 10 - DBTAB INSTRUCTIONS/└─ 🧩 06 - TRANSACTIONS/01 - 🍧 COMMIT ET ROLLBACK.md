# 🌸 `COMMIT WORK` ET `ROLLBACK WORK`

## 🌺 OBJECTIFS

- [ ] Définir la SAP LUW.
- [ ] Valider un ensemble cohérent d'écritures.
- [ ] Annuler la LUW après une erreur.

```abap
INSERT ztraining_header FROM @ls_header.

IF sy-subrc = 0.
  INSERT ztraining_item FROM TABLE @lt_items.
ENDIF.

IF sy-subrc = 0.
  COMMIT WORK AND WAIT.
ELSE.
  ROLLBACK WORK.
ENDIF.
```

Le commit appartient au niveau qui connaît l'unité fonctionnelle complète. Un commit dans une méthode basse ou dans une boucle peut rendre impossible l'annulation cohérente des opérations suivantes.

## 🌺 DISTINCTIONS

- `COMMIT WORK` termine la SAP LUW et déclenche les mises à jour enregistrées ;
- `AND WAIT` attend la fin des mises à jour synchrones concernées avant de rendre la main ;
- `ROLLBACK WORK` annule les modifications non validées de la SAP LUW courante ;
- une API peut imposer son propre contrat transactionnel : lire sa documentation avant d'ajouter un commit.

## 🌺 EXERCICE

Créer un en-tête et plusieurs lignes de détail dans deux tables de formation. Valider uniquement si toutes les écritures réussissent.

## 🌺 SOURCES

- SAP ABAP Keyword Documentation — `COMMIT WORK`: https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/abapcommit.htm
- SAP ABAP Keyword Documentation — `ROLLBACK WORK`: https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/abaprollback.htm
