# DevQuest
Jeux RPG pour le devfest 205

## How to use

Pour le dev, il faut lancer gulp dev

Sinon gulp build et aller dans le répertoire dist

##Credits 

Les images des personnages viennent de OpenGameArt : http://opengameart.org/content/antifareas-rpg-sprite-set-1-enlarged-w-transparent-background-fixed

et aussi de  ttp://opengameart.org/content/sara-16x18

Charles Gabriel original base sprite:

http://opengameart.org/content/twelve-16x18-rpg-sprites-plus-base

First upload on OGA of Sara the Wizard (Mascot of OGA):

http://opengameart.org/content/sara-wizard

Les images utilisées pour le fond viennent de OpenGameArt : http://www.lorestrome.com/pixel_archive/main.htm

et Encore : http://opengameart.org/content/24x32-characters-with-faces-big-pack


## Credentials 
Pour Google aller voir https://console.developers.google.com projet DevQuest pour récupérer l'identifiant client
Pour Twitter : https://apps.twitter.com/
Pour Github : https://github.com/settings/applications

Les crédentials sont à placer dans un fichier credentials.json à la racine du projet et respectant cette hérarchie : 
```javascript
{
    "GOOGLE_CLIENT" : "<GOOGLE_CLIENT>",
    "TWITTER_CLIENT" : "<TWITTER_CLIENT>",
    "TWITTER_CLIENT_SECRET" : "<TWITTER_CLIENT_SECRET>",
    "GITHUB_CLIENT" : "<GITHUB_CLIENT>",
    "GITHUB_CLIENT_SECRET" : "<GITHUB_CLIENT_SECRET>"
}
```

La partie secret est à garder pour les tests en local à lancer aussi avec le serveur server-shim.js

## SpreadSheet
L'identifiant de la clé du spreadsheet à utiliser est contenue dans une variable d'environement. Voici un exemple de fichier à créer pour setter la variable  set_env.sh ou set_env.bat

set_env.sh
```sh
#!/bin/bash
export SPREADSHEET_VAR='xxxxxx'
```

set_env.bat
```bat
set SPREADSHEET_VAR='xxxxxx'
```


## Reverse Socials Links 

 * Pour twitter : http://tweeterid.com/
 * Pour Github : https://api.github.com/user/{idUser}
 * Pour Gplus : https://plus.google.com/u/0/{idUser}