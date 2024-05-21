# basic-auth

# installation du serveur

 1. npm init -y

Pour créer le package.json:
````
{
  "name": "basic-auth",
  "version": "1.0.0",
  "description": "",
   "type": "module",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
      "dev": "nodemon api/index.js",
    "start": "node api/index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
````
"type": "module", => exportée à l’aide du mot-clé export 
et importe  à l’aide du mot-clé import

2. créer un dossier api puis un fichier index.js

3. Express.js :

https://expressjs.com/fr/starter/installing.html

 npm install express

4. index.js :

````

````
Pour lancer le serveur :
1/ si vous avez installer nodemon (https://www.npmjs.com/package/nodemon)
=> nodemon api/index.js
2/ sinon 
=> node api/index.js

Dans la console : 
````
starting `node api/index.js`
Server listening on port 3000
````
pour vérifer avec le navigateur : http://localhost:3000/ 
vous pouvez lire hello world

5. Cacher les données sensibles

1/ Récupérer le .gitignore du dossier client et le mettre à la racine

Puis, y écrire .env

2/ installer dotenv

https://www.npmjs.com/package/dotenv

npm install dotenv --save

3/ créer le fichier .env à la racine

````
NODE_ENV=3000
````
4/ dans index.js

````
import dotenv from 'dotenv';
````

puis tester le serveur