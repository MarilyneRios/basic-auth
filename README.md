# basic-auth

# installation du serveur

1.  npm init -y

Pour créer le package.json:

```
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
```

"type": "module", => exportée à l’aide du mot-clé export
et importe à l’aide du mot-clé import

2. créer un dossier api puis un fichier index.js

3. Express.js :

https://expressjs.com/fr/starter/installing.html

npm install express

4. index.js :

```

```

Pour lancer le serveur :
1/ si vous avez installer nodemon (https://www.npmjs.com/package/nodemon)
=> nodemon api/index.js
2/ sinon
=> node api/index.js

Dans la console :

```
starting `node api/index.js`
```

pour vérifer avec le navigateur : http://localhost:3000/
vous pouvez lire hello world

5. Cacher les données sensibles

1/ Récupérer le .gitignore du dossier client et le mettre à la racine

Puis, y écrire .env

2/ installer dotenv

https://www.npmjs.com/package/dotenv

npm install dotenv --save

3/ créer le fichier .env à la racine

```
PORT=3000
```

4/ dans index.js

```
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT

// server on port process.env.PORT
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
    res.send('hello world');
  });
```

puis tester le serveur

# connecter à MongoDB

1. créer un dossier config puis db.js

```
import mongoose from 'mongoose';

const connectDB = async () => {
try {
    const conn = await mongoose.connect(process.env.VITE_DB_CONNECTION_STRING);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
} catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
}
};

 export default connectDB;
```

2.  dans .env

```
VITE_DB_CONNECTION_STRING="votre lien de connexion mongoDB"
```

3.  Dans index.js

```
   import connectDB from './config/db.js';

   connectDB();
```

4.  Installer mongoose sur le server

https://www.npmjs.com/package/mongoose
npm install mongoose

5. Vérifer la connexion :

[nodemon] starting `node api/index.js`
Server listening on port 3000
MongoDB Connected:......

# User model

1. Créer un dossier models

2. Créer un fichier userModel.js

```
import mongoose from 'mongoose';

// Définition du Schéma user
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
    },
  },
  { timestamps: true }
);

//  Création du Modèle user
const User = mongoose.model('User', userSchema);

export default User;
```

{ timestamps: true } => ajoute automatiquement deux champs au schéma : createdAt et updatedAt

# route API

1.  Créer un dossier routes

Chaque route correspond à un endpoint spécifique que les clients peuvent appeler. Les routes utilisent généralement les contrôleurs pour gérer les requêtes.

2. Créer un fichier userRoutes.js

```
 import express from 'express';

 const router = express.Router();

 router.get('/', (req, res) => {
     res.json({message :'hello world'});
   });

 export default router;
```

3. Dans index.js :

```
import userRoutes from './routes/userRoute.js'
app.use('/api/user', userRoutes);
```

4. tester la route :

http://localhost:3000/api/user

Vous devez lire quelque comme ceci :{"message":"hello world"}.

5. Créer un dossier controllers
   Les contrôleurs sont responsables de traiter les requêtes, interagir avec les modèles (base de données), et renvoyer les réponses appropriées.

6. Créer un fichier userController.js
````
import express from 'express';
import {
    display,
 } from '../controllers/userController.js';

const router = express.Router();

router.get('/', display);

export default router;
````

7. tests

http://localhost:3000/api/user = {"message":"API is working!"}

# Sign-up API route

1. Pour l'auth, on crée 2 fichiers indépendants :

authRoute.js et authController.js

````
//authRoutes

import express from 'express';
import { signin, signup, signout } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', signout);

export default router;
````

et 

````
//authConttroler.js
import User from '../models/userModels.js';

export const signup = async (req, res, next) => {
    console.log(req.body);
}

export const signin = async (req, res, next) => {
    console.log(req.body);
}

export const signout = (req, res) => {
    console.log(req.body);
    res.json({ message: 'Inscription réussie', data: req.body });
}
````

2. test

thunderClient > body >json

{
  "username": "user1",
  "email":"email@email.com",
  "password": "pwd"
}

post http://localhost:3000/api/auth/signup => undefined

faut ajouter dans index.js : **app.use(express.json());** pour permettre d'accéder directement aux données JSON via req.body.

- Dans la console :

 {
  "username": "user1",
  "email":"email@email.com",
  "password": "pwd"
}

- Dans thunderClient:
on va la réponse : Status: 200 OK
{
  "message": "Inscription réussie",
  "data": {
    "username": "user1",
    "email": "email@email.com",
    "password": "pwd"
  }
}

## Logique signup authController

1. authController.js
````
import User from '../models/userModels.js';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
}
````
2. On test avec thunder :
Status: 201 Created

