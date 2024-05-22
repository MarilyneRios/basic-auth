import { useState } from 'react';
import { Link } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    //console.log(formData);
  };
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
    //console.log(data);
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Inscription</h1>
       {/* le formulaire */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
       {/* imput */}
        <input
          type="text"
          placeholder="Pseudo"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
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
