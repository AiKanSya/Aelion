# 🌸 EXERCICES — PERFORMANCE ET VOLUMÉTRIE

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [TRANSACTION SE16N](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 09 - SE16N/01 - 🍧 SE16N.md>)

## 🌺 OBJECTIFS

- identifier une donnée sensible ;
- appliquer la minimisation ;
- distinguer consultation et diffusion ;
- conserver une preuve sans copier les données ;
- respecter la finalité de l’accès.

## 🌺 DURÉE INDICATIVE

30 à 40 minutes.

## 🌺 EXERCICE 1 — CLASSIFICATION

Classer :

| Champ           | Nécessaire pour vérifier un statut | Export autorisé dans l’exercice |
| --------------- | ---------------------------------- | ------------------------------- |
| `ORDER_ID`      |                                    |                                 |
| `STATUS`        |                                    |                                 |
| `CUSTOMER_NAME` |                                    |                                 |
| `AMOUNT`        |                                    |                                 |
| `CURRENCY`      |                                    |                                 |
| `CREATED_BY`    |                                    |                                 |
| `MANDT`         |                                    |                                 |

## 🌺 EXERCICE 2 — PREUVE MINIMALE

Pour prouver qu’une commande possède le statut `P`, choisir :

### Option A

Capture complète de toutes les colonnes et de toutes les commandes.

### Option B

Capture limitée à :

```text
ORDER_ID
STATUS
```

avec une seule ligne.

Justifier.

## 🌺 EXERCICE 3 — PARTAGE

Répondre :

1. une capture de données peut-elle être diffusée librement ?
2. faut-il masquer les données non nécessaires ?
3. faut-il utiliser un canal autorisé ?
4. faut-il supprimer les fichiers temporaires ?
5. une donnée de formation fictive doit-elle être distinguée d’une donnée productive réelle ?

## 🌺 EXERCICE 4 — JOURNAL DE TEST

Créer un relevé sans données excessives :

```text
Date :
Système :
Mandant :
Table :
Critères :
Nombre de lignes :
Champs vérifiés :
Résultat :
Anomalie :
```

## 🌺 EXERCICE 5 — DIAGNOSTIC

Cas incorrect :

```text
Export complet de la table
Pièce jointe envoyée à toute l’équipe
Aucun besoin documenté
```

Décrire :

- violation de minimisation ;
- risque de diffusion ;
- correction ;
- preuve alternative.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Seules les données nécessaires sont affichées.
- [ ] Les preuves sont minimales.
- [ ] Les exports ne sont pas diffusés sans autorisation.
- [ ] Les fichiers temporaires sont gérés.
- [ ] Le relevé de test contient le contexte.
- [ ] La finalité métier est documentée.

<details>
<summary>🍧 Afficher la solution</summary>

Pour vérifier un statut :

```text
ORDER_ID
STATUS
```

suffisent généralement.

Les autres champs ne doivent être exposés que s’ils participent directement au diagnostic.

</details>
