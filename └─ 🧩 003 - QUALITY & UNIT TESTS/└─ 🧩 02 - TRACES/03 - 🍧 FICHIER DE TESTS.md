# 🌸 FICHIER DE TESTS

- [ ] Savoir renseigner un `fichier de tests`
- [ ] `Standardiser` la `validation`
- [ ] Rendre le test compréhensible par un tiers

## 🧩 STRUCTURE STANDARD

> [!IMPORTANT]
> Format recommandé :
>
> - Excel ou Word
> - Un test = une ligne ou une section

## 🧩 CONTENU

### 🍧 EN-TETE

- Projet
- Objet testé
- Date
- Consultant
- Environnement (DEV / QAS)

### 🍧 CAS DE TEST

| 🍧 Element       | 🍧 Réponse                                                                                                 |
| ---------------- | ---------------------------------------------------------------------------------------------------------- |
| ID Test          | UT_001                                                                                                     |
| Objectif         | Vérifier que le nombre de commandes d’un client est correctement retourné                                  |
| Pré-requis       | Client USCU_S11 existant avec des commandes                                                                |
| Étapes           | 1. Lancer la classe ZCL_CUSTOMER_ORDERS 2. Exécuter la méthode get_order_count 3. Lancer le test ABAP Unit |
| Résultat attendu | Le test ABAP Unit est vert Le nombre retourné est 210                                                      |
| Résultat obtenu  | Succès                                                                                                     |
| Preuves          | (Screenshots)                                                                                              |
| Statut           | OK                                                                                                         |

## 🧩 EXEMPLE DE LIEN TRACE/TEST

- Trace ST05 :
  SELECT COUNT(\*) FROM VBAK WHERE KUNNR = 'USCU_S11'

![](../assets/Capture%20d’écran%202026-01-15%20112841.png)

![](../assets/Capture%20d’écran%202026-01-15%20110221.png)

> [!WARNING]
> La trace ne remplace pas le test, elle le documente.

## 🧩 LIMITES

> [!CAUTION]
>
> - Une trace n’est pas un test
> - Une trace ne valide pas la logique
> - Trop de traces = perte de lisibilité
> - Toujours désactiver les traces après usage

## 🧩 CONCLUSION

- Le développeur automatise
- Le consultant documente
- Les traces servent à prouver
- Le fichier de tests sert à transmettre
