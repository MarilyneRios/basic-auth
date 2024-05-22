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
````
 <p className='text-red-700 mt-5'>{error && "Le Pseudo ou l'email est déjà utilisé!"}</p>

````

# SignUp ajout loading:

const [loading, setLoading] = useState(false);
````
try > setLoading(true);
catch (error) {
setLoading(false);
}
````
- ex avec un btn :
````
<button 
  disabled={loading} 
  className="">
    {loading ? 'Loading...' : " S'enregistrer"}
</button>
````

# SignUp ajout navigation:

````
import { Link, useNavigate } from "react-router-dom";

const navigate = useNavigate();

navigate('/sign-in');
`````
