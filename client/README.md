# React + Vite

1. Installation Frontend

npm create vite@latest client

- Select a framework: » React
- Select a variant: » JavaScript + SWC

- cd client
- npm install
- npm run dev

2. https://tailwindcss.com/docs/guides/vite

- npm install -D tailwindcss postcss autoprefixer
- npx tailwindcss init -p

- tailwind.config.js :

```
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`
```

- index.css :

Suprrimer toutes les lignes et copier coller ceci :

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

3. App.jsx :

```
function App() {

  return (
    <>
     <div>App</div>
    </>
  )
}

export default App
```

4. index.html :`

```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/logoDevBlue.png" /> <!-- insérer son logo -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Basic Auth</title> <!-- titre de l' App-->
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

# Creation des pages

1. Créer un dossier pages dans src puis les fichiers suivantes :
   (rfc pour le React.js code snippets)
   About.js, Home.jsx, Profile.jsx, SignIn.jsx et SgnUp.jsx

2. npm i react-router-dom

pour rn savoir plus : https://www.npmjs.com/package/react-router-dom

Un routage déclaratif , une sorte de plan pour les applications web React.

3. App.jsx

```
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';


function App() {

  return (

     <BrowserRouter>
      <Routes>
      <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
     </BrowserRouter>

  )
}

export default App

```

pour tester les routes, dans le navigateur :

http://localhost:5173/about
http://localhost:5173/profile ect.

# Header

1. Créer un dossier components dans src puis le fichier Header.jsx

2. Ajouter le Header dans App.jsx pour le voir sur toutes les pages.

```
import Header from './components/Header';

function App() {

  return (

     <BrowserRouter>
     <Header/>
      <Routes>
         <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
     </BrowserRouter>

  )
}

export default App
```

3. Header.jsx :

```
import { Link } from 'react-router-dom';
import Logo from '../assets/logoDevBlue.png';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='bg-slate-200  w-full  border-b border-gray-200 '>
      <div className='flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto p-3'>
        <div className='flex justify-between w-full md:w-auto my-1'>
          <Link to='/' className='flex flex-row items-center'>
            <img src={Logo} className="h-8 rounded mr-3" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Basic Auth</span>
          </Link>
          <div className="md:hidden flex space-x-3 rtl:space-x-reverse">
            <Link to='/sign-in' className='ml-4'>
              <button type="button" className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Connexion</button>
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
            </button>
          </div>
        </div>

        <div className={` ${isOpen ? 'block' : 'hidden'} w-full md:flex md:items-center md:justify-center`} id="navbar-default">
          <ul className='flex gap-4 flex-col md:flex-row md:justify-center md:w-full'>
            <Link to='/' className='text-black hover:text-blue-800'>
              <li>Acceuil</li>
            </Link>
            <Link to='/about' className='text-black hover:text-blue-800'>
              <li>A propos</li>
            </Link>
            <Link to='/profile' className='text-black hover:text-blue-800'>
              <li>Profil</li>
            </Link>
          </ul>
        </div>
        <div className="hidden md:flex md:items-center md:ml-auto">
          <Link to='/sign-in'>
            <button type="button" className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Connexion</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
```

# SignUp.jsx design:

https://tailwindflex.com/@laurits/sign-up-with-google-button

Pour Google btn, attention de bien adapter pour Vite-React (className par exemple) et finaliser le style.

- La div principale : className="p-3 max-w-lg mx-auto"
- Le titre : className="text-3xl text-center font-semibold my-7"
- Le formulaire (form): className="flex flex-col gap-4"
  gap-4 => un espace de 4 unités entre chaque élément du formulaire.

- les inputs : className="bg-slate-100 p-3 rounded-lg"

- les btns :
  > uppercase transforme le texte en majuscules.

> hover:opacity-95 change l’opacité à 95% lorsque le bouton est survolé.

> disabled:opacity-80 change l’opacité à 80% lorsque le bouton est désactivé.

> hover:bg-slate-300 change la couleur de fond à slate-300 lorsque le bouton est survolé.

- messages : className="flex gap-2 mt-5"
  gap-2 = un espace de 2 unités entre les éléments.

# SignUp fonctions :

1. Un formulaire avec un champ d’entrée mis à jour avec la nouvelle valeur.

import { useState } from 'react'; = un Hook qui vous permet d’ajouter un état local .

Une variable d’état : const [formData, setFormData] = useState({});

Une fonction qui se déclenche à chaque fois qu’un utilisateur tape dans le champ d’entrée:

```
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };
```

e.target.id = l’identifiant du champ
e.target.value = la valeur saisie

```
        <input
          type="text"
          placeholder="Username"
          id="Pseudo"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
