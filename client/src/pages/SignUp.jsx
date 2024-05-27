import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visiblePasswordConfirm, setVisiblePasswordConfirm] = useState(false);

  const [passwordConfirm, setPasswordConfirm] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.id === "passwordConfirm") {
      setPasswordConfirm(e.target.value);
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
    //console.log(formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== passwordConfirm) {
      setError("Les mots de passe ne correspondent pas !");
      return;
    }

    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      //console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

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
        <div className="flex items-center">
          <input
            type={visiblePassword ? "text" : "password"}
            placeholder="Mot de passe"
            id="password"
            className="bg-slate-100 p-3 rounded-lg flex-grow"
            onChange={handleChange}
            autoComplete="new-password"
          />
          {visiblePassword ? (
            <FaEyeSlash
              onClick={() => setVisiblePassword(false)}
              className="mx-3"
            />
          ) : (
            <FaEye onClick={() => setVisiblePassword(true)} className="mx-3" />
          )}
        </div>
        <div className="flex items-center">
          <input
            type={visiblePasswordConfirm ? "text" : "password"}
            placeholder="Confirmation du mot de passe"
            id="passwordConfirm"
            className="bg-slate-100 p-3 rounded-lg flex-grow"
            onChange={handleChange}
            value={passwordConfirm}
            autoComplete="new-password"
          />
          {visiblePasswordConfirm ? (
            <FaEyeSlash
              onClick={() => setVisiblePasswordConfirm(false)}
              className="mx-3"
            />
          ) : (
            <FaEye
              onClick={() => setVisiblePasswordConfirm(true)}
              className="mx-3"
            />
          )}
        </div>
        {/* btns */}
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : " S'enregistrer"}
        </button>
        <button
          disabled={loading}
          className="inline-flex p-3 rounded-lg uppercase w-full items-center justify-center gap-2 border border-slate-700 bg-white hover:bg-slate-300 text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="h-[22px] w-[22px] "
          />
          {loading ? "Loading..." : " Continue avec Google"}
        </button>
      </form>
      {/* message si déjà inscrit */}
      <div className="flex gap-2 mt-5">
        <p>Vous avez déjà un compte ?</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Connexion</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">
        {error &&
          (typeof error === "string"
            ? error
            : "Le Pseudo ou l'email est déjà utilisé!")}
      </p>
    </div>
  );
}
