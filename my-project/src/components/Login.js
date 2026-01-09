import React, { useState, useRef } from "react";
import validate from "../utils/validate";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";

import { addUser } from "../utils/userSlice";
import { auth } from "../utils/firebase";
import { ln } from "../utils/constants";
const Login = () => {
  const dispatch=useDispatch();
  const [logged, setLogged] = useState(true);
  const [error, setError] = useState(null);
  const email = useRef();
  const password = useRef();
  const name = useRef();
  const lan=useSelector((store)=>store?.user?.lan);
  const language=ln[lan];

  function validateForm() {
    const emailVal = email.current.value;
    const passwordVal = password.current.value;
    const nameVal = name.current?.value;
    let res;
    if (nameVal) res = validate(emailVal, passwordVal, nameVal);
    else res = validate(emailVal, passwordVal);
    setError(res);

    if (res !== null) return;
    //firebase authentication

      if (logged) {
      // sign in
        signInWithEmailAndPassword(auth, emailVal, passwordVal)
          .then((userCredential) => {
            const user = userCredential.user;
        
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          
            setError(errorCode+"-"+errorMessage);
          });

      } else {
        createUserWithEmailAndPassword(auth, emailVal, passwordVal)
          .then((userCredential) => {
          // Signed up
            const user = userCredential.user;
              updateProfile(auth.currentUser, {
                  displayName: nameVal
              }).then(() => {
                const {uid,email,displayName} = auth.currentUser;
                  dispatch(addUser({uid,email,displayName}));
              }).catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
              setError(errorCode + "-" + errorMessage);
            });
            
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
       
            setError(errorCode + "-" + errorMessage);
          });
      }
    
  }

  return (
    <div className="relative h-screen">
      <img
        src="/background.jpg"
        alt="Background"
        className="absolute w-full h-full object-cover z-0"
      />

      <div className="absolute inset-0 bg-black/60 z-10"></div>

      <div className="absolute inset-0 flex justify-center items-center z-20 px-4">
        <div className="w-10/12 sm:w-8/12 md:w-5/12 lg:w-3/12 p-6 sm:p-8 bg-black/80 rounded  text-white font-sans">
          <h1 className="text-2xl sm:text-3xl font-bold  mb-6">
            {logged ? language.signIn : language.signUp}
          </h1>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col  gap-3"
          >
            {!logged && (
              <input
                ref={name}
                required
                type="name"
                placeholder={language.name}
                className="w-full p-2 sm:p-3 border border-white/40 bg-gray-800/50 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-white"
              />
            )}
            <input
              ref={email}
              required
              type="email"
              placeholder={language.email}
              className="w-full p-2 sm:p-3 border border-white/40 bg-gray-800/50 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-white"
            />
            <input
              ref={password}
              required
              type="password"
              placeholder={language.password}
              className="w-full p-2 sm:p-3 border border-white/40 bg-gray-800/50 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-white"
            />

            {error && <p className="text-[#EB3942]">{error}</p>}
            <button
              className="w-full p-2 sm:p-3 bg-[#E50914] rounded font-bold hover:bg-red-700 transition-colors mt-4"
              onClick={() => validateForm()}
            >
              {logged?language.signIn:language.signUp}
            </button>

            <p className="text-xs sm:text-sm text-[#B4B3B3] mt-4 ">
              {logged ? language.newToNetGPT+" " : language.alreadyUser+" "}
              <span
                className="text-white font-bold cursor-pointer"
                onClick={() => setLogged(!logged)}
              >
                {logged ? language.signUpNow : language.signInNow}
              </span>
            </p>
            <p className="text-xs sm:text-sm text-[#B4B3B3] mt-2 ">
              {language.bot}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
