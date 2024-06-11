import { Link } from "react-router-dom";
import Logo from "../assets/logoDevBlue.png";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../redux/user/userSlice";
import { FaSignOutAlt } from "react-icons/fa";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout");
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-slate-200 w-full border-b border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto p-3">
        <div className="flex justify-between w-full md:w-auto my-1">
          <Link to="/" className="flex flex-row items-center">
            <img src={Logo} className="h-8 rounded mr-3" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Basic Auth
            </span>
          </Link>
          <div className="md:hidden flex items-center space-x-3 rtl:space-x-reverse">
            {!currentUser && (
              <>
                <Link to="/sign-in">
                  <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3"
                  >
                    Connexion
                  </button>
                </Link>
                <Link to="/sign-up">
                  <button
                    type="button"
                    className=" bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-lg text-sm px-4 py-2 text-center"
                  >
                    Inscription
                  </button>
                </Link>
              </>
            )}
            {currentUser && (
              <>
                <Link to="/profile" className="text-black hover:text-blue-800">
                  <img
                    src={currentUser.profilePicture}
                    alt="profile"
                    className="h-10 w-10 rounded-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "defaultProfilePicture.png";
                    }}
                  />
                </Link>
                <FaSignOutAlt
                  onClick={handleSignOut}
                  className="text-red-700 cursor-pointer ml-4"
                  title="Déconnexion"
                  size={25}
                />
              </>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded="false"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        </div>
        {/* liens */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } w-full md:flex md:items-center md:justify-center`}
          id="navbar-default"
        >
          <ul className="flex gap-4 flex-col md:flex-row md:justify-center md:w-full">
            <Link to="/" className="text-black hover:text-blue-800">
              <li>Acceuil</li>
            </Link>
            <Link to="/about" className="text-black hover:text-blue-800">
              <li>A propos</li>
            </Link>
          </ul>
        </div>
        {/* btn ou img */}
        <div className="hidden md:flex md:items-center md:ml-auto">
          {currentUser ? (
            <>
              <Link to="/profile" className="text-black hover:text-blue-800">
                <img
                  src={currentUser.profilePicture}
                  alt="profile"
                  className="h-8 w-8 rounded-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "defaultProfilePicture.png";
                  }}
                />
              </Link>
              <FaSignOutAlt
                onClick={handleSignOut}
                className="text-red-700 cursor-pointer ml-4"
                title="Déconnexion"
                size={25}
              />
            </>
          ) : (
            <>
              <Link to="/sign-in">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3"
                >
                  Connexion
                </button>
              </Link>
              <Link to="/sign-up">
                <button
                  type="button"
                  className=" bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-lg text-sm px-4 py-2 text-center"
                  >
                  Inscription
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
