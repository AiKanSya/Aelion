# 🌸 EXERCICES — DIAGNOSTIC D’UN RÉSULTAT VIDE

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [TRANSACTION SE16N](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 09 - SE16N/01 - 🍧 SE16N.md>)

## 🌺 OBJECTIFS

- reconnaître un défaut d’autorisation ;
- distinguer transaction autorisée et table autorisée ;
- connaître les objets génériques de contrôle ;
- utiliser `SU53` après un refus ;
- transmettre un diagnostic précis ;
- ne pas contourner la sécurité.

## 🌺 DURÉE INDICATIVE

35 à 45 minutes.

## 🌺 EXERCICE 1 — DEUX NIVEAUX

Répondre :

1. l’autorisation d’exécuter `SE16N` garantit-elle l’accès à toutes les tables ?
2. une table peut-elle appartenir à un groupe d’autorisation ?
3. quel objet peut contrôler un groupe de tables ?
4. quel objet peut contrôler un nom de table ou de vue ?
5. un accès aux données doit-il être limité au besoin professionnel ?

## 🌺 EXERCICE 2 — MESSAGE D’ERREUR

Lorsqu’un accès autorisé au cadre de formation est refusé :

1. relever le message exact ;
2. relever la table ;
3. relever le système et le mandant ;
4. exécuter `SU53` immédiatement si cette transaction est autorisée ;
5. capturer uniquement les informations nécessaires ;
6. transmettre au formateur ou à l’équipe sécurité ;
7. ne pas demander un accès global à toutes les tables.

## 🌺 EXERCICE 3 — OBJETS D’AUTORISATION

Associer :

| Objet        | Rôle général |
| ------------ | ------------ |
| `S_TCODE`    |              |
| `S_TABU_DIS` |              |
| `S_TABU_NAM` |              |
| `S_TABU_CLI` |              |

> [!NOTE]
> Les contrôles exacts dépendent du système. La présence d’un objet dans la documentation ne prouve pas qu’il est l’unique cause du refus rencontré.

## 🌺 EXERCICE 4 — DIAGNOSTIC INCORRECT

Un stagiaire écrit :

```text
La table est vide, car SE16N n’affiche rien.
```

Le message réel est :

```text
Vous n’êtes pas autorisé à afficher cette table.
```

Corriger le diagnostic.

## 🌺 EXERCICE 5 — DEMANDE D’AUTORISATION

Rédiger les informations minimales à transmettre :

```text
Transaction :
Table ou vue :
Activité attendue :
Système :
Mandant :
Cas de test :
Durée ou contexte :
Message :
Résultat SU53 :
```

Ne pas demander de droit de modification.

## 🌺 EXERCICE 6 — DONNÉES SENSIBLES

Même avec une autorisation technique, répondre :

1. peut-on exporter librement toutes les données ?
2. l’autorisation technique remplace-t-elle la finalité métier ?
3. faut-il minimiser les colonnes et les lignes ?
4. faut-il respecter les règles de confidentialité et de conservation ?
5. un accès ponctuel doit-il devenir un droit permanent ?

## 🌺 CRITÈRES DE VALIDATION

- [ ] La transaction et la table sont contrôlées séparément.
- [ ] Les objets d’autorisation sont identifiés.
- [ ] `SU53` est utilisé immédiatement après le refus.
- [ ] Le diagnostic ne confond pas refus et absence de données.
- [ ] La demande est minimale et précise.
- [ ] Aucun contournement n’est proposé.
- [ ] L’autorisation technique est distinguée de l’usage légitime.

<details>
<summary>🍧 Afficher la solution</summary>

| Objet        | Rôle                                                                   |
| ------------ | ---------------------------------------------------------------------- |
| `S_TCODE`    | Autorisation d’exécuter une transaction                                |
| `S_TABU_DIS` | Accès aux tables selon leur groupe d’autorisation                      |
| `S_TABU_NAM` | Accès selon le nom d’une table ou vue                                  |
| `S_TABU_CLI` | Contrôle d’opérations sensibles sur des objets indépendants du mandant |

Diagnostic correct :

```text
Le contenu n’a pas pu être consulté en raison d’un refus d’autorisation.
Aucune conclusion sur la présence ou l’absence de données n’est possible.
```

</details>
