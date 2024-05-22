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
````
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
````

- index.css :

Suprrimer toutes les lignes et copier coller ceci :

````
@tailwind base;
@tailwind components;
@tailwind utilities;
````

3. App.jsx :
````
function App() {

  return (
    <>
     <div>App</div>
    </>
  )
}

export default App
````

4. index.html :`
````
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
````
# Creation des pages

1. Créer un dossier pages dans src puis les fichiers suivantes :
(rfc pour le React.js code snippets)
About.js, Home.jsx, Profile.jsx, SignIn.jsx et SgnUp.jsx

2. npm i react-router-dom

pour rn savoir plus  : https://www.npmjs.com/package/react-router-dom

Un routage déclaratif , une sorte de plan pour les applications web React.

3. App.jsx 

````
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

````
pour tester les routes, dans le navigateur :

http://localhost:5173/about
http://localhost:5173/profile ect.

# Header

1. Créer un dossier components dans src puis le fichier Header.jsx

2. Ajouter le Header dans App.jsx pour le voir sur toutes les pages. 
````
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
````
3. Header.jsx :

````
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
````

# SignUp.jsx  design:

https://tailwindflex.com/@laurits/sign-up-with-google-button


Pour Google btn, attention de bien adapter pour Vite-React (className par exemple) 