# 🌸 EXERCICES — COPY TABLE

## 🌺 OBJECTIFS

- copier toutes les lignes ;
- comprendre l’indépendance des tables ;
- distinguer copie et référence ;
- distinguer affectation complète et correspondance de composants ;
- expliquer la notation historique avec `[]`.

## 🌺 DURÉE INDICATIVE

30 à 40 minutes.

## 🌺 EXERCICE 1 — COPIE

Déclarer :

```abap
DATA lt_orders_copy LIKE lt_orders.
```

Exécuter :

```abap
lt_orders_copy = lt_orders.
```

Afficher le nombre de lignes des deux tables.

## 🌺 EXERCICE 2 — INDÉPENDANCE

Supprimer une ligne dans la copie.

Résultat attendu :

```text
Source : 4 lignes
Copie  : 3 lignes
```

Répondre :

1. la source est-elle modifiée ?
2. les tables partagent-elles le même corps ?
3. l’affectation crée-t-elle une référence ?
4. quel type de copie observe-t-on au niveau des lignes de valeur ?

## 🌺 EXERCICE 3 — NOTATION AVEC CROCHETS

Comparer :

```abap
lt_orders_copy = lt_orders.
```

et :

```abap
lt_orders_copy[] = lt_orders[].
```

Dans le contexte sans ligne d’en-tête :

1. quelle forme est la plus simple ?
2. pourquoi la seconde existe-t-elle historiquement ?
3. faut-il l’appeler « instruction COPY TABLE » ?
4. quelle instruction ABAP est réellement utilisée ?

## 🌺 EXERCICE 4 — TYPES DIFFÉRENTS

Analyser :

```abap
lt_display = lt_orders.
```

alors que les types de ligne diffèrent.

Répondre :

1. une affectation complète exige-t-elle une compatibilité des types ?
2. quelle solution utiliser lorsque seuls les composants communs doivent être transférés ?
3. quelle solution moderne permet un mapping explicite ?
4. quel chapitre traite le transfert par noms ?

## 🌺 CRITÈRES DE VALIDATION

- [ ] Toutes les lignes sont copiées.
- [ ] La copie est indépendante.
- [ ] L’affectation n’est pas appelée une instruction `COPY TABLE`.
- [ ] La notation sans crochets est privilégiée.
- [ ] La compatibilité des types est contrôlée.
- [ ] `MOVE-CORRESPONDING` est choisi pour des lignes différentes.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
DATA lt_orders_copy LIKE lt_orders.

lt_orders_copy = lt_orders.

DELETE lt_orders_copy INDEX 1.

WRITE: / |Source : { lines( lt_orders ) } lignes|,
       / |Copie  : { lines( lt_orders_copy ) } lignes|.
```

L’instruction est une affectation :

```abap
=
```

La forme moderne et lisible est :

```abap
lt_orders_copy = lt_orders.
```

</details>
