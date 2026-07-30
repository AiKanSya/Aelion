# 🌸 CODE QUALITY

- [ ] Comprendre le `Code Quality` en ABAP
- [ ] Identifier les critères de qualité

## 🧩 DÉFINITION

La `Code Quality` désigne le niveau de `fiabilité`, de `lisibilité` et de `maintenabilité` du code ABAP livré.

> [!IMPORTANT]
> Un code de qualité :
>
> - fonctionne correctement
> - peut être compris par un autre développeur
> - peut être modifié sans casser l’existant
> - respecte les règles techniques SAP

> [!WARNING]
> Un code qui "marche" n’est pas forcément un code de qualité.

## 🧩 POURQUOI LA QUALITÉ DU CODE EST CRITIQUE EN ABAP

> [!IMPORTANT]
> Le code ABAP :
>
> - vit longtemps (années)
> - est maintenu par plusieurs équipes
> - est transporté entre systèmes
> - est exécuté en production critique

> [!WARNING]
> Un défaut de qualité :
>
> - génère des bugs tardifs
> - rend les corrections risquées
> - augmente le coût de maintenance
> - ralentit les projets

## 🧩 QUALITÉ ≠ PERFORMANCE

> [!CAUTION]
> Un code rapide mais :
>
> - illisible
> - non testé
> - non contrôlé
>
> est un code dangereux.

> [!IMPORTANT]
> La qualité vise d’abord :
>
> - la lisibitité
> - la fiabilité
> - la maintenabilité
> - la conformité

## 🧩 PILIERS DE LA CODE QUALITY EN ABAP

### 🍧 LISIBILITÉ

- noms clairs (variables, méthodes)
- code structuré
- logique compréhensible sans commentaire excessif

> [!NOTE]
> Un consultant ABAP doit pouvoir relire son code 6 mois plus tard.

### 🍧 FIABILITÉ

- le code fait ce qu’il est censé faire
- les cas d’erreur sont gérés
- les comportements sont vérifiés

> [!NOTE]
> Apport des tests unitaires ABAP.

### 🍧 MAINTENABILITÉ

- modification localisée
- impact limité
- régression évitée

> [!NOTE]
> Sans tests, chaque modification est un risque.

## 🧩 CONFORMITÉ

- respect des règles syntaxiques et statiques
- utilisation des outils standard :
  - Extended Check (SLIN)
  - Code Inspector
  - ABAP Unit

> [!NOTE]
> SAP fournit ces outils pour éviter les erreurs classiques.
