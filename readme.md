# Fastify and socket.io Mario Clicker
## contexte
Dans le cadre du module d'expertise en node js. Nous avons eu comme projet de créer un cliqueur en utilisant les modules fastify et socket.io. Ainsi, le but du jeu est de cliquer sur mario pour ramasser le plus de pièce possible. Un leaderboard s'affiche sur l'écran de jeu et vous pouvez ainsi voir les résultats des 10 premiers joueurs.

## installation
Pour installer notre jeu, vous devez :
* cloner notre repository git
* installer cette [bdd](./user.sql)
* lancer le serveur en éxécutant la commande
```
node server.js
```

## utilisation
Vous avez accès à notre jeu sur l'url http://localhost:8200 une fois le serveur lancé. Vous devez vous créer un compte avec un nom d'utilisateur et un mot de passe. Vous serez redirigez sur http://localhost:8200/game. Amusez-vous !

## A améliorer
Nous sommes conscient que le jeu peut encore être améliorer au niveau du leaderboard, car celui-ci s'arrête de se mettre à jour pour une raison qui nous est incconue.