```

onChange={handleChange} = un écouteur d’événements

console.log(formData); vous pouvez voir le résultat dans la console

2.

- proxy de vite:

```
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
  plugins: [react()],
});
```

En local on est en http et https donc secure: false,

- le formulaire

```
<form onSubmit={handleSubmit} className="flex flex-col gap-4">
```

- la fonction :

```
const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
      console.log(data);
}
```

- test et vérifier

dans la console.log : { message: 'User created successfully' }

dans mongoDB vérifier que le nouveau user est créé.

# SignUp ajout des Errors:

const [error, setError] = useState(false);

try > setError(false);
logique d'envoie
setLoading(false);
if (data.success === false) {
setError(true);
return;
}
catch (error) {
setError(true);
}

```
 <p className='text-red-700 mt-5'>{error && "Le Pseudo ou l'email est déjà utilisé!"}</p>

```

# SignUp ajout loading:

const [loading, setLoading] = useState(false);

```
try > setLoading(true);
catch (error) {
setLoading(false);
}
```

- ex avec un btn :

```
<button
  disabled={loading}
  className="">
    {loading ? 'Loading...' : " S'enregistrer"}
</button>
```

# SignUp ajout navigation:

import { Link, useNavigate } from "react-router-dom";

const navigate = useNavigate();

navigate('/sign-in');

# mot de passe visible et confirmation password

1. oeil
   https://react-icons.github.io/react-icons/
   npm install react-icons --save

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

```
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visiblePasswordConfirm, setVisiblePasswordConfirm] = useState(false);
```

```
<div className="flex items-center">
<input
  type={visiblePassword ? "text" : "password"}
  placeholder="Mot de passe"
  id="password"
  className="bg-slate-100 p-3 rounded-lg flex-grow"
  onChange={handleChange}
/>
{visiblePassword ? (
  <FaEyeSlash onClick={() => setVisiblePassword(false)} className="mx-3" />
) : (
  <FaEye onClick={() => setVisiblePassword(true)} className="mx-3" />
)}
</div>
```

2. passwordConfirm

const [passwordConfirm, setPasswordConfirm] = useState("");

```
  const handleChange = (e) => {
  if (e.target.id === "passwordConfirm") {
    setPasswordConfirm(e.target.value);
  } else {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }
  };
```

Dans handleSubmit :

```
    if (formData.password !== passwordConfirm) {
      setError("Les mots de passe ne correspondent pas !");
      return;
    }
```

Dans l'input passwordConfirm :

```
<input
  type={visiblePasswordConfirm ? "text" : "password"}
  placeholder="Confirmation du mot de passe"
  id="passwordConfirm"
  className="bg-slate-100 p-3 rounded-lg flex-grow"
  onChange={handleChange}
  value={passwordConfirm}
/>
```

Dans la phrase d'error :

```
<p className="text-red-700 mt-5">
  {error && (typeof error === "string" ? error : "Le Pseudo ou l'email est déjà utilisé!")}
