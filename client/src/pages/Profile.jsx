import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/user/userSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const { currentUser, loading, error  } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: "",
    passwordConfirm: "",
    profilePicture: currentUser.profilePicture,
  });
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visiblePasswordConfirm, setVisiblePasswordConfirm] = useState(false);
  
  const [localError, setLocalError] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // Vérifier le fichier avant de le télécharger
  const validateFile = (file) => {
    if (!file.type.startsWith("image/")) {
      setImageError("Le fichier doit être une image");
      return false;
    }
    if (file.size > 2 * 1024 * 1024) {
      // 2 MB
      setImageError("L'image doit être inférieure à 2 Mo");
      return false;
    }
    setImageError(""); // Réinitialiser les erreurs
    return true;
  };

  // Télécharger l'image vers Firebase Storage
  useEffect(() => {
    if (image && validateFile(image)) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        console.error(error);
        setImageError("Erreur lors du téléchargement de l'image");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setFormData((prevData) => ({
              ...prevData,
              profilePicture: downloadURL,
            }));
            setUpdateSuccess(true);
            setImagePercent(100);
          })
          .catch((error) => {
            console.error(error);
            setImageError(
              "Erreur lors de l'obtention de l'URL de téléchargement"
            );
          });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setLocalError("");
  };
  //console.log(formData);

  const handleDeleteAccount = () => {};

  const handleSignOut = () => {};

 // envoie form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirm) {
      setLocalError("Les mots de passe ne correspondent pas !");
      return;
    }
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="file"
          accept="image/*"
          ref={fileRef}
          hidden
          onChange={(e) => {
            const file = e.target.files[0];
            if (validateFile(file)) {
              setImagePercent(0);
              setImage(file);
            }
          }}
        />
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt="image de profil"
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
          onClick={() => fileRef.current.click()}
        />

        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-700">{imageError}</span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-slate-700">{`Téléchargement: ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className="text-green-700">
              Image téléchargée avec succès
            </span>
          ) : (
            ""
          )}
        </p>

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

        <p className="text-red-700 mt-5">
          {localError &&
            (typeof error === "string"
              ? error
              : "Les mots de passe ne correspondent pas !")}
        </p>

        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          Mettre à jour
        </button>
        {updateSuccess && (
          <p className="text-green-500 text-center">Mise à jour réussie!</p>
        )}
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
      <p className='text-red-700 mt-5'>{error && 'Quelque chose ne pas !'}</p>
      <p className='text-green-700 mt-5'>
        {updateSuccess && 'Les modifications sont mise à jour avec succès !'}
      </p>
    </div>
  );
}
