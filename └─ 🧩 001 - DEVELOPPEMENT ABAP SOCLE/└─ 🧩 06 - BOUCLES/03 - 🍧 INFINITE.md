# 🌸 BOUCLE INFINIE - SM50

## 🌺 OBJECTIFS

- [ ] Comprendre ce qu’est une boucle infinie et pourquoi elle se produit
- [ ] Identifier les risques liés aux boucles sans condition de sortie (`DUMP TIMEOUT`)
- [ ] Apprendre à interrompre manuellement une boucle infinie via la transaction /oSM50
- [ ] Toujours prévoir une condition de sortie pour éviter des blocages du programme

## 🌺 DEFINITION

> Une boucle infinie se produit lorsqu’une instruction de boucle (DO, WHILE) n’a aucune condition de sortie.  
> Le programme continue à s’exécuter sans jamais s’arrêter, pouvant entraîner un `DUMP` de type `TIMEOUT`.

> [!TIP]
> Marcher en rond dans un couloir sans jamais atteindre la sortie.

> [!CAUTION]
> Les boucles infinies peuvent bloquer SAP et générer un `DUMP TIMEOUT`.  
> Toujours prévoir une condition de sortie dans vos boucles.

## 🌺 EXEMPLE

    DO.
      WRITE:/ SY-INDEX.
    ENDDO.

- Ici, la boucle DO n’a pas de condition de sortie
- SY-INDEX s’affiche indéfiniment
- Après un certain temps, SAP interrompt le programme automatiquement (DUMP TIMEOUT)

## 🌺 COMMENT INTERROMPRE UNE BOUCLE INFINIE

1. Ouvrir une nouvelle session SAP et exécuter la transaction `/oSM50`
2. Identifier le programme bloqué dans la liste (colonne `Progr.`) et vérifier l’utilisateur (`Nom d’util.`)
3. Cliquer sur le programme et choisir Administration → Programme → Interrompre
4. Confirmer le message d’alerte en répondant `Oui`
5. Rafraîchir l’écran (touche [F8] ou bouton flèches) pour vérifier que le programme est arrêté

> [!TIP]
> Cette procédure ne corrige pas la boucle dans le code, elle arrête simplement le programme en cours.  
> Il faut ensuite corriger le code pour ajouter une condition de sortie.

## 🌺 RESUME

> - Toujours prévoir une condition de sortie pour une boucle
> - Les boucles sans sortie peuvent provoquer des DUMPs TIMEOUT et bloquer l’exécution
> - `SM50` permet d’interrompre manuellement un programme bloqué
> - Astuce : utilisez `EXIT`, `CHECK` ou `SY-INDEX` pour contrôler la durée des boucles
