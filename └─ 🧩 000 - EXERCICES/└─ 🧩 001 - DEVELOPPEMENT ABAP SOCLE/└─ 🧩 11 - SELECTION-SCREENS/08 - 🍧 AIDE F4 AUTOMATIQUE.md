# 🌸 EXERCICE — AIDE F4 AUTOMATIQUE

## 🌺 OBJECTIFS

- employer le vocabulaire actuel ;
- identifier une aide DDIC ;
- comparer un type DDIC et un type élémentaire local ;
- tester les valeurs fixes ;
- éviter une aide spécifique inutile ;
- diagnostiquer l’absence de F4.

## 🌺 DURÉE INDICATIVE

45 à 60 minutes.

## 🌺 EXERCICE 1 — VOCABULAIRE

Définir :

```text
Aide F4
Aide à la recherche
Search help
Matchcode
Valeurs fixes de domaine
```

Expliquer pourquoi « matchcode » est un terme historique encore compris mais moins précis.

## 🌺 EXERCICE 2 — TYPE DDIC

Déclarer :

```abap
PARAMETERS p_status TYPE zt_<tri>_ord-status.
```

Tester `F4`.

Résultat possible selon le DDIC :

- valeurs fixes du domaine ;
- search help affectée ;
- aide dérivée du contexte ;
- aucune aide si le DDIC n’en définit pas.

## 🌺 EXERCICE 3 — DATA ELEMENT

Comparer :

```abap
PARAMETERS p_a TYPE zt_<tri>_ord-status.
PARAMETERS p_b TYPE zde_<tri>_stat.
PARAMETERS p_c TYPE c LENGTH 1.
```

Répondre :

1. une référence à un élément de données DDIC peut-elle porter une aide ?
2. la référence à une table est-elle obligatoire ?
3. un type local `C LENGTH 1` possède-t-il les métadonnées DDIC ?
4. les valeurs fixes de domaine sont-elles héritées par le type DDIC ?
5. quel typage exprime le mieux la sémantique ?

## 🌺 EXERCICE 4 — DIAGNOSTIC

Aucune icône F4 n’apparaît.

Checklist :

```text
Le champ est-il saisissable ?
Le type est-il DDIC ?
Une search help est-elle affectée ?
Le domaine possède-t-il des valeurs fixes ?
La search help est-elle active ?
Une aide personnalisée remplace-t-elle l’automatique ?
Les autorisations limitent-elles les valeurs ?
```

## 🌺 EXERCICE 5 — MATCHCODE OBJECT

Syntaxe possible :

```abap
PARAMETERS p_order TYPE zt_<tri>_ord-order_id
  MATCHCODE OBJECT zsh_<tri>_ord.
```

Ne pas conserver ce code si l’objet `ZSH_<TRI>_ORD` n’existe pas.

Répondre :

1. l’objet doit-il être créé et activé dans `SE11` ?
2. cette aide est-elle réutilisable ?
3. faut-il préférer une search help DDIC lorsque plusieurs programmes ont le même besoin ?
4. une aide spécifique doit-elle afficher toutes les données sensibles ?

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le vocabulaire est corrigé.
- [ ] Le comportement DDIC est testé.
- [ ] Le type local est comparé.
- [ ] La référence à une table n’est pas présentée comme obligatoire.
- [ ] Les valeurs fixes sont identifiées.
- [ ] L’absence de F4 est diagnostiquée.
- [ ] `MATCHCODE OBJECT` reste conditionné à un objet réel.

<details>
<summary>🍧 Afficher la solution</summary>

Règle :

```text
Une aide automatique dépend des métadonnées DDIC et du contexte.
Le simple mot TYPE ne crée pas une aide.
La référence directe à un champ de table n’est pas la seule source possible.
```

</details>