{  "message": "User created successfully"}

3. vérifier dans mongoDB si cela a créer un new user.

4. On peut tester les meg d'erreur :

usename unique ou requis...
ex: 
errmsg: 'E11000 duplicate key error collection: basic-auth.users index: username_1 dup key: { username: "user1" }',

5. Pour voir le msg d'erreur dans thunderClient

````
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password});
    try {
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
      } catch (error) {
        next(error);
      }
};
````
# pbm de mot de passe lisible dans MongoDB
Ceci est un pbm car si qlq a acces à la dataBase, on peut lire les passwords des users. Et cela représente une faille de sécurité pour les informations sensibles des users.

1. Crypter les passwords avec bcryptjs :

https://www.npmjs.com/package/bcryptjs

npm install bcryptjs

1. authController

import bcryptjs from 'bcryptjs';

const hashedPassword = bcryptjs.hashSync(password, 10);
const newUser = new User({ username, email, password: hashedPassword });

2. test et lire dans mongoDB.

# middleware errors

1. créer un dossier utils ou middlewares

2. Puis un fichier error.js

Cette fonction crée un nouvel objet d’erreur avec un code d’état et un message spécifiques.
````
export const errorHandler = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
````

et dans index.js ajouter :


````
  app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      message,
      statusCode,
    });
  });
````

  **Identification de l'erreur** : Si quelque chose ne va pas, comme un nom d'utilisateur incorrect ou un problème de connexion à la base de données, cette erreur est capturée et envoyée à ce middleware.

  **Préparation de la réponse** : Le middleware vérifie l'erreur et obtient des détails comme le code d'erreur (par exemple, 404 pour "introuvable") et un message explicatif.

  **Envoi de la réponse** : Ensuite, il envoie une réponse JSON contenant ces détails à l'utilisateur, afin qu'il sache ce qui s'est passé.

# signIn route

on vérifie l'identité du user avec l'email et le password.

- ps: 
**errorHandler** permet de personnaliser le message d'erreur.

````
import { errorHandler } from '../utils/error.js';
next(errorHandler(404, 'User not found'))
````

**compareSync** comparer les passwords (mongoDB et saisie)
````
 const validPassword = bcryptjs.compareSync(password, validUser.password);
````
 La bonne pratique est de ne pas dire au user que le password est mauvais car une personne mal intensionée sait alors qu'il doit trouver le password.

 ## Créer le token et le mettre dans un cookie:

 Afin d'éviter d'utiliser le ID de la database.

https://www.npmjs.com/package/jsonwebtoken

````
import jwt from 'jsonwebtoken';
````
````
 const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
````
````
res
      .cookie('access_token', token, { httpOnly: true,})
     .status(200)
      .json(rest);
````
- Dans le .env :

JWT_SECRET="chouefihqjcoqjofiefhieh"

-tester avec thunderClient:

 post: http://localhost:3000/api/auth/signin
  body:
 json
 {  "email":"email2@email.com",
  "password": "pwd"}

> response: 
  200 ok 
  {
  "_id": "664cbcf77aa1grhtrrhc2f99e",
  "username": "user2",
  "email": "email2@email.com",
  "profilePicture": "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
  "createdAt": "2024-05-21T15:25:43.691Z",
  "updatedAt": "2024-05-21T15:25:43.691Z",
  "__v": 0
}
> dans cookie :
access_token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NGNiY2Y3N2FhMTZlNzViODQyZjk5ZSIsImlhdCI6MTcxNjM4Mzg5MX0.p-sAyeSzZNKHuNfYCvO_rGXxnzB4gnRcgYYfgLhtg5A

**Ne pas laisser le password côté client**
````
    const { password: hashedPassword, ...rest } = validUser._doc;
````
On sépare le password du reste des infos du user.
Avec ._doc, on renvoie que les infos nécessaires
````
.json(rest);
````

- date de validité du cookie :
````
const expiryDate = new Date(Date.now() + 28800000); // 8 heures
````
````
.cookie('access_token', token, { httpOnly: true, expires: expiryDate })
````

