# Apprendre PitCode en 20 minutes

Ce tutoriel part de zéro. Écrivez chaque exemple dans un fichier (comme `lecon.pit`) et lancez-le avec `pitcode lecon.pit`, ou collez-le dans le [terrain de jeu](../README.md#playground) (playground).

Les mots de PitCode sont en anglais. Ce guide explique chacun d'eux.

## 1. Afficher

```pit
say "Bonjour !"
say "2 + 3 =", 2 + 3
```

`say` (« dire ») affiche une ligne. Le texte s'écrit entre guillemets droits `"..."`. Tout ce qui suit `//` est une note pour les humains et est ignoré.

## 2. Retenir des valeurs

```pit
pit profondeur = 18       // une valeur qui peut changer
lock PROFONDEUR_MAX = 40  // une valeur qui ne change jamais

profondeur = profondeur + 5
say "Profondeur :", profondeur, "sur", PROFONDEUR_MAX
```

`pit` crée une variable. `lock` (« verrouiller ») en crée une qui ne peut pas changer : essayer de la modifier arrête le programme avec un message clair. Les noms peuvent avoir des accents : `pit plongée = 1`.

## 3. Mettre des valeurs dans du texte

```pit
pit nom = "Pat"
pit plongées = 212
say "{nom} a fait {plongées} plongées, soit {plongées * 2} bouteilles d'air !"
```

Ce qui est entre `{ }` dans un texte est calculé puis mis à sa place.

## 4. Faire des choix

```pit
pit profondeur = 24

when profondeur > 30 {
  say "Plongée profonde : surveillez votre air"
} orwhen profondeur > 18 {
  say "Plongée avancée"
} other {
  say "Plongée en eau libre"
}
```

`when` = « si », `orwhen` = « sinon si », `other` = « sinon ». Comparaisons : `==` (égal), `!=` (différent), `<`, `<=`, `>`, `>=`. On les combine avec `and` (et), `or` (ou), `not` (non).

## 5. Répéter

```pit
loop 3 times {
  say "Vérifiez votre équipement !"
}

loop mètres in 0..=30 by 10 {
  say "À {mètres} m, la pression est de {1 + mètres / 10} bar"
}
```

`loop` (« boucle ») répète. `0..=30 by 10` veut dire 0, 10, 20, 30. Avec `0..30` (deux points), on s'arrête juste avant 30.

## 6. Les listes

```pit
pit plongées = [18, 32, 12]
plongées.add(25)

say "Nombre de plongées :", plongées.size
say "Première :", plongées[0], "Dernière :", plongées[-1]
say "La plus profonde :", plongées.max(), "Moyenne :", plongées.average()

loop profondeur in plongées {
  say "- {profondeur} m"
}
```

Une liste garde des valeurs dans l'ordre. Les positions commencent à 0. `liste[-1]` est le dernier élément.

## 7. Les maps (fiches)

```pit
pit plongée = {site: "Cozumel", profondeur: 24, minutes: 52}
plongée.binôme = "Sam"

say plongée.site, "avec", plongée.binôme
loop clé, valeur in plongée {
  say "{clé} : {valeur}"
}
```

Une map garde des valeurs par nom, comme une fiche.

## 8. Les fonctions

```pit
pressionÀ(profondeur) => 1 + profondeur / 10

autonomie(litres, bar, profondeur) => {
  pit air = litres * bar
  back air / (20 * pressionÀ(profondeur))
}

say "Pression à 30 m :", pressionÀ(30), "bar"
say "Autonomie :", autonomie(12, 200, 30).round(), "minutes"
```

Une fonction est une recette avec un nom. `back` (« rendre ») donne la réponse. Une fonction d'une seule ligne rend sa valeur toute seule.

## 9. Travailler avec les listes

```pit
pit plongées = [18, 32, 12, 25]

say plongées.filter(p => p > 20)     // garder certaines
say plongées.map(p => p * 3.28)      // changer chacune (en pieds)
say plongées.sort()                  // copie triée
say plongées.sum()
```

`p => p > 20` est une toute petite fonction écrite là où on en a besoin.

## 10. Les kinds : créer ses propres choses

```pit
kind Plongeur {
  init(nom) => {
    me.nom = nom
    me.plongées = []
  }

  noter(profondeur) => {
    me.plongées.add(profondeur)
    back me
  }

  record() => me.plongées.max()
}

pit pat = Plongeur("Pat")
pat.noter(18).noter(32).noter(12)
say "Record de {pat.nom} : {pat.record()} m"
```

Un `kind` (« sorte ») est un plan de fabrication. `init` s'exécute à la création. `me` veut dire « moi-même ». On appelle le kind comme une fonction pour en créer un : `Plongeur("Pat")`.

## 11. Quand ça tourne mal

```pit
vérifierAir(bar) => {
  when bar < 50 {
    raise "Plus que {bar} bar : remontez !"
  }
  back "L'air est suffisant"
}

attempt {
  say vérifierAir(180)
  say vérifierAir(40)
} rescue problème {
  say "Problème :", problème.message
}
```

`raise` signale un problème. `attempt` (« essayer ») / `rescue` (« secourir ») l'attrape pour que le programme continue.

## 12. Poser des questions

```pit
pit nom = ask("Quel est votre nom ? ")
say "Bienvenue à bord, {nom} !"
```

`ask` (« demander ») attend que la personne tape une réponse.

## Et ensuite ?

- Le [README](../README.md) montre tout ce que le langage sait faire (en anglais).
- La [référence](reference.md) liste toutes les fonctions et méthodes intégrées.
- Le dossier `examples` contient des programmes complets, comme un carnet de plongée qui s'enregistre dans un fichier.

Quand quelque chose ne va pas, lisez l'erreur : elle dit ce qui s'est passé, montre l'endroit exact, et propose souvent la solution.

## Petit lexique

| PitCode | En français |
|---|---|
| `say` | afficher |
| `pit` / `lock` | variable / constante |
| `when` / `orwhen` / `other` | si / sinon si / sinon |
| `loop` / `stop` / `skip` | boucle / arrêter / passer au suivant |
| `back` | rendre (une valeur) |
| `kind` / `me` / `up` | sorte (classe) / moi-même / le parent |
| `attempt` / `rescue` / `always` / `raise` | essayer / secourir / toujours / signaler |
| `wait` / `give` | attendre / donner |
| `use` / `share` | utiliser / partager |
| `true` / `false` / `nil` | vrai / faux / rien |
