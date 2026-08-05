# 🌸 EXERCICES — SYNTHESE

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [TRANSACTION SE11](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 08 - SE11/01 - 🍧 SE11.md>)

> Cours associé : [DOMAINS](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 08 - SE11/02 - 🍧 DOMAINS.md>)

> Cours associé : [ELEMENTS DE DONNEES](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 08 - SE11/03 - 🍧 DATA ELEMENTS.md>)

> Cours associé : [CHAMPS / ZONES / FIELDS](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 08 - SE11/04 - 🍧 FIELDS.md>)

> Cours associé : [STRUCTURES DE TABLE](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 08 - SE11/05 - 🍧 STRUCTURES.md>)

> Cours associé : [TABLES](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 08 - SE11/06 - 🍧 DBTABLES.md>)

> Cours associé : [VIEWS SAP](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 08 - SE11/07 - 🍧 VIEWS.md>)

> Cours associé : [AIDE A LA RECHERCHE (F4 HELP)](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 08 - SE11/08 - 🍧 SEARCH HELP.md>)

## 🌺 OBJECTIF

Vérifier l’ensemble du modèle sans consulter les solutions.

## 🌺 SCÉNARIO

Une nouvelle règle est demandée :

```text
La priorité 3 est obligatoire pour toute commande dont le montant
est supérieur ou égal à 1000,00.
```

La règle métier ne doit pas être intégrée dans le domaine, car elle dépend simultanément de deux champs.

## 🌺 CONSIGNES

1. Vérifier que tous les objets sont actifs.
2. Afficher les dépendances :
   - domaine ;
   - élément ;
   - table ;
   - vue ;
   - aide.
3. Ajouter une commande de `1500,00 EUR` avec priorité `2`.
4. Constater que la structure technique seule ne garantit pas cette règle croisée.
5. Ajouter le contrôle dans le programme ABAP.
6. Refuser la commande avec un message explicite.
7. Corriger la priorité à `3`.
8. Insérer la commande.
9. Vérifier la vue.
10. Rechercher la commande avec F4.
11. Vérifier que le texte du statut est affiché.
12. Vérifier la devise.
13. Vérifier le contenu des tables.
14. Vérifier que l’index secondaire est encore cohérent avec les accès.
15. Produire la carte finale des dépendances.

## 🌺 CONTRÔLE ABAP

```abap
IF ls_order-amount >= '1000.00'
   AND ls_order-priority <> '3'.

  MESSAGE
    'Priorité 3 obligatoire à partir de 1000,00'
    TYPE 'S'
    DISPLAY LIKE 'E'.

  RETURN.
ENDIF.
```

## 🌺 CARTE ATTENDUE

```text
ZD_<TRI>_OID
→ ZDE_<TRI>_OID
→ ZT_<TRI>_ORD-ORDER_ID
→ ZP_<TRI>_ORD
→ ZV_<TRI>_ORD
→ ZSH_<TRI>_OID
→ PARAMETER P_ORDER
```

```text
ZD_<TRI>_STAT
→ ZDE_<TRI>_STAT
→ ZT_<TRI>_STAT-STATUS
→ clé de contrôle
→ ZT_<TRI>_ORD-STATUS
→ ZV_<TRI>_ORD-STATUS
```

## 🌺 QUESTIONS FINALES

1. Quelle règle appartient au domaine ?
2. Quelle règle appartient à l’élément de données ?
3. Quelle règle appartient à la clé étrangère ?
4. Quelle règle appartient au programme ?
5. Quelle information appartient à la vue ?
6. Quelle information appartient à l’aide F4 ?
7. Quel objet possède des données physiques ?
8. Quels objets possèdent uniquement une définition ?
9. Quel objet faut-il analyser avant de modifier la longueur de l’identifiant ?
10. Quelle technologie SAP recommande généralement pour un nouveau modèle de vue moderne ?

## 🌺 CRITÈRES DE VALIDATION

- [ ] Tous les objets sont actifs.
- [ ] Le programme compile.
- [ ] Les trois statuts existent.
- [ ] Les commandes sont cohérentes.
- [ ] La règle croisée est contrôlée dans le programme.
- [ ] La vue retourne le texte du statut.
- [ ] L’aide F4 retourne l’identifiant.
- [ ] Le montant possède sa devise.
- [ ] Les dépendances sont expliquées.
- [ ] Aucun objet standard n’a été modifié.
- [ ] Aucun avertissement n’est ignoré sans justification.
- [ ] Les limites des contrôles DDIC sont comprises.

<details>
<summary>🍧 Afficher la solution</summary>

### Répartition des responsabilités

| Règle                                     | Emplacement                         |
| ----------------------------------------- | ----------------------------------- |
| Priorité limitée à `1`, `2`, `3`          | Domaine                             |
| Libellé « Priorité commande »             | Élément de données                  |
| Statut présent dans la table de référence | Clé étrangère et logique d’écriture |
| Priorité 3 si montant ≥ 1000              | Programme ou couche métier          |
| Texte du statut affiché avec la commande  | Vue                                 |
| Recherche et retour de l’identifiant      | Aide F4                             |
| Lignes de commandes et statuts            | Tables transparentes                |

### Technologie moderne

```text
CDS View Entity
```

pour un nouveau modèle compatible avec la plateforme et les règles du projet.

</details>