- test
Dans le header de la response:
il y a une date pour le cookie :

Wed, 22 May 2024 13:35:53 GMT

# routes google

Dans le dossier api > routes > authRoutes.js :

````
import express from 'express';
import { signin, signup, google, signout } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', google);
router.get('/signout', signout);

export default router;
````

## authcontroller

> Recherche de l’utilisateur :

````
const user = await User.findOne({ email: req.body.email });

````

### 1/ Si l’utilisateur existe déjà : 
Si un utilisateur avec cet email existe déjà, un token JWT est créé pour cet utilisateur. Ce token est ensuite envoyé au client sous forme de cookie. Enfin, les informations de l’utilisateur (à l’exception du mot de passe) sont renvoyées au client sous forme de JSON.

> crée un token JWT qui contient l’ID du user

````
 const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
````

> Hacher le password :

````
const { password: hashedPassword, ...rest } = user._doc;
````
> Générer un cookie avec le token :

````
  const expiryDate = new Date(Date.now() + 28800000); // 8 heures
  res
    .cookie('access_token', token, {
      httpOnly: true,
      expires: expiryDate,
    })

````
> Envoyer une réponse avec le statut :

````
    .status(200)
    .json(rest);
````

#### 2/ Si l’utilisateur n’existe pas encore :

Mais pour créer un compte, nous avons un pbm: avec google, il **manque le username et le password**.
> Génération d’un mot de passe : Un nouveau mot de passe est généré pour l’utilisateur. Ce mot de passe est une chaîne aléatoire de 16 caractères.

````
const generatedPassword =
  Math.random().toString(36).slice(-8) +
  Math.random().toString(36).slice(-8);

````

> Le haché en utilisant bcryptjs

````
const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

````

> Création d’un nouveau user : avec le mot de passe haché, l’email et le nom fournis, et la photo de profil.

Le username est généré en prenant le nom de l’utilisateur, en le convertissant en minuscules, en supprimant les espaces et en ajoutant une chaîne aléatoire de 8 caractères à la fin.
( username: req.body.name.split(' ').join('').toLowerCase() +  Math.random().toString(36).slice(-8),: Cette partie du code génère une chaîne aléatoire de 8 caractères afin d'avoir un username unique. 
Ou bien comme ceci : username: req.body.name.split(' ').join('').toLowerCase() + Math.floor(Math.random()*10000).toString()),

````
const newUser = new User({
  username:
    req.body.name.split(' ').join('').toLowerCase() +
    Math.random().toString(36).slice(-8),
  email: req.body.email,
  password: hashedPassword,
  profilePicture: req.body.photo,
});

````
> sauvegarder :

````
await newUser.save();

````

> Créer un token JWT :

````
const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
````

> Le token JWT est envoyé au client sous forme de cookie sauf le password.

````
const { password: hashedPassword2, ...rest } = newUser._doc;
const expiryDate = new Date(Date.now() + 3600000); // 1 hour
res
  .cookie('access_token', token, {
    httpOnly: true,
    expires: expiryDate,
  })
  .status(200)
  .json(rest);
````

# Route pour Update

Rappel : 
router.post('/update/:id', updateUser);

## Créer dans utils un fichier verifyUser.js

- const verifyToken = un middleware pour Express.js. Cette fonction prend trois arguments : req (la requête), res (la réponse) et next

1. cookie-parser

 C'est un middleware pour Express.js qui facilite la gestion des cookies.

https://www.npmjs.com/package/cookie-parser

> npm i cookie-parser

> **const token** = req.cookies.access_token; : Récupère le token JWT des cookies de la requête.

> **if (!token) return next(errorHandler(401, 'Problem authentication!'));** : Si aucun token n’est présent, la fonction appelle next avec une erreur indiquant que le user n’est pas authentifié.

> **jwt.verify(token, process.env.JWT_SECRET, (err, user) => { ... });** : Vérifie le token JWT. process.env.JWT_SECRET est la clé secrète utilisée pour vérifier le token.

>**if (err) return next(errorHandler(403, 'Token is not valid!'));** : Si une erreur se produit lors de la vérification du token, la fonction appelle next avec une erreur indiquant que le token n’est pas valide.

>**req.user = user; next();** : Si le token est valide, le token est décodé du token et attaché à la requête et la fonction next est appelée pour passer au prochain middleware.

