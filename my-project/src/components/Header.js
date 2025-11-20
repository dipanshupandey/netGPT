import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { Link,useLocation } from "react-router";
import React, { useState } from "react";
import { ln } from "../utils/constants";
import { addLanguage } from "../utils/userSlice";
import { Menu, X } from "lucide-react"; // ✅ Icons for mobile menu

const Header = () => {
  const location = useLocation();
  const user = useSelector((store) => store?.user?.user);
  const lan = useSelector((store) => store?.user?.lan);
  const dispatch = useDispatch();
  const language = ln[lan];
  const [menuOpen, setMenuOpen] = useState(false);

  const isOnGptPage = location.pathname === "/gpt";

  function handleSignout() {
    signOut(auth).catch((error) => console.error(error));
  }

  return (
    <header className="w-full bg-gradient-to-b from-black fixed top-0 z-40 flex items-center justify-between px-4 sm:px-8 py-2">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src="/LOGO.png"
          alt="Logo"
          className="w-28 sm:w-36 cursor-pointer scale-125"
        />
      </div>
      <div className="flex justify-center items-center gap-3">
      {user && (
          <Link
            to={isOnGptPage ? "/browse" : "/gpt"}
            className="bg-white text-purple-600 font-semibold h-9 w-24 flex items-center justify-center rounded transition hover:bg-purple-100"
          >
            {isOnGptPage ? language.browse : language.gpt}
          </Link>
        )}

      {/* Hamburger */}
      <button
        className="text-white lg:hidden focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center space-x-4">
        

        <select
          name="language"
          id="language"
          className="bg-white text-black rounded px-2 py-1"
          onChange={(e) => dispatch(addLanguage(e.target.value))}
        >
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
          <option value="es">Español</option>
          <option value="de">Deutsch</option>
        </select>

        {user && (
          <div className="flex flex-col items-center">
            <img
              className="rounded-lg w-10 h-10 object-cover"
              src="/userIcon.jpg"
              alt="user icon"
            />
            <button
              className="font-bold text-white text-xs mt-1"
              onClick={handleSignout}
            >
              {language.signOut}
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-4 bg-white/40 text-white flex flex-col items-center rounded-lg p-4 space-y-3 lg:hidden w-48">
          {/* {user && (
            <Link
              to={isOnGptPage ? "/browse" : "/gpt"}
              className="bg-white text-purple-600 font-semibold h-9 w-32 flex items-center justify-center rounded transition hover:bg-purple-100"
              onClick={() => setMenuOpen(false)}
            >
              {isOnGptPage ? language.browse : language.gpt}
            </Link>
          )} */}

          <select
            name="language"
            id="language"
            className="bg-white text-black rounded px-2 py-1 w-32"
            onChange={(e) => dispatch(addLanguage(e.target.value))}
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="es">Español</option>
            <option value="de">Deutsch</option>
          </select>

          {user && (
            <div className="flex flex-col items-center">
              <img
                className="rounded-lg w-10 h-10 object-cover"
                src="/userIcon.jpg"
                alt="user icon"
              />
              <button
                className="font-bold text-white text-xs mt-1"
                onClick={() => {
                  handleSignout();
                  setMenuOpen(false);
                }}
              >
                {language.signOut}
              </button>
            </div>
          )}
        </div>
      )}
      </div>
    </header>
  );
};
export default Header;
