import React from 'react'

export default function About() {
  return (
    <div className='px-4 py-12 max-w-2xl mx-auto'>
    <h1 className='text-3xl font-bold  mb-4 text-slate-800'>A propos de cette App</h1>
    <p className='mb-4 text-slate-700'>
    Suite à une mésaventure, j&apos;ai constuis ce modèle de connexion avec d&apos;authentification.
    Après 2 mois de travail avec une appliation qui fonctionnait parfaitement en local et l&apos;impossibilité de la 
    déployer, je me suis donc mis en quête d&apos;un starter.
    </p>
    <p className='mb-4 text-slate-700'>
    Ceci est une application utilisant la pile MERN 
    (MongoDB, Express, React - Vite, Node.js) avec Tailwind CSS pour le style
    et un système d&apos;authentification. Elle permet aux utilisateurs de s&apos;inscrire, de se connecter 
    et de se déconnecter, et fournit un accès aux routes protégées uniquement pour 
    les utilisateurs authentifiés.
    </p>
    <p className='mb-4 text-slate-700'>
    Le front-end de l&apos;application est construit avec React et utilise React Router 
    pour le routage côté client. 
    <br></br>
    Le back-end est construit avec Node.js et Express et utilise MongoDB comme base de données. 
    <br></br>
    L&apos;authentification est implémentée en utilisant des JSON Web Tokens (JWT).
    </p>
    <p className='mb-4 text-slate-700'>
    Cette application est conçue comme un point de départ pour construire 
    des applications web full-stack avec authentification en utilisant la pile MERN. 
    Déployer-la, avant de continuer de construire votre projet afin d&apos;être sûr que tout 
    fonctionne correctement.
    N&apos;hésitez pas à l&apos;utiliser comme modèle pour vos propres projets !
    </p>
  </div>
  )
}