2. index.js

````
import cookieParser from 'cookie-parser';
````

````
app.use(express.json());
app.use(cookieParser());
````

3. userRoute.js

````
import { verifyToken } from '../utils/verifyUser.js';

//------
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
````

4. userController.js

> **if (req.user.id !== req.params.id) { return next(errorHandler(401, 'You can update only your account!')); }** : Vérifie si l’ID de le user dans la requête = l’ID de le user dans les paramètres de l’URL. 

=> Si ce n’est pas le cas, cela signifie que l’utilisateur essaie de mettre à jour un compte qui n’est pas le sien, et une erreur 401 est renvoyée.


> **if (req.body.password) { req.body.password = bcryptjs.hashSync(req.body.password, 10); }** : Si un nouveau mot de passe est fourni dans le corps de la requête, il est haché avec bcryptjs avant d’être stocké.

> **const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: { ... } }, { new: true });** : La méthode **findByIdAndUpdate** de Mongoose pour mettre à jour l’utilisateur dans la base de données. 
Les nouvelles infos du user sont passées dans l’objet $set. 

L’option **{ new: true }** est une méthode renvoie le user mis à jour plutôt que l’original.

> **const { password, ...rest } = updatedUser._doc;** : Extraire le mot de passe du document user mis à jour. Cela est fait pour que le mot de passe ne soit pas renvoyé dans la réponse.

> **res.status(200).json(rest);** : Une réponse avec un statut 200 et le document utilisateur mis à jour (sans le mot de passe).

> **catch (error) { next(error); }** : Si une erreur se produit à tout moment pendant l’exécution de cette fonction, l’erreur est passée à la prochaine fonction middleware dans la pile Express.js.

5. tester avec thunderClient:

POST : http://localhost:3000/api/auth/signin

Body > JSON > {
  
  "email":"test@gmail.com",
  "password": "test"
}

récupérer le id et 

POST : http://localhost:3000/api/user/update/id
{
  
  "email":"test@gmail.com",
  "password": "test"
}


Vous devez voir les infos du user:
Pour modifier le username:

{
  "username": "testModif",
  "email":"test@gmail.com",
  "password": "test"
}

# Delete fct

## userRoute.js

````
router.delete('/delete/:id', verifyToken, deleteUser);
````

## userController.js

````
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can delete only your account!'));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted...');
  } catch (error) {
    next(error);
  }
````
 - if (req.user.id !== req.params.id) => vérifie si l'identifiant de l'user authentifié.

 - await User.findByIdAndDelete(req.params.id); => recherche un user  par son identifiant (req.params.id) et le supprime de la base de données.

 - res.status(200).json('User has been deleted...'); : Si la suppression est réussie, une réponse avec un statut 200 (succès) est envoyée, contenant un message JSON indiquant "User has been deleted....".

# signout fct

## authRoute.js

````
router.get('/signout', signout);
````

## authController.js

````
export const signout = (req, res) => {
    res.clearCookie('access_token').status(200).json('Signout success!');
}

````

# préparation render

1. package.json

````
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon api/index.js",
    "start": "node api/index.js",
    "build": "npm install && npm install --prefix client && npm run build --prefix client"
  },
  ````

**npm install --prefix client** : Cette commande installe toutes les dépendances répertoriées dans le fichier package.json du répertoire client. L’option --prefix client indique à npm de naviguer vers le répertoire client et d’y exécuter la commande npm install.

**npm run build --prefix client** : Cette commande exécute le script build défini dans le fichier package.json du répertoire client. Le script build est généralement utilisé pour compiler ou transpiler votre code source en un format qui peut être exécuté par le navigateur.


2. index.js

````
import path from 'path';

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});
````

- Le chemin absolu du répertoire courant => app.use(express.static(path.join(__dirname, '/client/dist')));

- Crée un chemin absolu vers le répertoire => app.use(express.static(path.join(__dirname, '/client/dist')));

- Envoie le fichier index.html situé dans le répertoire Situé dans le répertoire /client/dist en réponse à la requête => res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));

# render

1. web service

2. Sélectioner le dossier

3. Remplir

Name: basic-auth
Region: Frankfurt (EU Central)
Branch: main
Root Directory
Runtime: Node
Build Command: npm run build
Start Command: npm start

4. tester 5 min après le temps que tout soit disponible en ligne

