# 🌸 MATRICE DE TESTS D'UN TRAITEMENT D'IMPORT

## 🌺 OBJECTIFS

- [ ] Transformer une règle en résultat observable.
- [ ] Distinguer erreur globale, erreur locale et succès partiel.
- [ ] Associer une preuve à chaque cas.

## 🌺 STRUCTURE

| Champ | Contenu |
| --- | --- |
| Identifiant | code stable |
| Objectif | règle vérifiée |
| Préconditions | référentiel et droits nécessaires |
| Entrée | fichier et paramètres |
| Étapes | actions reproductibles |
| Résultat attendu | comportement précis |
| Résultat observé | valeur réellement obtenue |
| Preuve | affichage, journal ou donnée persistée |
| Statut | réussi, échoué ou bloqué |

## 🌺 EXEMPLE NEUTRE

Le système importe un catalogue `CODE;LABEL;PRICE`.

| ID | Cas | Résultat attendu |
| --- | --- | --- |
| CAT-01 | deux lignes valides | deux articles préparés |
| CAT-02 | prix non numérique | ligne rejetée sans dump |
| CAT-03 | code absent | message local et poursuite des autres lignes |
| CAT-04 | fichier vide | arrêt global contrôlé |
| CAT-05 | fichier inaccessible | aucune écriture partielle |
| CAT-06 | données valides et invalides | succès partiel conforme au contrat |

Cet exemple illustre la méthode. La matrice d'un projet doit être construite à partir de sa propre spécification et de ses données attendues.

## 🌺 QUALITÉ D'UN CAS

- indépendant des tests précédents ;
- résultat mesurable ;
- données d'entrée identifiées ;
- preuve conservée ;
- réexécution après correction et contrôle de non-régression.

## 🌺 EXERCICE

À partir d'un import de participants `NAME;CITY;LEVEL`, construire six cas couvrant succès, erreur locale, erreur globale, valeur limite et traitement mixte.
