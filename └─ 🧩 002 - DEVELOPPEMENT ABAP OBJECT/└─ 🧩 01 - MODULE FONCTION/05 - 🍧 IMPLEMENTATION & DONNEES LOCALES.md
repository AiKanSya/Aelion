# 🌸 IMPLEMENTATION ET DONNEES LOCALES

## 🌺 OBJECTIFS

- [ ] Identifier le bloc `FUNCTION ... ENDFUNCTION`
- [ ] Déclarer des variables locales
- [ ] Utiliser les paramètres de l’interface
- [ ] Organiser le traitement en étapes lisibles
- [ ] Éviter les effets de bord inutiles

## 🌺 STRUCTURE DU CODE

Le code d’un module fonction est contenu entre :

    FUNCTION z_aelion_calculate_total.

      " Traitement

    ENDFUNCTION.

L’en-tête commenté généré par SAP décrit l’interface. Il ne doit pas être modifié manuellement comme source de vérité : l’interface est gérée par les onglets de `SE37`.

## 🌺 VARIABLES LOCALES

Les variables déclarées dans le module fonction sont locales à l’appel courant.

    DATA lv_discount TYPE decfloat34.
    DATA lv_subtotal TYPE decfloat34.

Exemple :

    lv_subtotal = iv_quantity * iv_unit_price.
    lv_discount = lv_subtotal * iv_discount_rate / 100.
    ev_total    = lv_subtotal - lv_discount.

## 🌺 ORDRE DE TRAITEMENT RECOMMANDE

1. contrôler les paramètres obligatoires ;
2. normaliser les données d’entrée ;
3. lire les données nécessaires ;
4. exécuter le calcul ou la règle fonctionnelle ;
5. remplir les paramètres de sortie ;
6. retourner une erreur contrôlée si nécessaire.

## 🌺 EXEMPLE COMPLET

    FUNCTION z_aelion_calculate_total.
    *"----------------------------------------------------------------------
    *"  IMPORTING
    *"     VALUE(IV_QUANTITY) TYPE I
    *"     VALUE(IV_UNIT_PRICE) TYPE DECFLOAT34
    *"     VALUE(IV_DISCOUNT_RATE) TYPE DECFLOAT34 DEFAULT 0
    *"  EXPORTING
    *"     VALUE(EV_SUBTOTAL) TYPE DECFLOAT34
    *"     VALUE(EV_DISCOUNT) TYPE DECFLOAT34
    *"     VALUE(EV_TOTAL) TYPE DECFLOAT34
    *"  EXCEPTIONS
    *"      INVALID_QUANTITY
    *"      INVALID_PRICE
    *"      INVALID_DISCOUNT
    *"----------------------------------------------------------------------

      IF iv_quantity <= 0.
        RAISE invalid_quantity.
      ENDIF.

      IF iv_unit_price < 0.
        RAISE invalid_price.
      ENDIF.

      IF iv_discount_rate < 0 OR iv_discount_rate > 100.
        RAISE invalid_discount.
      ENDIF.

      ev_subtotal = iv_quantity * iv_unit_price.
      ev_discount = ev_subtotal * iv_discount_rate / 100.
      ev_total    = ev_subtotal - ev_discount.

    ENDFUNCTION.

## 🌺 DONNEES LOCALES ET DONNEES GLOBALES

| 🍧 Donnée       | 🍧 Déclaration                  | 🍧 Durée de vie logique           |
| --------------- | ------------------------------- | --------------------------------- |
| Paramètre       | Interface du module             | Appel du module                   |
| Variable locale | Dans `FUNCTION ... ENDFUNCTION` | Appel du module                   |
| Donnée globale  | Include TOP du groupe           | Contexte interne du groupe chargé |

> [!IMPORTANT]
> Une variable locale limite les dépendances. Une variable globale du groupe peut être visible par plusieurs modules fonction du même groupe.

## 🌺 ACCES BASE DE DONNEES

Exemple de lecture contrôlée :

    SELECT SINGLE matnr, meins
      FROM mara
      WHERE matnr = @iv_matnr
      INTO @DATA(ls_material).

    IF sy-subrc <> 0.
      RAISE material_not_found.
    ENDIF.

> [!WARNING]
> Un `SELECT SINGLE` sans condition précise ou une lecture massive non filtrée dégrade la performance et peut retourner une donnée non maîtrisée.

## 🌺 SEPARATION DES RESPONSABILITES

Un module nommé `Z_AELION_MATERIAL_READ` doit principalement lire et retourner des données.

Il ne doit pas simultanément :

- afficher une popup ;
- modifier une table sans l’annoncer ;
- déclencher un commit caché ;
- changer des paramètres utilisateur ;
- mélanger plusieurs domaines sans lien.

## 🌺 BONNES PRATIQUES

- Déclarer les variables au plus près de leur usage.
- Retourner explicitement chaque résultat.
- Contrôler les entrées avant l’accès aux données.
- Éviter les données globales lorsque des variables locales suffisent.
- Garder un traitement court et cohérent.
- Ne pas placer de `COMMIT WORK` dans un module réutilisable sans contrat transactionnel explicite.

## 🌺 EXERCICES

1. Créer un module qui calcule un montant brut, une remise et un montant net.
2. Contrôler que la quantité est positive.
3. Contrôler que la remise est comprise entre `0` et `100`.
4. Retourner trois valeurs d’export.
5. Tester les limites `0`, `100` et une valeur invalide.

## 🌺 RESUME

> - Le traitement est écrit entre `FUNCTION` et `ENDFUNCTION`.
> - Les variables locales sont limitées à l’appel.
> - Les contrôles doivent précéder le traitement principal.
> - Les sorties sont remplies explicitement.
> - Les données globales doivent rester exceptionnelles et maîtrisées.

## 🌺 SOURCES OFFICIELLES

- SAP Help Portal — Understanding Function Module Code : https://help.sap.com/docs/ABAP_PLATFORM_NEW/bd833c8355f34e96a6e83096b38bf192/d1801f1c454211d189710000e8322d00.html
- SAP Help Portal — Creating New Function Modules : https://help.sap.com/docs/ABAP_PLATFORM_NEW/bd833c8355f34e96a6e83096b38bf192/d1801ee8454211d189710000e8322d00.html