</p>
```

# signIn design et fcts

copie le signUp et garder seuelement ce qui nous sera utile et apporter quelques modifications

par ex :

```
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [visiblePassword, setVisiblePassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
```

## redux toolkt

Redux est une bibliothèque JavaScript populaire pour la gestion de l’état de l’application.

https://redux-toolkit.js.org/

npm install @reduxjs/toolkit
npm install react-redux

1. dans src créer un dossier redux puis un fichier store.js

2. store.js

https://redux-toolkit.js.org/tutorials/overview

```
import {configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {},
  middleware: (getDefaultMiddleware) =>  getDefaultMiddleware({
      serializableCheck: false,
    }),
});
```

3. main.js

```
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

```

Provider rend le magasin Redux disponible pour tous les composants de l'application. C'est pour cela qu'il enveloppe l'application.

4. créer un dossier user dans redux puis userSlice.js

**initialState** (L'état initial) contient :

**currentUser** : L'utilisateur actuel, initialement null.
**loading** : Un indicateur de chargement, initialement false.
**error**: Un indicateur d'erreur, initialement false.
/////////////////////////////////////////////////////
**reducers : Un objet contenant des fonctions de reducers pour manipuler l'état.**

**signInStart** : Déclenche l'état de chargement lors du début d'une tentative de connexion.

**signInSuccess** : Met à jour currentUser avec l'utilisateur connecté et réinitialise les indicateurs de chargement et d'erreur.

**signInFailure** : Met à jour l'indicateur d'erreur avec l'erreur reçue et réinitialise l'indicateur de chargement.

5.  Ajout reducer dans store.js

```
import {configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';

export const store = configureStore({
 reducer: {user: userReducer },
 middleware: (getDefaultMiddleware) =>  getDefaultMiddleware({
     serializableCheck: false,
   }),
});
```

6. SignIn.jsx ajout des reducers

```
import {  signInStart,signInSuccess, signInFailure,} from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
```

useSelector pour obtenir loading et error à partir de l'état global

```
  //const [error, setError] = useState(false);
  //const [loading, setLoading] = useState(false);
  const { loading, error } = useSelector((state) => state.user);
```

```
 const dispatch = useDispatch();
```

```
const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //setLoading(true);
      //setError(false);
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      //setLoading(false);
      //dispatch(signInFailure(data));//
      if (data.success === false) {
       // setError(true);
       dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      //setLoading(false);
      //setError(true);
      dispatch(signInFailure(error));
    }
  };
```

## Redux persist

https://redux-toolkit.js.org/rtk-query/usage/persistence-and-rehydration

Afin d'éviter de perdre la session après un raffraichissement.

1. install
   npm i redux-persist

2. store.js

> On a plusieurs reducers donc il faut les combiner.

```
import { configureStore, combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({ user: userReducer });

```

> persiste reducer

```
import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};
```

> Définir le persistConfig

```
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};
```

> persistReducer(persistConfig, rootReducer)

> exporter le persistor

```
import { persistReducer, persistStore } from 'redux-persist';

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
```

3.  main.jsx

```
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store, persistor } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
 <Provider store={store}>
   <PersistGate persistor={persistor} loading={null}>
     <React.StrictMode>
       <App />
     </React.StrictMode>
   </PersistGate>
 </Provider>
);
```

Maintenant, si on raffraichit la page, le connexion est tjrs active.

ps: pour verifier le local storage : dans l'onglet application > storag > local storage > http://....

key = persist:root
value = "user":"{\"currentUser\":{\"\_id\":\.....}}

# OAuth Google

## Dans components, créer OAuth.jsx

1. rfc
   puis copier le btn google de SignIn.
   et le remplacer par <OAuth>

```
export default function OAuth() {
  return (
    <div>
      <button
        className="inline-flex p-3 rounded-lg uppercase w-full items-center justify-center gap-2 border border-slate-700 bg-white hover:bg-slate-300 text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="h-[22px] w-[22px] "
        />
        {label}
      </button>
    </div>
  );
}

```

2. SignIn

```
import OAuth from "../components/OAuth";

 <OAuth disabled={loading}/>
 {loading ? "Loading..." : " Continue avec Google"}
