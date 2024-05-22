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
const expiryDate = new Date(Date.now() + 3600000); // 1 heure
````
````
.cookie('access_token', token, { httpOnly: true, expires: expiryDate })
````

- test
Dans le header de la response:
il y a une date pour le cookie :

Wed, 22 May 2024 13:35:53 GMT