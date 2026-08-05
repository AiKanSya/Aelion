# 🌸 EXERCICE 11 — CURSEUR OUVERT ET COMMIT

## 🌺 OBJECTIFS

- comprendre qu’un commit ferme les curseurs ;
- éviter un commit dans une boucle `SELECT`;
- utiliser une lecture en table interne ;
- analyser un traitement par pages.

## 🌺 DURÉE INDICATIVE

35 à 45 minutes.

## 🌺 CAS INCORRECT

Analyser sans exécuter :

```abap
SELECT order_id
  FROM zt_<tri>_ord
  INTO @DATA(lv_order_id).

  " Traitement

  COMMIT WORK.

ENDSELECT.
```

## 🌺 QUESTIONS

1. le `SELECT ... ENDSELECT` utilise-t-il un curseur ?
2. que fait le commit aux curseurs ouverts ?
3. la boucle peut-elle continuer correctement ?
4. pourquoi le cas peut-il provoquer une erreur non récupérable ?
5. quelle correction appliquer ?

## 🌺 EXERCICE 1 — TABLE INTERNE

```abap
SELECT order_id
  FROM zt_<tri>_ord
  INTO TABLE @DATA(lt_order_ids).
```

Traiter ensuite la table.

Le commit intervient seulement après la fin du traitement transactionnel.

## 🌺 EXERCICE 2 — PAGINATION

Pour un grand volume :

```text
Lire un paquet avec une clé de reprise
Fermer la requête
Traiter le paquet
Valider le paquet si la règle l’autorise
Mémoriser la reprise
Lire le paquet suivant
```

Ne pas maintenir un curseur ouvert autour du commit.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le curseur est identifié.
- [ ] L’effet du commit est compris.
- [ ] Le cas dangereux n’est pas exécuté.
- [ ] Une lecture en table est proposée.
- [ ] La pagination ferme la requête avant commit.
- [ ] La stratégie par paquets est explicitement non atomique globalement.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
SELECT order_id
  FROM zt_<tri>_ord
  ORDER BY order_id
  INTO TABLE @DATA(lt_order_ids).

LOOP AT lt_order_ids INTO DATA(ls_order_id).
  " Traitement sans curseur SQL ouvert
ENDLOOP.

" Décision transactionnelle finale
```

</details>