```

3. Prépa du OAuth.jsx

```
export default function OAuth({label}) {

    const handleGoogleClick = async () => {
        try{ /* empty */

        }
        catch (error) {
            console.log('Vous ne pouvez pas vous connectez avec google', error);
          }
    };

  return (
    <div>
      <button
        type='button'
        onClick={handleGoogleClick}
        className="inline-flex p-3 rounded-lg uppercase w-full items-center justify-center gap-2 border border-slate-700 bg-white hover:bg-slate-300 text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="h-[22px] w-[22px] "
        />
         {label}
      </button>
    </div>
  );
}
```

4. firebase

https://firebase.google.com/docs/auth?hl=fr

Un fois inscrit, cliquez sur "Go to Console"

> create a project

> Ecrire le nom du projet : **basic-auth** pour moi

> **désactiver** Enable Google Analytics for this project (projet starter pas besoin)

> Your Firebase project is ready , **continue**

> web app donc on clique sur **</>**

> 1. Register app
>    App nickname : **basic-auth**
>    cliquer sur **Register **app\*\*

> 2.installer firebase côté CLIENT:
> npm install firebase

> 3.  Créer firebase.js dans src

```
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "gdffgdgdrgeryrgrgesgdx",
  authDomain: "basic-auth-fesfesfscwcsfdesfges",
  projectId: "basic-auth-sdgdsgvsdvsvs",
  storageBucket: "basic-auth-vdsvsdvsdvsdgvsrgsegse",
  messagingSenderId: "vsvsdgrgrdgrvfdwvw",
  appId: "vsevrvrdvxvxdvzswvwrwgzsg"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
```

> 4. sécuriser les données sensible dans un fichier .env et un fichier .gitignore à la racine du client

Pour firebase.js

```
// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGERIESENDERID,
    appId: import.meta.env.VITE_FIREBASE_APPID
};

// petit changement ici
// Initialize Firebase
let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApps()[0];
}
export { app };

```

Dans .env :

```
VITE_FIREBASE_APIKEY=""
VITE_FIREBASE_AUTHDOMAIN="basic-auth"
VITE_FIREBASE_PROJECTID="basic-auth-"
VITE_FIREBASE_STORAGEBUCKET="basic-auth-",
VITE_FIREBASE_MESSAGERIESENDERID="",
VITE_FIREBASE_APPID=""
```

> cliquer sur continue to console dans firebase

### paramétrer la console de firebase google :

> Build
> Authentification
> Get started
> choisir Google
> cliquer sur Enable
> Public-facing name for project : **basic-auth** (le nom sera dans un pop windows)
> et sélectionner **votre email** en dessous
> Puis **Save**

6. Dans OAuth.jsx

> Créez une instance de l'objet fournisseur Google

Google Auth Provider:

```
import { GoogleAuthProvider,  } from 'firebase/auth';

//----------

   const handleGoogleClick = async () => {
       try{
           const provider = new GoogleAuthProvider();

       }
       catch (error) {
           console.log('Vous ne pouvez pas vous connectez avec google', error);
         }
   };
```

https://firebase.google.com/docs/auth/web/google-signin?hl=fr

> Pour vous connecter avec une fenêtre pop-up, appelez signInWithPopup :

> L’instance d’authentification Firebase est obtenue en utilisant la fonction getAuth.

```
const auth = getAuth(app);
```

> signInWithPopup : Cette fonction ouvre une fenêtre popup pour que l’utilisateur puisse se connecter avec Google.

7. tester

```
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';

//....

    const handleGoogleClick = async () => {
        try{
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);
            console.log(result)
        }
        catch (error) {
            console.log('Vous ne pouvez pas vous connectez avec google', error);
          }
    };
