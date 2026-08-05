# 🌸 EXERCICE — INITIALISER UN SELECT-OPTIONS

## 🌺 OBJECTIFS

- utiliser `INITIALIZATION`;
- construire une ligne de sélection ;
- définir une période par défaut ;
- éviter le format externe ;
- préserver la modification utilisateur après le premier affichage.

## 🌺 DURÉE INDICATIVE

40 à 55 minutes.

## 🌺 EXERCICE 1 — PÉRIODE

Initialiser les trente derniers jours :

```abap
INITIALIZATION.

  s_date[] = VALUE #(
    ( sign   = 'I'
      option = 'BT'
      low    = sy-datum - 30
      high   = sy-datum )
  ).
```

## 🌺 EXERCICE 2 — STATUTS

Initialiser :

```text
N
P
```

```abap
s_stat[] = VALUE #(
  ( sign = 'I' option = 'EQ' low = 'N' )
  ( sign = 'I' option = 'EQ' low = 'P' )
).
```

## 🌺 EXERCICE 3 — FORMAT INTERNE

Répondre :

1. les dates de `LOW` et `HIGH` utilisent-elles le format interne ABAP ?
2. faut-il écrire une date au format d’affichage utilisateur dans le code ?
3. l’écran applique-t-il ensuite le format externe ?
4. les identifiants NUMC doivent-ils conserver leurs zéros ?
5. pourquoi faut-il typer les champs ?

## 🌺 EXERCICE 4 — OUTPUT INCORRECT

Analyser :

```abap
AT SELECTION-SCREEN OUTPUT.

  s_stat[] = VALUE #(
    ( sign = 'I' option = 'EQ' low = 'N' )
  ).
```

Symptôme :

```text
La saisie utilisateur est remplacée à chaque rafraîchissement.
```

Correction :

```text
Initialiser dans INITIALIZATION,
ou conditionner précisément la réinitialisation.
```

## 🌺 EXERCICE 5 — RÉINITIALISATION EXPLICITE

Créer un bouton de réinitialisation constitue un besoin distinct.

Ne pas réappliquer les valeurs par défaut à chaque `OUTPUT`.

## 🌺 CRITÈRES DE VALIDATION

- [ ] La période est initialisée.
- [ ] Deux statuts sont initialisés.
- [ ] Le format interne est compris.
- [ ] Les zéros initiaux sont préservés.
- [ ] `OUTPUT` ne remplace pas la saisie.
- [ ] La réinitialisation est explicite.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
INITIALIZATION.

  p_max = 100.

  s_stat[] = VALUE #(
    ( sign = 'I' option = 'EQ' low = 'N' )
    ( sign = 'I' option = 'EQ' low = 'P' )
  ).

  s_date[] = VALUE #(
    ( sign   = 'I'
      option = 'BT'
      low    = sy-datum - 30
      high   = sy-datum )
  ).
```

</details>
