# 🌸 EXERCICES — DONNEES GLOBALES DU GROUPE

## 🌺 OBJECTIFS

- identifier le TOP include ;
- observer le partage des données ;
- reproduire un état résiduel ;
- distinguer mémoire et persistance ;
- privilégier les données locales.

## 🌺 DURÉE INDICATIVE

50 à 65 minutes.

## 🌺 EXERCICE 1 — COMPTEUR GLOBAL

Dans le TOP include :

```abap
DATA gv_call_count TYPE i.
```

Dans deux modules :

```abap
gv_call_count = gv_call_count + 1.
```

Appeler les modules deux fois depuis le même programme.

## 🌺 EXERCICE 2 — PORTÉE

Répondre :

1. le compteur est-il partagé par les modules du groupe ?
2. est-il persistant en base ?
3. est-il partagé entre tous les utilisateurs ?
4. est-il fiable après un nouvel appel RFC ?
5. peut-il servir de numéro métier ?

## 🌺 EXERCICE 3 — TABLE GLOBALE

Créer temporairement :

```abap
DATA gt_messages TYPE STANDARD TABLE OF bapiret2.
```

Premier appel :

```text
ajoute une erreur
```

Deuxième appel :

```text
cas nominal sans CLEAR
```

Observer le message résiduel.

## 🌺 EXERCICE 4 — CORRECTION

Préférer :

```abap
DATA lt_messages TYPE STANDARD TABLE OF bapiret2
  WITH EMPTY KEY.
```

dans le module.

## 🌺 EXERCICE 5 — CAS LÉGITIME

Identifier un cas où une donnée globale est techniquement nécessaire :

- dynpro appartenant au groupe ;
- cache local maîtrisé ;
- objet commun aux modules.

Documenter son cycle d’initialisation et d’invalidation.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le TOP include est identifié.
- [ ] Le partage est observé.
- [ ] La persistance n’est pas supposée.
- [ ] L’état résiduel est reproduit.
- [ ] La donnée locale corrige le défaut.
- [ ] Le code global temporaire est supprimé.

<details>
<summary>🍧 Afficher la solution</summary>

Règle :

```text
Une donnée globale du groupe est un état implicite partagé.
Elle doit rester exceptionnelle, documentée et réinitialisée.
```

</details>