```

On obtient :

```
UserCredentialImpl {user: _UserImpl, providerId: 'google.com', _tokenResponse: {…}, operationType: 'signIn'}
```

ect.

Dans les metas données on retrouve notre photo :
https://lh3.googleusercontent.com/a/ACg8ocIJCnVGBWZHi-_9JPK2pU6Abyw01hqQ-B7UgU9xYURVTZ_2ovk=s96-c"

8. Enregistrer les données de google dans la data base

```
const res = await fetch('/api/auth/google', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: result.user.displayName,
      email: result.user.email,
      photo: result.user.photoURL,
    }),
});
```

9. Puis aller dans le dossier api > routes > authRoutes.js :

`````
import { signin, signup, google, signout } from '../

````
router.post('/google', google);
`````

10. Récupération des données de la réponse :

```
const data = await res.json();
```

11. Enregistrement des données de l’utilisateur :

```
dispatch(signInSuccess(data));

```

# header logique pour connexion ou image

Ici, j'utilise une expression conditionnelle (ou ternaire)
si le currentUser est connecté: alors l'image apparaît sinon c'est le bouton qui apparaît .

```
  {currentUser ? (
    <img
       src={currentUser.profilePicture}
       alt="profile"
       className="h-8 w-8 rounded-full object-cover"
       onError={(e) => {
         e.target.onerror = null;
         e.target.src = "defaultProfilePicture.png";
        }}
          />
        ) : (
          <div className="hidden md:flex md:items-center md:ml-auto">
            <Link to="/sign-in">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Connexion
              </button>
            </Link>
          </div>
   )}
```

# PrivateRoute

1. Dans components créer le fichier PirvateRoute.jsx

```
import {useSelector} from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

export default function PrivateRoute() {
    const {currentUser} = useSelector(state => state.user)
  return currentUser ? <Outlet/> : <Navigate to='/sign-in'/>
}
```

Outlet est utilisé pour les routes enfants (des sous-routes) sont insérés.

si un user est connecté, alors les routes enfants. Sinon, il redirige vers la page de connexion

2. App.jsx

```
import PrivateRoute from './components/PrivateRoute';

  <Route element={<PrivateRoute />}>
     <Route path='/profile' element={<Profile />} />
  </Route>
```

**<PrivateRoute/>** enveloppe les routes qui doivent être protégées.

Donc, si un utilisateur est connecté, il peut accéder à ces routes. Sinon, il sera redirigé vers la page de connexion.

# Ajout du btn inscription

```
 <div className="hidden md:flex md:items-center md:ml-auto">
   <Link to="/sign-in">
    <button
      type="button"
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
       Connexion
    </button>
    </Link>
     <Link to="/sign-up">
       <button
         type="button"
           className="m-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
       >
          Inscription
       </button>
     </Link>
  </div>
```

# Réglage en mode petit écran: btn ou img

```

```

Explications:

1.  État isOpen (false):
    Contrôle l'affichage du menu de navigation en mode mobile.

2.  Accès currentUser :
    **useSelector** => état actuel du store Redux et currentUser est null si aucun utilisateur n'est connecté.

3.  Structure principale :
    La structure est divisée en 3 parties :

        - Logo et boutons de navigation pour **petits écrans** : Contient le logo, les boutons "Connexion" et "Inscription" pour les petits écrans, ainsi que le bouton toggle pour ouvrir/fermer le menu.

        - Liens de navigation : Une liste de liens de navigation (Accueil, À propos) qui s'affiche en fonction de l'état isOpen en mode mobile.

        - Boutons de connexion/inscription ou image de profil : Affiche soit les boutons de connexion et d'inscription si le user  n'est pas connecté, soit l'image de profil si le user est connecté.

4.  Comportement adaptatif :

    - En mode mobile (défini par les classes md:hidden et md:flex), le menu de navigation et les boutons changent de disposition.

    - Le bouton toggle contrôle l'affichage du menu en mode mobile en modifiant l'état isOpen.

# Profile.jsx style ux

Copier une partie du code de SignUp.jsx et pporter quelques modifications.

```
const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: "",
    passwordConfirm: "",
  });
