# 🌸 EXERCICES — SYNTHESE

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [OPERATEURS DE COMPARAISON](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 05 - CONDITIONS/01 - 🍧 OPERATORS.md>)

> Cours associé : [CASE ... ENDCASE](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 05 - CONDITIONS/02 - 🍧 CASE ENDCASE.md>)

> Cours associé : [CASE ... ENDCASE](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 05 - CONDITIONS/02 - 🍧 CASE ENDCASE.md>)

> Cours associé : [IF ... ENDIF](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 05 - CONDITIONS/03 - 🍧 IF ELSE ENDIF.md>)

> Cours associé : [IS INITIAL](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 05 - CONDITIONS/04 - 🍧 IS INITIAL.md>)

> Cours associé : [BETWEEN](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 05 - CONDITIONS/05 - 🍧 IF BETWEEN.md>)

> Cours associé : [CONTAINS ONLY (CO)](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 05 - CONDITIONS/06 - 🍧 IF CO.md>)

> Cours associé : [CONTAINS NOT ONLY (CN)](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 05 - CONDITIONS/07 - 🍧 IF CN.md>)

> Cours associé : [CONTAINS ANY (CA)](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 05 - CONDITIONS/08 - 🍧 IF CA.md>)

> Cours associé : [CONTAINS STRING (CS)](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 05 - CONDITIONS/09 - 🍧 IF CS.md>)

> Cours associé : [NO STRING (NS)](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 05 - CONDITIONS/10 - 🍧 IF NS.md>)

> Cours associé : [COVERS PATTERN (CP)](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 05 - CONDITIONS/11 - 🍧 IF CP.md>)

> Cours associé : [NO PATTERN (NP)](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 05 - CONDITIONS/12 - 🍧 IF NP.md>)

## 🌺 OBJECTIF

Valider une ligne de commande en combinant les structures et opérateurs étudiés.

## 🌺 CONTEXTE

La ligne reçue est :

```text
FR;CUST-2026;P;125.50;invoice_2026.CSV
```

Les segments représentent :

1. pays ;
2. code client ;
3. statut ;
4. montant ;
5. nom de fichier.

## 🌺 RÈGLES DE VALIDATION

### Pays

- obligatoire ;
- exactement deux caractères ;
- uniquement des lettres majuscules ;
- valeurs autorisées : `FR`, `DE`, `ES`, `IT`.

### Code client

- obligatoire ;
- uniquement `A-Z`, `0-9` et `-` ;
- doit contenir un tiret ;
- ne doit pas contenir `TEST`.

### Statut

- `N` ou `P` : accepté ;
- `S` : déjà expédié ;
- `C` : clôturé ;
- autre valeur : invalide.

### Montant

- conversion numérique obligatoire ;
- compris entre `0,01` et `99999,99`, bornes incluses.

### Fichier

- obligatoire ;
- doit correspondre au motif `*.CSV`.

## 🌺 CONSIGNES

1. Conserver la source.
2. Découper les cinq segments avec `SPLIT`.
3. Nettoyer les espaces avec `CONDENSE`.
4. Initialiser un indicateur `lv_is_valid` à `abap_true`.
5. Contrôler le pays avec :
   - `IS INITIAL` ;
   - `strlen` ;
   - `CO` ;
   - `CASE`.
6. Contrôler le code client avec :
   - `IS INITIAL` ;
   - `CO` ou `CN` ;
   - `CS` ;
   - `NS`.
7. Contrôler le statut avec `CASE`.
8. Convertir le montant dans un bloc `TRY`.
9. Contrôler le montant avec `BETWEEN`.
10. Contrôler le fichier avec `CP`.
11. Afficher toutes les erreurs détectées.
12. Afficher `Ligne valide` uniquement si aucune erreur n’existe.
13. Tester au minimum les cinq cas fournis.

## 🌺 CAS DE TEST

### Cas 1 — nominal

```text
FR;CUST-2026;P;125.50;invoice_2026.CSV
```

Résultat :

```text
Ligne valide
```

### Cas 2 — pays invalide

```text
fr;CUST-2026;P;125.50;invoice_2026.CSV
```

Résultat :

```text
Pays invalide
```

### Cas 3 — code invalide

```text
FR;CUST_TEST;P;125.50;invoice_2026.CSV
```

Résultats :

```text
Code client : caractère non autorisé
Code client : tiret obligatoire
Code client : séquence TEST interdite
```

### Cas 4 — statut et montant invalides

```text
FR;CUST-2026;X;0;invoice_2026.CSV
```

Résultats :

```text
Statut invalide
Montant hors limites
```

### Cas 5 — fichier invalide

```text
FR;CUST-2026;P;125.50;invoice_2026.TXT
```

Résultat :

```text
Fichier invalide
```

## 🌺 CRITÈRES DE VALIDATION

- [ ] Chaque segment est contrôlé.
- [ ] Les erreurs sont cumulées.
- [ ] Le programme ne s’arrête pas à la première erreur.
- [ ] Les chaînes vides sont traitées.
- [ ] `CASE` est utilisé pour les valeurs exactes.
- [ ] `IF` est utilisé pour les conditions et intervalles.
- [ ] `CO`, `CN`, `CS`, `NS` et `CP` sont utilisés correctement.
- [ ] La conversion est protégée.
- [ ] Le résultat nominal est accepté.
- [ ] Les quatre cas invalides sont refusés sans dump.

