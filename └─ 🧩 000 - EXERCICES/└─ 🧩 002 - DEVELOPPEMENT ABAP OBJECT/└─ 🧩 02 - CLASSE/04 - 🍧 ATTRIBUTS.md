# 🌸 EXERCICES — ATTRIBUTS D’INSTANCE ET STATIQUES

## 🌺 OBJECTIFS

- créer des attributs ;
- distinguer instance et statique ;
- choisir une visibilité ;
- observer l’état propre à chaque objet ;
- observer l’état partagé.

## 🌺 DURÉE INDICATIVE

55 à 70 minutes.

## 🌺 CLASSE

```text
ZCL_<TRI>_PRODUCT
```

## 🌺 ATTRIBUTS PRIVÉS D’INSTANCE

```text
MV_NAME  TYPE STRING
MV_PRICE TYPE DECFLOAT34
```

## 🌺 ATTRIBUT STATIQUE PRIVÉ

```text
GV_PRODUCT_COUNT TYPE I
```

## 🌺 MÉTHODES PUBLIQUES

```text
SET_NAME
SET_PRICE
GET_NAME
GET_PRICE
GET_PRODUCT_COUNT
```

`GET_PRODUCT_COUNT` sera statique.

## 🌺 EXERCICE 1 — DEUX OBJETS

Créer :

```text
Produit A : Clavier, 50
Produit B : Souris, 25
```

Vérifier :

```text
Chaque objet conserve son nom et son prix.
Le compteur est commun à la classe.
```

## 🌺 EXERCICE 2 — ACCÈS

Dans une méthode d’instance :

```abap
mv_name = iv_name.
```

Dans une méthode statique :

```abap
rv_count = gv_product_count.
```

## 🌺 EXERCICE 3 — VISIBILITÉ

Expliquer pourquoi `MV_PRICE` ne doit pas être public.

## 🌺 DIAGNOSTIC

Utiliser un attribut statique pour le prix.

Créer deux produits avec deux prix différents.

Observer que la dernière valeur écrase la valeur commune.

Corriger en attribut d’instance.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Deux attributs d’instance sont créés.
- [ ] Le compteur est statique.
- [ ] Deux objets conservent des états distincts.
- [ ] Le compteur est partagé.
- [ ] Le prix statique incorrect est corrigé.

<details>
<summary>🍧 Afficher la solution</summary>

```text
MV_NAME et MV_PRICE
→ une valeur par objet

GV_PRODUCT_COUNT
→ une valeur commune à la classe dans la session interne
```

Un compteur statique n’est pas un compteur persistant système.

</details>
