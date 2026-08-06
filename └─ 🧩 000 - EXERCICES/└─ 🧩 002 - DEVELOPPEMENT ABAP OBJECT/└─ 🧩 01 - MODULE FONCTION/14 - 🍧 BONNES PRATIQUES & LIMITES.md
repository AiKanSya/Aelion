# 🌸 EXERCICES — BONNES PRATIQUES ET LIMITES

## 🌺 OBJECTIFS

- auditer un module existant ;
- identifier les effets de bord ;
- stabiliser l’interface ;
- déplacer la logique dans une classe ;
- conserver un adaptateur compatible ;
- rechercher les appelants.

## 🌺 DURÉE INDICATIVE

70 à 90 minutes.

## 🌺 EXERCICE 1 — CHECKLIST D’AUDIT

Vérifier :

```text
Nom
Description
Groupe
Interface
Types
Paramètres facultatifs
Exceptions
Messages
Accès base
Commit
Données globales
RFC
Update Task
Documentation
Tests
Appelants
```

## 🌺 EXERCICE 2 — EFFETS DE BORD

Identifier au moins trois éléments :

```text
COMMIT interne
MESSAGE E
écriture en base cachée
table globale
CHANGING inattendu
popup
mémoire SAP
paramètre utilisateur
appel externe
```

## 🌺 EXERCICE 3 — EXTRACTION

Créer :

```text
ZCL_<TRI>_TEXT_SERVICE
```

Méthode statique :

```text
NORMALIZE
```

Déplacer la logique pure.

## 🌺 EXERCICE 4 — ADAPTATEUR

Conserver le module :

```text
Z_<TRI>_TEXT_NORMALIZE
```

Il appelle la classe et traduit l’ancien contrat.

## 🌺 EXERCICE 5 — WHERE-USED

Avant une modification :

- rechercher les programmes ;
- rechercher les appels dynamiques ;
- rechercher les RFC externes ;
- rechercher les jobs ;
- rechercher les tests ;
- analyser la compatibilité.

## 🌺 EXERCICE 6 — ÉVOLUTION COMPATIBLE

Un nouveau paramètre d’import doit être :

- facultatif ;
- doté d’un défaut compatible ;
- documenté ;
- sans changement pour les anciens appelants.

## 🌺 EXERCICE 7 — CHOIX TECHNOLOGIQUE

Utiliser un module fonction lorsque le cadre l’exige :

- API existante ;
- RFC ;
- Update Task ;
- BAPI ;
- conversion exit ;
- framework historique.

Pour une nouvelle logique interne objet, préférer une classe.

## 🌺 CRITÈRES DE VALIDATION

- [ ] L’audit est complet.
- [ ] Trois effets de bord sont identifiés.
- [ ] La logique pure est déplacée.
- [ ] Le module reste compatible.
- [ ] Les appelants sont recherchés.
- [ ] L’évolution est non destructive.
- [ ] Le choix classe ou module est justifié.

<details>
<summary>🍧 Afficher la solution</summary>

Architecture :

```text
Appelant historique
→ module fonction stable
→ classe de service
→ logique métier testable
```

</details>