<details>
<summary>🍧 Afficher la solution complète</summary>

```abap
REPORT zaelion_<tri>_conditions.

CONSTANTS:
  lc_country_chars TYPE string
    VALUE `ABCDEFGHIJKLMNOPQRSTUVWXYZ`,
  lc_code_chars TYPE string
    VALUE `ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-`.

DATA lv_source TYPE string
  VALUE `FR;CUST-2026;P;125.50;invoice_2026.CSV`.

DATA:
  lv_country     TYPE string,
  lv_customer    TYPE string,
  lv_status_text TYPE string,
  lv_amount_text TYPE string,
  lv_file        TYPE string,
  lv_status      TYPE c LENGTH 1,
  lv_amount      TYPE p LENGTH 8 DECIMALS 2,
  lv_is_valid    TYPE abap_bool.

START-OF-SELECTION.

  lv_is_valid = abap_true.

  SPLIT lv_source AT ';'
    INTO lv_country
         lv_customer
         lv_status_text
         lv_amount_text
         lv_file.

  CONDENSE:
    lv_country,
    lv_customer,
    lv_status_text,
    lv_amount_text,
    lv_file.

  " Pays
  IF lv_country IS INITIAL
     OR strlen( lv_country ) NE 2
     OR lv_country CN lc_country_chars.

    WRITE / 'Pays invalide'.
    lv_is_valid = abap_false.
  ELSE.
    CASE lv_country.
      WHEN 'FR' OR 'DE' OR 'ES' OR 'IT'.
      WHEN OTHERS.
        WRITE / 'Pays non autorisé'.
        lv_is_valid = abap_false.
    ENDCASE.
  ENDIF.

  " Code client
  IF lv_customer IS INITIAL.
    WRITE / 'Code client obligatoire'.
    lv_is_valid = abap_false.
  ELSE.

    IF lv_customer CN lc_code_chars.
      DATA(lv_invalid_offset) = sy-fdpos.

      WRITE / |Code client : caractère non autorisé à l'offset { lv_invalid_offset }|.
      lv_is_valid = abap_false.
    ENDIF.

    IF lv_customer NS '-'.
      WRITE / 'Code client : tiret obligatoire'.
      lv_is_valid = abap_false.
    ENDIF.

    IF lv_customer CS 'TEST'.
      WRITE / 'Code client : séquence TEST interdite'.
      lv_is_valid = abap_false.
    ENDIF.

  ENDIF.

  " Statut
  IF lv_status_text IS INITIAL
     OR strlen( lv_status_text ) NE 1.

    WRITE / 'Statut invalide'.
    lv_is_valid = abap_false.
  ELSE.
    lv_status = lv_status_text.

    CASE lv_status.
      WHEN 'N' OR 'P'.
      WHEN 'S'.
        WRITE / 'Statut refusé : commande déjà expédiée'.
        lv_is_valid = abap_false.
      WHEN 'C'.
        WRITE / 'Statut refusé : commande clôturée'.
        lv_is_valid = abap_false.
      WHEN OTHERS.
        WRITE / 'Statut invalide'.
        lv_is_valid = abap_false.
    ENDCASE.
  ENDIF.

  " Montant
  IF lv_amount_text IS INITIAL.
    WRITE / 'Montant obligatoire'.
    lv_is_valid = abap_false.
  ELSE.
    TRY.
        lv_amount = CONV #( lv_amount_text ).

        IF lv_amount NOT BETWEEN '0.01' AND '99999.99'.
          WRITE / 'Montant hors limites'.
          lv_is_valid = abap_false.
        ENDIF.

      CATCH cx_sy_conversion_no_number.
        WRITE / 'Montant non numérique'.
        lv_is_valid = abap_false.

      CATCH cx_sy_conversion_overflow.
        WRITE / 'Dépassement du montant'.
        lv_is_valid = abap_false.
    ENDTRY.
  ENDIF.

  " Fichier
  IF lv_file IS INITIAL.
    WRITE / 'Fichier obligatoire'.
    lv_is_valid = abap_false.
  ELSEIF lv_file NP '*.CSV'.
    WRITE / 'Fichier invalide'.
    lv_is_valid = abap_false.
  ENDIF.

  IF lv_is_valid EQ abap_true.
    WRITE: / 'Ligne valide',
           / 'Pays        :', lv_country,
           / 'Code client :', lv_customer,
           / 'Statut      :', lv_status,
           / 'Montant     :', lv_amount,
           / 'Fichier     :', lv_file.
  ENDIF.
```

### Point de contrôle

Le bloc suivant est volontairement vide :

```abap
CASE lv_country.
  WHEN 'FR' OR 'DE' OR 'ES' OR 'IT'.
```

Aucune action supplémentaire n’est requise pour les pays autorisés. Le traitement d’erreur se trouve dans `WHEN OTHERS`.

Une variante plus explicite peut affecter un booléen ou ajouter un commentaire métier, mais elle ne doit pas masquer une logique nécessaire.

</details>