```

```
  const handleDeleteAccount = () => {};

  const handleSignOut = () => {};
```

```
  <img
     src={currentUser.profilePicture}
     alt="image de profil"
     className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
  />

```

Pour récupérer les datas dans les inputs :

```
defaultValue={currentUser.username}
```

Ajouter de 2 fonctions :

```
  <div className="flex justify-between mt-5">
    <span
       onClick={handleDeleteAccount}
        className="text-red-700 cursor-pointer"
    >
       Delete Account
    </span>

    <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign out
     </span>
  </div>
```

# Les fonctions pour mettre à jour les images avec firebase

1. input file

```
<input
   type='file'
   accept='image/*'
/>
```

2. Cliquer sur l'image afin de sélectionner un image

> Créer une référence de l'input.

```
import { useState, useRef } from "react";
```

```
 const fileRef = useRef(null);
```

```
 ref={fileRef}
```

> Dans img, afin d'accéder au téléchargement:

```
onClick={() => fileRef.current.click()}
```

> tester le onclick

> cacher le input file:

```
 hidden
```

3. firebase storage

https://firebase.google.com/docs/storage?hl=fr

> build

> Storage

> Get started

> Start in production mode
> Va falloir changer : allow read, write: if false;

> next

> choisir un cloud storage location proche de nous + Done

> Rules :

```
rules_version = '2';

// Craft rules based on data in your Firestore database
// allow write: if firestore.get(
//    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read;
      allow write: if
      request.resource.size < 2 * 1024 * 1024 &&
      request.resource.contentType.matches('image/.*')
    }
  }
}
```

**allow read;** : Cette règle permet à tous les users de lire tous les fichiers.

**allow write: if request.resource.size < 2 _ 1024 _ 1024 && request.resource.contentType.matches('image/.\*')** : Cette règle permet aux users d’écrire (télécharger) des fichiers si deux conditions sont validées :

- La taille du fichier est inférieure à 2 Mo (2 _ 1024 _ 1024 octets).
- Le type de contenu du fichier correspond à une image.

4. Récupérer les images dans notre App

```
const [image, setImage] = useState(undefined);
```

```
 <input
    type='file'
    accept='image/*'
    ref={fileRef}
    hidden
    onChange={(e) => setImage(e.target.files[0])}
  />
```

> on ajoute un console.log(image); après const [image, setImage] = useState(undefined);

```
 File {
    name: 'Capture d\'écran 2023-06-12 070848.png',
    lastModified: 1686546527435,
    lastModifiedDate: new Date('2023-06-12T05:08:47.000Z'),
    webkitRelativePath: '',
    size: 148829,
    type: 'image/png'
  }
```

> useEffect pour upload dans notre dataBase et notre storage

- Si on a une image alors la fonction handleFileUpload est appelée avec image comme argument.

- Si pas d'image alors rien ne se passe.

```
 useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
```

> // Télécharger d’une image vers Firebase Storage

1. test la fonction

```
const handleFileUpload = async (image) => {
console.log(image);
};
```

```
 File {
    name: 'Capture d\'écran 2023-06-12 073044.png',
    lastModified: 1686547843934,
    lastModifiedDate: new Date('2023-06-12T05:30:43.000Z'),
    webkitRelativePath: '',
    size: 79187,
    type: 'image/png'
}
```

2.

```
import {  getDownloadURL,  getStorage,  ref,  uploadBytesResumable,} from 'firebase/storage';
//-----
    const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: "",
    passwordConfirm: "",
    profilePicture: currentUser.profilePicture,
  });
//-----
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
//-----
  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

//-----
  <img
    src={formData.profilePicture || currentUser.profilePicture}
    alt="image de profil"
    className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
    onClick={() => fileRef.current.click()}
  />
