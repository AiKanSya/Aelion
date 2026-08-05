# 🌸 EXERCICES — FROM (AS ALIAS) – TABLE SOURCE ET ALIAS

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [FROM (AS ALIAS) – TABLE SOURCE ET ALIAS](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 10 - DBTAB INSTRUCTIONS/└─ 🧩 01 - SELECT/06 - 🍧 FROM.md>)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- identifier la source d’une requête ;
- utiliser une table ou une vue ;
- créer un alias de source ;
- qualifier un champ avec `~`;
- distinguer alias de source et alias de colonne ;
- utiliser des alias lisibles ;
- diagnostiquer une référence à un alias inexistant.

## 🌺 DURÉE INDICATIVE

40 à 55 minutes.

## 🌺 EXERCICE 1 — SOURCE SIMPLE

Exécuter :

```abap
SELECT ord~order_id,
       ord~customer_name,
       ord~status
  FROM zt_<tri>_ord AS ord
  ORDER BY ord~order_id
  INTO TABLE @DATA(lt_orders).
```

Répondre :

1. quel objet est la source réelle ?
2. quel nom est temporaire ?
3. pourquoi `ord~order_id` utilise-t-il un tilde ?
4. l’alias renomme-t-il la table dans `SE11` ?
5. l’alias est-il obligatoire avec une seule source ?

## 🌺 EXERCICE 2 — SOURCE VUE

Lire :

```text
ZV_<TRI>_ORD
```

avec l’alias :

```text
view_order
```

Sélectionner :

```text
ORDER_ID
CUSTOMER_NAME
STATUS
STATUS_TEXT
```

Résultat attendu :

```text
0000000001 Alice Martin N Nouvelle
0000000002 Bruno Bernard P En préparation
0000000003 Claire Martin C Clôturée
```

## 🌺 EXERCICE 3 — ALIAS SIGNIFICATIFS

Comparer :

```text
a / b
ord / stat
header / item
source / target
```

Répondre :

1. les alias d’une lettre sont-ils toujours incorrects ?
2. quelle qualité doit guider le choix ?
3. pourquoi `ord` et `stat` conviennent-ils au modèle ?
4. faut-il ajouter un commentaire pour chaque alias évident ?

## 🌺 EXERCICE 4 — ALIAS DE SOURCE OU DE COLONNE

Classer :

```abap
FROM zt_<tri>_ord AS ord
```

```abap
order_id AS id
```

Compléter :

| Alias | Porte sur | Utilisation |
| ----- | --------- | ----------- |
| `ord` |           |             |
| `id`  |           |             |

## 🌺 EXERCICE 5 — ALIAS INEXISTANT

Analyser :

```abap
SELECT order~order_id
  FROM zt_<tri>_ord AS ord
  INTO TABLE @DATA(lt_result).
```

Décrire :

- symptôme ;
- cause ;
- correction ;
- test.

## 🌺 EXERCICE 6 — CHAMP NON QUALIFIÉ DANS UNE JOINTURE

Une future jointure contient `MANDT` et `STATUS` dans les deux sources.

Répondre :

1. pourquoi `SELECT status` devient-il ambigu ?
2. faut-il écrire `ord~status` ou `stat~status` ?
3. la valeur est-elle normalement égale lorsque la jointure est correcte ?
4. pourquoi l’origine doit-elle rester explicite ?

## 🌺 CRITÈRES DE VALIDATION

- [ ] La table réelle est distinguée de l’alias.
- [ ] Le tilde est utilisé correctement.
- [ ] Une vue est utilisée comme source.
- [ ] Les alias sont lisibles.
- [ ] Alias de source et alias de colonne sont distingués.
- [ ] La référence inexistante est corrigée.
- [ ] Les champs ambigus sont qualifiés.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
SELECT view_order~order_id,
       view_order~customer_name,
       view_order~status,
       view_order~status_text
  FROM zv_<tri>_ord AS view_order
  ORDER BY view_order~order_id
  INTO TABLE @DATA(lt_view_orders).
```

| Alias | Porte sur           |
| ----- | ------------------- |
| `ord` | source de données   |
| `id`  | colonne du résultat |

Correction :

```abap
SELECT ord~order_id
  FROM zt_<tri>_ord AS ord
  INTO TABLE @DATA(lt_result).
```

</details>
