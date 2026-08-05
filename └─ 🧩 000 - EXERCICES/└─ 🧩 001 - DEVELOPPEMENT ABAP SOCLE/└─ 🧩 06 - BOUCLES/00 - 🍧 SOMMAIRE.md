# 🌸 SOMMAIRE — └─ 🧩 06 - BOUCLES

## 🌺 OBJECTIF DU PARCOURS

Ces exercices renforcent trois notions :

1. la boucle `DO ... ENDDO` ;
2. la boucle `WHILE ... ENDWHILE` ;
3. la prévention et le diagnostic des boucles infinies.

Le stagiaire doit être capable de :

- choisir une boucle selon le besoin ;
- prévoir le nombre d’itérations ;
- suivre l’évolution des variables ;
- utiliser correctement `CHECK`, `CONTINUE` et `EXIT` ;
- démontrer qu’une boucle possède une condition de terminaison ;
- identifier un code susceptible de ne jamais se terminer ;
- connaître le rôle de `SM50` sans provoquer volontairement un blocage du système.

## 🌺 COURS ASSOCIÉS

- `06 - BOUCLES/01 - 🍧 DO.md`
- `06 - BOUCLES/02 - 🍧 WHILE.md`
- `06 - BOUCLES/03 - 🍧 INFINITE.md`

## 🌺 PROGRAMME UTILISÉ

Créer le programme exécutable suivant :

```text
ZAELION_<TRI>_BOUCLES
```

Remplacer `<TRI>` par le trigramme attribué.

Enregistrer le programme dans le package et l’ordre de transport utilisés pour les exercices précédents.

## 🌺 RÈGLES COMMUNES

- Réaliser un premier essai avant d’ouvrir la solution.
- Contrôler la syntaxe avant chaque activation.
- Tracer manuellement les premières itérations avant l’exécution.
- Tester les cas nominaux et les cas limites demandés.
- Restaurer une version correcte après chaque erreur volontaire.
- Conserver une preuve vérifiable : code, tableau de trace, résultat ou explication structurée.
- Ne jamais exécuter volontairement une boucle réellement infinie sur un système partagé.
- Ne jamais interrompre un programme appartenant à un autre utilisateur.
- N’utiliser `SM50` que dans le cadre autorisé par le formateur ou l’administrateur SAP.

> [!IMPORTANT]
> Dans une boucle `DO` ou `WHILE`, `sy-index` contient le numéro du passage courant.  
> La première itération porte le numéro `1`.

> [!CAUTION]
> `CHECK`, `CONTINUE` et `EXIT` ne produisent pas le même effet :
>
> - `CHECK` faux : abandon du passage courant et passage au suivant ;
> - `CONTINUE` : abandon explicite du passage courant et passage au suivant ;
> - `EXIT` : sortie complète de la boucle.

## 🌺 EXERCICES

- [DO](<./01 - 🍧 DO.md>)
- [WHILE](<./02 - 🍧 WHILE.md>)
- [INFINITE](<./03 - 🍧 INFINITE.md>)
