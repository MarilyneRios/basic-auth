export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-slate-800 mb-6">
          Bienvenue sur cette application MERN (MongoDB, Express, React,
          Node.js) avec Tailwind.
        </h1>
        <p className="text-lg text-slate-700 leading-relaxed mb-8">
          Ceci est un modèle d&apos;application Web full-stack construite avec
          des fonctionnalités d&apos;authentification (JWT) qui peut vous servir de
          template (starter) afin de créer votre APP.
        </p>
        <p className="text-lg text-slate-700 leading-relaxed mb-8">
          Elle permet aux utilisateurs de s&apos;inscrire, de se connecter et de
          se déconnecter, et donne accès à itinéraires protégés uniquement pour
          les utilisateurs authentifiés.
        </p>
      
      </div>
    </div>
  );
}
