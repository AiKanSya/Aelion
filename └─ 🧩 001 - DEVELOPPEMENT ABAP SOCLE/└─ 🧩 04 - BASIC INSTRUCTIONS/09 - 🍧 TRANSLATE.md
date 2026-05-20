# 🌸 TRANSLATE

## 🌺 OBJECTIFS

- [ ] Comprendre l’usage de `TRANSLATE` pour manipuler du texte
- [ ] Savoir convertir une chaîne en majuscules ou minuscules
- [ ] Savoir appliquer un masque de transformation sur une chaîne

## 🌺 DEFINITION

> `TRANSLATE` sert à modifier la casse ou appliquer un masque sur une chaîne de caractères.

> [!TIP]
> Prendre une phrase et la transformer entièrement en majuscules, en minuscules, ou selon un code de substitution précis.

> [![!NOTE]]
> les paramètres `UPPER` / `LOWER` est utile pour uniformiser le texte avant comparaison ou affichage. `USING mask` permet de transformer lettre par lettre selon une logique spécifique.

## 🌺 SYNTAXE

    TRANSLATE text {TO {UPPER | LOWER} CASE} | {USING mask}.

- TO UPPER CASE : convertit tous les caractères en majuscules
- TO LOWER CASE : convertit tous les caractères en minuscules
- USING mask : applique une logique de transformation définie par un masque

> [!TIP]
>
> - `UPPER` = écrire tout en lettres capitales
> - `LOWER` = écrire tout en lettres minuscules
> - `USING mask` = appliquer un code spécial de substitution lettre par lettre, comme un message codé

## 🌺 EXEMPLE BASIQUE

    WRITE:/ '     - TRANSLATE...'.

    DATA: lv_text1 TYPE STRING,
          lv_text2 TYPE STRING.

    lv_text1 = lv_text2 = 'Hello World'.

    TRANSLATE lv_text1 TO UPPER CASE.
    TRANSLATE lv_text2 TO LOWER CASE.

    WRITE: / 'lv_text1 = ', lv_text1,
           / 'lv_text2 = ', lv_text2.

- lv_text1 → HELLO WORLD
- lv_text2 → hello world

> [!TIP]
> Transformer une phrase en majuscules ou minuscules pour uniformiser l’écriture.

> [!NOTE]
> Très utile avant de comparer deux chaînes pour éviter les erreurs dues à la casse.

## 🌺 EXEMPLE AVEC MASQUE

    WRITE:/ '     - TRANSLATE WITH MASK...'.

    DATA: lv_text3 TYPE STRING.

    lv_text3 = 'Barbcbdbarb'.

    TRANSLATE lv_text3 USING 'ABBAabba'.

    WRITE: / 'lv_text3 = ', lv_text3.

- Masque `ABBAabba` :

  - A → B
  - B → A
  - a → b
  - b → a

- Résultat final : Abracadabra

> [!TIP]
> Remplacer certaines lettres par d’autres selon un code précis, comme un jeu de substitutions ou un message codé.

> [!IMPORTANT]
> Le masque agit lettre par lettre, remplaçant chaque caractère trouvé par son correspondant dans le masque. Pratique pour corriger ou transformer des chaînes selon un motif défini.

> [!CAUTION]
> Vérifier que la variable cible est de type STRING pour éviter les erreurs.

## 🌺 RESUME

> - `TRANSLATE` = modifier la casse (`UPPER` / `LOWER`) ou appliquer un masque (`USING`)
> - Permet d’uniformiser ou transformer le texte avant traitement
> - Les résultats sont stockés directement dans la variable cible
> - `USING` mask permet des transformations complexes lettre par lettre
> - Utilisation conseillée : normaliser le texte avant comparaison, affichage ou traitement automatisé