```

> Message si pbm image :

```
  // Vérifier le fichier avant de le télécharger
  const validateFile = (file) => {
    if (!file.type.startsWith('image/')) {
      setImageError("Le fichier doit être une image");
      return false;
    }
    if (file.size > 2 * 1024 * 1024) { // 2 MB
      setImageError("L'image doit être inférieure à 2 Mo");
      return false;
    }
    setImageError(""); // Réinitialiser les erreurs
    return true;
  };
```

```
 {imageError && <p className="text-red-500 text-center">{imageError}</p>}

```

# Update profile fonctions

## handleChange

```
    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);
```

on récupère les infos et on les traquent avec le console.log

## handleSubmit

> le squelette

- fetch pour envoyer une requête (POST) HTTP au serveur vers l’URL /api/user/update/${currentUser.\_id}.

- Le contenu est en format JSON (Content-Type': 'application/json',).

- Les données du formulaire (stockées dans formData) sont converties en JSON et envoyées dans le corps de la requête (body: JSON.stringify(formData)).

- La réponse du serveur est ensuite convertie en objet JavaScript (const data = await res.json();).

- attraper les error ( catch (error) { })

> Redux (gestion des états) > userSlice

on a déjà :

- L’état initial contient trois propriétés :

**currentUser** qui Stocke le user actuellement connecté (initialisé à null).
**loading** si une opération est en cours (initialisé à false).
**error** s’il y a eu une erreur (initialisé à false).

- Trois réducteurs (actions) sont définis :

**signInStart** qui met à jour l’indicateur de chargement et réinitialise l’erreur.
**signInSuccess** qui met à jour le user avec l’indicateur de chargement et réinitialise l’erreur.
**signInFailure** qui met à jour l’indicateur de chargement et définit l’erreur avec le message d’erreur fourni.

```
   updateUserStart: (state) => {
        state.loading = true;
      },
      updateUserSuccess: (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
        state.error = false;
      },
      updateUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
  //------

  export const {
    signInStart,
    signInSuccess,
    signInFailure,
    updateUserFailure,
    updateUserStart,
    updateUserSuccess,
  } = userSlice.actions;
```

**updateUserStart** :
Au début du processus de mise à jour du user.
Il met à jour l’indicateur loading à true, indiquant que l’opération est en cours.

**updateUserSuccess** :
Quand la mise à jour du user réussit.
Il met à jour l’état currentUser avec les données du user fournies par action.payload.
Il réinitialise loading à false.
Il réinitialise error à false.

**updateUserFailure** :
Quand la mise à jour de du user échoue.
Il met à jour loading à false.
Il définit error avec le message d’erreur fourni dans action.payload.

> Utilisation des nouveaux états dans Profile

```
import { useDispatch } from 'react-redux';
import {updateUserStart, updateUserSuccess, updateUserFailure,} from '../redux/user/userSlice';

export default function Profile() {
  const dispatch = useDispatch();
//------
const handleSubmit = async (e) => {
  e.preventDefault(); // empêche rechargement de la page
  try {
    dispatch(updateUserStart()); // indiquer le début du processus de mise à jour
    const res = await fetch(`/api/user/update/${currentUser._id}`, {
      method: "POST", //méthode HTTP POST pour envoyer des données au serveur
      headers: {
        "Content-Type": "application/json", // le type de contenu comme JSON
      },
      body: JSON.stringify(formData), // convertit l'objet formData en chaîne JSON et l'envoie dans le corps de la requête
    });
    const data = await res.json(); // attend la réponse du serveur et la convertit en objet JavaScript
    if (data.success === false) {
      dispatch(updateUserFailure(data)); //  en cas d'échec de la mise à jour
      return;
    }
    dispatch(updateUserSuccess(data)); //  en cas de mise à jour réussie
    setUpdateSuccess(true); //  indique une mise à jour réussie
  } catch (error) {
    dispatch(updateUserFailure(error)); //  en cas d'échec de la mise à jour en raison d'une erreur
  }
};

  //-----------

}

