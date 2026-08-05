# 🌸 EXERCICES — LA CLÉ NE SE RENOMME PAS

## 🌺 OBJECTIFS

- modifier quelques colonnes sans lire toute la ligne ;
- écrire un filtre précis ;
- contrôler le nombre de lignes ;
- éviter un `WHERE` trop large ;
- comparer `SET` et `FROM`.

## 🌺 DURÉE INDICATIVE

45 à 60 minutes.

## 🌺 PRÉPARATION

Créer :

```text
9100000020
Nom      : Modification ciblée
Priorité : 1
Statut   : N
Montant  : 200,00 EUR
```

## 🌺 EXERCICE 1 — MODIFICATION CIBLÉE

Exécuter :

```abap
DATA:
  lv_status   TYPE zde_<tri>_stat VALUE 'P',
  lv_priority TYPE zde_<tri>_prio VALUE '2'.

UPDATE zt_<tri>_ord
  SET status   = @lv_status,
      priority = @lv_priority
  WHERE order_id = '9100000020'.
```

Résultat attendu :

```text
sy-subrc = 0
sy-dbcnt = 1
```

## 🌺 EXERCICE 2 — RELECTURE

Vérifier :

| Champ           | Attendu  |
| --------------- | -------- |
| `CUSTOMER_NAME` | inchangé |
| `STATUS`        | `P`      |
| `PRIORITY`      | `2`      |
| `AMOUNT`        | `200,00` |
| `CURRENCY`      | `EUR`    |
| `CREATED_BY`    | inchangé |
| `CREATED_ON`    | inchangé |

## 🌺 EXERCICE 3 — FILTRE ABSENT

Analyser sans exécuter :

```abap
UPDATE zt_<tri>_ord
  SET status = 'C'.
```

Répondre :

1. combien de lignes peut-il modifier ?
2. les données fonctionnelles seraient-elles touchées ?
3. pourquoi cette instruction est-elle interdite dans l’exercice ?
4. quel filtre minimal utiliser ?
5. quelle protection supplémentaire peut comparer `sy-dbcnt` à `1` ?

## 🌺 EXERCICE 4 — FILTRE NON UNIQUE

Analyser :

```abap
UPDATE zt_<tri>_ord
  SET priority = '3'
  WHERE status = 'N'.
```

Répondre :

1. plusieurs lignes peuvent-elles être modifiées ?
2. faut-il utiliser cette instruction si la règle porte réellement sur toutes les commandes nouvelles ?
3. faut-il l’utiliser si le besoin porte sur une seule commande ?
4. comment contrôler le volume affecté ?
5. pourquoi le nom `UPDATE SET` ne signifie-t-il pas « une seule ligne » ?

## 🌺 EXERCICE 5 — SET OU FROM

Compléter :

| Besoin                                                          | Choix |
| --------------------------------------------------------------- | ----- |
| Deux champs d’une ligne                                         |       |
| Ligne complète déjà lue et validée                              |       |
| Plusieurs lignes avec des valeurs différentes préparées en ABAP |       |
| Même statut pour toutes les lignes d’un filtre                  |       |
| Préserver automatiquement les autres colonnes                   |       |

## 🌺 CRITÈRES DE VALIDATION

- [ ] Deux colonnes sont modifiées.
- [ ] Les autres valeurs restent identiques.
- [ ] Le filtre utilise la clé réservée.
- [ ] L’update sans filtre n’est pas exécuté.
- [ ] Un filtre non unique est reconnu comme multi-lignes.
- [ ] `sy-dbcnt` est contrôlé.
- [ ] Le choix entre `SET` et `FROM` est justifié.

<details>
<summary>🍧 Afficher la solution</summary>

| Besoin                        | Choix               |
| ----------------------------- | ------------------- |
| Deux champs                   | `UPDATE SET`        |
| Ligne complète lue            | `UPDATE FROM`       |
| Valeurs différentes par ligne | `UPDATE FROM TABLE` |
| Même valeur selon filtre      | `UPDATE SET WHERE`  |
| Préserver les autres colonnes | `UPDATE SET`        |

Contrôle strict :

```abap
UPDATE zt_<tri>_ord
  SET status   = @lv_status,
      priority = @lv_priority
  WHERE order_id = '9100000020'.

DATA(lv_update_count) = sy-dbcnt.

IF sy-subrc <> 0 OR lv_update_count <> 1.
  WRITE / 'Le nombre de lignes modifiées est inattendu'.
  ROLLBACK WORK.
ENDIF.
```

</details>
