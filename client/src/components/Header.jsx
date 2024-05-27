import { Link } from "react-router-dom";
import Logo from "../assets/logoDevBlue.png";
import { useState} from "react";
import { useSelector } from 'react-redux';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="bg-slate-200  w-full  border-b border-gray-200 ">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto p-3">
        <div className="flex justify-between w-full md:w-auto my-1">
          <Link to="/" className="flex flex-row items-center">
            <img src={Logo} className="h-8 rounded mr-3" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Basic Auth
            </span>
          </Link>
          <div className="md:hidden flex space-x-3 rtl:space-x-reverse">
            <Link to="/sign-in" className="ml-4">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Connexion
              </button>
            </Link>
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

        <div
          className={` ${
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
            <Link to="/profile" className="text-black hover:text-blue-800">
              <li>Profil</li>
            </Link>
          </ul>
        </div>
        {currentUser ? (
          <img
            src={currentUser.profilePicture}
            alt="profile"
            className="h-8 w-8 rounded-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "defaultProfilePicture.png";
            }}
          />
        ) : (
          <div className="hidden md:flex md:items-center md:ml-auto">
            <Link to="/sign-in">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Connexion
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