```

> Configurer le cookie SameSite

Dans verifyUser.js

```
export const setTokenCookie = (res, token) => {
    res.cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'None', // Modifier ici pour SameSite=None
    });
};
```

## Indicateur de chargement

```
  const { currentUser, loading, error  } = useSelector((state) => state.user);

```

et à la fin du code

```
 <p className='text-red-700 mt-5'>{error && 'Quelque chose ne pas !'}</p>
 <p className='text-green-700 mt-5'>
    {updateSuccess && 'Les modifications sont mise à jour avec succès !'}
  </p>
```

## confirmation password

```
  const [localError, setLocalError] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
```

```
 const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirm) {
      setLocalError("Les mots de passe ne correspondent pas !");
      return;
    }
 //----
 }
```

```
  <p className="text-red-700 mt-5">
    {localError &&
      (typeof error === "string"
       ? error
      : "Les mots de passe ne correspondent pas !")}
  </p>
```

# Delete fct

## Profile.jsx : handleDeleteAccount

```
const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

```

- dispatch(deleteUserStart()); => la suppression de l'utilisateur a commencé (utile pour afficher un indicateur de chargement).

- Une requête HTTP DELETE est effectuée vers l'endpoint /api/user/delete/${currentUser.\_id}, où ${currentUser.\_id} qui demande au serveur de supprimer l'utilisateur correspondant.

- la réponse

```
// 1. convertie en JSON
const data = await res.json();
// 2. indique l'échec de la suppression avec les détails de l'erreur
if (data.success === false) {
 dispatch(deleteUserFailure(data));
 return;
}
// 3. indique la réussite de la suppression
dispatch(deleteUserSuccess(data));
```

## redux > user > userSlice.js

```
   deleteUserStart: (state) => {
        state.loading = true;
      },
      deleteUserSuccess: (state) => {
        state.currentUser = null;
        state.loading = false;
        state.error = false;
      },
      deleteUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },

```

**deleteUserStart** : Déclenché au début de la tentative de suppression, met loading à true.

**deleteUserSuccess** : Déclenché à la réussite de la suppression, réinitialise currentUser à null, et réinitialise loading et error.

**deleteUserFailure** : Déclenché en cas d'échec de la suppression, met loading à false et met à jour error.

# signout fct

## Profile

```
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} from "../redux/user/userSlice";
//-------
 const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut())
    } catch (error) {
      console.log(error);
    }
  };
```

## redux > user > userSlice.js

```
    signOut: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },

 //------

   export const {
    signInStart,
    signInSuccess,
    signInFailure,
    updateUserFailure,
    updateUserStart,
    updateUserSuccess,
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    signOut,
  } = userSlice.actions;

```

## header

```
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from "../redux/user/userSlice"; // Importer l'action de déconnexion
import { FaSignOutAlt } from 'react-icons/fa';
```

```
const dispatch = useDispatch();

const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };
```

```
{currentUser && (
  <>
    <Link to="/profile" className="text-black hover:text-blue-800">
     <img
       src={currentUser.profilePicture}
       alt="profile"
       className="h-10 w-10 rounded-full object-cover"
       onError={(e) => {
         e.target.onerror = null;
         e.target.src = "defaultProfilePicture.png";
       }}
      />
    </Link>
      <FaSignOutAlt
        onClick={handleSignOut}
        className="text-red-700 cursor-pointer ml-4"
        title="Déconnexion"
        size={25}
      />
  </>
)}
//------
{currentUser ? (
  <>
    <Link to="/profile" className="text-black hover:text-blue-800">
    <img
       src={currentUser.profilePicture}
       alt="profile"
       className="h-8 w-8 rounded-full object-cover"
       onError={(e) => {
        e.target.onerror = null;
        e.target.src = "defaultProfilePicture.png";
      }}
    />
    </Link>
    <FaSignOutAlt
       onClick={handleSignOut}
       className="text-red-700 cursor-pointer ml-4"
       title="Déconnexion"
       size={25}
       />
 </>
)}
```
