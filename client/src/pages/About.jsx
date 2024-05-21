import React from "react";

export default function About() {
  return (
    <div className="px-4 py-12 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold  mb-4 text-slate-800">
        A propos de cette App
      </h1>
      <p className="mb-4 text-slate-700">
        Suite à une mésaventure, j&apos;ai construis ce modèle d&apos;application
        avec un système d&apos;authentification. Après 2 mois de travail avec une
        application qui fonctionnait parfaitement en local et
        l&apos;impossibilité de la déployer, je me suis donc mis en quête
        d&apos;un starter.
      </p>
      <p className="mb-4 text-slate-700">
        Une application utilisant la pile MERN (MongoDB, Express.js, React-Vite,
        Node.js) avec Tailwind CSS pour le style qui permet aux utilisateurs de
        s&apos;inscrire, de se connecter et de se déconnecter, puis fournit
        également un accès aux routes protégées uniquement pour les utilisateurs
        authentifiés.
      </p>
      <p className="mb-4 text-slate-700">
        - Le front-end de l&apos;application est construit avec React et
        React-Router-Dom pour le routage côté client.
        <br></br>- Le back-end est construit avec Node.js et Express puis
        MongoDB pour la base de données noSQL.
        <br></br>- L&apos;authentification est implémentée en utilisant JSON Web
        Tokens (JWT) et des cookies.
      </p>
      <p className="mb-4 text-slate-700">
        Un point de départ pour construire des applications Web full-stack MERN 
        avec authentification. Déployez-la quand ce tutoriel est terminé, avant
        de continuer de construire votre projet afin d&apos;être sûr que tout
        fonctionne correctement.
      </p>
    </div>
  );
}
