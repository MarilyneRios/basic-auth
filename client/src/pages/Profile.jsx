import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: "",
    passwordConfirm: "",
  });
  const fileRef = useRef(null);

  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visiblePasswordConfirm, setVisiblePasswordConfirm] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleDeleteAccount = () => {};

  const handleSignOut = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <input
          type='file'        
          accept='image/*'
          ref={fileRef}
          hidden
        />
        <img
          src={currentUser.profilePicture}
          alt="image de profil"
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
          onClick={() => fileRef.current.click()}
        />
        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Pseudo"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <div className="flex items-center">
          <input
            type={visiblePassword ? "text" : "password"}
            placeholder="Nouveau mot de passe"
            id="password"
            className="bg-slate-100 p-3 rounded-lg flex-grow"
            onChange={handleChange}
          />
          {visiblePassword ? (
            <FaEyeSlash
              onClick={() => setVisiblePassword(false)}
              className="mx-3 cursor-pointer"
            />
          ) : (
            <FaEye
              onClick={() => setVisiblePassword(true)}
              className="mx-3 cursor-pointer"
            />
          )}
        </div>
        <div className="flex items-center">
          <input
            type={visiblePasswordConfirm ? "text" : "password"}
            placeholder="Confirmation du nouveau mot de passe"
            id="passwordConfirm"
            className="bg-slate-100 p-3 rounded-lg flex-grow"
            onChange={handleChange}
            value={formData.passwordConfirm}
          />
          {visiblePasswordConfirm ? (
            <FaEyeSlash
              onClick={() => setVisiblePasswordConfirm(false)}
              className="mx-3 cursor-pointer"
            />
          ) : (
            <FaEye
              onClick={() => setVisiblePasswordConfirm(true)}
              className="mx-3 cursor-pointer"
            />
          )}
        </div>
        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          Mettre à jour
        </button>
      </form>
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
    </div>
  );
}
