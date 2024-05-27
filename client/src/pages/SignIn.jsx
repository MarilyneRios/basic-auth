import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import {  signInStart,signInSuccess, signInFailure,} from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  //const [error, setError] = useState(false);
  //const [loading, setLoading] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);

  const { loading, error } = useSelector((state) => state.user);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

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
       dispatch(signInFailure(data.message));
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

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Connexion</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : " Se Connecter"}
        </button>
          <OAuth disabled={loading} label={"Continue avec Google"}/>
          {loading ? "Loading..." : " Continue avec Google"}
      </form>
      <div className="flex gap-2 mt-5">
        <p>Avez-vous un compte ?</p>
        <Link to="/sign-up">
          <span className="text-blue-500">Iscription</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">
        {error &&
          (typeof error === "string"
            ? error
            : "Quelque chose ne fonctionne pas!")}
      </p>
    </div>
  );
}
