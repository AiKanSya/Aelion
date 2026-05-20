# 🌸 OFFSET (REORGANISATION)

## 🌺 OBJECTIFS

- [ ] Comprendre le fonctionnement de l’`OFFSET` pour extraire des sous-chaînes
- [ ] Savoir manipuler la position de départ et le nombre de caractères à extraire
- [ ] Appliquer l’`OFFSET` pour réorganiser des chaînes, par exemple des dates

## 🌺 DEFINITION

> L’`OFFSET` permet de sélectionner une portion spécifique d’une chaîne de caractères à partir d’une position donnée et sur un nombre de caractères défini.

> [!TIP]
> Prendre un morceau d’une baguette à partir d’une certaine position et d’une certaine longueur.

> [!IMPORTANT]
> Chaque caractère d’une chaîne a une position, en commençant à 0. L’`OFFSET` permet de dire : "Je veux commencer ici et prendre tant de caractères."

## 🌺 SYNTAXE

    Variable[+pos](nbre)

- pos : position de départ dans la chaîne (0 = première position)
- nbre : nombre de caractères à extraire

> [!TIP]
> Comme découper une phrase à partir d’un mot précis et ne prendre que quelques lettres ou mots.

> [!CAUTION]
> La position commence toujours à 0, sinon vous risquez de récupérer le mauvais caractère.

## 🌺 EXEMPLE : REORGANISER UNE DATE

    WRITE:/ '     - OFFSET...'.

    DATA: lv_date(10) TYPE C.

    CONCATENATE SY-DATUM+6(2)
                SY-DATUM+4(2)
                SY-DATUM(4)
      INTO lv_date
      SEPARATED BY '-'.

    CONDENSE lv_date NO-GAPS.

    WRITE:/ SY-DATUM,
          / lv_date.

> [!IMPORTANT]
>
> - `SY-DATUM+6(2)` : à partir de la 6ème position, prendre 2 caractères → jour
> - `SY-DATUM+4(2)` : à partir de la 4ème position, prendre 2 caractères → mois
> - `SY-DATUM(4)` : prendre les 4 premiers caractères → année

> [!TIP]
> Prendre une date au format `AAAAMMJJ`, découper les morceaux correspondants au jour, mois et année, puis les remettre dans un nouvel ordre dans une nouvelle boîte.

> [!TIP]
>
> - La première position dans une chaîne commence toujours à 0
> - Très utile pour reformater des chaînes, extraire des sous-chaînes ou manipuler des dates
> - Souvent combiné avec `CONCATENATE` pour reconstruire une chaîne dans un nouvel ordre

> [!TIP]
> Comme découper des éléments d’un puzzle pour les remettre dans l’ordre que vous souhaitez.

## 🌺 RESUME

> - Variable[+pos](nbre) permet d’extraire une portion d’une chaîne
> - pos indique la position de départ
> - nbre indique le nombre de caractères à prendre
> - Très utile pour réorganiser et reformater des chaînes, notamment les dates ou codes
