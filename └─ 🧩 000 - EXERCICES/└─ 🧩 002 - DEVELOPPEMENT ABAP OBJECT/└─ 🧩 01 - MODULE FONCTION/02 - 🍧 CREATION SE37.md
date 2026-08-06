# 🌸 EXERCICES — CREATION DANS SE37

## 🌺 OBJECTIFS

- créer un groupe ;
- créer un module ;
- identifier les onglets ;
- documenter et activer ;
- comprendre les includes générés.

## 🌺 DURÉE INDICATIVE

45 à 60 minutes.

## 🌺 EXERCICE 1 — GROUPE

Créer :

```text
ZFG_<TRI>_TOOLS
```

Renseigner :

- description ;
- package ;
- ordre de transport.

## 🌺 EXERCICE 2 — MODULE

Créer dans `SE37` :

```text
Z_<TRI>_TEXT_NORMALIZE
```

Description :

```text
Normalise un texte et applique des options de présentation
```

Type :

```text
Normal Function Module
```

## 🌺 EXERCICE 3 — ONGLETS

Identifier :

```text
Attributes
Import
Export
Changing
Tables
Exceptions
Source Code
Documentation
```

Les libellés varient selon la langue et la version du système.

## 🌺 EXERCICE 4 — ACTIVATION

Activer :

1. l’interface ;
2. le source ;
3. le module ;
4. le groupe si nécessaire.

## 🌺 EXERCICE 5 — INCLUDES

Dans `SE80`, identifier :

```text
SAPLZFG_<TRI>_TOOLS
LZFG_<TRI>_TOOLSTOP
LZFG_<TRI>_TOOLSUxx
```

Ne pas renommer les includes générés.

## 🌺 DIAGNOSTIC

Un module existe mais le test retourne une erreur d’objet inactif.

Vérifier :

- activation de l’interface ;
- activation de l’include ;
- activation du groupe ;
- erreurs syntaxiques.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le groupe existe.
- [ ] Le module appartient au bon groupe.
- [ ] Le type Normal est utilisé.
- [ ] La documentation est renseignée.
- [ ] Tous les objets sont actifs.
- [ ] Les includes sont identifiés.

<details>
<summary>🍧 Afficher la solution</summary>

Checklist :

```text
□ ZFG_<TRI>_TOOLS créé
□ description renseignée
□ package correct
□ ordre de transport correct
□ Z_<TRI>_TEXT_NORMALIZE créé
□ type Normal Function Module
□ interface active
□ source actif
□ documentation maintenue
□ test SE37 accessible
```

</details>
