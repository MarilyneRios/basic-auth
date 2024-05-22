import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Inscription</h1>
       {/* le formulaire */}
      <form className="flex flex-col gap-4">
       {/* imput */}
        <input
          type="text"
          placeholder="Username"
          id="Pseudo"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          id="Mot de passe"
          className="bg-slate-100 p-3 rounded-lg"
        />
        {/* btns */}
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          S&apos;enregistrer
        </button>
        <button className="inline-flex p-3 rounded-lg uppercase w-full items-center justify-center gap-2 border border-slate-700 bg-white hover:bg-slate-300 text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="h-[22px] w-[22px] "
          />
          Continue avec Google
        </button>
      </form>
       {/* message si déjà inscrit */}
      <div className="flex gap-2 mt-5">
        <p>Vous avez déjà un compte ?</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Connexion</span>
        </Link>
      </div>
    </div>
  );
}
