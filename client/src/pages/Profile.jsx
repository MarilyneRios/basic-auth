import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {  getDownloadURL,  getStorage,  ref,  uploadBytesResumable,} from 'firebase/storage';
import { app } from '../firebase';


export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: "",
    passwordConfirm: "",
    profilePicture: currentUser.profilePicture,
  });
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined); // au départ pas d'image => undefined
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visiblePasswordConfirm, setVisiblePasswordConfirm] = useState(false);

  //Si image alors handleFileUpload ()
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  // Télécharger d’une image vers Firebase Storage
  const handleFileUpload = async (image) => {
    //console.log(image);
   
    const storage = getStorage(app);
    //image unique = new Date().getTime().
    const fileName = new Date().getTime() + image.name; 
    // crée une référence (un emplacement) dans Firebase où elle sera stockée.
    const storageRef = ref(storage, fileName); 
    // le téléchargement de l’image vers Firebase Storage.
    const uploadTask = uploadBytesResumable(storageRef, image); 
    // Gestionnaires d’événements pour suivre la progression du téléchargement et gérer les erreurs.
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          //console.log('Uplaod is ' + progress + '%')
          //montrer la progression sur l'image
          setImagePercent(Math.round(progress));
      },
      (error) => {
        console.error(error);
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

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
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={formData.profilePicture || currentUser.profilePicture}
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
            autoComplete="new-password"
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
            autoComplete="new-password"
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
