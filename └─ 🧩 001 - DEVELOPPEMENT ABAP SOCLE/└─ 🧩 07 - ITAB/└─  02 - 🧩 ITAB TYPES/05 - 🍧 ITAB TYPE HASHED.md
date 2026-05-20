# 🌸 TYPE HASHED TABLE

## 🌺 OBJECTIFS

- [ ] Comprendre le fonctionnement d’une `HASHED TABLE`
- [ ] Identifier les différences avec une `SORTED TABLE`
- [ ] Savoir déclarer correctement la clé unique obligatoire (`WITH UNIQUE KEY`)
- [ ] Savoir insérer et lire directement des lignes via la clé

## 🌺 DEFINITION

> Une `HASHED TABLE` est une table interne avec accès direct par clé unique.  
> Elle utilise un calcul de hachage pour localiser chaque ligne instantanément.  
> Contrairement à la `SORTED TABLE`, il n’y a pas d’ordre ni d’index implicite.

> [!TIP]
> Imaginez un casier à code unique dans un vestiaire
>
> - Chaque code (clé) ouvre directement le bon casier (ligne).
> - Aucun besoin de parcourir les autres casiers pour trouver le bon.
> - Deux clés identiques ne peuvent pas coexister — la clé doit être unique.

> [!NOTE]
>
> - La clé unique est obligatoire (`WITH UNIQUE KEY`).
> - L’ordre des lignes n’est jamais garanti.
> - Les insertions massives et les lectures par clé sont très performantes.

## 🌺 DECLARATION

1️⃣ Définir un type de structure pour les lignes :

    TYPES: BEGIN OF ty_tab,
             obj1 TYPE char10,
             obj2 TYPE char20,
             obj3 TYPE i,
           END OF ty_tab.

2️⃣ Déclarer la table interne `HASHED` :

    DATA: lt_tab_types TYPE HASHED TABLE OF ty_tab
                         WITH UNIQUE KEY obj1.

- `WITH UNIQUE KEY obj1` → clé primaire obligatoire.
- Pas d’ordre, pas d’index explicite. La clé identifie chaque ligne.

## 🌺 INSERTION ET LECTURE PAR CLE

    DATA: ls_tab TYPE ty_tab.

    " Insertion
    ls_tab-obj1 = '0001'.
    ls_tab-obj2 = 'Dupont'.
    ls_tab-obj3 = 45.
    INSERT ls_tab INTO TABLE lt_tab_types.

    IF sy-subrc = 0.
      WRITE: / ls_tab-obj2, ls_tab-obj3.
    ENDIF.

> [!NOTE]
> Ici, la recherche est instantanée grâce au mécanisme de hachage.  
> Aucune boucle ni tri n’est nécessaire pour accéder à une ligne spécifique.

## 🌺 DIFFERENCES AVEC SORTED TABLE

| 🍧 Critère                | 🍧 HASHED TABLE                     | 🍧 SORTED TABLE                  |
| ------------------------- | ----------------------------------- | -------------------------------- |
| Organisation interne      | Table de hachage (calcul d’adresse) | Table triée par clé              |
| Index                     | Aucun index explicite               | Index créé automatiquement       |
| Accès par clé             | Direct (temps constant)             | Binaire (temps logarithmique)    |
| Clé obligatoire           | Oui, `WITH UNIQUE KEY`              | Oui, `WITH UNIQUE KEY`           |
| Ordre des enregistrements | Non garanti                         | Toujours trié selon la clé       |
| Insertion massive         | Très performante                    | Plus coûteuse (réordonnancement) |

> [!CAUTION]
>
> - L’accès séquentiel (`LOOP AT`) reste possible, mais l’ordre n’est jamais garanti.
> - Pour les recherches fréquentes par clé, `HASHED TABLE` est optimal.
> - Ne jamais insérer deux lignes avec la même clé unique.

## 🌺 EXERCICES – DECLARATION ET INSERTION

### 🔹 1 – CREER UNE HASHED TABLE DE CLIENTS

> [!IMPORTANT]
> Déclarer une table interne `lt_clients` avec une structure `ty_client` contenant
>
> - id (CHAR10) → clé unique
> - nom (CHAR20)
> - ville (CHAR20)
>
> Ajouter au moins deux clients.

<details>
  <summary>SOLUTION</summary>

    TYPES: BEGIN OF ty_client,
             id   TYPE char10,
             nom  TYPE char20,
             ville TYPE char20,
           END OF ty_client.

    DATA: lt_clients TYPE HASHED TABLE OF ty_client
                          WITH UNIQUE KEY id,
          ls_client TYPE ty_client.

    ls_client-id    = 'C002'.
    ls_client-nom   = 'Martin'.
    ls_client-ville = 'Paris'.
    INSERT ls_client INTO TABLE lt_clients.

    ls_client-id    = 'C001'.
    ls_client-nom   = 'Dupont'.
    ls_client-ville = 'Lyon'.
    INSERT ls_client INTO TABLE lt_clients.

</details>

---

## 🌺 RESUME

> - `HASHED TABLE` → table interne avec accès direct par clé unique.
> - Obligatoire : `WITH UNIQUE KEY`.
> - Avantage : lecture très rapide par clé, insertion performante.
> - Inconvénient : pas d’ordre naturel, pas d’accès séquentiel ordonné garanti.
>
> [!IMPORTANT]
> définir clairement la clé, éviter les doublons, privilégier les recherches par clé.
