# 🌸 EXERCICES — ELEMENTS DE DONNEES

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [ELEMENTS DE DONNEES](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 08 - SE11/03 - 🍧 DATA ELEMENTS.md>)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- créer un élément de données ;
- l’associer à un domaine ;
- définir ses libellés ;
- expliquer sa sémantique ;
- réutiliser un domaine avec plusieurs sémantiques ;
- typer un programme ABAP avec un élément de données ;
- diagnostiquer un libellé ou un domaine incohérent.

## 🌺 DURÉE INDICATIVE

60 à 75 minutes.

## 🌺 EXERCICE 1 — CRÉATION

Créer les éléments suivants :

| Élément de données | Domaine          | Description          |
| ------------------ | ---------------- | -------------------- |
| `ZDE_<TRI>_OID`    | `ZD_<TRI>_OID`   | Identifiant commande |
| `ZDE_<TRI>_PRIO`   | `ZD_<TRI>_PRIO`  | Priorité commande    |
| `ZDE_<TRI>_NAME`   | `ZD_<TRI>_NAME`  | Nom du client        |
| `ZDE_<TRI>_STAT`   | `ZD_<TRI>_STAT`  | Statut commande      |
| `ZDE_<TRI>_STTXT`  | `ZD_<TRI>_STTXT` | Libellé du statut    |

## 🌺 EXERCICE 2 — LIBELLÉS

Pour `ZDE_<TRI>_OID`, définir :

| Libellé | Texte                      |
| ------- | -------------------------- |
| Court   | Commande                   |
| Moyen   | Identifiant commande       |
| Long    | Identifiant de la commande |
| En-tête | N° commande                |

Pour les autres éléments, définir des libellés cohérents avec leur usage.

Contraintes :

- respecter les longueurs autorisées dans l’écran ;
- éviter les abréviations incompréhensibles ;
- ne pas utiliser un même libellé pour des données de sens différent.

## 🌺 EXERCICE 3 — DOMAINE PARTAGÉ

Créer temporairement :

```text
ZDE_<TRI>_CONTACT
```

en utilisant le domaine :

```text
ZD_<TRI>_NAME
```

Sémantique :

```text
Nom du contact
```

Répondre :

1. les deux éléments ont-ils le même type technique ?
2. ont-ils obligatoirement les mêmes libellés ?
3. représentent-ils exactement la même notion métier ?
4. quel objet porte la sémantique ?
5. quel objet porte le type et la longueur ?

## 🌺 EXERCICE 4 — PROGRAMME DE CONTRÔLE

Créer le programme :

```text
ZAELION_<TRI>_SE11
```

Ajouter temporairement :

```abap
REPORT zaelion_<tri>_se11.

PARAMETERS:
  p_order TYPE zde_<tri>_oid,
  p_prio  TYPE zde_<tri>_prio,
  p_name  TYPE zde_<tri>_name LOWER CASE,
  p_stat  TYPE zde_<tri>_stat.

START-OF-SELECTION.

  WRITE: / 'Commande :', p_order,
         / 'Priorité :', p_prio,
         / 'Client   :', p_name,
         / 'Statut   :', p_stat.
```

Tester :

```text
Commande : 0000000001
Priorité : 2
Client   : Alice Martin
Statut   : N
```

## 🌺 EXERCICE 5 — LIBELLÉS D’ÉCRAN

Observer l’écran de sélection avant toute instruction `SELECTION-SCREEN COMMENT`.

Répondre :

1. quels textes sont repris depuis les éléments de données ?
2. le domaine fournit-il directement les libellés métier ?
3. que se passe-t-il si les libellés sont absents ou incohérents ?
4. pourquoi un même domaine peut-il produire des textes d’écran différents ?

## 🌺 EXERCICE 6 — DIAGNOSTIC DE DOMAINE

Cas incorrect :

```text
ZDE_<TRI>_OID
Domaine associé : ZD_<TRI>_NAME
```

Répondre :

1. quelle longueur reçoit l’identifiant ?
2. les lettres deviennent-elles techniquement possibles ?
3. quelle incohérence apparaît dans les tables utilisatrices ?
4. quelle correction faut-il appliquer ?
5. faut-il contrôler uniquement le texte de l’élément ou également son domaine ?

## 🌺 EXERCICE 7 — CAS D’EMPLOI

Pour `ZDE_<TRI>_STAT` :

1. ouvrir les cas d’emploi avant utilisation dans une table ;
2. relever l’absence ou le nombre d’utilisations ;
3. recommencer après la création des tables ;
4. comparer les résultats.

## 🌺 LIVRABLES

- cinq éléments actifs ;
- libellés complets ;
- élément `CONTACT` ;
- programme de contrôle ;
- résultat du test ;
- diagnostic du mauvais domaine ;
- comparaison des cas d’emploi.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Chaque élément référence le domaine prévu.
- [ ] Les libellés sont cohérents.
- [ ] Domaine et élément de données sont distingués.
- [ ] Deux sémantiques réutilisent un même type technique.
- [ ] Le programme compile avec les types globaux.
- [ ] La casse du nom est conservée.
- [ ] Le mauvais domaine est diagnostiqué.
- [ ] Les cas d’emploi évoluent après réutilisation.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — répartition des responsabilités

```text
Domaine
→ type, longueur, propriétés techniques, valeurs possibles

Élément de données
→ signification, documentation et libellés
```

### Solution — domaine incorrect

`ZD_<TRI>_NAME` autorise un texte de quarante caractères. Il ne représente pas l’identifiant NUMC10 attendu.

Correction :

```text
ZDE_<TRI>_OID
→ ZD_<TRI>_OID
```

</details>
